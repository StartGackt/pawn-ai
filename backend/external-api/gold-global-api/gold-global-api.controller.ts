import { Controller, Get, Logger, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { GoldGlobalApiService } from './gold-global-api.service';

@ApiTags('Global Metal Prices')
@Controller('external-api/gold-global')
export class GoldGlobalApiController {
  private readonly logger = new Logger(GoldGlobalApiController.name);

  constructor(private readonly goldGlobalApiService: GoldGlobalApiService) {}

  @Get('latest')
  @ApiOperation({
    summary: 'Get latest metal prices',
    description:
      'Returns the latest precious metals and currency exchange rates from MetalPriceAPI.com',
  })
  @ApiQuery({
    name: 'base',
    required: false,
    description: 'Base currency (default: USD)',
    example: 'USD',
  })
  @ApiQuery({
    name: 'currencies',
    required: false,
    description:
      'Comma-separated list of currencies/metals (e.g., XAU,XAG,THB,EUR)',
    example: 'XAU,XAG,THB',
  })
  @ApiResponse({
    status: 200,
    description: 'Latest metal prices retrieved successfully',
    schema: {
      example: {
        success: true,
        base: 'USD',
        timestamp: 1625609377,
        rates: {
          EUR: 0.8255334,
          XAG: 0.03602543,
          XAU: 0.00053853,
          THB: 33.25,
        },
      },
    },
  })
  async getLatestPrices(
    @Query('base') base?: string,
    @Query('currencies') currencies?: string,
  ) {
    this.logger.log(
      `GET /latest - Fetching latest prices (base: ${base || 'USD'})`,
    );
    return this.goldGlobalApiService.getLatestPrices(base, currencies);
  }

  @Get('gold')
  @ApiOperation({
    summary: 'Get current gold price',
    description:
      'Returns current gold price (XAU) in USD per troy ounce and in Thai Baht',
  })
  @ApiResponse({
    status: 200,
    description: 'Gold price retrieved successfully',
    schema: {
      example: {
        price_per_oz: 1856.91,
        price_in_thb: 61742.24,
        timestamp: 1625609377,
        date: '2021-07-07T03:29:37.000Z',
      },
    },
  })
  async getGoldPrice() {
    this.logger.log('GET /gold - Fetching current gold price');
    return this.goldGlobalApiService.getGoldPrice();
  }

  @Get('silver')
  @ApiOperation({
    summary: 'Get current silver price',
    description:
      'Returns current silver price (XAG) in USD per troy ounce and in Thai Baht',
  })
  @ApiResponse({
    status: 200,
    description: 'Silver price retrieved successfully',
    schema: {
      example: {
        price_per_oz: 27.76,
        price_in_thb: 922.53,
        timestamp: 1625609377,
        date: '2021-07-07T03:29:37.000Z',
      },
    },
  })
  async getSilverPrice() {
    this.logger.log('GET /silver - Fetching current silver price');
    return this.goldGlobalApiService.getSilverPrice();
  }

  @Get('all-metals')
  @ApiOperation({
    summary: 'Get all precious metals prices',
    description:
      'Returns current prices for Gold, Silver, Platinum, and Palladium in USD and THB',
  })
  @ApiResponse({
    status: 200,
    description: 'All metal prices retrieved successfully',
    schema: {
      example: {
        gold: { price_per_oz: 1856.91, price_in_thb: 61742.24 },
        silver: { price_per_oz: 27.76, price_in_thb: 922.53 },
        platinum: { price_per_oz: 1145.23, price_in_thb: 38078.89 },
        palladium: { price_per_oz: 2845.67, price_in_thb: 94618.53 },
        timestamp: 1625609377,
        date: '2021-07-07T03:29:37.000Z',
      },
    },
  })
  async getAllMetalPrices() {
    this.logger.log('GET /all-metals - Fetching all precious metal prices');
    return this.goldGlobalApiService.getAllMetalPrices();
  }

  @Get('convert')
  @ApiOperation({
    summary: 'Convert currency/metal amount',
    description:
      'Convert any amount from one currency/metal to another (e.g., USD to XAU, THB to XAG)',
  })
  @ApiQuery({
    name: 'from',
    required: true,
    description: 'Source currency/metal code',
    example: 'USD',
  })
  @ApiQuery({
    name: 'to',
    required: true,
    description: 'Target currency/metal code',
    example: 'XAU',
  })
  @ApiQuery({
    name: 'amount',
    required: true,
    description: 'Amount to convert',
    example: 100,
  })
  @ApiResponse({
    status: 200,
    description: 'Conversion completed successfully',
    schema: {
      example: {
        success: true,
        query: { from: 'USD', to: 'XAU', amount: 100 },
        info: { quote: 0.0005628, timestamp: 1619150400 },
        result: 0.05628031,
      },
    },
  })
  async convertCurrency(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: number,
  ) {
    this.logger.log(`GET /convert - Converting ${amount} ${from} to ${to}`);
    return this.goldGlobalApiService.convertCurrency(from, to, amount);
  }

  @Get('historical/:date')
  @ApiOperation({
    summary: 'Get historical metal prices',
    description:
      'Returns metal prices for a specific date in the past (format: YYYY-MM-DD)',
  })
  @ApiParam({
    name: 'date',
    required: true,
    description: 'Date in YYYY-MM-DD format',
    example: '2024-01-15',
  })
  @ApiQuery({
    name: 'base',
    required: false,
    description: 'Base currency (default: USD)',
    example: 'USD',
  })
  @ApiQuery({
    name: 'currencies',
    required: false,
    description: 'Comma-separated list of currencies/metals',
    example: 'XAU,XAG,THB',
  })
  @ApiResponse({
    status: 200,
    description: 'Historical prices retrieved successfully',
    schema: {
      example: {
        success: true,
        base: 'USD',
        timestamp: 1616558399,
        rates: {
          XAU: 0.00053853,
          XAG: 0.03602543,
          THB: 33.25,
        },
      },
    },
  })
  async getHistoricalPrices(
    @Param('date') date: string,
    @Query('base') base?: string,
    @Query('currencies') currencies?: string,
  ) {
    this.logger.log(`GET /historical/${date} - Fetching historical prices`);
    return this.goldGlobalApiService.getHistoricalPrices(
      date,
      base,
      currencies,
    );
  }

  @Get('change')
  @ApiOperation({
    summary: 'Get price change over time period',
    description:
      'Returns the price change (amount and percentage) for metals between two dates',
  })
  @ApiQuery({
    name: 'start_date',
    required: true,
    description: 'Start date (YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'end_date',
    required: true,
    description: 'End date (YYYY-MM-DD)',
    example: '2024-01-31',
  })
  @ApiQuery({
    name: 'base',
    required: false,
    description: 'Base currency (default: USD)',
    example: 'USD',
  })
  @ApiQuery({
    name: 'currencies',
    required: false,
    description: 'Comma-separated list of currencies/metals (default: XAU,XAG)',
    example: 'XAU,XAG',
  })
  @ApiResponse({
    status: 200,
    description: 'Price change data retrieved successfully',
    schema: {
      example: {
        success: true,
        base: 'USD',
        start_date: '2024-01-01',
        end_date: '2024-01-31',
        rates: {
          XAU: {
            start_rate: 0.00059101,
            end_rate: 0.00059256,
            change: 0.00000155,
            change_pct: 0.2623,
          },
        },
      },
    },
  })
  async getPriceChange(
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
    @Query('base') base?: string,
    @Query('currencies') currencies?: string,
  ) {
    this.logger.log(
      `GET /change - Fetching price change from ${startDate} to ${endDate}`,
    );
    return this.goldGlobalApiService.getPriceChange(
      startDate,
      endDate,
      base,
      currencies,
    );
  }
}
