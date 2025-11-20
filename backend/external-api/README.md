# External API Integration Module

This module handles all external API integrations for the Pawn AI system.

## APIs Integrated

### 1. Bank of Thailand (BOT) API

**Purpose**: Get USD/THB spot rate and exchange rate information

**Service**: `BotApiService`
**Controller**: `BotApiController`
**Base URL**: `https://apigw1.bot.or.th/bot/public/Stat-SpotRate/v2/SPOTRATE/`

#### Endpoints

##### GET /api/external-api/bot/spot-rate

Get complete spot rate data from Bank of Thailand including:

- Bid and offer rates
- Historical swap points
- Data sources and remarks

**Response Example**:

```json
{
  "result": {
    "api": "Spot Rate USD/THB (Percent per annum)",
    "timestamp": "2024-11-20 16:35:09",
    "data": {
      "data_header": {
        "report_name_eng": "Spot Rate and Swap Point",
        "report_name_th": "Spot Rate and Swap Point",
        "report_source_of_data": [
          {
            "source_of_data_eng": "Reuters",
            "source_of_data_th": "รอยเตอร์"
          }
        ]
      },
      "data_detail": [
        {
          "period": "Spot",
          "bid": "33.85",
          "offer": "33.95"
        }
      ]
    }
  }
}
```

##### GET /api/external-api/bot/current-rate

Get current USD/THB exchange rate (average of bid and offer)

**Response Example**:

```json
{
  "rate": 33.9,
  "timestamp": "2024-11-20T10:30:00Z"
}
```

### 2. Loan Rate API

**Purpose**: Get loan interest rates from Thai commercial banks

**Service**: `LoanRateApiService`
**Controller**: `LoanRateApiController`
**Base URLs**:

- Individual: `https://gateway.api.bot.or.th/LoanRate/v2/loan_rate/`
- Average: `https://gateway.api.bot.or.th/LoanRate/v2/avg_loan_rate/`

#### Endpoints

##### GET /api/external-api/loan-rate/individual

Get individual bank loan rates (MOR, MLR, MRR, ceiling rates)

**Query Parameters**:

- `start_period`: Start date (YYYY-MM-DD)
- `end_period`: End date (YYYY-MM-DD)

**Response includes**:

- MOR (Minimum Overdraft Rate)
- MLR (Minimum Loan Rate)
- MRR (Minimum Retail Rate)
- Ceiling Rate
- Default Rate
- Credit Card Rates

##### GET /api/external-api/loan-rate/average

Get average loan rates across all Thai commercial banks

##### GET /api/external-api/loan-rate/latest

Get latest average rates with parsed numeric values

### 3. Holiday API

**Purpose**: Get financial institutions holidays in Thailand

**Service**: `HolidayApiService`
**Controller**: `HolidayApiController`
**Base URL**: `https://gateway.api.bot.or.th/financial-institutions-holidays/`

#### Endpoints

##### GET /api/external-api/holidays

Get all financial institutions holidays

**Query Parameters**:

- `year`: Filter by year (e.g., 2024)

**Response Example**:

```json
{
  "holidays": [
    {
      "HolidayWeekDay": "Monday",
      "HolidayWeekDayThai": "วันจันทร์",
      "Date": "2024-01-01",
      "DateThai": "01/01/2567",
      "HolidayDescription": "New Year's Day",
      "HolidayDescriptionThai": "วันขึ้นปีใหม่"
    }
  ],
  "year": 2024,
  "total": 1
}
```

##### GET /api/external-api/holidays/upcoming

Get upcoming holidays from today

**Query Parameters**:

- `limit`: Number of holidays to return (default: 5)

##### GET /api/external-api/holidays/check/:date

Check if a specific date is a holiday

**Path Parameters**:

- `date`: Date in YYYY-MM-DD format

##### GET /api/external-api/holidays/by-month/:year/:month

Get holidays for a specific month

### 4. Policy Rate API

**Purpose**: Get BOT policy interest rate (อัตราดอกเบี้ยนโยบาย)

**Service**: `PolicyRateApiService`
**Controller**: `PolicyRateApiController`
**Base URL**: `https://gateway.api.bot.or.th/PolicyRate/v2/policy_rate/`

#### Endpoints

##### GET /api/external-api/policy-rate

