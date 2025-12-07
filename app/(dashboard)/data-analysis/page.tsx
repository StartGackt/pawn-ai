"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ComposedChart,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    AreaChart,
    Area,
    Line,
} from "recharts";
import {
    TrendingDown,
    AlertCircle,
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    Calendar,
    Download,
    BarChart3,
    PieChart as PieChartIcon,
    Activity,
    Banknote,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Gem,
    Database,
    Globe,
    TrendingUp,
    DollarSign,
    Sun,
    Users,
    Building2,
    FileText,
    ExternalLink,
    RefreshCw,
    Landmark,
    Percent,
    Loader2,
} from "lucide-react";

// =============================================
// API Types
// =============================================
interface GoldPriceData {
    date: string;
    updateTime: string;
    data: {
        name: string;
        buy: string;
        sell: string;
    }[];
}

interface ExchangeRateData {
    source: string;
    period: string;
    lastUpdated: string;
    currencies: {
        currencyId: string;
        currencyNameTh: string;
        currencyNameEng: string;
        buyingSight: string;
        buyingTransfer: string;
        selling: string;
        midRate: string;
    }[];
}

interface LoanRateData {
    source: string;
    period: string;
    data: {
        name_th: string;
        name_eng: string;
        mor: string;
        mlr: string;
        mrr: string;
    }[];
}

interface WorldGoldPrice {
    price: number;
    change: number;
    changePercent: number;
    high24h: number;
    low24h: number;
    timestamp: string;
    currency: string;
}

interface LiveDataState {
    goldPrice: GoldPriceData | null;
    exchangeRate: ExchangeRateData | null;
    loanRate: LoanRateData | null;
    worldGold: WorldGoldPrice | null;
    loading: boolean;
    error: string | null;
    lastFetch: Date | null;
}

// =============================================
// SAMPLE DATA
// =============================================

// ข้อมูลทรัพย์สินในครอบครอง
const ASSET_DISTRIBUTION_DATA = [
    { name: 'ทองคำ', value: 75, count: 36150, amount: 2850, color: '#eab308' },
    { name: 'เพชร/อัญมณี', value: 10, count: 4820, amount: 380, color: '#0ea5e9' },
    { name: 'นาฬิกา', value: 10, count: 4820, amount: 380, color: '#64748b' },
    { name: 'เครื่องใช้ไฟฟ้า', value: 5, count: 2410, amount: 190, color: '#94a3b8' },
];

// ข้อมูลทองคำแยกตามประเภท
const GOLD_BREAKDOWN_DATA = [
    { name: 'ทองแท่ง 96.5%', value: 45, color: '#fbbf24' },
    { name: 'ทองรูปพรรณ 96.5%', value: 35, color: '#f59e0b' },
    { name: 'ทองรูปพรรณ 90%', value: 15, color: '#d97706' },
    { name: 'ทองอื่นๆ', value: 5, color: '#92400e' },
];

// แนวโน้มการหลุดจำนำรายเดือน
const MONTHLY_DEFAULT_TREND = [
    { month: 'ม.ค.', redeemed: 86, default: 14, total: 12500, defaultAmount: 175 },
    { month: 'ก.พ.', redeemed: 87, default: 13, total: 11800, defaultAmount: 153 },
    { month: 'มี.ค.', redeemed: 85, default: 15, total: 13200, defaultAmount: 198 },
    { month: 'เม.ย.', redeemed: 88, default: 12, total: 12900, defaultAmount: 155 },
    { month: 'พ.ค.', redeemed: 84, default: 16, total: 14100, defaultAmount: 226 },
    { month: 'มิ.ย.', redeemed: 89, default: 11, total: 13500, defaultAmount: 149 },
    { month: 'ก.ค.', redeemed: 85, default: 15, total: 14200, defaultAmount: 213 },
    { month: 'ส.ค.', redeemed: 88, default: 12, total: 13800, defaultAmount: 166 },
    { month: 'ก.ย.', redeemed: 82, default: 18, total: 12400, defaultAmount: 223 },
    { month: 'ต.ค.', redeemed: 90, default: 10, total: 14500, defaultAmount: 145 },
    { month: 'พ.ย.', redeemed: 87, default: 13, total: 14100, defaultAmount: 183 },
    { month: 'ธ.ค.', redeemed: 89, default: 11, total: 14800, defaultAmount: 163 },
];

// แนวโน้มการหลุดจำนำรายไตรมาส
const QUARTERLY_DEFAULT_TREND = [
    { quarter: 'Q1/67', redeemed: 86, default: 14, total: 37500, defaultAmount: 525 },
    { quarter: 'Q2/67', redeemed: 87, default: 13, total: 40500, defaultAmount: 527 },
    { quarter: 'Q3/67', redeemed: 85, default: 15, total: 40400, defaultAmount: 606 },
    { quarter: 'Q4/67', redeemed: 89, default: 11, total: 43400, defaultAmount: 477 },
];

// อัตราหลุดจำนำตามประเภททรัพย์สิน
const DEFAULT_BY_ASSET_TYPE = [
    { name: 'ทองคำ', rate: 8, fill: '#eab308' },
    { name: 'เพชร/อัญมณี', rate: 15, fill: '#0ea5e9' },
    { name: 'นาฬิกา', rate: 18, fill: '#64748b' },
    { name: 'เครื่องใช้ไฟฟ้า', rate: 25, fill: '#ef4444' },
];

