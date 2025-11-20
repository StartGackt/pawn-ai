import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface GoldPriceResponse {
  status: string;
  response: {
    date: string;
    update_time: string;
    price: {
      gold: {
        buy: string;
        sell: string;
      };
      gold_bar: {
        buy: string;
        sell: string;
      };
      change: {
        compare_previous: string;
        compare_yesterday: string;
      };
    };
  };
}

@Injectable()
export class GoldThaiApiService {
  private readonly logger = new Logger(GoldThaiApiService.name);
  private readonly apiUrl = 'https://api.chnwt.dev/thai-gold-api';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Get latest Thai gold prices
   * @returns Latest gold prices from ทองคําราคา.com
   */
  async getLatestPrice(): Promise<GoldPriceResponse> {
    const url = `${this.apiUrl}/latest`;

    try {
      this.logger.log(`Fetching latest gold prices from: ${url}`);

      const response = await firstValueFrom(
        this.httpService.get<GoldPriceResponse>(url),
      );

      this.logger.log('Successfully fetched gold prices');
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch gold prices: ${error.message}`);
      throw new Error(`Failed to fetch Thai gold prices: ${error.message}`);
    }
  }

  /**
   * Get current gold bar prices (numeric values)
   * @returns Gold bar buy/sell prices as numbers
   */
  async getGoldBarPrices(): Promise<{
    buy: number;
    sell: number;
    date: string;
    updateTime: string;
  }> {
    const data = await this.getLatestPrice();
    const { gold_bar } = data.response.price;

    return {
      buy: parseFloat(gold_bar.buy.replace(/,/g, '')),
      sell: parseFloat(gold_bar.sell.replace(/,/g, '')),
      date: data.response.date,
      updateTime: data.response.update_time,
    };
  }

  /**
   * Get current gold ornament prices (numeric values)
   * @returns Gold ornament buy/sell prices as numbers
   */
  async getGoldOrnamentPrices(): Promise<{
    buy: number;
    sell: number;
    date: string;
    updateTime: string;
  }> {
    const data = await this.getLatestPrice();
    const { gold } = data.response.price;

    return {
      buy: parseFloat(gold.buy.replace(/,/g, '')),
      sell: parseFloat(gold.sell.replace(/,/g, '')),
      date: data.response.date,
      updateTime: data.response.update_time,
    };
  }
}
