'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BankRateAvg {
    name_th: string;
    name_eng: string;
    mor: number | null;
    mlr: number | null;
    mrr: number | null;
    ceiling_rate: number | null;
    default_rate: number | null;
    creditcard_min: number | null;
    creditcard_max: number | null;
}

interface LoanRateResponse {
    success: boolean;
    type: string;
    period: string;
    timestamp: string;
    source?: string;
    data: {
        thai_commercial_banks_avg: BankRateAvg | null;
        foreign_banks_avg: BankRateAvg | null;
    };
}

interface LoanRateDisplayProps {
    mode?: 'compact' | 'full';
    className?: string;
}

export function LoanRateDisplay({ mode = 'full', className = '' }: LoanRateDisplayProps) {
    const [data, setData] = useState<LoanRateResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLoanRate = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/loan-rate?type=average');
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (err) {
                console.error('Error fetching loan rate:', err);
                setError('ไม่สามารถโหลดข้อมูลอัตราดอกเบี้ยได้');
            } finally {
                setLoading(false);
            }
        };

        fetchLoanRate();
        // Refresh every hour
        const interval = setInterval(fetchLoanRate, 3600000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <LoadingSkeleton mode={mode} className={className} />;
    }

    if (error || !data) {
        return (
            <Card className={`${className} border-red-200 bg-red-50`}>
                <CardContent className="p-4">
                    <p className="text-red-600 text-sm">{error || 'เกิดข้อผิดพลาด'}</p>
                </CardContent>
            </Card>
        );
    }

    if (mode === 'compact') {
        return <CompactView data={data} className={className} />;
    }

    return <FullView data={data} className={className} />;
}

