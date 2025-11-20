import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

// Economic Indicators Response Interfaces
export interface EconomicIndicatorResponse {
  name: string;
  interval: string;
  unit: string;
  data: Array<{
    date: string;
    value: string;
  }>;
}

// Forex Exchange Rate Response
export interface ForexExchangeRateResponse {
  'Realtime Currency Exchange Rate': {
    '1. From_Currency Code': string;
    '2. From_Currency Name': string;
    '3. To_Currency Code': string;
    '4. To_Currency Name': string;
    '5. Exchange Rate': string;
    '6. Last Refreshed': string;
    '7. Time Zone': string;
    '8. Bid Price': string;
    '9. Ask Price': string;
  };
}

// Commodity Response Interface
export interface CommodityResponse {
  name: string;
  interval: string;
  unit: string;
  data: Array<{
    date: string;
    value: string;
  }>;
}

// Global Quote Response (Stock Market)
export interface GlobalQuoteResponse {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

// News & Sentiment Response
export interface NewsResponse {
  items: string;
  sentiment_score_definition: string;
  relevance_score_definition: string;
  feed: Array<{
    title: string;
    url: string;
    time_published: string;
    authors: string[];
    summary: string;
    overall_sentiment_score: number;
    overall_sentiment_label: string;
    ticker_sentiment: Array<{
      ticker: string;
      relevance_score: string;
      ticker_sentiment_score: string;
      ticker_sentiment_label: string;
    }>;
  }>;
}

@Injectable()
export class AlphaVantageApiService {
  private readonly logger = new Logger(AlphaVantageApiService.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('Alpha_Vantage_key');
  }

  /**
   * Get Real GDP data (Gross Domestic Product)
   */
  async getRealGDP(interval: 'quarterly' | 'annual' = 'annual'): Promise<any> {
    try {
      this.logger.log(`Fetching Real GDP data (${interval})...`);
      const url = `${this.baseUrl}?function=REAL_GDP&interval=${interval}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Real GDP:', error.message);
      throw error;
    }
  }

  /**
   * Get CPI (Consumer Price Index) data
   */
  async getCPI(interval: 'monthly' | 'semiannual' = 'monthly'): Promise<any> {
    try {
      this.logger.log(`Fetching CPI data (${interval})...`);
      const url = `${this.baseUrl}?function=CPI&interval=${interval}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching CPI:', error.message);
      throw error;
    }
  }

  /**
   * Get Inflation rate data
   */
  async getInflation(): Promise<any> {
    try {
      this.logger.log('Fetching Inflation data...');
      const url = `${this.baseUrl}?function=INFLATION&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Inflation:', error.message);
      throw error;
    }
  }

  /**
   * Get Unemployment rate data
   */
  async getUnemployment(): Promise<any> {
    try {
      this.logger.log('Fetching Unemployment rate...');
      const url = `${this.baseUrl}?function=UNEMPLOYMENT&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Unemployment:', error.message);
      throw error;
    }
  }

  /**
   * Get Federal Funds Rate (US Interest Rate)
   */
  async getFederalFundsRate(
    interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ): Promise<any> {
    try {
      this.logger.log(`Fetching Federal Funds Rate (${interval})...`);
      const url = `${this.baseUrl}?function=FEDERAL_FUNDS_RATE&interval=${interval}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Federal Funds Rate:', error.message);
      throw error;
    }
  }

  /**
   * Get Treasury Yield data
   */
  async getTreasuryYield(
    interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
    maturity:
      | '3month'
      | '2year'
      | '5year'
      | '7year'
      | '10year'
      | '30year' = '10year',
  ): Promise<any> {
    try {
      this.logger.log(
        `Fetching Treasury Yield (${maturity}, ${interval})...`,
      );
      const url = `${this.baseUrl}?function=TREASURY_YIELD&interval=${interval}&maturity=${maturity}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Treasury Yield:', error.message);
      throw error;
    }
  }

  /**
   * Get Forex Exchange Rate (realtime)
   */
  async getForexRate(
    fromCurrency: string,
    toCurrency: string,
  ): Promise<ForexExchangeRateResponse> {
    try {
      this.logger.log(
        `Fetching Forex rate: ${fromCurrency}/${toCurrency}...`,
      );
      const url = `${this.baseUrl}?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Forex rate:', error.message);
      throw error;
    }
  }

  /**
   * Get Forex Daily Time Series
   */
  async getForexDaily(
    fromSymbol: string,
    toSymbol: string,
    outputsize: 'compact' | 'full' = 'compact',
  ): Promise<any> {
    try {
      this.logger.log(
        `Fetching Forex daily data: ${fromSymbol}/${toSymbol}...`,
      );
      const url = `${this.baseUrl}?function=FX_DAILY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&outputsize=${outputsize}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Forex daily:', error.message);
      throw error;
    }
  }

