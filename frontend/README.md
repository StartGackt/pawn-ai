# 🎨 Pawn AI - Frontend

Next.js Dashboard สำหรับระบบจัดการร้านรับจำนำอัจฉริยะ พร้อม Real-time Analytics และ AI Predictions

## 📋 สารบัญ

- [ภาพรวม](#ภาพรวม)
- [เทคโนโลยี](#เทคโนโลยี)
- [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
- [การติดตั้ง](#การติดตั้ง)
- [การใช้งาน](#การใช้งาน)
- [หน้าจอหลัก](#หน้าจอหลัก)
- [Components](#components)
- [Styling Guide](#styling-guide)

## 🎯 ภาพรวม

Frontend Application ที่สร้างด้วย **Next.js 15** (App Router) และ **React 19** พร้อมระบบ Server-Side Rendering และ Static Generation เพื่อประสิทธิภาพสูงสุด

### คุณสมบัติเด่น

- ⚡ **Next.js 15** with Turbopack (Fast Refresh)
- 🎨 **Tailwind CSS 4** - Utility-first Styling
- 📊 **Recharts** - Beautiful Data Visualization
- 🎭 **Radix UI** - Accessible Components
- 🌈 **Pastel Color Scheme** - Eye-friendly Design
- 📱 **Responsive Design** - Mobile-first Approach
- 🔍 **Type-safe** - Full TypeScript Support

## 🛠️ เทคโนโลยี

### Core

- **Next.js**: 15.5.6
- **React**: 19.1.0
- **TypeScript**: 5.x

### UI Framework

- **Tailwind CSS**: 4.x
- **shadcn/ui**: Component Library
- **Radix UI**: Primitives
  - Avatar, Dialog, Dropdown Menu
  - Label, Select, Separator
  - Slot, Tabs, Tooltip

### Data Visualization

- **Recharts**: 2.15.4
  - LineChart, AreaChart
  - BarChart, PieChart
  - Composed Charts

### Utilities

- **lucide-react**: Icon Library (554+ icons)
- **clsx + tailwind-merge**: Conditional Styling
- **class-variance-authority**: Component Variants
- **date-fns**: Date Formatting
- **sonner**: Toast Notifications

## 📁 โครงสร้างโปรเจค

```
frontend/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root Layout
│   ├── page.tsx               # Landing Page
│   ├── globals.css            # Global Styles
│   └── (dashboard)/           # Dashboard Layout Group
│       ├── layout.tsx         # Dashboard Layout
│       ├── dashboard/         # Main Dashboard
│       │   └── page.tsx
│       ├── analytics/         # Analytics Pages
│       │   ├── comparison/
│       │   └── trends/
│       ├── predictions/       # Predictive Models
│       │   ├── page.tsx
│       │   ├── gold-price/
│       │   ├── forfeited-assets/
│       │   └── model/
│       ├── data/              # Data Management
│       │   ├── pawns/         # Pawn Items
│       │   ├── customers/     # Customer Data
│       │   ├── gold-prices/   # Gold Price History
│       │   └── forfeited-assets/
│       ├── models/            # AI Models Info
│       ├── reports/           # Reports
│       └── chat/              # AI Chatbot
│
├── components/
│   ├── dashboard/             # Dashboard-specific
│   │   ├── stat-card.tsx      # Statistics Cards
│   │   ├── gold-price-chart.tsx
│   │   └── recent-activities.tsx
│   ├── layout/                # Layout Components
│   │   ├── app-sidebar.tsx    # Navigation Sidebar
│   │   └── navbar.tsx         # Top Navbar
│   └── ui/                    # shadcn/ui Components
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       └── ... (more)
│
├── lib/
│   └── utils.ts               # Utility Functions
│
├── hooks/
│   └── use-mobile.ts          # Responsive Hook
│
├── types/
│   └── index.ts               # TypeScript Types
│
├── config/
│   └── site.ts                # Site Configuration
│
├── public/                    # Static Assets
│   ├── logo.png
│   └── stgk-logo.png
│
├── next.config.ts             # Next.js Configuration
├── tailwind.config.ts         # Tailwind Configuration
├── tsconfig.json              # TypeScript Configuration
├── postcss.config.mjs         # PostCSS Configuration
├── components.json            # shadcn/ui Configuration
└── package.json               # Dependencies
```

## 🚀 การติดตั้ง

### ข้อกำหนดเบื้องต้น

- Node.js 20.x หรือสูงกว่า
- npm 10.x หรือ yarn 1.22.x

### ติดตั้ง Dependencies

```bash
npm install
```

## 💻 การใช้งาน

### Development Mode

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

### Production Build

```bash
# Build
npm run build

# Start Production Server
npm run start
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## 📄 หน้าจอหลัก

### 1. Dashboard (`/dashboard`)

**Main Features:**

- 📊 Statistics Cards (4 cards)
  - ยอดจำนำวันนี้
  - มูลค่าสินค้าคงคลัง
  - สินค้าใกล้หมดอายุ
  - รายได้เดือนนี้
- 📈 Gold Price Chart (7-day prediction)
- 🎯 Predictive Model Preview (Prophet)
- 📋 Recent Activities List
- ⚡ Quick Actions Buttons

**Color Scheme:**

- Blue Pastel: `from-blue-50 via-sky-50 to-white`
- Emerald Pastel: `from-emerald-50 via-teal-50 to-white`
- Purple Pastel: `from-purple-50 via-violet-50 to-white`
- Amber Pastel: `from-amber-50 via-yellow-50 to-white`

### 2. Pawns Data (`/data/pawns`)

**Features:**

- 🖼️ Image Cards (2 columns grid)
- 🏷️ Status Badges
- ⚠️ Risk Indicators
- 📊 Filter Options
- 🔍 Search Functionality

**Card Information:**

- รูปภาพสินค้า (192x192px)
- ID และประเภท
- น้ำหนัก/สเปค
- ราคาประเมิน
- ชื่อลูกค้า
- วันที่จำนำ
- วันที่ครบกำหนด

### 3. Gold Prices (`/data/gold-prices`)

**Features:**

- 📈 Price History Chart
- 💰 Current Price Display
- 📊 Buy/Sell Prices
- 📅 Date Range Filter

### 4. Predictions (`/predictions`)

**Model Pages:**

- `/predictions/gold-price` - ราคาทองคำ 1-30 วัน
- `/predictions/forfeited-assets` - สินทรัพย์ตีไถ่
- `/predictions/model` - Model Details & Performance

**Charts:**

- Line Chart (Time Series)
- Area Chart (Confidence Intervals)
- Bar Chart (Comparison)
- Pie Chart (Distribution)

### 5. Analytics

**Pages:**

- `/analytics/trends` - Trend Analysis
- `/analytics/comparison` - Period Comparison

### 6. AI Chat (`/chat`)

**Features:**

- 💬 Conversational UI
- 🤖 AI-powered Responses
- 📊 Data-driven Insights
- 💡 Business Recommendations

## 🎨 Components

### UI Components (shadcn/ui)

สามารถเพิ่ม component ใหม่ได้ด้วย:

```bash
npx shadcn-ui@latest add [component-name]
```

**Available Components:**

- `button`, `card`, `dialog`, `input`
- `select`, `table`, `tabs`, `tooltip`
- `badge`, `avatar`, `separator`
- `dropdown-menu`, `sheet`, `skeleton`

### Custom Components

**StatCard** (`components/dashboard/stat-card.tsx`)

```tsx
<StatCard
  title="ยอดจำนำวันนี้"
  value="127"
  change="+12.5%"
  icon={<Wallet />}
  trend="up"
/>
```

**GoldPriceChart** (`components/dashboard/gold-price-chart.tsx`)

```tsx
<GoldPriceChart data={priceData} />
```

## 🎨 Styling Guide

### Tailwind CSS 4

ใช้ Utility Classes แบบ Tailwind:

```tsx
// Pastel Card
<div className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-sky-50 to-white">
  <div className="text-blue-700 font-semibold">Title</div>
</div>
```

### Color Palette

**Main Colors:**

```css
/* Blue Theme */
bg-blue-50, border-blue-200, text-blue-700

/* Emerald Theme */
bg-emerald-50, border-emerald-200, text-emerald-700

/* Purple Theme */
bg-purple-50, border-purple-200, text-purple-700

/* Amber Theme */
bg-amber-50, border-amber-200, text-amber-700
```

**Status Colors:**

```css
/* Success */
bg-green-100, text-green-700

/* Warning */
bg-yellow-100, text-yellow-700

/* Error */
bg-red-100, text-red-700

/* Info */
bg-blue-100, text-blue-700
```

### Responsive Design

```tsx
// Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Content */}
</div>
```

### Dark Mode (Optional)

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

## 📊 Data Fetching

### Client-side (React Query - Future)

```tsx
const { data, isLoading } = useQuery({
  queryKey: ["pawns"],
  queryFn: () => fetch("/api/pawns").then((r) => r.json()),
});
```

### Server-side (Next.js)

```tsx
export default async function Page() {
  const data = await fetch("http://localhost:3001/api/pawns");
  const pawns = await data.json();

  return <PawnsList pawns={pawns} />;
}
```

## 🖼️ Image Optimization

### Next.js Image

```tsx
import Image from "next/image";

<Image
  src="https://images.unsplash.com/photo-..."
  alt="Gold"
  width={192}
  height={192}
  className="rounded-lg"
/>;
```

### Remote Images

Configure in `next.config.ts`:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

## 🔗 API Integration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ML_API_URL=http://localhost:8000
```

### API Client

```tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPawns() {
  const response = await fetch(`${API_URL}/pawns`);
  return response.json();
}
```

## 🧪 Testing (Future)

```bash
# Unit Tests
npm run test

# E2E Tests
npm run test:e2e
```

## 📦 Build Output

```
Route (app)                           Size  First Load JS
├ ○ /                              3.41 kB         128 kB
├ ○ /dashboard                     23.9 kB         316 kB
├ ○ /data/pawns                    15.1 kB         316 kB
├ ○ /predictions/model              119 kB         315 kB
└ ... (16 routes total)
```

## 🔧 Configuration Files

### next.config.ts

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🚀 Performance

- ⚡ Turbopack Build (5x faster than Webpack)
- 📦 Code Splitting (Automatic)
- 🖼️ Image Optimization (next/image)
- 🎯 Tree Shaking (Unused code removal)
- 📊 Bundle Analysis (next-bundle-analyzer)

## 📝 Best Practices

1. **Use Server Components** when possible
2. **Client Components** only for interactivity
3. **Optimize Images** with next/image
4. **Lazy Load** heavy components
5. **Use TypeScript** for type safety
6. **Follow Tailwind** utility classes
7. **Reusable Components** in `components/ui`

## 🤝 Contributing

1. สร้าง Feature Branch
2. เขียน Code ตาม Style Guide
3. Test ให้แน่ใจว่าไม่มี Error
4. สร้าง Pull Request

## 📞 Support

หากมีปัญหาหรือข้อสงสัย:

- เปิด Issue ใน GitHub
- ติดต่อ Frontend Team

---

**Version**: 0.1.0  
**Last Updated**: November 2025
