"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    AlertTriangle,
    Target,
    Gem,
    Database,
    Globe,
    DollarSign,
    Sun,
    Building2,
    FileText,
    RefreshCw,
    Landmark,
    Percent,
    Loader2,
    Clock,
} from "lucide-react";

// =============================================
// API Types
// =============================================
interface GoldPriceData {
    date: string;
    updateTime: string;
    data: {
        name: string;
        buy: string;
        sell: string;
    }[];
}

interface ExchangeRateData {
    source: string;
    period: string;
    lastUpdated: string;
    currencies: {
        currencyId: string;
        currencyNameTh: string;
        currencyNameEng: string;
        buyingSight: string;
        buyingTransfer: string;
        selling: string;
        midRate: string;
    }[];
}

interface LoanRateData {
    source: string;
    period: string;
    data: {
        name_th: string;
        name_eng: string;
        mor: string;
        mlr: string;
        mrr: string;
    }[];
}

interface WorldGoldPrice {
    price: number;
    change: number;
    changePercent: number;
    high24h: number;
    low24h: number;
    timestamp: string;
    currency: string;
}

interface LiveDataState {
    goldPrice: GoldPriceData | null;
    exchangeRate: ExchangeRateData | null;
    loanRate: LoanRateData | null;
    worldGold: WorldGoldPrice | null;
    loading: boolean;
    error: string | null;
    lastFetch: Date | null;
}

// =============================================
// SAMPLE DATA
// =============================================

// ข้อมูลเศรษฐกิจโลก (Global Economic Data)
const GLOBAL_ECONOMIC_DATA = [
    {
        name: 'US Dollar Index (DXY)',
        source: 'Federal Reserve',
        updateFrequency: 'Real-time',
        lastUpdate: '07 ธ.ค. 2567',
        status: 'active',
        description: 'ดัชนีค่าเงินดอลลาร์เทียบกับสกุลเงินหลัก',
        icon: DollarSign,
        color: 'green',
    },
    {
        name: 'US Interest Rate (Fed Funds)',
        source: 'Federal Reserve',
        updateFrequency: 'ตามประกาศ FOMC',
        lastUpdate: '07 พ.ย. 2567',
        status: 'active',
        description: 'อัตราดอกเบี้ยนโยบายสหรัฐฯ',
        icon: Landmark,
        color: 'blue',
    },
    {
        name: 'Geopolitical Risk Index',
        source: 'Various Sources',
        updateFrequency: 'รายเดือน',
        lastUpdate: 'พ.ย. 2567',
        status: 'active',
        description: 'ดัชนีความเสี่ยงด้านภูมิรัฐศาสตร์โลก',
        icon: AlertTriangle,
        color: 'red',
    },
    {
        name: 'Global Inflation Data',
        source: 'IMF / World Bank',
        updateFrequency: 'รายเดือน',
        lastUpdate: 'พ.ย. 2567',
        status: 'active',
        description: 'อัตราเงินเฟ้อของประเทศเศรษฐกิจหลัก',
        icon: TrendingUp,
        color: 'orange',
    },
];

// ข้อมูลฤดูกาลและพฤติกรรม (Seasonal & Behavioral Data)
const SEASONAL_DATA = [
    {
        name: 'เทศกาลสำคัญ',
        events: ['ตรุษจีน', 'วันวาเลนไทน์', 'สงกรานต์', 'วันแม่', 'ปีใหม่'],
        impact: 'สูง',
        description: 'ช่วงเทศกาลมักมีความต้องการทองคำสูงขึ้น',
        color: 'pink',
    },
    {
        name: 'ฤดูแต่งงาน',
        events: ['ต.ค. - ก.พ.'],
        impact: 'ปานกลาง',
        description: 'ช่วงฤดูแต่งงานมีความต้องการทองรูปพรรณเพิ่มขึ้น',
        color: 'rose',
    },
    {
        name: 'ช่วงจ่ายโบนัส',
        events: ['ธ.ค. - ม.ค.'],
        impact: 'สูง',
        description: 'พนักงานมักนำโบนัสมาซื้อทองเก็บออม',
        color: 'amber',
    },
    {
        name: 'ช่วงเปิดเทอม',
        events: ['พ.ค. - มิ.ย.'],
        impact: 'ต่ำ',
        description: 'ค่าใช้จ่ายการศึกษาทำให้การซื้อทองลดลง',
        color: 'blue',
    },
];

