import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoldThaiApiService } from './gold-thai-api.service';

@ApiTags('Thai Gold Prices')
@Controller('external-api/gold-thai')
export class GoldThaiApiController {
  private readonly logger = new Logger(GoldThaiApiController.name);

  constructor(private readonly goldThaiApiService: GoldThaiApiService) {}

  @Get('latest')
  @ApiOperation({
    summary: 'Get latest Thai gold prices',
    description:
      'Returns the latest Thai gold prices (buy/sell) for gold bars and gold ornaments from ทองคําราคา.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Latest Thai gold prices retrieved successfully',
    schema: {
      example: {
        status: 'success',
        response: {
          date: '18 พฤษภาคม 2565',
          update_time: 'เวลา 16:37 น.',
          price: {
            gold: {
              buy: '30,300.00',
              sell: '29,167.84',
            },
            gold_bar: {
              buy: '29,800.00',
              sell: '29,700.00',
            },
            change: {
              compare_previous: '+50',
              compare_yesterday: '-100',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to fetch gold prices from external API',
  })
  async getLatestPrice() {
    this.logger.log('GET /latest - Fetching latest Thai gold prices');
    return this.goldThaiApiService.getLatestPrice();
  }

  @Get('bar')
  @ApiOperation({
    summary: 'Get gold bar prices',
    description:
      'Returns current gold bar prices (buy/sell) as numeric values for easier calculations',
  })
  @ApiResponse({
    status: 200,
    description: 'Gold bar prices retrieved successfully',
    schema: {
      example: {
        buy: 29800.0,
        sell: 29700.0,
        date: '18 พฤษภาคม 2565',
        updateTime: 'เวลา 16:37 น.',
      },
    },
  })
  async getGoldBarPrices() {
    this.logger.log('GET /bar - Fetching gold bar prices');
    return this.goldThaiApiService.getGoldBarPrices();
  }

  @Get('ornament')
  @ApiOperation({
    summary: 'Get gold ornament prices',
    description:
      'Returns current gold ornament prices (buy/sell) as numeric values for easier calculations',
  })
  @ApiResponse({
    status: 200,
    description: 'Gold ornament prices retrieved successfully',
    schema: {
      example: {
        buy: 30300.0,
        sell: 29167.84,
        date: '18 พฤษภาคม 2565',
        updateTime: 'เวลา 16:37 น.',
      },
    },
  })
  async getGoldOrnamentPrices() {
    this.logger.log('GET /ornament - Fetching gold ornament prices');
    return this.goldThaiApiService.getGoldOrnamentPrices();
  }
}
