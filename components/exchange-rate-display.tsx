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
            <Card className="h-full w-full border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <CardHeader className="border-b border-slate-100 pb-3 dark:border-slate-800/50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                            <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                            อัตราแลกเปลี่ยน
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={fetchExchangeRate}
                            className="h-8 w-8 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Badge variant="outline" className="text-[10px] bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                            {data.period}
                        </Badge>
                        <span className="text-xs">ธปท.</span>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="space-y-3">
                        {currencies.slice(0, 4).map((currency) => (
                            <div
                                key={currency.currencyId}
                                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 transition-colors hover:bg-white hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl drop-shadow-sm">
                                        {currencyFlags[currency.currencyId]}
                                    </span>
                                    <div className="flex flex-col">
                                         <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{currency.currencyId}</span>
                                        <span className="text-[10px] text-slate-400">{currencyNames[currency.currencyId]}</span>
                                    </div>
                                   
                                </div>
                                <span className="font-bold text-slate-900 dark:text-white font-mono">
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
        <Card className="w-full border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                             <ArrowRightLeft className="h-6 w-6" />
                        </span>
                        อัตราแลกเปลี่ยนเงินตราต่างประเทศ
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={fetchExchangeRate}
                        className="h-8 w-8 text-slate-400 hover:text-blue-600"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mt-2">
                    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {data.source}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-slate-200 dark:border-slate-700">
                        ข้อมูล ณ วันที่ {data.period}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                {/* Header */}
                <div className="mb-2 grid grid-cols-5 gap-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
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
                                className="group rounded-xl border border-transparent bg-slate-50/50 p-3 transition-all hover:bg-white hover:border-slate-200 hover:shadow-md dark:bg-slate-800/30 dark:hover:bg-slate-800 dark:hover:border-slate-700"
                            >
                                <div className="grid grid-cols-5 items-center gap-2">
                                    {/* Currency info */}
                                    <div className="col-span-2 flex items-center gap-3">
                                        <span className="text-3xl drop-shadow-sm">
                                            {currencyFlags[currency.currencyId]}
                                        </span>
                                        <div>
                                            <div className="font-bold text-slate-800 dark:text-slate-100">{currency.currencyId}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {currencyNames[currency.currencyId]}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buy rate */}
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <TrendingDown className="h-3 w-3 text-emerald-500" />
                                            <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                                                {buyRate.toFixed(4)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sell rate */}
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <TrendingUp className="h-3 w-3 text-rose-500" />
                                            <span className="font-semibold text-rose-500 font-mono">
                                                {sellRate.toFixed(4)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mid rate */}
                                    <div className="text-right">
                                        <span className="font-bold text-slate-900 dark:text-white font-mono bg-slate-200/50 px-2 py-0.5 rounded dark:bg-slate-700">
                                            {midRate.toFixed(4)}
                                        </span>
                                    </div>
                                </div>

                                {/* Spread info (show on hover) */}
                                <div className="mt-2 hidden text-xs text-slate-400 text-center border-t border-slate-100 pt-2 group-hover:block dark:border-slate-700">
                                    <span>
                                        Spread: ฿{spread.toFixed(4)} ({spreadPercent}%)
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer note */}
                <div className="mt-6 rounded-xl bg-blue-50/50 p-4 text-xs text-slate-600 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30 dark:text-slate-400">
                    <p className="flex gap-2">
                        <span className="text-lg">💡</span>
                         <span>
                            <strong>หมายเหตุ:</strong> อัตราแลกเปลี่ยนเฉลี่ยของธนาคารพาณิชย์
                            อาจแตกต่างจากอัตราที่ใช้ซื้อขายจริง กรุณาตรวจสอบกับธนาคารอีกครั้ง
                            <br/>
                            <span className="opacity-70 mt-1 block">หน่วย: บาท ต่อ 1 หน่วยเงินตราต่างประเทศ (ยกเว้น JPY เป็น 100 เยน)</span>
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
