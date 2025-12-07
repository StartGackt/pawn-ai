"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    FileSpreadsheet,
    BarChart3,
    Search,
    Download,
    Filter,
    Ticket,
    Coins,
    Package,
    AlertTriangle,
    TrendingUp,
    History,
    Database,
    Receipt,
} from "lucide-react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

// =============================================
// MOCK DATA - ข้อมูลจำลองจากฐานข้อมูล สธค.
// =============================================

// ราคารับจำนำ
const PAWN_PRICES = [
    { type: "ทองคำแท่ง 96.5%", pricePerUnit: 32500, unit: "บาท/บาททอง" },
    { type: "ทองรูปพรรณ 96.5%", pricePerUnit: 31800, unit: "บาท/บาททอง" },
    { type: "ทองรูปพรรณ 90%", pricePerUnit: 29700, unit: "บาท/บาททอง" },
    { type: "เพชร (1 กะรัต)", pricePerUnit: 45000, unit: "บาท/กะรัต" },
    { type: "นาฬิกา Rolex", pricePerUnit: "50-70%", unit: "ของราคาตลาด" },
    { type: "โทรศัพท์มือถือ", pricePerUnit: "40-60%", unit: "ของราคาตลาด" },
    { type: "เครื่องใช้ไฟฟ้า", pricePerUnit: "30-50%", unit: "ของราคาตลาด" },
];

// ประวัติการรับจำนำและส่งดอกเบี้ย
const PAWN_HISTORY = [
    { id: 1, ticketNo: "109283", date: "01/11/2567", action: "รับจำนำ", amount: 15000, interest: 0, customer: "สมชาย ใจดี", asset: "สร้อยคอทองคำ 1 บาท" },
    { id: 2, ticketNo: "109283", date: "01/12/2567", action: "ส่งดอกเบี้ย", amount: 0, interest: 188, customer: "สมชาย ใจดี", asset: "สร้อยคอทองคำ 1 บาท" },
    { id: 3, ticketNo: "109284", date: "02/11/2567", action: "รับจำนำ", amount: 5000, interest: 0, customer: "สมศรี รักไทย", asset: "ทีวี Samsung 55 นิ้ว" },
    { id: 4, ticketNo: "109285", date: "15/10/2567", action: "รับจำนำ", amount: 45000, interest: 0, customer: "มานะ มีเงิน", asset: "ทองคำแท่ง 2 บาท" },
    { id: 5, ticketNo: "109285", date: "15/11/2567", action: "ส่งดอกเบี้ย", amount: 0, interest: 563, customer: "มานะ มีเงิน", asset: "ทองคำแท่ง 2 บาท" },
    { id: 6, ticketNo: "109285", date: "05/12/2567", action: "ไถ่ถอน", amount: 45000, interest: 281, customer: "มานะ มีเงิน", asset: "ทองคำแท่ง 2 บาท" },
    { id: 7, ticketNo: "109286", date: "01/09/2567", action: "รับจำนำ", amount: 8000, interest: 0, customer: "มานี มีตา", asset: "โน้ตบุ๊ก Dell" },
    { id: 8, ticketNo: "109286", date: "01/12/2567", action: "หลุดจำนำ", amount: 8000, interest: 300, customer: "มานี มีตา", asset: "โน้ตบุ๊ก Dell" },
];

