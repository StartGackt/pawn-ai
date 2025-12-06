import { NextResponse } from 'next/server';

interface LoanRateData {
  period: string;
  bank_type_name_th: string;
  bank_type_name_eng: string;
  bank_name_th: string;
  bank_name_eng: string;
  mor: string;
  mlr: string;
  mrr: string;
  ceiling_rate: string;
  default_rate: string;
  creditcard_min: string;
  creditcard_max: string;
}

interface AvgLoanRateData {
  period: string;
  name_th: string;
  name_eng: string;
  mor: string;
  mlr: string;
  mrr: string;
  ceiling_rate: string;
  default_rate: string;
  creditcard_min: string;
  creditcard_max: string;
}

interface BOTLoanRateResponse {
  result: {
    api: string;
    timestamp: string;
    data: {
      data_detail: LoanRateData[];
    };
  };
}

interface BOTAvgLoanRateResponse {
  result: {
    api: string;
    timestamp: string;
    data: {
      data_detail: AvgLoanRateData[];
    };
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'average'; // 'average' or 'individual'
    
    // Get date range - default to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const start_period = searchParams.get('start_period') || formatDate(startDate);
    const end_period = searchParams.get('end_period') || formatDate(endDate);
    
    // ใช้ Token เฉพาะสำหรับ Interest Rates API
    const BOT_INTEREST_RATE_TOKEN = process.env.BOT_INTEREST_RATE_TOKEN;
    
    if (!BOT_INTEREST_RATE_TOKEN) {
      console.error('BOT_INTEREST_RATE_TOKEN not configured');
      return NextResponse.json(getFallbackData(), { status: 200 });
    }
    
    const baseUrl = 'https://gateway.api.bot.or.th/LoanRate/v2';
    const endpoint = type === 'individual' ? '/loan_rate/' : '/avg_loan_rate/';
    const url = `${baseUrl}${endpoint}?start_period=${start_period}&end_period=${end_period}`;
    
    console.log('Fetching loan rate from BOT API:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': BOT_INTEREST_RATE_TOKEN,
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error('BOT API error:', response.status, response.statusText);
      return NextResponse.json(getFallbackData(), { status: 200 });
    }
    
    const data = await response.json();
    
    if (type === 'individual') {
      return formatIndividualResponse(data as BOTLoanRateResponse);
    } else {
      return formatAverageResponse(data as BOTAvgLoanRateResponse);
    }
    
  } catch (error) {
    console.error('Error fetching loan rate:', error);
    return NextResponse.json(getFallbackData(), { status: 200 });
  }
}

function formatIndividualResponse(data: BOTLoanRateResponse) {
  const dataDetail = data?.result?.data?.data_detail;
  
  if (!dataDetail || !Array.isArray(dataDetail) || dataDetail.length === 0) {
    return NextResponse.json(getFallbackData(), { status: 200 });
  }
  
  // Get the latest data and group by bank
  const latestPeriod = dataDetail.reduce((latest, item) => {
    return item.period > latest ? item.period : latest;
  }, dataDetail[0].period);
  
  const latestData = dataDetail.filter(item => item.period === latestPeriod);
  
  // Group by bank type
  const thaiCommercialBanks = latestData.filter(
    item => item.bank_type_name_eng === 'Commercial Banks registered in Thailand'
  );
  const foreignBanks = latestData.filter(
    item => item.bank_type_name_eng === 'Foreign Bank Branches'
  );
  
  return NextResponse.json({
    success: true,
    type: 'individual',
    period: latestPeriod,
    timestamp: data.result.timestamp,
    data: {
      thai_commercial_banks: thaiCommercialBanks.map(bank => ({
        bank_name_th: bank.bank_name_th,
        bank_name_eng: bank.bank_name_eng,
        mor: parseFloat(bank.mor) || null,
        mlr: parseFloat(bank.mlr) || null,
        mrr: parseFloat(bank.mrr) || null,
        ceiling_rate: parseFloat(bank.ceiling_rate) || null,
        default_rate: parseFloat(bank.default_rate) || null,
        creditcard_min: parseFloat(bank.creditcard_min) || null,
        creditcard_max: parseFloat(bank.creditcard_max) || null,
      })),
      foreign_banks: foreignBanks.map(bank => ({
        bank_name_th: bank.bank_name_th,
        bank_name_eng: bank.bank_name_eng,
        mor: parseFloat(bank.mor) || null,
        mlr: parseFloat(bank.mlr) || null,
        mrr: parseFloat(bank.mrr) || null,
        ceiling_rate: parseFloat(bank.ceiling_rate) || null,
        default_rate: parseFloat(bank.default_rate) || null,
        creditcard_min: parseFloat(bank.creditcard_min) || null,
        creditcard_max: parseFloat(bank.creditcard_max) || null,
      })),
    }
  });
}

