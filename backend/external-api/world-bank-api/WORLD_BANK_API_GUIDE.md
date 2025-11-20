# World Bank Indicators API - Complete Usage Guide

## Overview

World Bank Indicators API ให้เข้าถึงข้อมูลตัวชี้วัดเศรษฐกิจและสังคมของ 200+ ประเทศทั่วโลก โดยมีข้อมูลย้อนหลังมากกว่า 50 ปี

- **ตัวชี้วัด**: 16,000+ indicators
- **ฐานข้อมูล**: 45+ databases
- **ประเทศ**: 200+ countries
- **ข้อมูลย้อนหลัง**: 50+ years
- **Authentication**: ไม่ต้องใช้ API Key (Public API)
- **Rate Limit**: ไม่มี (แนะนำให้ cache responses)

## Key Databases

1. **World Development Indicators (WDI)** - ตัวชี้วัดการพัฒนาโลก
2. **International Debt Statistics** - สถิติหนี้ระหว่างประเทศ
3. **Doing Business** - ความง่ายในการทำธุรกิจ
4. **Human Capital Index** - ดัชนีทุนมนุษย์
5. **Subnational Poverty** - ความยากจนระดับท้องถิ่น

## Complete API Reference

### 1. Economic Indicators

#### GDP (Gross Domestic Product)

```bash
# GDP in current US$
GET /api/external-api/world-bank/gdp?country=TH&startYear=2020&endYear=2023

# GDP growth rate (annual %)
GET /api/external-api/world-bank/gdp-growth?country=TH&startYear=2020&endYear=2023

# GDP per capita
GET /api/external-api/world-bank/gdp-per-capita?country=TH&startYear=2020&endYear=2023
```

**Indicator Codes**:

- `NY.GDP.MKTP.CD` - GDP (current US$)
- `NY.GDP.MKTP.KD.ZG` - GDP growth (annual %)
- `NY.GDP.PCAP.CD` - GDP per capita (current US$)

#### Inflation & Prices

```bash
# Consumer price inflation
GET /api/external-api/world-bank/inflation?country=TH&startYear=2020&endYear=2023
```

**Indicator Code**: `FP.CPI.TOTL.ZG`

#### Employment

```bash
# Unemployment rate
GET /api/external-api/world-bank/unemployment?country=TH&startYear=2020&endYear=2023
```

**Indicator Code**: `SL.UEM.TOTL.ZS`

### 2. Population & Demographics

```bash
# Total population
GET /api/external-api/world-bank/population?country=TH&startYear=2020&endYear=2023

# Life expectancy
GET /api/external-api/world-bank/life-expectancy?country=TH&startYear=2020&endYear=2023

# Poverty headcount ratio
GET /api/external-api/world-bank/poverty?country=TH&startYear=2015&endYear=2023
```

**Indicator Codes**:

- `SP.POP.TOTL` - Population, total
- `SP.DYN.LE00.IN` - Life expectancy at birth
- `SI.POV.DDAY` - Poverty headcount ratio at $2.15 a day

### 3. Education

```bash
# Adult literacy rate
GET /api/external-api/world-bank/literacy-rate?country=TH&startYear=2015&endYear=2023

# Tertiary education enrollment
GET /api/external-api/world-bank/tertiary-education?country=TH&startYear=2020&endYear=2023
```

**Indicator Codes**:

- `SE.ADT.LITR.ZS` - Literacy rate, adult total (% ages 15+)
- `SE.TER.ENRR` - School enrollment, tertiary (% gross)

### 4. Trade & Investment

```bash
# Foreign Direct Investment
GET /api/external-api/world-bank/fdi?country=TH&startYear=2020&endYear=2023

# Exports
GET /api/external-api/world-bank/exports?country=TH&startYear=2020&endYear=2023

# Imports
GET /api/external-api/world-bank/imports?country=TH&startYear=2020&endYear=2023
```

**Indicator Codes**:

- `BX.KLT.DINV.WD.GD.ZS` - FDI, net inflows (% of GDP)
- `NE.EXP.GNFS.ZS` - Exports of goods and services (% of GDP)
- `NE.IMP.GNFS.ZS` - Imports of goods and services (% of GDP)

### 5. Environment & Technology

```bash
# CO2 emissions
GET /api/external-api/world-bank/co2-emissions?country=TH&startYear=2020&endYear=2023

# Electric power consumption
GET /api/external-api/world-bank/electric-power?country=TH&startYear=2020&endYear=2023

# Internet users
GET /api/external-api/world-bank/internet-users?country=TH&startYear=2020&endYear=2023

# Mobile subscriptions
GET /api/external-api/world-bank/mobile-subscriptions?country=TH&startYear=2020&endYear=2023
```

