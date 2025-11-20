import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BotApiService } from './bot-api.service';
import { SpotRateResponseDto, CurrentRateResponseDto } from './dto/spot-rate-response.dto';

@ApiTags('external-api')
@Controller('external-api/bot')
export class BotApiController {
  constructor(private readonly botApiService: BotApiService) {}

  @Get('spot-rate')
  @ApiOperation({ summary: 'Get USD/THB spot rate from Bank of Thailand' })
  @ApiQuery({ 
    name: 'start_period', 
    required: false, 
    description: 'Start period date (YYYY-MM-DD). Defaults to today',
    example: '2024-11-20'
  })
  @ApiQuery({ 
    name: 'end_period', 
    required: false, 
    description: 'End period date (YYYY-MM-DD). Defaults to today',
    example: '2024-11-20'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns spot rate data including bid, offer, and historical rates',
    type: SpotRateResponseDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid API key' })
  @ApiResponse({ status: 503, description: 'Service unavailable - BOT API error' })
  async getSpotRate(
    @Query('start_period') startPeriod?: string,
    @Query('end_period') endPeriod?: string,
  ): Promise<SpotRateResponseDto> {
    return this.botApiService.getSpotRate(startPeriod, endPeriod);
  }

  @Get('current-rate')
  @ApiOperation({ summary: 'Get current USD/THB exchange rate (average of bid/offer)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the current average exchange rate',
    type: CurrentRateResponseDto
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getCurrentRate(): Promise<CurrentRateResponseDto> {
    const rate = await this.botApiService.getCurrentRate();
    return {
      rate,
      timestamp: new Date().toISOString()
    };
  }
}
