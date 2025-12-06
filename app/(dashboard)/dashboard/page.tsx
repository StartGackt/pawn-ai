import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Camera, ShieldAlert, ArrowRight, TrendingUp, Gem, Building2 } from "lucide-react"
import Link from "next/link"
import { GoldPriceDisplay } from "@/components/gold-price-display"
import { ExchangeRateDisplay } from "@/components/exchange-rate-display"
import { LoanRateDisplay } from "@/components/loan-rate-display"
import Image from "next/image"

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 bg-slate-50/50 dark:bg-slate-950/50">
            {/* Hero Section - Premium Gradient */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 py-16 text-white shadow-2xl ring-1 ring-slate-800">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#1e293b)]">
                    <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-01.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay grayscale"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_50%)]"></div>
                    <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>
                </div>
                
                <div className="container relative z-10 mx-auto px-8">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                            </span>
                            <span className="text-sm font-medium text-amber-300">ระบบอัจฉริยะ 2025</span>
                        </div>
                        
                        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:leading-tight">
                            สถานธนานุเคราะห์ <br/>
                            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                                ยุคใหม่
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
                            ยกระดับบริการรับจำนำด้วยมาตรฐานระดับสากล โปร่งใส ตรวจสอบได้ พร้อมนวัตกรรมดิจิทัลเพื่อความสะดวกของคุณ
                        </p>
                        
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold shadow-[0_0_20px_rgba(245,158,11,0.3)] border-0">
                                <Calculator className="mr-2 h-5 w-5" /> คำนวณดอกเบี้ยทันที
                            </Button>
                            <Button size="lg" variant="outline" className="border-slate-700 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm">
                                <Camera className="mr-2 h-5 w-5" /> ประเมินราคาออนไลน์
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bento Grid Layout - Main Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Gold Price - Large Highlight (Span 4) */}
                <div className="md:col-span-12 lg:col-span-4 flex flex-col h-full">
                   <GoldPriceDisplay />
                </div>

                 {/* Quick Services (Span 8) */}
                <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/services/interest-calculator" className="group h-full">
                        <Card className="h-full border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-200 dark:bg-slate-900 dark:border-slate-800">
                             <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 group-hover:scale-110 transition-transform">
                                    <Calculator className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">คำนวณดอกเบี้ย</CardTitle>
                                <CardDescription>วางแผนการไถ่ถอน ตรวจสอบยอดชำระ แบบเรียลไทม์</CardDescription>
                            </CardHeader>
                             <CardContent className="flex justify-end">
                                <div className="rounded-full p-2 bg-slate-50 group-hover:bg-amber-50 transition-colors">
                                     <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500" />
                                </div>
                             </CardContent>
                        </Card>
                    </Link>

                    <Link href="/services/appraisal" className="group h-full">
                        <Card className="h-full border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 dark:bg-slate-900 dark:border-slate-800">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                    <Camera className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">ประเมินทรัพย์สิน</CardTitle>
                                <CardDescription>ส่งรูปภาพทรัพย์สินเพื่อขอรับการประเมินราคาเบื้องต้น</CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-end">
                                <div className="rounded-full p-2 bg-slate-50 group-hover:bg-blue-50 transition-colors">
                                     <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <div className="sm:col-span-2">
                        <LoanRateDisplay mode="compact" className="h-full" />
                    </div>
                </div>

                {/* Exchange Rates (Span 6) */}
                <div className="md:col-span-12 lg:col-span-6">
                     <ExchangeRateDisplay compact />
                </div>

                {/* Assets Promo (Span 6) */}
                <div className="md:col-span-12 lg:col-span-6">
                    <Card className="h-full overflow-hidden border-0 bg-slate-900 text-white shadow-xl relative group">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,#0f172a,#334155)] opacity-90"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621360841012-3f6284a7e946?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-700"></div>
                        <CardHeader className="relative z-10">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 w-fit backdrop-blur-md border border-white/20">
                                <Gem className="h-4 w-4 text-amber-400" />
                                <span className="text-xs font-medium text-amber-200">ทรัพย์หลุดจำนำ</span>
                            </div>
                            <CardTitle className="text-2xl text-white">สินค้าคุณภาพดี ราคาคุ้มค่า</CardTitle>
                            <CardDescription className="text-slate-300">
                                รวมรายการสินค้าหลุดจำนำสภาพดี ตรวจสอบคุณภาพโดยผู้เชี่ยวชาญ
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 mt-4">
                            <div className="mb-6 flex items-end gap-2">
                                <div className="text-5xl font-bold tracking-tighter text-white">1,248</div>
                                <div className="mb-2 font-medium text-slate-400">รายการ</div>
                            </div>
                            <Link href="/assets">
                                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-medium">
                                    ดูรายการทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

            </div>

             {/* Why Choose Us - Footer Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                 <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <div className="p-3 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/20">
                         <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">ดอกเบี้ยต่ำพิเศษ</h3>
                        <p className="text-sm text-slate-500 mt-1">เริ่มต้นเพียง 0.25% - 1.25% ต่อเดือน คิดลดต้นลดดอก</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                         <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">มั่นคง ปลอดภัย</h3>
                        <p className="text-sm text-slate-500 mt-1">รัฐวิสาหกิจสังกัดกระทรวง พม. เชื่อถือได้ 100%</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                     <div className="p-3 rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20">
                         <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">บริการครอบคลุม</h3>
                        <p className="text-sm text-slate-500 mt-1">มีสาขาให้บริการทั่วประเทศ และช่องทางออนไลน์ 24 ชม.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
