import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

/**
 * World Bank API Response Interface
 */
export interface WorldBankResponse {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  sourceid?: string;
  lastupdated?: string;
}

/**
 * World Bank Indicator Data
 */
export interface WorldBankIndicatorData {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

/**
 * World Bank Country Info
 */
export interface WorldBankCountry {
  id: string;
  iso2Code: string;
  name: string;
  region: {
    id: string;
    iso2code: string;
    value: string;
  };
  adminregion: {
    id: string;
    iso2code: string;
    value: string;
  };
  incomeLevel: {
    id: string;
    iso2code: string;
    value: string;
  };
  lendingType: {
    id: string;
    iso2code: string;
    value: string;
  };
  capitalCity: string;
  longitude: string;
  latitude: string;
}

/**
 * Indicator Summary Response
 */
export interface IndicatorSummary {
  country: string;
  countryCode: string;
  year: string;
  indicators: {
    [key: string]: {
      value: number | null;
      indicator: string;
      unit?: string;
    };
  };
}

@Injectable()
export class WorldBankApiService {
  private readonly logger = new Logger(WorldBankApiService.name);
  private readonly baseUrl = 'https://api.worldbank.org/v2';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Get GDP (current US$) for a country
   * Indicator: NY.GDP.MKTP.CD
   */
  async getGDP(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'NY.GDP.MKTP.CD';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get GDP growth (annual %)
   * Indicator: NY.GDP.MKTP.KD.ZG
   */
  async getGDPGrowth(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'NY.GDP.MKTP.KD.ZG';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get GDP per capita (current US$)
   * Indicator: NY.GDP.PCAP.CD
   */
  async getGDPPerCapita(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'NY.GDP.PCAP.CD';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Population, total
   * Indicator: SP.POP.TOTL
   */
  async getPopulation(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'SP.POP.TOTL';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Inflation, consumer prices (annual %)
   * Indicator: FP.CPI.TOTL.ZG
   */
  async getInflation(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'FP.CPI.TOTL.ZG';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Unemployment, total (% of total labor force)
   * Indicator: SL.UEM.TOTL.ZS
   */
  async getUnemployment(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'SL.UEM.TOTL.ZS';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)
   * Indicator: SI.POV.DDAY
   */
  async getPoverty(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'SI.POV.DDAY';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Life expectancy at birth, total (years)
   * Indicator: SP.DYN.LE00.IN
   */
  async getLifeExpectancy(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'SP.DYN.LE00.IN';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Literacy rate, adult total (% of people ages 15 and above)
   * Indicator: SE.ADT.LITR.ZS
   */
  async getLiteracyRate(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'SE.ADT.LITR.ZS';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get School enrollment, tertiary (% gross)
   * Indicator: SE.TER.ENRR
   */
  async getTertiaryEducation(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'SE.TER.ENRR';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Foreign direct investment, net inflows (% of GDP)
   * Indicator: BX.KLT.DINV.WD.GD.ZS
   */
  async getFDI(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'BX.KLT.DINV.WD.GD.ZS';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Exports of goods and services (% of GDP)
   * Indicator: NE.EXP.GNFS.ZS
   */
  async getExports(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'NE.EXP.GNFS.ZS';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Imports of goods and services (% of GDP)
   * Indicator: NE.IMP.GNFS.ZS
   */
  async getImports(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'NE.IMP.GNFS.ZS';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get CO2 emissions (metric tons per capita)
   * Indicator: EN.ATM.CO2E.PC
   */
  async getCO2Emissions(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'EN.ATM.CO2E.PC';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Electric power consumption (kWh per capita)
   * Indicator: EG.USE.ELEC.KH.PC
   */
  async getElectricPowerConsumption(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'EG.USE.ELEC.KH.PC';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Internet users (% of population)
   * Indicator: IT.NET.USER.ZS
   */
  async getInternetUsers(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'IT.NET.USER.ZS';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get Mobile cellular subscriptions (per 100 people)
   * Indicator: IT.CEL.SETS.P2
   */
  async getMobileCellularSubscriptions(
    countryCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    const indicator = 'IT.CEL.SETS.P2';
    return this.getIndicator(countryCode, indicator, startYear, endYear);
  }

  /**
   * Get generic indicator data for any World Bank indicator
   */
  async getIndicator(
    countryCode: string,
    indicatorCode: string,
    startYear?: number,
    endYear?: number,
  ): Promise<any> {
    try {
      const dateRange =
        startYear && endYear ? `${startYear}:${endYear}` : '';
      const url = `${this.baseUrl}/country/${countryCode}/indicator/${indicatorCode}`;
      const params: any = {
        format: 'json',
        per_page: 100,
      };

      if (dateRange) {
        params.date = dateRange;
      }

      this.logger.log(
        `Fetching World Bank indicator ${indicatorCode} for ${countryCode}`,
      );

      const response = await firstValueFrom(
        this.httpService.get(url, { params }),
      );

      // World Bank returns [metadata, data] array
      if (Array.isArray(response.data) && response.data.length > 1) {
        return {
          metadata: response.data[0],
          data: response.data[1],
        };
      }

      return response.data;
    } catch (error) {
      this.logger.error(
        `Error fetching World Bank indicator ${indicatorCode}: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Get country information
   */
  async getCountryInfo(countryCode: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/country/${countryCode}`;
      const params = {
        format: 'json',
      };

      this.logger.log(`Fetching World Bank country info for ${countryCode}`);

      const response = await firstValueFrom(
        this.httpService.get(url, { params }),
      );

      if (Array.isArray(response.data) && response.data.length > 1) {
        return response.data[1][0]; // Return first country in array
      }

      return response.data;
    } catch (error) {
      this.logger.error(
        `Error fetching World Bank country info: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Get list of all countries
   */
  async getCountries(): Promise<any> {
    try {
      const url = `${this.baseUrl}/country`;
      const params = {
        format: 'json',
        per_page: 300,
      };

      this.logger.log('Fetching World Bank countries list');

      const response = await firstValueFrom(
        this.httpService.get(url, { params }),
      );

      if (Array.isArray(response.data) && response.data.length > 1) {
        return {
          metadata: response.data[0],
          countries: response.data[1],
        };
      }

      return response.data;
    } catch (error) {
      this.logger.error(
        `Error fetching World Bank countries: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Get comprehensive economic summary for a country
   * Combines multiple indicators into one response
   */
  async getEconomicSummary(
    countryCode: string,
    year?: number,
  ): Promise<IndicatorSummary> {
    try {
      const targetYear = year || new Date().getFullYear() - 1;
      const startYear = targetYear;
      const endYear = targetYear;

      this.logger.log(
        `Fetching economic summary for ${countryCode} (${targetYear})`,
      );

      // Fetch all indicators in parallel
      const [
        countryInfo,
        gdp,
        gdpGrowth,
        gdpPerCapita,
        population,
        inflation,
        unemployment,
        fdi,
        exports,
        imports,
      ] = await Promise.all([
        this.getCountryInfo(countryCode),
        this.getGDP(countryCode, startYear, endYear),
        this.getGDPGrowth(countryCode, startYear, endYear),
        this.getGDPPerCapita(countryCode, startYear, endYear),
        this.getPopulation(countryCode, startYear, endYear),
        this.getInflation(countryCode, startYear, endYear),
        this.getUnemployment(countryCode, startYear, endYear),
        this.getFDI(countryCode, startYear, endYear),
        this.getExports(countryCode, startYear, endYear),
        this.getImports(countryCode, startYear, endYear),
      ]);

      const extractValue = (data: any) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const latestData = data.data.find((d) => d.value !== null);
          return latestData
            ? {
                value: latestData.value,
                year: latestData.date,
                unit: latestData.unit || '',
              }
            : { value: null, year: null, unit: '' };
        }
        return { value: null, year: null, unit: '' };
      };

      const summary: IndicatorSummary = {
        country: countryInfo?.name || countryCode,
        countryCode: countryCode.toUpperCase(),
        year: targetYear.toString(),
        indicators: {
          gdp: {
            value: extractValue(gdp).value,
            indicator: 'GDP (current US$)',
            unit: 'USD',
          },
          gdpGrowth: {
            value: extractValue(gdpGrowth).value,
            indicator: 'GDP growth',
            unit: '%',
          },
          gdpPerCapita: {
            value: extractValue(gdpPerCapita).value,
            indicator: 'GDP per capita',
            unit: 'USD',
          },
          population: {
            value: extractValue(population).value,
            indicator: 'Population, total',
            unit: 'people',
          },
          inflation: {
            value: extractValue(inflation).value,
            indicator: 'Inflation, consumer prices',
            unit: '%',
          },
          unemployment: {
            value: extractValue(unemployment).value,
            indicator: 'Unemployment, total',
            unit: '% of labor force',
          },
          fdi: {
            value: extractValue(fdi).value,
            indicator: 'Foreign direct investment, net inflows',
            unit: '% of GDP',
          },
          exports: {
            value: extractValue(exports).value,
            indicator: 'Exports of goods and services',
            unit: '% of GDP',
          },
          imports: {
            value: extractValue(imports).value,
            indicator: 'Imports of goods and services',
            unit: '% of GDP',
          },
        },
      };

      return summary;
    } catch (error) {
      this.logger.error(
        `Error fetching economic summary: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Compare indicators between multiple countries
   */
  async compareCountries(
    countryCodes: string[],
    indicatorCode: string,
    year?: number,
  ): Promise<any> {
    try {
      const targetYear = year || new Date().getFullYear() - 1;
      const startYear = targetYear;
      const endYear = targetYear;

      this.logger.log(
        `Comparing indicator ${indicatorCode} for countries: ${countryCodes.join(', ')}`,
      );

      const results = await Promise.all(
        countryCodes.map(async (countryCode) => {
          const [countryInfo, indicatorData] = await Promise.all([
            this.getCountryInfo(countryCode),
            this.getIndicator(countryCode, indicatorCode, startYear, endYear),
          ]);

          const latestData =
            indicatorData?.data &&
            Array.isArray(indicatorData.data) &&
            indicatorData.data.length > 0
              ? indicatorData.data.find((d) => d.value !== null)
              : null;

          return {
            country: countryInfo?.name || countryCode,
            countryCode: countryCode.toUpperCase(),
            value: latestData?.value || null,
            year: latestData?.date || targetYear.toString(),
            unit: latestData?.unit || '',
            indicator: latestData?.indicator?.value || indicatorCode,
          };
        }),
      );

      return {
        indicator: indicatorCode,
        year: targetYear,
        comparison: results.sort((a, b) => {
          if (a.value === null) return 1;
          if (b.value === null) return -1;
          return b.value - a.value;
        }),
      };
    } catch (error) {
      this.logger.error(`Error comparing countries: ${error.message}`);
      throw error;
    }
  }
}
