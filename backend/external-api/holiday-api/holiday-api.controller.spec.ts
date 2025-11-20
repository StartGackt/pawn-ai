import { Test, TestingModule } from '@nestjs/testing';
import { HolidayApiController } from './holiday-api.controller';
import { HolidayApiService } from './holiday-api.service';

describe('HolidayApiController', () => {
  let controller: HolidayApiController;
  let service: HolidayApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidayApiController],
      providers: [
        {
          provide: HolidayApiService,
          useValue: {
            getHolidays: jest.fn(),
            getUpcomingHolidays: jest.fn(),
            checkHoliday: jest.fn(),
            getHolidaysByMonth: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HolidayApiController>(HolidayApiController);
    service = module.get<HolidayApiService>(HolidayApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHolidays', () => {
    it('should return holidays data', async () => {
      const mockData = {
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
      };

      jest.spyOn(service, 'getHolidays').mockResolvedValue(mockData);
      const result = await controller.getHolidays(2024);
      expect(result).toEqual(mockData);
    });
  });

  describe('checkHoliday', () => {
    it('should check if date is a holiday', async () => {
      const mockHoliday = {
        HolidayWeekDay: 'Monday',
        HolidayWeekDayThai: 'วันจันทร์',
        Date: '2024-01-01',
        DateThai: '01/01/2567',
        HolidayDescription: "New Year's Day",
        HolidayDescriptionThai: 'วันขึ้นปีใหม่',
      };

      jest.spyOn(service, 'checkHoliday').mockResolvedValue(mockHoliday);
      const result = await controller.checkHoliday('2024-01-01');
      expect(result).toEqual(mockHoliday);
    });
  });
});
