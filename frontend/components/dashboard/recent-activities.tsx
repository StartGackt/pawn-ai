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
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

interface Activity {
    id: string;
    type: "pawn" | "redeem" | "forfeit";
    customer: string;
    amount: number;
    branch: string;
    timestamp: Date;
}

// Use static timestamps to avoid hydration mismatch
const getStaticTimestamp = (minutesAgo: number) => {
    const baseDate = new Date('2024-01-15T14:30:00'); // Static base date
    return new Date(baseDate.getTime() - 1000 * 60 * minutesAgo);
};

const mockActivities: Activity[] = [
    {
        id: "1",
        type: "pawn",
        customer: "สมชาย ใจดี",
        amount: 50000,
        branch: "สาขากรุงเทพฯ",
        timestamp: getStaticTimestamp(10),
    },
    {
        id: "2",
        type: "redeem",
        customer: "สมหญิง รักดี",
        amount: 30000,
        branch: "สาขาเชียงใหม่",
        timestamp: getStaticTimestamp(25),
    },
    {
        id: "3",
        type: "pawn",
        customer: "วิชัย มั่งคั่ง",
        amount: 75000,
        branch: "สาขาภูเก็ต",
        timestamp: getStaticTimestamp(45),
    },
    {
        id: "4",
        type: "forfeit",
        customer: "สุดา แสนดี",
        amount: 20000,
        branch: "สาขาขอนแก่น",
        timestamp: getStaticTimestamp(60),
    },
];

const typeLabels = {
    pawn: { label: "รับจำนำ", variant: "default" as const },
    redeem: { label: "ไถ่ถอน", variant: "secondary" as const },
    forfeit: { label: "หลุดจำนำ", variant: "destructive" as const },
};

export function RecentActivities() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>กิจกรรมล่าสุด</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ประเภท</TableHead>
                            <TableHead>ลูกค้า</TableHead>
                            <TableHead>สาขา</TableHead>
                            <TableHead className="text-right">จำนวนเงิน</TableHead>
                            <TableHead className="text-right">เวลา</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockActivities.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell>
                                    <Badge variant={typeLabels[activity.type].variant}>
                                        {typeLabels[activity.type].label}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{activity.customer}</TableCell>
                                <TableCell>{activity.branch}</TableCell>
                                <TableCell className="text-right">
                                    ฿{activity.amount.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground" suppressHydrationWarning>
                                    {formatDistanceToNow(activity.timestamp, {
                                        addSuffix: true,
                                        locale: th,
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
