import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AlphaVantageApiService } from './alpha-vantage-api.service';

@ApiTags('Alpha Vantage - Global Economic Data')
@Controller('api/external-api/alpha-vantage')
export class AlphaVantageApiController {
  constructor(
    private readonly alphaVantageApiService: AlphaVantageApiService,
  ) {}

  @Get('economic/gdp')
  @ApiOperation({
    summary: 'Get Real GDP (Gross Domestic Product)',
    description:
      'Returns annual or quarterly Real GDP of the United States from Alpha Vantage',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    enum: ['quarterly', 'annual'],
    description: 'Time interval (default: annual)',
  })
  @ApiResponse({
    status: 200,
    description: 'Real GDP data retrieved successfully',
    schema: {
      example: {
        name: 'Real Gross Domestic Product',
        interval: 'annual',
        unit: 'billions of dollars',
        data: [
          { date: '2023-01-01', value: '21060.473' },
          { date: '2022-01-01', value: '20937.497' },
        ],
      },
    },
  })
  async getRealGDP(
    @Query('interval') interval: 'quarterly' | 'annual' = 'annual',
  ) {
    return this.alphaVantageApiService.getRealGDP(interval);
  }

  @Get('economic/cpi')
  @ApiOperation({
    summary: 'Get CPI (Consumer Price Index)',
    description: 'Returns monthly Consumer Price Index data from Alpha Vantage',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    enum: ['monthly', 'semiannual'],
    description: 'Time interval (default: monthly)',
  })
  @ApiResponse({
    status: 200,
    description: 'CPI data retrieved successfully',
  })
  async getCPI(
    @Query('interval') interval: 'monthly' | 'semiannual' = 'monthly',
  ) {
    return this.alphaVantageApiService.getCPI(interval);
  }

  @Get('economic/inflation')
  @ApiOperation({
    summary: 'Get Inflation Rate',
    description: 'Returns annual inflation rates (consumer prices) of the United States',
  })
  @ApiResponse({
    status: 200,
    description: 'Inflation data retrieved successfully',
  })
  async getInflation() {
    return this.alphaVantageApiService.getInflation();
  }

  @Get('economic/unemployment')
  @ApiOperation({
    summary: 'Get Unemployment Rate',
    description: 'Returns monthly unemployment rate data of the United States',
  })
  @ApiResponse({
    status: 200,
    description: 'Unemployment data retrieved successfully',
  })
  async getUnemployment() {
    return this.alphaVantageApiService.getUnemployment();
  }

  @Get('economic/federal-funds-rate')
  @ApiOperation({
    summary: 'Get Federal Funds Rate (US Interest Rate)',
    description: 'Returns the federal funds rate (effective federal funds rate)',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    enum: ['daily', 'weekly', 'monthly'],
    description: 'Time interval (default: monthly)',
  })
  @ApiResponse({
    status: 200,
    description: 'Federal funds rate data retrieved successfully',
  })
  async getFederalFundsRate(
    @Query('interval') interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ) {
    return this.alphaVantageApiService.getFederalFundsRate(interval);
  }

  @Get('economic/treasury-yield')
  @ApiOperation({
    summary: 'Get US Treasury Yield',
    description: 'Returns US Treasury yield curve rates',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    enum: ['daily', 'weekly', 'monthly'],
    description: 'Time interval (default: monthly)',
  })
  @ApiQuery({
    name: 'maturity',
    required: false,
    enum: ['3month', '2year', '5year', '7year', '10year', '30year'],
    description: 'Bond maturity (default: 10year)',
  })
  @ApiResponse({
    status: 200,
    description: 'Treasury yield data retrieved successfully',
  })
  async getTreasuryYield(
    @Query('interval') interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
    @Query('maturity')
    maturity:
      | '3month'
      | '2year'
      | '5year'
      | '7year'
      | '10year'
      | '30year' = '10year',
  ) {
    return this.alphaVantageApiService.getTreasuryYield(interval, maturity);
  }