// =============================================
// MAIN COMPONENT
// =============================================
export default function DataAnalysisPage() {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">แหล่งข้อมูล (Data Sources)</h1>
                    <p className="text-sm text-slate-500 mt-0.5">รวบรวมข้อมูลและแหล่งข้อมูลสำหรับการคาดการณ์</p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <DataSourcesTab />
        </div>
    );
}

// =============================================
// Data Sources Component  
// =============================================
function DataSourcesTab() {
    const [liveData, setLiveData] = useState<LiveDataState>({
        goldPrice: null,
        exchangeRate: null,
        loanRate: null,
        worldGold: null,
        loading: true,
        error: null,
        lastFetch: null,
    });

    const fetchAllData = useCallback(async () => {
        setLiveData(prev => ({ ...prev, loading: true, error: null }));

        try {
            const [goldRes, exchangeRes, loanRes, worldGoldRes] = await Promise.allSettled([
                fetch('/api/gold-price'),
                fetch('/api/exchange-rate'),
                fetch('/api/loan-rate'),
                fetch('/api/gold-world'),
            ]);

            const goldPrice = goldRes.status === 'fulfilled' && goldRes.value.ok
                ? await goldRes.value.json()
                : null;
            const exchangeRate = exchangeRes.status === 'fulfilled' && exchangeRes.value.ok
                ? await exchangeRes.value.json()
                : null;
            const loanRate = loanRes.status === 'fulfilled' && loanRes.value.ok
                ? await loanRes.value.json()
                : null;
            const worldGold = worldGoldRes.status === 'fulfilled' && worldGoldRes.value.ok
                ? await worldGoldRes.value.json()
                : null;

            setLiveData({
                goldPrice,
                exchangeRate,
                loanRate,
                worldGold,
                loading: false,
                error: null,
                lastFetch: new Date(),
            });
        } catch (error) {
            setLiveData(prev => ({
                ...prev,
                loading: false,
                error: 'ไม่สามารถดึงข้อมูลได้',
            }));
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // Build dynamic data sources with live data
    const getDomesticDataSources = () => {
        const goldData = liveData.goldPrice;
        const exchangeData = liveData.exchangeRate;
        const loanData = liveData.loanRate;

        return [
            {
                name: 'ราคาทองคำจากสมาคมค้าทองคำแห่งประเทศไทย',
                source: 'goldtraders.or.th',
                updateFrequency: 'Real-time',
                lastUpdate: goldData ? `${goldData.date} ${goldData.updateTime}` : 'กำลังโหลด...',
                status: goldData ? 'active' : 'loading',
                description: goldData
                    ? `ทองแท่ง: ซื้อ ${goldData.data[0]?.buy || '-'} / ขาย ${goldData.data[0]?.sell || '-'} บาท`
                    : 'ราคาทองคำแท่งและทองรูปพรรณ 96.5% รายวัน',
                icon: Gem,
                color: 'amber',
                liveValue: goldData?.data[0]?.sell,
            },
            {
                name: 'อัตราแลกเปลี่ยน USD/THB',
                source: 'ธนาคารแห่งประเทศไทย (BOT)',
                updateFrequency: 'รายวัน',
                lastUpdate: exchangeData?.lastUpdated || 'กำลังโหลด...',
                status: exchangeData ? 'active' : 'loading',
                description: exchangeData?.currencies?.find(c => c.currencyId === 'USD')
                    ? `1 USD = ${exchangeData.currencies.find(c => c.currencyId === 'USD')?.midRate || '-'} THB`
                    : 'อัตราแลกเปลี่ยนเงินตราต่างประเทศ',
                icon: DollarSign,
                color: 'green',
                liveValue: exchangeData?.currencies?.find(c => c.currencyId === 'USD')?.midRate,
            },
            {
                name: 'อัตราดอกเบี้ยนโยบาย',
                source: 'ธนาคารแห่งประเทศไทย (BOT)',
                updateFrequency: 'ตามประกาศ MPC',
                lastUpdate: loanData?.period || 'กำลังโหลด...',
                status: loanData ? 'active' : 'loading',
                description: loanData?.data?.[0]
                    ? `MLR: ${loanData.data[0].mlr}% | MRR: ${loanData.data[0].mrr}%`
                    : 'อัตราดอกเบี้ยนโยบายและอัตราดอกเบี้ย MLR, MRR',
                icon: Percent,
                color: 'blue',
                liveValue: loanData?.data?.[0]?.mlr,
            },
            {
                name: 'อัตราเงินเฟ้อ (CPI)',
                source: 'กระทรวงพาณิชย์',
                updateFrequency: 'รายเดือน',
                lastUpdate: 'พ.ย. 2567',
                status: 'active',
                description: 'ดัชนีราคาผู้บริโภคและอัตราเงินเฟ้อทั่วไป',
                icon: TrendingUp,
                color: 'purple',
            },
        ];
    };

    const getGlobalMarketData = () => {
        const worldGoldData = liveData.worldGold;

        return [
            {
                name: 'ราคาทองคำโลก (XAU/USD)',
                source: 'COMEX / LBMA',
                updateFrequency: 'Real-time',
                lastUpdate: worldGoldData ? new Date(worldGoldData.timestamp).toLocaleString('th-TH') : 'กำลังโหลด...',
                status: worldGoldData ? 'active' : 'loading',
                description: worldGoldData
                    ? `$${worldGoldData.price.toLocaleString()} /oz (${worldGoldData.change >= 0 ? '+' : ''}${worldGoldData.change.toFixed(2)} | ${worldGoldData.changePercent.toFixed(2)}%)`
                    : 'ราคาทองคำตลาดโลก $/oz',
                icon: Globe,
                color: 'amber',
                liveValue: worldGoldData?.price?.toLocaleString(),
                change: worldGoldData?.change,
                changePercent: worldGoldData?.changePercent,
            },
            {
                name: 'Gold Futures',
                source: 'CME Group',
                updateFrequency: 'Real-time',
                lastUpdate: worldGoldData ? new Date(worldGoldData.timestamp).toLocaleString('th-TH') : 'กำลังโหลด...',
                status: worldGoldData ? 'active' : 'loading',
                description: worldGoldData
                    ? `High: $${worldGoldData.high24h.toLocaleString()} | Low: $${worldGoldData.low24h.toLocaleString()}`
                    : 'สัญญาซื้อขายทองคำล่วงหน้า',
                icon: TrendingUp,
                color: 'yellow',
            },
            {
                name: 'Gold Price Forecast',
                source: 'World Bank / IMF',
                updateFrequency: 'รายไตรมาส',
                lastUpdate: 'Q4/2567',
                status: 'active',
                description: 'การคาดการณ์ราคาทองคำจากสถาบันการเงินโลก',
                icon: Target,
                color: 'emerald',
            },
        ];
    };

    const domesticSources = getDomesticDataSources();
    const globalMarketSources = getGlobalMarketData();

    return (
        <div className="space-y-6">
            {/* Section Header with Refresh */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600">
                        <Database className="h-4 w-4" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-800">แหล่งข้อมูลสำหรับคาดการณ์ราคาทองคำ</h2>
                        <p className="text-xs text-slate-500">Data Sources for Gold Price Prediction</p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchAllData}
                    disabled={liveData.loading}
                    className="h-8"
                >
                    {liveData.loading ? (
                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                    ) : (
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    )}
                    {liveData.loading ? 'กำลังโหลด...' : 'รีเฟรช'}
                </Button>
            </div>

            {/* Last Update Info */}
            {liveData.lastFetch && (
                <div className="text-xs text-slate-500 -mt-4 mb-2">
                    อัพเดตล่าสุด: {liveData.lastFetch.toLocaleString('th-TH')}
                </div>
            )}

            {/* Section 1: ข้อมูลภายในประเทศ */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600">
                        <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">ข้อมูลภายในประเทศ (Domestic Data)</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {domesticSources.map((source, index) => (
                        <DataSourceCard key={index} source={source} isLoading={liveData.loading && !source.liveValue} />
                    ))}
                </div>
            </section>

            {/* Section 2: ข้อมูลตลาดโลก */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 text-amber-600">
                        <Globe className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">ข้อมูลตลาดโลก (Global Market Data)</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {globalMarketSources.map((source, index) => (
                        <DataSourceCard key={index} source={source} isLoading={liveData.loading && !source.liveValue} />
                    ))}
                </div>
            </section>

            {/* Section 3: ข้อมูลสถานการณ์และเศรษฐกิจโลก */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-100 text-purple-600">
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">ข้อมูลสถานการณ์และเศรษฐกิจโลก (Global Economic & Situational Data)</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GLOBAL_ECONOMIC_DATA.map((source, index) => (
                        <DataSourceCard key={index} source={source} />
                    ))}
                </div>
            </section>

            {/* Section 4: ข้อมูลฤดูกาลและพฤติกรรม */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-pink-100 text-pink-600">
                        <Sun className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">ข้อมูลฤดูกาลและพฤติกรรม (Seasonal & Behavioral Data)</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {SEASONAL_DATA.map((item, index) => (
                        <SeasonalCard key={index} data={item} />
                    ))}
                </div>
            </section>

            {/* Summary Card */}
            <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1">สรุปแหล่งข้อมูลสำหรับโมเดลคาดการณ์</h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                ข้อมูลทั้งหมดถูกนำมาประมวลผลร่วมกันเพื่อสร้างโมเดลคาดการณ์ราคาทองคำที่แม่นยำ
                                โดยพิจารณาทั้งปัจจัยภายในประเทศ ตลาดโลก สถานการณ์เศรษฐกิจ และพฤติกรรมตามฤดูกาล
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="text-center p-2 bg-white/60 rounded-lg">
                                    <p className="text-lg font-bold text-blue-700">4</p>
                                    <p className="text-xs text-slate-500">แหล่งข้อมูลในประเทศ</p>
                                </div>
                                <div className="text-center p-2 bg-white/60 rounded-lg">
                                    <p className="text-lg font-bold text-amber-700">3</p>
                                    <p className="text-xs text-slate-500">แหล่งข้อมูลตลาดโลก</p>
                                </div>
                                <div className="text-center p-2 bg-white/60 rounded-lg">
                                    <p className="text-lg font-bold text-purple-700">4</p>
                                    <p className="text-xs text-slate-500">ข้อมูลเศรษฐกิจ</p>
                                </div>
                                <div className="text-center p-2 bg-white/60 rounded-lg">
                                    <p className="text-lg font-bold text-pink-700">4</p>
                                    <p className="text-xs text-slate-500">ปัจจัยฤดูกาล</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// =============================================
