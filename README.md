# 🏦 Pawn AI - ระบบจัดการร้านรับจำนำอัจฉริยะ

ระบบจัดการร้านรับจำนำที่ใช้ AI และ Machine Learning ในการคาดการณ์ราคาทองคำ, วิเคราะห์ความเสี่ยงของสินทรัพย์จำนำ, และให้คำแนะนำทางธุรกิจ

## 📋 สารบัญ

- [ภาพรวมระบบ](#ภาพรวมระบบ)
- [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
- [การติดตั้ง](#การติดตั้ง)
- [การใช้งาน](#การใช้งาน)
- [คุณสมบัติหลัก](#คุณสมบัติหลัก)

## 🎯 ภาพรวมระบบ

Pawn AI เป็นระบบ Monorepo ที่ประกอบด้วย 3 ส่วนหลัก:

1. **Frontend** - Next.js Dashboard สำหรับแสดงผลและจัดการข้อมูล
2. **Backend API** - NestJS REST API สำหรับจัดการ Business Logic
3. **ML Service** - Python FastAPI สำหรับ Machine Learning Models

## 📁 โครงสร้างโปรเจค

```
pawn-ai/
├── frontend/              # Next.js 15 Application
│   ├── app/              # App Router Pages
│   ├── components/       # React Components
│   ├── lib/              # Utilities
│   └── public/           # Static Assets
│
├── pawn-ai-backend/      # NestJS API Service
│   ├── src/              # Source Code
│   └── test/             # Unit Tests
│
├── ml-service/           # Python ML Service
│   ├── main.py           # FastAPI Application
│   └── models/           # ML Models
│
├── ARCHITECTURE.md       # สถาปัตยกรรมระบบ
└── README.md            # เอกสารนี้
```

## 🛠️ เทคโนโลยีที่ใช้

### Frontend

- **Framework**: Next.js 15.5.6 (React 19.1.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts 2.15.4
- **Icons**: Lucide React

### Backend API

- **Framework**: NestJS 11
- **Language**: TypeScript 5
- **Runtime**: Node.js 22+
- **Database**: (TBD - PostgreSQL/MongoDB)

### ML Service

- **Framework**: FastAPI
- **Language**: Python 3.13+
- **ML Libraries**:
  - Prophet (Time Series Forecasting)
  - TensorFlow/PyTorch (LSTM Models)
  - Scikit-learn (XGBoost, K-Means)

## 🚀 การติดตั้ง

### ข้อกำหนดเบื้องต้น

- Node.js 20+ และ npm/yarn
- Python 3.13+
- Git

### 1. Clone Repository

```bash
git clone https://github.com/StartGackt/pawn-ai.git
cd pawn-ai
```

### 2. ติดตั้ง Frontend

```bash
cd frontend
npm install
```

### 3. ติดตั้ง Backend API

```bash
cd ../pawn-ai-backend
npm install
```

### 4. ติดตั้ง ML Service

```bash
cd ../ml-service
pip install -r requirements.txt
# หรือใช้ uv
uv pip install -r requirements.txt
```

## 💻 การใช้งาน

### รัน Frontend (Development)

```bash
cd frontend
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

### รัน Backend API (Development)

```bash
cd pawn-ai-backend
npm run start:dev
```

API จะรันที่ `http://localhost:3001`

### รัน ML Service (Development)

```bash
cd ml-service
uvicorn main:app --reload
```

ML API จะรันที่ `http://localhost:8000`

### รันทั้งหมดพร้อมกัน

สามารถใช้ Terminal แยกกัน 3 หน้าต่าง หรือใช้ tools เช่น `concurrently`, `pm2`, หรือ `docker-compose`

## ✨ คุณสมบัติหลัก

### 📊 Dashboard

- สรุปยอดธุรกรรมรายวัน/เดือน
- กราฟแสดงราคาทองคำแบบ Real-time
- แสดงสินค้าจำนำที่ใกล้หมดอายุ
- กราฟคาดการณ์ราคาทองคำ 7 วัน (Prophet Model)

### 📈 Predictive Analytics

- **คาดการณ์ราคาทองคำ**: ใช้ Prophet + LSTM
  - ระยะสั้น: 1-7 วัน (92-94% accuracy)
  - ระยะกลาง: 1-4 สัปดาห์ (88-92% accuracy)
  - ระยะยาว: 1-3 เดือน (85-88% accuracy)
- **ทำนายสินทรัพย์ตีไถ่**: ใช้ XGBoost Classifier
- **วิเคราะห์พฤติกรรมลูกค้า**: ใช้ K-Means Clustering

### 💬 AI Chatbot

- ตอบคำถามเกี่ยวกับข้อมูลธุรกิจ
- วิเคราะห์ข้อมูลด้วย Natural Language
- แนะนำกลยุทธ์ทางธุรกิจ

### 📋 Data Management

- **ข้อมูลสินค้าจำนำ**: จัดการสถานะ, ราคา, ภาพถ่าย
- **ข้อมูลลูกค้า**: ประวัติการจำนำ, Credit Score
- **ราคาทองคำ**: บันทึกประวัติราคา, อัพเดทแบบ Real-time
- **สินทรัพย์ตีไถ่**: ติดตาม, ประเมินมูลค่า

### 📊 Reports & Analytics

- รายงานยอดขายรายวัน/เดือน/ปี
- วิเคราะห์ Trend และ Comparison
- Export ข้อมูลเป็น Excel, PDF

## 🏗️ สถาปัตยกรรม

### Microservices Architecture

```
┌─────────────┐
│   Frontend  │ (Next.js)
│   :3000     │
└──────┬──────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌─────────────┐   ┌─────────────┐
│   Backend   │   │ ML Service  │
│   (NestJS)  │◄──┤  (FastAPI)  │
│   :3001     │   │   :8000     │
└──────┬──────┘   └─────────────┘
       │
       ▼
┌─────────────┐
│  Database   │
│ PostgreSQL  │
└─────────────┘
```

### การสื่อสารระหว่าง Services

- **Frontend ↔ Backend**: REST API (Fetch/Axios)
- **Backend ↔ ML Service**: HTTP REST API
- **Real-time Updates**: WebSocket (Socket.io - Future)

## 📚 เอกสารเพิ่มเติม

- [Frontend README](./frontend/README.md) - รายละเอียดการพัฒนา Frontend
- [Backend README](./pawn-ai-backend/README.md) - API Documentation
- [ML Service README](./ml-service/README.md) - ML Models & Endpoints
- [ARCHITECTURE.md](./ARCHITECTURE.md) - สถาปัตยกรรมระบบโดยละเอียด

## 🔐 Environment Variables

แต่ละ service จะต้องตั้งค่า Environment Variables ดูรายละเอียดใน README ของแต่ละโปรเจค

## 🧪 Testing

```bash
# Frontend Tests
cd frontend
npm run test

# Backend Tests
cd pawn-ai-backend
npm run test
npm run test:e2e

# ML Service Tests
cd ml-service
pytest
```

## 📦 Production Build

```bash
# Frontend
cd frontend
npm run build
npm run start

# Backend
cd pawn-ai-backend
npm run build
npm run start:prod

# ML Service
cd ml-service
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🐳 Docker (Optional)

```bash
# Build all services
docker-compose build

# Run all services
docker-compose up

# Run specific service
docker-compose up frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Team

- **Frontend Developer**: UI/UX Implementation
- **Backend Developer**: API & Business Logic
- **ML Engineer**: Predictive Models
- **DevOps**: Deployment & Infrastructure

## 📞 Contact

สำหรับข้อสงสัยหรือปัญหา กรุณาเปิด Issue ใน GitHub Repository

---

**Last Updated**: November 2025
**Version**: 0.1.0
