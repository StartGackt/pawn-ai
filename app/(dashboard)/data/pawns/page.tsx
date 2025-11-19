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
import { Search, Filter, Download } from "lucide-react";

const mockPawns = [
    {
        id: "P-2025-001",
        customer: "สมชาย ใจดี",
        date: "2025-11-19",
        amount: 50000,
        goldWeight: 15.5,
        purity: "96.5%",
        status: "active",
        branch: "สาขากรุงเทพฯ",
    },
    {
        id: "P-2025-002",
        customer: "สมหญิง รักดี",
        date: "2025-11-18",
        amount: 30000,
        goldWeight: 10.2,
        purity: "96.5%",
        status: "redeemed",
        branch: "สาขาเชียงใหม่",
    },
    {
        id: "P-2025-003",
        customer: "วิชัย มั่งคั่ง",
        date: "2025-11-17",
        amount: 75000,
        goldWeight: 20.8,
        purity: "96.5%",
        status: "active",
        branch: "สาขาภูเก็ต",
    },
];

const statusColors = {
    active: { label: "กำลังจำนำ", variant: "default" as const },
    redeemed: { label: "ไถ่ถอนแล้ว", variant: "secondary" as const },
    forfeited: { label: "หลุดจำนำ", variant: "destructive" as const },
};

export default function PawnsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">การจำนำ</h1>
                    <p className="text-muted-foreground">
                        รายการข้อมูลการจำนำทั้งหมด
                    </p>
                </div>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    ส่งออกข้อมูล
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            รวมทั้งหมด
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,245</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            กำลังจำนำ
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">892</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            ไถ่ถอนแล้ว
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">328</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            หลุดจำนำ
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">25</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="ค้นหาด้วยเลขที่, ชื่อลูกค้า..." className="pl-10" />
                        </div>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            ตัวกรอง
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle>รายการการจำนำ</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>เลขที่</TableHead>
                                <TableHead>ลูกค้า</TableHead>
                                <TableHead>วันที่</TableHead>
                                <TableHead>น้ำหนักทอง</TableHead>
                                <TableHead>ความบริสุทธิ์</TableHead>
                                <TableHead className="text-right">จำนวนเงิน</TableHead>
                                <TableHead>สาขา</TableHead>
                                <TableHead>สถานะ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPawns.map((pawn) => (
                                <TableRow key={pawn.id}>
                                    <TableCell className="font-medium">{pawn.id}</TableCell>
                                    <TableCell>{pawn.customer}</TableCell>
                                    <TableCell>{new Date(pawn.date).toLocaleDateString('th-TH')}</TableCell>
                                    <TableCell>{pawn.goldWeight} กรัม</TableCell>
                                    <TableCell>{pawn.purity}</TableCell>
                                    <TableCell className="text-right">
                                        ฿{pawn.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{pawn.branch}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusColors[pawn.status as keyof typeof statusColors].variant}>
                                            {statusColors[pawn.status as keyof typeof statusColors].label}
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
