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
            <div className="relative overflow-hidden rounded-xl bg-slate-900 py-12 text-white shadow-xl">
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-01.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/90 to-slate-900/50"></div>
                <div className="container relative mx-auto px-6">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                            สถานธนานุเคราะห์ <span className="text-yellow-500">ยุคใหม่</span>
                        </h1>
                        <p className="mt-4 text-lg text-slate-300">
                            บริการรับจำนำด้วยมาตรฐานระดับมืออาชีพ โปร่งใส ตรวจสอบได้ พร้อมบริการออนไลน์ครบวงจร
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/services/interest-calculator">
                                <Button className="bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                                    <Calculator className="mr-2 h-4 w-4" /> คำนวณดอกเบี้ย
                                </Button>
                            </Link>
                            <Link href="/services/appraisal">
                                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 hover:text-white">
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
                    <Card className="h-full border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800">
                        <CardHeader>
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500">
                                <Calculator className="h-5 w-5" />
                            </div>
                            <CardTitle className="group-hover:text-yellow-600">คำนวณดอกเบี้ย</CardTitle>
                            <CardDescription>วางแผนการเงิน คำนวณดอกเบี้ยและยอดไถ่ถอนล่วงหน้า</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/services/appraisal" className="group">
                    <Card className="h-full border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800">
                        <CardHeader>
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500">
                                <Camera className="h-5 w-5" />
                            </div>
                            <CardTitle className="group-hover:text-blue-600">ประเมินทรัพย์สิน</CardTitle>
                            <CardDescription>ส่งรูปภาพเพื่อประเมินราคาเบื้องต้น ฟรี ไม่มีค่าใช้จ่าย</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/services/lost-ticket" className="group">
                    <Card className="h-full border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800">
                        <CardHeader>
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500">
                                <ShieldAlert className="h-5 w-5" />
                            </div>
                            <CardTitle className="group-hover:text-red-600">แจ้งตั๋วจำนำหาย</CardTitle>
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
                <Card className="bg-slate-900 text-white">
                    <CardHeader>
                        <CardTitle className="text-white">ทรัพย์หลุดจำนำ</CardTitle>
                        <CardDescription className="text-slate-400">สินค้าคุณภาพดี ราคาคุ้มค่า</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="text-2xl font-bold text-yellow-500">1,248</div>
                            <div className="text-sm text-slate-400">รายการพร้อมขาย</div>
                        </div>
                        <Link href="/assets">
                            <Button className="w-full bg-white text-slate-900 hover:bg-slate-200">
                                ดูรายการทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-linear-to-br from-yellow-50 to-white dark:border-yellow-900/50 dark:from-yellow-950/20 dark:to-slate-950">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-500">
                            <TrendingUp className="h-5 w-5" /> ทำไมต้องเลือกเรา?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>✓ ดอกเบี้ยต่ำ เริ่มต้น 0.5% ต่อเดือน</li>
                            <li>✓ ประเมินราคาโปร่งใส ตามราคาตลาด</li>
                            <li>✓ รับเงินทันที ไม่ต้องรอนาน</li>
                            <li>✓ บริการออนไลน์ สะดวก ปลอดภัย</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
