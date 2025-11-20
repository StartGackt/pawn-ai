import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { WorldBankApiService } from './world-bank-api.service';

@ApiTags('World Bank - Global Economic Indicators')
@Controller('external-api/world-bank')
export class WorldBankApiController {
  constructor(private readonly worldBankApiService: WorldBankApiService) {}

  /**
   * Get GDP (current US$) for a country
   */
  @Get('gdp')
  @ApiOperation({
    summary: 'Get GDP (current US$)',
    description:
      'Retrieve Gross Domestic Product in current US dollars for a specific country',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description:
      'Country code (ISO 3166-1 alpha-2 or alpha-3). Examples: TH, USA, CHN',
    example: 'TH',
  })
  @ApiQuery({
    name: 'startYear',
    required: false,
    description: 'Start year for data range',
    example: 2020,
  })
  @ApiQuery({
    name: 'endYear',
    required: false,
    description: 'End year for data range',
    example: 2023,
  })
  @ApiResponse({
    status: 200,
    description: 'GDP data retrieved successfully',
    schema: {
      example: {
        metadata: { page: 1, pages: 1, per_page: 100, total: 4 },
        data: [
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
      },
    },
  })
  async getGDP(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getGDP(country, startYear, endYear);
  }

  /**
   * Get GDP growth (annual %)
   */
  @Get('gdp-growth')
  @ApiOperation({
    summary: 'Get GDP growth (annual %)',
    description: 'Retrieve annual GDP growth rate for a specific country',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'GDP growth data retrieved successfully',
  })
  async getGDPGrowth(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getGDPGrowth(country, startYear, endYear);
  }

  /**
   * Get GDP per capita (current US$)
   */
  @Get('gdp-per-capita')
  @ApiOperation({
    summary: 'Get GDP per capita (current US$)',
    description: 'Retrieve GDP per capita in current US dollars',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'GDP per capita data retrieved successfully',
  })
  async getGDPPerCapita(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getGDPPerCapita(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get Population, total
   */
  @Get('population')
  @ApiOperation({
    summary: 'Get total population',
    description: 'Retrieve total population for a specific country',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Population data retrieved successfully',
  })
  async getPopulation(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getPopulation(country, startYear, endYear);
  }

  /**
   * Get Inflation, consumer prices (annual %)
   */
  @Get('inflation')
  @ApiOperation({
    summary: 'Get inflation rate (annual %)',
    description: 'Retrieve consumer price inflation rate',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Inflation data retrieved successfully',
  })
  async getInflation(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getInflation(country, startYear, endYear);
  }

  /**
   * Get Unemployment rate
   */
  @Get('unemployment')
  @ApiOperation({
    summary: 'Get unemployment rate (% of labor force)',
    description: 'Retrieve total unemployment rate',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Unemployment data retrieved successfully',
  })
  async getUnemployment(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getUnemployment(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get Poverty headcount ratio
   */
  @Get('poverty')
  @ApiOperation({
    summary: 'Get poverty headcount ratio at $2.15 a day',
    description: 'Retrieve poverty headcount ratio (% of population)',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2015 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Poverty data retrieved successfully',
  })
  async getPoverty(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getPoverty(country, startYear, endYear);
  }

  /**
   * Get Life expectancy at birth
   */
  @Get('life-expectancy')
  @ApiOperation({
    summary: 'Get life expectancy at birth (years)',
    description: 'Retrieve average life expectancy',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Life expectancy data retrieved successfully',
  })
  async getLifeExpectancy(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getLifeExpectancy(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get Literacy rate
   */
  @Get('literacy-rate')
  @ApiOperation({
    summary: 'Get adult literacy rate (% ages 15+)',
    description: 'Retrieve literacy rate for adults',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2015 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Literacy rate data retrieved successfully',
  })
  async getLiteracyRate(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getLiteracyRate(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get Tertiary education enrollment
   */
  @Get('tertiary-education')
  @ApiOperation({
    summary: 'Get tertiary education enrollment (% gross)',
    description: 'Retrieve school enrollment in tertiary education',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Tertiary education data retrieved successfully',
  })
  async getTertiaryEducation(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getTertiaryEducation(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get Foreign Direct Investment
   */
  @Get('fdi')
  @ApiOperation({
    summary: 'Get FDI net inflows (% of GDP)',
    description: 'Retrieve foreign direct investment net inflows',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'FDI data retrieved successfully',
  })
  async getFDI(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getFDI(country, startYear, endYear);
  }

  /**
   * Get Exports
   */
  @Get('exports')
  @ApiOperation({
    summary: 'Get exports of goods and services (% of GDP)',
    description: 'Retrieve total exports as percentage of GDP',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Exports data retrieved successfully',
  })
  async getExports(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getExports(country, startYear, endYear);
  }

  /**
   * Get Imports
   */
  @Get('imports')
  @ApiOperation({
    summary: 'Get imports of goods and services (% of GDP)',
    description: 'Retrieve total imports as percentage of GDP',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Imports data retrieved successfully',
  })
  async getImports(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getImports(country, startYear, endYear);
  }

  /**
   * Get CO2 emissions
   */
  @Get('co2-emissions')
  @ApiOperation({
    summary: 'Get CO2 emissions (metric tons per capita)',
    description: 'Retrieve carbon dioxide emissions per capita',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'CO2 emissions data retrieved successfully',
  })
  async getCO2Emissions(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getCO2Emissions(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get Electric power consumption
   */
  @Get('electric-power')
  @ApiOperation({
    summary: 'Get electric power consumption (kWh per capita)',
    description: 'Retrieve electric power consumption per capita',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Electric power consumption data retrieved successfully',
  })
  async getElectricPowerConsumption(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getElectricPowerConsumption(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get Internet users
   */
  @Get('internet-users')
  @ApiOperation({
    summary: 'Get internet users (% of population)',
    description: 'Retrieve percentage of population using the internet',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Internet users data retrieved successfully',
  })
  async getInternetUsers(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getInternetUsers(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get Mobile cellular subscriptions
   */
  @Get('mobile-subscriptions')
  @ApiOperation({
    summary: 'Get mobile cellular subscriptions (per 100 people)',
    description: 'Retrieve mobile cellular subscriptions per 100 people',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Mobile subscriptions data retrieved successfully',
  })
  async getMobileCellularSubscriptions(
    @Query('country') country: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getMobileCellularSubscriptions(
      country,
      startYear,
      endYear,
    );
  }

  /**
   * Get custom indicator data
   */
  @Get('indicator')
  @ApiOperation({
    summary: 'Get any World Bank indicator by code',
    description:
      'Retrieve data for any World Bank indicator using its indicator code. Find indicator codes at: https://data.worldbank.org/indicator',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({
    name: 'indicator',
    required: true,
    description: 'World Bank indicator code',
    example: 'NY.GDP.MKTP.CD',
  })
  @ApiQuery({ name: 'startYear', required: false, example: 2020 })
  @ApiQuery({ name: 'endYear', required: false, example: 2023 })
  @ApiResponse({
    status: 200,
    description: 'Indicator data retrieved successfully',
  })
  async getIndicator(
    @Query('country') country: string,
    @Query('indicator') indicator: string,
    @Query('startYear') startYear?: number,
    @Query('endYear') endYear?: number,
  ) {
    return this.worldBankApiService.getIndicator(
      country,
      indicator,
      startYear,
      endYear,
    );
  }

  /**
   * Get country information
   */
  @Get('country-info')
  @ApiOperation({
    summary: 'Get detailed country information',
    description:
      'Retrieve comprehensive information about a country including region, income level, capital city, etc.',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiResponse({
    status: 200,
    description: 'Country information retrieved successfully',
    schema: {
      example: {
        id: 'THA',
        iso2Code: 'TH',
        name: 'Thailand',
        region: {
          id: 'EAS',
          iso2code: 'Z4',
          value: 'East Asia & Pacific',
        },
        adminregion: {
          id: 'EAP',
          iso2code: '4E',
          value: 'East Asia & Pacific (excluding high income)',
        },
        incomeLevel: { id: 'UMC', iso2code: 'XT', value: 'Upper middle income' },
        lendingType: { id: 'IBD', iso2code: 'XF', value: 'IBRD' },
        capitalCity: 'Bangkok',
        longitude: '100.521',
        latitude: '13.7544',
      },
    },
  })
  async getCountryInfo(@Query('country') country: string) {
    return this.worldBankApiService.getCountryInfo(country);
  }

  /**
   * Get list of all countries
   */
  @Get('countries')
  @ApiOperation({
    summary: 'Get list of all countries',
    description: 'Retrieve list of all countries available in World Bank database',
  })
  @ApiResponse({
    status: 200,
    description: 'Countries list retrieved successfully',
  })
  async getCountries() {
    return this.worldBankApiService.getCountries();
  }

  /**
   * Get comprehensive economic summary
   */
  @Get('economic-summary')
  @ApiOperation({
    summary: 'Get comprehensive economic summary for a country',
    description:
      'Retrieve a comprehensive summary including GDP, population, inflation, unemployment, trade, and FDI data',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country code',
    example: 'TH',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Target year (defaults to previous year)',
    example: 2023,
  })
  @ApiResponse({
    status: 200,
    description: 'Economic summary retrieved successfully',
    schema: {
      example: {
        country: 'Thailand',
        countryCode: 'TH',
        year: '2023',
        indicators: {
          gdp: {
            value: 514952983883.79,
            indicator: 'GDP (current US$)',
            unit: 'USD',
          },
          gdpGrowth: { value: 2.6, indicator: 'GDP growth', unit: '%' },
          gdpPerCapita: {
            value: 7183.82,
            indicator: 'GDP per capita',
            unit: 'USD',
          },
          population: {
            value: 71697030,
            indicator: 'Population, total',
            unit: 'people',
          },
          inflation: {
            value: 1.23,
            indicator: 'Inflation, consumer prices',
            unit: '%',
          },
          unemployment: {
            value: 1.05,
            indicator: 'Unemployment, total',
            unit: '% of labor force',
          },
          fdi: {
            value: 2.1,
            indicator: 'Foreign direct investment, net inflows',
            unit: '% of GDP',
          },
          exports: {
            value: 65.4,
            indicator: 'Exports of goods and services',
            unit: '% of GDP',
          },
          imports: {
            value: 58.9,
            indicator: 'Imports of goods and services',
            unit: '% of GDP',
          },
        },
      },
    },
  })
  async getEconomicSummary(
    @Query('country') country: string,
    @Query('year') year?: number,
  ) {
    return this.worldBankApiService.getEconomicSummary(country, year);
  }

  /**
   * Compare indicators between countries
   */
  @Get('compare-countries')
  @ApiOperation({
    summary: 'Compare an indicator across multiple countries',
    description:
      'Compare a specific indicator (e.g., GDP, inflation) across multiple countries for a given year',
  })
  @ApiQuery({
    name: 'countries',
    required: true,
    description: 'Comma-separated country codes',
    example: 'TH,VN,MY,ID,PH',
  })
  @ApiQuery({
    name: 'indicator',
    required: true,
    description: 'World Bank indicator code',
    example: 'NY.GDP.MKTP.CD',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Target year (defaults to previous year)',
    example: 2023,
  })
  @ApiResponse({
    status: 200,
    description: 'Comparison data retrieved successfully',
    schema: {
      example: {
        indicator: 'NY.GDP.MKTP.CD',
        year: 2023,
        comparison: [
          {
            country: 'Thailand',
            countryCode: 'TH',
            value: 514952983883.79,
            year: '2023',
            unit: '',
            indicator: 'GDP (current US$)',
          },
          {
            country: 'Vietnam',
            countryCode: 'VN',
            value: 429716893764.16,
            year: '2023',
            unit: '',
            indicator: 'GDP (current US$)',
          },
        ],
      },
    },
  })
  async compareCountries(
    @Query('countries') countries: string,
    @Query('indicator') indicator: string,
    @Query('year') year?: number,
  ) {
    const countryCodes = countries.split(',').map((c) => c.trim());
    return this.worldBankApiService.compareCountries(
      countryCodes,
      indicator,
      year,
    );
  }
}
