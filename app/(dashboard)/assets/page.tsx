"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Gem,
    Camera,
    Watch,
    TrendingUp,
    Glasses,
    Tv,
    Wrench,
    Coins,
    ShoppingBag,
    Search,
    Filter,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Asset {
    id: string;
    name: string;
    brand?: string;
    weight?: string;
    purity?: string;
    condition?: string;
    estimatedPrice: string;
    location: string;
    auctionDate: string;
    status: string;
    image: string;
}

// Mock data ทรัพย์สิน สธค. (Updated with real categories)
const forfeitedAssets = {
    gold: [
        {
            id: "G001",
            name: "ทองคำแท่ง 96.5%",
            weight: "1 บาท",
            purity: "96.5%",
            estimatedPrice: "฿33,500",
            location: "สาขากลาง",
            auctionDate: "15 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1610375461490-6d615d374744?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "G002",
            name: "สร้อยคอทองคำ",
            weight: "2 บาท",
            purity: "96.5%",
            estimatedPrice: "฿67,000",
            location: "สาขาตะวันออก",
            auctionDate: "20 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600&auto=format&fit=crop"
        },
    ],
    silver: [
        {
            id: "S001",
            name: "สร้อยคอเงินแท้",
            weight: "15 กรัม",
            purity: "92.5%",
            estimatedPrice: "฿1,500",
            location: "สาขาเชียงใหม่",
            auctionDate: "18 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop"
        },
    ],
    pink_gold: [
        {
            id: "P001",
            name: "กำไลนาก",
            weight: "1 บาท",
            purity: "40%",
            estimatedPrice: "฿15,000",
            location: "สาขาขอนแก่น",
            auctionDate: "22 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop"
        },
    ],
    diamond: [
        {
            id: "D001",
            name: "แหวนเพชร 0.5 กะรัต",
            weight: "3 กรัม",
            purity: "VVS1",
            estimatedPrice: "฿45,000",
            location: "สาขากลาง",
            auctionDate: "25 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
        },
    ],
    electronics: [],
    camera: [
        {
            id: "C001",
            name: "Canon EOS R5",
            brand: "Canon",
            condition: "ดีมาก",
            estimatedPrice: "฿95,000",
            location: "สาขากลาง",
            auctionDate: "20 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "C002",
            name: "Sony A7 IV + Lens 24-70mm",
            brand: "Sony",
            condition: "ดี",
            estimatedPrice: "฿78,000",
            location: "สาขาเหนือ",
            auctionDate: "18 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=600&auto=format&fit=crop"
        },
    ],
    watch: [
        {
            id: "W001",
            name: "Rolex Submariner",
            brand: "Rolex",
            condition: "ดีมาก",
            estimatedPrice: "฿320,000",
            location: "สาขากลาง",
            auctionDate: "25 ธ.ค. 2568",
            status: "reserved",
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "W002",
            name: "Omega Seamaster",
            brand: "Omega",
            condition: "ดี",
            estimatedPrice: "฿85,000",
            location: "สาขาตะวันออก",
            auctionDate: "22 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop"
        },
    ],
    eyeglasses: [
        {
            id: "GL01",
            name: "แว่นตา RayBan Aviator",
            brand: "RayBan",
            condition: "ดี",
            estimatedPrice: "฿2,500",
            location: "สาขาขอนแก่น",
            auctionDate: "21 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop"
        },
    ],
    electrical: [
        {
            id: "E001",
            name: "Smart TV 55\"",
            brand: "Samsung",
            condition: "ดี",
            estimatedPrice: "฿12,000",
            location: "สาขากลาง",
            auctionDate: "19 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "E002",
            name: "ตู้เย็น 2 ประตู",
            brand: "Mitsubishi",
            condition: "ปานกลาง",
            estimatedPrice: "฿5,500",
            location: "สาขาหาดใหญ่",
            auctionDate: "23 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "PH01",
            name: "iPhone 14 Pro Max",
            brand: "Apple",
            condition: "ดีมาก",
            estimatedPrice: "฿28,000",
            location: "สาขากลาง",
            auctionDate: "18 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=600&auto=format&fit=crop"
        }
    ],
    tool: [
        {
            id: "T001",
            name: "สว่านไร้สาย Bosch",
            brand: "Bosch",
            condition: "ดี",
            estimatedPrice: "฿3,500",
            location: "สาขาเชียงใหม่",
            auctionDate: "20 ธ.ค. 2568",
            status: "available",
            image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop"
        },
    ],
};