// รายการตั๋วจำนำ
const PAWN_TICKETS = [
    { ticketNo: "109283", issueDate: "01/11/2567", dueDate: "01/05/2568", customer: "สมชาย ใจดี", amount: 15000, assetType: "ทองคำ", status: "กำลังใช้งาน", monthsLeft: 5 },
    { ticketNo: "109284", issueDate: "02/11/2567", dueDate: "02/05/2568", customer: "สมศรี รักไทย", amount: 5000, assetType: "เครื่องใช้ไฟฟ้า", status: "รอส่งดอก", monthsLeft: 5 },
    { ticketNo: "109285", issueDate: "15/10/2567", dueDate: "15/04/2568", customer: "มานะ มีเงิน", amount: 45000, assetType: "ทองคำ", status: "ไถ่ถอนแล้ว", monthsLeft: 0 },
    { ticketNo: "109286", issueDate: "01/09/2567", dueDate: "01/03/2568", customer: "มานี มีตา", amount: 8000, assetType: "เครื่องใช้ไฟฟ้า", status: "หลุดจำนำ", monthsLeft: 0 },
    { ticketNo: "109287", issueDate: "05/11/2567", dueDate: "05/05/2568", customer: "ปิติ พิทักษ์", amount: 12000, assetType: "เครื่องใช้ไฟฟ้า", status: "กำลังใช้งาน", monthsLeft: 5 },
    { ticketNo: "109288", issueDate: "06/11/2567", dueDate: "06/05/2568", customer: "ชูใจ ชวนชื่น", amount: 22000, assetType: "ทองคำ", status: "กำลังใช้งาน", monthsLeft: 5 },
    { ticketNo: "109289", issueDate: "10/11/2567", dueDate: "10/05/2568", customer: "วิไล วิลัย", amount: 35000, assetType: "เพชร/อัญมณี", status: "กำลังใช้งาน", monthsLeft: 5 },
    { ticketNo: "109290", issueDate: "12/11/2567", dueDate: "12/05/2568", customer: "สุดา สุดใจ", amount: 18000, assetType: "นาฬิกา", status: "รอส่งดอก", monthsLeft: 5 },
];

// รายการทรัพย์จำนำ
const PAWN_ASSETS = [
    { id: 1, ticketNo: "109283", name: "สร้อยคอทองคำ", type: "ทองคำ", weight: "1 บาท", purity: "96.5%", appraisalValue: 32500, pawnValue: 15000, condition: "ดี" },
    { id: 2, ticketNo: "109284", name: "ทีวี Samsung", type: "เครื่องใช้ไฟฟ้า", weight: "-", purity: "-", appraisalValue: 12000, pawnValue: 5000, condition: "ดี" },
    { id: 3, ticketNo: "109285", name: "ทองคำแท่ง", type: "ทองคำ", weight: "2 บาท", purity: "96.5%", appraisalValue: 65000, pawnValue: 45000, condition: "ดีมาก" },
    { id: 4, ticketNo: "109286", name: "โน้ตบุ๊ก Dell", type: "เครื่องใช้ไฟฟ้า", weight: "-", purity: "-", appraisalValue: 18000, pawnValue: 8000, condition: "พอใช้" },
    { id: 5, ticketNo: "109287", name: "iPhone 14 Pro", type: "เครื่องใช้ไฟฟ้า", weight: "-", purity: "-", appraisalValue: 28000, pawnValue: 12000, condition: "ดี" },
    { id: 6, ticketNo: "109288", name: "แหวนทองคำ", type: "ทองคำ", weight: "1 บาท", purity: "96.5%", appraisalValue: 32500, pawnValue: 22000, condition: "ดี" },
    { id: 7, ticketNo: "109289", name: "แหวนเพชร", type: "เพชร/อัญมณี", weight: "1.2 กะรัต", purity: "VVS1", appraisalValue: 85000, pawnValue: 35000, condition: "ดีมาก" },
    { id: 8, ticketNo: "109290", name: "นาฬิกา Omega", type: "นาฬิกา", weight: "-", purity: "-", appraisalValue: 45000, pawnValue: 18000, condition: "ดี" },
];

// ทรัพย์หลุดจำนำ
const FORFEITED_ASSETS = [
    { id: 1, ticketNo: "109286", name: "โน้ตบุ๊ก Dell", type: "เครื่องใช้ไฟฟ้า", forfeitDate: "01/12/2567", pawnValue: 8000, totalInterest: 300, estimatedSaleValue: 10000, status: "รอขาย" },
    { id: 2, ticketNo: "109250", name: "กล้อง Canon", type: "เครื่องใช้ไฟฟ้า", forfeitDate: "15/11/2567", pawnValue: 6000, totalInterest: 225, estimatedSaleValue: 8000, status: "รอขาย" },
    { id: 3, ticketNo: "109212", name: "สร้อยข้อมือเงิน", type: "เงิน", forfeitDate: "01/11/2567", pawnValue: 3500, totalInterest: 131, estimatedSaleValue: 4500, status: "ขายแล้ว" },
];

