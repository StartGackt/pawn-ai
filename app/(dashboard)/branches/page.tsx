"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Phone,
    Clock,
    Navigation,
    Search,
    Mail,
    Building2,
    ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for pawn shops (Updated with Head Office)
const pawnShops = [
    {
        id: 0,
        name: "สำนักงานใหญ่ (Head Office)",
        address: "1034 อาคาร 8 บริเวณกรมพัฒนาสังคมและสวัสดิการ ถ.กรุงเกษม แขวงมหานาค เขตป้อมปราบศัตรูพ่าย กรุงเทพฯ",
        phone: "0-2281-7500",
        hours: "08:30 - 16:30",
        status: "open",
        coordinates: { lat: 13.754, lng: 100.516 },
        image: "https://www.pawn.co.th/assets/images/banner/banner-02.jpg",
        isHeadOffice: true,
        email: "Support@pawn.co.th"
    },
    {
        id: 1,
        name: "สาขาสะพานควาย",
        address: "123 ถ.พหลโยธิน แขวงสามเสนใน เขตพญาไท กทม. 10400",
        phone: "02-271-1111",
        hours: "08:00 - 16:30",
        status: "open",
        coordinates: { lat: 13.7900, lng: 100.5500 },
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "สาขาปากเกร็ด",
        address: "45/6 ถ.แจ้งวัฒนะ ต.ปากเกร็ด อ.ปากเกร็ด จ.นนทบุรี 11120",
        phone: "02-583-2222",
        hours: "08:00 - 16:30",
        status: "open",
        coordinates: { lat: 13.9100, lng: 100.5000 },
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "สาขาบางแค",
        address: "789 ถ.เพชรเกษม แขวงบางแคเหนือ เขตบางแค กทม. 10160",
        phone: "02-454-3333",
        hours: "08:00 - 16:30",
        status: "closed",
        coordinates: { lat: 13.7100, lng: 100.4200 },
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "สาขาพระโขนง",
        address: "101 ถ.สุขุมวิท แขวงพระโขนงเหนือ เขตวัฒนา กทม. 10110",
        phone: "02-391-4444",
        hours: "08:00 - 16:30",
        status: "open",
        coordinates: { lat: 13.7150, lng: 100.5900 },
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
    },
];