  @Get('forex/rate')
  @ApiOperation({
    summary: 'Get Forex Exchange Rate (Realtime)',
    description: 'Returns realtime exchange rate for currency pairs',
  })
  @ApiQuery({
    name: 'from',
    required: true,
    description: 'From currency code (e.g., USD, EUR)',
  })
  @ApiQuery({
    name: 'to',
    required: true,
    description: 'To currency code (e.g., THB, JPY)',
  })
  @ApiResponse({
    status: 200,
    description: 'Forex rate retrieved successfully',
    schema: {
      example: {
        'Realtime Currency Exchange Rate': {
          '1. From_Currency Code': 'USD',
          '2. From_Currency Name': 'United States Dollar',
          '3. To_Currency Code': 'THB',
          '4. To_Currency Name': 'Thai Baht',
          '5. Exchange Rate': '33.95000000',
          '6. Last Refreshed': '2024-01-15 12:00:00',
          '7. Time Zone': 'UTC',
          '8. Bid Price': '33.94000000',
          '9. Ask Price': '33.96000000',
        },
      },
    },
  })
  async getForexRate(
    @Query('from') fromCurrency: string,
    @Query('to') toCurrency: string,
  ) {
    return this.alphaVantageApiService.getForexRate(fromCurrency, toCurrency);
  }

  @Get('forex/daily')
  @ApiOperation({
    summary: 'Get Forex Daily Time Series',
    description: 'Returns daily forex OHLC (Open, High, Low, Close) data',
  })
  @ApiQuery({
    name: 'from',
    required: true,
    description: 'From currency symbol',
  })
  @ApiQuery({ name: 'to', required: true, description: 'To currency symbol' })
  @ApiQuery({
    name: 'outputsize',
    required: false,
    enum: ['compact', 'full'],
    description: 'Output size (default: compact = last 100 data points)',
  })
  @ApiResponse({
    status: 200,
    description: 'Forex daily data retrieved successfully',
  })
  async getForexDaily(
    @Query('from') fromSymbol: string,
    @Query('to') toSymbol: string,
    @Query('outputsize') outputsize: 'compact' | 'full' = 'compact',
  ) {
    return this.alphaVantageApiService.getForexDaily(
      fromSymbol,
      toSymbol,
      outputsize,
    );
  }

  @Get('commodities/oil-wti')
  @ApiOperation({
    summary: 'Get Crude Oil WTI Prices',
    description: 'Returns West Texas Intermediate (WTI) crude oil prices',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    enum: ['daily', 'weekly', 'monthly'],
    description: 'Time interval (default: monthly)',
  })
  @ApiResponse({
    status: 200,
    description: 'Crude Oil WTI prices retrieved successfully',
  })
  async getCrudeOilWTI(
    @Query('interval') interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ) {
    return this.alphaVantageApiService.getCrudeOilWTI(interval);
  }

  @Get('commodities/oil-brent')
  @ApiOperation({
    summary: 'Get Crude Oil Brent Prices',
    description: 'Returns Brent crude oil prices (Europe benchmark)',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    enum: ['daily', 'weekly', 'monthly'],
    description: 'Time interval (default: monthly)',
  })
  @ApiResponse({
    status: 200,
    description: 'Crude Oil Brent prices retrieved successfully',
  })
  async getCrudeOilBrent(
    @Query('interval') interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ) {
    return this.alphaVantageApiService.getCrudeOilBrent(interval);
  }

  @Get('commodities/natural-gas')
  @ApiOperation({
    summary: 'Get Natural Gas Prices',
    description: 'Returns natural gas prices (Henry Hub)',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    enum: ['daily', 'weekly', 'monthly'],
    description: 'Time interval (default: monthly)',
  })
  @ApiResponse({
    status: 200,
    description: 'Natural gas prices retrieved successfully',
  })
  async getNaturalGas(
    @Query('interval') interval: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ) {
    return this.alphaVantageApiService.getNaturalGas(interval);
  }

  @Get('commodities/copper')
  @ApiOperation({
    summary: 'Get Copper Prices',
    description: 'Returns global copper prices',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    enum: ['monthly', 'quarterly', 'annual'],
    description: 'Time interval (default: monthly)',
  })
  @ApiResponse({
    status: 200,
    description: 'Copper prices retrieved successfully',
  })
  async getCopper(
    @Query('interval') interval: 'monthly' | 'quarterly' | 'annual' = 'monthly',
  ) {
    return this.alphaVantageApiService.getCopper(interval);
  }

