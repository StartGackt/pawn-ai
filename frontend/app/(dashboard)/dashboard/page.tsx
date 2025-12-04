"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Archive,
    DollarSign,
    Coins,
    ArrowRightLeft,
    Calendar,
    Percent,
    Package,
    MessageSquare,
    BarChart3,
    LineChart as LineChartIcon,
    ArrowRight,
    AlertCircle,
} from "lucide-react";

// ข้อมูลสถิติหลัก
const mainStats = {
    todayPawns: 156,
    todayChange: 12.5,
    totalValue: 4820000,
    valueChange: 8.3,
    activePawns: 892,
    activeChange: -2.1,
    redemptionRate: 87.5,
    redemptionChange: 3.2,
};

// ราคาทองล่าสุด
const goldPrices = {
    domesticBuy: 32500,
    domesticSell: 32600,
    domesticChange: 150,
    globalUSD: 2045,
    globalChange: 15,
    usdthb: 35.50,
    usdthbChange: 0.05,
};

// ข้อมูลกราฟราคาทอง
const goldPriceTrend = [
    { date: "30 พ.ย.", price: 32100 },
    { date: "1 ธ.ค.", price: 32050 },
    { date: "2 ธ.ค.", price: 32200 },
    { date: "3 ธ.ค.", price: 32350 },
    { date: "4 ธ.ค.", price: 32500 },
];

// ข้อมูลการคาดการณ์
const predictionData = [
    { date: "4 ธ.ค.", actual: 32500, predicted: 32650 },
    { date: "5 ธ.ค.", actual: null, predicted: 32800 },
    { date: "6 ธ.ค.", actual: null, predicted: 32950 },
    { date: "7 ธ.ค.", actual: null, predicted: 33100 },
    { date: "8 ธ.ค.", actual: null, predicted: 33200 },
];

// ข้อมูลประเภททรัพย์
const assetTypeData = [
    { name: "ทองคำ", value: 45, color: "#3b82f6" },
    { name: "โทรศัพท์", value: 25, color: "#60a5fa" },
    { name: "โน้ตบุ๊ก", value: 18, color: "#93c5fd" },
    { name: "กล้อง", value: 8, color: "#bfdbfe" },
    { name: "อื่นๆ", value: 4, color: "#dbeafe" },
];

// รายการจำนำล่าสุด
const recentPawns = [
    { id: "P-2025-001", customer: "สมชาย ใจดี", amount: 50000, assetType: "ทองคำ", status: "active", time: "10:30" },
    { id: "P-2025-002", customer: "สมหญิง รักดี", amount: 30000, assetType: "โทรศัพท์", status: "active", time: "11:15" },
    { id: "P-2025-003", customer: "วิชัย มั่งคั่ง", amount: 75000, assetType: "ทองคำ", status: "active", time: "13:45" },
    { id: "P-2025-004", customer: "มาลี สวยงาม", amount: 45000, assetType: "โน้ตบุ๊ก", status: "redeemed", time: "14:20" },
    { id: "P-2025-005", customer: "บุญมี โชคดี", amount: 38000, assetType: "กล้อง", status: "active", time: "15:00" },
];

// แจ้งเตือนสำคัญ
const alerts = [
    { id: 1, type: "warning", message: "มี 12 รายการที่ใกล้ครบกำหนดภายใน 7 วัน", link: "/data/pawns" },
    { id: 2, type: "info", message: "ราคาทองคำพุ่งขึ้น 150 บาท (+0.46%)", link: "/data/gold-prices" },
    { id: 3, type: "success", message: "อัตราการไถ่ถอนเพิ่มขึ้น 3.2% เมื่อเทียบกับเดือนที่แล้ว", link: "/analytics/trends" },
];

// Quick Actions (ลบการอ้างอิง backend ออก)
const quickActions = [
    { title: "ดูตั๋วจำนำทั้งหมด", icon: Package, link: "/data/pawns", color: "bg-blue-500" },
    { title: "คาดการณ์ราคาทอง", icon: LineChartIcon, link: "/predictions/gold-price", color: "bg-green-500" },
    { title: "วิเคราะห์เทรนด์", icon: BarChart3, link: "/analytics/trends", color: "bg-purple-500" },
    { title: "AI Chatbot", icon: MessageSquare, link: "/chat", color: "bg-orange-500" },
];

