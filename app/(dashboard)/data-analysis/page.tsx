"use client";

import { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ComposedChart,
    ReferenceLine,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from "recharts";
import {
    RefreshCw,
    BrainCircuit,
    Maximize2,
    Database,
    Server,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    Globe,
    FileText,
    Landmark,
    ArrowRightLeft,
    ExternalLink,
    Gem,
    Receipt,
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    DollarSign
} from "lucide-react";
import {
    generateMultiFrameData,
    MultiTimeframeData,
    PredictionDataPoint
} from "@/app/data/prediction-data";

// =============================================
// INTERFACES
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

interface WorldGoldPrice {
    price: number;
    change: number;
    changePercent: number;
    high24h: number;
    low24h: number;
    timestamp: string;
    currency: string;
}

interface CurrencyData {
    currencyId: string;
    currencyNameTh: string;
    currencyNameEng: string;
    buyingSight: string;
    buyingTransfer: string;
    selling: string;
    midRate: string;
}

interface ExchangeRateData {
    source: string;
    period: string;
    lastUpdated: string;
    currencies: CurrencyData[];
}

interface BankRateAvg {
    name_th: string;
    name_eng: string;
    mor: number | null;
    mlr: number | null;
    mrr: number | null;
    ceiling_rate: number | null;
    default_rate: number | null;
    creditcard_min: number | null;
    creditcard_max: number | null;
}

interface LoanRateResponse {
    success: boolean;
    type: string;
    period: string;
    timestamp: string;
    source?: string;
    data: {
        thai_commercial_banks_avg: BankRateAvg | null;
        foreign_banks_avg: BankRateAvg | null;
    };
}

// =============================================
// CONSTANTS
// =============================================
const MAIN_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CNY"];

const currencyFlags: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
};

const currencyNames: Record<string, string> = {
    USD: "ดอลลาร์สหรัฐ",
    EUR: "ยูโร",
    GBP: "ปอนด์",
    JPY: "เยน (100)",
    CNY: "หยวน",
};

// Sample Data for Analysis Charts
const ASSET_DISTRIBUTION_DATA = [
    { name: 'ทองคำ', value: 75, color: '#eab308' },
    { name: 'เพชร/อัญมณี', value: 10, color: '#0ea5e9' },
    { name: 'นาฬิกา', value: 10, color: '#64748b' },
    { name: 'เครื่องใช้ไฟฟ้า', value: 5, color: '#94a3b8' },
];

const REDEMPTION_DATA = [
    { month: 'ก.ค.', redeemed: 85, default: 15 },
    { month: 'ส.ค.', redeemed: 88, default: 12 },
    { month: 'ก.ย.', redeemed: 82, default: 18 },
    { month: 'ต.ค.', redeemed: 90, default: 10 },
    { month: 'พ.ย.', redeemed: 87, default: 13 },
    { month: 'ธ.ค.', redeemed: 89, default: 11 },
];

const PAWN_HISTORY_DATA = [
    { month: 'ก.ค.', count: 12500, amount: 450 },
    { month: 'ส.ค.', count: 13200, amount: 480 },
    { month: 'ก.ย.', count: 11800, amount: 420 },
    { month: 'ต.ค.', count: 14100, amount: 510 },
    { month: 'พ.ย.', count: 13500, amount: 490 },
    { month: 'ธ.ค.', count: 14800, amount: 540 },
];

// =============================================
// CUSTOM COMPONENTS
// =============================================

// Custom Cross Marker for "Blind Forecast"
const CustomCross = (props: { cx?: number; cy?: number; stroke?: string; strokeWidth?: number }) => {
    const { cx, cy, stroke, strokeWidth } = props;
    if (cx === undefined || cy === undefined) return null;
    const r = 4;
    return (
        <g stroke={stroke} strokeWidth={strokeWidth || 2}>
            <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} />
            <line x1={cx + r} y1={cy - r} x2={cx - r} y2={cy + r} />
        </g>
    );
};