// ข้อมูลสำหรับ Chart
const ASSET_TYPE_DATA = [
    { name: "ทองคำ", value: 45, count: 156, color: "#eab308" },
    { name: "เพชร/อัญมณี", value: 20, count: 69, color: "#0ea5e9" },
    { name: "เครื่องใช้ไฟฟ้า", value: 25, count: 87, color: "#64748b" },
    { name: "นาฬิกา", value: 10, count: 35, color: "#8b5cf6" },
];

const MONTHLY_DATA = [
    { month: "ก.ค.", newPawn: 45, redeem: 32, forfeit: 3 },
    { month: "ส.ค.", newPawn: 52, redeem: 38, forfeit: 4 },
    { month: "ก.ย.", newPawn: 48, redeem: 35, forfeit: 2 },
    { month: "ต.ค.", newPawn: 55, redeem: 42, forfeit: 5 },
    { month: "พ.ย.", newPawn: 62, redeem: 45, forfeit: 3 },
    { month: "ธ.ค.", newPawn: 58, redeem: 48, forfeit: 4 },
];

// =============================================
// MAIN COMPONENT
// =============================================
export default function PawnDataPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    const handleExportExcel = (dataType: string) => {
        alert(`กำลังส่งออกข้อมูล "${dataType}" เป็น Excel...`);
    };

    // Filter tickets
    const filteredTickets = PAWN_TICKETS.filter(ticket => {
        const matchSearch = ticket.ticketNo.includes(searchTerm) || ticket.customer.includes(searchTerm);
        const matchType = filterType === "all" || ticket.assetType === filterType;
        const matchStatus = filterStatus === "all" || ticket.status === filterStatus;
        return matchSearch && matchType && matchStatus;
    });

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                            <Database className="mr-1.5 h-3 w-3" />
                            Data Repository
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">ข้อมูลรับจำนำ</h1>
                    <p className="text-sm text-slate-500 mt-0.5">ข้อมูลที่รวบรวมจากฐานข้อมูลของ สธค.</p>
                </div>
            </div>

            {/* Main Tabs - แบ่งตามประเภทข้อมูล */}
            <Tabs defaultValue="prices" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto gap-1 bg-slate-100 p-1">
                    <TabsTrigger value="prices" className="text-xs py-2 data-[state=active]:bg-white">
                        <Coins className="mr-1.5 h-3.5 w-3.5" />
                        ราคารับจำนำ
                    </TabsTrigger>
                    <TabsTrigger value="history" className="text-xs py-2 data-[state=active]:bg-white">
                        <History className="mr-1.5 h-3.5 w-3.5" />
                        ประวัติ
                    </TabsTrigger>
                    <TabsTrigger value="tickets" className="text-xs py-2 data-[state=active]:bg-white">
                        <Ticket className="mr-1.5 h-3.5 w-3.5" />
                        ตั๋วจำนำ
                    </TabsTrigger>
                    <TabsTrigger value="assets" className="text-xs py-2 data-[state=active]:bg-white">
                        <Package className="mr-1.5 h-3.5 w-3.5" />
                        รายการทรัพย์
                    </TabsTrigger>
                    <TabsTrigger value="forfeited" className="text-xs py-2 data-[state=active]:bg-white">
                        <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                        ทรัพย์หลุด
                    </TabsTrigger>
                    <TabsTrigger value="dashboard" className="text-xs py-2 data-[state=active]:bg-white">
                        <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
                        Dashboard
                    </TabsTrigger>
                </TabsList>

                {/* =============================================
                    TAB 1: ราคารับจำนำ
                ============================================= */}
                <TabsContent value="prices" className="mt-4">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium text-slate-700">ราคารับจำนำประจำวัน</CardTitle>
                                <CardDescription className="text-xs">อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}</CardDescription>
                            </div>
                            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => handleExportExcel("ราคารับจำนำ")}>
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                                Export Excel
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-xs">ประเภททรัพย์</TableHead>
                                        <TableHead className="text-xs text-right">ราคารับจำนำ</TableHead>
                                        <TableHead className="text-xs text-right">หน่วย</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {PAWN_PRICES.map((item, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="text-sm font-medium">{item.type}</TableCell>
                                            <TableCell className="text-sm text-right font-bold text-amber-600">
                                                {typeof item.pricePerUnit === "number"
                                                    ? `฿${item.pricePerUnit.toLocaleString()}`
                                                    : item.pricePerUnit}
                                            </TableCell>
                                            <TableCell className="text-xs text-right text-slate-500">{item.unit}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* =============================================
                    TAB 2: ประวัติการรับจำนำและส่งดอกเบี้ย
                ============================================= */}
                <TabsContent value="history" className="mt-4">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium text-slate-700">ประวัติการรับจำนำและส่งดอกเบี้ย</CardTitle>
                                <CardDescription className="text-xs">รายการธุรกรรมทั้งหมด</CardDescription>
                            </div>
                            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => handleExportExcel("ประวัติ")}>
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                                Export Excel
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-xs">วันที่</TableHead>
                                        <TableHead className="text-xs">เลขที่ตั๋ว</TableHead>
                                        <TableHead className="text-xs">การกระทำ</TableHead>
                                        <TableHead className="text-xs">ลูกค้า</TableHead>
                                        <TableHead className="text-xs">ทรัพย์สิน</TableHead>
                                        <TableHead className="text-xs text-right">เงินต้น</TableHead>
                                        <TableHead className="text-xs text-right">ดอกเบี้ย</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {PAWN_HISTORY.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-xs text-slate-500">{item.date}</TableCell>
                                            <TableCell className="font-mono text-xs">{item.ticketNo}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${item.action === "รับจำนำ" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                            item.action === "ส่งดอกเบี้ย" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                                item.action === "ไถ่ถอน" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                                    "bg-red-50 text-red-700 border-red-200"
                                                        }`}
                                                >
                                                    {item.action}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">{item.customer}</TableCell>
                                            <TableCell className="text-xs text-slate-600">{item.asset}</TableCell>
                                            <TableCell className="text-sm text-right font-medium">
                                                {item.amount > 0 ? `฿${item.amount.toLocaleString()}` : "-"}
                                            </TableCell>
                                            <TableCell className="text-sm text-right text-amber-600">
                                                {item.interest > 0 ? `฿${item.interest.toLocaleString()}` : "-"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* =============================================
                    TAB 3: ตั๋วจำนำ
                ============================================= */}
                <TabsContent value="tickets" className="mt-4 space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1 max-w-xs">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="ค้นหาเลขที่ตั๋ว, ชื่อลูกค้า..."
                                className="pl-9 h-9 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-[150px] h-9 text-xs">
                                <Filter className="mr-2 h-3.5 w-3.5" />
                                <SelectValue placeholder="ประเภททรัพย์" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">ทุกประเภท</SelectItem>
                                <SelectItem value="ทองคำ">ทองคำ</SelectItem>
                                <SelectItem value="เพชร/อัญมณี">เพชร/อัญมณี</SelectItem>
                                <SelectItem value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</SelectItem>
                                <SelectItem value="นาฬิกา">นาฬิกา</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-[140px] h-9 text-xs">
                                <SelectValue placeholder="สถานะ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">ทุกสถานะ</SelectItem>
                                <SelectItem value="กำลังใช้งาน">กำลังใช้งาน</SelectItem>
                                <SelectItem value="รอส่งดอก">รอส่งดอก</SelectItem>
                                <SelectItem value="ไถ่ถอนแล้ว">ไถ่ถอนแล้ว</SelectItem>
                                <SelectItem value="หลุดจำนำ">หลุดจำนำ</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline" className="h-9 text-xs ml-auto" onClick={() => handleExportExcel("ตั๋วจำนำ")}>
                            <Download className="mr-1.5 h-3.5 w-3.5" />
                            Export Excel
                        </Button>
                    </div>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-slate-700">รายการตั๋วจำนำ</CardTitle>
                            <CardDescription className="text-xs">แสดง {filteredTickets.length} รายการ</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-xs">เลขที่ตั๋ว</TableHead>
                                        <TableHead className="text-xs">วันที่ออก</TableHead>
                                        <TableHead className="text-xs">วันครบกำหนด</TableHead>
                                        <TableHead className="text-xs">ลูกค้า</TableHead>
                                        <TableHead className="text-xs">ประเภท</TableHead>
                                        <TableHead className="text-xs text-right">จำนวนเงิน</TableHead>
                                        <TableHead className="text-xs">สถานะ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTickets.map((ticket) => (
                                        <TableRow key={ticket.ticketNo}>
                                            <TableCell className="font-mono text-xs font-medium">{ticket.ticketNo}</TableCell>
                                            <TableCell className="text-xs text-slate-500">{ticket.issueDate}</TableCell>
                                            <TableCell className="text-xs text-slate-500">{ticket.dueDate}</TableCell>
                                            <TableCell className="text-sm">{ticket.customer}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs bg-slate-50">{ticket.assetType}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-right font-bold">฿{ticket.amount.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${ticket.status === "กำลังใช้งาน" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                            ticket.status === "รอส่งดอก" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                                ticket.status === "ไถ่ถอนแล้ว" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                                    "bg-red-50 text-red-700 border-red-200"
                                                        }`}
                                                >
                                                    {ticket.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* =============================================
                    TAB 4: รายการทรัพย์จำนำ
                ============================================= */}
                <TabsContent value="assets" className="mt-4">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium text-slate-700">รายการทรัพย์จำนำ</CardTitle>
                                <CardDescription className="text-xs">รายละเอียดทรัพย์สินทั้งหมด</CardDescription>
                            </div>
                            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => handleExportExcel("รายการทรัพย์")}>
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                                Export Excel
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-xs">เลขที่ตั๋ว</TableHead>
                                        <TableHead className="text-xs">ชื่อทรัพย์สิน</TableHead>
                                        <TableHead className="text-xs">ประเภท</TableHead>
                                        <TableHead className="text-xs">น้ำหนัก/ขนาด</TableHead>
                                        <TableHead className="text-xs">ความบริสุทธิ์</TableHead>
                                        <TableHead className="text-xs text-right">ราคาประเมิน</TableHead>
                                        <TableHead className="text-xs text-right">มูลค่ารับจำนำ</TableHead>
                                        <TableHead className="text-xs">สภาพ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {PAWN_ASSETS.map((asset) => (
                                        <TableRow key={asset.id}>
                                            <TableCell className="font-mono text-xs">{asset.ticketNo}</TableCell>
                                            <TableCell className="text-sm font-medium">{asset.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs bg-slate-50">{asset.type}</Badge>
                                            </TableCell>
                                            <TableCell className="text-xs">{asset.weight}</TableCell>
                                            <TableCell className="text-xs">{asset.purity}</TableCell>
                                            <TableCell className="text-xs text-right text-slate-500">฿{asset.appraisalValue.toLocaleString()}</TableCell>
                                            <TableCell className="text-sm text-right font-bold text-emerald-600">฿{asset.pawnValue.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${asset.condition === "ดีมาก" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                            asset.condition === "ดี" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                                "bg-slate-50 text-slate-600 border-slate-200"
                                                        }`}
                                                >
                                                    {asset.condition}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* =============================================
                    TAB 5: ทรัพย์หลุดจำนำ
                ============================================= */}
                <TabsContent value="forfeited" className="mt-4">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium text-slate-700">ทรัพย์หลุดจำนำ</CardTitle>
                                <CardDescription className="text-xs">ทรัพย์สินที่หลุดจำนำและรอการจำหน่าย</CardDescription>
                            </div>
                            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => handleExportExcel("ทรัพย์หลุดจำนำ")}>
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                                Export Excel
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-xs">เลขที่ตั๋ว</TableHead>
                                        <TableHead className="text-xs">ชื่อทรัพย์สิน</TableHead>
                                        <TableHead className="text-xs">ประเภท</TableHead>
                                        <TableHead className="text-xs">วันที่หลุด</TableHead>
                                        <TableHead className="text-xs text-right">มูลค่าจำนำ</TableHead>
                                        <TableHead className="text-xs text-right">ดอกเบี้ยค้าง</TableHead>
                                        <TableHead className="text-xs text-right">ราคาขายประมาณ</TableHead>
                                        <TableHead className="text-xs">สถานะ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {FORFEITED_ASSETS.map((asset) => (
                                        <TableRow key={asset.id}>
                                            <TableCell className="font-mono text-xs">{asset.ticketNo}</TableCell>
                                            <TableCell className="text-sm font-medium">{asset.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs bg-slate-50">{asset.type}</Badge>
                                            </TableCell>
                                            <TableCell className="text-xs text-slate-500">{asset.forfeitDate}</TableCell>
                                            <TableCell className="text-sm text-right">฿{asset.pawnValue.toLocaleString()}</TableCell>
                                            <TableCell className="text-sm text-right text-red-600">฿{asset.totalInterest.toLocaleString()}</TableCell>
                                            <TableCell className="text-sm text-right font-bold text-emerald-600">฿{asset.estimatedSaleValue.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${asset.status === "รอขาย" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                            "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        }`}
                                                >
                                                    {asset.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* =============================================
                    TAB 6: Dashboard
                ============================================= */}
                <TabsContent value="dashboard" className="mt-4 space-y-4">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <Card className="border-slate-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">ตั๋วทั้งหมด</p>
                                        <p className="text-2xl font-bold text-slate-900">{PAWN_TICKETS.length}</p>
                                        <p className="text-xs text-slate-400">รายการ</p>
                                    </div>
                                    <div className="p-2.5 bg-blue-50 rounded-lg">
                                        <Ticket className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">มูลค่ารวม</p>
                                        <p className="text-2xl font-bold text-slate-900">
                                            {(PAWN_TICKETS.reduce((acc, t) => acc + t.amount, 0) / 1000).toFixed(0)}K
                                        </p>
                                        <p className="text-xs text-slate-400">บาท</p>
                                    </div>
                                    <div className="p-2.5 bg-emerald-50 rounded-lg">
                                        <Coins className="h-5 w-5 text-emerald-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">กำลังใช้งาน</p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {PAWN_TICKETS.filter(t => t.status === "กำลังใช้งาน" || t.status === "รอส่งดอก").length}
                                        </p>
                                        <p className="text-xs text-slate-400">ใบ</p>
                                    </div>
                                    <div className="p-2.5 bg-amber-50 rounded-lg">
                                        <Receipt className="h-5 w-5 text-amber-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">หลุดจำนำ</p>
                                        <p className="text-2xl font-bold text-red-600">{FORFEITED_ASSETS.length}</p>
                                        <p className="text-xs text-slate-400">รายการ</p>
                                    </div>
                                    <div className="p-2.5 bg-red-50 rounded-lg">
                                        <AlertTriangle className="h-5 w-5 text-red-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Pie Chart - ประเภททรัพย์ */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-700">สัดส่วนประเภททรัพย์สิน</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[220px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={ASSET_TYPE_DATA}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={80}
                                                paddingAngle={3}
                                                dataKey="value"
                                            >
                                                {ASSET_TYPE_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value: number, name: string) => [`${value}%`, name]}
                                                contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {ASSET_TYPE_DATA.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                <span className="text-slate-600">{item.name}</span>
                                            </div>
                                            <span className="font-semibold">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bar Chart - แนวโน้มรายเดือน */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-700">แนวโน้มรายเดือน</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                            <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                                            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                            <Bar dataKey="newPawn" name="รับจำนำใหม่" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="redeem" name="ไถ่ถอน" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="forfeit" name="หลุดจำนำ" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Export Button */}
                    <div className="flex justify-end">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleExportExcel("Dashboard ทั้งหมด")}>
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            ส่งออกรายงานทั้งหมดเป็น Excel
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
