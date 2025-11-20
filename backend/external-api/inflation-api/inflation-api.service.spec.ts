import { Test, TestingModule } from '@nestjs/testing';
import { InflationApiService } from './inflation-api.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('InflationApiService', () => {
  let service: InflationApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InflationApiService,
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

    service = module.get<InflationApiService>(InflationApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
