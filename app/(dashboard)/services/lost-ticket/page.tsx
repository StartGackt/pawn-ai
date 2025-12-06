import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, ShieldAlert, Phone, ArrowRight } from "lucide-react";

export default function LostTicketPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 pb-10 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 py-12 text-white">
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-02.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/90 to-slate-900/50"></div>
                <div className="container relative mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-red-500/20 p-3 backdrop-blur-sm">
                            <ShieldAlert className="h-8 w-8 text-red-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                แจ้งตั๋วจำนำ <span className="text-red-400">หาย</span>
                            </h1>
                            <p className="mt-2 text-slate-300">
                                ขั้นตอนการดำเนินการเมื่อทำตั๋วจำนำหาย เพื่อความปลอดภัยของทรัพย์สินท่าน
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8 px-4">
                <div className="mx-auto max-w-4xl">
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Step 1 */}
                        <Card className="relative overflow-hidden border-slate-200 transition-all hover:shadow-lg dark:border-slate-800">
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                            <div className="absolute right-2 top-2 text-4xl font-black text-slate-200 dark:text-slate-700">01</div>
                            <CardHeader>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <CardTitle>ติดต่อสาขา</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    รีบติดต่อสาขาที่ท่านได้ทำการจำนำไว้ทันที เพื่อแจ้งอายัดตั๋วจำนำ ป้องกันผู้อื่นแอบอ้างนำตั๋วไปไถ่ถอน
                                </p>
                            </CardContent>
                        </Card>

                        {/* Step 2 */}
                        <Card className="relative overflow-hidden border-slate-200 transition-all hover:shadow-lg dark:border-slate-800">
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                            <div className="absolute right-2 top-2 text-4xl font-black text-slate-200 dark:text-slate-700">02</div>
                            <CardHeader>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <CardTitle>แจ้งความ</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    นำบัตรประชาชนไปแจ้งความที่สถานีตำรวจในท้องที่ที่ตั๋วหาย เพื่อลงบันทึกประจำวันเป็นหลักฐาน
                                </p>
                            </CardContent>
                        </Card>

                        {/* Step 3 */}
                        <Card className="relative overflow-hidden border-slate-200 transition-all hover:shadow-lg dark:border-slate-800">
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                            <div className="absolute right-2 top-2 text-4xl font-black text-slate-200 dark:text-slate-700">03</div>
                            <CardHeader>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <CardTitle>ออกตั๋วใหม่</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    นำใบแจ้งความและบัตรประชาชนตัวจริง มาติดต่อที่สาขาเดิม เพื่อขอออกใบแทนตั๋วจำนำ (มีค่าธรรมเนียม)
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 rounded-xl bg-slate-100 p-6 dark:bg-slate-900">
                        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                            <ShieldAlert className="h-5 w-5 text-red-500" />
                            ข้อควรระวัง
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>หากท่านไม่แจ้งอายัดทันที ทางสถานธนานุเคราะห์จะไม่รับผิดชอบหากมีผู้อื่นนำตั๋วมาไถ่ถอนไปแล้ว</li>
                            <li>การขอออกใบแทนตั๋วจำนำ ต้องดำเนินการโดยเจ้าของตั๋วจำนำเท่านั้น (มอบอำนาจไม่ได้ในกรณีนี้)</li>
                            <li>ค่าธรรมเนียมการออกใบแทนตั๋วจำนำ เป็นไปตามระเบียบของสถานธนานุเคราะห์</li>
                        </ul>
                    </div>

                    <div className="mt-8 text-center">
                        <Button className="bg-slate-900 text-white hover:bg-slate-800" size="lg">
                            ค้นหาสาขาใกล้ฉัน <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