Get policy rate history

**Query Parameters**:

- `start_period`: Start date (YYYY-MM-DD)
- `end_period`: End date (YYYY-MM-DD)

##### GET /api/external-api/policy-rate/current

Get current policy rate (most recent)

**Response Example**:

```json
{
  "rate": 2.5,
  "date": "2024-11-20",
  "timestamp": "2024-11-20T10:00:00Z"
}
```

##### GET /api/external-api/policy-rate/year/:year

Get policy rate history for a specific year

### 5. Inflation/CPI API

**Purpose**: Get inflation rate and Consumer Price Index data

**Service**: `InflationApiService`
**Controller**: `InflationApiController`
**Base URLs**:

- CPI: `https://gateway.api.bot.or.th/EconomicIndicators/v2/cpi/`
- Inflation: `https://gateway.api.bot.or.th/EconomicIndicators/v2/inflation/`

#### Endpoints

##### GET /api/external-api/inflation/cpi

Get Consumer Price Index (CPI) data

**Query Parameters**:

- `start_period`: Start period (YYYY-MM)
- `end_period`: End period (YYYY-MM)

##### GET /api/external-api/inflation/rate

Get inflation rate (headline and core)

**Query Parameters**:

- `start_period`: Start period (YYYY-MM)
- `end_period`: End period (YYYY-MM)

##### GET /api/external-api/inflation/current

Get current inflation rates

**Response Example**:

```json
{
  "headline": 0.85,
  "core": 0.52,
  "period": "2024-11",
  "timestamp": "2024-11-20T10:00:00Z"
}
```

**Inflation Types**:

- **Headline Inflation**: รวมทุกหมวดสินค้า (รวมพลังงานและอาหารสด)
- **Core Inflation**: ไม่รวมพลังงานและอาหารสด (ใช้วัดเงินเฟ้อพื้นฐาน)

##### GET /api/external-api/inflation/year/:year

Get inflation data for a specific year

##### GET /api/external-api/inflation/average/:year

Get average inflation for a specific year

**Response Example**:

```json
{
  "year": 2024,
  "headline_avg": 0.75,
  "core_avg": 0.48,
  "months": 11
}
```

### 6. Thai Gold API

**Purpose**: Get latest Thai gold prices from ทองคําราคา.com

**Service**: `GoldThaiApiService`
**Controller**: `GoldThaiApiController`
**Base URL**: `https://api.chnwt.dev/thai-gold-api`

**Note**: This is a public API with no authentication required

#### Endpoints

##### GET /api/external-api/gold-thai/latest

Get latest Thai gold prices (buy/sell) for both gold bars and gold ornaments

**Response Example**:

```json
{
  "status": "success",
  "response": {
    "date": "18 พฤษภาคม 2565",
    "update_time": "เวลา 16:37 น.",
    "price": {
      "gold": {
        "buy": "30,300.00",
        "sell": "29,167.84"
      },
      "gold_bar": {
        "buy": "29,800.00",
        "sell": "29,700.00"
      },
      "change": {
        "compare_previous": "+50",
        "compare_yesterday": "-100"
      }
    }
  }
}
```

**Price Types**:

- **Gold Bar** (ทองคำแท่ง): Gold bars 96.5% purity, used for investment
- **Gold Ornament** (ทองรูปพรรณ): Gold jewelry/ornaments, includes crafting cost

**Price Fields**:

- `buy`: Price the shop buys gold from customers (THB per baht)
- `sell`: Price customers pay to buy gold from shop (THB per baht)
- `compare_previous`: Change from previous update
- `compare_yesterday`: Change from yesterday

##### GET /api/external-api/gold-thai/bar

Get gold bar prices as numeric values (no commas)

**Response Example**:

```json
{
  "buy": 29800.0,
  "sell": 29700.0,
  "date": "18 พฤษภาคม 2565",
  "updateTime": "เวลา 16:37 น."
}
```

##### GET /api/external-api/gold-thai/ornament

Get gold ornament prices as numeric values (no commas)

**Response Example**:

```json
{
  "buy": 30300.0,
  "sell": 29167.84,
  "date": "18 พฤษภาคม 2565",
  "updateTime": "เวลา 16:37 น."
}
```

### 7. Gold Global API

**Purpose**: Get international precious metals prices from MetalPriceAPI

