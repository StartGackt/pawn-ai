import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface LoanRateDetail {
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

export interface LoanRateResponse {
  result: {
    api: string;
    timestamp: string;
    data: {
      data_detail: LoanRateDetail[];
    };
  };
}

@Injectable()
export class LoanRateApiService {
  private readonly logger = new Logger(LoanRateApiService.name);
  private readonly LOAN_RATE_API_URL: string;
  private readonly AVG_LOAN_RATE_API_URL: string;
  private readonly API_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.LOAN_RATE_API_URL = this.configService.get<string>(
      'BOT_LOAN_RATE_API_URL',
      'https://gateway.api.bot.or.th/LoanRate/v2/loan_rate/'
    );
    this.AVG_LOAN_RATE_API_URL = this.configService.get<string>(
      'BOT_AVG_LOAN_RATE_API_URL',
      'https://gateway.api.bot.or.th/LoanRate/v2/avg_loan_rate/'
    );
    this.API_KEY = this.configService.get<string>('BOT_API_KEY', '');
    
    if (!this.API_KEY) {
      this.logger.warn('BOT_API_KEY is not set in environment variables');
    }
  }

  /**
   * Get individual bank loan rates from Bank of Thailand
   * @param startPeriod Start date (YYYY-MM-DD)
   * @param endPeriod End date (YYYY-MM-DD)
   * @returns Loan rate data for individual banks
   */
  async getLoanRates(startPeriod?: string, endPeriod?: string): Promise<LoanRateResponse> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const start = startPeriod || today;
      const end = endPeriod || today;

      this.logger.log(`Fetching loan rates from BOT API (${start} to ${end})...`);
      
      const response = await firstValueFrom(
        this.httpService.get<LoanRateResponse>(this.LOAN_RATE_API_URL, {
          headers: {
            'Accept': 'application/json',
            'Authorization': this.API_KEY,
          },
          params: {
            start_period: start,
            end_period: end,
          },
        })
      );

      this.logger.log('Successfully fetched loan rates data');
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch loan rates from BOT API', error);
      
      if (error.response) {
        this.logger.error(`Status: ${error.response.status}`);
        this.logger.error(`Data: ${JSON.stringify(error.response.data)}`);
      }
      
      throw new HttpException(
        'Failed to fetch loan rates data from Bank of Thailand',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Get average loan rates of commercial banks
   * @param startPeriod Start date (YYYY-MM-DD)
   * @param endPeriod End date (YYYY-MM-DD)
   * @returns Average loan rate data
   */
  async getAverageLoanRates(startPeriod?: string, endPeriod?: string): Promise<LoanRateResponse> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const start = startPeriod || today;
      const end = endPeriod || today;

      this.logger.log(`Fetching average loan rates from BOT API (${start} to ${end})...`);
      
      const response = await firstValueFrom(
        this.httpService.get<LoanRateResponse>(this.AVG_LOAN_RATE_API_URL, {
          headers: {
            'Accept': 'application/json',
            'Authorization': this.API_KEY,
          },
          params: {
            start_period: start,
            end_period: end,
          },
        })
      );

      this.logger.log('Successfully fetched average loan rates data');
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch average loan rates from BOT API', error);
      
      if (error.response) {
        this.logger.error(`Status: ${error.response.status}`);
        this.logger.error(`Data: ${JSON.stringify(error.response.data)}`);
      }
      
      throw new HttpException(
        'Failed to fetch average loan rates data from Bank of Thailand',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Get latest average loan rates
   * @returns Latest average loan rates for all rate types
   */
  async getLatestAverageRates(): Promise<{
    period: string;
    rates: {
      mor: number;
      mlr: number;
      mrr: number;
      ceiling_rate: number;
      default_rate: number;
      creditcard_min: number;
      creditcard_max: number;
    };
  }> {
    try {
      const data = await this.getAverageLoanRates();
      
      if (!data.result?.data?.data_detail || data.result.data.data_detail.length === 0) {
        throw new Error('No loan rate data available');
      }

      // Get the most recent rate for commercial banks
      const latestRate = data.result.data.data_detail.find(
        rate => rate.name_eng.includes('Commercial Banks registered in Thailand')
      ) || data.result.data.data_detail[0];

      const rates = {
        period: latestRate.period,
        rates: {
          mor: parseFloat(latestRate.mor),
          mlr: parseFloat(latestRate.mlr),
          mrr: parseFloat(latestRate.mrr),
          ceiling_rate: parseFloat(latestRate.ceiling_rate),
          default_rate: parseFloat(latestRate.default_rate),
          creditcard_min: parseFloat(latestRate.creditcard_min),
          creditcard_max: parseFloat(latestRate.creditcard_max),
        },
      };
      
      this.logger.log(`Latest loan rates: ${JSON.stringify(rates)}`);
      return rates;
    } catch (error) {
      this.logger.error('Failed to calculate latest rates', error);
      throw new HttpException(
        'Failed to calculate latest loan rates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
