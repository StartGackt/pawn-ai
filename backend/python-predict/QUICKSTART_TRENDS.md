# 🚀 Quick Start: Google Trends API

## ⚡️ เริ่มต้นใช้งาน 5 นาที

### 1. เปิดเซิร์ฟเวอร์

```bash
cd /Users/ainiwas/pawn-ai/backend/python-predict
source venv/bin/activate  # or: source ~/.venv/bin/activate
uvicorn main:app --reload --port 8001
```

### 2. ตรวจสอบสถานะ

```bash
curl http://localhost:8001/api/v1/trends/health
```

**Expected:**

```json
{
  "status": "healthy",
  "service": "Google Trends Service"
}
```

---

## 📊 Use Cases พร้อมตัวอย่าง

### Use Case 1: ตรวจสอบแนวโน้มช่วงตรุษจีน

**เหมาะสำหรับ:** วางแผนสต็อกทองช่วงเทศกาล

```bash
curl -X POST http://localhost:8001/api/v1/trends/seasonal \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["ซื้อทองตรุษจีน"],
    "timeframe": "today 12-m"
  }'
```

**ผลลัพธ์ที่ได้:**

- 📈 Peak date: วันที่มีความสนใจสูงสุด
- 📊 Monthly averages: ค่าเฉลี่ยแต่ละเดือน
- 🎯 Festival peaks: ระดับความสนใจในช่วงเทศกาล
- ✅ Is significant: มีนัยสำคัญหรือไม่ (>20% increase)

**ตัวอย่างผลลัพธ์:**

```json
{
  "keyword": "ซื้อทองตรุษจีน",
  "festival_peaks": [
    {
      "festival": "Chinese New Year",
      "month": 2,
      "average_interest": 89.5,
      "is_significant": true // ความสนใจเพิ่มขึ้นมาก!
    }
  ],
  "peaks": [
    {
      "date": "2024-02-10", // วันตรุษจีน
      "interest": 100
    }
  ]
}
```

**💡 Business Insight:**

- เตรียมสต็อกทองก่อนตรุษจีน 2-3 สัปดาห์
- เพิ่มพนักงานในช่วง peak
- จัดโปรโมชั่นช่วงก่อนเทศกาล

---

### Use Case 2: เปรียบเทียบ ซื้อทอง vs จำนำทอง

**เหมาะสำหรับ:** วิเคราะห์พฤติกรรมลูกค้า

```bash
curl -X POST http://localhost:8001/api/v1/trends/compare \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["ซื้อทอง", "จำนำทอง"],
    "timeframe": "today 12-m"
  }'
```

**ตัวอย่างผลลัพธ์:**

```json
{
  "comparison": [
    {
      "keyword": "ซื้อทอง",
      "average_interest": 67.5,
      "peak_interest": 100
    },
    {
      "keyword": "จำนำทอง",
      "average_interest": 45.2,
      "peak_interest": 78
    }
  ],
  "most_popular": "ซื้อทอง"
}
```

**💡 Business Insight:**

- "ซื้อทอง" สูงกว่า → คนสนใจซื้อมากกว่าจำนำ
- "จำนำทอง" เพิ่มขึ้น → อาจเป็นช่วงเศรษฐกิจไม่ดี
- ช่วงไหน "จำนำทอง" สูง → เตรียมสภาพคล่องรับจำนำเพิ่ม

---

### Use Case 3: ตรวจสอบทิศทางแนวโน้มปัจจุบัน

**เหมาะสำหรับ:** ตัดสินใจรายวัน (daily decision making)

```bash
curl -X POST http://localhost:8001/api/v1/trends/score \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "ซื้อทอง"
  }'
```

**ตัวอย่างผลลัพธ์:**

```json
{
  "keyword": "ซื้อทอง",
  "current_score": 78.3, // ค่าเฉลี่ย 7 วันล่าสุด
  "previous_score": 65.2, // ค่าเฉลี่ย 7 วันก่อนหน้า
  "momentum_percentage": 20.1, // เพิ่มขึ้น 20.1%
  "trend_direction": "increasing"
}
```

**💡 Business Insight:**

- `increasing` (>5%) → ความต้องการเพิ่มขึ้น → เพิ่มสต็อก
- `decreasing` (<-5%) → ความต้องการลดลง → ระวังสต็อกค้าง
- `stable` (-5% to 5%) → ตลาดปกติ → รักษากลยุทธ์ปัจจุบัน

