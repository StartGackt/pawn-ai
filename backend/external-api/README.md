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

### 6. Gold Thai API (Coming Soon)

**Service**: `GoldThaiApiService`
**Purpose**: Get gold prices from Thai gold market

### 7. Gold Global API (Coming Soon)

**Service**: `GoldGlobalApiService`
**Purpose**: Get international gold prices

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

## Notes

- All external API calls are cached for performance (coming soon)
- Rate limiting is implemented to respect API quotas (coming soon)
- Retry logic with exponential backoff (coming soon)
