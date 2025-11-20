# Bank of Thailand API Specifications Summary

## 📋 Overview

This document summarizes the official API specifications from Bank of Thailand based on the OpenAPI specs.

## 🔐 Authentication

All BOT APIs use the same authentication method:

- **Header**: `Authorization`
- **Type**: API Key
- **Value**: Your BOT API key (stored in `BOT_API_KEY` environment variable)

**Note**: Despite the spec naming it "X-IBM-Client-Id", the actual header name is `Authorization`.

---

## 1️⃣ Exchange Rate API

### Endpoint

```
GET https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/
```

### Description

Daily Average Exchange Rate - THB / Foreign Currency

Data collected include exchange rates quoted for immediate delivery (i.e., in the spot market) between Thai Baht vis-à-vis 19 other currencies.

### Parameters

| Parameter      | Type   | Required | Description                    | Example       |
| -------------- | ------ | -------- | ------------------------------ | ------------- |
| `start_period` | string | **Yes**  | Start Period Date (YYYY-MM-DD) | 2024-11-15    |
| `end_period`   | string | **Yes**  | End Period Date (YYYY-MM-DD)   | 2024-11-20    |
| `currency`     | string | No       | Foreign Currency code          | USD, EUR, JPY |

### Frequency

- **Update**: Daily
- **Release Time**: Every business day at 6:00 PM (Bangkok time, GMT+7)

### Data Sources

1. Commercial Banks registered in Thailand
2. Foreign Bank Branches
3. Special-purpose Financial Institutions

### Supported Currencies

19 foreign currencies including:

- USD (US Dollar)
- EUR (Euro)
- JPY (Japanese Yen)
- GBP (British Pound)
- CNY (Chinese Yuan)
- And more...

---

## 2️⃣ Loan Rate API

### Individual Bank Rates

```
GET https://gateway.api.bot.or.th/LoanRate/v2/loan_rate/
```

### Average Rates Across All Banks

```
GET https://gateway.api.bot.or.th/LoanRate/v2/avg_loan_rate/
```

### Description

Loan Interest Rates of Commercial Banks (Percent per annum)

Refers to the announced loan interest rate of commercial banks, classified by loan type such as:

- **MOR** (Minimum Overdraft Rate)
- **MLR** (Minimum Loan Rate)
- **MRR** (Minimum Retail Rate)
- **Ceiling Rate**
- **Default Rate**
- **Credit Card Rates** (Min/Max)

### Parameters

| Parameter      | Type   | Required | Description                    | Example    |
| -------------- | ------ | -------- | ------------------------------ | ---------- |
| `start_period` | string | **Yes**  | Start Period Date (YYYY-MM-DD) | 2024-11-15 |
| `end_period`   | string | **Yes**  | End Period Date (YYYY-MM-DD)   | 2024-11-20 |

### Frequency

- **Update**: Daily
- **Release Time**: Every business day at 2:00 PM (Bangkok time)

### Data Sources

- Commercial Banks registered in Thailand
- Foreign Bank Branches

### Response Structure

```json
{
  "result": {
    "api": "Loan Interest Rates",
    "timestamp": "2024-11-20T14:00:00Z",
    "data": {
      "data_detail": [
        {
          "period": "2024-11-20",
          "name_th": "ธนาคารกรุงเทพ",
          "name_eng": "Bangkok Bank",
          "mor": "7.50",
          "mlr": "6.75",
          "mrr": "8.00",
          "ceiling_rate": "23.00",
          "default_rate": "24.75",
          "creditcard_min": "18.00",
          "creditcard_max": "18.00"
        }
      ]
    }
  }
}
```

### Rate Definitions

- **MOR (Minimum Overdraft Rate)**: อัตราดอกเบี้ยเงินเบิกเกินบัญชีขั้นต่ำ
- **MLR (Minimum Loan Rate)**: อัตราดอกเบี้ยเงินกู้ขั้นต่ำ
- **MRR (Minimum Retail Rate)**: อัตราดอกเบี้ยเงินกู้รายย่อยขั้นต่ำ

---

## 3️⃣ Financial Institutions Holidays API

