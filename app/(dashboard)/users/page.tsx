"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MoreHorizontal, UserCog, Trash2, Search, Users } from "lucide-react";
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
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
                            <Users className="mr-1.5 h-3 w-3" />
                            Management
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">จัดการผู้ใช้งาน</h1>
                    <p className="text-sm text-slate-500 mt-0.5">สถานะล่าสุด: {lastUpdated}</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white h-9">
                    <Plus className="mr-1.5 h-4 w-4" />
                    เพิ่มผู้ใช้งาน
                </Button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder="ค้นหาผู้ใช้งาน..." className="pl-9 h-9" />
                </div>
            </div>

            {/* Users Table */}
            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-700">รายชื่อเจ้าหน้าที่และระบบบริการ</CardTitle>
                    <CardDescription className="text-xs">จัดการผู้ใช้งานที่เกี่ยวข้องกับการให้บริการ</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-xs">ชื่อ-นามสกุล</TableHead>
                                <TableHead className="text-xs">แผนก/หน้าที่</TableHead>
                                <TableHead className="text-xs">ระดับสิทธิ์</TableHead>
                                <TableHead className="text-xs">สถานะ</TableHead>
                                <TableHead className="text-xs">เข้าสู่ระบบล่าสุด</TableHead>
                                <TableHead className="text-xs text-right">จัดการ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usersData.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm text-slate-900">{user.name}</span>
                                            <span className="text-xs text-slate-400">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-600">{user.department}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm">
                                            {user.role === "ผู้ดูแลระบบสูงสุด" && <UserCog className="h-3.5 w-3.5 text-amber-500" />}
                                            <span className="text-slate-600">{user.role}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                user.status === "ออนไลน์"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-xs"
                                                    : "bg-slate-50 text-slate-600 border-slate-200 text-xs"
                                            }
                                        >
                                            {user.status === "ออนไลน์" && (
                                                <span className="relative flex h-1.5 w-1.5 mr-1.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                </span>
                                            )}
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500">{user.lastLogin}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">เปิดเมนู</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel className="text-xs">การกระทำ</DropdownMenuLabel>
                                                <DropdownMenuItem className="text-xs">ดูประวัติการให้บริการ</DropdownMenuItem>
                                                <DropdownMenuItem className="text-xs">แก้ไขข้อมูล</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-xs text-red-600">
                                                    <Trash2 className="mr-2 h-3.5 w-3.5" />
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
