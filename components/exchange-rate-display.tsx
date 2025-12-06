"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightLeft, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CurrencyData {
    currencyId: string;
    currencyNameTh: string;
    currencyNameEng: string;
    buyingSight: string;
    buyingTransfer: string;
    selling: string;
    midRate: string;
}

interface ExchangeRateData {
    source: string;
    period: string;
    lastUpdated: string;
    currencies: CurrencyData[];
}

// สกุลเงินหลักที่แสดง (แสดงเฉพาะบางตัว)
const MAIN_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CNY"];

// Flag emoji สำหรับแต่ละสกุลเงิน
const currencyFlags: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
    SGD: "🇸🇬",
    AUD: "🇦🇺",
    HKD: "🇭🇰",
};

// ชื่อย่อสกุลเงิน
const currencyNames: Record<string, string> = {
    USD: "ดอลลาร์สหรัฐ",
    EUR: "ยูโร",
    GBP: "ปอนด์",
    JPY: "เยน (100)",
    CNY: "หยวน",
    SGD: "ดอลลาร์สิงคโปร์",
    AUD: "ดอลลาร์ออสเตรเลีย",
    HKD: "ดอลลาร์ฮ่องกง",
};

interface ExchangeRateDisplayProps {
    compact?: boolean;
    showAllCurrencies?: boolean;
}

export function ExchangeRateDisplay({
    compact = false,
    showAllCurrencies = false,
}: ExchangeRateDisplayProps) {
    const [data, setData] = useState<ExchangeRateData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExchangeRate = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/exchange-rate");
            if (!response.ok) {
                throw new Error("Failed to fetch exchange rate");
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError("ไม่สามารถดึงข้อมูลอัตราแลกเปลี่ยนได้");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExchangeRate();
    }, []);

    if (loading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="pt-6 text-center">
                    <p className="text-destructive">{error}</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={fetchExchangeRate}
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        ลองอีกครั้ง
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!data) return null;

    const currencies = showAllCurrencies
        ? data.currencies
        : data.currencies.filter((c) => MAIN_CURRENCIES.includes(c.currencyId));

    if (compact) {
        return (
            <Card className="w-full border-blue-500/30 bg-linear-to-br from-blue-500/5 to-indigo-600/10">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ArrowRightLeft className="h-5 w-5 text-blue-500" />
                            อัตราแลกเปลี่ยน
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={fetchExchangeRate}
                            className="h-8 w-8"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                            {data.period}
                        </Badge>
                        <span className="text-xs">ธปท.</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {currencies.slice(0, 4).map((currency) => (
                            <div
                                key={currency.currencyId}
                                className="flex items-center justify-between rounded-lg border bg-background/50 px-3 py-2"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">
                                        {currencyFlags[currency.currencyId]}
                                    </span>
                                    <span className="font-medium">{currency.currencyId}</span>
                                </div>
                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    ฿{parseFloat(currency.midRate).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full border-blue-500/30 bg-linear-to-br from-blue-500/5 to-indigo-600/10">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <ArrowRightLeft className="h-6 w-6 text-blue-500" />
                        อัตราแลกเปลี่ยนเงินตราต่างประเทศ
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={fetchExchangeRate}
                        className="h-8 w-8"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                        {data.source}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        ข้อมูล ณ วันที่ {data.period}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                {/* Header */}
                <div className="mb-2 grid grid-cols-5 gap-2 px-3 text-xs font-medium text-muted-foreground">
                    <div className="col-span-2">สกุลเงิน</div>
                    <div className="text-right">ซื้อ</div>
                    <div className="text-right">ขาย</div>
                    <div className="text-right">กลาง</div>
                </div>

                {/* Currency rows */}
                <div className="space-y-2">
                    {currencies.map((currency) => {
                        const midRate = parseFloat(currency.midRate);
                        const buyRate = parseFloat(currency.buyingTransfer);
                        const sellRate = parseFloat(currency.selling);
                        const spread = sellRate - buyRate;
                        const spreadPercent = ((spread / midRate) * 100).toFixed(2);

                        return (
                            <div
                                key={currency.currencyId}
                                className="group rounded-lg border bg-background/50 p-3 transition-all hover:bg-background/80 hover:shadow-sm"
                            >
                                <div className="grid grid-cols-5 items-center gap-2">
                                    {/* Currency info */}
                                    <div className="col-span-2 flex items-center gap-3">
                                        <span className="text-2xl">
                                            {currencyFlags[currency.currencyId]}
                                        </span>
                                        <div>
                                            <div className="font-semibold">{currency.currencyId}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {currencyNames[currency.currencyId]}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buy rate */}
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <TrendingDown className="h-3 w-3 text-green-500" />
                                            <span className="font-medium text-green-600 dark:text-green-400">
                                                {buyRate.toFixed(4)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sell rate */}
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <TrendingUp className="h-3 w-3 text-red-500" />
                                            <span className="font-medium text-red-500">
                                                {sellRate.toFixed(4)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mid rate */}
                                    <div className="text-right">
                                        <span className="font-bold text-blue-600 dark:text-blue-400">
                                            {midRate.toFixed(4)}
                                        </span>
                                    </div>
                                </div>

                                {/* Spread info (show on hover) */}
                                <div className="mt-2 hidden text-xs text-muted-foreground group-hover:block">
                                    <span>
                                        Spread: ฿{spread.toFixed(4)} ({spreadPercent}%)
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer note */}
                <div className="mt-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                    <p>
                        💡 <strong>หมายเหตุ:</strong> อัตราแลกเปลี่ยนเฉลี่ยของธนาคารพาณิชย์
                        อาจแตกต่างจากอัตราที่ใช้ซื้อขายจริง กรุณาตรวจสอบกับธนาคารอีกครั้ง
                    </p>
                    <p className="mt-1">
                        หน่วย: บาท ต่อ 1 หน่วยเงินตราต่างประเทศ (ยกเว้น JPY เป็น 100 เยน)
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