**Service**: `GoldGlobalApiService`
**Controller**: `GoldGlobalApiController`
**Base URL**: `https://api.metalpriceapi.com/v1`
**Authentication**: API Key required

#### Endpoints

##### GET /api/external-api/gold-global/latest

Get latest precious metals and currency exchange rates

**Query Parameters**:

- `base`: Base currency (default: USD)
- `currencies`: Comma-separated list (e.g., XAU,XAG,THB,EUR)

**Response Example**:

```json
{
  "success": true,
  "base": "USD",
  "timestamp": 1625609377,
  "rates": {
    "EUR": 0.8255334,
    "XAG": 0.03602543,
    "XAU": 0.00053853,
    "THB": 33.25
  }
}
```

**Metal Codes**:

- **XAU**: Gold (Troy Ounce)
- **XAG**: Silver (Troy Ounce)
- **XPT**: Platinum (Troy Ounce)
- **XPD**: Palladium (Troy Ounce)

**Note**: Rates show how much 1 USD equals in the metal. To get price per ounce, use: `1 / rate`

##### GET /api/external-api/gold-global/gold

Get current gold price in USD and THB per troy ounce

**Response Example**:

```json
{
  "price_per_oz": 1856.91,
  "price_in_thb": 61742.24,
  "timestamp": 1625609377,
  "date": "2021-07-07T03:29:37.000Z"
}
```

##### GET /api/external-api/gold-global/silver

Get current silver price in USD and THB per troy ounce

**Response Example**:

```json
{
  "price_per_oz": 27.76,
  "price_in_thb": 922.53,
  "timestamp": 1625609377,
  "date": "2021-07-07T03:29:37.000Z"
}
```

##### GET /api/external-api/gold-global/all-metals

Get all precious metals prices (Gold, Silver, Platinum, Palladium)

**Response Example**:

```json
{
  "gold": { "price_per_oz": 1856.91, "price_in_thb": 61742.24 },
  "silver": { "price_per_oz": 27.76, "price_in_thb": 922.53 },
  "platinum": { "price_per_oz": 1145.23, "price_in_thb": 38078.89 },
  "palladium": { "price_per_oz": 2845.67, "price_in_thb": 94618.53 },
  "timestamp": 1625609377,
  "date": "2021-07-07T03:29:37.000Z"
}
```

##### GET /api/external-api/gold-global/convert

Convert amount between currencies/metals

**Query Parameters**:

- `from`: Source currency/metal code (e.g., USD, THB, XAU)
- `to`: Target currency/metal code
- `amount`: Amount to convert

**Example**: Convert 100 USD to Gold (XAU)

```
GET /api/external-api/gold-global/convert?from=USD&to=XAU&amount=100
```

**Response Example**:

```json
{
  "success": true,
  "query": { "from": "USD", "to": "XAU", "amount": 100 },
  "info": { "quote": 0.0005628, "timestamp": 1619150400 },
  "result": 0.05628031
}
```

##### GET /api/external-api/gold-global/historical/:date

Get historical metal prices for a specific date

**Path Parameters**:

- `date`: Date in YYYY-MM-DD format (e.g., 2024-01-15)

**Query Parameters**:

- `base`: Base currency (default: USD)
- `currencies`: Comma-separated list of currencies/metals

**Example**:

```
GET /api/external-api/gold-global/historical/2024-01-15?currencies=XAU,XAG,THB
```

##### GET /api/external-api/gold-global/change

Get price change over time period

**Query Parameters**:

- `start_date`: Start date (YYYY-MM-DD) - Required
- `end_date`: End date (YYYY-MM-DD) - Required
- `base`: Base currency (default: USD)
- `currencies`: Comma-separated list (default: XAU,XAG)

**Response Example**:

```json
{
  "success": true,
  "base": "USD",
  "start_date": "2024-01-01",
  "end_date": "2024-01-31",
  "rates": {
    "XAU": {
      "start_rate": 0.00059101,
      "end_rate": 0.00059256,
      "change": 0.00000155,
      "change_pct": 0.2623
    }
  }
}
```

**Troy Ounce**: International standard unit for precious metals (31.1035 grams)

## Usage

### In Your Service

