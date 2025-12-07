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
    PieChart,
    Pie,
    Cell,
    Bar
} from "recharts";
import {
    RefreshCw,
    Database,
    Globe,
    Landmark,
    ArrowRightLeft,
    Gem,
    Receipt,
    Package,
    Clock,
    CheckCircle2,
    TrendingUp,
    TrendingDown,
    Calendar,
    ShoppingBag,
    AlertTriangle,
    Building2,
    Percent,
    BarChart3,
    Sun,
    Snowflake,
    Leaf,
    Flame
} from "lucide-react";

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

// Sample Data
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

const SEASONAL_BUYING_DATA = [
    { season: 'ตรุษจีน', icon: '🧧', goldDemand: 95, period: 'ม.ค.-ก.พ.' },
    { season: 'สงกรานต์', icon: '💦', goldDemand: 70, period: 'เม.ย.' },
    { season: 'วันแม่', icon: '💐', goldDemand: 85, period: 'ส.ค.' },
    { season: 'ปีใหม่', icon: '🎊', goldDemand: 90, period: 'ธ.ค.' },
];

// =============================================
// MAIN COMPONENT
// =============================================
export default function DataAnalysisPage() {
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
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchGoldPrice = async () => {
        setLoading(prev => ({ ...prev, gold: true }));
        try {
            const response = await fetch("/api/gold-price");
            if (response.ok) setGoldData(await response.json());
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
            if (response.ok) setWorldGold(await response.json());
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
            if (response.ok) setExchangeRate(await response.json());
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
            if (response.ok) setLoanRate(await response.json());
        } catch (err) {
            console.error("Error fetching loan rate:", err);
        } finally {
            setLoading(prev => ({ ...prev, loan: false }));
        }
    };

    const refreshAllData = () => {
        setIsRefreshing(true);
        Promise.all([fetchGoldPrice(), fetchWorldGold(), fetchExchangeRate(), fetchLoanRate()])
            .finally(() => setIsRefreshing(false));
    };

    useEffect(() => {
        fetchGoldPrice();
        fetchWorldGold();
        fetchExchangeRate();
        fetchLoanRate();
    }, []);

    const currencies = exchangeRate?.currencies.filter((c) => MAIN_CURRENCIES.includes(c.currencyId)) || [];
    const thaiBank = loanRate?.data.thai_commercial_banks_avg;

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
                            <Database className="mr-1.5 h-3 w-3" />
                            Data Collection Platform
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">รวบรวมข้อมูล</h1>
                    <p className="text-sm text-slate-500 mt-0.5">ศูนย์รวมข้อมูลสำหรับการวิเคราะห์และคาดการณ์</p>
                </div>
                <Button variant="outline" size="sm" onClick={refreshAllData} disabled={isRefreshing}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    รีเฟรชข้อมูล
                </Button>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="collection" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto bg-slate-100 p-1">
                    <TabsTrigger value="collection" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-white">
                        <Database className="mr-2 h-4 w-4" />
                        รวบรวมและจัดเตรียมข้อมูล
                    </TabsTrigger>
                    <TabsTrigger value="gold-sources" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-white">
                        <Gem className="mr-2 h-4 w-4" />
                        แหล่งข้อมูลคาดการณ์ราคาทอง
                    </TabsTrigger>
                </TabsList>

                {/* TAB 1: รวบรวมและจัดเตรียมข้อมูล */}
                <TabsContent value="collection" className="mt-6 space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-blue-700 flex items-center gap-2">
                                    <Receipt className="h-4 w-4" />ประวัติการรับจำนำ
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-900">124,502</div>
                                <p className="text-xs text-blue-600 mt-1">รายการย้อนหลัง 5 ปี</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-slate-500">Connected</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-amber-700 flex items-center gap-2">
                                    <Gem className="h-4 w-4" />ราคาทองคำ & ทรัพย์สิน
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-amber-900">48,250</div>
                                <p className="text-xs text-amber-600 mt-1">รายการทรัพย์สินทั้งหมด</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-slate-500">Real-time</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-green-700 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />ไถ่ถอน / หลุดจำนำ
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-green-700">87%</span>
                                    <span className="text-lg text-red-500">13%</span>
                                </div>
                                <p className="text-xs text-green-600 mt-1">อัตราไถ่ถอน / หลุดจำนำ</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-slate-500">Updated Daily</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-purple-700 flex items-center gap-2">
                                    <Globe className="h-4 w-4" />ปัจจัยภายนอก
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-purple-900">12</div>
                                <p className="text-xs text-purple-600 mt-1">ตัวแปรที่ติดตาม</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-slate-500">API Integrated</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Receipt className="h-4 w-4 text-blue-500" />ประวัติการรับจำนำย้อนหลัง 6 เดือน
                                </CardTitle>
                                <CardDescription className="text-xs">จำนวนรายการและมูลค่ารวม (ล้านบาท)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[220px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={PAWN_HISTORY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                            <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="left" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="right" orientation="right" fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                                            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                            <Bar yAxisId="left" dataKey="count" name="จำนวนรายการ" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                            <Line yAxisId="right" type="monotone" dataKey="amount" name="มูลค่า (ล้านบาท)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Package className="h-4 w-4 text-amber-500" />ทรัพย์สินที่อยู่ในครอบครอง
                                </CardTitle>
                                <CardDescription className="text-xs">สัดส่วนทรัพย์สินแยกตามประเภท</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className="h-[180px] w-1/2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={ASSET_DISTRIBUTION_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="value">
                                                {ASSET_DISTRIBUTION_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-1/2 space-y-2">
                                    {ASSET_DISTRIBUTION_DATA.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                <span className="text-slate-600">{item.name}</span>
                                            </div>
                                            <span className="font-bold text-slate-800">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-green-500" />อัตราการไถ่ถอนและหลุดจำนำรายเดือน
                            </CardTitle>
                            <CardDescription className="text-xs">เปรียบเทียบอัตราการไถ่ถอนกับหลุดจำนำ (%)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={REDEMPTION_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                        <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                        <Bar dataKey="redeemed" name="ไถ่ถอน (%)" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="a" />
                                        <Bar dataKey="default" name="หลุดจำนำ (%)" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 2: แหล่งข้อมูลสำหรับการคาดการณ์ราคาทองคำ */}
                <TabsContent value="gold-sources" className="mt-6 space-y-6">
                    <Tabs defaultValue="domestic" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-1 bg-slate-100 p-1">
                            <TabsTrigger value="domestic" className="text-xs py-2 data-[state=active]:bg-white">
                                <Landmark className="mr-1.5 h-3.5 w-3.5" />ข้อมูลในประเทศ
                            </TabsTrigger>
                            <TabsTrigger value="global-market" className="text-xs py-2 data-[state=active]:bg-white">
                                <Globe className="mr-1.5 h-3.5 w-3.5" />ตลาดโลก
                            </TabsTrigger>
                            <TabsTrigger value="global-economic" className="text-xs py-2 data-[state=active]:bg-white">
                                <TrendingUp className="mr-1.5 h-3.5 w-3.5" />เศรษฐกิจโลก
                            </TabsTrigger>
                            <TabsTrigger value="seasonal" className="text-xs py-2 data-[state=active]:bg-white">
                                <Calendar className="mr-1.5 h-3.5 w-3.5" />ฤดูกาล & พฤติกรรม
                            </TabsTrigger>
                        </TabsList>

                        {/* Domestic Data */}
                        <TabsContent value="domestic" className="mt-4 space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Card className="border-amber-200 shadow-sm">
                                    <CardHeader className="pb-3 bg-amber-50/50 border-b border-amber-100">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
                                                <span className="text-lg">🏆</span>ราคาทองคำ - สมาคมค้าทองคำฯ
                                            </CardTitle>
                                            <Button variant="ghost" size="icon" onClick={fetchGoldPrice} className="h-7 w-7">
                                                <RefreshCw className={`h-3.5 w-3.5 ${loading.gold ? "animate-spin" : ""}`} />
                                            </Button>
                                        </div>
                                        <CardDescription className="text-xs">Gold Traders Association of Thailand</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        {loading.gold ? (
                                            <Skeleton className="h-32 w-full" />
                                        ) : goldData ? (
                                            <div className="space-y-3">
                                                {goldData.data.map((item, index) => (
                                                    <div key={index} className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                                                        <p className="text-xs text-amber-600 mb-2 font-medium">{item.name}</p>
                                                        <div className="flex justify-between">
                                                            <div><p className="text-xs text-slate-500">รับซื้อ</p><p className="font-bold text-slate-800">{item.buy}</p></div>
                                                            <div className="text-right"><p className="text-xs text-slate-500">ขายออก</p><p className="font-bold text-amber-600">{item.sell}</p></div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="text-xs text-slate-400 flex items-center gap-2 pt-2 border-t">
                                                    <Clock className="h-3 w-3" />อัพเดท: {goldData.date} {goldData.updateTime}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-slate-500 text-sm">ไม่สามารถโหลดข้อมูลได้</div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="border-blue-200 shadow-sm">
                                    <CardHeader className="pb-3 bg-blue-50/50 border-b border-blue-100">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                                                <ArrowRightLeft className="h-4 w-4" />อัตราแลกเปลี่ยน USD/THB
                                            </CardTitle>
                                            <Button variant="ghost" size="icon" onClick={fetchExchangeRate} className="h-7 w-7">
                                                <RefreshCw className={`h-3.5 w-3.5 ${loading.exchange ? "animate-spin" : ""}`} />
                                            </Button>
                                        </div>
                                        <CardDescription className="text-xs">Bank of Thailand</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        {loading.exchange ? (
                                            <Skeleton className="h-32 w-full" />
                                        ) : currencies.length > 0 ? (
                                            <div className="space-y-2">
                                                {currencies.map((currency) => (
                                                    <div key={currency.currencyId} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg">{currencyFlags[currency.currencyId]}</span>
                                                            <div>
                                                                <span className="font-medium text-sm">{currency.currencyId}</span>
                                                                <p className="text-xs text-slate-500">{currencyNames[currency.currencyId]}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-blue-600">{currency.midRate}</p>
                                                            <p className="text-xs text-slate-500">THB</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="text-xs text-slate-400 flex items-center gap-2 pt-2 border-t">
                                                    <Clock className="h-3 w-3" />อัพเดท: {exchangeRate?.lastUpdated}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-slate-500 text-sm">ไม่สามารถโหลดข้อมูลได้</div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="border-green-200 shadow-sm">
                                <CardHeader className="pb-3 bg-green-50/50 border-b border-green-100">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
                                            <Percent className="h-4 w-4" />อัตราดอกเบี้ยและอัตราเงินเฟ้อ
                                        </CardTitle>
                                        <Button variant="ghost" size="icon" onClick={fetchLoanRate} className="h-7 w-7">
                                            <RefreshCw className={`h-3.5 w-3.5 ${loading.loan ? "animate-spin" : ""}`} />
                                        </Button>
                                    </div>
                                    <CardDescription className="text-xs">Interest Rates & Inflation</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    {loading.loan ? (
                                        <Skeleton className="h-24 w-full" />
                                    ) : thaiBank ? (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
                                                <p className="text-xs text-green-600 mb-1">MLR</p>
                                                <p className="text-xl font-bold text-green-700">{thaiBank.mlr?.toFixed(2) || '-'}%</p>
                                                <p className="text-xs text-slate-500 mt-1">Min Loan Rate</p>
                                            </div>
                                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-center">
                                                <p className="text-xs text-blue-600 mb-1">MRR</p>
                                                <p className="text-xl font-bold text-blue-700">{thaiBank.mrr?.toFixed(2) || '-'}%</p>
                                                <p className="text-xs text-slate-500 mt-1">Min Retail Rate</p>
                                            </div>
                                            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-center">
                                                <p className="text-xs text-amber-600 mb-1">MOR</p>
                                                <p className="text-xl font-bold text-amber-700">{thaiBank.mor?.toFixed(2) || '-'}%</p>
                                                <p className="text-xs text-slate-500 mt-1">Min Overdraft Rate</p>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 text-center">
                                                <p className="text-xs text-purple-600 mb-1">เงินเฟ้อ</p>
                                                <p className="text-xl font-bold text-purple-700">2.15%</p>
                                                <p className="text-xs text-slate-500 mt-1">CPI (Est.)</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-slate-500 text-sm">ไม่สามารถโหลดข้อมูลได้</div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Global Market */}
                        <TabsContent value="global-market" className="mt-4 space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Card className="border-amber-200 shadow-sm">
                                    <CardHeader className="pb-3 bg-amber-50/50 border-b border-amber-100">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
                                                <Globe className="h-4 w-4" />ราคาทองคำโลก (XAU/USD)
                                            </CardTitle>
                                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1.5"></div>Real-time
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-xs">World Gold Spot Price</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        {loading.worldGold ? (
                                            <Skeleton className="h-32 w-full" />
                                        ) : worldGold ? (
                                            <div className="space-y-4">
                                                <div className="flex items-baseline gap-3">
                                                    <span className="text-3xl font-bold text-amber-600">${worldGold.price.toLocaleString()}</span>
                                                    <Badge variant="outline" className={`text-xs ${worldGold.change >= 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                        {worldGold.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                                        {worldGold.change >= 0 ? '+' : ''}{worldGold.change.toFixed(2)} ({worldGold.changePercent.toFixed(2)}%)
                                                    </Badge>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-green-50 rounded-lg p-2.5 border border-green-100">
                                                        <p className="text-xs text-green-600">High 24h</p>
                                                        <p className="font-bold text-green-700">${worldGold.high24h.toLocaleString()}</p>
                                                    </div>
                                                    <div className="bg-red-50 rounded-lg p-2.5 border border-red-100">
                                                        <p className="text-xs text-red-600">Low 24h</p>
                                                        <p className="font-bold text-red-700">${worldGold.low24h.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-slate-500 text-sm">ไม่สามารถโหลดข้อมูลได้</div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="border-purple-200 shadow-sm">
                                    <CardHeader className="pb-3 bg-purple-50/50 border-b border-purple-100">
                                        <CardTitle className="text-sm font-medium text-purple-800 flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" />ราคาคาดการณ์ราคาทองคำโลก
                                        </CardTitle>
                                        <CardDescription className="text-xs">Gold Price Forecasts (Aggregated)</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                                                <span className="text-sm text-slate-600">1 สัปดาห์</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-800">$2,685</span>
                                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">+1.2%</Badge>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                                                <span className="text-sm text-slate-600">1 เดือน</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-800">$2,720</span>
                                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">+2.5%</Badge>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                                                <span className="text-sm text-slate-600">3 เดือน</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-800">$2,800</span>
                                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">+5.5%</Badge>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-400 pt-2 border-t">* ข้อมูลจาก Bloomberg, Reuters, World Gold Council</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Global Economic */}
                        <TabsContent value="global-economic" className="mt-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-blue-200 shadow-sm">
                                    <CardHeader className="pb-3 bg-blue-50/50 border-b border-blue-100">
                                        <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                                            <Building2 className="h-4 w-4" />เศรษฐกิจและการเติบโต
                                        </CardTitle>
                                        <CardDescription className="text-xs">Economic Growth / Slowdown</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4 space-y-3">
                                        {[
                                            { flag: '🇺🇸', name: 'สหรัฐอเมริกา (GDP)', rate: '+2.8%', color: 'green', width: '75%' },
                                            { flag: '🇨🇳', name: 'จีน (GDP)', rate: '+4.9%', color: 'amber', width: '65%' },
                                            { flag: '🇪🇺', name: 'ยุโรป (GDP)', rate: '+0.4%', color: 'red', width: '25%' },
                                            { flag: '🇹🇭', name: 'ไทย (GDP)', rate: '+2.5%', color: 'green', width: '55%' },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-slate-50 rounded-lg p-3 border">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium">{item.flag} {item.name}</span>
                                                    <Badge variant="outline" className={`text-xs bg-${item.color}-50 text-${item.color}-700`}>{item.rate}</Badge>
                                                </div>
                                                <div className="w-full bg-slate-200 rounded-full h-2">
                                                    <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{ width: item.width }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-red-200 shadow-sm">
                                    <CardHeader className="pb-3 bg-red-50/50 border-b border-red-100">
                                        <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4" />วิกฤตการเมืองระหว่างประเทศ
                                        </CardTitle>
                                        <CardDescription className="text-xs">Geopolitical Tensions</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4 space-y-3">
                                        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                                            <div className="flex items-start gap-2">
                                                <span className="text-red-500 mt-0.5">⚠️</span>
                                                <div>
                                                    <p className="font-medium text-sm text-red-800">ความขัดแย้งรัสเซีย-ยูเครน</p>
                                                    <p className="text-xs text-red-600 mt-1">ระดับความเสี่ยง: สูง</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                                            <div className="flex items-start gap-2">
                                                <span className="text-amber-500 mt-0.5">⚡</span>
                                                <div>
                                                    <p className="font-medium text-sm text-amber-800">ความตึงเครียดตะวันออกกลาง</p>
                                                    <p className="text-xs text-amber-600 mt-1">ระดับความเสี่ยง: ปานกลาง-สูง</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                            <div className="flex items-start gap-2">
                                                <span className="text-blue-500 mt-0.5">📊</span>
                                                <div>
                                                    <p className="font-medium text-sm text-blue-800">สงครามการค้าสหรัฐ-จีน</p>
                                                    <p className="text-xs text-blue-600 mt-1">ระดับความเสี่ยง: ปานกลาง</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 pt-2 border-t">* วิกฤตการเมืองมักส่งผลให้ราคาทองคำสูงขึ้น (Safe Haven)</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Seasonal */}
                        <TabsContent value="seasonal" className="mt-4 space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Card className="border-orange-200 shadow-sm">
                                    <CardHeader className="pb-3 bg-orange-50/50 border-b border-orange-100">
                                        <CardTitle className="text-sm font-medium text-orange-800 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />ช่วงเทศกาลสำคัญ
                                        </CardTitle>
                                        <CardDescription className="text-xs">Seasonal Festivals Impact on Gold Demand</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4 space-y-3">
                                        {SEASONAL_BUYING_DATA.map((item, index) => (
                                            <div key={index} className="bg-slate-50 rounded-lg p-3 border">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium flex items-center gap-2">
                                                        <span>{item.icon}</span>{item.season}
                                                    </span>
                                                    <Badge variant="outline" className="text-xs bg-slate-100">{item.period}</Badge>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                                                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${item.goldDemand}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-medium text-amber-700">{item.goldDemand}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-teal-200 shadow-sm">
                                    <CardHeader className="pb-3 bg-teal-50/50 border-b border-teal-100">
                                        <CardTitle className="text-sm font-medium text-teal-800 flex items-center gap-2">
                                            <ShoppingBag className="h-4 w-4" />พฤติกรรมการซื้อทองตามฤดูกาล
                                        </CardTitle>
                                        <CardDescription className="text-xs">Seasonal Buying Behavior</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4 space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
                                                <Leaf className="h-5 w-5 text-green-600 mx-auto mb-1" />
                                                <p className="text-xs text-green-600 font-medium">Q1 (ม.ค.-มี.ค.)</p>
                                                <p className="text-lg font-bold text-green-700">สูง</p>
                                                <p className="text-xs text-slate-500">ตรุษจีน, วาเลนไทน์</p>
                                            </div>
                                            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-center">
                                                <Sun className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                                                <p className="text-xs text-amber-600 font-medium">Q2 (เม.ย.-มิ.ย.)</p>
                                                <p className="text-lg font-bold text-amber-700">ปานกลาง</p>
                                                <p className="text-xs text-slate-500">สงกรานต์, แต่งงาน</p>
                                            </div>
                                            <div className="bg-red-50 rounded-lg p-3 border border-red-100 text-center">
                                                <Flame className="h-5 w-5 text-red-600 mx-auto mb-1" />
                                                <p className="text-xs text-red-600 font-medium">Q3 (ก.ค.-ก.ย.)</p>
                                                <p className="text-lg font-bold text-red-700">ต่ำ</p>
                                                <p className="text-xs text-slate-500">ช่วงเปิดเทอม</p>
                                            </div>
                                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-center">
                                                <Snowflake className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                                                <p className="text-xs text-blue-600 font-medium">Q4 (ต.ค.-ธ.ค.)</p>
                                                <p className="text-lg font-bold text-blue-700">สูงมาก</p>
                                                <p className="text-xs text-slate-500">ลอยกระทง, ปีใหม่</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 border mt-3">
                                            <p className="text-xs text-slate-600">
                                                <strong>💡 Insight:</strong> ความต้องการทองคำในไทยมักสูงสุดช่วง Q4 และ Q1 เนื่องจากเทศกาลสำคัญและการให้ของขวัญ
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </TabsContent>
            </Tabs>
        </div>
    );
}