// อัตราหลุดจำนำตามช่วงวงเงิน
const DEFAULT_BY_LOAN_AMOUNT = [
    { range: '< 5,000', rate: 22, count: 5200 },
    { range: '5,000-20,000', rate: 15, count: 12400 },
    { range: '20,001-50,000', rate: 10, count: 8900 },
    { range: '50,001-100,000', rate: 7, count: 4200 },
    { range: '> 100,000', rate: 5, count: 1800 },
];

// อัตราหลุดจำนำตามอายุตั๋ว
const DEFAULT_BY_TICKET_AGE = [
    { age: '0-3 เดือน', rate: 5, count: 15200 },
    { age: '3-6 เดือน', rate: 12, count: 9800 },
    { age: '6-9 เดือน', rate: 18, count: 5400 },
    { age: '9-12 เดือน', rate: 28, count: 2100 },
];

// มูลค่าทรัพย์สินรายเดือน
const ASSET_VALUE_TREND = [
    { month: 'ก.ค.', gold: 2650, jewelry: 350, watch: 360, electronics: 180, total: 3540 },
    { month: 'ส.ค.', gold: 2720, jewelry: 365, watch: 370, electronics: 175, total: 3630 },
    { month: 'ก.ย.', gold: 2580, jewelry: 340, watch: 355, electronics: 185, total: 3460 },
    { month: 'ต.ค.', gold: 2850, jewelry: 380, watch: 380, electronics: 190, total: 3800 },
    { month: 'พ.ย.', gold: 2780, jewelry: 370, watch: 375, electronics: 188, total: 3713 },
    { month: 'ธ.ค.', gold: 2920, jewelry: 390, watch: 385, electronics: 192, total: 3887 },
];

// =============================================
// DATA SOURCES - แหล่งข้อมูลสำหรับคาดการณ์ราคาทอง
// =============================================

// ข้อมูลภายในประเทศ (Domestic Data)
const DOMESTIC_DATA_SOURCES = [
    {
        name: 'ราคาทองคำจากสมาคมค้าทองคำแห่งประเทศไทย',
        source: 'goldtraders.or.th',
        updateFrequency: 'Real-time',
        lastUpdate: '07 ธ.ค. 2567',
        status: 'active',
        description: 'ราคาทองคำแท่งและทองรูปพรรณ 96.5% รายวัน',
        icon: Gem,
        color: 'amber',
    },
    {
        name: 'อัตราแลกเปลี่ยน USD/THB',
        source: 'ธนาคารแห่งประเทศไทย (BOT)',
        updateFrequency: 'รายวัน',
        lastUpdate: '07 ธ.ค. 2567',
        status: 'active',
        description: 'อัตราแลกเปลี่ยนเงินตราต่างประเทศ',
        icon: DollarSign,
        color: 'green',
    },
    {
        name: 'อัตราดอกเบี้ยนโยบาย',
        source: 'ธนาคารแห่งประเทศไทย (BOT)',
        updateFrequency: 'ตามประกาศ MPC',
        lastUpdate: '27 พ.ย. 2567',
        status: 'active',
        description: 'อัตราดอกเบี้ยนโยบายและอัตราดอกเบี้ย MLR, MRR',
        icon: Percent,
        color: 'blue',
    },
    {
        name: 'อัตราเงินเฟ้อ (CPI)',
        source: 'กระทรวงพาณิชย์',
        updateFrequency: 'รายเดือน',
        lastUpdate: 'พ.ย. 2567',
        status: 'active',
        description: 'ดัชนีราคาผู้บริโภคและอัตราเงินเฟ้อทั่วไป',
        icon: TrendingUp,
        color: 'purple',
    },
];

// ข้อมูลตลาดโลก (Global Market Data)
const GLOBAL_MARKET_DATA = [
    {
        name: 'ราคาทองคำโลก (XAU/USD)',
        source: 'COMEX / LBMA',
        updateFrequency: 'Real-time',
        lastUpdate: '07 ธ.ค. 2567',
        status: 'active',
        description: 'ราคาทองคำตลาดโลก $/oz',
        icon: Globe,
        color: 'amber',
    },
    {
        name: 'Gold Futures',
        source: 'CME Group',
        updateFrequency: 'Real-time',
        lastUpdate: '07 ธ.ค. 2567',
        status: 'active',
        description: 'สัญญาซื้อขายทองคำล่วงหน้า',
        icon: TrendingUp,
        color: 'yellow',
    },
    {
        name: 'Gold Price Forecast',
        source: 'World Bank / IMF',
        updateFrequency: 'รายไตรมาส',
        lastUpdate: 'Q4/2567',
        status: 'active',
        description: 'การคาดการณ์ราคาทองคำจากสถาบันการเงินโลก',
        icon: Target,
        color: 'emerald',
    },
];