const categories = [
    { id: "gold", name: "ทองคำ", icon: Coins, count: forfeitedAssets.gold.length, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", borderColor: "border-amber-200 dark:border-amber-800" },
    { id: "silver", name: "เงิน", icon: Coins, count: forfeitedAssets.silver.length, color: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-800", borderColor: "border-slate-200 dark:border-slate-700" },
    { id: "pink_gold", name: "นาก", icon: Coins, count: forfeitedAssets.pink_gold.length, color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-900/30", borderColor: "border-rose-200 dark:border-rose-800" },
    { id: "diamond", name: "เพชร", icon: Gem, count: forfeitedAssets.diamond.length, color: "text-cyan-500", bg: "bg-cyan-100 dark:bg-cyan-900/30", borderColor: "border-cyan-200 dark:border-cyan-800" },
    { id: "camera", name: "กล้องถ่ายรูป", icon: Camera, count: forfeitedAssets.camera.length, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", borderColor: "border-blue-200 dark:border-blue-800" },
    { id: "watch", name: "นาฬิกา", icon: Watch, count: forfeitedAssets.watch.length, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", borderColor: "border-purple-200 dark:border-purple-800" },
    { id: "eyeglasses", name: "แว่นตา", icon: Glasses, count: forfeitedAssets.eyeglasses.length, color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/30", borderColor: "border-indigo-200 dark:border-indigo-800" },
    { id: "electrical", name: "เครื่องใช้ไฟฟ้า", icon: Tv, count: forfeitedAssets.electrical.length, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", borderColor: "border-green-200 dark:border-green-800" },
    { id: "tool", name: "เครื่องมือช่าง", icon: Wrench, count: forfeitedAssets.tool.length, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30", borderColor: "border-orange-200 dark:border-orange-800" },
];

function AssetCard({ asset, category }: { asset: Asset; category: string }) {
    const catDetails = categories.find(c => c.id === category);
    const Icon = catDetails?.icon || ShoppingBag;
    const color = catDetails?.color || "text-slate-500";
    const bg = catDetails?.bg || "bg-slate-100";

    return (
        <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-amber-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/50 dark:hover:border-amber-900/50">
            <div className="relative aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-800/50">
                {asset.image ? (
                    <>
                        <img
                            src={asset.image}
                            alt={asset.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-600">
                        <Icon className="h-16 w-16 opacity-50" />
                    </div>
                )}
                
                <div className="absolute left-3 top-3">
                     <Badge variant="outline" className="bg-white/90 text-slate-700 backdrop-blur-sm shadow-sm border-transparent dark:bg-slate-900/90 dark:text-slate-200">
                        {asset.id}
                    </Badge>
                </div>

                <div className="absolute right-3 top-3">
                    <Badge 
                        variant={asset.status === "available" ? "default" : "secondary"} 
                        className={`shadow-md backdrop-blur-md border-white/20 px-2.5 py-0.5 ${
                            asset.status === "available" 
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                            : "bg-slate-500 hover:bg-slate-600 text-white"
                        }`}
                    >
                        {asset.status === "available" ? "พร้อมขาย" : "จองแล้ว"}
                    </Badge>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-amber-50" variant="secondary">
                        ดูรายละเอียด
                    </Button>
                </div>
            </div>

            <CardContent className="p-5">
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                         <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${bg} ${color}`}>
                            <Icon className="mr-1.5 h-3 w-3" />
                            {catDetails?.name}
                        </div>
                    </div>
                    <h3 className="line-clamp-1 text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {asset.name}
                    </h3>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                    {asset.weight && (
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wide">น้ำหนัก</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">{asset.weight}</span>
                        </div>
                    )}
                    {asset.purity && (
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wide">ความบริสุทธิ์</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">{asset.purity}</span>
                        </div>
                    )}
                    {asset.brand && (
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wide">ยี่ห้อ</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">{asset.brand}</span>
                        </div>
                    )}
                    {asset.condition && (
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wide">สภาพ</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">{asset.condition}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">ราคาประเมิน</p>
                        <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{asset.estimatedPrice}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors dark:bg-slate-800 dark:group-hover:bg-amber-900/30 dark:group-hover:text-amber-400">
                         <ArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function AssetsPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 pb-20 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 py-24 text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-01.jpg')] bg-cover bg-center opacity-20 grayscale mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800/90"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-3xl"></div>

                <div className="container relative mx-auto px-4">
                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div className="relative z-10 max-w-2xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 backdrop-blur-sm">
                                <Sparkles className="h-3 w-3" />
                                <span>Official Assets</span>
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:leading-tight">
                                ทรัพย์หลุดจำนำ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">สธค.</span>
                            </h1>
                            <p className="mt-4 text-lg text-slate-300 font-light leading-relaxed max-w-lg">
                                ความคุ้มค่าที่เหนือกว่า แหล่งรวมทรัพย์สินคุณภาพดี ราคาเป็นธรรม 
                                ผ่านการตรวจสอบมาตรฐานโดยผู้เชี่ยวชาญจากสำนักงานธนานุเคราะห์
                            </p>
                            
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Button className="h-12 rounded-full bg-amber-500 px-8 font-semibold text-slate-900 hover:bg-amber-400 shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] transition-all hover:scale-105">
                                    ดูสินค้าแนะนำ
                                </Button>
                                <Button variant="outline" className="h-12 rounded-full border-slate-700 bg-slate-800/50 px-8 text-white hover:bg-slate-800 hover:text-white backdrop-blur-sm">
                                    วิธีการประมูล
                                </Button>
                            </div>
                        </div>

                        <div className="relative z-10 w-full max-w-md">
                             <Card className="border-0 bg-white/10 backdrop-blur-md shadow-2xl ring-1 ring-white/10">
                                <CardContent className="p-6">
                                    <div className="flex gap-2 mb-4">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder="ค้นหาทรัพย์สิน..."
                                                className="h-10 w-full border-0 bg-slate-900/50 pl-9 text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-amber-500/50"
                                            />
                                        </div>
                                        <Button variant="outline" className="border-0 bg-slate-900/50 text-slate-300 hover:bg-slate-900 hover:text-white h-10 px-4">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {["ทองคำ", "เพชร", "นาฬิกา", "สินค้ามาใหม่"].map((tag, i) => (
                                            <Badge key={i} variant="secondary" className="cursor-pointer bg-slate-800/80 text-slate-300 hover:bg-amber-500 hover:text-slate-900 transition-colors whitespace-nowrap px-3 py-1">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                             </Card>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto -mt-10 relative z-20 px-4">
                {/* Stats */}
                <div className="mb-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {categories.map((cat) => (
                        <Card key={cat.id} className="border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                            <CardContent className="flex items-center gap-4 p-4">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cat.bg}`}>
                                    <cat.icon className={`h-6 w-6 ${cat.color}`} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{cat.name}</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{cat.count}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Categories Tabs */}
                <Tabs defaultValue="gold" className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-8 w-1.5 rounded-full bg-amber-500 block"></span>
                            รายการทรัพย์สินล่าสุด
                         </h2>
                         
                         <div className="overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                            <TabsList className="bg-white p-1 rounded-full border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 h-auto inline-flex w-max">
                                {categories.map((cat) => (
                                    <TabsTrigger
                                        key={cat.id}
                                        value={cat.id}
                                        className="rounded-full px-4 py-2 text-sm font-medium text-slate-500 data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-amber-500 dark:data-[state=active]:text-slate-900 transition-all"
                                    >
                                        {cat.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>

                    {categories.map((cat) => (
                        <TabsContent key={cat.id} value={cat.id} className="space-y-8 animate-in fade-in-50 duration-500 slide-in-from-bottom-5">
                            {cat.id === "gold" && (
                                <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-white p-6 shadow-sm dark:border-amber-900/50 dark:from-amber-950/20 dark:to-slate-900">
                                    <div className="flex items-center justify-between gap-6 flex-wrap">
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-full bg-amber-100 p-3 ring-4 ring-amber-50 dark:bg-amber-900/30 dark:ring-amber-900/10">
                                                <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-500">ราคาทองคำวันนี้</h3>
                                                <p className="text-sm text-amber-700/70 dark:text-amber-500/50">อัพเดทล่าสุด: 06 ธ.ค. 2568 09:13 น.</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-1 items-center justify-end gap-8 min-w-[300px]">
                                            <div className="text-right">
                                                <span className="text-xs uppercase font-bold text-amber-400 dark:text-amber-600 block mb-1">ทองคำแท่ง</span>
                                                <div className="flex items-baseline justify-end gap-1">
                                                    <span className="text-2xl font-bold text-amber-900 dark:text-amber-400">฿63,500</span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-px bg-amber-200 dark:bg-amber-800"></div>
                                            <div className="text-right">
                                                <span className="text-xs uppercase font-bold text-amber-400 dark:text-amber-600 block mb-1">ทองรูปพรรณ</span>
                                                 <div className="flex items-baseline justify-end gap-1">
                                                    <span className="text-2xl font-bold text-amber-900 dark:text-amber-400">฿64,300</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {/* @ts-expect-error - Dynamic key access for asset categories */}
                                {forfeitedAssets[cat.id]?.length > 0 ? (
                                    // @ts-expect-error - Dynamic key access for asset categories
                                    forfeitedAssets[cat.id].map((asset: Asset) => (
                                        <AssetCard key={asset.id} asset={asset} category={cat.id} />
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 py-24 text-center dark:border-slate-800">
                                        <div className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full ${cat.bg} p-6`}>
                                            <cat.icon className={`h-12 w-12 ${cat.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">ยังไม่มีรายการทรัพย์สินในหมวดหมู่นี้</h3>
                                        <p className="mt-2 text-slate-500 max-w-sm mx-auto">
                                            ขณะนี้ยังไม่มีทรัพย์สินประเภท{cat.name}ที่พร้อมจำหน่าย โปรดติดตามการอัพเดททรัพย์สินใหม่เร็วๆ นี้
                                        </p>
                                        <Button variant="outline" className="mt-6 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                            แจ้งเตือนเมื่อมีสินค้าใหม่
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

