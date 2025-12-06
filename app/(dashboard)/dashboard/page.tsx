import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Camera, ShieldAlert, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { GoldPriceDisplay } from "@/components/gold-price-display"
import { ExchangeRateDisplay } from "@/components/exchange-rate-display"

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-sky-600 to-blue-700 py-12 text-white shadow-xl">
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-01.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-linear-to-r from-sky-600/90 via-blue-600/80 to-blue-700/70"></div>
                <div className="container relative mx-auto px-6">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                            สถานธนานุเคราะห์ <span className="text-sky-200">ยุคใหม่</span>
                        </h1>
                        <p className="mt-4 text-lg text-sky-100">
                            บริการรับจำนำด้วยมาตรฐานระดับมืออาชีพ โปร่งใส ตรวจสอบได้ พร้อมบริการออนไลน์ครบวงจร
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/services/interest-calculator">
                                <Button className="bg-white text-sky-700 hover:bg-sky-50">
                                    <Calculator className="mr-2 h-4 w-4" /> คำนวณดอกเบี้ย
                                </Button>
                            </Link>
                            <Link href="/services/appraisal">
                                <Button variant="outline" className="border-sky-300 text-white hover:bg-sky-500/20 hover:text-white">
                                    <Camera className="mr-2 h-4 w-4" /> ประเมินราคาออนไลน์
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Services Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/services/interest-calculator" className="group">
                    <Card className="h-full border-sky-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 dark:border-sky-800">
                        <CardHeader>
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                                <Calculator className="h-5 w-5" />
                            </div>
                            <CardTitle className="group-hover:text-sky-600">คำนวณดอกเบี้ย</CardTitle>
                            <CardDescription>วางแผนการเงิน คำนวณดอกเบี้ยและยอดไถ่ถอนล่วงหน้า</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/services/appraisal" className="group">
                    <Card className="h-full border-sky-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 dark:border-sky-800">
                        <CardHeader>
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <Camera className="h-5 w-5" />
                            </div>
                            <CardTitle className="group-hover:text-blue-600">ประเมินทรัพย์สิน</CardTitle>
                            <CardDescription>ส่งรูปภาพเพื่อประเมินราคาเบื้องต้น ฟรี ไม่มีค่าใช้จ่าย</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/services/lost-ticket" className="group">
                    <Card className="h-full border-sky-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 dark:border-sky-800">
                        <CardHeader>
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
                                <ShieldAlert className="h-5 w-5" />
                            </div>
                            <CardTitle className="group-hover:text-cyan-600">แจ้งตั๋วจำนำหาย</CardTitle>
                            <CardDescription>ขั้นตอนการดำเนินการและเอกสารที่ต้องใช้เมื่อตั๋วหาย</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Gold Price Card - ใช้ Component จริง */}
                <div className="col-span-4">
                    <GoldPriceDisplay />
                </div>

                {/* Exchange Rate Widget */}
                <div className="col-span-3">
                    <ExchangeRateDisplay compact />
                </div>
            </div>

            {/* Full Exchange Rate Table */}
            <div className="grid gap-4">
                <ExchangeRateDisplay showAllCurrencies />
            </div>

            {/* Assets Promo */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-linear-to-r from-sky-600 to-blue-700 text-white">
                    <CardHeader>
                        <CardTitle className="text-white">ทรัพย์หลุดจำนำ</CardTitle>
                        <CardDescription className="text-sky-200">สินค้าคุณภาพดี ราคาคุ้มค่า</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="text-2xl font-bold text-white">1,248</div>
                            <div className="text-sm text-sky-200">รายการพร้อมขาย</div>
                        </div>
                        <Link href="/assets">
                            <Button className="w-full bg-white text-sky-700 hover:bg-sky-50">
                                ดูรายการทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-sky-200 bg-linear-to-br from-sky-50 to-white dark:border-sky-800 dark:from-sky-950/20 dark:to-slate-950">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sky-700 dark:text-sky-400">
                            <TrendingUp className="h-5 w-5" /> ทำไมต้องเลือกเรา?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2"><span className="text-sky-500">✓</span> ดอกเบี้ยต่ำ เริ่มต้น 0.5% ต่อเดือน</li>
                            <li className="flex items-center gap-2"><span className="text-sky-500">✓</span> ประเมินราคาโปร่งใส ตามราคาตลาด</li>
                            <li className="flex items-center gap-2"><span className="text-sky-500">✓</span> รับเงินทันที ไม่ต้องรอนาน</li>
                            <li className="flex items-center gap-2"><span className="text-sky-500">✓</span> บริการออนไลน์ สะดวก ปลอดภัย</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
