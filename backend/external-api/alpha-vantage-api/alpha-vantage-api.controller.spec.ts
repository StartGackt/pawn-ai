import { Test, TestingModule } from '@nestjs/testing';
import { AlphaVantageApiController } from './alpha-vantage-api.controller';
import { AlphaVantageApiService } from './alpha-vantage-api.service';

describe('AlphaVantageApiController', () => {
  let controller: AlphaVantageApiController;
  let service: AlphaVantageApiService;

  const mockAlphaVantageApiService = {
    getRealGDP: jest.fn(),
    getCPI: jest.fn(),
    getInflation: jest.fn(),
    getUnemployment: jest.fn(),
    getFederalFundsRate: jest.fn(),
    getTreasuryYield: jest.fn(),
    getForexRate: jest.fn(),
    getForexDaily: jest.fn(),
    getCrudeOilWTI: jest.fn(),
    getCrudeOilBrent: jest.fn(),
    getNaturalGas: jest.fn(),
    getCopper: jest.fn(),
    getGlobalQuote: jest.fn(),
    getMarketNews: jest.fn(),
    getCryptoRate: jest.fn(),
    getCryptoDaily: jest.fn(),
    getTopGainersLosers: jest.fn(),
    getDailyEconomicSummary: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlphaVantageApiController],
      providers: [
        {
          provide: AlphaVantageApiService,
          useValue: mockAlphaVantageApiService,
        },
      ],
    }).compile();

    controller = module.get<AlphaVantageApiController>(
      AlphaVantageApiController,
    );
    service = module.get<AlphaVantageApiService>(AlphaVantageApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRealGDP', () => {
    it('should return real GDP data', async () => {
      const mockData = { name: 'Real GDP', data: [] };
      mockAlphaVantageApiService.getRealGDP.mockResolvedValue(mockData);

      const result = await controller.getRealGDP('annual');

      expect(result).toEqual(mockData);
      expect(service.getRealGDP).toHaveBeenCalledWith('annual');
    });
  });

  describe('getCPI', () => {
    it('should return CPI data', async () => {
      const mockData = { name: 'CPI', data: [] };
      mockAlphaVantageApiService.getCPI.mockResolvedValue(mockData);

      const result = await controller.getCPI('monthly');

      expect(result).toEqual(mockData);
      expect(service.getCPI).toHaveBeenCalledWith('monthly');
    });
  });

  describe('getInflation', () => {
    it('should return inflation data', async () => {
      const mockData = { name: 'Inflation', data: [] };
      mockAlphaVantageApiService.getInflation.mockResolvedValue(mockData);

      const result = await controller.getInflation();

      expect(result).toEqual(mockData);
      expect(service.getInflation).toHaveBeenCalled();
    });
  });

  describe('getForexRate', () => {
    it('should return forex exchange rate', async () => {
      const mockData = {
        'Realtime Currency Exchange Rate': {
          '5. Exchange Rate': '33.95',
        },
      };
      mockAlphaVantageApiService.getForexRate.mockResolvedValue(mockData);

      const result = await controller.getForexRate('USD', 'THB');

      expect(result).toEqual(mockData);
      expect(service.getForexRate).toHaveBeenCalledWith('USD', 'THB');
    });
  });

  describe('getCrudeOilWTI', () => {
    it('should return WTI crude oil prices', async () => {
      const mockData = { name: 'WTI', data: [] };
      mockAlphaVantageApiService.getCrudeOilWTI.mockResolvedValue(mockData);

      const result = await controller.getCrudeOilWTI('daily');

      expect(result).toEqual(mockData);
      expect(service.getCrudeOilWTI).toHaveBeenCalledWith('daily');
    });
  });

  describe('getGlobalQuote', () => {
    it('should return stock quote', async () => {
      const mockData = { 'Global Quote': { '05. price': '471.25' } };
      mockAlphaVantageApiService.getGlobalQuote.mockResolvedValue(mockData);

      const result = await controller.getGlobalQuote('SPY');

      expect(result).toEqual(mockData);
      expect(service.getGlobalQuote).toHaveBeenCalledWith('SPY');
    });
  });

  describe('getMarketNews', () => {
    it('should return market news', async () => {
      const mockData = { feed: [] };
      mockAlphaVantageApiService.getMarketNews.mockResolvedValue(mockData);

      const result = await controller.getMarketNews('AAPL', 'economy', 50);

      expect(result).toEqual(mockData);
      expect(service.getMarketNews).toHaveBeenCalledWith('AAPL', 'economy', 50);
    });
  });

  describe('getCryptoRate', () => {
    it('should return crypto rate', async () => {
      const mockData = {
        'Realtime Currency Exchange Rate': {
          '5. Exchange Rate': '43250.50',
        },
      };
      mockAlphaVantageApiService.getCryptoRate.mockResolvedValue(mockData);

      const result = await controller.getCryptoRate('BTC', 'USD');

      expect(result).toEqual(mockData);
      expect(service.getCryptoRate).toHaveBeenCalledWith('BTC', 'USD');
    });
  });

  describe('getDailyEconomicSummary', () => {
    it('should return daily economic summary', async () => {
      const mockData = {
        timestamp: '2024-01-15T10:00:00.000Z',
        economic_indicators: {},
        commodities: {},
      };
      mockAlphaVantageApiService.getDailyEconomicSummary.mockResolvedValue(
        mockData,
      );

      const result = await controller.getDailyEconomicSummary();

      expect(result).toEqual(mockData);
      expect(service.getDailyEconomicSummary).toHaveBeenCalled();
    });
  });
});
