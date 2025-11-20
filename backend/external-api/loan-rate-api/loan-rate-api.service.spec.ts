import { Test, TestingModule } from '@nestjs/testing';
import { LoanRateApiService } from './loan-rate-api.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('LoanRateApiService', () => {
  let service: LoanRateApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanRateApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoanRateApiService>(LoanRateApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