---

### Use Case 4: วิเคราะห์พฤติกรรมแบบครบวงจร

**เหมาะสำหรับ:** Strategic planning, Monthly report

```bash
curl -X POST http://localhost:8001/api/v1/trends/behavioral \
  -H "Content-Type: application/json" \
  -d '{
    "timeframe": "today 12-m"
  }'
```

**ผลลัพธ์ที่ได้:**

1. **Seasonal Behavior** (5 keywords)
   - ซื้อทองตรุษจีน, ของขวัญวาเลนไทน์, ออมทอง, ทองคำแท่ง, ทองรูปพรรณ
2. **General Behavior** (5 keywords)
   - ราคาทอง, ซื้อทอง, ขายทอง, จำนำทอง, แลกทอง
3. **Investment Behavior** (4 keywords)
   - ลงทุนทอง, ทองคำลงทุน, กองทุนทอง, ซื้อทองออนไลน์

**ตัวอย่างผลลัพธ์:**

```json
{
  "seasonal_behavior": {
    "keywords_analyzed": ["ซื้อทองตรุษจีน", "ออมทอง", ...],
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
  "general_behavior": { ... },
  "investment_behavior": { ... }
}
```

**💡 Business Insight:**

- ดู `seasonal_behavior` → วางแผนเทศกาล
- ดู `general_behavior` → เข้าใจความต้องการประจำ
- ดู `investment_behavior` → เตรียมสินค้าลงทุน (ทองแท่ง)

---

## 🛠️ Testing with Python

### Basic Test Script

```python
import requests

BASE_URL = "http://localhost:8001/api/v1/trends"

# Test 1: Health Check
def test_health():
    response = requests.get(f"{BASE_URL}/health")
    print("✅ Health:", response.json())

# Test 2: Seasonal Analysis
def test_seasonal():
    response = requests.post(
        f"{BASE_URL}/seasonal",
        json={"keywords": ["ซื้อทองตรุษจีน"], "timeframe": "today 12-m"}
    )
    data = response.json()
    print("📊 Seasonal Analysis:")
    print(f"  - Average Interest: {data['statistics']['mean']:.1f}")
    print(f"  - Peak Date: {data['peaks'][0]['date']}")
    print(f"  - Festival Peaks: {len(data['festival_peaks'])}")

# Test 3: Compare Keywords
def test_compare():
    response = requests.post(
        f"{BASE_URL}/compare",
        json={
            "keywords": ["ซื้อทอง", "จำนำทอง"],
            "timeframe": "today 12-m"
        }
    )
    data = response.json()
    print("🏆 Comparison:")
    for item in data['comparison']:
        print(f"  - {item['keyword']}: {item['average_interest']:.1f}")
    print(f"  - Most Popular: {data['most_popular']}")

# Test 4: Trend Score
def test_trend_score():
    response = requests.post(
        f"{BASE_URL}/score",
        json={"keyword": "ซื้อทอง"}
    )
    data = response.json()
    print("📈 Trend Score:")
    print(f"  - Current: {data['current_score']:.1f}")
    print(f"  - Momentum: {data['momentum_percentage']:+.1f}%")
    print(f"  - Direction: {data['trend_direction']}")

# Run all tests
if __name__ == "__main__":
    test_health()
    test_seasonal()
    test_compare()
    test_trend_score()
```

**Save as `test_trends.py` and run:**

```bash
python test_trends.py
```

---

## 📋 Available Keywords

### View All Keywords

```bash
curl http://localhost:8001/api/v1/trends/keywords
```

**Result:**

```json
{
  "seasonal": [
    "ซื้อทองตรุษจีน",
    "ของขวัญวาเลนไทน์",
    "ออมทอง",
    "ทองคำแท่ง",
    "ทองรูปพรรณ"
  ],
  "general": ["ราคาทอง", "ซื้อทอง", "ขายทอง", "จำนำทอง", "แลกทอง"],
  "investment": ["ลงทุนทอง", "ทองคำลงทุน", "กองทุนทอง", "ซื้อทองออนไลน์"]
}
```

---

## 🎯 Available Festivals

### View All Festivals

```bash
curl http://localhost:8001/api/v1/trends/festivals
```

