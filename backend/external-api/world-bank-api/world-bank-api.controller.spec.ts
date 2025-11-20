import { Test, TestingModule } from '@nestjs/testing';
import { WorldBankApiController } from './world-bank-api.controller';
import { WorldBankApiService } from './world-bank-api.service';

describe('WorldBankApiController', () => {
  let controller: WorldBankApiController;
  let service: WorldBankApiService;

  const mockWorldBankApiService = {
    getGDP: jest.fn(),
    getGDPGrowth: jest.fn(),
    getGDPPerCapita: jest.fn(),
    getPopulation: jest.fn(),
    getInflation: jest.fn(),
    getUnemployment: jest.fn(),
    getPoverty: jest.fn(),
    getLifeExpectancy: jest.fn(),
    getLiteracyRate: jest.fn(),
    getTertiaryEducation: jest.fn(),
    getFDI: jest.fn(),
    getExports: jest.fn(),
    getImports: jest.fn(),
    getCO2Emissions: jest.fn(),
    getElectricPowerConsumption: jest.fn(),
    getInternetUsers: jest.fn(),
    getMobileCellularSubscriptions: jest.fn(),
    getIndicator: jest.fn(),
    getCountryInfo: jest.fn(),
    getCountries: jest.fn(),
    getEconomicSummary: jest.fn(),
    compareCountries: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldBankApiController],
      providers: [
        {
          provide: WorldBankApiService,
          useValue: mockWorldBankApiService,
        },
      ],
    }).compile();

    controller = module.get<WorldBankApiController>(WorldBankApiController);
    service = module.get<WorldBankApiService>(WorldBankApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getGDP', () => {
    it('should call service.getGDP with correct parameters', async () => {
      const mockResult = {
        metadata: {},
        data: [{ value: 514952983883.79, date: '2023' }],
      };
      mockWorldBankApiService.getGDP.mockResolvedValue(mockResult);

      const result = await controller.getGDP('TH', 2020, 2023);
      expect(service.getGDP).toHaveBeenCalledWith('TH', 2020, 2023);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getGDPGrowth', () => {
    it('should call service.getGDPGrowth', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getGDPGrowth.mockResolvedValue(mockResult);

      await controller.getGDPGrowth('TH', 2020, 2023);
      expect(service.getGDPGrowth).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getGDPPerCapita', () => {
    it('should call service.getGDPPerCapita', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getGDPPerCapita.mockResolvedValue(mockResult);

      await controller.getGDPPerCapita('TH', 2020, 2023);
      expect(service.getGDPPerCapita).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getPopulation', () => {
    it('should call service.getPopulation', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getPopulation.mockResolvedValue(mockResult);

      await controller.getPopulation('TH', 2020, 2023);
      expect(service.getPopulation).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getInflation', () => {
    it('should call service.getInflation', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getInflation.mockResolvedValue(mockResult);

      await controller.getInflation('TH', 2020, 2023);
      expect(service.getInflation).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getUnemployment', () => {
    it('should call service.getUnemployment', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getUnemployment.mockResolvedValue(mockResult);

      await controller.getUnemployment('TH', 2020, 2023);
      expect(service.getUnemployment).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getPoverty', () => {
    it('should call service.getPoverty', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getPoverty.mockResolvedValue(mockResult);

      await controller.getPoverty('TH', 2015, 2023);
      expect(service.getPoverty).toHaveBeenCalledWith('TH', 2015, 2023);
    });
  });

  describe('getLifeExpectancy', () => {
    it('should call service.getLifeExpectancy', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getLifeExpectancy.mockResolvedValue(mockResult);

      await controller.getLifeExpectancy('TH', 2020, 2023);
      expect(service.getLifeExpectancy).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getLiteracyRate', () => {
    it('should call service.getLiteracyRate', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getLiteracyRate.mockResolvedValue(mockResult);

      await controller.getLiteracyRate('TH', 2015, 2023);
      expect(service.getLiteracyRate).toHaveBeenCalledWith('TH', 2015, 2023);
    });
  });

  describe('getTertiaryEducation', () => {
    it('should call service.getTertiaryEducation', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getTertiaryEducation.mockResolvedValue(
        mockResult,
      );

      await controller.getTertiaryEducation('TH', 2020, 2023);
      expect(service.getTertiaryEducation).toHaveBeenCalledWith(
        'TH',
        2020,
        2023,
      );
    });
  });

  describe('getFDI', () => {
    it('should call service.getFDI', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getFDI.mockResolvedValue(mockResult);

      await controller.getFDI('TH', 2020, 2023);
      expect(service.getFDI).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getExports', () => {
    it('should call service.getExports', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getExports.mockResolvedValue(mockResult);

      await controller.getExports('TH', 2020, 2023);
      expect(service.getExports).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getImports', () => {
    it('should call service.getImports', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getImports.mockResolvedValue(mockResult);

      await controller.getImports('TH', 2020, 2023);
      expect(service.getImports).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getCO2Emissions', () => {
    it('should call service.getCO2Emissions', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getCO2Emissions.mockResolvedValue(mockResult);

      await controller.getCO2Emissions('TH', 2020, 2023);
      expect(service.getCO2Emissions).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getElectricPowerConsumption', () => {
    it('should call service.getElectricPowerConsumption', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getElectricPowerConsumption.mockResolvedValue(
        mockResult,
      );

      await controller.getElectricPowerConsumption('TH', 2020, 2023);
      expect(service.getElectricPowerConsumption).toHaveBeenCalledWith(
        'TH',
        2020,
        2023,
      );
    });
  });

  describe('getInternetUsers', () => {
    it('should call service.getInternetUsers', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getInternetUsers.mockResolvedValue(mockResult);

      await controller.getInternetUsers('TH', 2020, 2023);
      expect(service.getInternetUsers).toHaveBeenCalledWith('TH', 2020, 2023);
    });
  });

  describe('getMobileCellularSubscriptions', () => {
    it('should call service.getMobileCellularSubscriptions', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getMobileCellularSubscriptions.mockResolvedValue(
        mockResult,
      );

      await controller.getMobileCellularSubscriptions('TH', 2020, 2023);
      expect(service.getMobileCellularSubscriptions).toHaveBeenCalledWith(
        'TH',
        2020,
        2023,
      );
    });
  });

  describe('getIndicator', () => {
    it('should call service.getIndicator with custom indicator code', async () => {
      const mockResult = { metadata: {}, data: [] };
      mockWorldBankApiService.getIndicator.mockResolvedValue(mockResult);

      await controller.getIndicator('TH', 'NY.GDP.MKTP.CD', 2020, 2023);
      expect(service.getIndicator).toHaveBeenCalledWith(
        'TH',
        'NY.GDP.MKTP.CD',
        2020,
        2023,
      );
    });
  });

  describe('getCountryInfo', () => {
    it('should call service.getCountryInfo', async () => {
      const mockResult = {
        id: 'THA',
        iso2Code: 'TH',
        name: 'Thailand',
        capitalCity: 'Bangkok',
      };
      mockWorldBankApiService.getCountryInfo.mockResolvedValue(mockResult);

      const result = await controller.getCountryInfo('TH');
      expect(service.getCountryInfo).toHaveBeenCalledWith('TH');
      expect(result).toEqual(mockResult);
    });
  });

  describe('getCountries', () => {
    it('should call service.getCountries', async () => {
      const mockResult = { metadata: {}, countries: [] };
      mockWorldBankApiService.getCountries.mockResolvedValue(mockResult);

      const result = await controller.getCountries();
      expect(service.getCountries).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('getEconomicSummary', () => {
    it('should call service.getEconomicSummary', async () => {
      const mockResult = {
        country: 'Thailand',
        countryCode: 'TH',
        year: '2023',
        indicators: {},
      };
      mockWorldBankApiService.getEconomicSummary.mockResolvedValue(mockResult);

      const result = await controller.getEconomicSummary('TH', 2023);
      expect(service.getEconomicSummary).toHaveBeenCalledWith('TH', 2023);
      expect(result).toEqual(mockResult);
    });
  });

  describe('compareCountries', () => {
    it('should call service.compareCountries with parsed country codes', async () => {
      const mockResult = {
        indicator: 'NY.GDP.MKTP.CD',
        year: 2023,
        comparison: [],
      };
      mockWorldBankApiService.compareCountries.mockResolvedValue(mockResult);

      const result = await controller.compareCountries(
        'TH,VN,MY',
        'NY.GDP.MKTP.CD',
        2023,
      );
      expect(service.compareCountries).toHaveBeenCalledWith(
        ['TH', 'VN', 'MY'],
        'NY.GDP.MKTP.CD',
        2023,
      );
      expect(result).toEqual(mockResult);
    });
  });
});
