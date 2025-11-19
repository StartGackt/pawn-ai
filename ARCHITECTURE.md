# ระบบวิเคราะห์ข้อมูลอัจฉริยะ + ระบบคาดการณ์ + AI Chatbot
## สำหรับสำนักงานธนานุเคราะห์ (สธค.)

---

## 📋 ภาพรวมระบบ (System Overview)

ระบบนี้พัฒนาเพื่อวิเคราะห์และคาดการณ์ข้อมูลโรงรับจำนำทั่วประเทศ ประกอบด้วย:
- **Predictive Analytics** - คาดการณ์ราคาทองคำและทรัพย์หลุดจำนำ
- **AI Chatbot (Hybrid)** - ระบบถาม-ตอบอัจฉริยะด้วย Local LLM + Commercial AI
- **Data Analytics Dashboard** - แสดงผลข้อมูลและกราฟวิเคราะห์
- **REST API Integration** - เชื่อมต่อกับฐานข้อมูลหลักของ สธค.

---

## 🏗️ สถาปัตยกรรมระบบ (System Architecture)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Web Browser                              │
│                  (User Interface - Next.js)                      │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Application                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Dashboard   │  │  Analytics   │  │  Chatbot Interface   │  │
│  │   Pages      │  │  Components  │  │    (Chat UI)         │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │ API Routes
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Backend API Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Data API   │  │   ML API     │  │   Chatbot API        │  │
│  │  /api/data   │  │ /api/predict │  │   /api/chat          │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼──────────────────┼──────────────────────┼──────────────┘
          │                  │                      │
          ▼                  ▼                      ▼
┌─────────────────┐ ┌────────────────┐ ┌──────────────────────────┐
│  สธค. Database  │ │  ML Models     │ │   LLM System (Hybrid)    │
│   (REST API)    │ │  - TensorFlow  │ │  ┌────────────────────┐  │
│                 │ │  - Scikit-learn│ │  │   Local LLM        │  │
│ • การจำนำ       │ │  - Time Series │ │  │  (Ollama/LLaMA)    │  │
│ • ราคาทอง       │ │                │ │  └─────────┬──────────┘  │
│ • ทรัพย์หลุด    │ │  Predictions:  │ │            │ Fallback    │
│ • ข้อมูลลูกค้า  │ │  • ราคาทอง     │ │            ▼             │
│                 │ │  • ทรัพย์หลุด  │ │  ┌────────────────────┐  │
└─────────────────┘ │  • พฤติกรรม    │ │  │  Commercial AI     │  │
                    └────────────────┘ │  │ (OpenAI/Claude)    │  │
                                       │  └────────────────────┘  │
┌──────────────────────────────────┐  └──────────────────────────┘
│   Vector Database (Optional)     │               ▲
│   - ChromaDB / Pinecone          │               │
│   For RAG (Document Search)      │───────────────┘
└──────────────────────────────────┘   Context Retrieval
```

---

## 🎯 Core Features & Modules

### 1. **Data Analytics Module**
ข้อมูลที่วิเคราะห์:
- ประวัติการรับจำนำ (Pawn History)
- ราคาทองคำ (Gold Prices - Historical & Real-time)
- ทรัพย์หลุดจำนำ (Forfeited Assets)
- พฤติกรรมการไถ่ถอน (Redemption Behavior)
- ปัจจัยเศรษฐกิจ (Economic Indicators)

**Visualizations:**
- Time-series charts (ราคาทอง, ปริมาณการจำนำ)
- Heat maps (พื้นที่ที่มีการจำนำสูง)
- Statistical dashboards
- Comparative analysis

### 2. **Predictive ML Models**
**Model Types:**
- **Time Series Forecasting** (LSTM, Prophet)
  - คาดการณ์ราคาทองคำ 7-30 วันข้างหน้า
  - คาดการณ์ปริมาณทรัพย์หลุดจำนำ
  
- **Classification Models** (Random Forest, XGBoost)
  - ประเมินความเสี่ยงการไม่ไถ่ถอน
  - จำแนกประเภทลูกค้า
  
- **Regression Models**
  - คาดการณ์มูลค่าทรัพย์หลุดจำนำ
  - ประมาณการรายได้จากการขายทรัพย์

**Features (Input Variables):**
- ราคาทองคำย้อนหลัง
- ปริมาณการจำนำรายเดือน
- อัตราดอกเบี้ย
- ดัชนีเศรษฐกิจ (GDP, Inflation)
- ฤดูกาล (Seasonality)

### 3. **Hybrid LLM Chatbot System**

**Architecture:**
```
User Query
    │
    ▼
