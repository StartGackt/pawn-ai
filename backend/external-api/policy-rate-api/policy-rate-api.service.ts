import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export interface PolicyRateDetail {
  period: string;
  policy_rate: string;
}

export interface PolicyRateResponse {
  result: {
    api: string;
    timestamp: string;
    data: {
      data_header: {
        report_name_eng: string;
        report_name_th: string;
        last_updated: string;
      };
      data_detail: PolicyRateDetail[];
    };
  };
}

@Injectable()
export class PolicyRateApiService {
  private readonly logger = new Logger(PolicyRateApiService.name);
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>(
      'BOT_POLICY_RATE_API_URL',
      'https://gateway.api.bot.or.th/PolicyRate/v2/policy_rate/',
    );
    this.apiKey = this.configService.get<string>('BOT_API_KEY', '');
    
    if (!this.apiKey) {
      this.logger.warn('BOT_API_KEY is not set in environment variables');
    }
  }

  /**
   * Get policy interest rate from Bank of Thailand
   * @param startPeriod Start date (YYYY-MM-DD)
   * @param endPeriod End date (YYYY-MM-DD)
   * @returns Policy rate data
   */
  async getPolicyRate(startPeriod?: string, endPeriod?: string): Promise<PolicyRateResponse> {
    try {
      // If no dates provided, use last 30 days
      const end = endPeriod || new Date().toISOString().split('T')[0];
      const start = startPeriod || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      this.logger.log(`Fetching policy rate from ${start} to ${end}`);

      const response = await firstValueFrom(
        this.httpService.get<PolicyRateResponse>(this.apiUrl, {
          params: {
            start_period: start,
            end_period: end,
          },
          headers: {
            Accept: 'application/json',
            Authorization: this.apiKey,
          },
        }),
      );

      this.logger.log('Successfully fetched policy rate data');
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch policy rate', error.stack);
      throw error;
    }
  }

  /**
   * Get current policy rate (latest)
   * @returns Current policy rate
   */
  async getCurrentPolicyRate(): Promise<{ rate: number; date: string; timestamp: string }> {
    try {
      this.logger.log('Fetching current policy rate');

      // Get last 7 days to ensure we get the latest rate
      const end = new Date().toISOString().split('T')[0];
      const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const response = await firstValueFrom(
        this.httpService.get<PolicyRateResponse>(this.apiUrl, {
          params: {
            start_period: start,
            end_period: end,
          },
          headers: {
            Accept: 'application/json',
            Authorization: this.apiKey,
          },
        }),
      );

      const data = response.data.result.data.data_detail;
      
      if (!data || data.length === 0) {
        throw new Error('No policy rate data available');
      }

      // Get the most recent rate
      const latest = data[data.length - 1];
      const rate = parseFloat(latest.policy_rate);

      this.logger.log(`Current policy rate: ${rate}% (as of ${latest.period})`);

      return {
        rate,
        date: latest.period,
        timestamp: response.data.result.timestamp,
      };
    } catch (error) {
      this.logger.error('Failed to fetch current policy rate', error.stack);
      throw error;
    }
  }

  /**
   * Get policy rate history for a specific year
   * @param year Year (YYYY)
   * @returns Policy rate history for the year
   */
  async getPolicyRateByYear(year: number): Promise<PolicyRateResponse> {
    try {
      this.logger.log(`Fetching policy rate for year ${year}`);

      const start = `${year}-01-01`;
      const end = `${year}-12-31`;

      const response = await firstValueFrom(
        this.httpService.get<PolicyRateResponse>(this.apiUrl, {
          params: {
            start_period: start,
            end_period: end,
          },
          headers: {
            Accept: 'application/json',
            Authorization: this.apiKey,
          },
        }),
      );

      this.logger.log(`Successfully fetched policy rate for year ${year}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch policy rate for year ${year}`, error.stack);
      throw error;
    }
  }
}
