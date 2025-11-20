import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PolicyRateApiService, PolicyRateResponse } from './policy-rate-api.service';

@ApiTags('external-api')
@Controller('api/external-api/policy-rate')
export class PolicyRateApiController {
  constructor(private readonly policyRateApiService: PolicyRateApiService) {}

  @Get()
  @ApiOperation({
    summary: 'Get policy interest rate from Bank of Thailand',
    description: 'Fetch the BOT policy interest rate (อัตราดอกเบี้ยนโยบาย) which is the benchmark rate set by the Monetary Policy Committee',
  })
  @ApiQuery({
    name: 'start_period',
    required: false,
    description: 'Start date (YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'end_period',
    required: false,
    description: 'End date (YYYY-MM-DD)',
    example: '2024-11-20',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved policy rate data',
    schema: {
      example: {
        result: {
          api: 'Policy Interest Rate',
          timestamp: '2024-11-20T10:00:00Z',
          data: {
            data_header: {
              report_name_eng: 'Policy Interest Rate',
              report_name_th: 'อัตราดอกเบี้ยนโยบาย',
              last_updated: '2024-11-20',
            },
            data_detail: [
              {
                period: '2024-11-20',
                policy_rate: '2.50',
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
  @ApiResponse({
    status: 503,
    description: 'Service unavailable - BOT API is down',
  })
  async getPolicyRate(
    @Query('start_period') startPeriod?: string,
    @Query('end_period') endPeriod?: string,
  ): Promise<PolicyRateResponse> {
    return this.policyRateApiService.getPolicyRate(startPeriod, endPeriod);
  }

  @Get('current')
  @ApiOperation({
    summary: 'Get current policy rate',
    description: 'Get the most recent policy interest rate set by Bank of Thailand',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved current policy rate',
    schema: {
      example: {
        rate: 2.5,
        date: '2024-11-20',
        timestamp: '2024-11-20T10:00:00Z',
      },
    },
  })
  async getCurrentRate(): Promise<{ rate: number; date: string; timestamp: string }> {
    return this.policyRateApiService.getCurrentPolicyRate();
  }

  @Get('year/:year')
  @ApiOperation({
    summary: 'Get policy rate history for a specific year',
    description: 'Fetch all policy rate changes for a given year',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved policy rate history',
  })
  async getPolicyRateByYear(@Query('year') year: number): Promise<PolicyRateResponse> {
    return this.policyRateApiService.getPolicyRateByYear(year);
  }
}
