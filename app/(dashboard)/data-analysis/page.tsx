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
export default function DataAnalysisPage() {
    const [timeRange, setTimeRange] = useState("6months");

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
                    <p className="text-sm text-slate-500 mt-0.5">วิเคราะห์ทรัพย์สินและแนวโน้มการหลุดจำนำ</p>
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
        </div>
    );
}
