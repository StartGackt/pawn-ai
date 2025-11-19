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
import { Archive, DollarSign, TrendingUp } from "lucide-react";

const mockAssets = [
    {
        id: "FA-2025-001",
        pawnId: "P-2024-856",
        forfeitDate: "2025-11-01",
        goldWeight: 12.5,
        estimatedValue: 38000,
        status: "pending",
        branch: "สาขากรุงเทพฯ",
    },
    {
        id: "FA-2025-002",
        pawnId: "P-2024-723",
        forfeitDate: "2025-10-28",
        goldWeight: 8.3,
        estimatedValue: 25000,
        saleDate: "2025-11-15",
        saleAmount: 26500,
        status: "sold",
        branch: "สาขาเชียงใหม่",
    },
    {
        id: "FA-2025-003",
        pawnId: "P-2024-945",
        forfeitDate: "2025-10-25",
        goldWeight: 15.2,
        estimatedValue: 46000,
        status: "processing",
        branch: "สาขาภูเก็ต",
    },
];

const statusColors = {
    pending: { label: "รอการขาย", variant: "default" as const },
    processing: { label: "กำลังดำเนินการ", variant: "secondary" as const },
    sold: { label: "ขายแล้ว", variant: "outline" as const },
};

export default function ForfeitedAssetsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">ทรัพย์หลุดจำนำ</h1>
                <p className="text-muted-foreground">
                    รายการทรัพย์สินที่หลุดจำนำและผลการขาย
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">รวมทั้งหมด</CardTitle>
                        <Archive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <p className="text-xs text-muted-foreground mt-1">รายการ</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">รอการขาย</CardTitle>
                        <Archive className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">67</div>
                        <p className="text-xs text-muted-foreground mt-1">รายการ</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">มูลค่าประเมิน</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿8.5M</div>
                        <p className="text-xs text-muted-foreground mt-1">ของที่รอขาย</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">รายได้จากการขาย</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿12.3M</div>
                        <p className="text-xs text-muted-foreground mt-1">ปีนี้</p>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Statistics */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>สถิติรายเดือน (พฤศจิกายน 2025)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">หลุดจำนำใหม่</span>
                            <span className="text-sm font-medium">23 รายการ</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ขายได้แล้ว</span>
                            <span className="text-sm font-medium">18 รายการ</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">มูลค่าขาย</span>
                            <span className="text-sm font-medium">฿985,000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">กำไรเฉลี่ย</span>
                            <span className="text-sm font-medium text-green-600">+8.5%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>การเปรียบเทียบ</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">เทียบเดือนที่แล้ว</span>
                            <span className="text-sm font-medium text-red-600">-5.2%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">เทียบปีที่แล้ว</span>
                            <span className="text-sm font-medium text-green-600">+12.8%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ระยะเวลาขายเฉลี่ย</span>
                            <span className="text-sm font-medium">18 วัน</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">อัตราขายได้</span>
                            <span className="text-sm font-medium">94.5%</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>รายการทรัพย์หลุดจำนำ</CardTitle>
                        <Button variant="outline" size="sm">
                            กรองตามสถานะ
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>รหัส</TableHead>
                                <TableHead>เลขที่จำนำ</TableHead>
                                <TableHead>วันที่หลุด</TableHead>
                                <TableHead>น้ำหนักทอง</TableHead>
                                <TableHead className="text-right">มูลค่าประเมิน</TableHead>
                                <TableHead className="text-right">ราคาขาย</TableHead>
                                <TableHead>สาขา</TableHead>
                                <TableHead>สถานะ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockAssets.map((asset) => (
                                <TableRow key={asset.id}>
                                    <TableCell className="font-medium">{asset.id}</TableCell>
                                    <TableCell>{asset.pawnId}</TableCell>
                                    <TableCell>
                                        {new Date(asset.forfeitDate).toLocaleDateString('th-TH')}
                                    </TableCell>
                                    <TableCell>{asset.goldWeight} กรัม</TableCell>
                                    <TableCell className="text-right">
                                        ฿{asset.estimatedValue.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {asset.saleAmount ? (
                                            <span className="font-medium text-green-600">
                                                ฿{asset.saleAmount.toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{asset.branch}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusColors[asset.status as keyof typeof statusColors].variant}>
                                            {statusColors[asset.status as keyof typeof statusColors].label}
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
