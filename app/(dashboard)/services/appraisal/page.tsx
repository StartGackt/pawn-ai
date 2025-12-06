"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, Send, CheckCircle2 } from "lucide-react"

export default function AppraisalPage() {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-4 dark:bg-slate-950">
                <Card className="w-full max-w-md text-center shadow-xl">
                    <CardContent className="pt-10 pb-10">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">ส่งข้อมูลสำเร็จ</h2>
                        <p className="mb-8 text-slate-500">
                            เจ้าหน้าที่ได้รับข้อมูลการประเมินทรัพย์สินของท่านแล้ว <br/>
                            จะติดต่อกลับภายใน 24 ชั่วโมง
                        </p>
                        <Button onClick={() => setSubmitted(false)} className="w-full bg-slate-900 text-white hover:bg-slate-800">
                            ส่งรายการอื่น
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-10 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 py-12 text-white">
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-04.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/90 to-slate-900/50"></div>
                <div className="container relative mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-500/20 p-3 backdrop-blur-sm">
                            <Camera className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                ประเมินทรัพย์สิน <span className="text-blue-400">ออนไลน์</span>
                            </h1>
                            <p className="mt-2 text-slate-300">
                                ส่งรูปและรายละเอียดทรัพย์สินเพื่อรับราคาประเมินเบื้องต้น ฟรี! ไม่มีค่าใช้จ่าย
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8 px-4">
                <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
                    <Card className="border-slate-200 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle>แบบฟอร์มขอรับการประเมินราคา</CardTitle>
                            <CardDescription>
                                กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความแม่นยำในการประเมิน
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">1</div>
                                    ข้อมูลผู้ติดต่อ
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                                        <Input id="name" placeholder="ระบุชื่อ-นามสกุล" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                                        <Input id="phone" placeholder="08x-xxx-xxxx" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">อีเมล (ถ้ามี)</Label>
                                        <Input id="email" type="email" placeholder="example@email.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="line">Line ID</Label>
                                        <Input id="line" placeholder="@username" />
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                            {/* Asset Info */}
                            <div className="space-y-4">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">2</div>
                                    ข้อมูลทรัพย์สิน
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>ประเภททรัพย์สิน</Label>
                                        <Select required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="เลือกประเภท" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="gold">ทองคำ</SelectItem>
                                                <SelectItem value="diamond">เพชร/อัญมณี</SelectItem>
                                                <SelectItem value="watch">นาฬิกา</SelectItem>
                                                <SelectItem value="brandname">กระเป๋าแบรนด์เนม</SelectItem>
                                                <SelectItem value="electronics">สินค้าไอที</SelectItem>
                                                <SelectItem value="other">อื่นๆ</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="brand">ยี่ห้อ/รุ่น</Label>
                                        <Input id="brand" placeholder="เช่น Rolex Submariner, iPhone 14" required />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="details">รายละเอียดเพิ่มเติม</Label>
                                        <Textarea 
                                            id="details" 
                                            placeholder="ระบุสภาพสินค้า, ปีที่ซื้อ, อุปกรณ์ที่มี (กล่อง/ใบรับประกัน) หรือตำหนิต่างๆ" 
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="price">ราคาที่ต้องการ (บาท)</Label>
                                        <Input id="price" type="number" placeholder="ระบุราคาที่คาดหวัง" />
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">3</div>
                                    รูปภาพประกอบ
                                </h3>
                                <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center transition-colors hover:border-blue-400 dark:border-slate-700">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 dark:bg-blue-900/20">
                                        <Upload className="h-6 w-6" />
                                    </div>
                                    <h4 className="text-sm font-medium">ลากไฟล์มาวาง หรือ คลิกเพื่ออัพโหลด</h4>
                                    <p className="mt-1 text-xs text-slate-500">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB (สูงสุด 5 รูป)</p>
                                    <Input type="file" className="hidden" id="file-upload" multiple accept="image/*" />
                                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
                                        เลือกรูปภาพ
                                    </Button>
                                </div>
                            </div>

                            {/* Branch Selection */}
                            <div className="space-y-4">
                                <Label>สาขาที่สะดวกใช้บริการ</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกสาขาใกล้บ้าน" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bkk">กรุงเทพฯ และปริมณฑล</SelectItem>
                                        <SelectItem value="north">ภาคเหนือ</SelectItem>
                                        <SelectItem value="ne">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                                        <SelectItem value="central">ภาคกลาง</SelectItem>
                                        <SelectItem value="south">ภาคใต้</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 border-t bg-slate-50 p-6 dark:bg-slate-900/50">
                            <Button variant="ghost" type="button">ยกเลิก</Button>
                            <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                                <Send className="mr-2 h-4 w-4" />
                                ส่งข้อมูลประเมิน
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}
