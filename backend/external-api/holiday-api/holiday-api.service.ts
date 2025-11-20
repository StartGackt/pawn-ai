import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export interface HolidayDetail {
  HolidayWeekDay: string;
  HolidayWeekDayThai: string;
  Date: string;
  DateThai: string;
  HolidayDescription: string;
  HolidayDescriptionThai: string;
}

export interface HolidayResponse {
  holidays: HolidayDetail[];
  year?: number;
  total?: number;
}

@Injectable()
export class HolidayApiService {
  private readonly logger = new Logger(HolidayApiService.name);
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>(
      'BOT_HOLIDAY_API_URL',
      'https://gateway.api.bot.or.th/financial-institutions-holidays/',
    );
    this.apiKey = this.configService.get<string>(
      'BOT_API_KEY',
      '',
    );
  }

  /**
   * Get financial institutions holidays
   * @param year Year filter (e.g., 2024, 2025) - defaults to current year
   * @returns List of holidays for financial institutions
   */
  async getHolidays(year?: number): Promise<HolidayResponse> {
    try {
      // Default to current year if not specified (API requires year parameter)
      const targetYear = year || new Date().getFullYear();
      
      this.logger.log(`Fetching financial institutions holidays for year ${targetYear}`);

      const response = await firstValueFrom(
        this.httpService.get<HolidayDetail[]>(this.apiUrl, {
          params: {
            year: targetYear.toString(),
          },
          headers: {
            Accept: 'application/json',
            Authorization: this.apiKey,
          },
        }),
      );

      const holidays = response.data;

      this.logger.log(`Successfully fetched ${holidays.length} holidays for year ${targetYear}`);

      return {
        holidays,
        year: targetYear,
        total: holidays.length,
      };
    } catch (error) {
      this.logger.error('Failed to fetch holidays', error.stack);
      throw error;
    }
  }

  /**
   * Get upcoming holidays from today
   * @param limit Number of upcoming holidays to return (default: 5)
   * @returns List of upcoming holidays
   */
  async getUpcomingHolidays(limit: number = 5): Promise<HolidayResponse> {
    try {
      this.logger.log(`Fetching ${limit} upcoming holidays`);

      const today = new Date();
      const currentYear = today.getFullYear();
      today.setHours(0, 0, 0, 0);

      // Fetch current year and next year holidays
      const currentYearResponse = await firstValueFrom(
        this.httpService.get<HolidayDetail[]>(this.apiUrl, {
          params: {
            year: currentYear.toString(),
          },
          headers: {
            Accept: 'application/json',
            Authorization: this.apiKey,
          },
        }),
      );

      const nextYearResponse = await firstValueFrom(
        this.httpService.get<HolidayDetail[]>(this.apiUrl, {
          params: {
            year: (currentYear + 1).toString(),
          },
          headers: {
            Accept: 'application/json',
            Authorization: this.apiKey,
          },
        }),
      );

      // Combine both years
      const allHolidays = [...currentYearResponse.data, ...nextYearResponse.data];

      // Filter upcoming holidays and sort by date
      const upcomingHolidays = allHolidays
        .filter((holiday) => {
          const holidayDate = new Date(holiday.Date);
          return holidayDate >= today;
        })
        .sort((a, b) => {
          return new Date(a.Date).getTime() - new Date(b.Date).getTime();
        })
        .slice(0, limit);

      this.logger.log(`Found ${upcomingHolidays.length} upcoming holidays`);

      return {
        holidays: upcomingHolidays,
        total: upcomingHolidays.length,
      };
    } catch (error) {
      this.logger.error('Failed to fetch upcoming holidays', error.stack);
      throw error;
    }
  }

  /**
   * Check if a specific date is a holiday
   * @param date Date string in YYYY-MM-DD format
   * @returns Holiday information if it's a holiday, null otherwise
   */
  async checkHoliday(date: string): Promise<HolidayDetail | null> {
    try {
      this.logger.log(`Checking if ${date} is a holiday`);

      // Extract year from date
      const year = new Date(date).getFullYear();

      const response = await firstValueFrom(
        this.httpService.get<HolidayDetail[]>(this.apiUrl, {
          params: {
            year: year.toString(),
          },
          headers: {
            Accept: 'application/json',
            Authorization: this.apiKey,
          },
        }),
      );

      const holiday = response.data.find((h) => h.Date === date);

      if (holiday) {
        this.logger.log(`${date} is a holiday: ${holiday.HolidayDescription}`);
      } else {
        this.logger.log(`${date} is not a holiday`);
      }

      return holiday || null;
    } catch (error) {
      this.logger.error(`Failed to check holiday for ${date}`, error.stack);
      throw error;
    }
  }

  /**
   * Get holidays by month
   * @param year Year (e.g., 2024)
   * @param month Month (1-12)
   * @returns List of holidays in the specified month
   */
  async getHolidaysByMonth(year: number, month: number): Promise<HolidayResponse> {
    try {
      this.logger.log(`Fetching holidays for ${year}-${month.toString().padStart(2, '0')}`);

      const response = await firstValueFrom(
        this.httpService.get<HolidayDetail[]>(this.apiUrl, {
          params: {
            year: year.toString(),
          },
          headers: {
            Accept: 'application/json',
            Authorization: this.apiKey,
          },
        }),
      );

      const holidays = response.data.filter((holiday) => {
        const holidayDate = new Date(holiday.Date);
        return (
          holidayDate.getFullYear() === year &&
          holidayDate.getMonth() + 1 === month
        );
      });

      this.logger.log(`Found ${holidays.length} holidays in ${year}-${month}`);

      return {
        holidays,
        year,
        total: holidays.length,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch holidays for ${year}-${month}`, error.stack);
      throw error;
    }
  }
}