```typescript
import { BotApiService } from './external-api/bot-api/bot-api.service';

@Injectable()
export class YourService {
  constructor(private readonly botApiService: BotApiService) {}

  async getExchangeRate() {
    // Get full spot rate data
    const spotRate = await this.botApiService.getSpotRate();

    // Or get just the current rate
    const currentRate = await this.botApiService.getCurrentRate();
    return currentRate;
  }
}
```

### Testing the API

You can test the endpoints using:

1. **Swagger UI**: http://localhost:3002/api/docs
   - Navigate to "external-api" section
   - Try the endpoints directly in the browser

2. **cURL**:

```bash
# Get spot rate
curl http://localhost:3002/api/external-api/bot/spot-rate

# Get current rate
curl http://localhost:3002/api/external-api/bot/current-rate
```

3. **Postman/Insomnia**: Import the Swagger JSON

## Error Handling

All services implement proper error handling:

- **503 Service Unavailable**: When the external API is down or unreachable
- **500 Internal Server Error**: When data processing fails
- **Logging**: All errors are logged with context for debugging

## Development

### Adding a New External API

1. Create a new folder under `external-api/`
2. Create the service: `your-api.service.ts`
3. Implement the API calls using `HttpService` from `@nestjs/axios`
4. Create DTOs for type safety
5. Create a controller if endpoints are needed
6. Add to `external-api.module.ts`
7. Add tests

### Testing

```bash
# Run unit tests
npm run test -- external-api

# Run specific service test
npm run test -- bot-api.service
```

## Dependencies

- `@nestjs/axios`: HTTP client for making API requests
- `rxjs`: Reactive programming library for handling HTTP responses

---

## 8. Alpha Vantage API - สำหรับข้อมูลเศรษฐกิจโลกรายวัน

**Purpose**: Global economic data, forex rates, commodities, stock markets, and cryptocurrency data

**Service**: `AlphaVantageApiService`
**Controller**: `AlphaVantageApiController`
**Base URL**: `https://www.alphavantage.co/query`
**Authentication**: API Key via query parameter

### Categories

#### 8.1 Economic Indicators (US)

##### GET /api/external-api/alpha-vantage/economic/gdp

Get Real GDP (Gross Domestic Product) data

**Query Parameters**:

- `interval` (optional): `quarterly` | `annual` (default: `annual`)

**Example**:

```bash
GET /api/external-api/alpha-vantage/economic/gdp?interval=annual
```

**Response Example**:

```json
{
  "name": "Real Gross Domestic Product",
  "interval": "annual",
  "unit": "billions of dollars",
  "data": [
    { "date": "2023-01-01", "value": "21060.473" },
    { "date": "2022-01-01", "value": "20937.497" }
  ]
}
```

##### GET /api/external-api/alpha-vantage/economic/cpi

Get CPI (Consumer Price Index)

**Query Parameters**:

- `interval` (optional): `monthly` | `semiannual` (default: `monthly`)

##### GET /api/external-api/alpha-vantage/economic/inflation

Get annual inflation rates (consumer prices)

##### GET /api/external-api/alpha-vantage/economic/unemployment

Get monthly unemployment rate

##### GET /api/external-api/alpha-vantage/economic/federal-funds-rate

Get Federal Funds Rate (US interest rate)

**Query Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)

##### GET /api/external-api/alpha-vantage/economic/treasury-yield

Get US Treasury Yield

**Query Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)
- `maturity` (optional): `3month` | `2year` | `5year` | `7year` | `10year` | `30year` (default: `10year`)

#### 8.2 Forex (Foreign Exchange)

##### GET /api/external-api/alpha-vantage/forex/rate

Get realtime forex exchange rate

**Query Parameters** (required):

- `from`: From currency code (e.g., `USD`, `EUR`)
- `to`: To currency code (e.g., `THB`, `JPY`)

**Example**:

```bash
GET /api/external-api/alpha-vantage/forex/rate?from=USD&to=THB
```

**Response Example**:

```json
{
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": "USD",
    "2. From_Currency Name": "United States Dollar",
    "3. To_Currency Code": "THB",
    "4. To_Currency Name": "Thai Baht",
    "5. Exchange Rate": "33.95000000",
    "6. Last Refreshed": "2024-01-15 12:00:00",
    "7. Time Zone": "UTC",
    "8. Bid Price": "33.94000000",
    "9. Ask Price": "33.96000000"
  }
}
```

