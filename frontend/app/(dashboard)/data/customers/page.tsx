"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, TrendingUp, TrendingDown } from "lucide-react";

const mockCustomers = [
    {
        id: "C-2025-001",
        name: "สมชาย ใจดี",
        phone: "081-234-5678",
        totalPawns: 15,
        totalAmount: 450000,
        riskScore: 0.25,
        lastVisit: "2025-11-19",
        status: "active",
    },
    {
        id: "C-2025-002",
        name: "สมหญิง รักดี",
        phone: "082-345-6789",
        totalPawns: 8,
        totalAmount: 240000,
        riskScore: 0.15,
        lastVisit: "2025-11-18",
        status: "active",
    },
    {
        id: "C-2024-856",
        name: "วิชัย มั่งคั่ง",
        phone: "083-456-7890",
        totalPawns: 22,
        totalAmount: 780000,
        riskScore: 0.65,
        lastVisit: "2025-10-25",
        status: "high-risk",
    },
];

const getRiskBadge = (score: number) => {
    if (score < 0.3) return { label: "ความเสี่ยงต่ำ", variant: "secondary" as const };
    if (score < 0.6) return { label: "ความเสี่ยงปานกลาง", variant: "default" as const };
    return { label: "ความเสี่ยงสูง", variant: "destructive" as const };
};

export default function CustomersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">ลูกค้า</h1>
                <p className="text-muted-foreground">
                    ข้อมูลลูกค้าและการวิเคราะห์ความเสี่ยง
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ลูกค้าทั้งหมด</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3,524</div>
                        <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>+48 เดือนนี้</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ลูกค้าปัจจุบัน</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">892</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            มีการจำนำอยู่
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ลูกค้าเสี่ยงสูง</CardTitle>
                        <Users className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                            <TrendingDown className="h-3 w-3" />
                            <span>ต้องติดตาม</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">มูลค่าเฉลี่ย</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿35,420</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            ต่อลูกค้า
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Customer Segments */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">แบ่งตามความเสี่ยง</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">ความเสี่ยงต่ำ</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full w-[75%] bg-green-500" />
                                </div>
                                <span className="text-sm font-medium">75%</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">ความเสี่ยงปานกลาง</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full w-[20%] bg-amber-500" />
                                </div>
                                <span className="text-sm font-medium">20%</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">ความเสี่ยงสูง</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full w-[5%] bg-red-500" />
                                </div>
                                <span className="text-sm font-medium">5%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">แบ่งตามความถี่</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ประจำ ({">"} 10 ครั้ง)</span>
                            <span className="text-sm font-medium">425 คน</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">บ่อย (5-10 ครั้ง)</span>
                            <span className="text-sm font-medium">892 คน</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ปกติ ({"<"} 5 ครั้ง)</span>
                            <span className="text-sm font-medium">2,207 คน</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">แบ่งตามมูลค่า</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">VIP ({">"} ฿500k)</span>
                            <span className="text-sm font-medium">156 คน</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Premium (฿100k-500k)</span>
                            <span className="text-sm font-medium">845 คน</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ปกติ ({"<"} ฿100k)</span>
                            <span className="text-sm font-medium">2,523 คน</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardHeader>
                    <CardTitle>ค้นหาลูกค้า</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="ค้นหาด้วยชื่อ, เบอร์โทร, รหัสลูกค้า..."
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>รายชื่อลูกค้า</CardTitle>
                        <Button variant="outline" size="sm">
                            ส่งออกข้อมูล
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>รหัส</TableHead>
                                <TableHead>ชื่อ-นามสกุล</TableHead>
                                <TableHead>เบอร์โทร</TableHead>
                                <TableHead className="text-right">จำนวนครั้ง</TableHead>
                                <TableHead className="text-right">มูลค่ารวม</TableHead>
                                <TableHead>เข้าใช้บริการล่าสุด</TableHead>
                                <TableHead>ระดับความเสี่ยง</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockCustomers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell className="font-medium">{customer.id}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell className="text-right">{customer.totalPawns}</TableCell>
                                    <TableCell className="text-right">
                                        ฿{customer.totalAmount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(customer.lastVisit).toLocaleDateString('th-TH')}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getRiskBadge(customer.riskScore).variant}>
                                            {getRiskBadge(customer.riskScore).label}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
