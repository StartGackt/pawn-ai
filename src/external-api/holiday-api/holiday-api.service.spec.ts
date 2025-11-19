import { Test, TestingModule } from '@nestjs/testing';
import { HolidayApiService } from './holiday-api.service';

describe('HolidayApiService', () => {
  let service: HolidayApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayApiService],
    }).compile();

    service = module.get<HolidayApiService>(HolidayApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