##### GET /api/external-api/alpha-vantage/forex/daily

Get forex daily time series (OHLC)

**Query Parameters**:

- `from` (required): From currency symbol
- `to` (required): To currency symbol
- `outputsize` (optional): `compact` | `full` (default: `compact` = last 100 data points)

#### 8.3 Commodities

##### GET /api/external-api/alpha-vantage/commodities/oil-wti

Get Crude Oil WTI (West Texas Intermediate) prices

**Query Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)

##### GET /api/external-api/alpha-vantage/commodities/oil-brent

Get Crude Oil Brent (Europe benchmark) prices

**Query Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)

##### GET /api/external-api/alpha-vantage/commodities/natural-gas

Get Natural Gas (Henry Hub) prices

**Query Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)

##### GET /api/external-api/alpha-vantage/commodities/copper

Get global Copper prices

**Query Parameters**:

- `interval` (optional): `monthly` | `quarterly` | `annual` (default: `monthly`)

#### 8.4 Stock Market

##### GET /api/external-api/alpha-vantage/stock/quote

Get global stock quote (latest price and volume)

**Query Parameters**:

- `symbol` (required): Stock symbol (e.g., `SPY` for S&P 500, `AAPL`, `DIA` for Dow Jones)

**Example**:

```bash
GET /api/external-api/alpha-vantage/stock/quote?symbol=SPY
```

**Response Example**:

```json
{
  "Global Quote": {
    "01. symbol": "SPY",
    "02. open": "470.50",
    "03. high": "472.80",
    "04. low": "469.30",
    "05. price": "471.25",
    "06. volume": "85234567",
    "07. latest trading day": "2024-01-15",
    "08. previous close": "470.00",
    "09. change": "1.25",
    "10. change percent": "0.27%"
  }
}
```

##### GET /api/external-api/alpha-vantage/stock/top-gainers-losers

Get top 20 gainers, losers, and most actively traded tickers in US market

#### 8.5 Market News & Sentiment

##### GET /api/external-api/alpha-vantage/news

Get latest market news with sentiment analysis

**Query Parameters**:

- `tickers` (optional): Comma-separated ticker symbols (e.g., `AAPL,MSFT`)
- `topics` (optional): News topics (e.g., `economy`, `finance`, `technology`, `blockchain`)
- `limit` (optional): Number of news items (default: 50, max: 1000)

**Example**:

```bash
GET /api/external-api/alpha-vantage/news?topics=economy&limit=10
```

#### 8.6 Cryptocurrency

##### GET /api/external-api/alpha-vantage/crypto/rate

Get realtime cryptocurrency exchange rate

**Query Parameters**:

- `crypto` (required): Cryptocurrency symbol (e.g., `BTC`, `ETH`, `LTC`)
- `market` (optional): Market currency (default: `USD`)

**Example**:

```bash
GET /api/external-api/alpha-vantage/crypto/rate?crypto=BTC&market=USD
```

##### GET /api/external-api/alpha-vantage/crypto/daily

Get cryptocurrency daily historical data

**Query Parameters**:

- `symbol` (required): Cryptocurrency symbol (e.g., `BTC`, `ETH`)
- `market` (optional): Market currency (default: `USD`)

#### 8.7 Daily Economic Summary

##### GET /api/external-api/alpha-vantage/summary/daily

Get comprehensive daily summary of:

- Economic indicators (GDP, inflation, unemployment, federal funds rate)
- Commodities (crude oil WTI and Brent)
- Forex (USD/EUR, USD/THB)
- Crypto (BTC/USD)
- Stock market (S&P 500)
- Latest market news

**Example**:

```bash
GET /api/external-api/alpha-vantage/summary/daily
```

**Response Example**:

```json
{
  "timestamp": "2024-01-15T10:00:00.000Z",
  "economic_indicators": {
    "gdp": { "name": "Real GDP", "data": [...] },
    "inflation": { "name": "Inflation", "data": [...] },
    "unemployment": { "name": "Unemployment", "data": [...] },
    "federal_funds_rate": { "name": "Federal Funds Rate", "data": [...] }
  },
  "commodities": {
    "crude_oil_wti": { "name": "WTI", "data": [...] },
    "crude_oil_brent": { "name": "Brent", "data": [...] }
  },
  "forex": {
    "usd_eur": { "Realtime Currency Exchange Rate": {...} },
    "usd_thb": { "Realtime Currency Exchange Rate": {...} }
  },
  "crypto": {
    "btc_usd": { "Realtime Currency Exchange Rate": {...} }
  },
  "stock_market": {
    "sp500": { "Global Quote": {...} }
  },
  "news": { "feed": [...] }
}
```

