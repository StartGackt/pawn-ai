"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Search, Download, Package, Coins, TrendingUp, Percent, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const mockPawns = [
    {
        id: "P-2025-001",
        customer: "สมชาย ใจดี",
        date: "2025-11-19",
        amount: 50000,
        assetType: "ทองคำ",
        description: "สร้อยคอทอง 96.5%",
        status: "active",
        branch: "สาขากลาง",
        daysLeft: 45,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop",
        weight: "50 กรัม"
    },
    {
        id: "P-2025-002",
        customer: "สมหญิง รักดี",
        date: "2025-11-18",
        amount: 30000,
        assetType: "โทรศัพท์",
        description: "iPhone 15 Pro",
        status: "active",
        branch: "สาขาเหนือ",
        daysLeft: 44,
        image: "https://images.unsplash.com/photo-1592286927505-4d086092d0f3?w=100&h=100&fit=crop",
        weight: "256GB"
    },
    {
        id: "P-2025-003",
        customer: "วิชัย มั่งคั่ง",
        date: "2025-11-17",
        amount: 75000,
        assetType: "ทองคำ",
        description: "แหวนทอง 99.9%",
        status: "active",
        branch: "สาขาใต้",
        daysLeft: 43,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop",
        weight: "30 กรัม"
    },
    {
        id: "P-2025-004",
        customer: "มาลี สวยงาม",
        date: "2025-11-16",
        amount: 45000,
        assetType: "โน้ตบุ๊ก",
        description: "MacBook Pro M3",
        status: "redeemed",
        branch: "สาขากลาง",
        daysLeft: 0,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
        weight: "16GB RAM"
    },
    {
        id: "P-2025-005",
        customer: "บุญมี โชคดี",
        date: "2025-11-15",
        amount: 38000,
        assetType: "กล้อง",
        description: "Sony A7 IV",
        status: "active",
        branch: "สาขาเหนือ",
        daysLeft: 41,
        image: "https://images.unsplash.com/photo-1606933248013-21d4d7238c6b?w=100&h=100&fit=crop",
        weight: "33MP"
    },
    {
        id: "P-2024-998",
        customer: "ทองดี เฮงเฮง",
        date: "2024-10-20",
        amount: 55000,
        assetType: "ทองคำ",
        description: "สร้อยข้อมือทอง",
        status: "forfeited",
        branch: "สาขากลาง",
        daysLeft: 0,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop",
        weight: "45 กรัม"
    },
    {
        id: "P-2025-006",
        customer: "สมศักดิ์ ร่ำรวย",
        date: "2025-11-14",
        amount: 28000,
        assetType: "โทรศัพท์",
        description: "Samsung S24 Ultra",
        status: "active",
        branch: "สาขาใต้",
        daysLeft: 40,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop",
        weight: "512GB"
    },
    {
        id: "P-2025-007",
        customer: "ประยุทธ์ แกร่ง",
        date: "2025-11-13",
        amount: 32000,
        assetType: "ทองคำ",
        description: "ต่างหูทอง",
        status: "active",
        branch: "สาขากลาง",
        daysLeft: 39,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop",
        weight: "15 กรัม"
    },
];

const assetTypeData = [
    { name: "ทองคำ", value: 45, amount: 15800000, color: "#3b82f6" },
    { name: "โทรศัพท์", value: 25, amount: 4200000, color: "#60a5fa" },
    { name: "โน้ตบุ๊ก", value: 18, amount: 3600000, color: "#93c5fd" },
    { name: "กล้อง", value: 8, amount: 1800000, color: "#bfdbfe" },
    { name: "อื่นๆ", value: 4, amount: 600000, color: "#dbeafe" },
];

const statusColors = {
    active: { label: "กำลังจำนำ", variant: "default" as const },
    redeemed: { label: "ไถ่ถอนแล้ว", variant: "secondary" as const },
    forfeited: { label: "หลุดจำนำ", variant: "destructive" as const },
};

