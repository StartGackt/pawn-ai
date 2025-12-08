"use client";

import * as React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                    {/* Mobile Header with Hamburger */}
                    <header className="flex md:hidden h-14 items-center gap-4 border-b bg-background px-4 sticky top-0 z-50">
                        <SidebarTrigger className="h-9 w-9" />
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">Pawn AI</span>
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto p-4 md:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
