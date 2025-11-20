import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LoanRateApiService, LoanRateResponse } from './loan-rate-api.service';

@ApiTags('external-api')
@Controller('external-api/loan-rate')
export class LoanRateApiController {
  constructor(private readonly loanRateApiService: LoanRateApiService) {}

  @Get('individual')
  @ApiOperation({ 
    summary: 'Get individual bank loan interest rates from Bank of Thailand',
    description: 'Returns loan rates (MOR, MLR, MRR, etc.) for each commercial bank'
  })
  @ApiQuery({ 
    name: 'start_period', 
    required: false, 
    description: 'Start period date (YYYY-MM-DD). Defaults to today',
    example: '2024-11-20'
  })
  @ApiQuery({ 
    name: 'end_period', 
    required: false, 
    description: 'End period date (YYYY-MM-DD). Defaults to today',
    example: '2024-11-20'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns loan rate data for individual banks',
    schema: {
      example: {
        result: {
          api: 'Loan Interest Rates of Commercial Banks',
          timestamp: '2024-11-20 16:46:27',
          data: {
            data_detail: [
              {
                period: '2024-11-20',
                name_th: 'ธนาคารกรุงเทพ',
                name_eng: 'Bangkok Bank',
                mor: '7.50',
                mlr: '6.75',
                mrr: '8.00',
                ceiling_rate: '22.00',
                default_rate: '24.00',
                creditcard_min: '18.00',
                creditcard_max: '18.00'
              }
            ]
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid API key' })
  @ApiResponse({ status: 503, description: 'Service unavailable - BOT API error' })
  async getLoanRates(
    @Query('start_period') startPeriod?: string,
    @Query('end_period') endPeriod?: string,
  ): Promise<LoanRateResponse> {
    return this.loanRateApiService.getLoanRates(startPeriod, endPeriod);
  }

  @Get('average')
  @ApiOperation({ 
    summary: 'Get average loan interest rates of commercial banks',
    description: 'Returns average loan rates across all commercial banks in Thailand'
  })
  @ApiQuery({ 
    name: 'start_period', 
    required: false, 
    description: 'Start period date (YYYY-MM-DD). Defaults to today',
    example: '2024-11-20'
  })
  @ApiQuery({ 
    name: 'end_period', 
    required: false, 
    description: 'End period date (YYYY-MM-DD). Defaults to today',
    example: '2024-11-20'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns average loan rate data',
    schema: {
      example: {
        result: {
          api: 'Average Loan Interest Rates of Commercial Banks (Percent per annum)',
          timestamp: '2024-11-20 16:46:27',
          data: {
            data_detail: [
              {
                period: '2024-11-20',
                name_th: 'เฉลี่ยของธนาคารพาณิชย์จดทะเบียนในประเทศ',
                name_eng: 'Average of Commercial Banks registered in Thailand',
                mor: '7.9166',
                mlr: '7.0971',
                mrr: '8.3883',
                ceiling_rate: '23.0182',
                default_rate: '24.7879',
                creditcard_min: '19.4444',
                creditcard_max: '19.4444'
              }
            ]
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid API key' })
  @ApiResponse({ status: 503, description: 'Service unavailable - BOT API error' })
  async getAverageLoanRates(
    @Query('start_period') startPeriod?: string,
    @Query('end_period') endPeriod?: string,
  ): Promise<LoanRateResponse> {
    return this.loanRateApiService.getAverageLoanRates(startPeriod, endPeriod);
  }

  @Get('latest')
  @ApiOperation({ 
    summary: 'Get latest average loan interest rates',
    description: 'Returns the most recent average loan rates for all rate types (MOR, MLR, MRR, etc.)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns latest average loan rates',
    schema: {
      example: {
        period: '2024-11-20',
        rates: {
          mor: 7.9166,
          mlr: 7.0971,
          mrr: 8.3883,
          ceiling_rate: 23.0182,
          default_rate: 24.7879,
          creditcard_min: 19.4444,
          creditcard_max: 19.4444
        }
      }
    }
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getLatestRates() {
    return this.loanRateApiService.getLatestAverageRates();
  }
}