  @Get('stock/quote')
  @ApiOperation({
    summary: 'Get Global Stock Quote',
    description:
      'Returns latest price and volume for a stock symbol (e.g., SPY for S&P 500)',
  })
  @ApiQuery({
    name: 'symbol',
    required: true,
    description: 'Stock symbol (e.g., SPY, AAPL, DIA)',
  })
  @ApiResponse({
    status: 200,
    description: 'Stock quote retrieved successfully',
    schema: {
      example: {
        'Global Quote': {
          '01. symbol': 'SPY',
          '02. open': '470.50',
          '03. high': '472.80',
          '04. low': '469.30',
          '05. price': '471.25',
          '06. volume': '85234567',
          '07. latest trading day': '2024-01-15',
          '08. previous close': '470.00',
          '09. change': '1.25',
          '10. change percent': '0.27%',
        },
      },
    },
  })
  async getGlobalQuote(@Query('symbol') symbol: string) {
    return this.alphaVantageApiService.getGlobalQuote(symbol);
  }

  @Get('news')
  @ApiOperation({
    summary: 'Get Market News & Sentiment',
    description:
      'Returns latest market news with sentiment analysis from multiple sources',
  })
  @ApiQuery({
    name: 'tickers',
    required: false,
    description: 'Comma-separated ticker symbols (e.g., AAPL,MSFT)',
  })
  @ApiQuery({
    name: 'topics',
    required: false,
    description:
      'News topics (e.g., economy, finance, technology, blockchain)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of news items (default: 50, max: 1000)',
  })
  @ApiResponse({
    status: 200,
    description: 'Market news retrieved successfully',
  })
  async getMarketNews(
    @Query('tickers') tickers?: string,
    @Query('topics') topics?: string,
    @Query('limit') limit: number = 50,
  ) {
    return this.alphaVantageApiService.getMarketNews(tickers, topics, limit);
  }

  @Get('crypto/rate')
  @ApiOperation({
    summary: 'Get Cryptocurrency Exchange Rate',
    description:
      'Returns realtime exchange rate for cryptocurrencies (BTC, ETH, etc.)',
  })
  @ApiQuery({
    name: 'crypto',
    required: true,
    description: 'Cryptocurrency symbol (e.g., BTC, ETH, LTC)',
  })
  @ApiQuery({
    name: 'market',
    required: false,
    description: 'Market currency (default: USD)',
  })
  @ApiResponse({
    status: 200,
    description: 'Crypto rate retrieved successfully',
  })
  async getCryptoRate(
    @Query('crypto') cryptocurrency: string,
    @Query('market') market: string = 'USD',
  ) {
    return this.alphaVantageApiService.getCryptoRate(cryptocurrency, market);
  }

  @Get('crypto/daily')
  @ApiOperation({
    summary: 'Get Cryptocurrency Daily Data',
    description: 'Returns daily historical crypto data with market cap and volume',
  })
  @ApiQuery({
    name: 'symbol',
    required: true,
    description: 'Cryptocurrency symbol (e.g., BTC, ETH)',
  })
  @ApiQuery({
    name: 'market',
    required: false,
    description: 'Market currency (default: USD)',
  })
  @ApiResponse({
    status: 200,
    description: 'Crypto daily data retrieved successfully',
  })
  async getCryptoDaily(
    @Query('symbol') symbol: string,
    @Query('market') market: string = 'USD',
  ) {
    return this.alphaVantageApiService.getCryptoDaily(symbol, market);
  }

  @Get('stock/top-gainers-losers')
  @ApiOperation({
    summary: 'Get Top Gainers & Losers',
    description:
      'Returns top 20 gainers, losers, and most actively traded tickers in US market',
  })
  @ApiResponse({
    status: 200,
    description: 'Top gainers & losers retrieved successfully',
  })
  async getTopGainersLosers() {
    return this.alphaVantageApiService.getTopGainersLosers();
  }

  @Get('summary/daily')
  @ApiOperation({
    summary: 'Get Daily Economic Summary',
    description:
      'Returns comprehensive daily summary of global economic indicators, commodities, forex, crypto, and market news',
  })
  @ApiResponse({
    status: 200,
    description: 'Daily economic summary retrieved successfully',
    schema: {
      example: {
        timestamp: '2024-01-15T10:00:00.000Z',
        economic_indicators: {
          gdp: '...',
          inflation: '...',
          unemployment: '...',
          federal_funds_rate: '...',
        },
        commodities: {
          crude_oil_wti: '...',
          crude_oil_brent: '...',
        },
        forex: {
          usd_eur: '...',
          usd_thb: '...',
        },
        crypto: {
          btc_usd: '...',
        },
        stock_market: {
          sp500: '...',
        },
        news: '...',
      },
    },
  })
  async getDailyEconomicSummary() {
    return this.alphaVantageApiService.getDailyEconomicSummary();
  }
}