┌─────────────────────┐
│  Query Classifier   │  ← จำแนกประเภทคำถาม
└──────────┬──────────┘
           │
           ├─── Simple Query ───→ Local LLM (Ollama)
           │                      - Fast response
           │                      - Privacy-focused
           │                      - No API cost
           │
           ├─── Complex Query ──→ RAG Pipeline
           │                      1. Vector search
           │                      2. Context retrieval
           │                      3. LLM generation
           │
           └─── Fallback ───────→ Commercial AI
                                  - OpenAI GPT-4
                                  - Claude 3
```

**Capabilities:**
- ✅ ตอบคำถามเกี่ยวกับข้อมูลการจำนำ
- ✅ สรุปรายงานและสถิติ
- ✅ แนะนำนโยบายและขั้นตอนการดำเนินงาน
- ✅ วิเคราะห์ข้อมูลเชิงลึก
- ✅ ให้คำปรึกษาเกี่ยวกับราคาทองและตลาด

**Knowledge Base:**
- เอกสารนโยบาย สธค.
- คู่มือการปฏิบัติงาน
- ข้อมูลสถิติย้อนหลัง
- FAQ และคำถามที่พบบ่อย

---

## 💾 Database Schema

### Core Tables (Expected from สธค. API)

```sql
-- ตารางการจำนำ
pawns (
    id: UUID PRIMARY KEY,
    customer_id: UUID,
    pawn_date: TIMESTAMP,
    pawn_amount: DECIMAL(12,2),
    gold_weight: DECIMAL(8,3),
    gold_purity: VARCHAR(10),
    interest_rate: DECIMAL(5,2),
    due_date: TIMESTAMP,
    status: ENUM('active', 'redeemed', 'forfeited'),
    branch_id: UUID,
    created_at: TIMESTAMP
)

-- ตารางราคาทองคำ
gold_prices (
    id: UUID PRIMARY KEY,
    date: TIMESTAMP,
    buy_price: DECIMAL(10,2),
    sell_price: DECIMAL(10,2),
    source: VARCHAR(50),
    updated_at: TIMESTAMP
)

-- ตารางทรัพย์หลุดจำนำ
forfeited_assets (
    id: UUID PRIMARY KEY,
    pawn_id: UUID REFERENCES pawns(id),
    forfeiture_date: TIMESTAMP,
    estimated_value: DECIMAL(12,2),
    sale_date: TIMESTAMP NULL,
    sale_amount: DECIMAL(12,2) NULL,
    status: ENUM('pending', 'sold', 'processing'),
    created_at: TIMESTAMP
)

-- ตารางลูกค้า
customers (
    id: UUID PRIMARY KEY,
    name: VARCHAR(255),
    id_card: VARCHAR(13),
    phone: VARCHAR(20),
    address: TEXT,
    risk_score: DECIMAL(3,2),
    total_pawns: INT,
    created_at: TIMESTAMP
)

-- ตารางสาขา
branches (
    id: UUID PRIMARY KEY,
    name: VARCHAR(255),
    province: VARCHAR(100),
    region: VARCHAR(50),
    address: TEXT,
    phone: VARCHAR(20)
)
```

### Application Tables

```sql
-- ตารางการคาดการณ์
predictions (
    id: UUID PRIMARY KEY,
    prediction_type: ENUM('gold_price', 'forfeited_assets', 'redemption'),
    prediction_date: TIMESTAMP,
    target_date: TIMESTAMP,
    predicted_value: DECIMAL(12,2),
    confidence: DECIMAL(3,2),
    model_version: VARCHAR(50),
    created_at: TIMESTAMP
)

-- ตารางบทสนทนา Chatbot
chat_sessions (
    id: UUID PRIMARY KEY,
    user_id: UUID,
    started_at: TIMESTAMP,
    ended_at: TIMESTAMP,
    message_count: INT
)

chat_messages (
    id: UUID PRIMARY KEY,
    session_id: UUID REFERENCES chat_sessions(id),
    role: ENUM('user', 'assistant'),
    content: TEXT,
    llm_model: VARCHAR(50),
    timestamp: TIMESTAMP
)
```

---

## 🔌 API Endpoints Design

### Data APIs

```typescript
// ดึงข้อมูลการจำนำ
GET /api/data/pawns?startDate=2024-01-01&endDate=2024-12-31&branch=xxx
Response: { data: Pawn[], total: number, page: number }

