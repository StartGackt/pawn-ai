import { Test, TestingModule } from '@nestjs/testing';
import { PolicyRateApiService } from './policy-rate-api.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('PolicyRateApiService', () => {
  let service: PolicyRateApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolicyRateApiService,
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

    service = module.get<PolicyRateApiService>(PolicyRateApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