function formatAverageResponse(data: BOTAvgLoanRateResponse) {
  const dataDetail = data?.result?.data?.data_detail;
  
  if (!dataDetail || !Array.isArray(dataDetail) || dataDetail.length === 0) {
    return NextResponse.json(getFallbackData(), { status: 200 });
  }
  
  // Get the latest data
  const latestPeriod = dataDetail.reduce((latest, item) => {
    return item.period > latest ? item.period : latest;
  }, dataDetail[0].period);
  
  const latestData = dataDetail.filter(item => item.period === latestPeriod);
  
  const thaiAvg = latestData.find(
    item => item.name_eng === 'Average of Commercial Banks registered in Thailand'
  );
  const foreignAvg = latestData.find(
    item => item.name_eng === 'Average of Foreign Bank Branches'
  );
  
  return NextResponse.json({
    success: true,
    type: 'average',
    period: latestPeriod,
    timestamp: data.result.timestamp,
    data: {
      thai_commercial_banks_avg: thaiAvg ? {
        name_th: thaiAvg.name_th,
        name_eng: thaiAvg.name_eng,
        mor: parseFloat(thaiAvg.mor) || null,
        mlr: parseFloat(thaiAvg.mlr) || null,
        mrr: parseFloat(thaiAvg.mrr) || null,
        ceiling_rate: parseFloat(thaiAvg.ceiling_rate) || null,
        default_rate: parseFloat(thaiAvg.default_rate) || null,
        creditcard_min: parseFloat(thaiAvg.creditcard_min) || null,
        creditcard_max: parseFloat(thaiAvg.creditcard_max) || null,
      } : null,
      foreign_banks_avg: foreignAvg ? {
        name_th: foreignAvg.name_th,
        name_eng: foreignAvg.name_eng,
        mor: parseFloat(foreignAvg.mor) || null,
        mlr: parseFloat(foreignAvg.mlr) || null,
        mrr: parseFloat(foreignAvg.mrr) || null,
        ceiling_rate: parseFloat(foreignAvg.ceiling_rate) || null,
        default_rate: parseFloat(foreignAvg.default_rate) || null,
        creditcard_min: parseFloat(foreignAvg.creditcard_min) || null,
        creditcard_max: parseFloat(foreignAvg.creditcard_max) || null,
      } : null,
    }
  });
}

function getFallbackData() {
  // Fallback data based on recent typical Thai bank rates
  return {
    success: true,
    type: 'average',
    period: new Date().toISOString().split('T')[0],
    timestamp: new Date().toISOString(),
    source: 'fallback',
    data: {
      thai_commercial_banks_avg: {
        name_th: 'เฉลี่ยของธนาคารพาณิชย์จดทะเบียนในประเทศ',
        name_eng: 'Average of Commercial Banks registered in Thailand',
        mor: 7.05,
        mlr: 6.15,
        mrr: 7.05,
        ceiling_rate: 16.00,
        default_rate: 18.00,
        creditcard_min: 16.00,
        creditcard_max: 16.00,
      },
      foreign_banks_avg: {
        name_th: 'เฉลี่ยของสาขาธนาคารต่างประเทศ',
        name_eng: 'Average of Foreign Bank Branches',
        mor: 7.50,
        mlr: 6.50,
        mrr: 7.50,
        ceiling_rate: 18.00,
        default_rate: 20.00,
        creditcard_min: 18.00,
        creditcard_max: 18.00,
      },
    }
  };
}
