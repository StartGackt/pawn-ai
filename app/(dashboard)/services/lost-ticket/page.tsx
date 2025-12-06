import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, ShieldAlert, Phone, ArrowRight } from "lucide-react";

export default function LostTicketPage() {
    return (
        <div className="min-h-screen bg-sky-50/50 pb-10 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-linear-to-r from-sky-600 to-blue-700 py-12 text-white">
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-02.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-linear-to-r from-sky-600/90 via-blue-600/80 to-blue-700/70"></div>
                <div className="container relative mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                            <ShieldAlert className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                แจ้งตั๋วจำนำ <span className="text-sky-200">หาย</span>
                            </h1>
                            <p className="mt-2 text-sky-100">
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
                        <Card className="relative overflow-hidden border-sky-200 transition-all hover:shadow-lg hover:shadow-sky-100 dark:border-sky-800">
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-sky-100 dark:bg-sky-900/30"></div>
                            <div className="absolute right-2 top-2 text-4xl font-black text-sky-200 dark:text-sky-800">01</div>
                            <CardHeader>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
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
                        <Card className="relative overflow-hidden border-sky-200 transition-all hover:shadow-lg hover:shadow-sky-100 dark:border-sky-800">
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-sky-100 dark:bg-sky-900/30"></div>
                            <div className="absolute right-2 top-2 text-4xl font-black text-sky-200 dark:text-sky-800">02</div>
                            <CardHeader>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
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
                        <Card className="relative overflow-hidden border-sky-200 transition-all hover:shadow-lg hover:shadow-sky-100 dark:border-sky-800">
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-sky-100 dark:bg-sky-900/30"></div>
                            <div className="absolute right-2 top-2 text-4xl font-black text-sky-200 dark:text-sky-800">03</div>
                            <CardHeader>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
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

                    <div className="mt-8 rounded-xl bg-sky-100 p-6 dark:bg-sky-900/20">
                        <h3 className="mb-4 flex items-center gap-2 font-bold text-sky-900 dark:text-sky-100">
                            <ShieldAlert className="h-5 w-5 text-sky-600" />
                            ข้อควรระวัง
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-sm text-sky-700 dark:text-sky-300">
                            <li>หากท่านไม่แจ้งอายัดทันที ทางสถานธนานุเคราะห์จะไม่รับผิดชอบหากมีผู้อื่นนำตั๋วมาไถ่ถอนไปแล้ว</li>
                            <li>การขอออกใบแทนตั๋วจำนำ ต้องดำเนินการโดยเจ้าของตั๋วจำนำเท่านั้น (มอบอำนาจไม่ได้ในกรณีนี้)</li>
                            <li>ค่าธรรมเนียมการออกใบแทนตั๋วจำนำ เป็นไปตามระเบียบของสถานธนานุเคราะห์</li>
                        </ul>
                    </div>

                    <div className="mt-8 text-center">
                        <Button className="bg-sky-600 text-white hover:bg-sky-700" size="lg">
                            ค้นหาสาขาใกล้ฉัน <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
