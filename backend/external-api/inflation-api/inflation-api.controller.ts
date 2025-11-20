import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InflationApiService, InflationResponse } from './inflation-api.service';

@ApiTags('external-api')
@Controller('api/external-api/inflation')
export class InflationApiController {
  constructor(private readonly inflationApiService: InflationApiService) {}

  @Get('cpi')
  @ApiOperation({
    summary: 'Get Consumer Price Index (CPI) data',
    description: 'Fetch CPI data from Bank of Thailand - measures changes in the price level of consumer goods and services',
  })
  @ApiQuery({
    name: 'start_period',
    required: false,
    description: 'Start period (YYYY-MM)',
    example: '2024-01',
  })
  @ApiQuery({
    name: 'end_period',
    required: false,
    description: 'End period (YYYY-MM)',
    example: '2024-11',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved CPI data',
    schema: {
      example: {
        result: {
          api: 'Consumer Price Index',
          timestamp: '2024-11-20T10:00:00Z',
          data: {
            data_header: {
              report_name_eng: 'Consumer Price Index (CPI)',
              report_name_th: 'ดัชนีราคาผู้บริโภค',
              unit_eng: 'Index 2019=100',
              unit_th: 'ดัชนี 2562=100',
              last_updated: '2024-11-20',
            },
            data_detail: [
              {
                period: '2024-11',
                headline_inflation: '0.85',
                core_inflation: '0.52',
                cpi_all_items: '107.25',
              },
            ],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid API key',
  })
  async getCPI(
    @Query('start_period') startPeriod?: string,
    @Query('end_period') endPeriod?: string,
  ): Promise<InflationResponse> {
    return this.inflationApiService.getCPI(startPeriod, endPeriod);
  }

  @Get('rate')
  @ApiOperation({
    summary: 'Get inflation rate data',
    description: 'Fetch headline and core inflation rates from Bank of Thailand (Year-over-Year % change)',
  })
  @ApiQuery({
    name: 'start_period',
    required: false,
    description: 'Start period (YYYY-MM)',
    example: '2024-01',
  })
  @ApiQuery({
    name: 'end_period',
    required: false,
    description: 'End period (YYYY-MM)',
    example: '2024-11',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved inflation rate data',
    schema: {
      example: {
        result: {
          api: 'Inflation Rate',
          timestamp: '2024-11-20T10:00:00Z',
          data: {
            data_header: {
              report_name_eng: 'Inflation Rate (YoY % change)',
              report_name_th: 'อัตราเงินเฟ้อ',
              unit_eng: 'Percent',
              unit_th: 'ร้อยละ',
              last_updated: '2024-11-20',
            },
            data_detail: [
              {
                period: '2024-11',
                headline_inflation: '0.85',
                core_inflation: '0.52',
              },
            ],
          },
        },
      },
    },
  })
  async getInflationRate(
    @Query('start_period') startPeriod?: string,
    @Query('end_period') endPeriod?: string,
  ): Promise<InflationResponse> {
    return this.inflationApiService.getInflationRate(startPeriod, endPeriod);
  }

  @Get('current')
  @ApiOperation({
    summary: 'Get current inflation rate',
    description: 'Get the most recent headline and core inflation rates',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved current inflation',
    schema: {
      example: {
        headline: 0.85,
        core: 0.52,
        period: '2024-11',
        timestamp: '2024-11-20T10:00:00Z',
      },
    },
  })
  async getCurrentInflation(): Promise<{
    headline: number;
    core: number;
    period: string;
    timestamp: string;
  }> {
    return this.inflationApiService.getCurrentInflation();
  }

  @Get('year/:year')
  @ApiOperation({
    summary: 'Get inflation data for a specific year',
    description: 'Fetch monthly inflation data for a given year',
  })
  @ApiParam({
    name: 'year',
    description: 'Year (YYYY)',
    example: 2024,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved inflation data for the year',
  })
  async getInflationByYear(@Param('year') year: number): Promise<InflationResponse> {
    return this.inflationApiService.getInflationByYear(year);
  }

  @Get('average/:year')
  @ApiOperation({
    summary: 'Get average inflation for a specific year',
    description: 'Calculate average headline and core inflation rates for a given year',
  })
  @ApiParam({
    name: 'year',
    description: 'Year (YYYY)',
    example: 2024,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully calculated average inflation',
    schema: {
      example: {
        year: 2024,
        headline_avg: 0.75,
        core_avg: 0.48,
        months: 11,
      },
    },
  })
  async getAverageInflation(@Param('year') year: number): Promise<{
    year: number;
    headline_avg: number;
    core_avg: number;
    months: number;
  }> {
    return this.inflationApiService.getAverageInflation(year);
  }
}
