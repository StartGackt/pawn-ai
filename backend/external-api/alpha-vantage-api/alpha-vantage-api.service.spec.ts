import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AlphaVantageApiService } from './alpha-vantage-api.service';

describe('AlphaVantageApiService', () => {
  let service: AlphaVantageApiService;
  let httpService: HttpService;
  let configService: ConfigService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'Alpha_Vantage_key') return 'test-api-key';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlphaVantageApiService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AlphaVantageApiService>(AlphaVantageApiService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRealGDP', () => {
    it('should fetch real GDP data', async () => {
      const mockResponse = {
        name: 'Real Gross Domestic Product',
        interval: 'annual',
        unit: 'billions of dollars',
        data: [{ date: '2023-01-01', value: '21060.473' }],
      };

      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result = await service.getRealGDP('annual');

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        expect.stringContaining('REAL_GDP'),
      );
    });
  });

  describe('getCPI', () => {
    it('should fetch CPI data', async () => {
      const mockResponse = {
        name: 'Consumer Price Index',
        data: [{ date: '2023-12-01', value: '304.746' }],
      };

      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result = await service.getCPI('monthly');

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        expect.stringContaining('CPI'),
      );
    });
  });

  describe('getInflation', () => {
    it('should fetch inflation data', async () => {
      const mockResponse = {
        name: 'Inflation',
        data: [{ date: '2023-01-01', value: '3.4' }],
      };

      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result = await service.getInflation();

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        expect.stringContaining('INFLATION'),
      );
    });
  });

  describe('getForexRate', () => {
    it('should fetch forex exchange rate', async () => {
      const mockResponse = {
        'Realtime Currency Exchange Rate': {
          '1. From_Currency Code': 'USD',
          '3. To_Currency Code': 'THB',
          '5. Exchange Rate': '33.95',
        },
      };

      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result = await service.getForexRate('USD', 'THB');

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        expect.stringContaining('CURRENCY_EXCHANGE_RATE'),
      );
    });
  });

  describe('getCrudeOilWTI', () => {
    it('should fetch WTI crude oil prices', async () => {
      const mockResponse = {
        name: 'Crude Oil Prices: West Texas Intermediate',
        data: [{ date: '2024-01-15', value: '72.45' }],
      };

      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result = await service.getCrudeOilWTI('daily');

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        expect.stringContaining('WTI'),
      );
    });
  });

  describe('getGlobalQuote', () => {
    it('should fetch global stock quote', async () => {
      const mockResponse = {
        'Global Quote': {
          '01. symbol': 'SPY',
          '05. price': '471.25',
          '09. change': '1.25',
        },
      };

      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result = await service.getGlobalQuote('SPY');

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        expect.stringContaining('GLOBAL_QUOTE'),
      );
    });
  });

  describe('getCryptoRate', () => {
    it('should fetch cryptocurrency rate', async () => {
      const mockResponse = {
        'Realtime Currency Exchange Rate': {
          '1. From_Currency Code': 'BTC',
          '3. To_Currency Code': 'USD',
          '5. Exchange Rate': '43250.50',
        },
      };

      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result = await service.getCryptoRate('BTC', 'USD');

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        expect.stringContaining('CURRENCY_EXCHANGE_RATE'),
      );
    });
  });

  describe('getDailyEconomicSummary', () => {
    it('should fetch comprehensive daily economic summary', async () => {
      mockHttpService.get.mockReturnValue(
        of({
          data: {
            data: [{ date: '2024-01-15', value: '100' }],
          },
        }),
      );

      const result = await service.getDailyEconomicSummary();

      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('economic_indicators');
      expect(result).toHaveProperty('commodities');
      expect(result).toHaveProperty('forex');
      expect(result).toHaveProperty('crypto');
      expect(result).toHaveProperty('stock_market');
    });
  });
});
