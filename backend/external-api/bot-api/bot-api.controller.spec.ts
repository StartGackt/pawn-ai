import { Test, TestingModule } from '@nestjs/testing';
import { BotApiController } from './bot-api.controller';
import { BotApiService } from './bot-api.service';

describe('BotApiController', () => {
  let controller: BotApiController;
  let service: BotApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotApiController],
      providers: [
        {
          provide: BotApiService,
          useValue: {
            getSpotRate: jest.fn(),
            getCurrentRate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BotApiController>(BotApiController);
    service = module.get<BotApiService>(BotApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSpotRate', () => {
    it('should return spot rate data', async () => {
      const mockData = {
        result: {
          api: 'Spot Rate USD/THB',
          timestamp: '2024-11-20 10:30:00',
          data: {
            data_header: {},
            data_detail: [{ period: 'Spot', bid: '33.85', offer: '33.95' }],
          },
        },
      };

      jest.spyOn(service, 'getSpotRate').mockResolvedValue(mockData as any);
      const result = await controller.getSpotRate();
      expect(result).toEqual(mockData);
    });
  });

  describe('getCurrentRate', () => {
    it('should return current exchange rate', async () => {
      jest.spyOn(service, 'getCurrentRate').mockResolvedValue(33.90);
      const result = await controller.getCurrentRate();
      
      expect(result).toHaveProperty('rate');
      expect(result).toHaveProperty('timestamp');
      expect(result.rate).toBe(33.90);
    });
  });
});
