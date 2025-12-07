"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Info, TrendingUp, Package, AlertCircle, Calculator, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">สรุปยอดประจำวัน (Daily Summary)</h1>
                    <p className="text-slate-500">ข้อมูลประจำวันที่ {currentDate}</p>
                </div>
                <div className="text-sm text-slate-500">
                    อัปเดตล่าสุด: {new Date().toLocaleTimeString('th-TH')}
                </div>
            </div>

            {/* Service Highlights */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-800 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            บริการคำนวณดอกเบี้ย
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-900">128 ครั้ง</div>
                        <p className="text-xs text-yellow-700">การใช้งานวันนี้</p>
                    </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            ประเมินทรัพย์สินออนไลน์
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">45 รายการ</div>
                        <p className="text-xs text-blue-700">ส่งคำขอวันนี้</p>
                    </CardContent>
                </Card>
                 <Card className="bg-purple-50 border-purple-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-purple-800 flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            ทรัพย์รอการขาย
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900">12 ชิ้น</div>
                        <p className="text-xs text-purple-700">ลงรายการใหม่วันนี้</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">รับจำนำใหม่ (วันนี้)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15 รายการ</div>
                        <p className="text-xs text-muted-foreground">+20.1% จากเมื่อวาน</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ไถ่ถอน (วันนี้)</CardTitle>
                        <Package className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8 รายการ</div>
                        <p className="text-xs text-muted-foreground">มูลค่าคืนรวม ฿125,000</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">หลุดจำนำ (วันนี้)</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2 รายการ</div>
                        <p className="text-xs text-muted-foreground">ครบกำหนดเมื่อวาน</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ทรัพย์คงเหลือทั้งหมด</CardTitle>
                        <Package className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,245 รายการ</div>
                        <p className="text-xs text-muted-foreground">มูลค่ารวม: ฿25.45M</p>
                    </CardContent>
                </Card>
            </div>

            {/* AI Q&A Section */}
            <Card className="bg-slate-900 text-white border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-sky-400" />
                        สอบถามข้อมูลระบบ (AI Assistant)
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                        พิมพ์คำถามเกี่ยวกับยอดรับจำนำวันนี้ หรือทรัพย์คงเหลือ
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="ตัวอย่าง 'ยอดรับจำนำวันนี้เท่าไหร่?' หรือ 'ทรัพย์คงเหลือมีกี่รายการ?'"
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                        />
                        <Button onClick={handleAsk} className="bg-sky-500 hover:bg-sky-600 text-white">
                            <Search className="h-4 w-4 mr-2" />
                            ถาม
                        </Button>
                    </div>
                    {answer && (
                        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 animate-in fade-in slide-in-from-top-2">
                            <p className="text-sm font-medium text-sky-300">คำตอบ:</p>
                            <p className="mt-1 text-slate-200">{answer}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