### Endpoint

```
GET https://gateway.api.bot.or.th/financial-institutions-holidays/
```

### Description

Get official holidays for financial institutions in Thailand.

**Important**: Used for business day calculations in financial transactions.

### Parameters

| Parameter | Type   | Required | Description         | Example |
| --------- | ------ | -------- | ------------------- | ------- |
| `year`    | string | **Yes**  | Year in format YYYY | 2024    |

### Response Structure

```json
[
  {
    "HolidayWeekDay": "Monday",
    "HolidayWeekDayThai": "วันจันทร์",
    "Date": "2024-01-01",
    "DateThai": "01/01/2567",
    "HolidayDescription": "New Year's Day",
    "HolidayDescriptionThai": "วันขึ้นปีใหม่"
  }
]
```

### Use Cases

- Check if a specific date is a banking holiday
- Calculate business days for loan maturity
- Schedule payment dates avoiding holidays
- Display upcoming bank holidays to customers

---

## 4️⃣ Category List API (Future)

### Endpoint

```
GET https://gateway.api.bot.or.th/categorylist/category_list/
GET https://gateway.api.bot.or.th/categorylist/series_list/?category={category}
```

### Description

Browse available data categories and series in the BOT system.

### Use Cases

- Discover available economic indicators
- Get time series data for analysis
- Access historical statistics

---

## 📊 Data Update Schedule

| API           | Frequency | Release Time | Lag  |
| ------------- | --------- | ------------ | ---- |
| Exchange Rate | Daily     | 6:00 PM      | None |
| Loan Rate     | Daily     | 2:00 PM      | None |
| Holidays      | Annual    | -            | -    |

---

## 🔧 Implementation Notes

### Our Service Implementation

1. **Exchange Rate API** (`BotApiService`)
   - ✅ Implemented with correct parameters
   - ✅ Uses `Authorization` header
   - ✅ Defaults to today's date if not specified

2. **Loan Rate API** (`LoanRateApiService`)
   - ✅ Individual bank rates endpoint
   - ✅ Average rates endpoint
   - ✅ Latest rates with numeric parsing
   - ✅ Date parameters with defaults

3. **Holiday API** (`HolidayApiService`)
   - ✅ Now sends required `year` parameter
   - ✅ Defaults to current year
   - ✅ Fetches current + next year for upcoming holidays
   - ✅ Month filtering implemented

### Key Fixes Applied

1. ✅ **Holiday API**: Added required `year` parameter to all methods
2. ✅ **Authentication**: All services use `BOT_API_KEY` environment variable
3. ✅ **Parameter Validation**: Ensure required parameters are always sent

---

## 🔗 Official Documentation

- [BOT Statistics Portal](https://www.bot.or.th/th/statistics/)
- [BOT API Gateway](https://portal.api.bot.or.th)
- [Exchange Rate Info](https://www.bot.or.th/th/statistics/interest-rate.html)
- [Loan Rate Info](https://www.bot.or.th/th/statistics/interest-rate.html)

---

## 📝 Testing

### Test URLs

```bash
# Exchange Rate
curl -H "Authorization: YOUR_API_KEY" \
  "https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=2024-11-15&end_period=2024-11-20"

# Loan Rate (Individual)
curl -H "Authorization: YOUR_API_KEY" \
  "https://gateway.api.bot.or.th/LoanRate/v2/loan_rate/?start_period=2024-11-15&end_period=2024-11-20"

# Holidays
curl -H "Authorization: YOUR_API_KEY" \
  "https://gateway.api.bot.or.th/financial-institutions-holidays/?year=2024"
```

### Via Swagger UI

Access: http://localhost:3002/api/docs

Test all endpoints under the "external-api" section.

---

## ⚠️ Important Notes

1. **Required Parameters**: Always send required parameters as specified in the spec
2. **Date Format**: Use YYYY-MM-DD format for all date parameters
3. **Authentication**: Use the same `BOT_API_KEY` for all three APIs
4. **Business Days**: Use Holiday API to determine valid business days
5. **Rate Limits**: Check BOT portal for API rate limits and quotas

---

Last Updated: November 20, 2025
