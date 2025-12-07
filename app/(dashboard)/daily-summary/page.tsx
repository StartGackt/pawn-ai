"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, TrendingUp, Package, AlertCircle, Calculator, Camera, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function DailySummaryPage() {
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);

    const handleAsk = () => {
        if (!query) return;
        if (query.includes("inventory") || query.includes("คงเหลือ")) {
            setAnswer(`ณ วันที่ ${currentDate} มีทรัพย์จำนำคงเหลือในระบบจำนวน 1,245 รายการ มูลค่ารวม 25,450,000 บาท`);
        } else if (query.includes("today") || query.includes("วันนี้")) {
            setAnswer(`วันนี้ (${currentDate}) มีการรับจำนำใหม่ 15 รายการ มูลค่า 350,000 บาท และมีการไถ่ถอน 8 รายการ`);
        } else {
            setAnswer("ขออภัย ระบบยังไม่เข้าใจคำถามนี้ โปรดลองถามเกี่ยวกับ 'ทรัพย์คงเหลือ' หรือ 'ยอดวันนี้'");
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                            <Clock className="mr-1.5 h-3 w-3" />
                            Daily Report
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">สรุปยอดประจำวัน</h1>
                    <p className="text-sm text-slate-500 mt-0.5">ข้อมูลประจำวันที่ {currentDate}</p>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    อัปเดตล่าสุด: {new Date().toLocaleTimeString('th-TH')}
                </div>
            </div>

            {/* Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-amber-50 rounded-lg">
                                <Calculator className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">บริการคำนวณดอกเบี้ย</p>
                                <p className="text-xl font-bold text-slate-900">128 <span className="text-xs font-normal text-slate-400">ครั้ง</span></p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 rounded-lg">
                                <Camera className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">ประเมินทรัพย์สินออนไลน์</p>
                                <p className="text-xl font-bold text-slate-900">45 <span className="text-xs font-normal text-slate-400">รายการ</span></p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-purple-50 rounded-lg">
                                <Package className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">ทรัพย์รอการขาย</p>
                                <p className="text-xl font-bold text-slate-900">12 <span className="text-xs font-normal text-slate-400">ชิ้น</span></p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-slate-500">รับจำนำใหม่</p>
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">15</p>
                        <div className="flex items-center gap-1 mt-1">
                            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                            <span className="text-xs text-emerald-600">+20.1%</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-slate-500">ไถ่ถอน</p>
                            <Package className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">8</p>
                        <p className="text-xs text-slate-400 mt-1">฿125,000</p>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-slate-500">หลุดจำนำ</p>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-2xl font-bold text-red-600">2</p>
                        <p className="text-xs text-slate-400 mt-1">ครบกำหนดเมื่อวาน</p>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-slate-500">ทรัพย์คงเหลือ</p>
                            <Package className="h-4 w-4 text-amber-500" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">1,245</p>
                        <p className="text-xs text-slate-400 mt-1">฿25.45M</p>
                    </CardContent>
                </Card>
            </div>

            {/* AI Q&A Section */}
            <Card className="border-slate-200 shadow-sm bg-linear-to-br from-slate-900 to-slate-800 text-white">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-sky-400" />
                        AI Assistant
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                        พิมพ์คำถามเกี่ยวกับยอดรับจำนำวันนี้ หรือทรัพย์คงเหลือ
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex gap-2">
                        <Input
                            placeholder="เช่น 'ยอดรับจำนำวันนี้เท่าไหร่?' หรือ 'ทรัพย์คงเหลือมีกี่รายการ?'"
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm h-9"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                        />
                        <Button onClick={handleAsk} className="bg-sky-500 hover:bg-sky-600 text-white h-9 px-3">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    {answer && (
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <p className="text-xs font-medium text-sky-400 mb-1">คำตอบ:</p>
                            <p className="text-sm text-slate-200">{answer}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
