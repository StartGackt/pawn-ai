import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { GoldThaiApiService, GoldPriceResponse } from './gold-thai-api.service';

describe('GoldThaiApiService', () => {
  let service: GoldThaiApiService;
  let httpService: HttpService;

  const mockGoldPriceResponse: GoldPriceResponse = {
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

  beforeEach(async () => {
    const mockHttpService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoldThaiApiService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<GoldThaiApiService>(GoldThaiApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLatestPrice', () => {
    it('should return latest gold prices', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockGoldPriceResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getLatestPrice();

      expect(result).toEqual(mockGoldPriceResponse);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.chnwt.dev/thai-gold-api/latest',
      );
    });

    it('should throw error when API request fails', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => new Error('Network error')));

      await expect(service.getLatestPrice()).rejects.toThrow(
        'Failed to fetch Thai gold prices: Network error',
      );
    });
  });

  describe('getGoldBarPrices', () => {
    it('should return gold bar prices as numbers', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockGoldPriceResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getGoldBarPrices();

      expect(result).toEqual({
        buy: 29800.0,
        sell: 29700.0,
        date: '18 พฤษภาคม 2565',
        updateTime: 'เวลา 16:37 น.',
      });
    });
  });

  describe('getGoldOrnamentPrices', () => {
    it('should return gold ornament prices as numbers', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockGoldPriceResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getGoldOrnamentPrices();

      expect(result).toEqual({
        buy: 30300.0,
        sell: 29167.84,
        date: '18 พฤษภาคม 2565',
        updateTime: 'เวลา 16:37 น.',
      });
    });
  });
});
