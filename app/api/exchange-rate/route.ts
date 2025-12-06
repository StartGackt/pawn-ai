import { NextResponse } from "next/server";

interface BOTDataDetail {
  period: string;
  currency_id: string;
  currency_name_th: string;
  currency_name_eng: string;
  buying_sight: string;
  buying_transfer: string;
  selling: string;
  mid_rate: string;
}

interface BOTApiResponse {
  result: {
    timestamp: string;
    api: string;
    data: {
      data_header: {
        report_name_th: string;
        report_name_eng: string;
        last_updated: string;
      };
      data_detail: BOTDataDetail[];
    };
  };
}

export interface ExchangeRateData {
  source: string;
  period: string;
  lastUpdated: string;
  currencies: {
    currencyId: string;
    currencyNameTh: string;
    currencyNameEng: string;
    buyingSight: string;
    buyingTransfer: string;
    selling: string;
    midRate: string;
  }[];
}

// รายการสกุลเงินที่ต้องการดึง
const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CNY", "SGD", "AUD", "HKD"];

export async function GET() {
  const BOT_API_TOKEN = process.env.BOT_API_TOKEN;

  try {
    // คำนวณวันที่ (ดึง 5 วันล่าสุดเผื่อวันหยุด)
    const today = new Date();
    const endDate = today.toISOString().split("T")[0];
    const startDate = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    if (!BOT_API_TOKEN) {
      // Fallback: ใช้ API อื่นถ้าไม่มี BOT Token
      return await getFallbackExchangeRate();
    }

    const botUrl = `https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${startDate}&end_period=${endDate}`;

    const response = await fetch(botUrl, {
      headers: {
        Authorization: BOT_API_TOKEN,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("BOT API Error");
    }

    const apiData: BOTApiResponse = await response.json();
    const dataDetail = apiData.result?.data?.data_detail || [];

    // หาวันที่ล่าสุดที่มีข้อมูล
    const latestPeriod = dataDetail.find(
      (d) => d.mid_rate && d.mid_rate !== ""
    )?.period;

    if (!latestPeriod) {
      throw new Error("No data available");
    }

    // กรองเฉพาะข้อมูลวันล่าสุดและสกุลเงินที่ต้องการ
    const latestData = dataDetail.filter(
      (d) =>
        d.period === latestPeriod &&
        CURRENCIES.includes(d.currency_id) &&
        d.mid_rate &&
        d.mid_rate !== ""
    );

    // เรียงตามลำดับที่กำหนด
    const sortedData = CURRENCIES.map((curr) =>
      latestData.find((d) => d.currency_id === curr)
    ).filter(Boolean) as BOTDataDetail[];

    const data: ExchangeRateData = {
      source: "ธนาคารแห่งประเทศไทย (Bank of Thailand)",
      period: latestPeriod,
      lastUpdated: apiData.result?.timestamp || new Date().toISOString(),
      currencies: sortedData.map((item) => ({
        currencyId: item.currency_id,
        currencyNameTh: item.currency_name_th,
        currencyNameEng: item.currency_name_eng,
        buyingSight: parseFloat(item.buying_sight).toFixed(4),
        buyingTransfer: parseFloat(item.buying_transfer).toFixed(4),
        selling: parseFloat(item.selling).toFixed(4),
        midRate: parseFloat(item.mid_rate).toFixed(4),
      })),
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return await getFallbackExchangeRate();
  }
}

// Fallback function using free API
async function getFallbackExchangeRate(): Promise<NextResponse> {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/THB"
    );

    if (!response.ok) {
      throw new Error("Fallback API Error");
    }

    const apiData = await response.json();
    const rates = apiData.rates || {};

    const currencyNames: Record<string, { th: string; eng: string }> = {
      USD: { th: "สหรัฐอเมริกา : ดอลลาร์ (USD)", eng: "USA : DOLLAR (USD)" },
      EUR: { th: "สหภาพยุโรป : ยูโร (EUR)", eng: "Euro Zone : EURO (EUR)" },
      GBP: { th: "สหราชอาณาจักร : ปอนด์ (GBP)", eng: "UK : POUND (GBP)" },
      JPY: { th: "ญี่ปุ่น : เยน (JPY)", eng: "Japan : YEN (JPY)" },
      CNY: { th: "จีน : หยวน (CNY)", eng: "China : YUAN (CNY)" },
      SGD: { th: "สิงคโปร์ : ดอลลาร์ (SGD)", eng: "Singapore : DOLLAR (SGD)" },
      AUD: {
        th: "ออสเตรเลีย : ดอลลาร์ (AUD)",
        eng: "Australia : DOLLAR (AUD)",
      },
      HKD: { th: "ฮ่องกง : ดอลลาร์ (HKD)", eng: "Hong Kong : DOLLAR (HKD)" },
    };

    const currencies = CURRENCIES.filter((curr) => rates[curr]).map((curr) => {
      // rates จาก API นี้เป็น THB -> X ต้องกลับเป็น X -> THB
      const rate = 1 / rates[curr];
      return {
        currencyId: curr,
        currencyNameTh: currencyNames[curr]?.th || curr,
        currencyNameEng: currencyNames[curr]?.eng || curr,
        buyingSight: (rate * 0.995).toFixed(4),
        buyingTransfer: (rate * 0.998).toFixed(4),
        selling: (rate * 1.005).toFixed(4),
        midRate: rate.toFixed(4),
      };
    });

    const data: ExchangeRateData = {
      source: "ExchangeRate-API (Fallback)",
      period: apiData.date || new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString(),
      currencies,
    };

    return NextResponse.json(data);
  } catch {
    // Return mock data if all APIs fail
    return NextResponse.json({
      source: "Estimated Data",
      period: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString(),
      currencies: [
        {
          currencyId: "USD",
          currencyNameTh: "สหรัฐอเมริกา : ดอลลาร์ (USD)",
          currencyNameEng: "USA : DOLLAR (USD)",
          buyingSight: "31.7099",
          buyingTransfer: "31.7944",
          selling: "32.1205",
          midRate: "31.9575",
        },
      ],
    });
  }
}