  /**
   * Get Crude Oil WTI prices
   */
  async getCrudeOilWTI(
    interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ): Promise<any> {
    try {
      this.logger.log(`Fetching Crude Oil WTI prices (${interval})...`);
      const url = `${this.baseUrl}?function=WTI&interval=${interval}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Crude Oil WTI:', error.message);
      throw error;
    }
  }

  /**
   * Get Crude Oil Brent prices
   */
  async getCrudeOilBrent(
    interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ): Promise<any> {
    try {
      this.logger.log(`Fetching Crude Oil Brent prices (${interval})...`);
      const url = `${this.baseUrl}?function=BRENT&interval=${interval}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Crude Oil Brent:', error.message);
      throw error;
    }
  }

  /**
   * Get Natural Gas prices
   */
  async getNaturalGas(
    interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ): Promise<any> {
    try {
      this.logger.log(`Fetching Natural Gas prices (${interval})...`);
      const url = `${this.baseUrl}?function=NATURAL_GAS&interval=${interval}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Natural Gas:', error.message);
      throw error;
    }
  }

  /**
   * Get Copper prices
   */
  async getCopper(
    interval: 'monthly' | 'quarterly' | 'annual' = 'monthly',
  ): Promise<any> {
    try {
      this.logger.log(`Fetching Copper prices (${interval})...`);
      const url = `${this.baseUrl}?function=COPPER&interval=${interval}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Copper:', error.message);
      throw error;
    }
  }

  /**
   * Get Global Stock Quote (e.g., S&P 500, Dow Jones via index symbols)
   */
  async getGlobalQuote(symbol: string): Promise<GlobalQuoteResponse> {
    try {
      this.logger.log(`Fetching global quote for ${symbol}...`);
      const url = `${this.baseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching global quote:', error.message);
      throw error;
    }
  }

  /**
   * Get Market News & Sentiment
   */
  async getMarketNews(
    tickers?: string,
    topics?: string,
    limit: number = 50,
  ): Promise<NewsResponse> {
    try {
      this.logger.log('Fetching market news...');
      let url = `${this.baseUrl}?function=NEWS_SENTIMENT&limit=${limit}&apikey=${this.apiKey}`;
      if (tickers) url += `&tickers=${tickers}`;
      if (topics) url += `&topics=${topics}`;

      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching market news:', error.message);
      throw error;
    }
  }

  /**
   * Get Cryptocurrency Exchange Rate (e.g., BTC, ETH)
   */
  async getCryptoRate(
    cryptocurrency: string,
    market: string = 'USD',
  ): Promise<ForexExchangeRateResponse> {
    try {
      this.logger.log(
        `Fetching crypto rate: ${cryptocurrency}/${market}...`,
      );
      const url = `${this.baseUrl}?function=CURRENCY_EXCHANGE_RATE&from_currency=${cryptocurrency}&to_currency=${market}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching crypto rate:', error.message);
      throw error;
    }
  }

  /**
   * Get Cryptocurrency Daily Data
   */
  async getCryptoDaily(symbol: string, market: string = 'USD'): Promise<any> {
    try {
      this.logger.log(`Fetching crypto daily data: ${symbol}/${market}...`);
      const url = `${this.baseUrl}?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching crypto daily:', error.message);
      throw error;
    }
  }

  /**
   * Get Top Gainers & Losers
   */
  async getTopGainersLosers(): Promise<any> {
    try {
      this.logger.log('Fetching top gainers & losers...');
      const url = `${this.baseUrl}?function=TOP_GAINERS_LOSERS&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching top gainers & losers:', error.message);
      throw error;
    }
  }

  /**
   * Get comprehensive daily economic summary
   */
  async getDailyEconomicSummary(): Promise<any> {
    try {
      this.logger.log('Fetching daily economic summary...');

      // Fetch multiple key indicators in parallel
      const [
        gdp,
        inflation,
        unemployment,
        federalFunds,
        oilWTI,
        oilBrent,
        usdeur,
        usdthb,
        btcusd,
        sp500,
        news,
      ] = await Promise.all([
        this.getRealGDP('annual').catch(() => null),
        this.getInflation().catch(() => null),
        this.getUnemployment().catch(() => null),
        this.getFederalFundsRate('monthly').catch(() => null),
        this.getCrudeOilWTI('daily').catch(() => null),
        this.getCrudeOilBrent('daily').catch(() => null),
        this.getForexRate('USD', 'EUR').catch(() => null),
        this.getForexRate('USD', 'THB').catch(() => null),
        this.getCryptoRate('BTC', 'USD').catch(() => null),
        this.getGlobalQuote('SPY').catch(() => null), // S&P 500 ETF
        this.getMarketNews(undefined, 'economy', 10).catch(() => null),
      ]);

      return {
        timestamp: new Date().toISOString(),
        economic_indicators: {
          gdp,
          inflation,
          unemployment,
          federal_funds_rate: federalFunds,
        },
        commodities: {
          crude_oil_wti: oilWTI,
          crude_oil_brent: oilBrent,
        },
        forex: {
          usd_eur: usdeur,
          usd_thb: usdthb,
        },
        crypto: {
          btc_usd: btcusd,
        },
        stock_market: {
          sp500,
        },
        news,
      };
    } catch (error) {
      this.logger.error('Error fetching daily economic summary:', error.message);
      throw error;
    }
  }
}
