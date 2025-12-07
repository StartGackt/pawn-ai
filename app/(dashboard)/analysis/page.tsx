"use client";

import { useState } from "react";
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
    BarChart,
    Bar,
    AreaChart,
    Area,
    RadialBarChart,
    RadialBar
} from "recharts";
import {
    RefreshCw,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    Calendar,
    Filter,
    Download,
    BarChart3,
    PieChartIcon,
    Activity,
    Banknote,
    Users,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Gem,
    Watch,
    Smartphone,
    Percent
} from "lucide-react";

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
// MAIN COMPONENT
// =============================================
export default function DataAnalysisOnlyPage() {
    const [timeRange, setTimeRange] = useState("6months");
    const [assetFilter, setAssetFilter] = useState("all");

    // Calculate summary stats
    const totalAssets = ASSET_DISTRIBUTION_DATA.reduce((sum, item) => sum + item.count, 0);
    const totalValue = ASSET_DISTRIBUTION_DATA.reduce((sum, item) => sum + item.amount, 0);
    const avgDefaultRate = MONTHLY_DEFAULT_TREND.reduce((sum, item) => sum + item.default, 0) / MONTHLY_DEFAULT_TREND.length;
    const avgRedemptionRate = MONTHLY_DEFAULT_TREND.reduce((sum, item) => sum + item.redeemed, 0) / MONTHLY_DEFAULT_TREND.length;

    return (
        <div className="flex flex-col gap-8 p-6 min-h-screen bg-slate-50/30">
            {/* =============================================
                HEADER SECTION 
            ============================================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 bg-white p-6 rounded-xl shadow-sm border-slate-100">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <BarChart3 className="mr-1 h-3 w-3" />
                            Data Analysis
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                     การวิเคราะห์ข้อมูล (Data Analysis)
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                        วิเคราะห์ทรัพย์สินที่อยู่ในครอบครอง และแนวโน้มการหลุดจำนำในช่วงเวลาต่างๆ
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[140px]">
                            <Calendar className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="ช่วงเวลา" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="3months">3 เดือน</SelectItem>
                            <SelectItem value="6months">6 เดือน</SelectItem>
                            <SelectItem value="1year">1 ปี</SelectItem>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* =============================================
                SUMMARY STATS
            ============================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-600 font-medium">ทรัพย์สินทั้งหมด</p>
                                <p className="text-3xl font-bold text-amber-900 mt-1">{totalAssets.toLocaleString()}</p>
                                <p className="text-xs text-amber-600 mt-1">รายการ</p>
                            </div>
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <Package className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-600 font-medium">มูลค่ารวม</p>
                                <p className="text-3xl font-bold text-blue-900 mt-1">{totalValue.toLocaleString()}</p>
                                <p className="text-xs text-blue-600 mt-1">ล้านบาท</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Banknote className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-linear-to-br from-green-50 to-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-600 font-medium">อัตราไถ่ถอน</p>
                                <p className="text-3xl font-bold text-green-700 mt-1">{avgRedemptionRate.toFixed(1)}%</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-600">+2.1% จากเดือนก่อน</span>
                                </div>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-red-200 bg-linear-to-br from-red-50 to-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-600 font-medium">อัตราหลุดจำนำ</p>
                                <p className="text-3xl font-bold text-red-600 mt-1">{avgDefaultRate.toFixed(1)}%</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <ArrowDownRight className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-600">-1.5% จากเดือนก่อน</span>
                                </div>
                            </div>
                            <div className="p-3 bg-red-100 rounded-xl">
                                <XCircle className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* =============================================
                SECTION 1: วิเคราะห์ทรัพย์สินที่อยู่ในครอบครอง
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-600">
                        <Package className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            วิเคราะห์ทรัพย์สินที่อยู่ในครอบครองของ สธค.
                        </h2>
                        <p className="text-sm text-slate-500">Portfolio Analysis & Risk Assessment</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* สัดส่วนทรัพย์สิน */}
                    <Card className="border-slate-200 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                <PieChartIcon className="h-5 w-5 text-amber-500" />
                                สัดส่วนทรัพย์สินตามประเภท
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={ASSET_DISTRIBUTION_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={80}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {ASSET_DISTRIBUTION_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number, name: string) => [`${value}%`, name]}
                                            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-4">
                                {ASSET_DISTRIBUTION_DATA.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-slate-600">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-slate-400 text-xs">{item.count.toLocaleString()} รายการ</span>
                                            <span className="font-bold text-slate-800">{item.value}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* รายละเอียดทองคำ */}
                    <Card className="border-slate-200 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                <Gem className="h-5 w-5 text-yellow-500" />
                                ทองคำแยกตามประเภท
                            </CardTitle>
                            <CardDescription>75% ของทรัพย์สินทั้งหมด</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={GOLD_BREAKDOWN_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={80}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {GOLD_BREAKDOWN_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number, name: string) => [`${value}%`, name]}
                                            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-4">
                                {GOLD_BREAKDOWN_DATA.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* ความเสี่ยงกระจุกตัว */}
                    <Card className="border-slate-200 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-orange-500" />
                                ประเมินความเสี่ยง
                            </CardTitle>
                            <CardDescription>Risk Concentration Analysis</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-5 w-5 text-orange-500" />
                                    <span className="font-semibold text-orange-800">ความเสี่ยงสูง</span>
                                </div>
                                <p className="text-sm text-orange-700">
                                    ทรัพย์สิน 75% กระจุกตัวที่ทองคำ หากราคาทองตกจะกระทบต่อมูลค่าหลักประกันอย่างมาก
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">HHI Index</span>
                                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">5,850</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Concentration Risk</span>
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Correlation to Gold</span>
                                    <span className="font-bold text-slate-800">0.92</span>
                                </div>
                            </div>

                            <div className="pt-3 border-t">
                                <p className="text-xs text-slate-500">
                                    <strong>คำแนะนำ:</strong> ควรมีระบบ Early Warning สำหรับการเปลี่ยนแปลงราคาทองคำที่รุนแรง
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* มูลค่าทรัพย์สินรายเดือน */}
                <Card className="border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-500" />
                            แนวโน้มมูลค่าทรัพย์สินรายเดือน (ล้านบาท)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={ASSET_VALUE_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                    <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
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

            {/* =============================================
                SECTION 2: วิเคราะห์แนวโน้มการหลุดจำนำ
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 text-red-600">
                        <TrendingDown className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            วิเคราะห์แนวโน้มการหลุดจำนำในช่วงเวลาต่างๆ
                        </h2>
                        <p className="text-sm text-slate-500">Default Rate Analysis & Trend Prediction</p>
                    </div>
                </div>

                <Tabs defaultValue="monthly" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="monthly">รายเดือน</TabsTrigger>
                        <TabsTrigger value="quarterly">รายไตรมาส</TabsTrigger>
                        <TabsTrigger value="breakdown">แยกตามปัจจัย</TabsTrigger>
                    </TabsList>

                    {/* Monthly Tab */}
                    <TabsContent value="monthly" className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* แนวโน้มรายเดือน */}
                            <Card className="border-slate-200 lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5 text-blue-500" />
                                        อัตราไถ่ถอน vs หลุดจำนำ รายเดือน
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={MONTHLY_DEFAULT_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                                <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                                                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                                                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                                <Bar dataKey="redeemed" name="ไถ่ถอนคืน (%)" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                                                <Bar dataKey="default" name="หลุดจำนำ (%)" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* สรุปรายเดือน */}
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <Target className="h-5 w-5 text-green-500" />
                                        สรุปผลการดำเนินงาน
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-green-700">อัตราไถ่ถอนเฉลี่ย</span>
                                                <span className="text-xl font-bold text-green-700">{avgRedemptionRate.toFixed(1)}%</span>
                                            </div>
                                            <div className="mt-2 h-2 bg-green-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${avgRedemptionRate}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-red-700">อัตราหลุดจำนำเฉลี่ย</span>
                                                <span className="text-xl font-bold text-red-600">{avgDefaultRate.toFixed(1)}%</span>
                                            </div>
                                            <div className="mt-2 h-2 bg-red-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-red-500 rounded-full" style={{ width: `${avgDefaultRate * 5}%` }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t space-y-2">
                                        <h4 className="text-sm font-medium text-slate-700">เดือนที่น่าสนใจ</h4>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500">หลุดจำนำสูงสุด</span>
                                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">ก.ย. (18%)</Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500">หลุดจำนำต่ำสุด</span>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">ต.ค. (10%)</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* จำนวนรายการหลุดจำนำ */}
                        <Card className="border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                    <Banknote className="h-5 w-5 text-red-500" />
                                    มูลค่าทรัพย์สินหลุดจำนำรายเดือน (ล้านบาท)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={MONTHLY_DEFAULT_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                            <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="left" fontSize={11} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="right" orientation="right" fontSize={11} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                                            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                            <Bar yAxisId="left" dataKey="total" name="จำนวนตั๋วทั้งหมด" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                            <Line yAxisId="right" type="monotone" dataKey="defaultAmount" name="มูลค่าหลุดจำนำ (ลบ.)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444' }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Quarterly Tab */}
                    <TabsContent value="quarterly" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5 text-purple-500" />
                                        อัตราไถ่ถอน vs หลุดจำนำ รายไตรมาส
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={QUARTERLY_DEFAULT_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                                <XAxis dataKey="quarter" fontSize={11} tickLine={false} axisLine={false} />
                                                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                                                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                                <Bar dataKey="redeemed" name="ไถ่ถอนคืน (%)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="default" name="หลุดจำนำ (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-blue-500" />
                                        สรุปรายไตรมาส
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {QUARTERLY_DEFAULT_TREND.map((item, index) => (
                                            <div key={item.quarter} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold text-slate-800">{item.quarter}</span>
                                                    <Badge variant={item.default <= 12 ? "outline" : "destructive"} className={item.default <= 12 ? "bg-green-50 text-green-700 border-green-200" : ""}>
                                                        {item.default}% หลุดจำนำ
                                                    </Badge>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
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
                    <TabsContent value="breakdown" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* ตามประเภททรัพย์สิน */}
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <Package className="h-5 w-5 text-amber-500" />
                                        อัตราหลุดจำนำตามประเภท
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {DEFAULT_BY_ASSET_TYPE.map((item) => (
                                            <div key={item.name} className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                                                        <span className="text-slate-600">{item.name}</span>
                                                    </div>
                                                    <span className="font-bold text-slate-800">{item.rate}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${item.rate * 3}%`, backgroundColor: item.fill }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg">
                                        <p className="text-xs text-green-700">
                                            <strong>พบว่า:</strong> ทองคำมีอัตราหลุดจำนำต่ำที่สุด (8%) เนื่องจากมูลค่าคงที่และลูกค้าให้ความสำคัญในการไถ่ถอน
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* ตามช่วงวงเงิน */}
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <Banknote className="h-5 w-5 text-blue-500" />
                                        อัตราหลุดจำนำตามวงเงิน
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={DEFAULT_BY_LOAN_AMOUNT} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-slate-100" />
                                                <XAxis type="number" fontSize={11} tickLine={false} axisLine={false} domain={[0, 30]} />
                                                <YAxis type="category" dataKey="range" fontSize={10} tickLine={false} axisLine={false} width={80} />
                                                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`${value}%`, 'อัตราหลุดจำนำ']} />
                                                <Bar dataKey="rate" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                        <p className="text-xs text-blue-700">
                                            <strong>พบว่า:</strong> วงเงินต่ำกว่า 5,000 บาท มีอัตราหลุดจำนำสูงสุด (22%)
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* ตามอายุตั๋ว */}
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-purple-500" />
                                        อัตราหลุดจำนำตามอายุตั๋ว
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={DEFAULT_BY_TICKET_AGE} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-slate-100" />
                                                <XAxis type="number" fontSize={11} tickLine={false} axisLine={false} domain={[0, 35]} />
                                                <YAxis type="category" dataKey="age" fontSize={10} tickLine={false} axisLine={false} width={80} />
                                                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`${value}%`, 'อัตราหลุดจำนำ']} />
                                                <Bar dataKey="rate" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 p-3 bg-purple-50 border border-purple-100 rounded-lg">
                                        <p className="text-xs text-purple-700">
                                            <strong>พบว่า:</strong> ตั๋วอายุ 9-12 เดือน มีความเสี่ยงหลุดจำนำสูงสุด (28%)
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Insights */}
                        <Card className="border-slate-200 mt-6">
                            <CardHeader>
                                <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-indigo-500" />
                                    สรุปข้อมูลเชิงลึก (Key Insights)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Gem className="h-5 w-5 text-amber-600" />
                                            <span className="font-semibold text-amber-800">ทรัพย์สินที่ปลอดภัย</span>
                                        </div>
                                        <p className="text-sm text-amber-700">
                                            ทองคำมีอัตราหลุดจำนำต่ำที่สุด (8%) และมีมูลค่าคงที่ แนะนำให้เน้นรับจำนำทองเป็นหลัก
                                        </p>
                                    </div>
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle className="h-5 w-5 text-red-600" />
                                            <span className="font-semibold text-red-800">กลุ่มเสี่ยงสูง</span>
                                        </div>
                                        <p className="text-sm text-red-700">
                                            วงเงินต่ำ + ตั๋วอายุนาน + เครื่องใช้ไฟฟ้า = ความเสี่ยงหลุดจำนำสูงถึง 40%+
                                        </p>
                                    </div>
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target className="h-5 w-5 text-blue-600" />
                                            <span className="font-semibold text-blue-800">โอกาสในการปรับปรุง</span>
                                        </div>
                                        <p className="text-sm text-blue-700">
                                            ควรมีระบบแจ้งเตือนลูกค้าก่อนตั๋วใกล้ครบ 6 เดือน เพื่อลดอัตราหลุดจำนำ
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    );
}