export default function PawnsPage() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedBranch, setSelectedBranch] = React.useState("all");
    const [selectedAssetType, setSelectedAssetType] = React.useState("all");
    const [selectedStatus, setSelectedStatus] = React.useState("all");

    const filteredPawns = mockPawns.filter((pawn) => {
        const matchesSearch =
            pawn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pawn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pawn.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBranch = selectedBranch === "all" || pawn.branch === selectedBranch;
        const matchesAssetType = selectedAssetType === "all" || pawn.assetType === selectedAssetType;
        const matchesStatus = selectedStatus === "all" || pawn.status === selectedStatus;

        return matchesSearch && matchesBranch && matchesAssetType && matchesStatus;
    });

    const totalAmount = filteredPawns.reduce((sum, pawn) => sum + pawn.amount, 0);
    const activeCount = filteredPawns.filter(p => p.status === "active").length;
    const redemptionRate = filteredPawns.filter(p => p.status === "redeemed").length / filteredPawns.length * 100;

    const getRiskBadge = (daysLeft: number) => {
        if (daysLeft === 0) return null;
        if (daysLeft <= 7) return <Badge variant="destructive" className="text-xs">เร่งด่วน</Badge>;
        if (daysLeft <= 14) return <Badge className="bg-orange-500 text-xs">ใกล้ครบ</Badge>;
        if (daysLeft <= 30) return <Badge className="bg-yellow-500 text-black text-xs">เตือน</Badge>;
        return <Badge className="bg-green-500 text-xs">ปกติ</Badge>;
    };

    const handleExport = () => {
        // Mock export function
        alert("กำลังดาวน์โหลดข้อมูล...\n\nฟังก์ชันนี้จะ export ข้อมูลเป็น Excel หรือ PDF");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">ตั๋วจำนำทั้งหมด</h1>
                    <p className="text-muted-foreground">
                        จัดการและติดตามตั๋วจำนำทั้งหมดในระบบ
                    </p>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    ส่งออกข้อมูล
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ตั๋วทั้งหมด</CardTitle>
                        <Package className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{filteredPawns.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">รายการ</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">มูลค่ารวม</CardTitle>
                        <Coins className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿{(totalAmount / 1000).toFixed(0)}K</div>
                        <p className="text-xs text-muted-foreground mt-1">บาท</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ใช้งานอยู่</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">รายการ</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">อัตราไถ่ถอน</CardTitle>
                        <Percent className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{redemptionRate.toFixed(1)}%</div>
                        <p className="text-xs text-muted-foreground mt-1">จากทั้งหมด</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="list">รายการตั๋ว</TabsTrigger>
                    <TabsTrigger value="breakdown">แยกตามประเภท</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-4 mt-4">
                    {/* Filters */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-4 md:grid-cols-5">
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="ค้นหาด้วย ID, ชื่อ, รายละเอียด..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>
                                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="สาขา" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">ทุกสาขา</SelectItem>
                                        <SelectItem value="สาขากลาง">สาขากลาง</SelectItem>
                                        <SelectItem value="สาขาเหนือ">สาขาเหนือ</SelectItem>
                                        <SelectItem value="สาขาใต้">สาขาใต้</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={selectedAssetType} onValueChange={setSelectedAssetType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="ประเภททรัพย์" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">ทุกประเภท</SelectItem>
                                        <SelectItem value="ทองคำ">ทองคำ</SelectItem>
                                        <SelectItem value="โทรศัพท์">โทรศัพท์</SelectItem>
                                        <SelectItem value="โน้ตบุ๊ก">โน้ตบุ๊ก</SelectItem>
                                        <SelectItem value="กล้อง">กล้อง</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="สถานะ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">ทุกสถานะ</SelectItem>
                                        <SelectItem value="active">ใช้งานอยู่</SelectItem>
                                        <SelectItem value="redeemed">ไถ่ถอนแล้ว</SelectItem>
                                        <SelectItem value="forfeited">หลุดจำนำ</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Grid Cards - 2 per row */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-muted-foreground">
                                แสดง {filteredPawns.length} รายการจากทั้งหมด {mockPawns.length} รายการ
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {filteredPawns.map((pawn) => (
                                <Card
                                    key={pawn.id}
                                    className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2"
                                >
                                    <CardContent className="p-0">
                                        {/* Image Section */}
                                        <div className="relative h-48 w-full bg-muted overflow-hidden">
                                            {pawn.image ? (
                                                <Image
                                                    src={pawn.image}
                                                    alt={pawn.description}
                                                    width={320}
                                                    height={192}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                                </div>
                                            )}
                                            {/* Risk Badge Overlay */}
                                            {getRiskBadge(pawn.daysLeft) && (
                                                <div className="absolute top-3 right-3">
                                                    {getRiskBadge(pawn.daysLeft)}
                                                </div>
                                            )}
                                            {/* Status Badge Overlay */}
                                            <div className="absolute top-3 left-3">
                                                <Badge variant={statusColors[pawn.status as keyof typeof statusColors].variant}>
                                                    {statusColors[pawn.status as keyof typeof statusColors].label}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-4 space-y-3">
                                            {/* ID & Asset Type */}
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-sm font-bold text-blue-600">{pawn.id}</span>
                                                <Badge variant="outline" className="text-xs">{pawn.assetType}</Badge>
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <h3 className="font-semibold text-base line-clamp-1">{pawn.description}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">{pawn.weight}</p>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between py-2 border-t border-b">
                                                <span className="text-sm text-muted-foreground">จำนวนเงิน</span>
                                                <span className="text-xl font-bold text-emerald-600">฿{pawn.amount.toLocaleString()}</span>
                                            </div>

                                            {/* Customer & Date */}
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-muted-foreground">ลูกค้า:</span>
                                                    <span className="font-medium">{pawn.customer}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-muted-foreground">วันที่:</span>
                                                    <span className="text-xs">
                                                        {new Date(pawn.date).toLocaleDateString('th-TH', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-muted-foreground">สาขา:</span>
                                                    <span className="font-medium">{pawn.branch}</span>
                                                </div>
                                                {pawn.daysLeft > 0 && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-muted-foreground">คงเหลือ:</span>
                                                        <span className="font-semibold text-orange-600">{pawn.daysLeft} วัน</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            <Button className="w-full mt-3" variant="outline" size="sm">
                                                ดูรายละเอียด
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="breakdown" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>สัดส่วนทรัพย์แต่ละประเภท</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={assetTypeData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={120}
                                                fill="#3b82f6"
                                                dataKey="value"
                                            >
                                                {assetTypeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>มูลค่าตามประเภททรัพย์</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={assetTypeData}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                dataKey="name"
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            />
                                            <YAxis
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                                tickFormatter={(value) => `฿${(value / 1000000).toFixed(0)}M`}
                                            />
                                            <Tooltip formatter={(value: number) => `฿${value.toLocaleString()}`} />
                                            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                                                {assetTypeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>สถิติแยกตามประเภททรัพย์</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ประเภททรัพย์</TableHead>
                                        <TableHead className="text-right">จำนวนรายการ</TableHead>
                                        <TableHead className="text-right">สัดส่วน</TableHead>
                                        <TableHead className="text-right">มูลค่ารวม</TableHead>
                                        <TableHead className="text-right">มูลค่าเฉลี่ย</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assetTypeData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="text-right">{item.value} รายการ</TableCell>
                                            <TableCell className="text-right">
                                                {((item.value / assetTypeData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                ฿{item.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                ฿{(item.amount / item.value).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