// ข้อมูล Predictive Model Preview (7 วัน)
const goldPredictionPreview = [
    { date: "30 พ.ย.", actual: 32100, predicted: null },
    { date: "1 ธ.ค.", actual: 32050, predicted: null },
    { date: "2 ธ.ค.", actual: 32200, predicted: null },
    { date: "3 ธ.ค.", actual: 32350, predicted: null },
    { date: "4 ธ.ค.", actual: 32500, predicted: null },
    { date: "5 ธ.ค.", actual: null, predicted: 32650 },
    { date: "6 ธ.ค.", actual: null, predicted: 32800 },
    { date: "7 ธ.ค.", actual: null, predicted: 32950 },
    { date: "8 ธ.ค.", actual: null, predicted: 33100 },
    { date: "9 ธ.ค.", actual: null, predicted: 33250 },
    { date: "10 ธ.ค.", actual: null, predicted: 33400 },
    { date: "11 ธ.ค.", actual: null, predicted: 33550 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Professional Header with Gradient Background */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 p-8 text-white shadow-2xl">
                <div className="absolute inset-0 bg-grid-white/10"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-2">แดชบอร์ด Pawn AI</h1>
                            <p className="text-blue-100 text-lg">
                                ภาพรวมระบบจำนำอัจฉริยะ - ข้อมูลแบบเรียลไทม์ (วันที่ 4 ธันวาคม 2568)
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                <Calendar className="inline h-4 w-4 mr-2" />
                                <span className="text-sm font-medium">
                                    {new Date().toLocaleString('th-TH', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                <span className="text-2xl font-bold">
                                    {new Date().toLocaleString('th-TH', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })} น.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
            </div>

            {/* Professional Alert Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {alerts.map((alert) => (
                    <Link key={alert.id} href={alert.link}>
                        <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 ${alert.type === 'warning' ? 'border-l-orange-500 bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-950/20' :
                            alert.type === 'success' ? 'border-l-green-500 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20' :
                                'border-l-blue-500 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/20'
                            }`}>
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className={`rounded-xl p-3 ${alert.type === 'warning' ? 'bg-orange-500' :
                                        alert.type === 'success' ? 'bg-green-500' :
                                            'bg-blue-500'
                                        } shadow-lg`}>
                                        <AlertCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-relaxed">{alert.message}</p>
                                        <div className="flex items-center text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                            <span>ดูรายละเอียด</span>
                                            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Soft Pastel Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="relative overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-sky-50 to-white dark:from-blue-950/30 dark:to-blue-900/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-blue-100 dark:bg-blue-900/50 p-3">
                                <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 border-none">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +{mainStats.todayChange}%
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">การจำนำวันนี้</p>
                            <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">{mainStats.todayPawns}</p>
                            <p className="text-xs text-muted-foreground">เพิ่มจากเมื่อวาน</p>
                        </div>
                    </CardContent>
                    <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-blue-200/30 blur-2xl"></div>
                </Card>

                <Card className="relative overflow-hidden border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white dark:from-emerald-950/30 dark:to-emerald-900/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-emerald-100 dark:bg-emerald-900/50 p-3">
                                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 border-none">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +{mainStats.valueChange}%
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">มูลค่ารวมวันนี้</p>
                            <p className="text-4xl font-bold text-emerald-700 dark:text-emerald-300">฿{(mainStats.totalValue / 1000000).toFixed(2)}M</p>
                            <p className="text-xs text-muted-foreground">ยอดธุรกรรม</p>
                        </div>
                    </CardContent>
                    <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl"></div>
                </Card>

                <Card className="relative overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-white dark:from-purple-950/30 dark:to-purple-900/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-purple-100 dark:bg-purple-900/50 p-3">
                                <Archive className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 border-none">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                {mainStats.activeChange}%
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">ตั๋วใช้งานอยู่</p>
                            <p className="text-4xl font-bold text-purple-700 dark:text-purple-300">{mainStats.activePawns}</p>
                            <p className="text-xs text-muted-foreground">จำนวนทั้งหมด</p>
                        </div>
                    </CardContent>
                    <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-purple-200/30 blur-2xl"></div>
                </Card>

                <Card className="relative overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white dark:from-amber-950/30 dark:to-amber-900/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-amber-100 dark:bg-amber-900/50 p-3">
                                <Percent className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 border-none">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +{mainStats.redemptionChange}%
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">อัตราไถ่ถอน</p>
                            <p className="text-4xl font-bold text-amber-700 dark:text-amber-300">{mainStats.redemptionRate}%</p>
                            <p className="text-xs text-muted-foreground">สูงกว่าเดือนที่แล้ว</p>
                        </div>
                    </CardContent>
                    <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-amber-200/30 blur-2xl"></div>
                </Card>
            </div>

            {/* Professional Gold Price Cards */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">ราคาทองคำ</h2>
                    <Link href="/data/gold-prices">
                        <Button variant="outline" size="sm" className="gap-2">
                            <span>ดูทั้งหมด</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Link href="/data/gold-prices">
                        <Card className="group relative overflow-hidden border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 p-3 shadow-lg">
                                        <Coins className="h-6 w-6 text-white" />
                                    </div>
                                    <Badge className="bg-green-500 text-white border-none shadow-md">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        +{goldPrices.domesticChange}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">ทองไทย (ซื้อ)</p>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                                        ฿{goldPrices.domesticBuy.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">บาท/บาททองคำ</p>
                                </div>
                            </CardContent>
                            <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-yellow-300/20 to-amber-300/20 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                        </Card>
                    </Link>

                    <Link href="/data/gold-prices">
                        <Card className="group relative overflow-hidden border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 p-3 shadow-lg">
                                        <DollarSign className="h-6 w-6 text-white" />
                                    </div>
                                    <Badge className="bg-green-500 text-white border-none shadow-md">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        +${goldPrices.globalChange}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">ทองโลก</p>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        ${goldPrices.globalUSD.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">USD/oz</p>
                                </div>
                            </CardContent>
                            <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-green-300/20 to-emerald-300/20 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                        </Card>
                    </Link>

                    <Link href="/data/gold-prices">
                        <Card className="group relative overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="rounded-xl bg-gradient-to-br from-blue-400 to-sky-500 p-3 shadow-lg">
                                        <ArrowRightLeft className="h-6 w-6 text-white" />
                                    </div>
                                    <Badge className="bg-green-500 text-white border-none shadow-md">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        +{goldPrices.usdthbChange.toFixed(2)}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">อัตราแลกเปลี่ยน</p>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                                        ฿{goldPrices.usdthb.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">USD/THB (BOT)</p>
                                </div>
                            </CardContent>
                            <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-300/20 to-sky-300/20 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full max-w-2xl grid-cols-4">
                    <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                    <TabsTrigger value="predictions">คาดการณ์</TabsTrigger>
                    <TabsTrigger value="analytics">วิเคราะห์</TabsTrigger>
                    <TabsTrigger value="recent">รายการล่าสุด</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>ราคาทองคำ (5 วันล่าสุด)</CardTitle>
                                <CardDescription>แนวโน้มราคาทองไทย</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={goldPriceTrend}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                dataKey="date"
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            />
                                            <YAxis
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                                domain={['dataMin - 200', 'dataMax + 200']}
                                            />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="price"
                                                stroke="#3b82f6"
                                                strokeWidth={3}
                                                dot={{ fill: "#3b82f6", r: 5 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>สัดส่วนทรัพย์สิน</CardTitle>
                                <CardDescription>แยกตามประเภท</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={assetTypeData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={100}
                                                fill="#3b82f6"
                                                dataKey="value"
                                            >
                                                {assetTypeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="predictions" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>การคาดการณ์ราคาทอง (5 วันข้างหน้า)</CardTitle>
                                    <CardDescription>ใช้ AI Model: LSTM, Prophet, ARIMA</CardDescription>
                                </div>
                                <Link href="/predictions/gold-price">
                                    <Button variant="outline" size="sm">
                                        ดูรายละเอียด
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={predictionData}>
                                        <defs>
                                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="date"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            domain={['dataMin - 200', 'dataMax + 200']}
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="#3b82f6"
                                            fillOpacity={1}
                                            fill="url(#colorActual)"
                                            strokeWidth={2}
                                            name="ราคาจริง"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="predicted"
                                            stroke="#60a5fa"
                                            fillOpacity={1}
                                            fill="url(#colorPredicted)"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            name="คาดการณ์"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">LSTM</span>
                                        <Badge className="bg-blue-500">94.5%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Prophet</span>
                                        <Badge className="bg-blue-400">92.8%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">ARIMA</span>
                                        <Badge className="bg-blue-300">89.3%</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Link href="/predictions/forfeited-assets">
                            <Card className="hover:bg-accent transition-colors cursor-pointer">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium">ทรัพย์หลุดจำนำ</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">25</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        คาดการณ์เดือนหน้า
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/predictions">
                            <Card className="hover:bg-accent transition-colors cursor-pointer">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium">ความแม่นยำรวม</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">92.2%</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        เฉลี่ยจากทุก Models
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Link href="/analytics/trends">
                            <Card className="hover:bg-accent transition-colors cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5 text-blue-500" />
                                        วิเคราะห์เทรนด์
                                    </CardTitle>
                                    <CardDescription>
                                        แนวโน้มการจำนำ รายเดือน รายสาขา
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            การจำนำเพิ่มขึ้น 12.5% ในเดือนนี้
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/analytics/comparison">
                            <Card className="hover:bg-accent transition-colors cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <LineChartIcon className="h-5 w-5 text-blue-500" />
                                        เปรียบเทียบสาขา
                                    </CardTitle>
                                    <CardDescription>
                                        Performance แต่ละสาขา
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            สาขากลาง ทำได้ดีที่สุด 35.2%
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance สาขา</CardTitle>
                            <CardDescription>มูลค่าการจำนำรายสาขา (เดือนนี้)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[
                                        { branch: "สาขากลาง", amount: 1850000 },
                                        { branch: "สาขาเหนือ", amount: 1620000 },
                                        { branch: "สาขาใต้", amount: 1350000 },
                                    ]}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="branch"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            tickFormatter={(value) => `฿${(value / 1000000).toFixed(1)}M`}
                                        />
                                        <Tooltip formatter={(value: number) => `฿${value.toLocaleString()}`} />
                                        <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="recent" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>รายการจำนำล่าสุด (วันนี้)</CardTitle>
                                    <CardDescription>อัพเดทแบบเรียลไทม์</CardDescription>
                                </div>
                                <Link href="/data/pawns">
                                    <Button variant="outline" size="sm">
                                        ดูทั้งหมด
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>เลขที่ตั๋ว</TableHead>
                                        <TableHead>ลูกค้า</TableHead>
                                        <TableHead>ประเภท</TableHead>
                                        <TableHead className="text-right">จำนวนเงิน</TableHead>
                                        <TableHead>เวลา</TableHead>
                                        <TableHead>สถานะ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentPawns.map((pawn) => (
                                        <TableRow key={pawn.id}>
                                            <TableCell className="font-mono text-sm">{pawn.id}</TableCell>
                                            <TableCell>{pawn.customer}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs">
                                                    {pawn.assetType}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                ฿{pawn.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-sm">{pawn.time}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={pawn.status === "active" ? "default" : "secondary"}
                                                    className="text-xs"
                                                >
                                                    {pawn.status === "active" ? "ใช้งาน" : "ไถ่ถอน"}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Predictive Model Preview */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">โมเดลคาดการณ์ราคาทองคำ</h2>
                    <Link href="/predictions/model">
                        <Button variant="outline" size="sm">
                            ดูเพิ่มเติม
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Prediction Chart */}
                    <Card className="md:col-span-2 border-2 border-blue-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LineChartIcon className="h-5 w-5 text-blue-600" />
                                คาดการณ์ 7 วันข้างหน้า
                            </CardTitle>
                            <CardDescription>ใช้ Prophet + Linear Regression</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={goldPredictionPreview}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="date"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            domain={['dataMin - 200', 'dataMax + 200']}
                                            tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
                                        />
                                        <Tooltip
                                            formatter={(value: number) => `฿${value?.toLocaleString() || 'N/A'}`}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: "#3b82f6", r: 4 }}
                                            name="ราคาจริง"
                                            connectNulls={false}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="predicted"
                                            stroke="#60a5fa"
                                            strokeWidth={3}
                                            strokeDasharray="5 5"
                                            dot={{ fill: "#60a5fa", r: 4 }}
                                            name="คาดการณ์"
                                            connectNulls={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Model Stats */}
                    <Card className="border-2 border-green-200">
                        <CardHeader>
                            <CardTitle className="text-base">สรุปการคาดการณ์</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">ราคาวันนี้:</span>
                                    <span className="font-semibold">฿32,500</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">คาดการณ์ 7 วัน:</span>
                                    <span className="font-semibold text-green-600">฿33,550</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">เปลี่ยนแปลง:</span>
                                    <Badge className="bg-green-500">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        +3.23%
                                    </Badge>
                                </div>
                            </div>
                            <div className="pt-4 border-t">
                                <p className="text-xs text-muted-foreground mb-3">ประสิทธิภาพโมเดล:</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Accuracy:</span>
                                        <span className="text-xs font-semibold text-green-600">92.3%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">MAE:</span>
                                        <span className="text-xs font-semibold">฿85.5</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">R² Score:</span>
                                        <span className="text-xs font-semibold">0.89</span>
                                    </div>
                                </div>
                            </div>
                            <Link href="/predictions/model">
                                <Button className="w-full mt-4" size="sm" variant="outline">
                                    ดูรายละเอียดเพิ่มเติม
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Professional Quick Actions */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {quickActions.map((action, index) => (
                        <Link key={index} href={action.link}>
                            <Card className="group relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className={`rounded-2xl ${action.color} p-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                            <action.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold leading-tight">{action.title}</p>
                                            <div className="flex items-center justify-center text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                                <span>เริ่มใช้งาน</span>
                                                <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
