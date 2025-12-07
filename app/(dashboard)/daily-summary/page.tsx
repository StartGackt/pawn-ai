"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Search, Sparkles, TrendingUp, Package, AlertCircle, Calculator, Camera, Clock,
    ArrowUpRight, ArrowDownRight, Banknote, Users, FileText, RefreshCw, Download,
    ChevronRight, Coins, Receipt, BadgeDollarSign, PieChart, BarChart3, CircleDollarSign
} from "lucide-react";
import { useState, useEffect } from "react";

export default function DailySummaryPage() {
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }));

        const updateTime = () => {
            setCurrentTime(new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleAsk = () => {
        if (!query) return;
        setIsLoading(true);
        setTimeout(() => {
            if (query.includes("inventory") || query.includes("คงเหลือ")) {
                setAnswer(`ณ วันที่ ${currentDate} มีทรัพย์จำนำคงเหลือในระบบจำนวน 1,245 รายการ มูลค่ารวม 25,450,000 บาท แบ่งเป็น ทองคำ 856 รายการ, เพชร/พลอย 234 รายการ, อื่นๆ 155 รายการ`);
            } else if (query.includes("today") || query.includes("วันนี้") || query.includes("ยอด")) {
                setAnswer(`วันนี้ (${currentDate}) มีการรับจำนำใหม่ 15 รายการ มูลค่า 350,000 บาท และมีการไถ่ถอน 8 รายการ มูลค่า 125,000 บาท รายได้ดอกเบี้ยรับ 12,450 บาท`);
            } else if (query.includes("ทอง") || query.includes("gold")) {
                setAnswer(`ราคาทองคำวันนี้: แท่ง ซื้อ 43,100 ขาย 43,200 บาท | รูปพรรณ ซื้อ 42,612.36 ขาย 43,700 บาท | เปลี่ยนแปลง +50 บาท จากเมื่อวาน`);
            } else {
                setAnswer("ขออภัย ระบบยังไม่เข้าใจคำถามนี้ โปรดลองถามเกี่ยวกับ 'ทรัพย์คงเหลือ', 'ยอดวันนี้', หรือ 'ราคาทอง'");
            }
            setIsLoading(false);
        }, 800);
    };

    // Sample transactions data
    const recentTransactions = [
        { id: "TX001", time: "09:15", type: "รับจำนำ", item: "ทองคำแท่ง 2 บาท", amount: 86200, customer: "สมชาย ก." },
        { id: "TX002", time: "09:45", type: "ไถ่ถอน", item: "สร้อยคอทอง 1 บาท", amount: 45000, customer: "สมหญิง ข." },
        { id: "TX003", time: "10:20", type: "รับจำนำ", item: "แหวนเพชร 1 กะรัต", amount: 35000, customer: "มานี ค." },
        { id: "TX004", time: "11:00", type: "ต่อดอก", item: "สร้อยข้อมือ 2 สลึง", amount: 850, customer: "ประยุทธ์ ง." },
        { id: "TX005", time: "11:30", type: "รับจำนำ", item: "ทองรูปพรรณ 3 บาท", amount: 127800, customer: "วิชัย จ." },
    ];

    return (
        <div className="container mx-auto space-y-6 p-4 md:p-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                            <Clock className="mr-1.5 h-3 w-3" />
                            Daily Report
                        </Badge>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                            <span className="relative flex h-2 w-2 mr-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            </span>
                            Live
                        </Badge>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">สรุปยอดประจำวัน</h1>
                    <p className="text-muted-foreground mt-1">{currentDate}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        รีเฟรช
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Main Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">รับจำนำใหม่วันนี้</p>
                                <p className="text-3xl font-bold text-emerald-700 mt-1">15</p>
                                <p className="text-sm text-emerald-600 mt-1">฿350,000</p>
                            </div>
                            <div className="p-3 bg-emerald-500 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-emerald-200">
                            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm text-emerald-600 font-medium">+20.1%</span>
                            <span className="text-xs text-muted-foreground ml-1">เทียบเมื่อวาน</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">ไถ่ถอนวันนี้</p>
                                <p className="text-3xl font-bold text-blue-700 mt-1">8</p>
                                <p className="text-sm text-blue-600 mt-1">฿125,000</p>
                            </div>
                            <div className="p-3 bg-blue-500 rounded-xl">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-blue-200">
                            <ArrowDownRight className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-blue-600 font-medium">-5.2%</span>
                            <span className="text-xs text-muted-foreground ml-1">เทียบเมื่อวาน</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">ดอกเบี้ยรับวันนี้</p>
                                <p className="text-3xl font-bold text-amber-700 mt-1">฿12.4K</p>
                                <p className="text-sm text-amber-600 mt-1">52 รายการ</p>
                            </div>
                            <div className="p-3 bg-amber-500 rounded-xl">
                                <Banknote className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-amber-200">
                            <ArrowUpRight className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-amber-600 font-medium">+8.7%</span>
                            <span className="text-xs text-muted-foreground ml-1">เทียบเมื่อวาน</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">ใกล้หลุดจำนำ</p>
                                <p className="text-3xl font-bold text-red-700 mt-1">23</p>
                                <p className="text-sm text-red-600 mt-1">ภายใน 7 วัน</p>
                            </div>
                            <div className="p-3 bg-red-500 rounded-xl">
                                <AlertCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-red-200">
                            <span className="text-xs text-muted-foreground">หลุดจำนำแล้ว</span>
                            <span className="text-sm text-red-600 font-medium ml-auto">2 รายการ</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Service Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <Calculator className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">คำนวณดอกเบี้ย</p>
                            <p className="text-xl font-bold">128 <span className="text-xs font-normal text-muted-foreground">ครั้ง</span></p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-cyan-100 rounded-xl">
                            <Camera className="h-5 w-5 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">ประเมินออนไลน์</p>
                            <p className="text-xl font-bold">45 <span className="text-xs font-normal text-muted-foreground">รายการ</span></p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <Users className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">ลูกค้าใช้บริการ</p>
                            <p className="text-xl font-bold">89 <span className="text-xs font-normal text-muted-foreground">ราย</span></p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-pink-100 rounded-xl">
                            <Sparkles className="h-5 w-5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">AI Chatbot</p>
                            <p className="text-xl font-bold">67 <span className="text-xs font-normal text-muted-foreground">คำถาม</span></p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                </Card>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="transactions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="transactions" className="flex items-center gap-2">
                        <Receipt className="h-4 w-4" />
                        รายการล่าสุด
                    </TabsTrigger>
                    <TabsTrigger value="inventory" className="flex items-center gap-2">
                        <PieChart className="h-4 w-4" />
                        ทรัพย์คงเหลือ
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        AI Assistant
                    </TabsTrigger>
                </TabsList>

                {/* Transactions Tab */}
                <TabsContent value="transactions" className="mt-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Receipt className="h-4 w-4 text-blue-500" />
                                รายการธุรกรรมวันนี้
                            </CardTitle>
                            <CardDescription className="text-xs">รายการรับจำนำ, ไถ่ถอน, ต่อดอก ล่าสุด</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xs">เวลา</TableHead>
                                        <TableHead className="text-xs">รหัส</TableHead>
                                        <TableHead className="text-xs">ประเภท</TableHead>
                                        <TableHead className="text-xs">รายการ</TableHead>
                                        <TableHead className="text-xs">ลูกค้า</TableHead>
                                        <TableHead className="text-xs text-right">จำนวนเงิน</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map((tx) => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{tx.time}</TableCell>
                                            <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={
                                                    tx.type === "รับจำนำ" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                        tx.type === "ไถ่ถอน" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                            "bg-amber-50 text-amber-700 border-amber-200"
                                                }>
                                                    {tx.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">{tx.item}</TableCell>
                                            <TableCell className="text-sm">{tx.customer}</TableCell>
                                            <TableCell className="text-right font-medium">฿{tx.amount.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 text-center">
                                <Button variant="ghost" size="sm">
                                    ดูรายการทั้งหมด
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Inventory Tab */}
                <TabsContent value="inventory" className="mt-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <PieChart className="h-4 w-4 text-purple-500" />
                                ทรัพย์คงเหลือในระบบ
                            </CardTitle>
                            <CardDescription className="text-xs">สรุปทรัพย์จำนำทั้งหมดแยกตามประเภท</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-amber-500 rounded-lg">
                                            <Coins className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-amber-700">ทองคำ</p>
                                            <p className="text-2xl font-bold text-amber-800">856</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-amber-700">
                                        <p>มูลค่า: ฿18,250,000</p>
                                        <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-cyan-500 rounded-lg">
                                            <BadgeDollarSign className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-cyan-700">เพชร/พลอย</p>
                                            <p className="text-2xl font-bold text-cyan-800">234</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-cyan-700">
                                        <p>มูลค่า: ฿5,680,000</p>
                                        <div className="w-full bg-cyan-200 rounded-full h-2 mt-2">
                                            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-slate-500 rounded-lg">
                                            <Package className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-700">อื่นๆ</p>
                                            <p className="text-2xl font-bold text-slate-800">155</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-700">
                                        <p>มูลค่า: ฿1,520,000</p>
                                        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                                            <div className="bg-slate-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-200 text-sm">ทรัพย์คงเหลือทั้งหมด</p>
                                        <p className="text-3xl font-bold">1,245 รายการ</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-purple-200 text-sm">มูลค่ารวม</p>
                                        <p className="text-3xl font-bold">฿25.45M</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* AI Tab */}
                <TabsContent value="ai" className="mt-4">
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-sky-400" />
                                AI Assistant
                            </CardTitle>
                            <CardDescription className="text-slate-400 text-sm">
                                ถามข้อมูลเกี่ยวกับยอดรับจำนำ, ทรัพย์คงเหลือ, หรือราคาทองคำ
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="เช่น 'ยอดรับจำนำวันนี้เท่าไหร่?' หรือ 'ราคาทองวันนี้'"
                                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                                />
                                <Button onClick={handleAsk} className="bg-sky-500 hover:bg-sky-600 text-white px-4" disabled={isLoading}>
                                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" onClick={() => { setQuery("ยอดรับจำนำวันนี้"); }}>
                                    ยอดวันนี้
                                </Button>
                                <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" onClick={() => { setQuery("ทรัพย์คงเหลือ"); }}>
                                    ทรัพย์คงเหลือ
                                </Button>
                                <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" onClick={() => { setQuery("ราคาทองวันนี้"); }}>
                                    ราคาทอง
                                </Button>
                            </div>

                            {answer && (
                                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="h-4 w-4 text-sky-400" />
                                        <span className="text-sm font-medium text-sky-400">คำตอบจาก AI</span>
                                    </div>
                                    <p className="text-slate-200 leading-relaxed">{answer}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