**Indicator Codes**:

- `EN.ATM.CO2E.PC` - CO2 emissions (metric tons per capita)
- `EG.USE.ELEC.KH.PC` - Electric power consumption (kWh per capita)
- `IT.NET.USER.ZS` - Internet users (% of population)
- `IT.CEL.SETS.P2` - Mobile cellular subscriptions (per 100 people)

### 6. Custom Indicator Query

Get any World Bank indicator using its code:

```bash
GET /api/external-api/world-bank/indicator?country=TH&indicator=NY.GDP.MKTP.CD&startYear=2020&endYear=2023
```

**Find Indicator Codes**: https://data.worldbank.org/indicator

### 7. Country Information

```bash
# Get detailed country information
GET /api/external-api/world-bank/country-info?country=TH

# Get list of all countries
GET /api/external-api/world-bank/countries
```

### 8. Economic Summary (Recommended)

Get comprehensive summary with 10 key indicators in one call:

```bash
GET /api/external-api/world-bank/economic-summary?country=TH&year=2023
```

**Includes**:

- GDP (current US$)
- GDP growth rate
- GDP per capita
- Population
- Inflation
- Unemployment
- FDI
- Exports
- Imports

### 9. Compare Countries

Compare indicators across multiple countries:

```bash
# Compare GDP of ASEAN countries
GET /api/external-api/world-bank/compare-countries?countries=TH,VN,MY,ID,PH,SG&indicator=NY.GDP.MKTP.CD&year=2023

# Compare GDP growth
GET /api/external-api/world-bank/compare-countries?countries=TH,VN,MY,ID,PH&indicator=NY.GDP.MKTP.KD.ZG&year=2023

# Compare inflation
GET /api/external-api/world-bank/compare-countries?countries=TH,VN,MY,ID,PH&indicator=FP.CPI.TOTL.ZG&year=2023
```

## Country Codes

### ASEAN Countries

- **TH** / THA - Thailand
- **VN** / VNM - Vietnam
- **MY** / MYS - Malaysia
- **ID** / IDN - Indonesia
- **PH** / PHL - Philippines
- **SG** / SGP - Singapore
- **MM** / MMR - Myanmar
- **KH** / KHM - Cambodia
- **LA** / LAO - Lao PDR
- **BN** / BRN - Brunei Darussalam

### Major Economies

- **US** / USA - United States
- **CN** / CHN - China
- **JP** / JPN - Japan
- **DE** / DEU - Germany
- **GB** / GBR - United Kingdom
- **FR** / FRA - France
- **IN** / IND - India
- **BR** / BRA - Brazil
- **RU** / RUS - Russia
- **KR** / KOR - South Korea

**View All**: https://api.worldbank.org/v2/country?format=json

## Common Use Cases for Pawn Shop

### 1. Monitor Thai Economic Health

```typescript
import { WorldBankApiService } from './world-bank-api.service';

// Get Thailand economic summary
const thaiEconomy = await worldBankApiService.getEconomicSummary('TH', 2023);

console.log(
  `Thailand GDP: $${thaiEconomy.indicators.gdp.value.toLocaleString()}`,
);
console.log(`GDP Growth: ${thaiEconomy.indicators.gdpGrowth.value}%`);
console.log(`Inflation: ${thaiEconomy.indicators.inflation.value}%`);
console.log(`Unemployment: ${thaiEconomy.indicators.unemployment.value}%`);
```

### 2. Compare ASEAN Economies

```typescript
// Compare GDP across ASEAN
const gdpComparison = await worldBankApiService.compareCountries(
  ['TH', 'VN', 'MY', 'ID', 'PH', 'SG'],
  'NY.GDP.MKTP.CD',
  2023,
);

gdpComparison.comparison.forEach((country) => {
  console.log(`${country.country}: $${country.value.toLocaleString()}`);
});
```

### 3. Track Inflation Trends

```typescript
// Get 10-year inflation history
const inflation = await worldBankApiService.getInflation('TH', 2014, 2023);

// Calculate average inflation
const avgInflation =
  inflation.data.reduce((sum, d) => sum + (d.value || 0), 0) /
  inflation.data.length;
console.log(`Average inflation (10 years): ${avgInflation.toFixed(2)}%`);
```

### 4. Population Demographics

