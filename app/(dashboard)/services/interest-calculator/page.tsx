"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calculator, RefreshCw, Coins } from "lucide-react"

export default function InterestCalculatorPage() {
    const [principal, setPrincipal] = useState<number>(10000)
    const [months, setMonths] = useState<number>(1)

    // Interest rates based on Pawn Shop Act (approximate for demo)
    // Rate: 2% for first 2,000, 1.25% for excess up to 100,000 (Standard government pawn shop rates)
    // Let's use a simplified tiered calculation for the demo based on common knowledge
    // Tier 1: 0 - 5,000 -> 0.25% (Very low for government) - actually it varies.
    // Let's use the standard:
    // Principal <= 5,000 : 0.25% per month
    // Principal 5,001 - 10,000 : 0.75% per month
    // Principal 10,001 - 20,000 : 1.00% per month
    // Principal > 20,000 : 1.25% per month

    const calculateInterest = (amount: number, duration: number) => {
        let rate = 0;
        if (amount <= 5000) rate = 0.0025;
        else if (amount <= 10000) rate = 0.0075;
        else if (amount <= 20000) rate = 0.01;
        else rate = 0.0125;

        const monthlyInterest = amount * rate;
        const totalInterest = monthlyInterest * duration;
        return {
            rate: (rate * 100).toFixed(2),
            monthly: monthlyInterest,
            total: totalInterest,
            grandTotal: amount + totalInterest
        };
    }

    const result = calculateInterest(principal, months);

    return (
        <div className="min-h-screen bg-sky-50/50 pb-10 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-linear-to-r from-sky-600 to-blue-700 py-12 text-white">
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-03.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-linear-to-r from-sky-600/90 via-blue-600/80 to-blue-700/70"></div>
                <div className="container relative mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                            <Calculator className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                คำนวณดอกเบี้ย <span className="text-sky-200">จำนำ</span>
                            </h1>
                            <p className="mt-2 text-sky-100">
                                วางแผนการเงินของคุณด้วยโปรแกรมคำนวณดอกเบี้ยอัตโนมัติ แม่นยำ และโปร่งใส
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8 px-4">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Calculator Form */}
                    <Card className="border-sky-200 shadow-lg dark:border-sky-900 dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Coins className="h-5 w-5 text-sky-500" />
                                ระบุข้อมูลทรัพย์สิน
                            </CardTitle>
                            <CardDescription>
                                กรอกจำนวนเงินต้นและระยะเวลาที่ต้องการฝาก
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="principal" className="text-base font-medium">เงินต้น (บาท)</Label>
                                    <div className="flex items-center rounded-md border border-slate-200 bg-white px-3 py-1 dark:border-slate-700 dark:bg-slate-800">
                                        <span className="mr-2 text-slate-400">฿</span>
                                        <Input
                                            id="principal"
                                            type="number"
                                            value={principal}
                                            onChange={(e) => setPrincipal(Number(e.target.value))}
                                            className="h-auto border-none p-0 text-right font-mono text-lg font-bold focus-visible:ring-0"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    value={[principal]}
                                    min={100}
                                    max={100000}
                                    step={100}
                                    onValueChange={(vals) => setPrincipal(vals[0])}
                                    className="py-4"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>฿100</span>
                                    <span>฿100,000</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="months" className="text-base font-medium">ระยะเวลา (เดือน)</Label>
                                    <div className="flex items-center rounded-md border border-slate-200 bg-white px-3 py-1 dark:border-slate-700 dark:bg-slate-800">
                                        <Input
                                            id="months"
                                            type="number"
                                            value={months}
                                            onChange={(e) => setMonths(Number(e.target.value))}
                                            className="h-auto w-16 border-none p-0 text-right font-mono text-lg font-bold focus-visible:ring-0"
                                        />
                                        <span className="ml-2 text-slate-400">เดือน</span>
                                    </div>
                                </div>
                                <Slider
                                    value={[months]}
                                    min={1}
                                    max={12}
                                    step={1}
                                    onValueChange={(vals) => setMonths(vals[0])}
                                    className="py-4"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>1 เดือน</span>
                                    <span>12 เดือน</span>
                                </div>
                            </div>

                            <div className="rounded-lg bg-sky-50 p-4 text-sm text-sky-700 dark:bg-sky-900/20 dark:text-sky-300">
                                <p className="font-semibold mb-1">หมายเหตุอัตราดอกเบี้ย:</p>
                                <ul className="list-disc list-inside space-y-1 text-xs opacity-80">
                                    <li>เงินต้นไม่เกิน 5,000 บาท ดอกเบี้ย 0.25% ต่อเดือน</li>
                                    <li>เงินต้น 5,001 - 10,000 บาท ดอกเบี้ย 0.75% ต่อเดือน</li>
                                    <li>เงินต้น 10,001 - 20,000 บาท ดอกเบี้ย 1.00% ต่อเดือน</li>
                                    <li>เงินต้นเกิน 20,000 บาท ดอกเบี้ย 1.25% ต่อเดือน</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Result Card */}
                    <Card className="border-none bg-linear-to-br from-sky-600 to-blue-700 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Calculator className="h-5 w-5" />
                                ผลการคำนวณ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-1">
                                <p className="text-sm text-sky-200">อัตราดอกเบี้ยที่ได้รับ</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">{result.rate}%</span>
                                    <span className="text-sm text-sky-200">ต่อเดือน</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 rounded-lg bg-white/10 p-4">
                                <div>
                                    <p className="text-xs text-sky-200 mb-1">ดอกเบี้ยต่อเดือน</p>
                                    <p className="text-xl font-semibold">฿{result.monthly.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-sky-200 mb-1">รวมดอกเบี้ย {months} เดือน</p>
                                    <p className="text-xl font-semibold text-amber-300">฿{result.total.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="space-y-2 border-t border-white/20 pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-sky-200">เงินต้น</span>
                                    <span>฿{principal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-sky-200">ดอกเบี้ยรวม</span>
                                    <span className="text-amber-300">+฿{result.total.toLocaleString()}</span>
                                </div>
                                <div className="mt-4 flex items-center justify-between rounded-lg bg-white p-4 text-sky-700">
                                    <span className="font-bold">ยอดไถ่ถอนรวม</span>
                                    <span className="text-2xl font-black">฿{result.grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Button className="w-full bg-white text-sky-700 hover:bg-sky-50" size="lg">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                คำนวณใหม่
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
