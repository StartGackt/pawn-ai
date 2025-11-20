import { Test, TestingModule } from '@nestjs/testing';
import { LoanRateApiController } from './loan-rate-api.controller';
import { LoanRateApiService } from './loan-rate-api.service';

describe('LoanRateApiController', () => {
  let controller: LoanRateApiController;
  let service: LoanRateApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanRateApiController],
      providers: [
        {
          provide: LoanRateApiService,
          useValue: {
            getLoanRates: jest.fn(),
            getAverageLoanRates: jest.fn(),
            getLatestAverageRates: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoanRateApiController>(LoanRateApiController);
    service = module.get<LoanRateApiService>(LoanRateApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLoanRates', () => {
    it('should return loan rates data', async () => {
      const mockData = {
        result: {
          api: 'Loan Interest Rates',
          timestamp: '2024-11-20',
          data: {
            data_detail: [],
          },
        },
      };

      jest.spyOn(service, 'getLoanRates').mockResolvedValue(mockData);
      const result = await controller.getLoanRates();
      expect(result).toEqual(mockData);
    });
  });

  describe('getLatestRates', () => {
    it('should return latest rates', async () => {
      const mockData = {
        period: '2024-11-20',
        rates: {
          mor: 7.9,
          mlr: 7.1,
          mrr: 8.4,
          ceiling_rate: 23.0,
          default_rate: 24.8,
          creditcard_min: 19.4,
          creditcard_max: 19.4,
        },
      };

      jest.spyOn(service, 'getLatestAverageRates').mockResolvedValue(mockData);
      const result = await controller.getLatestRates();
      expect(result).toEqual(mockData);
    });
  });
});
