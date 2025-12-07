"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MoreHorizontal, UserCog, Trash2, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export default function UserManagementPage() {
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        setLastUpdated(new Date().toLocaleString('th-TH'));
    }, []);

    const usersData = [
        { id: 1, name: "Admin User", email: "admin@pawn.co.th", role: "ผู้ดูแลระบบสูงสุด", department: "IT Support", status: "ใช้งานปกติ", lastLogin: new Date().toLocaleDateString('th-TH') + " 08:30" },
        { id: 2, name: "Manager One", email: "manager1@pawn.co.th", role: "ผู้จัดการสาขา", department: "บริการสินเชื่อ", status: "ใช้งานปกติ", lastLogin: new Date().toLocaleDateString('th-TH') + " 09:15" },
        { id: 3, name: "Staff Member", email: "staff@pawn.co.th", role: "พนักงานบริการ", department: "ประเมินทรัพย์สิน", status: "ใช้งานปกติ", lastLogin: new Date(Date.now() - 3600000).toLocaleString('th-TH') },
        { id: 4, name: "Service Bot", email: "bot@pawn.co.th", role: "AI Assistant", department: "ระบบตอบรับอัตโนมัติ", status: "ออนไลน์", lastLogin: "ตลอดเวลา" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">จัดการผู้ใช้งาน (User Management)</h1>
                    <p className="text-slate-500">สถานะล่าสุด ณ วันที่: {lastUpdated}</p>
                </div>
                <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    เพิ่มผู้ใช้งานใหม่
                </Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Input placeholder="ค้นหาผู้ใช้งาน..." />
                <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>รายชื่อเจ้าหน้าที่และระบบบริการ</CardTitle>
                    <CardDescription>จัดการผู้ใช้งานที่เกี่ยวข้องกับการให้บริการ (Service Staff & Agents)</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ชื่อ-นามสกุล</TableHead>
                                <TableHead>แผนก/หน้าที่</TableHead>
                                <TableHead>ระดับสิทธิ์</TableHead>
                                <TableHead>สถานะ</TableHead>
                                <TableHead>เข้าสู่ระบบล่าสุด</TableHead>
                                <TableHead className="text-right">จัดการ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usersData.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{user.name}</span>
                                            <span className="text-xs text-slate-400">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.department}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            {user.role === "ผู้ดูแลระบบสูงสุด" && <UserCog className="h-3 w-3 text-amber-500" />}
                                            {user.role}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === "ใช้งานปกติ" || user.status === "ออนไลน์" ? "default" : "destructive"} className={user.status === "ออนไลน์" ? "bg-green-500" : ""}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">{user.lastLogin}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">เปิดเมนู</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>การกระทำ</DropdownMenuLabel>
                                                <DropdownMenuItem>ดูประวัติการให้บริการ</DropdownMenuItem>
                                                <DropdownMenuItem>แก้ไขข้อมูล</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    ลบบัญชี
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