// Helper Components
// =============================================

interface DataSource {
    name: string;
    source: string;
    updateFrequency: string;
    lastUpdate: string;
    status: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    liveValue?: string;
    change?: number;
    changePercent?: number;
}

function DataSourceCard({ source, isLoading }: { source: DataSource; isLoading?: boolean }) {
    const Icon = source.icon;
    const colorMap: Record<string, string> = {
        amber: 'bg-amber-50 text-amber-600 border-amber-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        red: 'bg-red-50 text-red-600 border-red-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-200',
    };

    const getStatusBadge = () => {
        if (isLoading || source.status === 'loading') {
            return (
                <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Loading
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className={`text-xs ${source.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600'}`}>
                {source.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
        );
    };

    return (
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colorMap[source.color]?.split(' ').slice(0, 2).join(' ') || 'bg-slate-50'}`}>
                        <Icon className={`h-4 w-4 ${colorMap[source.color]?.split(' ').slice(1, 2).join(' ') || 'text-slate-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-slate-800 truncate">{source.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{source.source}</p>
                    </div>
                    {getStatusBadge()}
                </div>

                {/* Live Value Display */}
                {source.liveValue && (
                    <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">ค่าปัจจุบัน</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-slate-800">{source.liveValue}</span>
                                {source.change !== undefined && (
                                    <span className={`text-xs ${source.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {source.change >= 0 ? '+' : ''}{source.change.toFixed(2)}
                                        {source.changePercent !== undefined && ` (${source.changePercent.toFixed(2)}%)`}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{source.description}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <RefreshCw className="h-3 w-3" />
                        <span>{source.updateFrequency}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{source.lastUpdate}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface SeasonalItem {
    name: string;
    events: string[];
    impact: string;
    description: string;
    color: string;
}

function SeasonalCard({ data }: { data: SeasonalItem }) {
    const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
        pink: { bg: 'bg-pink-50', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700 border-pink-200' },
        rose: { bg: 'bg-rose-50', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700 border-rose-200' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700 border-blue-200' },
    };
    const colors = colorMap[data.color] || colorMap.blue;

    return (
        <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-slate-800">{data.name}</h4>
                    <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                        ผลกระทบ: {data.impact}
                    </Badge>
                </div>
                <p className="text-xs text-slate-600 mb-3">{data.description}</p>
                <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <div className="flex flex-wrap gap-1.5">
                        {data.events.map((event, idx) => (
                            <span key={idx} className={`text-xs px-2 py-0.5 rounded-full bg-white/80 ${colors.text}`}>
                                {event}
                            </span>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