// Forecast Chart Component
const ForecastChart = ({ title, mae, data, lastHistoryPrice }: {
    title: string;
    mae: string;
    data: PredictionDataPoint[];
    lastHistoryPrice: number;
}) => {
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader className="py-3 px-4 border-b bg-slate-50/50">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        {title}
                        <Badge variant="secondary" className="text-xs bg-slate-200 text-slate-700">
                            MAE: {mae}
                        </Badge>
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Maximize2 className="h-3 w-3 text-slate-400" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={true} className="stroke-slate-100" />
                            <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                            <YAxis domain={['auto', 'auto']} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val.toLocaleString()}`} />
                            <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #e2e8f0' }}
                                formatter={(value: string | number | (string | number)[], name: string) => {
                                    if (!value) return [];
                                    const val = Number(value).toLocaleString();
                                    if (name === 'historyPrice') return [val, 'ประวัติ'];
                                    if (name === 'actualPrice') return [val, 'จริง'];
                                    if (name === 'predictedPrice') return [val, 'ทำนาย'];
                                    return [val, name];
                                }}
                            />
                            <Legend iconType="plainline" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                            <Line type="monotone" dataKey="historyPrice" stroke="#94a3b8" strokeWidth={1.5} dot={false} name="ประวัติ" connectNulls={false} />
                            <Line type="monotone" dataKey="actualPrice" stroke="#16a34a" strokeWidth={2} dot={{ r: 3, fill: '#16a34a', strokeWidth: 0 }} name="ราคาจริง" connectNulls={true} />
                            <Line type="monotone" dataKey="predictedPrice" stroke="transparent" strokeWidth={0} dot={<CustomCross stroke="#dc2626" strokeWidth={2} />} name="ทำนาย (Blind)" isAnimationActive={false} />
                            <ReferenceLine y={lastHistoryPrice} stroke="#64748b" strokeDasharray="3 3" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

// =============================================
// MAIN COMPONENT
// =============================================
export default function DataAnalysisPage() {
    // State Management
    const [predictionData, setPredictionData] = useState<MultiTimeframeData | null>(null);
    const [goldData, setGoldData] = useState<GoldPriceData | null>(null);
    const [worldGold, setWorldGold] = useState<WorldGoldPrice | null>(null);
    const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(null);
    const [loanRate, setLoanRate] = useState<LoanRateResponse | null>(null);
    const [loading, setLoading] = useState({
        gold: true,
        worldGold: true,
        exchange: true,
        loan: true
    });
    const [isSimulating, setIsSimulating] = useState(false);

    // Fetch Functions
    const fetchGoldPrice = async () => {
        setLoading(prev => ({ ...prev, gold: true }));
        try {
            const response = await fetch("/api/gold-price");
            if (response.ok) {
                const data = await response.json();
                setGoldData(data);
            }
        } catch (err) {
            console.error("Error fetching gold price:", err);
        } finally {
            setLoading(prev => ({ ...prev, gold: false }));
        }
    };

    const fetchWorldGold = async () => {
        setLoading(prev => ({ ...prev, worldGold: true }));
        try {
            const response = await fetch("/api/gold-world");
            if (response.ok) {
                const data = await response.json();
                setWorldGold(data);
            }
        } catch (err) {
            console.error("Error fetching world gold:", err);
        } finally {
            setLoading(prev => ({ ...prev, worldGold: false }));
        }
    };

    const fetchExchangeRate = async () => {
        setLoading(prev => ({ ...prev, exchange: true }));
        try {
            const response = await fetch("/api/exchange-rate");
            if (response.ok) {
                const data = await response.json();
                setExchangeRate(data);
            }
        } catch (err) {
            console.error("Error fetching exchange rate:", err);
        } finally {
            setLoading(prev => ({ ...prev, exchange: false }));
        }
    };

    const fetchLoanRate = async () => {
        setLoading(prev => ({ ...prev, loan: true }));
        try {
            const response = await fetch("/api/loan-rate?type=average");
            if (response.ok) {
                const data = await response.json();
                setLoanRate(data);
            }
        } catch (err) {
            console.error("Error fetching loan rate:", err);
        } finally {
            setLoading(prev => ({ ...prev, loan: false }));
        }
    };

    const handleRegenerate = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setPredictionData(generateMultiFrameData());
            setIsSimulating(false);
        }, 600);
    };

    const refreshAllData = () => {
        fetchGoldPrice();
        fetchWorldGold();
        fetchExchangeRate();
        fetchLoanRate();
        handleRegenerate();
    };

    useEffect(() => {
        setPredictionData(generateMultiFrameData());
        fetchGoldPrice();
        fetchWorldGold();
        fetchExchangeRate();
        fetchLoanRate();
    }, []);

    const currencies = exchangeRate?.currencies.filter((c) => MAIN_CURRENCIES.includes(c.currencyId)) || [];
    const thaiBank = loanRate?.data.thai_commercial_banks_avg;

    return (
        <div className="flex flex-col gap-8 p-6 min-h-screen bg-slate-50/30">
            {/* =============================================
                HEADER SECTION 
            ============================================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 bg-white p-6 rounded-xl shadow-sm border-slate-100">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            <Database className="mr-1 h-3 w-3" />
                            Data Analytics Platform
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        รวบรวมและจัดเตรียมข้อมูล (Data Collection & Analysis)
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                        ระบบรวบรวมข้อมูลสำหรับการวิเคราะห์และพยากรณ์ราคาทองคำ สำหรับ สธค.
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={refreshAllData} disabled={isSimulating}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isSimulating ? "animate-spin" : ""}`} />
                    รีเฟรชข้อมูลทั้งหมด
                </Button>
            </div>

            {/* =============================================
                SECTION 1: DATA COLLECTION & PREPARATION
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600">
                        <Database className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            รวบรวมและจัดเตรียมข้อมูล (Data Collection & Preparation)
                        </h2>
                        <p className="text-sm text-slate-500">แหล่งข้อมูลทั้งภายในและภายนอกองค์กร</p>
                    </div>
                </div>

                <Tabs defaultValue="internal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="internal">ข้อมูลภายใน (Internal)</TabsTrigger>
                        <TabsTrigger value="external">ข้อมูลภายนอก (External)</TabsTrigger>
                    </TabsList>

                    {/* Internal Data Tab */}
                    <TabsContent value="internal" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* ข้อมูลประวัติการรับจำนำย้อนหลัง */}
                            <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                                        <Receipt className="h-4 w-4" />
                                        ประวัติการรับจำนำ
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-blue-900">124,502</div>
                                    <p className="text-xs text-blue-600 mt-1">รายการย้อนหลัง 5 ปี</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs text-slate-500">Connected</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* ข้อมูลราคาทองคำและทรัพย์สินอื่นๆ */}
                            <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-amber-700 flex items-center gap-2">
                                        <Gem className="h-4 w-4" />
                                        ราคาทองคำ & ทรัพย์สิน
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-amber-900">48,250</div>
                                    <p className="text-xs text-amber-600 mt-1">รายการทรัพย์สินทั้งหมด</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs text-slate-500">Real-time</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* ข้อมูลการไถ่ถอนและหลุดจำนำ */}
                            <Card className="border-green-200 bg-linear-to-br from-green-50 to-white">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4" />
                                        ไถ่ถอน/หลุดจำนำ
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-green-700">87%</span>
                                        <span className="text-lg text-red-500">13%</span>
                                    </div>
                                    <p className="text-xs text-green-600 mt-1">อัตราไถ่ถอน / หลุดจำนำ</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs text-slate-500">Updated Daily</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* ข้อมูลปัจจัยภายนอกที่เกี่ยวข้อง */}
                            <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                                        <Globe className="h-4 w-4" />
                                        ปัจจัยภายนอก
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-purple-900">12</div>
                                    <p className="text-xs text-purple-600 mt-1">ตัวแปรที่ติดตาม</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs text-slate-500">API Integrated</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts for Internal Data */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            {/* Pawn History Chart */}
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <Receipt className="h-5 w-5 text-blue-500" />
                                        ประวัติการรับจำนำย้อนหลัง 6 เดือน
                                    </CardTitle>
                                    <CardDescription>จำนวนรายการและมูลค่ารวม (ล้านบาท)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={PAWN_HISTORY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                                <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                                                <YAxis yAxisId="left" fontSize={11} tickLine={false} axisLine={false} />
                                                <YAxis yAxisId="right" orientation="right" fontSize={11} tickLine={false} axisLine={false} />
                                                <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '12px' }} />
                                                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                                <Bar yAxisId="left" dataKey="count" name="จำนวนรายการ" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                                <Line yAxisId="right" type="monotone" dataKey="amount" name="มูลค่า (ล้านบาท)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Assets in Custody */}
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <Package className="h-5 w-5 text-amber-500" />
                                        ทรัพย์สินที่อยู่ในครอบครอง
                                    </CardTitle>
                                    <CardDescription>สัดส่วนทรัพย์สินแยกตามประเภท</CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-center justify-between">
                                    <div className="h-[200px] w-1/2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={ASSET_DISTRIBUTION_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                                                    {ASSET_DISTRIBUTION_DATA.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="w-1/2 space-y-2">
                                        {ASSET_DISTRIBUTION_DATA.map((item) => (
                                            <div key={item.name} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                    <span className="text-slate-600">{item.name}</span>
                                                </div>
                                                <span className="font-bold text-slate-800">{item.value}%</span>
                                            </div>
                                        ))}
                                        <div className="pt-2 border-t mt-2">
                                            <p className="text-xs text-slate-500">
                                                *ความเสี่ยงกระจุกตัวสูงที่ทองคำ (75%)
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* External Data Tab */}
                    <TabsContent value="external" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Domestic Data Sources */}
                            <Card className="border-slate-200 lg:col-span-2">
                                <CardHeader className="border-b bg-slate-50/50">
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <Landmark className="h-5 w-5 text-blue-500" />
                                        ข้อมูลภายในประเทศ (Domestic Data)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y">
                                        {/* Thai Gold Price */}
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-medium text-slate-700 flex items-center gap-2">
                                                    <span className="text-amber-500">฿</span>
                                                    ราคาทองคำจากสมาคมค้าทองคำแห่งประเทศไทย
                                                </h4>
                                                <Button variant="ghost" size="icon" onClick={fetchGoldPrice} className="h-8 w-8">
                                                    <RefreshCw className={`h-4 w-4 ${loading.gold ? "animate-spin" : ""}`} />
                                                </Button>
                                            </div>
                                            {loading.gold ? (
                                                <Skeleton className="h-24 w-full" />
                                            ) : goldData ? (
                                                <div className="grid grid-cols-2 gap-4">
                                                    {goldData.data.map((item, index) => (
                                                        <div key={index} className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                                                            <p className="text-xs text-amber-600 mb-1">{item.name}</p>
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    <p className="text-xs text-slate-500">รับซื้อ</p>
                                                                    <p className="font-bold text-slate-800">{item.buy}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-xs text-slate-500">ขายออก</p>
                                                                    <p className="font-bold text-amber-600">{item.sell}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="col-span-2 text-xs text-slate-400 flex items-center gap-2">
                                                        <Clock className="h-3 w-3" />
                                                        อัพเดท: {goldData.date} {goldData.updateTime}
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-500">ไม่สามารถโหลดข้อมูลได้</p>
                                            )}
                                        </div>

                                        {/* Exchange Rate */}
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-medium text-slate-700 flex items-center gap-2">
                                                    <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                                                    อัตราแลกเปลี่ยน USD/THB จาก ธปท.
                                                </h4>
                                                <Button variant="ghost" size="icon" onClick={fetchExchangeRate} className="h-8 w-8">
                                                    <RefreshCw className={`h-4 w-4 ${loading.exchange ? "animate-spin" : ""}`} />
                                                </Button>
                                            </div>
                                            {loading.exchange ? (
                                                <Skeleton className="h-20 w-full" />
                                            ) : exchangeRate ? (
                                                <div className="space-y-2">
                                                    {currencies.slice(0, 3).map((currency) => (
                                                        <div key={currency.currencyId} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xl">{currencyFlags[currency.currencyId]}</span>
                                                                <div>
                                                                    <span className="font-medium text-sm">{currency.currencyId}</span>
                                                                    <span className="text-xs text-slate-400 ml-2">{currencyNames[currency.currencyId]}</span>
                                                                </div>
                                                            </div>
                                                            <span className="font-bold text-slate-800 font-mono">฿{parseFloat(currency.midRate).toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-2">
                                                        <Clock className="h-3 w-3" />
                                                        ข้อมูล ณ วันที่ {exchangeRate.period}
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-500">ไม่สามารถโหลดข้อมูลได้</p>
                                            )}
                                        </div>

                                        {/* Interest Rate */}
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-medium text-slate-700 flex items-center gap-2">
                                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                                    อัตราดอกเบี้ยและอัตราเงินเฟ้อ
                                                </h4>
                                                <Button variant="ghost" size="icon" onClick={fetchLoanRate} className="h-8 w-8">
                                                    <RefreshCw className={`h-4 w-4 ${loading.loan ? "animate-spin" : ""}`} />
                                                </Button>
                                            </div>
                                            {loading.loan ? (
                                                <Skeleton className="h-16 w-full" />
                                            ) : thaiBank ? (
                                                <div className="grid grid-cols-4 gap-3">
                                                    <div className="bg-green-50 rounded-lg p-2 text-center border border-green-100">
                                                        <p className="text-xs text-green-600">MOR</p>
                                                        <p className="font-bold text-green-800">{thaiBank.mor?.toFixed(2)}%</p>
                                                    </div>
                                                    <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-100">
                                                        <p className="text-xs text-blue-600">MLR</p>
                                                        <p className="font-bold text-blue-800">{thaiBank.mlr?.toFixed(2)}%</p>
                                                    </div>
                                                    <div className="bg-purple-50 rounded-lg p-2 text-center border border-purple-100">
                                                        <p className="text-xs text-purple-600">MRR</p>
                                                        <p className="font-bold text-purple-800">{thaiBank.mrr?.toFixed(2)}%</p>
                                                    </div>
                                                    <div className="bg-amber-50 rounded-lg p-2 text-center border border-amber-100">
                                                        <p className="text-xs text-amber-600">เงินเฟ้อ</p>
                                                        <p className="font-bold text-amber-800">1.23%</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-500">ไม่สามารถโหลดข้อมูลได้</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Global Market Data */}
                            <Card className="border-slate-200">
                                <CardHeader className="border-b bg-slate-50/50">
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <Globe className="h-5 w-5 text-sky-500" />
                                        ข้อมูลตลาดโลก (Global Market)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-4">
                                    {/* World Gold Price */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium text-slate-600">ราคาทองตลาดโลก (XAU/USD)</h4>
                                            <Button variant="ghost" size="icon" onClick={fetchWorldGold} className="h-6 w-6">
                                                <RefreshCw className={`h-3 w-3 ${loading.worldGold ? "animate-spin" : ""}`} />
                                            </Button>
                                        </div>
                                        {loading.worldGold ? (
                                            <Skeleton className="h-24 w-full" />
                                        ) : worldGold ? (
                                            <div className="bg-linear-to-br from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <p className="text-2xl font-bold text-slate-800">
                                                            ${worldGold.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                                        </p>
                                                        <p className="text-xs text-slate-500">ต่อออนซ์</p>
                                                    </div>
                                                    <div className={`flex items-center gap-1 ${worldGold.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                                                        {worldGold.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                                        <span className="font-semibold">{worldGold.change >= 0 ? "+" : ""}{worldGold.change.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div className="bg-white/50 rounded p-2">
                                                        <p className="text-slate-500">สูงสุด 24h</p>
                                                        <p className="font-medium text-sky-600">${worldGold.high24h.toFixed(2)}</p>
                                                    </div>
                                                    <div className="bg-white/50 rounded p-2">
                                                        <p className="text-slate-500">ต่ำสุด 24h</p>
                                                        <p className="font-medium text-blue-600">${worldGold.low24h.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-500">ไม่สามารถโหลดข้อมูลได้</p>
                                        )}
                                    </div>

                                    {/* Global Forecast Index */}
                                    <div className="bg-slate-50 rounded-lg p-3 border">
                                        <h4 className="text-sm font-medium text-slate-600 mb-2">ราคาคาดการณ์ทองโลก</h4>
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">1 สัปดาห์</span>
                                                <span className="font-medium text-green-600">$2,680 (+0.8%)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">1 เดือน</span>
                                                <span className="font-medium text-green-600">$2,720 (+2.3%)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">3 เดือน</span>
                                                <span className="font-medium text-amber-600">$2,650 (-0.4%)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* FED/USD Info */}
                                    <div className="bg-slate-50 rounded-lg p-3 border">
                                        <h4 className="text-sm font-medium text-slate-600 mb-2">FED Rates / USD Index</h4>
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Federal Funds Rate</span>
                                                <span className="font-medium">4.50%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">DXY (USD Index)</span>
                                                <span className="font-medium">104.25</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            {/* =============================================
                SECTION 2: DATA ANALYSIS
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-600">
                        <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                         การวิเคราะห์ข้อมูล (Data Analysis)
                        </h2>
                        <p className="text-sm text-slate-500">วิเคราะห์ทรัพย์สินและแนวโน้มการหลุดจำนำ</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* ทรัพย์สินในครอบครอง */}
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                <Package className="h-5 w-5 text-amber-500" />
                                วิเคราะห์ทรัพย์สินที่อยู่ในครอบครองของ สธค.
                            </CardTitle>
                            <CardDescription>Portfolio Mix Analysis - ความเสี่ยงกระจุกตัว</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="h-[200px] w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={ASSET_DISTRIBUTION_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                                            {ASSET_DISTRIBUTION_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-1/2 space-y-2">
                                {ASSET_DISTRIBUTION_DATA.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{item.value}%</span>
                                    </div>
                                ))}
                                <div className="pt-3 border-t mt-3">
                                    <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>ความเสี่ยงกระจุกตัวสูงที่ทองคำ (75%)</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* แนวโน้มการหลุดจำนำ */}
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-blue-500" />
                                วิเคราะห์แนวโน้มการหลุดจำนำในช่วงเวลาต่างๆ
                            </CardTitle>
                            <CardDescription>Redemption vs Default Rate - 6 เดือนย้อนหลัง</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={REDEMPTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                        <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={11} tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '6px', fontSize: '12px' }} />
                                        <Legend fontSize={10} wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                        <Bar dataKey="redeemed" name="ไถ่ถอนคืน (%)" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="default" name="หลุดจำนำ (%)" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                                <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                                    <p className="text-2xl font-bold text-green-700">86.8%</p>
                                    <p className="text-xs text-green-600">อัตราไถ่ถอนเฉลี่ย</p>
                                </div>
                                <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                                    <p className="text-2xl font-bold text-red-600">13.2%</p>
                                    <p className="text-xs text-red-500">อัตราหลุดจำนำเฉลี่ย</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* =============================================
                SECTION 3: DATA SOURCES FOR GOLD PREDICTION
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-600">
                        <BrainCircuit className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                        แหล่งข้อมูลสำหรับการคาดการณ์ราคาทองคำ (Data Sources for Gold Price Prediction)
                        </h2>
                        <p className="text-sm text-slate-500">ระบบ AI ทำนายราคาทองคำแบบ Multi-Timeframe</p>
                    </div>
                </div>

                {/* Data Sources Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Domestic Data Summary */}
                    <Card className="border-blue-200 bg-blue-50/30">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2 text-blue-900">
                                <Landmark className="h-5 w-5 text-blue-500" />
                                ข้อมูลภายในประเทศ (Domestic Data)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    ราคาทองคำจากสมาคมค้าทองคำ
                                </span>
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">API</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    อัตราแลกเปลี่ยน USD/THB (ธปท.)
                                </span>
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">Daily</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    อัตราดอกเบี้ยและอัตราเงินเฟ้อ
                                </span>
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Monthly</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Global Data Summary */}
                    <Card className="border-sky-200 bg-sky-50/30">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2 text-sky-900">
                                <Globe className="h-5 w-5 text-sky-500" />
                                ข้อมูลตลาดโลก (Global Market Data)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    ราคาทองคำโลก (XAU/USD)
                                </span>
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">Real-time</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    ราคาคาดการณ์ราคาทอง
                                </span>
                                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Aggregated</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    FED Rates / DXY Index
                                </span>
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">Live</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Model Explanation */}
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-blue-200 bg-blue-50/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2 text-blue-900">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold">A</span>
                                ทำนายปัจจัยภายนอก (X7–X10)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-slate-700 space-y-2">
                            <p className="font-medium text-blue-900">ใช้โมเดล AutoReg (AR) ทำนาย:</p>
                            <ul className="space-y-1 ml-4 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <span><strong>X10:</strong> ราคาทองตลาดโลก (Global Gold Price)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <span><strong>X8:</strong> อัตราแลกเปลี่ยน USD/THB</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <span><strong>X9:</strong> อัตราดอกเบี้ย</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2 text-green-900">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold">B</span>
                                ทำนายราคาทองด้วย ARIMAX
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-slate-700 space-y-2">
                            <p className="font-medium text-green-900">นำปัจจัยที่ทำนายได้มารวมกับ:</p>
                            <ul className="space-y-1 ml-4 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>ราคาทองย้อนหลัง (Historical Data)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span><strong>RSI</strong> - วัดแรงซื้อแรงขาย</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span><strong>MACD/Signal</strong> - ดูแนวโน้มกำลังกลับตัว</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Prediction Charts */}
                {predictionData && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-slate-700">ผลการทำนายราคาทองคำ (Blind Forecast)</h3>
                            <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isSimulating}>
                                <RefreshCw className={`mr-2 h-4 w-4 ${isSimulating ? "animate-spin" : ""}`} />
                                Update Model
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                            <ForecastChart
                                title={predictionData.daily.title}
                                mae={predictionData.daily.mae}
                                data={predictionData.daily.data}
                                lastHistoryPrice={predictionData.daily.lastHistoryPrice}
                            />
                            <ForecastChart
                                title={predictionData.weekly.title}
                                mae={predictionData.weekly.mae}
                                data={predictionData.weekly.data}
                                lastHistoryPrice={predictionData.weekly.lastHistoryPrice}
                            />
                            <ForecastChart
                                title={predictionData.monthly.title}
                                mae={predictionData.monthly.mae}
                                data={predictionData.monthly.data}
                                lastHistoryPrice={predictionData.monthly.lastHistoryPrice}
                            />
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