// ข้อมูลเศรษฐกิจโลก (Global Economic Data)
const GLOBAL_ECONOMIC_DATA = [
    {
        name: 'US Dollar Index (DXY)',
        source: 'Federal Reserve',
        updateFrequency: 'Real-time',
        lastUpdate: '07 ธ.ค. 2567',
        status: 'active',
        description: 'ดัชนีค่าเงินดอลลาร์เทียบกับสกุลเงินหลัก',
        icon: DollarSign,
        color: 'green',
    },
    {
        name: 'US Interest Rate (Fed Funds)',
        source: 'Federal Reserve',
        updateFrequency: 'ตามประกาศ FOMC',
        lastUpdate: '07 พ.ย. 2567',
        status: 'active',
        description: 'อัตราดอกเบี้ยนโยบายสหรัฐฯ',
        icon: Landmark,
        color: 'blue',
    },
    {
        name: 'Geopolitical Risk Index',
        source: 'Various Sources',
        updateFrequency: 'รายเดือน',
        lastUpdate: 'พ.ย. 2567',
        status: 'active',
        description: 'ดัชนีความเสี่ยงด้านภูมิรัฐศาสตร์โลก',
        icon: AlertTriangle,
        color: 'red',
    },
    {
        name: 'Global Inflation Data',
        source: 'IMF / World Bank',
        updateFrequency: 'รายเดือน',
        lastUpdate: 'พ.ย. 2567',
        status: 'active',
        description: 'อัตราเงินเฟ้อของประเทศเศรษฐกิจหลัก',
        icon: TrendingUp,
        color: 'orange',
    },
];

// ข้อมูลฤดูกาลและพฤติกรรม (Seasonal & Behavioral Data)
const SEASONAL_DATA = [
    {
        name: 'เทศกาลสำคัญ',
        events: ['ตรุษจีน', 'วันวาเลนไทน์', 'สงกรานต์', 'วันแม่', 'ปีใหม่'],
        impact: 'สูง',
        description: 'ช่วงเทศกาลมักมีความต้องการทองคำสูงขึ้น',
        color: 'pink',
    },
    {
        name: 'ฤดูแต่งงาน',
        events: ['ต.ค. - ก.พ.'],
        impact: 'ปานกลาง',
        description: 'ช่วงฤดูแต่งงานมีความต้องการทองรูปพรรณเพิ่มขึ้น',
        color: 'rose',
    },
    {
        name: 'ช่วงจ่ายโบนัส',
        events: ['ธ.ค. - ม.ค.'],
        impact: 'สูง',
        description: 'พนักงานมักนำโบนัสมาซื้อทองเก็บออม',
        color: 'amber',
    },
    {
        name: 'ช่วงเปิดเทอม',
        events: ['พ.ค. - มิ.ย.'],
        impact: 'ต่ำ',
        description: 'ค่าใช้จ่ายการศึกษาทำให้การซื้อทองลดลง',
        color: 'blue',
    },
];

// =============================================
// MAIN COMPONENT
// =============================================
export default function DataAnalysisPage() {
    const [timeRange, setTimeRange] = useState("6months");
    const [mainTab, setMainTab] = useState("data-collection");

    // Calculate summary stats
    const totalAssets = ASSET_DISTRIBUTION_DATA.reduce((sum, item) => sum + item.count, 0);
    const totalValue = ASSET_DISTRIBUTION_DATA.reduce((sum, item) => sum + item.amount, 0);
    const avgDefaultRate = MONTHLY_DEFAULT_TREND.reduce((sum, item) => sum + item.default, 0) / MONTHLY_DEFAULT_TREND.length;
    const avgRedemptionRate = MONTHLY_DEFAULT_TREND.reduce((sum, item) => sum + item.redeemed, 0) / MONTHLY_DEFAULT_TREND.length;

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                            <BarChart3 className="mr-1.5 h-3 w-3" />
                            Analytics
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">การวิเคราะห์ข้อมูล</h1>
                    <p className="text-sm text-slate-500 mt-0.5">รวบรวมข้อมูลและแหล่งข้อมูลสำหรับการคาดการณ์</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[130px] h-9">
                            <Calendar className="mr-2 h-3.5 w-3.5 text-slate-500" />
                            <SelectValue placeholder="ช่วงเวลา" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="3months">3 เดือน</SelectItem>
                            <SelectItem value="6months">6 เดือน</SelectItem>
                            <SelectItem value="1year">1 ปี</SelectItem>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-9">
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Export
                    </Button>
                </div>
            </div>

            {/* MAIN TABS */}
            <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[500px] h-10">
                    <TabsTrigger value="data-collection" className="text-xs sm:text-sm gap-2">
                        <Database className="h-4 w-4" />
                        รวบรวมและจัดเตรียมข้อมูล
                    </TabsTrigger>
                    <TabsTrigger value="data-sources" className="text-xs sm:text-sm gap-2">
                        <Globe className="h-4 w-4" />
                        แหล่งข้อมูลคาดการณ์ราคาทอง
                    </TabsTrigger>
                </TabsList>

                {/* TAB 1: รวบรวมและจัดเตรียมข้อมูล */}
                <TabsContent value="data-collection" className="mt-6 space-y-6">
                    <DataCollectionTab
                        totalAssets={totalAssets}
                        totalValue={totalValue}
                        avgRedemptionRate={avgRedemptionRate}
                        avgDefaultRate={avgDefaultRate}
                    />
                </TabsContent>

                {/* TAB 2: แหล่งข้อมูลสำหรับคาดการณ์ราคาทอง */}
                <TabsContent value="data-sources" className="mt-6 space-y-6">
                    <DataSourcesTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}