```typescript
// Get population trends
const population = await worldBankApiService.getPopulation('TH', 2019, 2023);
const lifeExpectancy = await worldBankApiService.getLifeExpectancy(
  'TH',
  2019,
  2023,
);

console.log('Thailand Demographics:');
population.data.forEach((d) => {
  console.log(`${d.date}: ${d.value.toLocaleString()} people`);
});
```

### 5. Regional Trade Analysis

```typescript
// Analyze Thailand's trade
const exports = await worldBankApiService.getExports('TH', 2020, 2023);
const imports = await worldBankApiService.getImports('TH', 2020, 2023);

const latestExports = exports.data[0];
const latestImports = imports.data[0];

console.log(`Exports: ${latestExports.value}% of GDP`);
console.log(`Imports: ${latestImports.value}% of GDP`);
console.log(
  `Trade Balance: ${(latestExports.value - latestImports.value).toFixed(2)}%`,
);
```

### 6. Technology Adoption

```typescript
// Monitor digital transformation
const internetUsers = await worldBankApiService.getInternetUsers(
  'TH',
  2018,
  2023,
);
const mobileSubscriptions =
  await worldBankApiService.getMobileCellularSubscriptions('TH', 2018, 2023);

console.log('Digital Adoption in Thailand:');
console.log(`Internet users: ${internetUsers.data[0].value}% of population`);
console.log(
  `Mobile subscriptions: ${mobileSubscriptions.data[0].value} per 100 people`,
);
```

## Integration Examples

### Use in Analytics Service

```typescript
// backend/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { WorldBankApiService } from '../external-api/world-bank-api/world-bank-api.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly worldBankApiService: WorldBankApiService) {}

  async getMarketConditions() {
    const year = new Date().getFullYear() - 1;

    // Get economic indicators
    const [thaiData, usData, chinaData] = await Promise.all([
      this.worldBankApiService.getEconomicSummary('TH', year),
      this.worldBankApiService.getEconomicSummary('US', year),
      this.worldBankApiService.getEconomicSummary('CN', year),
    ]);

    return {
      thailand: {
        gdpGrowth: thaiData.indicators.gdpGrowth.value,
        inflation: thaiData.indicators.inflation.value,
        unemployment: thaiData.indicators.unemployment.value,
      },
      global: {
        us: usData.indicators.gdpGrowth.value,
        china: chinaData.indicators.gdpGrowth.value,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async compareASEANEconomies(indicator: string, year: number) {
    return this.worldBankApiService.compareCountries(
      ['TH', 'VN', 'MY', 'ID', 'PH', 'SG'],
      indicator,
      year,
    );
  }

  async getPopulationTrends(countryCode: string) {
    const currentYear = new Date().getFullYear() - 1;
    const startYear = currentYear - 10;

    return this.worldBankApiService.getPopulation(
      countryCode,
      startYear,
      currentYear,
    );
  }
}
```

### Create Economic Dashboard

```typescript
// Create dashboard endpoint
@Get('dashboard/economic')
async getEconomicDashboard(@Query('country') country: string = 'TH') {
  const year = new Date().getFullYear() - 1;

  const [
    summary,
    aseanGDP,
    inflationTrend,
    population,
  ] = await Promise.all([
    this.worldBankApiService.getEconomicSummary(country, year),
    this.worldBankApiService.compareCountries(
      ['TH', 'VN', 'MY', 'ID', 'PH', 'SG'],
      'NY.GDP.MKTP.CD',
      year,
    ),
    this.worldBankApiService.getInflation(country, year - 5, year),
    this.worldBankApiService.getPopulation(country, year - 5, year),
  ]);

  return {
    country: summary.country,
    year: summary.year,
    summary: summary.indicators,
    regional: {
      aseanGDP: aseanGDP.comparison,
    },
    trends: {
      inflation: inflationTrend.data,
      population: population.data,
    },
  };
}
```

## Best Practices

### 1. Caching Responses

World Bank data doesn't change frequently (annual updates):

```typescript
import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class CachedWorldBankService {
  constructor(
    private readonly worldBankApiService: WorldBankApiService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCachedGDP(country: string, startYear: number, endYear: number) {
    const cacheKey = `wb_gdp_${country}_${startYear}_${endYear}`;

    // Check cache first
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from API
    const data = await this.worldBankApiService.getGDP(
      country,
      startYear,
      endYear,
    );

    // Cache for 1 day (World Bank data is updated infrequently)
    await this.cacheManager.set(cacheKey, data, 86400);

    return data;
  }

  async getCachedEconomicSummary(country: string, year: number) {
    const cacheKey = `wb_summary_${country}_${year}`;

    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const data = await this.worldBankApiService.getEconomicSummary(
      country,
      year,
    );
    await this.cacheManager.set(cacheKey, data, 86400); // 24 hours

    return data;
  }
}
```

