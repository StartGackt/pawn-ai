# Google Trends Integration (Pytrends)

## Overview

This service provides **seasonal and behavioral analysis** for gold-related search trends in Thailand using Google Trends. It tracks search interest for gold buying patterns during festivals, seasonal trends, and investment behavior.

## Architecture Decision

**Why Python ML Service (not NestJS External API)?**

- Pytrends is a Python-only library (no REST API available)
- Data used for ML feature engineering and predictions
- Better integration with pandas/numpy ecosystem
- Part of analytics pipeline, not external data source

## Features

### 1. Seasonal Analysis

- Track gold buying patterns during Thai festivals
- Detect peak interest periods
- Monthly pattern aggregation

### 2. Festival Monitoring

Tracks search interest during:

- Chinese New Year (Jan-Feb) - "ซื้อทองตรุษจีน"
- Valentine's Day (Feb) - "ของขวัญวาเลนไทน์"
- Songkran (Apr)
- Mother's Day (Aug)
- Father's Day (Dec)
- New Year (Dec-Jan)

### 3. Behavioral Insights

- **Seasonal**: Festival-related gold buying ("ซื้อทองตรุษจีน", "ออมทอง")
- **General**: Day-to-day behavior ("ราคาทอง", "ซื้อทอง", "ขายทอง", "จำนำทอง")
- **Investment**: Long-term trends ("ลงทุนทอง", "กองทุนทอง")

### 4. Trend Momentum

- Calculate current trend direction (increasing/decreasing/stable)
- Compare last 7 days vs previous 7 days
- Percentage change calculation

## Keywords Tracked

### Seasonal Keywords (5)

- `ซื้อทองตรุษจีน` - Buy gold Chinese New Year
- `ของขวัญวาเลนไทน์` - Valentine's gift
- `ออมทอง` - Gold savings
- `ทองคำแท่ง` - Gold bars
- `ทองรูปพรรณ` - Gold ornaments

### General Keywords (5)

- `ราคาทอง` - Gold price
- `ซื้อทอง` - Buy gold
- `ขายทอง` - Sell gold
- `จำนำทอง` - Pawn gold
- `แลกทอง` - Exchange gold

### Investment Keywords (4)

- `ลงทุนทอง` - Gold investment
- `ทองคำลงทุน` - Investment gold
- `กองทุนทอง` - Gold fund
- `ซื้อทองออนไลน์` - Buy gold online

## API Endpoints

### Base URL: `/api/v1/trends`

### 1. Health Check

```http
GET /api/v1/trends/health
```

**Response:**

```json
{
  "status": "healthy",
  "service": "Google Trends Service",
  "timestamp": "2025-01-29T10:30:00Z"
}
```

---

### 2. Fetch Trends

```http
POST /api/v1/trends/fetch
```

**Request Body:**

```json
{
  "keywords": ["ซื้อทอง", "ขายทอง"],
  "timeframe": "today 12-m",
  "geo": "TH"
}
```

**Response:**

```json
{
  "keyword": "ซื้อทอง",
  "timeframe": "today 12-m",
  "geo": "TH",
  "data": [
    { "date": "2024-01-29", "interest": 45 },
    { "date": "2024-02-05", "interest": 67 }
  ],
  "statistics": {
    "mean": 52.3,
    "std": 15.7,
    "max": 100,
    "min": 23
  }
}
```

**Notes:**

- Maximum 5 keywords per request
- Timeframe options: `today 3-m`, `today 12-m`, `today 5-y`, `all`, or custom `YYYY-MM-DD YYYY-MM-DD`

---

### 3. Seasonal Analysis

```http
POST /api/v1/trends/seasonal
```

**Request Body:**

```json
{
  "keywords": ["ซื้อทองตรุษจีน"],
  "timeframe": "today 12-m"
}
```

**Response:**

```json
{
  "keyword": "ซื้อทองตรุษจีน",
  "statistics": {
    "mean": 35.2,
    "std": 18.4,
    "max": 100,
    "min": 12
  },
  "peaks": [
    {
      "date": "2024-02-10",
      "interest": 100,
      "is_peak": true
    }
  ],
  "seasonal_pattern": {
    "monthly_avg": {
      "January": 58.3,
      "February": 89.1,
      "March": 22.5
    }
  },
  "festival_peaks": [
    {
      "festival": "Chinese New Year",
      "month": 2,
      "average_interest": 89.1,
      "is_significant": true
    }
  ]
}
```

**Notes:**

- Detects peaks (interest > mean + std)
- Calculates monthly averages
- Identifies significant festival peaks (>20% increase)

---

### 4. Compare Keywords

```http
POST /api/v1/trends/compare
```

**Request Body:**

```json
{
  "keywords": ["ซื้อทอง", "ขายทอง", "จำนำทอง"],
  "timeframe": "today 12-m"
}
```

