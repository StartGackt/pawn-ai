"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, RefreshCw } from "lucide-react";
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
            <Card className="w-full max-w-md">
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full max-w-md">
                <CardContent className="pt-6 text-center">
                    <p className="text-destructive">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={fetchGoldPrice}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        ลองอีกครั้ง
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!goldData) return null;

    return (
        <Card className="w-full max-w-md border-amber-400/30 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5 text-amber-500" />
                        ราคาทองคำไทย
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={fetchGoldPrice}
                        className="h-8 w-8"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs border-amber-300 text-amber-700 dark:text-amber-400">
                        {goldData.date}
                    </Badge>
                    <span>อัพเดท: {goldData.updateTime}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {goldData.data.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-lg border border-amber-200 bg-white/80 dark:bg-slate-900/50 p-3 backdrop-blur-sm"
                    >
                        <p className="mb-2 font-medium text-foreground">{item.name}</p>
                        <div className="flex justify-between text-sm">
                            <div>
                                <span className="text-muted-foreground">รับซื้อ: </span>
                                <span className="font-semibold text-sky-600 dark:text-sky-400">
                                    ฿{item.buy}
                                </span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">ขายออก: </span>
                                <span className="font-semibold text-amber-600 dark:text-amber-400">
                                    ฿{item.sell}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
