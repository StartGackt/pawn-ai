# Alpha Vantage API Documentation

## Overview

Alpha Vantage provides comprehensive global economic and financial market data including:

- **Economic Indicators**: GDP, CPI, Inflation, Unemployment, Federal Funds Rate, Treasury Yield
- **Forex (Foreign Exchange)**: Realtime and historical currency exchange rates
- **Commodities**: Crude Oil (WTI & Brent), Natural Gas, Copper
- **Stock Market**: Global stock quotes, top gainers/losers
- **Cryptocurrencies**: Bitcoin, Ethereum, and other digital currencies
- **Market News**: News sentiment analysis

## API Key

Get your free API key at: https://www.alphavantage.co/support/#api-key

**Free Tier**: 25 API requests per day  
**Premium Plans**: Up to 1200 requests per minute

## Base URL

```
https://www.alphavantage.co/query
```

## Authentication

API key is passed as query parameter:

```
?apikey=YOUR_API_KEY
```

## Available Endpoints

### 1. Economic Indicators

#### Real GDP

```
GET /api/external-api/alpha-vantage/economic/gdp?interval=annual
```

Returns US Real Gross Domestic Product data.

**Parameters**:

- `interval` (optional): `quarterly` | `annual` (default: `annual`)

#### Consumer Price Index (CPI)

```
GET /api/external-api/alpha-vantage/economic/cpi?interval=monthly
```

**Parameters**:

- `interval` (optional): `monthly` | `semiannual` (default: `monthly`)

#### Inflation Rate

```
GET /api/external-api/alpha-vantage/economic/inflation
```

Annual inflation rates (consumer prices).

#### Unemployment Rate

```
GET /api/external-api/alpha-vantage/economic/unemployment
```

Monthly unemployment data.

#### Federal Funds Rate

```
GET /api/external-api/alpha-vantage/economic/federal-funds-rate?interval=monthly
```

US interest rate (federal funds rate).

**Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)

#### Treasury Yield

```
GET /api/external-api/alpha-vantage/economic/treasury-yield?interval=monthly&maturity=10year
```

US Treasury yield curve rates.

**Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)
- `maturity` (optional): `3month` | `2year` | `5year` | `7year` | `10year` | `30year` (default: `10year`)

### 2. Foreign Exchange (Forex)

#### Realtime Exchange Rate

```
GET /api/external-api/alpha-vantage/forex/rate?from=USD&to=THB
```

Get realtime exchange rate for any currency pair.

**Parameters** (required):

- `from`: From currency code (e.g., `USD`, `EUR`, `GBP`)
- `to`: To currency code (e.g., `THB`, `JPY`, `CNY`)

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

#### Daily Forex Time Series

```
GET /api/external-api/alpha-vantage/forex/daily?from=EUR&to=USD&outputsize=compact
```

Get daily OHLC (Open, High, Low, Close) forex data.

**Parameters**:

- `from` (required): From currency symbol
- `to` (required): To currency symbol
- `outputsize` (optional): `compact` (last 100) | `full` (20+ years)

### 3. Commodities

#### Crude Oil WTI

```
GET /api/external-api/alpha-vantage/commodities/oil-wti?interval=monthly
```

West Texas Intermediate crude oil prices.

**Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)

#### Crude Oil Brent

```
GET /api/external-api/alpha-vantage/commodities/oil-brent?interval=monthly
```

Brent crude oil prices (Europe benchmark).

**Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)

#### Natural Gas

```
GET /api/external-api/alpha-vantage/commodities/natural-gas?interval=monthly
```

Henry Hub natural gas prices.

**Parameters**:

- `interval` (optional): `daily` | `weekly` | `monthly` (default: `monthly`)

#### Copper

```
GET /api/external-api/alpha-vantage/commodities/copper?interval=monthly
```

Global copper prices.

**Parameters**:

- `interval` (optional): `monthly` | `quarterly` | `annual` (default: `monthly`)

### 4. Stock Market

#### Global Stock Quote

```
GET /api/external-api/alpha-vantage/stock/quote?symbol=SPY
```

Get latest price and volume for any stock.

**Parameters** (required):

- `symbol`: Stock symbol (e.g., `SPY` for S&P 500, `AAPL`, `DIA` for Dow Jones)

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

**Popular Stock Symbols**:

- `SPY` - S&P 500 ETF
- `DIA` - Dow Jones Industrial Average ETF
- `QQQ` - NASDAQ 100 ETF
- `IWM` - Russell 2000 ETF

#### Top Gainers & Losers

```
GET /api/external-api/alpha-vantage/stock/top-gainers-losers
```

Get top 20 gainers, losers, and most actively traded tickers in US market.

### 5. Market News & Sentiment

```
GET /api/external-api/alpha-vantage/news?topics=economy&limit=10
```

Get latest market news with AI-powered sentiment analysis.

**Parameters**:

- `tickers` (optional): Comma-separated ticker symbols (e.g., `AAPL,MSFT`)
- `topics` (optional): News topics
  - `economy` - Economic news
  - `finance` - Financial markets
  - `technology` - Tech sector
  - `blockchain` - Crypto and blockchain
- `limit` (optional): Number of news items (default: 50, max: 1000)

### 6. Cryptocurrencies

#### Crypto Exchange Rate

```
GET /api/external-api/alpha-vantage/crypto/rate?crypto=BTC&market=USD
```

Get realtime cryptocurrency exchange rate.

**Parameters**:

