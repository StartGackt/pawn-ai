import { Test, TestingModule } from '@nestjs/testing';
import { GoldThaiApiController } from './gold-thai-api.controller';
import { GoldThaiApiService } from './gold-thai-api.service';

describe('GoldThaiApiController', () => {
  let controller: GoldThaiApiController;
  let service: GoldThaiApiService;

  const mockGoldPriceResponse = {
    status: 'success',
    response: {
      date: '18 พฤษภาคม 2565',
      update_time: 'เวลา 16:37 น.',
      price: {
        gold: {
          buy: '30,300.00',
          sell: '29,167.84',
        },
        gold_bar: {
          buy: '29,800.00',
          sell: '29,700.00',
        },
        change: {
          compare_previous: '+50',
          compare_yesterday: '-100',
        },
      },
    },
  };

  const mockGoldBarPrices = {
    buy: 29800.0,
    sell: 29700.0,
    date: '18 พฤษภาคม 2565',
    updateTime: 'เวลา 16:37 น.',
  };

  const mockGoldOrnamentPrices = {
    buy: 30300.0,
    sell: 29167.84,
    date: '18 พฤษภาคม 2565',
    updateTime: 'เวลา 16:37 น.',
  };

  beforeEach(async () => {
    const mockService = {
      getLatestPrice: jest.fn(),
      getGoldBarPrices: jest.fn(),
      getGoldOrnamentPrices: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoldThaiApiController],
      providers: [
        {
          provide: GoldThaiApiService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<GoldThaiApiController>(GoldThaiApiController);
    service = module.get<GoldThaiApiService>(GoldThaiApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLatestPrice', () => {
    it('should return latest gold prices', async () => {
      jest.spyOn(service, 'getLatestPrice').mockResolvedValue(mockGoldPriceResponse);

      const result = await controller.getLatestPrice();

      expect(result).toEqual(mockGoldPriceResponse);
      expect(service.getLatestPrice).toHaveBeenCalled();
    });
  });

  describe('getGoldBarPrices', () => {
    it('should return gold bar prices', async () => {
      jest.spyOn(service, 'getGoldBarPrices').mockResolvedValue(mockGoldBarPrices);

      const result = await controller.getGoldBarPrices();

      expect(result).toEqual(mockGoldBarPrices);
      expect(service.getGoldBarPrices).toHaveBeenCalled();
    });
  });

  describe('getGoldOrnamentPrices', () => {
    it('should return gold ornament prices', async () => {
      jest
        .spyOn(service, 'getGoldOrnamentPrices')
        .mockResolvedValue(mockGoldOrnamentPrices);

      const result = await controller.getGoldOrnamentPrices();

      expect(result).toEqual(mockGoldOrnamentPrices);
      expect(service.getGoldOrnamentPrices).toHaveBeenCalled();
    });
  });
});