// Mock data for assets in branches
const branchAssets: Record<number, Array<Record<string, string>>> = {
    1: [
        { id: "G001", name: "ทองคำแท่ง 1 บาท", category: "gold", price: "฿33,500", image: "https://images.unsplash.com/photo-1610375461490-6d615d374744?q=80&w=600&auto=format&fit=crop" },
        { id: "C001", name: "Canon EOS R5", category: "camera", price: "฿95,000", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" },
        { id: "W001", name: "Rolex Submariner", category: "watch", price: "฿320,000", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop" },
    ],
    2: [
        { id: "S001", name: "สร้อยคอเงินแท้", category: "silver", price: "฿1,500", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
        { id: "E001", name: "Smart TV 55\"", category: "electrical", price: "฿12,000", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop" },
    ],
    4: [
        { id: "D001", name: "แหวนเพชร 0.5 กะรัต", category: "diamond", price: "฿45,000", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop" },
        { id: "T001", name: "สว่านไร้สาย Bosch", category: "tool", price: "฿3,500", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop" },
    ],
    0: []
};

interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    hours: string;
    status: string;
    coordinates: { lat: number; lng: number };
    image: string;
    isHeadOffice?: boolean;
    email?: string;
}

function BranchCard({ branch }: { branch: Branch }) {
    const assets = branchAssets[branch.id] || [];

    return (
        <Card className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                    src={branch.image}
                    alt={branch.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-3 right-3 z-10">
                    <Badge className={`${branch.status === "open" ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-slate-500 text-white"} shadow-lg backdrop-blur-md border-0 px-2.5 py-1 font-medium`}>
                        {branch.status === "open" ? "เปิดทำการ" : "ปิดทำการ"}
                    </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold leading-tight mb-2 drop-shadow-md">{branch.name}</h3>
                    <div className="flex items-center gap-2 text-slate-200 text-xs font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{branch.hours}</span>
                    </div>
                </div>
            </div>

            <CardContent className="flex flex-col flex-1 p-5">
                <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 dark:bg-blue-900/20">
                             <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed dark:text-slate-400">{branch.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 dark:bg-blue-900/20">
                            <Phone className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{branch.phone}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    {assets.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    ทรัพย์หลุดจำนำ ({assets.length})
                                </span>
                                <Button variant="link" className="h-auto p-0 text-xs text-amber-600 hover:text-amber-700 dark:text-amber-500">
                                    ดูทั้งหมด
                                </Button>
                            </div>
                            <div className="flex -space-x-3 overflow-hidden py-1">
                                {assets.slice(0, 3).map((asset, i) => (
                                    <div key={i} className="relative h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-sm overflow-hidden bg-slate-100">
                                        <img src={asset.image} alt="" className="h-full w-full object-cover" />
                                    </div>
                                ))}
                                {assets.length > 3 && (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-900">
                                        +{assets.length - 3}
                                    </div>
                                )}
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm dark:bg-slate-800 dark:hover:bg-slate-700" size="sm">
                                        ดูรายการทรัพย์สิน
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] rounded-2xl">
                                    <DialogHeader>
                                        <DialogTitle>ทรัพย์สินหลุดจำนำ - {branch.name}</DialogTitle>
                                    </DialogHeader>
                                    {/* Content remains same, verifying it exists in code */}
                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        {assets.map((asset) => (
                                            <div key={asset.id} className="flex gap-3 p-2 rounded-lg border border-slate-100">
                                                <img src={asset.image} className="h-16 w-16 rounded-md object-cover bg-slate-100" />
                                                <div className="flex flex-col justify-center">
                                                    <p className="font-semibold text-sm line-clamp-1">{asset.name}</p>
                                                    <p className="text-amber-600 font-bold text-sm">{asset.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="h-6"></div> {/* Spacer to match height */}
                            <Button variant="outline" className="w-full rounded-xl border-slate-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-blue-900/20" size="sm">
                                <Navigation className="mr-2 h-4 w-4" />
                                นำทางไปยังสาขา
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default function BranchesPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 pb-20 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 py-24 text-white">
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-02.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/50"></div>
                
                {/* Decorative */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full"></div>

                <div className="container relative mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-400 mb-6 backdrop-blur-sm shadow-lg shadow-amber-500/5">
                        <Building2 className="h-4 w-4" />
                        <span>เครือข่ายสถานธนานุเคราะห์</span>
                    </div>
                    
                    <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl drop-shadow-2xl mb-6">
                        ค้นหาสาขา <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">สธค.</span>
                    </h1>
                    
                    <p className="mx-auto max-w-2xl text-lg text-slate-300 leading-relaxed font-light">
                        ให้บริการครอบคลุมทั่วกรุงเทพฯ และปริมณฑล ด้วยมาตรฐานเดียวกันทั้ง 47 สาขา
                        <br className="hidden md:inline" /> มั่นใจ ปลอดภัย ดอกเบี้ยต่ำ
                    </p>

                    <div className="mx-auto mt-12 max-w-2xl relative z-10">
                        <div className="relative flex items-center bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-2 ring-1 ring-white/10 transition-all focus-within:ring-amber-500/50 focus-within:bg-white/10">
                            <Search className="ml-4 h-6 w-6 text-slate-400" />
                            <Input
                                placeholder="ค้นหาสาขา, เขต, หรือจังหวัด..."
                                className="h-14 border-0 bg-transparent px-4 text-lg text-white placeholder:text-slate-500 focus-visible:ring-0"
                            />
                            <Button className="h-12 px-8 rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-105">
                                ค้นหา
                            </Button>
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-400">
                            <span>คำค้นยอดนิยม:</span>
                            <button className="text-amber-400 hover:text-amber-300 hover:underline transition-colors">ปทุมวัน</button>,
                            <button className="text-amber-400 hover:text-amber-300 hover:underline transition-colors">นนทบุรี</button>,
                            <button className="text-amber-400 hover:text-amber-300 hover:underline transition-colors">ลำลูกกา</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10 pb-16">
                {/* Head Office - Premium Feature Card */}
                <div className="mb-16">
                    {pawnShops.filter(b => b.isHeadOffice).map(branch => (
                        <Card key={branch.id} className="group overflow-hidden border border-amber-200/50 bg-white shadow-2xl shadow-slate-200/50 rounded-[2rem] relative dark:bg-slate-900 dark:border-amber-900/30 dark:shadow-black/50">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-7/12 relative min-h-[400px] overflow-hidden">
                                     <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-slate-900/0 transition-colors duration-500"></div>
                                    <div className="absolute top-6 left-6 z-20">
                                        <Badge className="bg-white/95 text-slate-900 backdrop-blur-xl shadow-lg border-0 px-4 py-1.5 text-sm font-bold tracking-wide">
                                            ⭐️ สำนักงานใหญ่
                                        </Badge>
                                    </div>
                                    <img
                                        src={branch.image}
                                        alt={branch.name}
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <div className="lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30">
                                            <span className="relative flex h-2.5 w-2.5">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                            </span>
                                            เปิดทำการ {branch.hours}
                                        </div>
                                    </div>

                                    <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight dark:text-white">
                                        สถานธนานุเคราะห์ <br/> 
                                        <span className="text-slate-500 text-2xl font-semibold dark:text-slate-400">(สำนักงานใหญ่)</span>
                                    </h2>

                                    <div className="space-y-8 mb-10">
                                        <div className="flex items-start gap-5">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-900/20 dark:text-blue-400">
                                                <MapPin className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 mb-1 dark:text-white">ที่อยู่</p>
                                                <p className="text-slate-600 leading-relaxed dark:text-slate-400">{branch.address}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                    <Phone className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase text-slate-400 mb-0.5">เบอร์โทรศัพท์</p>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{branch.phone}</p>
                                                </div>
                                            </div>
                                            {branch.email && (
                                                <div className="flex items-start gap-4">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                        <Mail className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold uppercase text-slate-400 mb-0.5">อีเมล</p>
                                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{branch.email}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button size="lg" className="flex-1 bg-slate-900 text-white hover:bg-slate-800 h-14 rounded-xl text-base font-semibold shadow-lg shadow-slate-900/10 dark:bg-amber-500 dark:text-slate-900 dark:hover:bg-amber-400">
                                            <Navigation className="mr-2 h-5 w-5" />
                                            ขอเส้นทาง
                                        </Button>
                                        <Button size="lg" variant="outline" className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 h-14 rounded-xl text-base font-semibold dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                                            <Phone className="mr-2 h-5 w-5" />
                                            โทรออก
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Other Branches Grid */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 px-2">
                    <div>
                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-8 w-1.5 rounded-full bg-amber-500 block"></span>
                            สาขาทั้งหมด
                        </h3>
                        <p className="text-slate-500 mt-1 dark:text-slate-400">ค้นพบเครือข่ายให้บริการใกล้บ้านคุณ</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                         <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 py-1.5 px-3 rounded-lg dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400">
                            ทั้งหมด {pawnShops.length - 1} สาขา
                        </Badge>
                    </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {pawnShops.filter(b => !b.isHeadOffice).map((branch) => (
                        <BranchCard key={branch.id} branch={branch} />
                    ))}
                </div>
            </div>
        </div>
    );
}