- `crypto` (required): Cryptocurrency symbol (e.g., `BTC`, `ETH`, `LTC`)
- `market` (optional): Market currency (default: `USD`)

#### Crypto Daily Data

```
GET /api/external-api/alpha-vantage/crypto/daily?symbol=BTC&market=USD
```

Get daily historical cryptocurrency data.

**Parameters**:

- `symbol` (required): Cryptocurrency symbol
- `market` (optional): Market currency (default: `USD`)

### 7. Daily Economic Summary

```
GET /api/external-api/alpha-vantage/summary/daily
```

Get comprehensive daily summary including:

- Economic indicators (GDP, inflation, unemployment, federal funds rate)
- Commodities (crude oil WTI and Brent)
- Forex rates (USD/EUR, USD/THB)
- Cryptocurrency (BTC/USD)
- Stock market (S&P 500)
- Latest market news

**Response Example**:

```json
{
  "timestamp": "2024-01-15T10:00:00.000Z",
  "economic_indicators": {
    "gdp": {...},
    "inflation": {...},
    "unemployment": {...},
    "federal_funds_rate": {...}
  },
  "commodities": {
    "crude_oil_wti": {...},
    "crude_oil_brent": {...}
  },
  "forex": {
    "usd_eur": {...},
    "usd_thb": {...}
  },
  "crypto": {
    "btc_usd": {...}
  },
  "stock_market": {
    "sp500": {...}
  },
  "news": {...}
}
```

## Use Cases for Pawn Shop

### 1. Daily Economic Monitoring

Monitor global economic trends that affect precious metals and commodity prices:

```typescript
const summary = await alphaVantageApiService.getDailyEconomicSummary();
```

### 2. Currency Exchange for International Gold

Track USD/THB and other currency pairs for accurate gold price conversions:

```typescript
const usdThb = await alphaVantageApiService.getForexRate('USD', 'THB');
const goldPriceThb =
  goldPriceUsd *
  parseFloat(usdThb['Realtime Currency Exchange Rate']['5. Exchange Rate']);
```

### 3. Economic Indicators Analysis

Use inflation, unemployment, and interest rates to predict gold demand:

```typescript
const [inflation, unemployment, fedRate] = await Promise.all([
  alphaVantageApiService.getInflation(),
  alphaVantageApiService.getUnemployment(),
  alphaVantageApiService.getFederalFundsRate(),
]);
```

### 4. Commodity Price Correlation

Monitor crude oil and copper prices as economic health indicators:

```typescript
const oilWti = await alphaVantageApiService.getCrudeOilWTI('daily');
const copper = await alphaVantageApiService.getCopper('monthly');
```

### 5. Market Sentiment for Gold

Get news and sentiment analysis for gold market trends:

```typescript
const goldNews = await alphaVantageApiService.getMarketNews(
  'GLD',
  undefined,
  20,
);
// GLD = Gold ETF symbol
```

### 6. Cryptocurrency Collateral

Track BTC and ETH prices for customers interested in crypto as collateral:

```typescript
const btcRate = await alphaVantageApiService.getCryptoRate('BTC', 'THB');
const ethRate = await alphaVantageApiService.getCryptoRate('ETH', 'THB');
```

## Rate Limits

### Free Tier

- 25 API requests per day
- End-of-day data updates
- Good for daily economic monitoring

### Premium Tiers

- **30 requests/minute**: $49.99/month
- **120 requests/minute**: $149.99/month
- **600 requests/minute**: $299.99/month
- **1200 requests/minute**: $499.99/month
- Realtime data updates
- Priority support

## Best Practices

### 1. Cache Responses

Economic data doesn't change frequently. Cache responses to save API quota:

```typescript
// Cache GDP data for 1 day
const gdpData = await cacheManager.get('alpha-vantage:gdp');
if (!gdpData) {
  const fresh = await alphaVantageApiService.getRealGDP();
  await cacheManager.set('alpha-vantage:gdp', fresh, 86400); // 24 hours
  return fresh;
}
return gdpData;
```

### 2. Batch Requests Smartly

Use the daily summary endpoint instead of individual calls:

```typescript
// ❌ Bad - Uses 10+ API calls
const gdp = await service.getRealGDP();
const inflation = await service.getInflation();
const usdThb = await service.getForexRate('USD', 'THB');
// ... many more calls

// ✅ Good - Uses 1 API call
const summary = await service.getDailyEconomicSummary();
```

### 3. Schedule Daily Updates

Run comprehensive data updates during off-peak hours:

```typescript
// Schedule at 6 AM daily
@Cron('0 6 * * *')
async updateEconomicData() {
  const summary = await this.alphaVantageApiService.getDailyEconomicSummary();
  await this.saveToDatabase(summary);
}
```

### 4. Handle Rate Limits

Implement exponential backoff for rate limit errors:

```typescript
async fetchWithRetry(fn: () => Promise<any>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.message.includes('rate limit') && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
        continue;
      }
      throw error;
    }
  }
}
```

## Error Handling

Alpha Vantage returns errors in this format:

```json
{
  "Error Message": "Invalid API call. Please retry or visit the documentation."
}
```

Or for rate limits:

```json
{
  "Note": "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute."
}
```

## References

- Official Documentation: https://www.alphavantage.co/documentation/
- API Support: https://www.alphavantage.co/support/
- Physical Currency List: https://www.alphavantage.co/physical_currency_list/
- Cryptocurrency List: https://www.alphavantage.co/cryptocurrency_list/