### 2. Error Handling

```typescript
async getEconomicDataSafely(country: string, year: number) {
  try {
    const data = await this.worldBankApiService.getEconomicSummary(country, year);
    return { success: true, data };
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, error: 'Country not found' };
    }
    if (error.response?.status === 500) {
      return { success: false, error: 'World Bank API unavailable' };
    }
    return { success: false, error: 'Unknown error' };
  }
}
```

### 3. Batch Processing

```typescript
// Get data for multiple countries efficiently
async getBatchEconomicData(countryCodes: string[], year: number) {
  const results = await Promise.all(
    countryCodes.map(async (code) => {
      try {
        const data = await this.worldBankApiService.getEconomicSummary(code, year);
        return { country: code, success: true, data };
      } catch (error) {
        return { country: code, success: false, error: error.message };
      }
    }),
  );

  return {
    successful: results.filter(r => r.success),
    failed: results.filter(r => !r.success),
  };
}
```

### 4. Historical Analysis

```typescript
// Compare current vs historical data
async compareWithHistory(country: string, indicator: string) {
  const currentYear = new Date().getFullYear() - 1;
  const historicalYear = currentYear - 10;

  const data = await this.worldBankApiService.getIndicator(
    country,
    indicator,
    historicalYear,
    currentYear,
  );

  const values = data.data.filter(d => d.value !== null);
  const latest = values[0];
  const oldest = values[values.length - 1];

  const change = latest.value - oldest.value;
  const percentChange = (change / oldest.value) * 100;

  return {
    indicator: latest.indicator.value,
    current: { year: latest.date, value: latest.value },
    historical: { year: oldest.date, value: oldest.value },
    change: {
      absolute: change,
      percent: percentChange,
    },
  };
}
```

## Response Data Structure

### Standard Indicator Response

```typescript
{
  metadata: {
    page: number;           // Current page
    pages: number;          // Total pages
    per_page: number;       // Items per page
    total: number;          // Total items
  },
  data: [
    {
      indicator: {
        id: string;         // Indicator code (e.g., 'NY.GDP.MKTP.CD')
        value: string;      // Indicator name
      },
      country: {
        id: string;         // Country code (e.g., 'TH')
        value: string;      // Country name
      },
      countryiso3code: string;  // ISO 3-letter code
      date: string;         // Year
      value: number | null; // Indicator value
      unit: string;         // Unit of measurement
      obs_status: string;   // Observation status
      decimal: number;      // Decimal places
    }
  ]
}
```

### Economic Summary Response

```typescript
{
  country: string;         // Country name
  countryCode: string;     // ISO code
  year: string;           // Target year
  indicators: {
    [key: string]: {
      value: number | null;
      indicator: string;   // Full name
      unit: string;        // Unit
    }
  }
}
```

## Rate Limits & Performance

- **No Official Rate Limits**: World Bank API is free and public
- **Recommended**: Cache responses for at least 1 day
- **Data Updates**: Most indicators updated annually
- **Response Time**: 200-500ms per request
- **Best Practice**: Use `/economic-summary` endpoint for multiple indicators

## Popular Indicator Categories

### Economic

- GDP, GDP growth, GDP per capita
- Inflation, CPI
- Unemployment
- GNI (Gross National Income)

### Trade

- Exports, Imports
- Trade balance
- Foreign Direct Investment
- Current account balance

### Demographics

- Population
- Life expectancy
- Birth rate, Death rate
- Urban population

### Education

- Literacy rate
- School enrollment (primary, secondary, tertiary)
- Education expenditure

### Health

- Infant mortality
- Maternal mortality
- Health expenditure
- Hospital beds

### Environment

- CO2 emissions
- Forest area
- Renewable energy
- Water access

### Technology

- Internet users
- Mobile subscriptions
- Fixed broadband
- Research & Development expenditure

## Additional Resources

- **World Bank Data Portal**: https://data.worldbank.org/
- **API Documentation**: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392
- **Indicator Search**: https://data.worldbank.org/indicator
- **Data Catalog**: https://datacatalog.worldbank.org/
- **World Development Indicators**: https://datatopics.worldbank.org/world-development-indicators/

## Support

For issues or questions about World Bank API integration:

- Check API documentation: https://datahelpdesk.worldbank.org/
- Review this guide
- Contact World Bank Data Help Desk: https://datahelpdesk.worldbank.org/

---

**Last Updated**: November 2025
