cd pawn-ai-backend

# 1. Authentication (ต้องสร้างแบบ manual เพราะมี Guards, Strategies)
nest g module auth
nest g service auth
nest g controller auth

# 2. Users
nest g resource users
# ? What transport layer do you use? → REST API
# ? Would you like to generate CRUD entry points? → Yes

# 3. Pawns (ระบบจำนำ - โมดูลหลัก)
nest g resource pawns
# ? What transport layer do you use? → REST API
# ? Would you like to generate CRUD entry points? → Yes

# 4. Customers
nest g resource customers
# ? What transport layer do you use? → REST API
# ? Would you like to generate CRUD entry points? → Yes

# 5. Gold Prices
nest g resource gold-prices
# ? What transport layer do you use? → REST API
# ? Would you like to generate CRUD entry points? → Yes

# 6. Forfeited Assets
nest g resource forfeited-assets
# ? What transport layer do you use? → REST API
# ? Would you like to generate CRUD entry points? → Yes

# 7. External API (ไม่ต้อง CRUD)
nest g module external-api
nest g service external-api/bot-api
nest g service external-api/gold-thai-api
nest g service external-api/gold-global-api
nest g service external-api/holiday-api

# 8. ML Service Integration
nest g resource ml
# ? What transport layer do you use? → REST API
# ? Would you like to generate CRUD entry points? → No

# 9. LLM Integration
nest g resource llm
# ? What transport layer do you use? → REST API
# ? Would you like to generate CRUD entry points? → No

# 10. Analytics
nest g resource analytics
# ? What transport layer do you use? → REST API
# ? Would you like to generate CRUD entry points? → No

# 11. WebSocket
nest g gateway websocket/websocket

# 12. Database Module
nest g module database

# 13. Common Module
nest g module common


pawn-ai-backend/src/
├── users/
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── entities/
│   │   └── user.entity.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
│
├── pawns/
│   ├── pawns.controller.ts
│   ├── pawns.module.ts
│   ├── pawns.service.ts
│   ├── entities/
│   │   └── pawn.entity.ts
│   └── dto/
│       ├── create-pawn.dto.ts
│       └── update-pawn.dto.ts
│
├── customers/
│   ├── customers.controller.ts
│   ├── customers.module.ts
│   ├── customers.service.ts
│   ├── entities/
│   │   └── customer.entity.ts
│   └── dto/
│       ├── create-customer.dto.ts
│       └── update-customer.dto.ts
│
├── gold-prices/
│   ├── gold-prices.controller.ts
│   ├── gold-prices.module.ts
│   ├── gold-prices.service.ts
│   ├── entities/
│   │   └── gold-price.entity.ts
│   └── dto/
│       ├── create-gold-price.dto.ts
│       └── update-gold-price.dto.ts
│
├── forfeited-assets/
│   ├── forfeited-assets.controller.ts
│   ├── forfeited-assets.module.ts
│   ├── forfeited-assets.service.ts
│   ├── entities/
│   │   └── forfeited-asset.entity.ts
│   └── dto/
│       ├── create-forfeited-asset.dto.ts
│       └── update-forfeited-asset.dto.ts
│
├── ml/
│   ├── ml.controller.ts
│   ├── ml.module.ts
│   └── ml.service.ts
│
├── llm/
│   ├── llm.controller.ts
│   ├── llm.module.ts
│   └── llm.service.ts
│
├── analytics/
│   ├── analytics.controller.ts
│   ├── analytics.module.ts
│   └── analytics.service.ts
│
├── external-api/
│   └── external-api.module.ts
│
├── websocket/
│   ├── websocket.gateway.ts
│   └── websocket.module.ts
│
├── database/
│   └── database.module.ts
│
├── common/
│   └── common.module.ts
│
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
│
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts

cd pawn-ai-backend

# Core
npm install @nestjs/common @nestjs/core @nestjs/platform-express

# Database
npm install @prisma/client
npm install -D prisma

# Auth
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/bcrypt @types/passport-jwt

# Validation
npm install class-validator class-transformer

# Config
npm install @nestjs/config

# Scheduling
npm install @nestjs/schedule

# HTTP
npm install @nestjs/axios axios

# WebSocket
npm install @nestjs/websockets @nestjs/platform-socket.io

# LLM SDKs
npm install openai @anthropic-ai/sdk @google/generative-ai