**Result:**

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
  "Songkran": {
    "month": [4],
    "keywords": []
  },
  "Mother's Day": {
    "month": [8],
    "keywords": []
  },
  "Father's Day": {
    "month": [12],
    "keywords": []
  },
  "New Year": {
    "month": [12, 1],
    "keywords": []
  }
}
```

---

## 🔧 Common Issues

### Issue 1: Import Error in IDE

**Symptom:**

```
Cannot find reference 'pytrends' in '__init__.py'
```

**Solution:**

- This is IDE-only warning
- Package exists in venv
- Check: `uv pip list | grep pytrends`
- ✅ If installed → ignore warning

### Issue 2: No Data Found (404)

**Symptom:**

```json
{
  "detail": "No data found for keyword: xyz"
}
```

**Solution:**

- Keyword may be too specific
- Try broader keyword
- Check spelling (Thai characters)

### Issue 3: Rate Limit (429)

**Symptom:**

```
Rate limit exceeded
```

**Solution:**

- Google Trends has rate limits
- Wait 1-2 minutes
- Reduce request frequency
- Consider caching responses

### Issue 4: Server Not Running

**Symptom:**

```
Connection refused
```

**Solution:**

```bash
# Check if server is running
lsof -i :8001

# Start server
uvicorn main:app --reload --port 8001
```

---

## 📚 Next Steps

### 1. Integrate with ML Models

```python
# Example: Use trends as features
from app.services.trends_service import TrendsService

trends = TrendsService()
insights = trends.get_behavioral_insights()

# Extract features
features = {
    'search_interest': insights['general_behavior']['insights'][0]['average_interest'],
    'is_festival_season': insights['seasonal_behavior']['insights'][0]['peak_interest'] > 80
}

# Use in prediction
prediction = gold_price_model.predict([features])
```

### 2. Set Up Scheduled Jobs

```python
# Example: Fetch trends daily
from apscheduler.schedulers.background import BackgroundScheduler

def fetch_daily_trends():
    trends = TrendsService()
    data = trends.get_behavioral_insights()
    # Save to database or cache

scheduler = BackgroundScheduler()
scheduler.add_job(fetch_daily_trends, 'cron', hour=0)  # Run at midnight
scheduler.start()
```

### 3. Add Caching

```python
# Example: Cache with TTL
from functools import lru_cache
import time

@lru_cache(maxsize=128)
def get_cached_trends(keyword: str, timeframe: str):
    trends = TrendsService()
    return trends.fetch_trends([keyword], timeframe)
```

### 4. Create Dashboard

- Visualize trends with Plotly/Streamlit
- Real-time monitoring
- Alert system for trend spikes

---

## 🎯 Pro Tips

1. **Best Timeframes:**
   - Recent trends: `today 3-m`
   - Seasonal patterns: `today 12-m`
   - Long-term analysis: `today 5-y`

2. **Keyword Selection:**
   - Use Thai keywords for Thai market
   - Mix specific + general keywords
   - Track brand terms separately

3. **Data Interpretation:**
   - Values 0-100 are relative (not absolute)
   - Compare across same timeframe
   - Look for patterns, not single points

4. **Performance:**
   - Cache frequently-used queries
   - Batch requests when possible
   - Use background jobs for regular updates

5. **Integration:**
   - Combine with gold price data
   - Correlate with sales data
   - Use for demand forecasting

---

## 📞 Support

**Documentation:**

- Full API Docs: [README_TRENDS.md](./app/services/README_TRENDS.md)
- Swagger UI: http://localhost:8001/docs

**Debugging:**

```bash
# Run with debug mode
uvicorn main:app --reload --log-level debug --port 8001

# Check pytrends version
uv pip show pytrends
```

**Common Commands:**

```bash
# Test health
curl http://localhost:8001/api/v1/trends/health

# Test with jq (pretty print)
curl -s http://localhost:8001/api/v1/trends/keywords | jq

# Save response to file
curl -X POST http://localhost:8001/api/v1/trends/seasonal \
  -H "Content-Type: application/json" \
  -d '{"timeframe": "today 12-m"}' \
  -o seasonal_trends.json
```

---

**Happy Trending! 📈**

For detailed API documentation, see [README_TRENDS.md](./app/services/README_TRENDS.md)
