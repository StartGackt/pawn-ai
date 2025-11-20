import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { WorldBankApiService } from './world-bank-api.service';

describe('WorldBankApiService', () => {
  let service: WorldBankApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorldBankApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WorldBankApiService>(WorldBankApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGDP', () => {
    it('should fetch GDP data for a country', async () => {
      const mockResponse = {
        data: [
          { page: 1, pages: 1, per_page: 100, total: 1 },
          [
            {
              indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' },
              country: { id: 'TH', value: 'Thailand' },
              countryiso3code: 'THA',
              date: '2023',
              value: 514952983883.79,
              unit: '',
              obs_status: '',
              decimal: 0,
            },
          ],
        ],
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

      const result = await service.getGDP('TH', 2023, 2023);
      expect(result).toHaveProperty('metadata');
      expect(result).toHaveProperty('data');
      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('getGDPGrowth', () => {
    it('should fetch GDP growth data', async () => {
      const mockResponse = {
        data: [
          { page: 1, pages: 1, per_page: 100, total: 1 },
          [
            {
              indicator: { id: 'NY.GDP.MKTP.KD.ZG', value: 'GDP growth' },
              country: { id: 'TH', value: 'Thailand' },
              date: '2023',
              value: 2.6,
            },
          ],
        ],
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

      const result = await service.getGDPGrowth('TH', 2023, 2023);
      expect(result).toBeDefined();
      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('getPopulation', () => {
    it('should fetch population data', async () => {
      const mockResponse = {
        data: [
          { page: 1, pages: 1, per_page: 100, total: 1 },
          [
            {
              indicator: { id: 'SP.POP.TOTL', value: 'Population, total' },
              country: { id: 'TH', value: 'Thailand' },
              date: '2023',
              value: 71697030,
            },
          ],
        ],
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

      const result = await service.getPopulation('TH', 2023, 2023);
      expect(result).toBeDefined();
      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('getInflation', () => {
    it('should fetch inflation data', async () => {
      const mockResponse = {
        data: [
          { page: 1, pages: 1, per_page: 100, total: 1 },
          [
            {
              indicator: {
                id: 'FP.CPI.TOTL.ZG',
                value: 'Inflation, consumer prices',
              },
              country: { id: 'TH', value: 'Thailand' },
              date: '2023',
              value: 1.23,
            },
          ],
        ],
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

      const result = await service.getInflation('TH', 2023, 2023);
      expect(result).toBeDefined();
      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('getUnemployment', () => {
    it('should fetch unemployment data', async () => {
      const mockResponse = {
        data: [
          { page: 1, pages: 1, per_page: 100, total: 1 },
          [
            {
              indicator: {
                id: 'SL.UEM.TOTL.ZS',
                value: 'Unemployment, total',
              },
              country: { id: 'TH', value: 'Thailand' },
              date: '2023',
              value: 1.05,
            },
          ],
        ],
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

      const result = await service.getUnemployment('TH', 2023, 2023);
      expect(result).toBeDefined();
      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('getCountryInfo', () => {
    it('should fetch country information', async () => {
      const mockResponse = {
        data: [
          { page: 1, pages: 1, per_page: 1, total: 1 },
          [
            {
              id: 'THA',
              iso2Code: 'TH',
              name: 'Thailand',
              region: { id: 'EAS', value: 'East Asia & Pacific' },
              capitalCity: 'Bangkok',
              longitude: '100.521',
              latitude: '13.7544',
            },
          ],
        ],
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

      const result = await service.getCountryInfo('TH');
      expect(result).toBeDefined();
      expect(result.name).toBe('Thailand');
      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('getCountries', () => {
    it('should fetch list of all countries', async () => {
      const mockResponse = {
        data: [
          { page: 1, pages: 1, per_page: 300, total: 2 },
          [
            { id: 'THA', iso2Code: 'TH', name: 'Thailand' },
            { id: 'VNM', iso2Code: 'VN', name: 'Vietnam' },
          ],
        ],
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

      const result = await service.getCountries();
      expect(result).toHaveProperty('metadata');
      expect(result).toHaveProperty('countries');
      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('getEconomicSummary', () => {
    it('should fetch comprehensive economic summary', async () => {
      const mockGDPResponse = {
        data: [
          {},
          [
            {
              indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP' },
              country: { id: 'TH', value: 'Thailand' },
              date: '2023',
              value: 514952983883.79,
            },
          ],
        ],
      };

      const mockCountryResponse = {
        data: [{}, [{ name: 'Thailand', iso2Code: 'TH' }]],
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(mockGDPResponse as any));

      // Mock multiple API calls
      jest
        .spyOn(service, 'getCountryInfo')
        .mockResolvedValue(mockCountryResponse.data[1][0]);
      jest.spyOn(service, 'getGDP').mockResolvedValue(mockGDPResponse);
      jest.spyOn(service, 'getGDPGrowth').mockResolvedValue(mockGDPResponse);
      jest
        .spyOn(service, 'getGDPPerCapita')
        .mockResolvedValue(mockGDPResponse);
      jest.spyOn(service, 'getPopulation').mockResolvedValue(mockGDPResponse);
      jest.spyOn(service, 'getInflation').mockResolvedValue(mockGDPResponse);
      jest
        .spyOn(service, 'getUnemployment')
        .mockResolvedValue(mockGDPResponse);
      jest.spyOn(service, 'getFDI').mockResolvedValue(mockGDPResponse);
      jest.spyOn(service, 'getExports').mockResolvedValue(mockGDPResponse);
      jest.spyOn(service, 'getImports').mockResolvedValue(mockGDPResponse);

      const result = await service.getEconomicSummary('TH', 2023);
      expect(result).toBeDefined();
      expect(result.country).toBe('Thailand');
      expect(result.countryCode).toBe('TH');
      expect(result.indicators).toBeDefined();
    });
  });

  describe('compareCountries', () => {
    it('should compare indicator across multiple countries', async () => {
      const mockGDPResponse = {
        data: [
          {},
          [
            {
              indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP' },
              country: { id: 'TH', value: 'Thailand' },
              date: '2023',
              value: 514952983883.79,
            },
          ],
        ],
      };

      const mockCountryResponse = {
        data: [{}, [{ name: 'Thailand', iso2Code: 'TH' }]],
      };

      jest
        .spyOn(service, 'getCountryInfo')
        .mockResolvedValue(mockCountryResponse.data[1][0]);
      jest.spyOn(service, 'getIndicator').mockResolvedValue(mockGDPResponse);

      const result = await service.compareCountries(
        ['TH', 'VN'],
        'NY.GDP.MKTP.CD',
        2023,
      );
      expect(result).toBeDefined();
      expect(result.indicator).toBe('NY.GDP.MKTP.CD');
      expect(result.comparison).toBeInstanceOf(Array);
    });
  });
});
