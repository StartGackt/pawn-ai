"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorldGoldPrice {
    price: number;
    change: number;
    changePercent: number;
    high24h: number;
    low24h: number;
    timestamp: string;
    currency: string;
}

export function WorldGoldPriceDisplay() {
    const [goldData, setGoldData] = useState<WorldGoldPrice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGoldPrice = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/gold-world");
            if (!response.ok) {
                throw new Error("Failed to fetch gold price");
            }
            const data = await response.json();
            setGoldData(data);
        } catch (err) {
            setError("ไม่สามารถดึงข้อมูลราคาทองโลกได้");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoldPrice();
        // Auto refresh every 5 minutes
        const interval = setInterval(fetchGoldPrice, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-16 w-full" />
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

    const isPositive = goldData.change >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <Card className="w-full max-w-md border-blue-500/30 bg-linear-to-br from-blue-500/5 to-blue-600/10">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Globe className="h-5 w-5 text-blue-500" />
                        ราคาทองโลก (XAU/USD)
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
                    <Badge variant="outline" className="text-xs">
                        LIVE
                    </Badge>
                    <span>
                        อัพเดท: {new Date(goldData.timestamp).toLocaleTimeString("th-TH")}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Main Price */}
                <div className="rounded-lg border bg-background/50 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl font-bold text-foreground">
                                ${goldData.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-muted-foreground">ต่อออนซ์</p>
                        </div>
                        <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-500"}`}>
                            <TrendIcon className="h-5 w-5" />
                            <div className="text-right">
                                <p className="font-semibold">
                                    {isPositive ? "+" : ""}{goldData.change.toFixed(2)}
                                </p>
                                <p className="text-sm">
                                    ({isPositive ? "+" : ""}{goldData.changePercent.toFixed(2)}%)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* High/Low */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border bg-background/50 p-2 text-center">
                        <p className="text-xs text-muted-foreground">สูงสุด 24h</p>
                        <p className="font-semibold text-green-600">
                            ${goldData.high24h.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-background/50 p-2 text-center">
                        <p className="text-xs text-muted-foreground">ต่ำสุด 24h</p>
                        <p className="font-semibold text-red-500">
                            ${goldData.low24h.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