### Configuration

Add to `.env`:

```bash
# Alpha Vantage API - Global Economic & Market Data
Alpha_Vantage_key=your-api-key-here
```

Get your free API key at: https://www.alphavantage.co/support/#api-key

### API Limits

- **Free Tier**: 25 API requests per day
- **Premium Plans**: Up to 1200 requests per minute

### Use Cases for Pawn Shop

1. **Daily Economic Updates**: Monitor global economic trends that affect commodity prices
2. **Forex Monitoring**: Track USD/THB and other currency pairs for international gold price conversions
3. **Commodity Prices**: Monitor crude oil and copper prices as economic indicators
4. **Market Sentiment**: Get news and sentiment analysis for gold and precious metals markets
5. **Cryptocurrency**: Track BTC and ETH prices for customers interested in crypto collateral

---

## 9. World Bank Indicators API - ตัวชี้วัดเศรษฐกิจโลก

**Purpose**: ข้อมูลตัวชี้วัดเศรษฐกิจและสังคมจาก World Bank (16,000+ indicators)

**Service**: `WorldBankApiService`  
**Controller**: `WorldBankApiController`  
**Base URL**: `https://api.worldbank.org/v2`

**ฐานข้อมูล**: 45+ databases รวมถึง World Development Indicators, International Debt Statistics, Doing Business, Human Capital Index

**Authentication**: ไม่ต้องใช้ API Key (Public API)

**Coverage**: 200+ countries, 50+ years of historical data

### Core Indicators

#### 9.1 Economic Indicators

##### GET /api/external-api/world-bank/gdp

**Description**: Get GDP (current US$) for a country

**Query Parameters**:

- `country` (required): Country code (ISO 2 or 3 letter) - TH, USA, CHN
- `startYear` (optional): Start year
- `endYear` (optional): End year

**Example**:

```bash
GET /api/external-api/world-bank/gdp?country=TH&startYear=2020&endYear=2023
```

**Response**:

```json
{
  "metadata": {
    "page": 1,
    "pages": 1,
    "per_page": 100,
    "total": 4
  },
  "data": [
    {
      "indicator": {
        "id": "NY.GDP.MKTP.CD",
        "value": "GDP (current US$)"
      },
      "country": {
        "id": "TH",
        "value": "Thailand"
      },
      "countryiso3code": "THA",
      "date": "2023",
      "value": 514952983883.79,
      "unit": "",
      "obs_status": "",
      "decimal": 0
    }
  ]
}
```

##### GET /api/external-api/world-bank/gdp-growth

**Description**: Get GDP growth (annual %)

**Query Parameters**: Same as GDP

**Example**:

```bash
GET /api/external-api/world-bank/gdp-growth?country=TH&startYear=2020&endYear=2023
```

##### GET /api/external-api/world-bank/gdp-per-capita

**Description**: Get GDP per capita (current US$)

**Query Parameters**: Same as GDP

##### GET /api/external-api/world-bank/inflation

**Description**: Get consumer price inflation (annual %)

**Query Parameters**: Same as GDP

**Example**:

```bash
GET /api/external-api/world-bank/inflation?country=TH&startYear=2020&endYear=2023
```

##### GET /api/external-api/world-bank/unemployment

**Description**: Get unemployment rate (% of total labor force)

**Query Parameters**: Same as GDP

#### 9.2 Population & Demographics

##### GET /api/external-api/world-bank/population

**Description**: Get total population

**Query Parameters**: Same as GDP

**Example**:

```bash
GET /api/external-api/world-bank/population?country=TH&startYear=2020&endYear=2023
```

##### GET /api/external-api/world-bank/life-expectancy

**Description**: Get life expectancy at birth (years)

**Query Parameters**: Same as GDP

##### GET /api/external-api/world-bank/poverty

**Description**: Get poverty headcount ratio at $2.15 a day (% of population)