// =============================================
// TAB 1: Data Collection Component
// =============================================
function DataCollectionTab({
    totalAssets,
    totalValue,
    avgRedemptionRate,
    avgDefaultRate,
}: {
    totalAssets: number;
    totalValue: number;
    avgRedemptionRate: number;
    avgDefaultRate: number;
}) {
    return (
        <>
            {/* SUMMARY STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 font-medium">ทรัพย์สินทั้งหมด</p>
                                <p className="text-2xl font-bold text-slate-900">{totalAssets.toLocaleString()}</p>
                                <p className="text-xs text-slate-400">รายการ</p>
                            </div>
                            <div className="p-2.5 bg-amber-50 rounded-lg">
                                <Package className="h-5 w-5 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 font-medium">มูลค่ารวม</p>
                                <p className="text-2xl font-bold text-slate-900">{totalValue.toLocaleString()}</p>
                                <p className="text-xs text-slate-400">ล้านบาท</p>
                            </div>
                            <div className="p-2.5 bg-blue-50 rounded-lg">
                                <Banknote className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 font-medium">อัตราไถ่ถอน</p>
                                <p className="text-2xl font-bold text-emerald-600">{avgRedemptionRate.toFixed(1)}%</p>
                                <div className="flex items-center gap-1">
                                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                                    <span className="text-xs text-emerald-600">+2.1%</span>
                                </div>
                            </div>
                            <div className="p-2.5 bg-emerald-50 rounded-lg">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 font-medium">อัตราหลุดจำนำ</p>
                                <p className="text-2xl font-bold text-red-600">{avgDefaultRate.toFixed(1)}%</p>
                                <div className="flex items-center gap-1">
                                    <ArrowDownRight className="h-3 w-3 text-emerald-500" />
                                    <span className="text-xs text-emerald-600">-1.5%</span>
                                </div>
                            </div>
                            <div className="p-2.5 bg-red-50 rounded-lg">
                                <XCircle className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* SECTION 1: วิเคราะห์ทรัพย์สินที่อยู่ในครอบครอง */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 text-amber-600">
                        <Package className="h-4 w-4" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-800">วิเคราะห์ทรัพย์สินในครอบครอง</h2>
                        <p className="text-xs text-slate-500">Portfolio Analysis</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* สัดส่วนทรัพย์สิน */}
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                <PieChartIcon className="h-4 w-4 text-amber-500" />
                                สัดส่วนทรัพย์สิน
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={ASSET_DISTRIBUTION_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                                            {ASSET_DISTRIBUTION_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => [`${value}%`]} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-1.5 mt-3">
                                {ASSET_DISTRIBUTION_DATA.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="font-semibold text-slate-800">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* รายละเอียดทองคำ */}
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                <Gem className="h-4 w-4 text-yellow-500" />
                                ทองคำแยกตามประเภท
                            </CardTitle>
                            <CardDescription className="text-xs">75% ของทรัพย์สินทั้งหมด</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={GOLD_BREAKDOWN_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                                            {GOLD_BREAKDOWN_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => [`${value}%`]} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-1.5 mt-3">
                                {GOLD_BREAKDOWN_DATA.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="font-semibold text-slate-800">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* ความเสี่ยงกระจุกตัว */}
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                                ประเมินความเสี่ยง
                            </CardTitle>
                            <CardDescription className="text-xs">Risk Concentration</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <AlertCircle className="h-4 w-4 text-orange-500" />
                                    <span className="font-medium text-xs text-orange-800">ความเสี่ยงสูง</span>
                                </div>
                                <p className="text-xs text-orange-700 leading-relaxed">
                                    ทรัพย์สิน 75% กระจุกตัวที่ทองคำ หากราคาทองตกจะกระทบมูลค่าหลักประกัน
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">HHI Index</span>
                                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">5,850</Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Concentration Risk</span>
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">High</Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Correlation to Gold</span>
                                    <span className="font-semibold text-slate-800">0.92</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t">
                                <p className="text-xs text-slate-500">
                                    <strong>แนะนำ:</strong> ควรมีระบบ Early Warning สำหรับการเปลี่ยนแปลงราคาทอง
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* มูลค่าทรัพย์สินรายเดือน */}
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-500" />
                            แนวโน้มมูลค่าทรัพย์สินรายเดือน (ล้านบาท)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={ASSET_VALUE_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                    <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                                    <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                                    <Area type="monotone" dataKey="gold" name="ทองคำ" stackId="1" stroke="#eab308" fill="#fef3c7" />
                                    <Area type="monotone" dataKey="jewelry" name="เพชร/อัญมณี" stackId="1" stroke="#0ea5e9" fill="#e0f2fe" />
                                    <Area type="monotone" dataKey="watch" name="นาฬิกา" stackId="1" stroke="#64748b" fill="#f1f5f9" />
                                    <Area type="monotone" dataKey="electronics" name="เครื่องใช้ไฟฟ้า" stackId="1" stroke="#94a3b8" fill="#f8fafc" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* SECTION 2: วิเคราะห์แนวโน้มการหลุดจำนำ */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600">
                        <TrendingDown className="h-4 w-4" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-800">วิเคราะห์แนวโน้มการหลุดจำนำ</h2>
                        <p className="text-xs text-slate-500">Default Rate Analysis</p>
                    </div>
                </div>

                <Tabs defaultValue="monthly" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[320px] h-9">
                        <TabsTrigger value="monthly" className="text-xs">รายเดือน</TabsTrigger>
                        <TabsTrigger value="quarterly" className="text-xs">รายไตรมาส</TabsTrigger>
                        <TabsTrigger value="breakdown" className="text-xs">แยกตามปัจจัย</TabsTrigger>
                    </TabsList>

                    {/* Monthly Tab */}
                    <TabsContent value="monthly" className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <Card className="border-slate-200 shadow-sm lg:col-span-2">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-blue-500" />
                                        อัตราไถ่ถอน vs หลุดจำนำ รายเดือน
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={MONTHLY_DEFAULT_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                                <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                                                <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                                                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                                                <Bar dataKey="redeemed" name="ไถ่ถอนคืน (%)" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                                                <Bar dataKey="default" name="หลุดจำนำ (%)" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                        <Target className="h-4 w-4 text-emerald-500" />
                                        สรุปผลการดำเนินงาน
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-emerald-700">อัตราไถ่ถอนเฉลี่ย</span>
                                            <span className="text-lg font-bold text-emerald-700">{avgRedemptionRate.toFixed(1)}%</span>
                                        </div>
                                        <div className="mt-1.5 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${avgRedemptionRate}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="p-2.5 bg-red-50 rounded-lg border border-red-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-red-700">อัตราหลุดจำนำเฉลี่ย</span>
                                            <span className="text-lg font-bold text-red-600">{avgDefaultRate.toFixed(1)}%</span>
                                        </div>
                                        <div className="mt-1.5 h-1.5 bg-red-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 rounded-full" style={{ width: `${avgDefaultRate * 5}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t space-y-1.5">
                                        <h4 className="text-xs font-medium text-slate-700">เดือนที่น่าสนใจ</h4>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500">หลุดจำนำสูงสุด</span>
                                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">ก.ย. (18%)</Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500">หลุดจำนำต่ำสุด</span>
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">ต.ค. (10%)</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                    <Banknote className="h-4 w-4 text-red-500" />
                                    มูลค่าทรัพย์สินหลุดจำนำรายเดือน (ล้านบาท)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[220px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={MONTHLY_DEFAULT_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                            <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="left" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="right" orientation="right" fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                                            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                                            <Bar yAxisId="left" dataKey="total" name="จำนวนตั๋วทั้งหมด" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                            <Line yAxisId="right" type="monotone" dataKey="defaultAmount" name="มูลค่าหลุดจำนำ (ลบ.)" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444' }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Quarterly Tab */}
                    <TabsContent value="quarterly" className="mt-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-purple-500" />
                                        อัตราไถ่ถอน vs หลุดจำนำ รายไตรมาส
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={QUARTERLY_DEFAULT_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                                <XAxis dataKey="quarter" fontSize={10} tickLine={false} axisLine={false} />
                                                <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                                                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                                                <Bar dataKey="redeemed" name="ไถ่ถอนคืน (%)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="default" name="หลุดจำนำ (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                        <Target className="h-4 w-4 text-blue-500" />
                                        สรุปรายไตรมาส
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {QUARTERLY_DEFAULT_TREND.map((item) => (
                                            <div key={item.quarter} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="font-medium text-sm text-slate-800">{item.quarter}</span>
                                                    <Badge variant={item.default <= 12 ? "outline" : "destructive"} className={item.default <= 12 ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-xs" : "text-xs"}>
                                                        {item.default}% หลุดจำนำ
                                                    </Badge>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 text-xs">
                                                    <div>
                                                        <span className="text-slate-500">จำนวนตั๋ว</span>
                                                        <p className="font-medium text-slate-800">{item.total.toLocaleString()} รายการ</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">มูลค่าหลุดจำนำ</span>
                                                        <p className="font-medium text-red-600">{item.defaultAmount} ลบ.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Breakdown Tab */}
                    <TabsContent value="breakdown" className="mt-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                        <Package className="h-4 w-4 text-amber-500" />
                                        ตามประเภท
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {DEFAULT_BY_ASSET_TYPE.map((item) => (
                                            <div key={item.name} className="space-y-1.5">
                                                <div className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }}></div>
                                                        <span className="text-slate-600">{item.name}</span>
                                                    </div>
                                                    <span className="font-semibold text-slate-800">{item.rate}%</span>
                                                </div>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${item.rate * 3}%`, backgroundColor: item.fill }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 p-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                                        <p className="text-xs text-emerald-700"><strong>พบว่า:</strong> ทองคำมีอัตราหลุดจำนำต่ำที่สุด (8%)</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                        <Banknote className="h-4 w-4 text-blue-500" />
                                        ตามวงเงิน
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[200px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={DEFAULT_BY_LOAN_AMOUNT} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-slate-100" />
                                                <XAxis type="number" fontSize={10} tickLine={false} axisLine={false} domain={[0, 30]} />
                                                <YAxis type="category" dataKey="range" fontSize={9} tickLine={false} axisLine={false} width={70} />
                                                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} formatter={(value: number) => [`${value}%`, 'อัตราหลุดจำนำ']} />
                                                <Bar dataKey="rate" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-lg">
                                        <p className="text-xs text-blue-700"><strong>พบว่า:</strong> วงเงินต่ำกว่า 5,000 บาท มีอัตราหลุดจำนำสูงสุด (22%)</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-purple-500" />
                                        ตามอายุตั๋ว
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[200px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={DEFAULT_BY_TICKET_AGE} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-slate-100" />
                                                <XAxis type="number" fontSize={10} tickLine={false} axisLine={false} domain={[0, 35]} />
                                                <YAxis type="category" dataKey="age" fontSize={9} tickLine={false} axisLine={false} width={70} />
                                                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} formatter={(value: number) => [`${value}%`, 'อัตราหลุดจำนำ']} />
                                                <Bar dataKey="rate" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-2 p-2 bg-purple-50 border border-purple-100 rounded-lg">
                                        <p className="text-xs text-purple-700"><strong>พบว่า:</strong> ตั๋วอายุ 9-12 เดือน มีความเสี่ยงสูงสุด (28%)</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-slate-200 shadow-sm mt-4">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-indigo-500" />
                                    สรุปข้อมูลเชิงลึก (Key Insights)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Gem className="h-4 w-4 text-amber-600" />
                                            <span className="font-medium text-xs text-amber-800">ทรัพย์สินที่ปลอดภัย</span>
                                        </div>
                                        <p className="text-xs text-amber-700 leading-relaxed">
                                            ทองคำมีอัตราหลุดจำนำต่ำที่สุด (8%) แนะนำให้เน้นรับจำนำทองเป็นหลัก
                                        </p>
                                    </div>
                                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <AlertTriangle className="h-4 w-4 text-red-600" />
                                            <span className="font-medium text-xs text-red-800">กลุ่มเสี่ยงสูง</span>
                                        </div>
                                        <p className="text-xs text-red-700 leading-relaxed">
                                            วงเงินต่ำ + ตั๋วอายุนาน + เครื่องใช้ไฟฟ้า = ความเสี่ยง 40%+
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Target className="h-4 w-4 text-blue-600" />
                                            <span className="font-medium text-xs text-blue-800">โอกาสปรับปรุง</span>
                                        </div>
                                        <p className="text-xs text-blue-700 leading-relaxed">
                                            ควรมีระบบแจ้งเตือนลูกค้าก่อนตั๋วใกล้ครบ 6 เดือน
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>
        </>
    );
}

// =============================================
// TAB 2: Data Sources Component  
// =============================================
function DataSourcesTab() {
    const [liveData, setLiveData] = useState<LiveDataState>({
        goldPrice: null,
        exchangeRate: null,
        loanRate: null,
        worldGold: null,
        loading: true,
        error: null,
        lastFetch: null,
    });

    const fetchAllData = useCallback(async () => {
        setLiveData(prev => ({ ...prev, loading: true, error: null }));

        try {
            const [goldRes, exchangeRes, loanRes, worldGoldRes] = await Promise.allSettled([
                fetch('/api/gold-price'),
                fetch('/api/exchange-rate'),
                fetch('/api/loan-rate'),
                fetch('/api/gold-world'),
            ]);

            const goldPrice = goldRes.status === 'fulfilled' && goldRes.value.ok
                ? await goldRes.value.json()
                : null;
            const exchangeRate = exchangeRes.status === 'fulfilled' && exchangeRes.value.ok
                ? await exchangeRes.value.json()
                : null;
            const loanRate = loanRes.status === 'fulfilled' && loanRes.value.ok
                ? await loanRes.value.json()
                : null;
            const worldGold = worldGoldRes.status === 'fulfilled' && worldGoldRes.value.ok
                ? await worldGoldRes.value.json()
                : null;

            setLiveData({
                goldPrice,
                exchangeRate,
                loanRate,
                worldGold,
                loading: false,
                error: null,
                lastFetch: new Date(),
            });
        } catch (error) {
            setLiveData(prev => ({
                ...prev,
                loading: false,
                error: 'ไม่สามารถดึงข้อมูลได้',
            }));
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // Build dynamic data sources with live data
    const getDomesticDataSources = () => {
        const goldData = liveData.goldPrice;
        const exchangeData = liveData.exchangeRate;
        const loanData = liveData.loanRate;

        return [
            {
                name: 'ราคาทองคำจากสมาคมค้าทองคำแห่งประเทศไทย',
                source: 'goldtraders.or.th',
                updateFrequency: 'Real-time',
                lastUpdate: goldData ? `${goldData.date} ${goldData.updateTime}` : 'กำลังโหลด...',
                status: goldData ? 'active' : 'loading',
                description: goldData
                    ? `ทองแท่ง: ซื้อ ${goldData.data[0]?.buy || '-'} / ขาย ${goldData.data[0]?.sell || '-'} บาท`
                    : 'ราคาทองคำแท่งและทองรูปพรรณ 96.5% รายวัน',
                icon: Gem,
                color: 'amber',
                liveValue: goldData?.data[0]?.sell,
            },
            {
                name: 'อัตราแลกเปลี่ยน USD/THB',
                source: 'ธนาคารแห่งประเทศไทย (BOT)',
                updateFrequency: 'รายวัน',
                lastUpdate: exchangeData?.lastUpdated || 'กำลังโหลด...',
                status: exchangeData ? 'active' : 'loading',
                description: exchangeData?.currencies?.find(c => c.currencyId === 'USD')
                    ? `1 USD = ${exchangeData.currencies.find(c => c.currencyId === 'USD')?.midRate || '-'} THB`
                    : 'อัตราแลกเปลี่ยนเงินตราต่างประเทศ',
                icon: DollarSign,
                color: 'green',
                liveValue: exchangeData?.currencies?.find(c => c.currencyId === 'USD')?.midRate,
            },
            {
                name: 'อัตราดอกเบี้ยนโยบาย',
                source: 'ธนาคารแห่งประเทศไทย (BOT)',
                updateFrequency: 'ตามประกาศ MPC',
                lastUpdate: loanData?.period || 'กำลังโหลด...',
                status: loanData ? 'active' : 'loading',
                description: loanData?.data?.[0]
                    ? `MLR: ${loanData.data[0].mlr}% | MRR: ${loanData.data[0].mrr}%`
                    : 'อัตราดอกเบี้ยนโยบายและอัตราดอกเบี้ย MLR, MRR',
                icon: Percent,
                color: 'blue',
                liveValue: loanData?.data?.[0]?.mlr,
            },
            {
                name: 'อัตราเงินเฟ้อ (CPI)',
                source: 'กระทรวงพาณิชย์',
                updateFrequency: 'รายเดือน',
                lastUpdate: 'พ.ย. 2567',
                status: 'active',
                description: 'ดัชนีราคาผู้บริโภคและอัตราเงินเฟ้อทั่วไป',
                icon: TrendingUp,
                color: 'purple',
            },
        ];
    };

    const getGlobalMarketData = () => {
        const worldGoldData = liveData.worldGold;

        return [
            {
                name: 'ราคาทองคำโลก (XAU/USD)',
                source: 'COMEX / LBMA',
                updateFrequency: 'Real-time',
                lastUpdate: worldGoldData ? new Date(worldGoldData.timestamp).toLocaleString('th-TH') : 'กำลังโหลด...',
                status: worldGoldData ? 'active' : 'loading',
                description: worldGoldData
                    ? `$${worldGoldData.price.toLocaleString()} /oz (${worldGoldData.change >= 0 ? '+' : ''}${worldGoldData.change.toFixed(2)} | ${worldGoldData.changePercent.toFixed(2)}%)`
                    : 'ราคาทองคำตลาดโลก $/oz',
                icon: Globe,
                color: 'amber',
                liveValue: worldGoldData?.price?.toLocaleString(),
                change: worldGoldData?.change,
                changePercent: worldGoldData?.changePercent,
            },
            {
                name: 'Gold Futures',
                source: 'CME Group',
                updateFrequency: 'Real-time',
                lastUpdate: worldGoldData ? new Date(worldGoldData.timestamp).toLocaleString('th-TH') : 'กำลังโหลด...',
                status: worldGoldData ? 'active' : 'loading',
                description: worldGoldData
                    ? `High: $${worldGoldData.high24h.toLocaleString()} | Low: $${worldGoldData.low24h.toLocaleString()}`
                    : 'สัญญาซื้อขายทองคำล่วงหน้า',
                icon: TrendingUp,
                color: 'yellow',
            },
            {
                name: 'Gold Price Forecast',
                source: 'World Bank / IMF',
                updateFrequency: 'รายไตรมาส',
                lastUpdate: 'Q4/2567',
                status: 'active',
                description: 'การคาดการณ์ราคาทองคำจากสถาบันการเงินโลก',
                icon: Target,
                color: 'emerald',
            },
        ];
    };

    const domesticSources = getDomesticDataSources();
    const globalMarketSources = getGlobalMarketData();

    return (
        <div className="space-y-6">
            {/* Section Header with Refresh */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600">
                        <Database className="h-4 w-4" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-800">แหล่งข้อมูลสำหรับคาดการณ์ราคาทองคำ</h2>
                        <p className="text-xs text-slate-500">Data Sources for Gold Price Prediction</p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchAllData}
                    disabled={liveData.loading}
                    className="h-8"
                >
                    {liveData.loading ? (
                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                    ) : (
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    )}
                    {liveData.loading ? 'กำลังโหลด...' : 'รีเฟรช'}
                </Button>
            </div>

            {/* Last Update Info */}
            {liveData.lastFetch && (
                <div className="text-xs text-slate-500 -mt-4 mb-2">
                    อัพเดตล่าสุด: {liveData.lastFetch.toLocaleString('th-TH')}
                </div>
            )}

            {/* Section 1: ข้อมูลภายในประเทศ */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600">
                        <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">ข้อมูลภายในประเทศ (Domestic Data)</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {domesticSources.map((source, index) => (
                        <DataSourceCard key={index} source={source} isLoading={liveData.loading && !source.liveValue} />
                    ))}
                </div>
            </section>

            {/* Section 2: ข้อมูลตลาดโลก */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 text-amber-600">
                        <Globe className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">ข้อมูลตลาดโลก (Global Market Data)</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {globalMarketSources.map((source, index) => (
                        <DataSourceCard key={index} source={source} isLoading={liveData.loading && !source.liveValue} />
                    ))}
                </div>
            </section>

            {/* Section 3: ข้อมูลสถานการณ์และเศรษฐกิจโลก */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-100 text-purple-600">
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">ข้อมูลสถานการณ์และเศรษฐกิจโลก (Global Economic & Situational Data)</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GLOBAL_ECONOMIC_DATA.map((source, index) => (
                        <DataSourceCard key={index} source={source} />
                    ))}
                </div>
            </section>

            {/* Section 4: ข้อมูลฤดูกาลและพฤติกรรม */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-pink-100 text-pink-600">
                        <Sun className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">ข้อมูลฤดูกาลและพฤติกรรม (Seasonal & Behavioral Data)</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {SEASONAL_DATA.map((item, index) => (
                        <SeasonalCard key={index} data={item} />
                    ))}
                </div>
            </section>

            {/* Summary Card */}
            <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1">สรุปแหล่งข้อมูลสำหรับโมเดลคาดการณ์</h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                ข้อมูลทั้งหมดถูกนำมาประมวลผลร่วมกันเพื่อสร้างโมเดลคาดการณ์ราคาทองคำที่แม่นยำ
                                โดยพิจารณาทั้งปัจจัยภายในประเทศ ตลาดโลก สถานการณ์เศรษฐกิจ และพฤติกรรมตามฤดูกาล
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="text-center p-2 bg-white/60 rounded-lg">
                                    <p className="text-lg font-bold text-blue-700">4</p>
                                    <p className="text-xs text-slate-500">แหล่งข้อมูลในประเทศ</p>
                                </div>
                                <div className="text-center p-2 bg-white/60 rounded-lg">
                                    <p className="text-lg font-bold text-amber-700">3</p>
                                    <p className="text-xs text-slate-500">แหล่งข้อมูลตลาดโลก</p>
                                </div>
                                <div className="text-center p-2 bg-white/60 rounded-lg">
                                    <p className="text-lg font-bold text-purple-700">4</p>
                                    <p className="text-xs text-slate-500">ข้อมูลเศรษฐกิจ</p>
                                </div>
                                <div className="text-center p-2 bg-white/60 rounded-lg">
                                    <p className="text-lg font-bold text-pink-700">4</p>
                                    <p className="text-xs text-slate-500">ปัจจัยฤดูกาล</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// =============================================
// Helper Components
// =============================================

interface DataSource {
    name: string;
    source: string;
    updateFrequency: string;
    lastUpdate: string;
    status: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    liveValue?: string;
    change?: number;
    changePercent?: number;
}

function DataSourceCard({ source, isLoading }: { source: DataSource; isLoading?: boolean }) {
    const Icon = source.icon;
    const colorMap: Record<string, string> = {
        amber: 'bg-amber-50 text-amber-600 border-amber-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        red: 'bg-red-50 text-red-600 border-red-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-200',
    };

    const getStatusBadge = () => {
        if (isLoading || source.status === 'loading') {
            return (
                <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Loading
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className={`text-xs ${source.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600'}`}>
                {source.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
        );
    };

    return (
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colorMap[source.color]?.split(' ').slice(0, 2).join(' ') || 'bg-slate-50'}`}>
                        <Icon className={`h-4 w-4 ${colorMap[source.color]?.split(' ').slice(1, 2).join(' ') || 'text-slate-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-slate-800 truncate">{source.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{source.source}</p>
                    </div>
                    {getStatusBadge()}
                </div>

                {/* Live Value Display */}
                {source.liveValue && (
                    <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">ค่าปัจจุบัน</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-slate-800">{source.liveValue}</span>
                                {source.change !== undefined && (
                                    <span className={`text-xs ${source.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {source.change >= 0 ? '+' : ''}{source.change.toFixed(2)}
                                        {source.changePercent !== undefined && ` (${source.changePercent.toFixed(2)}%)`}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{source.description}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <RefreshCw className="h-3 w-3" />
                        <span>{source.updateFrequency}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{source.lastUpdate}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface SeasonalItem {
    name: string;
    events: string[];
    impact: string;
    description: string;
    color: string;
}

function SeasonalCard({ data }: { data: SeasonalItem }) {
    const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
        pink: { bg: 'bg-pink-50', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700 border-pink-200' },
        rose: { bg: 'bg-rose-50', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700 border-rose-200' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700 border-blue-200' },
    };
    const colors = colorMap[data.color] || colorMap.blue;

    return (
        <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-slate-800">{data.name}</h4>
                    <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                        ผลกระทบ: {data.impact}
                    </Badge>
                </div>
                <p className="text-xs text-slate-600 mb-3">{data.description}</p>
                <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <div className="flex flex-wrap gap-1.5">
                        {data.events.map((event, idx) => (
                            <span key={idx} className={`text-xs px-2 py-0.5 rounded-full bg-white/80 ${colors.text}`}>
                                {event}
                            </span>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
