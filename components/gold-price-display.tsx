"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, RefreshCw, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoldPriceData {
    date: string;
    updateTime: string;
    data: {
        name: string;
        buy: string;
        sell: string;
    }[];
}

export function GoldPriceDisplay() {
    const [goldData, setGoldData] = useState<GoldPriceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGoldPrice = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/gold-price");
            if (!response.ok) {
                throw new Error("Failed to fetch gold price");
            }
            const data = await response.json();
            setGoldData(data);
        } catch (err) {
            setError("ไม่สามารถดึงข้อมูลราคาทองได้");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoldPrice();
    }, []);

    if (loading) {
        return (
            <Card className="h-full w-full border-slate-200 shadow-sm">
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="h-full w-full border-destructive/50 bg-destructive/5">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <p className="text-destructive font-medium">{error}</p>
                    <Button variant="outline" className="mt-4 border-destructive/30 hover:bg-destructive/10" onClick={fetchGoldPrice}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        ลองอีกครั้ง
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!goldData) return null;

    return (
        <Card className="h-full w-full overflow-hidden border-amber-200 bg-linear-to-b from-white to-amber-50/30 shadow-lg transition-all hover:shadow-xl dark:border-amber-900/50 dark:from-slate-900 dark:to-slate-900">
            <CardHeader className="border-b border-amber-100 bg-amber-50/50 pb-4 dark:border-amber-900/20 dark:bg-amber-900/10">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-amber-50">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                                ฿
                            </span>
                            ราคาทองคำไทย
                        </CardTitle>
                         <CardDescription className="text-slate-500 dark:text-amber-500/70 mt-1">
                            ข้อมูลจากสมาคมค้าทองคำ
                        </CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={fetchGoldPrice}
                        className="text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
                <div className="mt-2 flex items-center gap-3">
                     <Badge variant="outline" className="border-amber-200 bg-white text-amber-700 shadow-xs dark:border-amber-800 dark:bg-slate-950 dark:text-amber-400">
                        {goldData.date}
                    </Badge>
                     <span className="text-xs text-slate-500 flex items-center gap-1 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        อัพเดทล่าสุด: {goldData.updateTime}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-amber-100/50 dark:divide-amber-900/20">
                    {goldData.data.map((item, index) => (
                        <div key={index} className="p-6 transition-colors hover:bg-amber-50/30 dark:hover:bg-amber-900/5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-lg flex items-center gap-2">
                                     <TrendingUp className="h-4 w-4 text-amber-500" />
                                    {item.name}
                                </h3>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">รับซื้อ (บาท)</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{item.buy}</span>
                                    </div>
                                </div>
                                <div className="space-y-1 border-l border-amber-100 pl-4 dark:border-amber-900/30">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">ขายออก (บาท)</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{item.sell}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="bg-slate-50 p-4 text-center dark:bg-slate-900/50">
                    <Button variant="link" className="text-amber-600 hover:text-amber-700 dark:text-amber-500" asChild>
                         <a href="https://www.goldtraders.or.th/" target="_blank" rel="noopener noreferrer">
                             ดูประวัติราคาเพิ่มเติม <ExternalLink className="ml-1 h-3 w-3" />
                         </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
