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
    ArrowRight
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
    { id: "gold", name: "ทองคำ", icon: Coins, count: forfeitedAssets.gold.length, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { id: "silver", name: "เงิน", icon: Coins, count: forfeitedAssets.silver.length, color: "text-slate-400", bg: "bg-slate-400/10" },
    { id: "pink_gold", name: "นาก", icon: Coins, count: forfeitedAssets.pink_gold.length, color: "text-rose-400", bg: "bg-rose-400/10" },
    { id: "diamond", name: "เพชร", icon: Gem, count: forfeitedAssets.diamond.length, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { id: "camera", name: "กล้องถ่ายรูป", icon: Camera, count: forfeitedAssets.camera.length, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "watch", name: "นาฬิกา", icon: Watch, count: forfeitedAssets.watch.length, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: "eyeglasses", name: "แว่นตา", icon: Glasses, count: forfeitedAssets.eyeglasses.length, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { id: "electrical", name: "เครื่องใช้ไฟฟ้า", icon: Tv, count: forfeitedAssets.electrical.length, color: "text-green-500", bg: "bg-green-500/10" },
    { id: "tool", name: "เครื่องมือช่าง", icon: Wrench, count: forfeitedAssets.tool.length, color: "text-orange-500", bg: "bg-orange-500/10" },
];

function AssetCard({ asset, category }: { asset: Asset; category: string }) {
    const catDetails = categories.find(c => c.id === category);
    const Icon = catDetails?.icon || ShoppingBag;
    const color = catDetails?.color || "text-gray-500";
    const bg = catDetails?.bg || "bg-gray-500/10";

    return (
        <Card className="group overflow-hidden border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-500/10 dark:border-slate-800 dark:bg-slate-950">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                {asset.image ? (
                    <img
                        src={asset.image}
                        alt={asset.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
                        <Icon className="h-12 w-12" />
                    </div>
                )}
                <div className="absolute right-2 top-2">
                    <Badge variant={asset.status === "available" ? "default" : "secondary"} className={asset.status === "available" ? "bg-green-500 hover:bg-green-600" : ""}>
                        {asset.status === "available" ? "พร้อมขาย" : "จอง"}
                    </Badge>
                </div>
            </div>
            <CardContent className="p-4">
                <div className="mb-3 flex items-start justify-between">
                    <div>
                        <div className={`mb-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${bg} ${color}`}>
                            <Icon className="mr-1 h-3 w-3" />
                            {catDetails?.name}
                        </div>
                        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-slate-100">{asset.name}</h3>
                        <p className="text-xs text-muted-foreground">รหัส: {asset.id}</p>
                    </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                    {asset.weight && (
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-muted-foreground">น้ำหนัก</span>
                            <span className="font-medium">{asset.weight}</span>
                        </div>
                    )}
                    {asset.purity && (
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-muted-foreground">ความบริสุทธิ์</span>
                            <span className="font-medium">{asset.purity}</span>
                        </div>
                    )}
                    {asset.brand && (
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-muted-foreground">ยี่ห้อ</span>
                            <span className="font-medium">{asset.brand}</span>
                        </div>
                    )}
                    {asset.condition && (
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-muted-foreground">สภาพ</span>
                            <span className="font-medium">{asset.condition}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-end justify-between border-t pt-3">
                    <div>
                        <p className="text-xs text-muted-foreground">ราคาประเมิน</p>
                        <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{asset.estimatedPrice}</p>
                    </div>
                    <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" disabled={asset.status !== "available"}>
                        สนใจซื้อ <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function AssetsPage() {
    return (
        <div className="min-h-screen bg-blue-50 pb-10 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-blue-100 py-12 text-blue-900">
                <div className="absolute inset-0 bg-[url('https://www.pawn.co.th/assets/images/banner/banner-01.jpg')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-linear-to-r from-blue-100 via-blue-100/90 to-blue-100/50"></div>
                <div className="container relative mx-auto px-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <Badge className="mb-2 bg-blue-500 text-white hover:bg-blue-600">Official Assets</Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-blue-900 md:text-5xl">
                                ทรัพย์หลุดจำนำ <span className="text-blue-600">สธค.</span>
                            </h1>
                            <p className="mt-2 max-w-xl text-lg text-blue-700">
                                แหล่งรวมทรัพย์สินคุณภาพดี ราคาคุ้มค่า จากสำนักงานธนานุเคราะห์
                                ผ่านการตรวจสอบและประเมินโดยผู้เชี่ยวชาญ
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
                                <Input
                                    placeholder="ค้นหาทรัพย์สิน..."
                                    className="w-[200px] border-blue-200 bg-white/50 pl-9 text-blue-900 placeholder:text-blue-400 focus-visible:ring-blue-500 md:w-[300px]"
                                />
                            </div>
                            <Button variant="outline" className="border-blue-200 bg-white/50 text-blue-900 hover:bg-white hover:text-blue-700">
                                <Filter className="mr-2 h-4 w-4" /> กรอง
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8 px-4">
                {/* Stats */}
                <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {categories.map((cat) => (
                        <Card key={cat.id} className="border-none shadow-xs transition-all hover:shadow-md dark:bg-slate-900">
                            <CardContent className="flex items-center gap-4 p-4">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${cat.bg}`}>
                                    <cat.icon className={`h-6 w-6 ${cat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{cat.name}</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{cat.count}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Categories Tabs */}
                <Tabs defaultValue="gold" className="space-y-6">
                    <div className="sticky top-0 z-10 bg-slate-50/95 py-2 backdrop-blur-sm dark:bg-slate-950/95">
                        <div className="w-full overflow-x-auto whitespace-nowrap pb-2">
                            <TabsList className="inline-flex h-auto w-max bg-transparent p-1">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <TabsTrigger
                                            key={cat.id}
                                            value={cat.id}
                                            className="mr-2 gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 data-[state=active]:border-yellow-500 data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700 dark:border-slate-800 dark:bg-slate-900 dark:data-[state=active]:bg-yellow-950/30 dark:data-[state=active]:text-yellow-500"
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{cat.name}</span>
                                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">{cat.count}</Badge>
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                        </div>
                    </div>

                    {categories.map((cat) => (
                        <TabsContent key={cat.id} value={cat.id} className="space-y-6">
                            {cat.id === "gold" && (
                                <div className="rounded-xl border border-yellow-200 bg-linear-to-r from-yellow-50 to-white p-6 dark:border-yellow-900/50 dark:from-yellow-950/20 dark:to-slate-950">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/30">
                                            <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-500">ราคาทองคำวันนี้</h3>
                                            <div className="mt-2 flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-yellow-700/70 dark:text-yellow-500/70">ทองคำแท่ง:</span>
                                                    <span className="text-xl font-bold text-yellow-700 dark:text-yellow-400">฿63,500</span>
                                                </div>
                                                <div className="hidden h-8 w-px bg-yellow-200 dark:bg-yellow-800 md:block"></div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-yellow-700/70 dark:text-yellow-500/70">ทองรูปพรรณ:</span>
                                                    <span className="text-xl font-bold text-yellow-700 dark:text-yellow-400">฿64,300</span>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-xs text-yellow-600/60 dark:text-yellow-500/50">อัพเดทล่าสุด: 06 ธ.ค. 2568 09:13 น.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {/* @ts-expect-error - Dynamic key access for asset categories */}
                                {forfeitedAssets[cat.id]?.length > 0 ? (
                                    // @ts-expect-error - Dynamic key access for asset categories
                                    forfeitedAssets[cat.id].map((asset) => (
                                        <AssetCard key={asset.id} asset={asset} category={cat.id} />
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-muted-foreground">
                                        <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${cat.bg}`}>
                                            <cat.icon className={`h-10 w-10 ${cat.color}`} />
                                        </div>
                                        <h3 className="text-lg font-medium">ไม่มีรายการทรัพย์สินในหมวดหมู่นี้</h3>
                                        <p className="text-sm">โปรดติดตามการอัพเดททรัพย์สินใหม่เร็วๆ นี้</p>
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