// ดึงราคาทองคำ
GET /api/data/gold-prices?period=30d
Response: { data: GoldPrice[], latest: GoldPrice }

// ดึงทรัพย์หลุดจำนำ
GET /api/data/forfeited-assets?status=pending&limit=50
Response: { data: ForfeitedAsset[], statistics: Stats }

// สถิติภาพรวม
GET /api/data/statistics?branch=all&period=monthly
Response: { 
    totalPawns: number,
    totalAmount: number,
    avgAmount: number,
    forfeitureRate: number,
    redemptionRate: number
}
```

### ML Prediction APIs

```typescript
// คาดการณ์ราคาทอง
POST /api/predict/gold-price
Body: { days: 7 | 30, includeFactors: boolean }
Response: {
    predictions: [{ date: string, price: number, confidence: number }],
    model: string,
    accuracy: number
}

// คาดการณ์ทรัพย์หลุดจำนำ
POST /api/predict/forfeited-assets
Body: { period: 'month' | 'quarter', branch?: string }
Response: {
    predictions: [{ period: string, count: number, totalValue: number }],
    factors: string[]
}

// ประเมินความเสี่ยง
POST /api/predict/risk-assessment
Body: { pawnId: string }
Response: {
    riskScore: number,
    riskLevel: 'low' | 'medium' | 'high',
    factors: string[],
    recommendation: string
}
```

### Chatbot APIs

```typescript
// เริ่ม session ใหม่
POST /api/chat/session
Response: { sessionId: string, timestamp: string }

// ส่งข้อความ
POST /api/chat/message
Body: { 
    sessionId: string, 
    message: string,
    context?: object
}
Response: {
    response: string,
    model: 'local' | 'openai' | 'claude',
    sources?: string[],
    confidence: number
}

// ดึงประวัติการสนทนา
GET /api/chat/history?sessionId=xxx
Response: { messages: ChatMessage[] }
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 18
- **Styling:** TailwindCSS + shadcn/ui
- **Charts:** Recharts / Chart.js / Apache ECharts
- **State Management:** Zustand / React Query
- **Forms:** React Hook Form + Zod

### Backend (Next.js API Routes)
- **Runtime:** Node.js 20+
- **API Framework:** Next.js Route Handlers
- **Validation:** Zod
- **Authentication:** NextAuth.js (optional)
- **Rate Limiting:** upstash/ratelimit

### ML & AI
- **ML Framework:** 
  - TensorFlow.js (browser-based)
  - Python backend with FastAPI (recommended for heavy ML)
- **LLM:**
  - Local: Ollama (LLaMA 3, Mistral)
  - Commercial: OpenAI GPT-4, Anthropic Claude
- **Vector DB:** ChromaDB / Pinecone (for RAG)
- **ML Libraries:** 
  - scikit-learn
  - Prophet (time series)
  - XGBoost

### Database & Storage
- **Primary:** PostgreSQL / MySQL (via สธค. API)
- **Cache:** Redis
- **Vector Store:** ChromaDB / Pinecone
- **File Storage:** S3 / Azure Blob (สำหรับเอกสาร)

### DevOps & Deployment
- **Hosting:** Vercel / AWS / Azure
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry, Vercel Analytics

---

## 📊 Key UI Components

### 1. Dashboard Page
- **Overview Cards:** สถิติรวม (การจำนำวันนี้, ราคาทองล่าสุด, ทรัพย์หลุด)
- **Charts:**
  - Line chart: แนวโน้มราคาทองคำ 30 วัน
  - Bar chart: ปริมาณการจำนำแยกตามสาขา
  - Pie chart: สัดส่วนทรัพย์หลุด vs ไถ่ถอน
- **Recent Activities:** รายการจำนำล่าสุด

### 2. Analytics Page
- **Filters:** วันที่, สาขา, ภูมิภาค
- **Advanced Charts:**
  - Heat map: พื้นที่ที่มีการจำนำสูง
  - Correlation matrix: ความสัมพันธ์ระหว่างตัวแปร
  - Funnel chart: พฤติกรรมการไถ่ถอน

### 3. Predictions Page
- **Gold Price Forecast:** กราฟคาดการณ์ราคาทอง พร้อม confidence interval
- **Asset Forecast:** คาดการณ์ทรัพย์หลุดจำนำ
- **Model Info:** แสดงความแม่นยำและปัจจัยที่ใช้

