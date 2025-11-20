import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HolidayApiService, HolidayResponse, HolidayDetail } from './holiday-api.service';

@ApiTags('external-api')
@Controller('api/external-api/holidays')
export class HolidayApiController {
  constructor(private readonly holidayApiService: HolidayApiService) {}

  @Get()
  @ApiOperation({
    summary: 'Get financial institutions holidays',
    description: 'Fetch the list of official holidays for financial institutions in Thailand from Bank of Thailand',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Filter holidays by year (e.g., 2024, 2025)',
    example: 2024,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved holidays',
    schema: {
      example: {
        holidays: [
          {
            HolidayWeekDay: 'Monday',
            HolidayWeekDayThai: 'วันจันทร์',
            Date: '2024-01-01',
            DateThai: '01/01/2567',
            HolidayDescription: "New Year's Day",
            HolidayDescriptionThai: 'วันขึ้นปีใหม่',
          },
          {
            HolidayWeekDay: 'Tuesday',
            HolidayWeekDayThai: 'วันอังคาร',
            Date: '2024-04-06',
            DateThai: '06/04/2567',
            HolidayDescription: 'Chakri Memorial Day',
            HolidayDescriptionThai: 'วันจักรี',
          },
        ],
        year: 2024,
        total: 2,
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
  async getHolidays(@Query('year') year?: number): Promise<HolidayResponse> {
    return this.holidayApiService.getHolidays(year);
  }

  @Get('upcoming')
  @ApiOperation({
    summary: 'Get upcoming holidays',
    description: 'Fetch the next upcoming holidays for financial institutions from today onwards',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of upcoming holidays to return',
    example: 5,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved upcoming holidays',
    schema: {
      example: {
        holidays: [
          {
            HolidayWeekDay: 'Monday',
            HolidayWeekDayThai: 'วันจันทร์',
            Date: '2024-12-31',
            DateThai: '31/12/2567',
            HolidayDescription: "New Year's Eve",
            HolidayDescriptionThai: 'วันสิ้นปี',
          },
        ],
        total: 1,
      },
    },
  })
  async getUpcomingHolidays(@Query('limit') limit?: number): Promise<HolidayResponse> {
    return this.holidayApiService.getUpcomingHolidays(limit || 5);
  }

  @Get('check/:date')
  @ApiOperation({
    summary: 'Check if a date is a holiday',
    description: 'Check if a specific date is an official holiday for financial institutions',
  })
  @ApiParam({
    name: 'date',
    description: 'Date in YYYY-MM-DD format',
    example: '2024-01-01',
  })
  @ApiResponse({
    status: 200,
    description: 'Holiday information if it is a holiday, null otherwise',
    schema: {
      example: {
        HolidayWeekDay: 'Monday',
        HolidayWeekDayThai: 'วันจันทร์',
        Date: '2024-01-01',
        DateThai: '01/01/2567',
        HolidayDescription: "New Year's Day",
        HolidayDescriptionThai: 'วันขึ้นปีใหม่',
      },
    },
  })
  async checkHoliday(@Param('date') date: string): Promise<HolidayDetail | null> {
    return this.holidayApiService.checkHoliday(date);
  }

  @Get('by-month/:year/:month')
  @ApiOperation({
    summary: 'Get holidays by month',
    description: 'Fetch all holidays for a specific month and year',
  })
  @ApiParam({
    name: 'year',
    description: 'Year (e.g., 2024)',
    example: 2024,
  })
  @ApiParam({
    name: 'month',
    description: 'Month (1-12)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved holidays for the specified month',
    schema: {
      example: {
        holidays: [
          {
            HolidayWeekDay: 'Monday',
            HolidayWeekDayThai: 'วันจันทร์',
            Date: '2024-01-01',
            DateThai: '01/01/2567',
            HolidayDescription: "New Year's Day",
            HolidayDescriptionThai: 'วันขึ้นปีใหม่',
          },
        ],
        year: 2024,
        total: 1,
      },
    },
  })
  async getHolidaysByMonth(
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<HolidayResponse> {
    return this.holidayApiService.getHolidaysByMonth(Number(year), Number(month));
  }
}