function CompactView({ data, className }: { data: LoanRateResponse; className: string }) {
    const thaiBank = data.data.thai_commercial_banks_avg;

    return (
        <Card className={`${className} border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900`}>
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                             🏦
                        </span>
                        อัตราดอกเบี้ยเงินกู้
                    </CardTitle>
                    {data.source === 'fallback' && (
                        <Badge variant="outline" className="text-[10px] h-5 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-500">
                            ข้อมูลประมาณการ
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                {thaiBank && (
                    <div className="space-y-4">
                        {/* Main Rates */}
                        <div className="grid grid-cols-3 gap-3">
                            <RateBox label="MOR" value={thaiBank.mor} color="slate" />
                            <RateBox label="MLR" value={thaiBank.mlr} color="slate" />
                            <RateBox label="MRR" value={thaiBank.mrr} color="blue" />
                        </div>

                        {/* Credit Card Rate */}
                        <div className="flex items-center justify-between text-xs bg-slate-50 rounded-lg p-3 dark:bg-slate-800/50">
                            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                💳 <span className="font-medium">ดอกเบี้ยบัตรเครดิต</span>
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white">
                                {thaiBank.creditcard_max ? `${thaiBank.creditcard_max.toFixed(2)}%` : '-'}
                            </span>
                        </div>

                        {/* Update time */}
                        <div className="text-[10px] text-slate-400 text-right flex items-center justify-end gap-1">
                             <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                            อัปเดต: {new Date(data.period).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function FullView({ data, className }: { data: LoanRateResponse; className: string }) {
    const thaiBank = data.data.thai_commercial_banks_avg;
    const foreignBank = data.data.foreign_banks_avg;

    return (
        <Card className={`${className} border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900`}>
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <span className="text-2xl">🏦</span>
                        อัตราดอกเบี้ยเงินกู้ธนาคารพาณิชย์
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {data.source === 'fallback' && (
                            <Badge variant="outline" className="text-xs border-amber-200 text-amber-600 bg-amber-50">
                                ข้อมูลประมาณการ
                            </Badge>
                        )}
                        <Badge className="bg-blue-600 text-white text-xs hover:bg-blue-700">
                            % ต่อปี
                        </Badge>
                    </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                    ข้อมูล ณ วันที่ {new Date(data.period).toLocaleDateString('th-TH', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="thai" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4 bg-slate-100 dark:bg-slate-800">
                        <TabsTrigger value="thai" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                            🇹🇭 ธ.พ. ในประเทศ
                        </TabsTrigger>
                        <TabsTrigger value="foreign" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                            🌏 สาขา ธ. ต่างประเทศ
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="thai">
                        {thaiBank && <BankRateDetails bank={thaiBank} />}
                    </TabsContent>

                    <TabsContent value="foreign">
                        {foreignBank && <BankRateDetails bank={foreignBank} />}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function BankRateDetails({ bank }: { bank: BankRateAvg }) {
    return (
        <div className="space-y-4">
            {/* Main Interest Rates */}
            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span>📊</span> อัตราดอกเบี้ยหลัก
                </h4>
                <div className="grid grid-cols-3 gap-3">
                    <RateCard
                        label="MOR"
                        fullName="Minimum Overdraft Rate"
                        value={bank.mor}
                        description="ดอกเบี้ยเบิกเงินเกินบัญชี"
                        color="slate"
                    />
                    <RateCard
                        label="MLR"
                        fullName="Minimum Loan Rate"
                        value={bank.mlr}
                        description="ดอกเบี้ยลูกค้ารายใหญ่"
                        color="blue"
                    />
                    <RateCard
                        label="MRR"
                        fullName="Minimum Retail Rate"
                        value={bank.mrr}
                        description="ดอกเบี้ยลูกค้ารายย่อย"
                        color="indigo"
                    />
                </div>
            </div>

            {/* Other Rates */}
            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span>💳</span> อัตราดอกเบี้ยอื่นๆ
                </h4>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs text-slate-500">Ceiling Rate</p>
                                <p className="text-[10px] text-slate-400">อัตราดอกเบี้ยสูงสุด</p>
                            </div>
                            <span className="text-lg font-bold text-slate-700 dark:text-slate-200">
                                {bank.ceiling_rate ? `${bank.ceiling_rate.toFixed(2)}%` : '-'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs text-slate-500">Default Rate</p>
                                <p className="text-[10px] text-slate-400">ดอกเบี้ยผิดนัดชำระ</p>
                            </div>
                            <span className="text-lg font-bold text-amber-500">
                                {bank.default_rate ? `${bank.default_rate.toFixed(2)}%` : '-'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm col-span-2 dark:bg-slate-800 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-500">Credit Card Interest</p>
                                <p className="text-[10px] text-slate-400">ดอกเบี้ยบัตรเครดิต</p>
                            </div>
                            <div className="text-right">
                                {bank.creditcard_min !== null && bank.creditcard_max !== null ? (
                                    bank.creditcard_min === bank.creditcard_max ? (
                                        <span className="text-lg font-bold text-purple-600">
                                            {bank.creditcard_max.toFixed(2)}%
                                        </span>
                                    ) : (
                                        <span className="text-lg font-bold text-purple-600">
                                            {bank.creditcard_min.toFixed(2)}% - {bank.creditcard_max.toFixed(2)}%
                                        </span>
                                    )
                                ) : (
                                    <span className="text-lg font-bold text-gray-400">-</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Note */}
            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                <p className="flex items-start gap-2">
                    <span>ℹ️</span>
                    <span>
                        ข้อมูลจากธนาคารแห่งประเทศไทย อัปเดตทุกวันทำการเวลา 14:00 น.
                    </span>
                </p>
            </div>
        </div>
    );
}

function RateBox({
    label,
    value,
    color
}: {
    label: string;
    value: number | null;
    color: 'slate' | 'blue' | 'indigo';
}) {
    const colorClasses = {
        slate: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
        blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
        indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400',
    };

    return (
        <div className={`rounded-lg p-2 text-center ${colorClasses[color]}`}>
            <p className="text-[10px] opacity-80">{label}</p>
            <p className="text-lg font-bold">
                {value ? `${value.toFixed(2)}%` : '-'}
            </p>
        </div>
    );
}

function RateCard({
    label,
    fullName,
    value,
    description,
    color
}: {
    label: string;
    fullName: string;
    value: number | null;
    description: string;
    color: 'slate' | 'blue' | 'indigo';
}) {
    const colorClasses = {
        slate: 'border-slate-200 bg-slate-50 text-slate-600',
        blue: 'border-blue-200 bg-blue-50 text-blue-600',
        indigo: 'border-indigo-200 bg-indigo-50 text-indigo-600',
    };

    const textColors = {
        slate: 'text-slate-600',
        blue: 'text-blue-600',
        indigo: 'text-indigo-600',
    };

    return (
        <div className={`rounded-lg p-3 border ${colorClasses[color]} transition-all hover:shadow-md`}>
            <div className="text-center">
                <span className={`text-xs font-semibold ${textColors[color]}`}>{label}</span>
                <p className="text-2xl font-bold text-gray-800 my-1">
                    {value ? `${value.toFixed(2)}%` : '-'}
                </p>
                <p className="text-[9px] text-gray-500 leading-tight">{fullName}</p>
                <p className="text-[9px] text-gray-400">{description}</p>
            </div>
        </div>
    );
}

function LoadingSkeleton({ mode, className }: { mode: 'compact' | 'full'; className: string }) {
    if (mode === 'compact') {
        return (
            <Card className={`${className} border-slate-200 shadow-sm`}>
                <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-2">
                        <Skeleton className="h-14 rounded-lg" />
                        <Skeleton className="h-14 rounded-lg" />
                        <Skeleton className="h-14 rounded-lg" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={`${className} border-slate-200 shadow-sm`}>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full mb-4" />
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <Skeleton className="h-24 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg" />
                    <Skeleton className="h-24 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                </div>
            </CardContent>
        </Card>
    );
}

export default LoanRateDisplay;
