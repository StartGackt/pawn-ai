"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, BarChart3 } from "lucide-react";

// Mock Data for Pawn Records
const pawnRecords = [
    { id: "PT-001", ticketNo: "109283", customer: "สมชาย ใจดี", pawnDate: "2023-11-01", amount: 15000, asset: "สร้อยคอทองคำ 1 บาท", type: "ทองคำ", status: "กำลังใช้งาน", history: "รับจำนำ 01/11/23" },
    { id: "PT-002", ticketNo: "109284", customer: "สมศรี รักไทย", pawnDate: "2023-11-02", amount: 5000, asset: "ทีวี Samsung 55 นิ้ว", type: "เครื่องใช้ไฟฟ้า", status: "รอส่งดอกเบี้ย", history: "รับจำนำ 02/11/23" },
    { id: "PT-003", ticketNo: "109285", customer: "มานะ มีเงิน", pawnDate: "2023-10-15", amount: 45000, asset: "ทองคำแท่ง 2 บาท", type: "ทองคำ", status: "ไถ่ถอนแล้ว", history: "ไถ่ถอน 05/11/23" },
    { id: "PT-004", ticketNo: "109286", customer: "มานี มีตา", pawnDate: "2023-09-01", amount: 8000, asset: "โน้ตบุ๊ก Dell", type: "เครื่องใช้ไฟฟ้า", status: "หลุดจำนำ", history: "หลุดจำนำ 01/12/23" },
    { id: "PT-005", ticketNo: "109287", customer: "ปิติ พิทักษ์", pawnDate: "2023-11-05", amount: 12000, asset: "โทรศัพท์ iPhone 14", type: "เครื่องใช้ไฟฟ้า", status: "กำลังใช้งาน", history: "รับจำนำ 05/11/23" },
    { id: "PT-006", ticketNo: "109288", customer: "ชูใจ ชวนชื่น", pawnDate: "2023-11-06", amount: 22000, asset: "แหวนทอง 1 บาท", type: "ทองคำ", status: "กำลังใช้งาน", history: "รับจำนำ 06/11/23" },
];

export default function PawnDataPage() {
    const handleExport = () => {
        alert("กำลังส่งออกข้อมูลเป็น Excel...");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">คลังข้อมูลจำนำ (Pawn Repository)</h1>
                    <p className="text-slate-500">ข้อมูลรายการรับจำนำที่รวบรวมจากฐานข้อมูลกลาง</p>
                </div>
                <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    ส่งออกเป็น Excel
                </Button>
            </div>

            <Tabs defaultValue="table" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="table">
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        ตารางข้อมูล
                    </TabsTrigger>
                    <TabsTrigger value="dashboard">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        มุมมองแดชบอร์ด
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="table">
                    <Card>
                        <CardHeader>
                            <CardTitle>รายการรับจำนำ</CardTitle>
                            <CardDescription>รายการทรัพย์จำนำทั้งหมดพร้อมสถานะและประวัติ</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>เลขที่ตั๋ว</TableHead>
                                        <TableHead>ประเภททรัพย์</TableHead>
                                        <TableHead>รายละเอียดทรัพย์</TableHead>
                                        <TableHead>จำนวนเงิน (บาท)</TableHead>
                                        <TableHead>สถานะ</TableHead>
                                        <TableHead>ประวัติ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pawnRecords.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell className="font-mono">{record.ticketNo}</TableCell>
                                            <TableCell>{record.type}</TableCell>
                                            <TableCell>{record.asset}</TableCell>
                                            <TableCell className="font-bold text-slate-700">฿{record.amount.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={
                                                        record.status === "ไถ่ถอนแล้ว"
                                                            ? "bg-green-100 text-green-700"
                                                            : record.status === "หลุดจำนำ"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-blue-100 text-blue-700"
                                                    }
                                                >
                                                    {record.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-xs text-slate-500">{record.history}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="dashboard">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">จำนวนรายการทั้งหมด</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{pawnRecords.length} รายการ</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">มูลค่ารับจำนำรวม</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">฿{pawnRecords.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">ดอกเบี้ยรวม (ประมาณการ)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">฿{(pawnRecords.reduce((acc, curr) => acc + curr.amount, 0) * 0.0125).toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">คำนวณที่ 1.25% ต่อเดือน</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">ตั๋วที่กำลังใช้งาน</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{pawnRecords.filter(r => r.status === 'กำลังใช้งาน' || r.status === 'รอส่งดอกเบี้ย').length} ใบ</div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
