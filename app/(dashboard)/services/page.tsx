import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Calculator, 
    Camera, 
    ShieldAlert, 
    MapPin, 
    ArrowRight, 
    CreditCard,
    BadgePercent,
    Gavel
} from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "คำนวณดอกเบี้ย",
        description: "วางแผนการเงินได้ง่ายๆ ตรวจสอบดอกเบี้ยและยอดไถ่ถอนล่วงหน้า",
        icon: Calculator,
        href: "/services/interest-calculator",
        color: "text-yellow-600",
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        action: "คำนวณเลย"
    },
    {
        title: "ประเมินทรัพย์สินออนไลน์",
        description: "ส่งรูปภาพทรัพย์สินของคุณเพื่อประเมินราคาเบื้องต้น ฟรี ไม่มีค่าใช้จ่าย",
        icon: Camera,
        href: "/services/appraisal",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        action: "ประเมินราคา"
    },
    {
        title: "แจ้งตั๋วจำนำหาย",
        description: "ไม่ต้องกังวลเมื่อตั๋วจำหาย ดูขั้นตอนและเอกสารที่ต้องใช้ได้ที่นี่",
        icon: ShieldAlert,
        href: "/services/lost-ticket",
        color: "text-red-600",
        bg: "bg-red-100 dark:bg-red-900/30",
        action: "ดูข้อมูล"
    },
    {
        title: "ค้นหาสาขา",
        description: "ค้นหาสาขาสถานธนานุเคราะห์ใกล้บ้านคุณ พร้อมเบอร์โทรและแผนที่",
        icon: MapPin,
        href: "/branches",
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/30",
        action: "ค้นหาสาขา"
    },
    {
        title: "ทรัพย์หลุดจำนำ",
        description: "เลือกซื้อทรัพย์สินหลุดจำนำคุณภาพดี ราคายุติธรรม",
        icon: Gavel,
        href: "/assets",
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900/30",
        action: "เลือกซื้อสินค้า"
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-blue-50 pb-10 dark:bg-slate-950">
            {/* Header Content */}
            <div className="bg-blue-100 py-12 dark:bg-slate-900/50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-white md:text-4xl">
                        บริการของเรา
                    </h1>
                    <p className="mt-4 text-lg text-blue-700">
                        สะดวกรวดเร็ว เชื่อถือได้ ด้วยมาตรฐานการบริการระดับมืออาชีพจากสถานธนานุเคราะห์
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto mt-12 px-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <Card key={index} className="group overflow-hidden border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                            <CardHeader>
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${service.bg} ${service.color}`}>
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl group-hover:text-slate-900 dark:group-hover:text-white">
                                    {service.title}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={service.href}>
                                    <Button variant="outline" className="w-full group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900">
                                        {service.action} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="mt-16 rounded-2xl bg-slate-900 p-8 text-white md:p-12">
                    <div className="flex flex-col items-center text-center">
                        <BadgePercent className="mb-4 h-12 w-12 text-yellow-500" />
                        <h2 className="text-2xl font-bold md:text-3xl">อัตราดอกเบี้ยพิเศษ</h2>
                        <p className="mt-4 max-w-2xl text-slate-300">
                            สถานธนานุเคราะห์ให้บริการด้วยอัตราดอกเบี้ยที่เป็นธรรม เริ่มต้นเพียง 0.25% ต่อเดือน
                            เพื่อช่วยเหลือและแบ่งเบาภาระของประชาชน
                        </p>
                        <div className="mt-8">
                            <Link href="/services/interest-calculator">
                                <Button className="bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                                    ตรวจสอบอัตราดอกเบี้ย <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
