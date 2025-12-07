import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ArrowRight, TrendingUp, Gem, Building2,
    Sparkles, Coins, ArrowUpRight,
    Activity, FileText, AlertCircle,
    Wallet, Clock, Search, Bell, History
} from "lucide-react"
import Link from "next/link"
import { GoldPriceDisplay } from "@/components/gold-price-display"
import { WorldGoldPriceDisplay } from "@/components/world-gold-price-display"
import { LoanRateDisplay } from "@/components/loan-rate-display"

export default function DashboardPage() {
    return (
        <div className="container mx-auto space-y-8 p-4 md:p-8 bg-slate-50/50 min-h-screen">
            {/* Banking Header Section */}
            <div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-amber-400 shadow-lg shadow-slate-900/20">
                            <Building2 className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">สำนักงานธนานุเคราะห์</h1>
                            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-full text-xs font-medium">
                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                                    สาขาที่ 1 (สะพานขาว)
                                </span>
                                <span className="text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-medium border border-emerald-100">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                    </span>
                                    เปิดทำการ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </Button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 rounded-xl px-5 transition-all hover:-translate-y-0.5" asChild>
                            <Link href="/pawn-data">
                                <Gem className="mr-2 h-4 w-4 text-amber-400" />
                                รับจำนำใหม่
                            </Link>
                        </Button>
                        <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl px-4" asChild>
                            <Link href="/daily-summary">
                                <FileText className="mr-2 h-4 w-4" />
                                สรุปยอด
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Portfolio Card */}
                <Card className="md:col-span-2 overflow-hidden border-0 shadow-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative group">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 p-24 bg-amber-500/10 rounded-full blur-3xl -ml-12 -mb-12 group-hover:bg-amber-500/15 transition-colors duration-500"></div>
                    <CardContent className="p-8 relative">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-slate-300 text-sm font-medium">ยอดรับจำนำคงค้างรวม</p>
                                        <span className="text-[10px] text-slate-400">(Portfolio Value)</span>
                                    </div>
                                    <h2 className="text-5xl font-bold tracking-tight text-white flex items-baseline gap-4 font-sans">
                                        ฿145,280,500
                                        <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-0 px-2 py-1 h-auto text-sm font-medium">
                                            <TrendingUp className="h-3.5 w-3.5 mr-1" />
                                            +2.4%
                                        </Badge>
                                    </h2>
                                </div>
                                <div className="flex gap-10">
                                    <div className="relative pl-4 border-l border-slate-700">
                                        <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">ตั๋วจำนำทั้งหมด</p>
                                        <p className="text-2xl font-semibold">12,458 <span className="text-sm font-normal text-slate-500">ฉบับ</span></p>
                                    </div>
                                    <div className="relative pl-4 border-l border-slate-700">
                                        <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">ดอกเบี้ยเดือนนี้</p>
                                        <p className="text-2xl font-semibold text-amber-400">฿1.25M</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm rounded-lg px-4 h-9">
                                    <Activity className="mr-2 h-4 w-4" />
                                    วิเคราะห์
                                </Button>
                                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-900 border-0 rounded-lg font-medium px-4 h-9 shadow-lg shadow-amber-500/20">
                                    <Wallet className="mr-2 h-4 w-4" />
                                    เติมเงิน
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cash Balance Card */}
                <Card className="border border-slate-100 shadow-md bg-white relative overflow-hidden group">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                    <CardHeader className="pb-2 pt-6">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center justify-between uppercase tracking-wider">
                            เงินสดคงเหลือ
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6">
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">฿2,450,000</h2>
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                                <span className="inline-block w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                                เพียงพอสำหรับการดำเนินงานวันนี้
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-slate-200 transition-colors">
                                <span className="flex items-center text-slate-600 font-medium">
                                    <div className="p-1 bg-emerald-100 rounded-md mr-3">
                                        <ArrowRight className="h-3.5 w-3.5 text-emerald-600 rotate-45" />
                                    </div>
                                    เงินสดรับ
                                </span>
                                <span className="font-bold text-emerald-600 font-mono">+฿125,000</span>
                            </div>
                            <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-slate-200 transition-colors">
                                <span className="flex items-center text-slate-600 font-medium">
                                    <div className="p-1 bg-red-100 rounded-md mr-3">
                                        <ArrowRight className="h-3.5 w-3.5 text-red-600 -rotate-45" />
                                    </div>
                                    เงินสดจ่าย
                                </span>
                                <span className="font-bold text-red-600 font-mono">-฿85,000</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { title: "รับจำนำ", count: "15", unit: "ราย", icon: Gem, color: "emerald", bg: "bg-emerald-50", text: "text-emerald-600", trend: "+12%" },
                    { title: "ไถ่ถอน", count: "8", unit: "ราย", icon: ArrowUpRight, color: "blue", bg: "bg-blue-50", text: "text-blue-600", trend: "-5%" },
                    { title: "ส่งดอกเบี้ย", count: "52", unit: "ราย", icon: Coins, color: "amber", bg: "bg-amber-50", text: "text-amber-600", trend: "+8%" },
                    { title: "ทรัพย์หลุด", count: "23", unit: "ชิ้น", icon: AlertCircle, color: "red", bg: "bg-red-50", text: "text-red-600", trend: "+2%" },
                ].map((stat, i) => (
                    <Card key={i} className="border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group bg-white">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.text} group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500`}>
                                   วันนี้
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight flex items-baseline gap-1">
                                    {stat.count} <span className="text-sm font-normal text-slate-400">{stat.unit}</span>
                                </h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Real-time Data */}
                <div className="space-y-6 lg:col-span-2">
                     {/* Gold Price & Rates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GoldPriceDisplay />
                        <WorldGoldPriceDisplay />
                    </div>
                    
                    {/* Recent Transactions Table */}
                    <Card className="border border-slate-100 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between py-6 px-6 border-b border-slate-100 bg-slate-50/30">
                            <div>
                                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <History className="h-5 w-5 text-slate-400" />
                                    รายการล่าสุด
                                </CardTitle>
                                <CardDescription>ธุรกรรมที่เกิดขึ้นในวันนี้ (Real-time)</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-xs bg-white">
                                ดูทั้งหมด
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold w-[100px]">เวลา</th>
                                            <th className="px-6 py-4 font-semibold">รายการ</th>
                                            <th className="px-6 py-4 font-semibold">ลูกค้า</th>
                                            <th className="px-6 py-4 font-semibold text-right">จำนวนเงิน</th>
                                            <th className="px-6 py-4 font-semibold text-center w-[120px]">สถานะ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {[
                                            { time: "10:45", type: "รับจำนำ", customer: "คุณ สมชาย ใจดี", amount: "25,000", status: "success", typeClass: "text-emerald-700 bg-emerald-50" },
                                            { time: "10:32", type: "ส่งดอกเบี้ย", customer: "คุณ วิภาดา รักดี", amount: "450", status: "success", typeClass: "text-amber-700 bg-amber-50" },
                                            { time: "10:15", type: "ไถ่ถอน", customer: "คุณ ประสิทธิ์ มีทรัพย์", amount: "12,000", status: "success", typeClass: "text-blue-700 bg-blue-50" },
                                            { time: "09:58", type: "รับจำนำ", customer: "คุณ อารีย์ แซ่ลี้", amount: "45,000", status: "success", typeClass: "text-emerald-700 bg-emerald-50" },
                                            { time: "09:45", type: "ประเมินราคา", customer: "คุณ กานดา มานะ", amount: "-", status: "pending", typeClass: "text-slate-700 bg-slate-100" },
                                        ].map((item, i) => (
                                            <tr key={i} className="group hover:bg-slate-50/80 transition-colors">
                                                <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-3 w-3 text-slate-300 group-hover:text-slate-500" />
                                                        {item.time}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.typeClass}`}>
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-700 font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                                                            {item.customer.charAt(4)}
                                                        </div>
                                                        {item.customer}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-900 text-right font-mono">
                                                    {item.amount !== '-' ? '฿' + item.amount : '-'}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {item.status === 'success' ? (
                                                        <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-600">
                                                            <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
                                                        </div>
                                                    ) : (
                                                        <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-600">
                                                            <div className="h-2 w-2 rounded-full bg-amber-600 animate-pulse"></div>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Promos & Menus */}
                <div className="space-y-6">
                    {/* Quick Menu */}
                    <Card className="border border-slate-100 shadow-sm bg-white">
                        <CardHeader className="py-4 px-5 border-b border-slate-100 flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-semibold text-slate-900">เมนูด่วน</CardTitle>
                            <Badge variant="outline" className="text-[10px] font-normal text-slate-400">Quick Actions</Badge>
                        </CardHeader>
                        <CardContent className="p-4 grid grid-cols-2 gap-3">
                            <Link href="/pawn-data" className="contents">
                                <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50 hover:border-blue-100 transition-all cursor-pointer group">
                                    <div className="h-10 w-10 rounded-full bg-white shadow-sm text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <Search className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700">ค้นหาตั๋ว</span>
                                </div>
                            </Link>
                            <Link href="/blind-forecast" className="contents">
                                <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-100 transition-all cursor-pointer group">
                                    <div className="h-10 w-10 rounded-full bg-white shadow-sm text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-700">วิเคราะห์ราคา</span>
                                </div>
                            </Link>
                            <Link href="/chat" className="contents">
                                <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-purple-50 hover:border-purple-100 transition-all cursor-pointer group">
                                    <div className="h-10 w-10 rounded-full bg-white shadow-sm text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 group-hover:text-purple-700">ถาม AI</span>
                                </div>
                            </Link>
                            <Link href="/docs" className="contents">
                                <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-amber-50 hover:border-amber-100 transition-all cursor-pointer group">
                                    <div className="h-10 w-10 rounded-full bg-white shadow-sm text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 group-hover:text-amber-700">คู่มือ</span>
                                </div>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Interest Rate Card */}
                    <LoanRateDisplay mode="full" />
                    
                    {/* Forfeited Assets Promo (Re-styled) */}
                    <Card className="overflow-hidden bg-slate-900 text-white border-0 shadow-xl shadow-slate-900/10 relative cursor-pointer group">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/30 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
                        
                        <CardContent className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <Badge className="bg-amber-500 text-slate-900 hover:bg-amber-400 border-0 mb-3 px-3 py-1 text-xs font-bold shadow-md shadow-amber-900/20">
                                        HOT DEAL
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-1">ทรัพย์หลุดจำนำ</h3>
                                    <p className="text-slate-400 text-xs">สินค้าคุณภาพดี ราคาพิเศษ</p>
                                </div>
                                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                                    <Gem className="h-6 w-6 text-amber-400" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-6 text-center">
                                <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                                    <span className="block text-2xl font-bold">23</span>
                                    <span className="text-[10px] text-slate-400">รายการใหม่</span>
                                </div>
                                <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                                    <span className="block text-2xl font-bold text-emerald-400">-50%</span>
                                    <span className="text-[10px] text-slate-400">ราคาตลาด</span>
                                </div>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg shadow-amber-900/20 rounded-xl h-10 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]">
                                ดูรายการสินค้า
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
