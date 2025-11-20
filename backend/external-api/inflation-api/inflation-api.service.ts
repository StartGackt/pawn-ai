import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export interface InflationDetail {
  period: string;
  headline_inflation: string;
  core_inflation: string;
  cpi_all_items: string;
  cpi_food_beverage?: string;
  cpi_non_food_beverage?: string;
}

export interface InflationResponse {
  result: {
    api: string;
    timestamp: string;
    data: {
      data_header: {
        report_name_eng: string;
        report_name_th: string;
        unit_eng: string;
        unit_th: string;
        last_updated: string;
      };
      data_detail: InflationDetail[];
    };
  };
}

@Injectable()
export class InflationApiService {
  private readonly logger = new Logger(InflationApiService.name);
  private readonly cpiUrl: string;
  private readonly inflationUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.cpiUrl = this.configService.get<string>(
      'BOT_CPI_API_URL',
      'https://gateway.api.bot.or.th/EconomicIndicators/v2/cpi/',
    );
    this.inflationUrl = this.configService.get<string>(
      'BOT_INFLATION_API_URL',
      'https://gateway.api.bot.or.th/EconomicIndicators/v2/inflation/',
    );
    this.apiKey = this.configService.get<string>('BOT_API_KEY', '');
    
    if (!this.apiKey) {
      this.logger.warn('BOT_API_KEY is not set in environment variables');
    }
  }

  /**
   * Get Consumer Price Index (CPI) data
   * @param startPeriod Start period (YYYY-MM)
   * @param endPeriod End period (YYYY-MM)
   * @returns CPI data
   */
  async getCPI(startPeriod?: string, endPeriod?: string): Promise<InflationResponse> {
    try {
      // If no dates provided, use last 12 months
      const end = endPeriod || new Date().toISOString().slice(0, 7); // YYYY-MM
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 12);
      const start = startPeriod || startDate.toISOString().slice(0, 7);

      this.logger.log(`Fetching CPI data from ${start} to ${end}`);

      const response = await firstValueFrom(
        this.httpService.get<InflationResponse>(this.cpiUrl, {
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

      this.logger.log('Successfully fetched CPI data');
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch CPI data', error.stack);
      throw error;
    }
  }

  /**
   * Get inflation rate data
   * @param startPeriod Start period (YYYY-MM)
   * @param endPeriod End period (YYYY-MM)
   * @returns Inflation rate data (headline and core inflation)
   */
  async getInflationRate(startPeriod?: string, endPeriod?: string): Promise<InflationResponse> {
    try {
      // If no dates provided, use last 12 months
      const end = endPeriod || new Date().toISOString().slice(0, 7); // YYYY-MM
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 12);
      const start = startPeriod || startDate.toISOString().slice(0, 7);

      this.logger.log(`Fetching inflation rate from ${start} to ${end}`);

      const response = await firstValueFrom(
        this.httpService.get<InflationResponse>(this.inflationUrl, {
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

      this.logger.log('Successfully fetched inflation rate data');
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch inflation rate', error.stack);
      throw error;
    }
  }

  /**
   * Get current inflation rate (latest month)
   * @returns Current headline and core inflation rates
   */
  async getCurrentInflation(): Promise<{
    headline: number;
    core: number;
    period: string;
    timestamp: string;
  }> {
    try {
      this.logger.log('Fetching current inflation rate');

      // Get last 3 months to ensure we get the latest data
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 3);

      const end = endDate.toISOString().slice(0, 7);
      const start = startDate.toISOString().slice(0, 7);

      const response = await firstValueFrom(
        this.httpService.get<InflationResponse>(this.inflationUrl, {
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
        throw new Error('No inflation data available');
      }

      // Get the most recent data
      const latest = data[data.length - 1];
      const headline = parseFloat(latest.headline_inflation);
      const core = parseFloat(latest.core_inflation);

      this.logger.log(
        `Current inflation - Headline: ${headline}%, Core: ${core}% (${latest.period})`,
      );

      return {
        headline,
        core,
        period: latest.period,
        timestamp: response.data.result.timestamp,
      };
    } catch (error) {
      this.logger.error('Failed to fetch current inflation', error.stack);
      throw error;
    }
  }

  /**
   * Get inflation data for a specific year
   * @param year Year (YYYY)
   * @returns Inflation data for the year
   */
  async getInflationByYear(year: number): Promise<InflationResponse> {
    try {
      this.logger.log(`Fetching inflation data for year ${year}`);

      const start = `${year}-01`;
      const end = `${year}-12`;

      const response = await firstValueFrom(
        this.httpService.get<InflationResponse>(this.inflationUrl, {
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

      this.logger.log(`Successfully fetched inflation data for year ${year}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch inflation for year ${year}`, error.stack);
      throw error;
    }
  }

  /**
   * Get average inflation for a year
   * @param year Year (YYYY)
   * @returns Average headline and core inflation for the year
   */
  async getAverageInflation(year: number): Promise<{
    year: number;
    headline_avg: number;
    core_avg: number;
    months: number;
  }> {
    try {
      this.logger.log(`Calculating average inflation for year ${year}`);

      const data = await this.getInflationByYear(year);
      const details = data.result.data.data_detail;

      if (!details || details.length === 0) {
        throw new Error(`No inflation data available for year ${year}`);
      }

      const headlineSum = details.reduce(
        (sum, item) => sum + parseFloat(item.headline_inflation),
        0,
      );
      const coreSum = details.reduce(
        (sum, item) => sum + parseFloat(item.core_inflation),
        0,
      );

      const count = details.length;
      const headlineAvg = headlineSum / count;
      const coreAvg = coreSum / count;

      this.logger.log(
        `Average inflation ${year} - Headline: ${headlineAvg.toFixed(2)}%, Core: ${coreAvg.toFixed(2)}%`,
      );

      return {
        year,
        headline_avg: parseFloat(headlineAvg.toFixed(2)),
        core_avg: parseFloat(coreAvg.toFixed(2)),
        months: count,
      };
    } catch (error) {
      this.logger.error(`Failed to calculate average inflation for ${year}`, error.stack);
      throw error;
    }
  }
}
