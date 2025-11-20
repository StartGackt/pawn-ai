import { Test, TestingModule } from '@nestjs/testing';
import { GoldGlobalApiController } from './gold-global-api.controller';
import { GoldGlobalApiService } from './gold-global-api.service';

describe('GoldGlobalApiController', () => {
  let controller: GoldGlobalApiController;
  let service: GoldGlobalApiService;

  const mockLatestPrices = {
    success: true,
    base: 'USD',
    timestamp: 1625609377,
    rates: {
      EUR: 0.8255334,
      XAG: 0.03602543,
      XAU: 0.00053853,
      THB: 33.25,
    },
  };

  const mockGoldPrice = {
    price_per_oz: 1856.91,
    price_in_thb: 61742.24,
    timestamp: 1625609377,
    date: '2021-07-07T03:29:37.000Z',
  };

  const mockSilverPrice = {
    price_per_oz: 27.76,
    price_in_thb: 922.53,
    timestamp: 1625609377,
    date: '2021-07-07T03:29:37.000Z',
  };

  const mockAllMetalPrices = {
    gold: { price_per_oz: 1856.91, price_in_thb: 61742.24 },
    silver: { price_per_oz: 27.76, price_in_thb: 922.53 },
    platinum: { price_per_oz: 1145.23, price_in_thb: 38078.89 },
    palladium: { price_per_oz: 2845.67, price_in_thb: 94618.53 },
    timestamp: 1625609377,
    date: '2021-07-07T03:29:37.000Z',
  };

  const mockConvertResponse = {
    success: true,
    query: { from: 'USD', to: 'XAU', amount: 100 },
    info: { quote: 0.0005628, timestamp: 1619150400 },
    result: 0.05628031,
  };

  const mockChangeResponse = {
    success: true,
    base: 'USD',
    start_date: '2024-01-01',
    end_date: '2024-01-31',
    rates: {
      XAU: {
        start_rate: 0.00059101,
        end_rate: 0.00059256,
        change: 0.00000155,
        change_pct: 0.2623,
      },
    },
  };

  beforeEach(async () => {
    const mockService = {
      getLatestPrices: jest.fn(),
      getGoldPrice: jest.fn(),
      getSilverPrice: jest.fn(),
      getAllMetalPrices: jest.fn(),
      convertCurrency: jest.fn(),
      getHistoricalPrices: jest.fn(),
      getPriceChange: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoldGlobalApiController],
      providers: [
        {
          provide: GoldGlobalApiService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<GoldGlobalApiController>(GoldGlobalApiController);
    service = module.get<GoldGlobalApiService>(GoldGlobalApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLatestPrices', () => {
    it('should return latest metal prices', async () => {
      jest
        .spyOn(service, 'getLatestPrices')
        .mockResolvedValue(mockLatestPrices);

      const result = await controller.getLatestPrices('USD', 'XAU,XAG,THB');

      expect(result).toEqual(mockLatestPrices);
      expect(service.getLatestPrices).toHaveBeenCalledWith('USD', 'XAU,XAG,THB');
    });
  });

  describe('getGoldPrice', () => {
    it('should return current gold price', async () => {
      jest.spyOn(service, 'getGoldPrice').mockResolvedValue(mockGoldPrice);

      const result = await controller.getGoldPrice();

      expect(result).toEqual(mockGoldPrice);
      expect(service.getGoldPrice).toHaveBeenCalled();
    });
  });

  describe('getSilverPrice', () => {
    it('should return current silver price', async () => {
      jest.spyOn(service, 'getSilverPrice').mockResolvedValue(mockSilverPrice);

      const result = await controller.getSilverPrice();

      expect(result).toEqual(mockSilverPrice);
      expect(service.getSilverPrice).toHaveBeenCalled();
    });
  });

  describe('getAllMetalPrices', () => {
    it('should return all precious metal prices', async () => {
      jest
        .spyOn(service, 'getAllMetalPrices')
        .mockResolvedValue(mockAllMetalPrices);

      const result = await controller.getAllMetalPrices();

      expect(result).toEqual(mockAllMetalPrices);
      expect(service.getAllMetalPrices).toHaveBeenCalled();
    });
  });

  describe('convertCurrency', () => {
    it('should convert currency successfully', async () => {
      jest
        .spyOn(service, 'convertCurrency')
        .mockResolvedValue(mockConvertResponse);

      const result = await controller.convertCurrency('USD', 'XAU', 100);

      expect(result).toEqual(mockConvertResponse);
      expect(service.convertCurrency).toHaveBeenCalledWith('USD', 'XAU', 100);
    });
  });

  describe('getHistoricalPrices', () => {
    it('should return historical prices', async () => {
      jest
        .spyOn(service, 'getHistoricalPrices')
        .mockResolvedValue(mockLatestPrices);

      const result = await controller.getHistoricalPrices(
        '2024-01-15',
        'USD',
        'XAU,XAG',
      );

      expect(result).toEqual(mockLatestPrices);
      expect(service.getHistoricalPrices).toHaveBeenCalledWith(
        '2024-01-15',
        'USD',
        'XAU,XAG',
      );
    });
  });

  describe('getPriceChange', () => {
    it('should return price change data', async () => {
      jest.spyOn(service, 'getPriceChange').mockResolvedValue(mockChangeResponse);

      const result = await controller.getPriceChange(
        '2024-01-01',
        '2024-01-31',
        'USD',
        'XAU',
      );

      expect(result).toEqual(mockChangeResponse);
      expect(service.getPriceChange).toHaveBeenCalledWith(
        '2024-01-01',
        '2024-01-31',
        'USD',
        'XAU',
      );
    });
  });
});