**Response:**

```json
{
  "timeframe": "today 12-m",
  "keywords": ["ซื้อทอง", "ขายทอง", "จำนำทอง"],
  "comparison": [
    { "keyword": "ซื้อทอง", "average_interest": 67.5, "peak_interest": 100 },
    { "keyword": "จำนำทอง", "average_interest": 45.2, "peak_interest": 78 },
    { "keyword": "ขายทอง", "average_interest": 38.1, "peak_interest": 65 }
  ],
  "most_popular": "ซื้อทอง",
  "trends": {
    "ซื้อทอง": [45, 67, 89],
    "ขายทอง": [34, 45, 56],
    "จำนำทอง": [38, 42, 51]
  },
  "dates": ["2024-01-29", "2024-02-05", "2024-02-12"]
}
```

**Notes:**

- 2-5 keywords allowed
- Ranks by average interest
- Returns time series for comparison charts

---

### 5. Current Trend Score

```http
POST /api/v1/trends/score
```

**Request Body:**

```json
{
  "keyword": "ซื้อทอง"
}
```

**Response:**

```json
{
  "keyword": "ซื้อทอง",
  "current_score": 78.3,
  "previous_score": 65.2,
  "momentum_percentage": 20.1,
  "trend_direction": "increasing"
}
```

**Notes:**

- Current score: average of last 7 days
- Previous score: average of 7 days before that
- Momentum: percentage change
- Direction: increasing (>5%), decreasing (<-5%), stable

---

### 6. Behavioral Insights

```http
POST /api/v1/trends/behavioral
```

**Request Body:**

```json
{
  "timeframe": "today 12-m"
}
```

**Response:**

```json
{
  "seasonal_behavior": {
    "timeframe": "today 12-m",
    "keywords_analyzed": ["ซื้อทองตรุษจีน", "ของขวัญวาเลนไทน์", ...],
    "insights": [
      {
        "keyword": "ซื้อทองตรุษจีน",
        "average_interest": 45.2,
        "peak_interest": 100,
        "peak_date": "2024-02-10",
        "trend": "Strong seasonal spike during Chinese New Year"
      }
    ]
  },
  "general_behavior": {
    "timeframe": "today 12-m",
    "keywords_analyzed": ["ราคาทอง", "ซื้อทอง", ...],
    "insights": [...]
  },
  "investment_behavior": {
    "timeframe": "today 12-m",
    "keywords_analyzed": ["ลงทุนทอง", "กองทุนทอง", ...],
    "insights": [...]
  }
}
```

**Notes:**

- Analyzes all 14 keywords across 3 categories
- Provides comprehensive behavioral summary
- Useful for strategic planning

---

### 7. List Keywords

```http
GET /api/v1/trends/keywords
```

**Response:**

```json
{
  "seasonal": ["ซื้อทองตรุษจีน", "ของขวัญวาเลนไทน์", ...],
  "general": ["ราคาทอง", "ซื้อทอง", ...],
  "investment": ["ลงทุนทอง", "กองทุนทอง", ...]
}
```

---

### 8. List Festivals

```http
GET /api/v1/trends/festivals
```

**Response:**

```json
{
  "Chinese New Year": {
    "month": [1, 2],
    "keywords": ["ซื้อทองตรุษจีน"]
  },
  "Valentine's Day": {
    "month": [2],
    "keywords": ["ของขวัญวาเลนไทน์"]
  },
  ...
}
```

---

## Usage Examples

### Example 1: Monitor Chinese New Year Trends

```bash
curl -X POST http://localhost:8001/api/v1/trends/seasonal \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["ซื้อทองตรุษจีน"],
    "timeframe": "today 12-m"
  }'
```

### Example 2: Compare Gold Buying vs Pawning

```bash
curl -X POST http://localhost:8001/api/v1/trends/compare \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["ซื้อทอง", "จำนำทอง"],
    "timeframe": "today 12-m"
  }'
```

### Example 3: Get Current Gold Investment Trend

```bash
curl -X POST http://localhost:8001/api/v1/trends/score \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "ลงทุนทอง"
  }'
```

### Example 4: Full Behavioral Analysis

```bash
curl -X POST http://localhost:8001/api/v1/trends/behavioral \
  -H "Content-Type: application/json" \
  -d '{
    "timeframe": "today 12-m"
  }'
```

---

## Integration with ML Models

### Use Case 1: Gold Price Prediction Features

```python
from app.services.trends_service import TrendsService

trends = TrendsService()

# Get current momentum for all categories
insights = trends.get_behavioral_insights()

# Extract features for ML model
features = {
    'seasonal_interest': insights['seasonal_behavior']['insights'][0]['average_interest'],
    'general_interest': insights['general_behavior']['insights'][0]['average_interest'],
    'investment_interest': insights['investment_behavior']['insights'][0]['average_interest']
}

# Use in prediction model
prediction = model.predict([features])
```

