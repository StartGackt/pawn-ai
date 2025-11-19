"use client";

import * as React from "react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";

export function Navbar() {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="sticky top-0 z-40 -ml-px border-b border-l bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="flex flex-1 items-center gap-4">
                    <div className="relative w-full max-w-md">
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <Badge
                                    variant="destructive"
                                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                                >
                                    3
                                </Badge>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>การแจ้งเตือน</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium">ราคาทองคำเพิ่มขึ้น 5%</p>
                                    <p className="text-xs text-muted-foreground">5 นาทีที่แล้ว</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium">ทรัพย์หลุดจำนำใหม่ 15 รายการ</p>
                                    <p className="text-xs text-muted-foreground">1 ชั่วโมงที่แล้ว</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium">รายงานประจำเดือนพร้อมแล้ว</p>
                                    <p className="text-xs text-muted-foreground">2 ชั่วโมงที่แล้ว</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="justify-center text-primary">
                                ดูทั้งหมด
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
