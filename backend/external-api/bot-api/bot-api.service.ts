import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SpotRateResponseDto } from './dto/spot-rate-response.dto';

@Injectable()
export class BotApiService {
  private readonly logger = new Logger(BotApiService.name);
  private readonly BOT_API_URL: string;
  private readonly API_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.BOT_API_URL = this.configService.get<string>(
      'BOT_EXCHANGE_RATE_API_URL',
      'https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/'
    );
    this.API_KEY = this.configService.get<string>('BOT_API_KEY', '');
    
    if (!this.API_KEY) {
      this.logger.warn('BOT_API_KEY is not set in environment variables');
    }
  }

  /**
   * Get Spot Rate USD/THB from Bank of Thailand
   * @param startPeriod Start date (YYYY-MM-DD)
   * @param endPeriod End date (YYYY-MM-DD)
   * @returns Spot rate data including bid and offer rates
   */
  async getSpotRate(startPeriod?: string, endPeriod?: string): Promise<SpotRateResponseDto> {
    try {
      // If no dates provided, use today
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const start = startPeriod || today;
      const end = endPeriod || today;

      this.logger.log(`Fetching spot rate from BOT API (${start} to ${end})...`);
      
      const response = await firstValueFrom(
        this.httpService.get<SpotRateResponseDto>(this.BOT_API_URL, {
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

      this.logger.log('Successfully fetched spot rate data');
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch spot rate from BOT API', error);
      
      // Log more details for debugging
      if (error.response) {
        this.logger.error(`Status: ${error.response.status}`);
        this.logger.error(`Data: ${JSON.stringify(error.response.data)}`);
      }
      
      throw new HttpException(
        'Failed to fetch spot rate data from Bank of Thailand',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Get current USD/THB rate (average of bid and offer)
   * @returns Current exchange rate as number
   */
  async getCurrentRate(): Promise<number> {
    try {
      const data = await this.getSpotRate();
      
      if (!data.result?.data?.data_detail || data.result.data.data_detail.length === 0) {
        throw new Error('No spot rate data available');
      }

      // Get the first (most recent) rate
      const latestRate = data.result.data.data_detail[0];
      const bid = parseFloat(latestRate.bid);
      const offer = parseFloat(latestRate.offer);
      
      // Calculate average rate
      const averageRate = (bid + offer) / 2;
      
      this.logger.log(`Current USD/THB rate: ${averageRate.toFixed(4)}`);
      return averageRate;
    } catch (error) {
      this.logger.error('Failed to calculate current rate', error);
      throw new HttpException(
        'Failed to calculate current exchange rate',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
