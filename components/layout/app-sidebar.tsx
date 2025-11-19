"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    TrendingUp,
    Sparkles,
    MessageSquare,
    FileText,
    Database,
    Users,
    Archive,
    Activity,
    GitCompare,
    Cpu,
    Settings,
    Bell,
    User,
    ChevronRight,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
    {
        title: "ภาพรวม",
        items: [
            {
                title: "แดชบอร์ด",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "ข้อมูล",
        items: [
            {
                title: "การจำนำ",
                href: "/data/pawns",
                icon: Database,
            },
            {
                title: "ราคาทองคำ",
                href: "/data/gold-prices",
                icon: TrendingUp,
            },
            {
                title: "ทรัพย์หลุดจำนำ",
                href: "/data/forfeited-assets",
                icon: Archive,
            },
            {
                title: "ลูกค้า",
                href: "/data/customers",
                icon: Users,
            },
        ],
    },
    {
        title: "การวิเคราะห์",
        items: [
            {
                title: "แนวโน้ม",
                href: "/analytics/trends",
                icon: Activity,
            },
            {
                title: "การเปรียบเทียบ",
                href: "/analytics/comparison",
                icon: GitCompare,
            },
        ],
    },
    {
        title: "AI & ML",
        items: [
            {
                title: "คาดการณ์",
                href: "/predictions",
                icon: Sparkles,
            },
            {
                title: "AI Chatbot",
                href: "/chat",
                icon: MessageSquare,
            },
            {
                title: "Model Info",
                href: "/models",
                icon: Cpu,
            },
        ],
    },
    {
        title: "รายงาน",
        items: [
            {
                title: "สร้างรายงาน",
                href: "/reports",
                icon: FileText,
            },
        ],
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="flex h-16 flex-row items-center border-b px-6">
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="สธค. Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Pawn AI</span>
                        <span className="text-xs text-muted-foreground">Analytics System</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {navItems.map((group, idx) => (
                    <SidebarGroup key={idx}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;

                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <Link href={item.href}>
                                                    <Icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatar.png" />
                                <AvatarFallback>ผู้ใช้</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-1 flex-col items-start text-left text-sm">
                                <span className="font-medium">ผู้ดูแลระบบ</span>
                                <span className="text-xs text-muted-foreground">admin@stgk.go.th</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>โปรไฟล์</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>ตั้งค่า</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>การแจ้งเตือน</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            ออกจากระบบ
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
