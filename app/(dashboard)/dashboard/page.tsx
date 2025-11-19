"use client";

import * as React from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { GoldPriceChart } from "@/components/dashboard/gold-price-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Wallet,
    TrendingUp,
    Archive,
    Users,
    DollarSign,
    Coins,
    Globe,
    Calendar,
    TrendingDown,
    Percent,
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">แดชบอร์ด</h1>
                    <p className="text-muted-foreground">
                        ภาพรวมข้อมูลการจำนำและปัจจัยเศรษฐกิจที่เกี่ยวข้อง
                    </p>
                </div>
                <div className="text-sm text-muted-foreground">
                    อัพเดทล่าสุด: {new Date().toLocaleString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })} น.
                </div>
            </div>

            {/* Main Stats - Pawn Business */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="การจำนำวันนี้"
                    value="156"
                    change={12.5}
                    changeLabel="จากเมื่อวาน"
                    icon={<Wallet className="h-4 w-4" />}
                    description="รายการ"
                />
                <StatCard
                    title="มูลค่าการจำนำ"
                    value="฿8.2M"
                    change={8.3}
                    changeLabel="จากเมื่อวาน"
                    icon={<DollarSign className="h-4 w-4" />}
                    description="บาท"
                />
                <StatCard
                    title="ทรัพย์หลุดจำนำ"
                    value="23"
                    change={-5.2}
                    changeLabel="จากเดือนที่แล้ว"
                    icon={<Archive className="h-4 w-4" />}
                    description="รายการ"
                />
                <StatCard
                    title="อัตราการไถ่ถอน"
                    value="87.5%"
                    change={3.2}
                    changeLabel="จากเดือนที่แล้ว"
                    icon={<TrendingUp className="h-4 w-4" />}
                    description="จาก 1,245 รายการ"
                />
            </div>

            {/* Gold Price & Market Data */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ราคาทองคำในประเทศ</CardTitle>
                        <Coins className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿33,200</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="font-medium text-green-500">+2.5%</span>
                            <span>วันนี้</span>
                        </div>
                        <div className="mt-3 space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ทองคำแท่ง รับซื้อ</span>
                                <span className="font-medium">฿32,800</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ทองรูปพรรณ ขาย</span>
                                <span className="font-medium">฿33,600</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            ข้อมูลจาก: สมาคมค้าทองคำ
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ราคาทองคำโลก</CardTitle>
                        <Globe className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$2,038.50</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="font-medium text-green-500">+1.8%</span>
                            <span>วันนี้</span>
                        </div>
                        <div className="mt-3 space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Gold Spot (XAU/USD)</span>
                                <span className="font-medium">$2,038.50</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">24h High</span>
                                <span className="font-medium">$2,045.20</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            ข้อมูลจาก: COMEX/London Bullion Market
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">อัตราแลกเปลี่ยน</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">35.42</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <TrendingDown className="h-3 w-3 text-red-500" />
                            <span className="font-medium text-red-500">-0.3%</span>
                            <span>วันนี้</span>
                        </div>
                        <div className="mt-3 space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">USD/THB</span>
                                <span className="font-medium">35.42</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">EUR/THB</span>
                                <span className="font-medium">38.15</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            ข้อมูลจาก: ธนาคารแห่งประเทศไทย (BOT)
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Gold Price Chart */}
            <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <GoldPriceChart />
                </div>

                {/* Economic Indicators */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">ตัวชี้วัดเศรษฐกิจ</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Percent className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">อัตราดอกเบี้ยนโยบาย</span>
                                </div>
                                <span className="text-sm font-bold">2.50%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">ธนาคารแห่งประเทศไทย</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">อัตราเงินเฟ้อ (YoY)</span>
                                </div>
                                <span className="text-sm font-bold text-red-500">+1.8%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">ตุลาคม 2025</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">GDP Growth (QoQ)</span>
                                </div>
                                <span className="text-sm font-bold text-green-500">+3.2%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Q3 2025</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Seasonal Index</span>
                                </div>
                                <span className="text-sm font-bold text-amber-500">High</span>
                            </div>
                            <p className="text-xs text-muted-foreground">ช่วงเทศกาลปลายปี</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs: Domestic vs Global Data */}
            <Tabs defaultValue="domestic" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="domestic">ข้อมูลในประเทศ</TabsTrigger>
                    <TabsTrigger value="global">ข้อมูลโลก</TabsTrigger>
                </TabsList>

                <TabsContent value="domestic" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">ปัจจัยเศรษฐกิจในประเทศ</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Private Consumption Index</span>
                                    <span className="text-sm font-semibold text-green-600">+2.8%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Consumer Confidence Index</span>
                                    <span className="text-sm font-semibold">58.4</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Manufacturing PMI</span>
                                    <span className="text-sm font-semibold">51.2</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">ดัชนีความเชื่อมั่นผู้บริโภค</span>
                                    <span className="text-sm font-semibold">48.6</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">พฤติกรรมตามฤดูกาล</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">ช่วงเทศกาลปีใหม่</span>
                                    <span className="text-sm font-semibold text-amber-600">สูง +35%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">ช่วงสงกรานต์</span>
                                    <span className="text-sm font-semibold text-amber-600">สูง +28%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">ช่วงเปิดเทอมเรียน</span>
                                    <span className="text-sm font-semibold text-blue-600">ปานกลาง +15%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">ช่วงปกติ</span>
                                    <span className="text-sm font-semibold text-muted-foreground">ปกติ</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="global" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">ตัวชี้วัดเศรษฐกิจโลก</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">US GDP Growth</span>
                                    <span className="text-sm font-semibold text-green-600">+2.1%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">US Inflation (CPI)</span>
                                    <span className="text-sm font-semibold text-red-600">+3.5%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Fed Interest Rate</span>
                                    <span className="text-sm font-semibold">5.25-5.50%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">DXY Dollar Index</span>
                                    <span className="text-sm font-semibold">103.45</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">ความตึงเครียดทางการเมือง</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Geopolitical Risk Index</span>
                                    <span className="text-sm font-semibold text-amber-600">Moderate</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">VIX Volatility Index</span>
                                    <span className="text-sm font-semibold">18.5</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Safe Haven Demand</span>
                                    <span className="text-sm font-semibold text-green-600">High</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Gold ETF Inflows</span>
                                    <span className="text-sm font-semibold text-green-600">+$2.3B</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Recent Activities */}
            <RecentActivities />
        </div>
    );
}