**Query Parameters**: Same as GDP

#### 9.3 Education

##### GET /api/external-api/world-bank/literacy-rate

**Description**: Get adult literacy rate (% ages 15+)

**Query Parameters**: Same as GDP

##### GET /api/external-api/world-bank/tertiary-education

**Description**: Get tertiary education enrollment (% gross)

**Query Parameters**: Same as GDP

#### 9.4 Trade & Investment

##### GET /api/external-api/world-bank/fdi

**Description**: Get foreign direct investment net inflows (% of GDP)

**Query Parameters**: Same as GDP

**Example**:

```bash
GET /api/external-api/world-bank/fdi?country=TH&startYear=2020&endYear=2023
```

##### GET /api/external-api/world-bank/exports

**Description**: Get exports of goods and services (% of GDP)

**Query Parameters**: Same as GDP

##### GET /api/external-api/world-bank/imports

**Description**: Get imports of goods and services (% of GDP)

**Query Parameters**: Same as GDP

#### 9.5 Environment & Technology

##### GET /api/external-api/world-bank/co2-emissions

**Description**: Get CO2 emissions (metric tons per capita)

**Query Parameters**: Same as GDP

##### GET /api/external-api/world-bank/electric-power

**Description**: Get electric power consumption (kWh per capita)

**Query Parameters**: Same as GDP

##### GET /api/external-api/world-bank/internet-users

**Description**: Get internet users (% of population)

**Query Parameters**: Same as GDP

##### GET /api/external-api/world-bank/mobile-subscriptions

**Description**: Get mobile cellular subscriptions (per 100 people)

**Query Parameters**: Same as GDP

#### 9.6 Custom Indicator Query

##### GET /api/external-api/world-bank/indicator

**Description**: Get any World Bank indicator by its code

**Query Parameters**:

- `country` (required): Country code
- `indicator` (required): World Bank indicator code (e.g., NY.GDP.MKTP.CD)
- `startYear` (optional): Start year
- `endYear` (optional): End year

**Example**:

```bash
GET /api/external-api/world-bank/indicator?country=TH&indicator=NY.GDP.MKTP.CD&startYear=2020&endYear=2023
```

**Find Indicator Codes**: https://data.worldbank.org/indicator

#### 9.7 Country Information

##### GET /api/external-api/world-bank/country-info

**Description**: Get detailed country information

**Query Parameters**:

- `country` (required): Country code

**Example**:

```bash
GET /api/external-api/world-bank/country-info?country=TH
```

**Response**:

```json
{
  "id": "THA",
  "iso2Code": "TH",
  "name": "Thailand",
  "region": {
    "id": "EAS",
    "iso2code": "Z4",
    "value": "East Asia & Pacific"
  },
  "adminregion": {
    "id": "EAP",
    "iso2code": "4E",
    "value": "East Asia & Pacific (excluding high income)"
  },
  "incomeLevel": {
    "id": "UMC",
    "iso2code": "XT",
    "value": "Upper middle income"
  },
  "lendingType": {
    "id": "IBD",
    "iso2code": "XF",
    "value": "IBRD"
  },
  "capitalCity": "Bangkok",
  "longitude": "100.521",
  "latitude": "13.7544"
}
```

##### GET /api/external-api/world-bank/countries

**Description**: Get list of all countries

**Example**:

```bash
GET /api/external-api/world-bank/countries
```

#### 9.8 Comprehensive Summary

##### GET /api/external-api/world-bank/economic-summary

**Description**: Get comprehensive economic summary for a country (combines 10 indicators)

**Query Parameters**:

- `country` (required): Country code
- `year` (optional): Target year (defaults to previous year)

**Example**:

```bash
GET /api/external-api/world-bank/economic-summary?country=TH&year=2023
```

**Response**:

```json
{
  "country": "Thailand",
  "countryCode": "TH",
  "year": "2023",
  "indicators": {
    "gdp": {
      "value": 514952983883.79,
      "indicator": "GDP (current US$)",
      "unit": "USD"
    },
    "gdpGrowth": {
      "value": 2.6,
      "indicator": "GDP growth",
      "unit": "%"
    },
    "gdpPerCapita": {
      "value": 7183.82,
      "indicator": "GDP per capita",
      "unit": "USD"
    },
    "population": {
      "value": 71697030,
      "indicator": "Population, total",
      "unit": "people"
    },
    "inflation": {
      "value": 1.23,
      "indicator": "Inflation, consumer prices",
      "unit": "%"
    },
    "unemployment": {
      "value": 1.05,
      "indicator": "Unemployment, total",
      "unit": "% of labor force"
    },
    "fdi": {
      "value": 2.1,
      "indicator": "Foreign direct investment, net inflows",
      "unit": "% of GDP"
    },
    "exports": {
      "value": 65.4,
      "indicator": "Exports of goods and services",
      "unit": "% of GDP"
    },
    "imports": {
      "value": 58.9,
      "indicator": "Imports of goods and services",
      "unit": "% of GDP"
    }
  }
}
```

#### 9.9 Compare Countries

##### GET /api/external-api/world-bank/compare-countries

**Description**: Compare an indicator across multiple countries

**Query Parameters**:

- `countries` (required): Comma-separated country codes
- `indicator` (required): World Bank indicator code
- `year` (optional): Target year

**Example**:

```bash
GET /api/external-api/world-bank/compare-countries?countries=TH,VN,MY,ID,PH&indicator=NY.GDP.MKTP.CD&year=2023
```

**Response**:

```json
{
  "indicator": "NY.GDP.MKTP.CD",
  "year": 2023,
  "comparison": [
    {
      "country": "Thailand",
      "countryCode": "TH",
      "value": 514952983883.79,
      "year": "2023",
      "unit": "",
      "indicator": "GDP (current US$)"
    },
    {
      "country": "Vietnam",
      "countryCode": "VN",
      "value": 429716893764.16,
      "year": "2023",
      "unit": "",
      "indicator": "GDP (current US$)"
    }
  ]
}
```

### Popular Indicator Codes

| Code                 | Description                            | Unit                   |
| -------------------- | -------------------------------------- | ---------------------- |
| NY.GDP.MKTP.CD       | GDP (current US$)                      | USD                    |
| NY.GDP.MKTP.KD.ZG    | GDP growth (annual %)                  | %                      |
| NY.GDP.PCAP.CD       | GDP per capita                         | USD                    |
| SP.POP.TOTL          | Population, total                      | people                 |
| FP.CPI.TOTL.ZG       | Inflation, consumer prices             | %                      |
| SL.UEM.TOTL.ZS       | Unemployment, total                    | % of labor force       |
| SI.POV.DDAY          | Poverty headcount ratio at $2.15 a day | %                      |
| SP.DYN.LE00.IN       | Life expectancy at birth               | years                  |
| SE.ADT.LITR.ZS       | Literacy rate, adult total             | %                      |
| BX.KLT.DINV.WD.GD.ZS | Foreign direct investment              | % of GDP               |
| NE.EXP.GNFS.ZS       | Exports of goods and services          | % of GDP               |
| NE.IMP.GNFS.ZS       | Imports of goods and services          | % of GDP               |
| EN.ATM.CO2E.PC       | CO2 emissions                          | metric tons per capita |
| IT.NET.USER.ZS       | Internet users                         | % of population        |

### Use Cases for Pawn Shop

1. **Economic Health Monitoring**:
   - Track GDP growth of countries where customers have investments
   - Monitor inflation rates affecting purchasing power
   - Assess unemployment trends impacting loan demand

2. **Market Research**:
   - Compare Thailand's economy with neighboring countries
   - Analyze trade balance affecting currency values
   - Study FDI trends for property collateral valuation

3. **Customer Demographics**:
   - Understand population trends in service areas
   - Analyze internet penetration for digital services
   - Study education levels for product development

4. **Regional Comparison**:
   - Compare ASEAN countries' economic indicators
   - Benchmark Thailand against global economies
   - Identify growth markets for expansion

5. **Risk Assessment**:
   - Evaluate economic stability of countries
   - Monitor poverty rates in service areas
   - Track CO2 emissions for sustainability reporting

**Configuration**: No API key required - Public API

**Rate Limits**: No official limits, but recommended to cache responses

**Documentation**: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392

---

## Notes

- All external API calls are cached for performance (coming soon)
- Rate limiting is implemented to respect API quotas (coming soon)
- Retry logic with exponential backoff (coming soon)
