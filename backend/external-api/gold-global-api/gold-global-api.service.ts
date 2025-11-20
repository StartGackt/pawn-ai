import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export interface MetalPriceResponse {
  success: boolean;
  base: string;
  timestamp: number;
  rates: {
    [key: string]: number;
  };
}

export interface ConvertResponse {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    quote: number;
    timestamp: number;
  };
  result: number;
}

export interface ChangeResponse {
  success: boolean;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [key: string]: {
      start_rate: number;
      end_rate: number;
      change: number;
      change_pct: number;
    };
  };
}

@Injectable()
export class GoldGlobalApiService {
  private readonly logger = new Logger(GoldGlobalApiService.name);
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('GOLD_GLOBAL_API_URL');
    this.apiKey = this.configService.get<string>('GOLD_API_KEY');
  }

  /**
   * Get latest metal prices (Gold, Silver, etc.)
   * @param base Base currency (default: USD)
   * @param currencies Comma-separated currencies (e.g., XAU,XAG,THB)
   * @returns Latest metal prices
   */
  async getLatestPrices(
    base: string = 'USD',
    currencies?: string,
  ): Promise<MetalPriceResponse> {
    const url = `${this.apiUrl}`;
    const params: any = {
      api_key: this.apiKey,
      base,
    };

    if (currencies) {
      params.currencies = currencies;
    }

    try {
      this.logger.log(`Fetching latest metal prices from: ${url}`);

      const response = await firstValueFrom(
        this.httpService.get<MetalPriceResponse>(url, { params }),
      );

      this.logger.log('Successfully fetched metal prices');
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch metal prices: ${error.message}`);
      throw new Error(`Failed to fetch metal prices: ${error.message}`);
    }
  }

  /**
   * Get gold price in USD per troy ounce
   * @returns Gold price (XAU)
   */
  async getGoldPrice(): Promise<{
    price_per_oz: number;
    price_in_thb: number;
    timestamp: number;
    date: string;
  }> {
    const data = await this.getLatestPrices('USD', 'XAU,THB');

    // Calculate gold price in USD and THB
    const goldPriceUSD = 1 / data.rates['XAU']; // Convert to USD per troy ounce
    const thbRate = data.rates['THB'] || 1;
    const goldPriceTHB = goldPriceUSD * thbRate;

    return {
      price_per_oz: parseFloat(goldPriceUSD.toFixed(2)),
      price_in_thb: parseFloat(goldPriceTHB.toFixed(2)),
      timestamp: data.timestamp,
      date: new Date(data.timestamp * 1000).toISOString(),
    };
  }

  /**
   * Get silver price in USD per troy ounce
   * @returns Silver price (XAG)
   */
  async getSilverPrice(): Promise<{
    price_per_oz: number;
    price_in_thb: number;
    timestamp: number;
    date: string;
  }> {
    const data = await this.getLatestPrices('USD', 'XAG,THB');

    // Calculate silver price in USD and THB
    const silverPriceUSD = 1 / data.rates['XAG']; // Convert to USD per troy ounce
    const thbRate = data.rates['THB'] || 1;
    const silverPriceTHB = silverPriceUSD * thbRate;

    return {
      price_per_oz: parseFloat(silverPriceUSD.toFixed(2)),
      price_in_thb: parseFloat(silverPriceTHB.toFixed(2)),
      timestamp: data.timestamp,
      date: new Date(data.timestamp * 1000).toISOString(),
    };
  }

  /**
   * Get all precious metals prices
   * @returns Gold, Silver, Platinum, Palladium prices
   */
  async getAllMetalPrices(): Promise<{
    gold: { price_per_oz: number; price_in_thb: number };
    silver: { price_per_oz: number; price_in_thb: number };
    platinum: { price_per_oz: number; price_in_thb: number };
    palladium: { price_per_oz: number; price_in_thb: number };
    timestamp: number;
    date: string;
  }> {
    const data = await this.getLatestPrices('USD', 'XAU,XAG,XPT,XPD,THB');
    const thbRate = data.rates['THB'] || 1;

    const calculatePrice = (metalRate: number) => {
      const priceUSD = 1 / metalRate;
      return {
        price_per_oz: parseFloat(priceUSD.toFixed(2)),
        price_in_thb: parseFloat((priceUSD * thbRate).toFixed(2)),
      };
    };

    return {
      gold: calculatePrice(data.rates['XAU']),
      silver: calculatePrice(data.rates['XAG']),
      platinum: calculatePrice(data.rates['XPT']),
      palladium: calculatePrice(data.rates['XPD']),
      timestamp: data.timestamp,
      date: new Date(data.timestamp * 1000).toISOString(),
    };
  }

  /**
   * Convert amount from one currency/metal to another
   * @param from Source currency/metal code
   * @param to Target currency/metal code
   * @param amount Amount to convert
   * @returns Conversion result
   */
  async convertCurrency(
    from: string,
    to: string,
    amount: number,
  ): Promise<ConvertResponse> {
    const url = `${this.apiUrl.replace('/latest', '/convert')}`;
    const params = {
      api_key: this.apiKey,
      from,
      to,
      amount,
    };

    try {
      this.logger.log(`Converting ${amount} ${from} to ${to}`);

      const response = await firstValueFrom(
        this.httpService.get<ConvertResponse>(url, { params }),
      );

      this.logger.log('Successfully converted currency');
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to convert currency: ${error.message}`);
      throw new Error(`Failed to convert currency: ${error.message}`);
    }
  }

  /**
   * Get historical metal prices for a specific date
   * @param date Date in YYYY-MM-DD format
   * @param base Base currency (default: USD)
   * @param currencies Currencies to fetch
   * @returns Historical metal prices
   */
  async getHistoricalPrices(
    date: string,
    base: string = 'USD',
    currencies?: string,
  ): Promise<MetalPriceResponse> {
    const url = `${this.apiUrl.replace('/latest', `/${date}`)}`;
    const params: any = {
      api_key: this.apiKey,
      base,
    };

    if (currencies) {
      params.currencies = currencies;
    }

    try {
      this.logger.log(`Fetching historical prices for date: ${date}`);

      const response = await firstValueFrom(
        this.httpService.get<MetalPriceResponse>(url, { params }),
      );

      this.logger.log('Successfully fetched historical prices');
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch historical prices: ${error.message}`);
      throw new Error(`Failed to fetch historical prices: ${error.message}`);
    }
  }

  /**
   * Get price change for a time period
   * @param startDate Start date (YYYY-MM-DD)
   * @param endDate End date (YYYY-MM-DD)
   * @param base Base currency
   * @param currencies Currencies to check
   * @returns Price change data
   */
  async getPriceChange(
    startDate: string,
    endDate: string,
    base: string = 'USD',
    currencies: string = 'XAU,XAG',
  ): Promise<ChangeResponse> {
    const url = `${this.apiUrl.replace('/latest', '/change')}`;
    const params = {
      api_key: this.apiKey,
      start_date: startDate,
      end_date: endDate,
      base,
      currencies,
    };

    try {
      this.logger.log(
        `Fetching price change from ${startDate} to ${endDate}`,
      );

      const response = await firstValueFrom(
        this.httpService.get<ChangeResponse>(url, { params }),
      );

      this.logger.log('Successfully fetched price change');
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch price change: ${error.message}`);
      throw new Error(`Failed to fetch price change: ${error.message}`);
    }
  }
}