### Use Case 2: Demand Forecasting

```python
# Detect if festival is approaching
seasonal_data = trends.fetch_seasonal_trends()

for analysis in seasonal_data:
    for festival in analysis['festival_peaks']:
        if festival['is_significant']:
            print(f"High demand expected for {festival['festival']}")
```

### Use Case 3: Customer Behavior Segmentation

```python
# Compare investment vs general buying behavior
comparison = trends.compare_keywords(['ลงทุนทอง', 'ซื้อทอง'])

if comparison['comparison'][0]['keyword'] == 'ลงทุนทอง':
    print("Investment segment is growing")
```

---

## Configuration

### TrendsService Settings

```python
from app.services.trends_service import TrendsService

# Default: Thai market
trends = TrendsService(hl='th', tz=420, geo='TH')

# Custom configuration
trends = TrendsService(
    hl='en',  # Language: English
    tz=0,     # Timezone: UTC
    geo='US'  # Geographic: United States
)
```

### Timeframe Options

| Timeframe               | Description                       |
| ----------------------- | --------------------------------- |
| `today 3-m`             | Last 3 months                     |
| `today 12-m`            | Last 12 months                    |
| `today 5-y`             | Last 5 years                      |
| `all`                   | All available data (2004-present) |
| `2024-01-01 2024-12-31` | Custom date range                 |

---

## Limitations

1. **Google Trends Rate Limits**
   - Max 5 keywords per request
   - Rate limiting on Google's side (429 errors)
   - Use delays between requests if fetching multiple datasets

2. **Data Granularity**
   - Daily data for recent periods (last 3 months)
   - Weekly data for 3 months to 5 years
   - Monthly data for > 5 years

3. **Interest Scores**
   - Values 0-100 (relative, not absolute search volume)
   - Normalized to highest point in timeframe

4. **Geographic Limitation**
   - Currently configured for Thailand (geo='TH')
   - Can be changed per request

---

## Error Handling

### Common Errors

**404: No Data Found**

```json
{
  "detail": "No data found for keyword: [keyword]"
}
```

**500: Internal Server Error**

```json
{
  "detail": "Error fetching trends: [error message]"
}
```

**429: Rate Limit (from Google)**

```json
{
  "detail": "Rate limit exceeded. Please try again later."
}
```

---

## Testing

### Start the Server

```bash
cd /Users/ainiwas/pawn-ai/backend/python-predict
source venv/bin/activate  # or: source ~/.venv/bin/activate
uvicorn main:app --reload --port 8001
```

### Test Health Endpoint

```bash
curl http://localhost:8001/api/v1/trends/health
```

### Test with Python

```python
import requests

# Fetch seasonal trends
response = requests.post(
    "http://localhost:8001/api/v1/trends/seasonal",
    json={"timeframe": "today 12-m"}
)

print(response.json())
```

---

## Development

### Add New Keywords

Edit `/app/services/trends_service.py`:

```python
GOLD_KEYWORDS = {
    'seasonal': [
        'ซื้อทองตรุษจีน',
        'YOUR_NEW_KEYWORD_HERE'  # Add here
    ],
    ...
}
```

### Add New Festival

```python
THAI_FESTIVALS = {
    'Your Festival': {
        'month': [10, 11],  # October-November
        'keywords': ['your_keyword']
    },
    ...
}
```

---

## Performance Considerations

1. **Caching**: Consider caching responses (trends data changes slowly)
2. **Background Jobs**: Fetch trends data periodically vs on-demand
3. **Rate Limiting**: Implement request throttling to avoid Google rate limits
4. **Batch Processing**: Use `/behavioral` endpoint for comprehensive analysis

---

## Future Enhancements

- [ ] Add caching layer (Redis)
- [ ] Background job scheduler (Celery)
- [ ] Historical data export (CSV/Excel)
- [ ] Real-time alerts for trend spikes
- [ ] Integration with gold price prediction models
- [ ] Correlation analysis (trends vs actual gold sales)
- [ ] Multi-language support (English keywords)
- [ ] Custom keyword management API

---

## References

- **Pytrends Documentation**: https://github.com/GeneralMills/pytrends
- **Google Trends**: https://trends.google.com/
- **Thai Gold Association**: https://www.goldtraders.or.th/

---

## Support

For issues or questions:

1. Check Google Trends service status
2. Verify pytrends installation: `uv pip list | grep pytrends`
3. Check API logs: `uvicorn main:app --log-level debug`
4. Test with simple keywords first

---

**Last Updated**: 2025-01-29  
**Version**: 1.0.0  
**Python**: 3.13.7  
**Pytrends**: 4.9.2
