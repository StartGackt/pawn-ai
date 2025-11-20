import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import {
  GoldGlobalApiService,
  MetalPriceResponse,
  ConvertResponse,
} from './gold-global-api.service';

describe('GoldGlobalApiService', () => {
  let service: GoldGlobalApiService;
  let httpService: HttpService;
  let configService: ConfigService;

  const mockMetalPriceResponse: MetalPriceResponse = {
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

  const mockConvertResponse: ConvertResponse = {
    success: true,
    query: {
      from: 'USD',
      to: 'XAU',
      amount: 100,
    },
    info: {
      quote: 0.0005628,
      timestamp: 1619150400,
    },
    result: 0.05628031,
  };

  beforeEach(async () => {
    const mockHttpService = {
      get: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'GOLD_GLOBAL_API_URL')
          return 'https://api.metalpriceapi.com/v1/latest';
        if (key === 'GOLD_API_KEY') return 'test-api-key';
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoldGlobalApiService,
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

    service = module.get<GoldGlobalApiService>(GoldGlobalApiService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLatestPrices', () => {
    it('should return latest metal prices', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockMetalPriceResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getLatestPrices('USD', 'XAU,XAG,THB');

      expect(result).toEqual(mockMetalPriceResponse);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.metalpriceapi.com/v1/latest',
        {
          params: {
            api_key: 'test-api-key',
            base: 'USD',
            currencies: 'XAU,XAG,THB',
          },
        },
      );
    });

    it('should throw error when API request fails', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => new Error('Network error')));

      await expect(service.getLatestPrices()).rejects.toThrow(
        'Failed to fetch metal prices: Network error',
      );
    });
  });

  describe('getGoldPrice', () => {
    it('should return gold price in USD and THB', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockMetalPriceResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getGoldPrice();

      expect(result.price_per_oz).toBeCloseTo(1856.91, 0);
      expect(result.price_in_thb).toBeCloseTo(61742.24, 0);
      expect(result.timestamp).toBe(1625609377);
    });
  });

  describe('getSilverPrice', () => {
    it('should return silver price in USD and THB', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockMetalPriceResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getSilverPrice();

      expect(result.price_per_oz).toBeCloseTo(27.76, 0);
      expect(result.price_in_thb).toBeCloseTo(922.53, 0);
      expect(result.timestamp).toBe(1625609377);
    });
  });

  describe('getAllMetalPrices', () => {
    it('should return all precious metal prices', async () => {
      const allMetalsResponse = {
        ...mockMetalPriceResponse,
        rates: {
          ...mockMetalPriceResponse.rates,
          XPT: 0.00087336,
          XPD: 0.00035134,
        },
      };

      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: allMetalsResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getAllMetalPrices();

      expect(result.gold.price_per_oz).toBeCloseTo(1856.91, 0);
      expect(result.silver.price_per_oz).toBeCloseTo(27.76, 0);
      expect(result.platinum).toBeDefined();
      expect(result.palladium).toBeDefined();
    });
  });

  describe('convertCurrency', () => {
    it('should convert currency successfully', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockConvertResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.convertCurrency('USD', 'XAU', 100);

      expect(result).toEqual(mockConvertResponse);
      expect(result.result).toBe(0.05628031);
    });

    it('should throw error when conversion fails', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => new Error('Conversion failed')));

      await expect(service.convertCurrency('USD', 'XAU', 100)).rejects.toThrow(
        'Failed to convert currency: Conversion failed',
      );
    });
  });

  describe('getHistoricalPrices', () => {
    it('should return historical prices for a specific date', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockMetalPriceResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getHistoricalPrices(
        '2024-01-15',
        'USD',
        'XAU,XAG',
      );

      expect(result).toEqual(mockMetalPriceResponse);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.metalpriceapi.com/v1/2024-01-15',
        expect.any(Object),
      );
    });
  });

  describe('getPriceChange', () => {
    it('should return price change data', async () => {
      const changeResponse = {
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

      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: changeResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getPriceChange(
        '2024-01-01',
        '2024-01-31',
        'USD',
        'XAU',
      );

      expect(result).toEqual(changeResponse);
      expect(result.rates.XAU.change_pct).toBe(0.2623);
    });
  });
});