### 4. Chatbot Interface
- **Chat Window:** แบบ real-time streaming
- **Quick Actions:** ปุ่มคำถามที่ถามบ่อย
- **Data Context:** แสดงข้อมูลที่เกี่ยวข้องพร้อมคำตอบ
- **Export:** ส่งออกบทสนทนาเป็น PDF

### 5. Reports Page
- **Generate Reports:** สร้างรายงานตามช่วงเวลา
- **Templates:** รายงานประจำเดือน, ไตรมาส, ปี
- **Export:** PDF, Excel, CSV

---

## 🔐 Security Considerations

1. **Authentication & Authorization**
   - JWT tokens / Session-based auth
   - Role-based access control (Admin, Analyst, Viewer)
   - API key management for external services

2. **Data Privacy**
   - เข้ารหัสข้อมูลส่วนบุคคล (PII)
   - Anonymize data for ML training
   - PDPA compliance (Thailand)

3. **API Security**
   - Rate limiting
   - CORS configuration
   - Input validation & sanitization
   - HTTPS only

4. **LLM Safety**
   - Prompt injection prevention
   - Content filtering
   - Audit logging for chatbot conversations

---

## 🚀 Deployment Strategy

### Development Environment
```bash
# Local development
npm run dev

# ML models (Python)
cd ml-models
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python train_models.py
```

### Production Deployment

**Option 1: Vercel (Recommended for Next.js)**
- Frontend + API Routes: Vercel
- ML Models: Separate FastAPI service on AWS/Azure
- Database: Managed PostgreSQL (Vercel Postgres / Supabase)

**Option 2: Self-hosted (Docker)**
```yaml
# docker-compose.yml
services:
  nextjs:
    build: .
    ports: ["3000:3000"]
  
  ml-api:
    build: ./ml-service
    ports: ["8000:8000"]
  
  postgres:
    image: postgres:16
    
  redis:
    image: redis:7
    
  ollama:
    image: ollama/ollama
    volumes: ["ollama:/root/.ollama"]
```

---

## 📈 Performance Optimization

1. **Frontend**
   - Server Components (Next.js)
   - Image optimization (next/image)
   - Code splitting & lazy loading
   - CDN caching

2. **API**
   - Redis caching for frequent queries
   - Database query optimization (indexes)
   - Pagination for large datasets

3. **ML Models**
   - Model quantization for faster inference
   - Batch predictions
   - Caching predictions (daily gold price)

4. **LLM**
   - Stream responses (SSE)
   - Context window optimization
   - Semantic caching for similar queries

---

## 📝 Development Roadmap

### Phase 1: Foundation (Week 1-2)
- ✅ Project setup & configuration
- ✅ Database schema design
- ✅ Basic API structure
- ✅ UI component library

### Phase 2: Core Features (Week 3-4)
- 📊 Dashboard implementation
- 📈 Data visualization
- 🔌 สธค. API integration
- 📊 Analytics module

### Phase 3: ML Models (Week 5-6)
- 🤖 Data preprocessing pipeline
- 📉 Time series models (gold price)
- 🎯 Classification models (risk)
- 🔮 Model training & evaluation

### Phase 4: Chatbot (Week 7-8)
- 💬 Ollama integration (local LLM)
- 🧠 RAG pipeline implementation
- 🔄 Hybrid LLM switching logic
- 💾 Vector database setup

### Phase 5: Integration & Testing (Week 9-10)
- 🧪 Unit & integration tests
- 🔒 Security hardening
- ⚡ Performance optimization
- 📱 Responsive design

### Phase 6: Deployment (Week 11-12)
- 🚀 Production deployment
- 📖 Documentation
- 👥 User training
- 🔧 Monitoring & maintenance

---

## 💡 Future Enhancements

- 📱 Mobile app (React Native)
- 🔔 Real-time notifications (WebSocket)
- 📊 Advanced BI tools integration
- 🌐 Multi-language support
- 🤖 Automated report generation
- 📧 Email alerts for predictions
- 🔗 Integration with more economic data sources

---

## 📞 Support & Maintenance

- **Documentation:** Full API docs with Swagger/OpenAPI
- **Monitoring:** Real-time alerts for system health
- **Updates:** Regular model retraining with new data
- **Backup:** Daily database backups
- **Support:** Help desk integration

---

**Version:** 1.0.0  
**Last Updated:** November 19, 2025  
**Author:** AI Development Team  
**Project:** สธค. Smart Analytics Platform
