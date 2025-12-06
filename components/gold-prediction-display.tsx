"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus, RefreshCw, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Prediction {
    date: string;
    predicted: number;
    lower: number;
    upper: number;
}

interface PredictionData {
    predictions: Prediction[];
    trend: "up" | "down" | "stable";
    confidence: number;
    analysis: string;
}

export function GoldPredictionDisplay() {
    const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [days, setDays] = useState("7");

    const fetchPrediction = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/gold-prediction?days=${days}`);
            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }
            const data = await response.json();
            setPredictionData(data);
        } catch (err) {
            setError("ไม่สามารถดึงข้อมูลการคาดการณ์ได้");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrediction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    if (loading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-32 w-full" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="pt-6 text-center">
                    <p className="text-destructive">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={fetchPrediction}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        ลองอีกครั้ง
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!predictionData) return null;

    const TrendIcon = predictionData.trend === "up" ? TrendingUp :
        predictionData.trend === "down" ? TrendingDown : Minus;

    const trendColor = predictionData.trend === "up" ? "text-green-600" :
        predictionData.trend === "down" ? "text-red-500" : "text-yellow-500";

    const trendBg = predictionData.trend === "up" ? "bg-green-500/10 border-green-500/30" :
        predictionData.trend === "down" ? "bg-red-500/10 border-red-500/30" :
            "bg-yellow-500/10 border-yellow-500/30";

    const trendText = predictionData.trend === "up" ? "ขาขึ้น" :
        predictionData.trend === "down" ? "ขาลง" : "ทรงตัว";

    return (
        <Card className={`w-full ${trendBg}`}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Brain className="h-5 w-5 text-purple-500" />
                        คาดการณ์ราคาทอง (AI)
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Select value={days} onValueChange={setDays}>
                            <SelectTrigger className="w-24 h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">7 วัน</SelectItem>
                                <SelectItem value="14">14 วัน</SelectItem>
                                <SelectItem value="30">30 วัน</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={fetchPrediction}
                            className="h-8 w-8"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Trend Summary */}
                <div className="flex items-center justify-between rounded-lg border bg-background/50 p-3">
                    <div className="flex items-center gap-3">
                        <div className={`rounded-full p-2 ${trendBg}`}>
                            <TrendIcon className={`h-5 w-5 ${trendColor}`} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">แนวโน้ม</p>
                            <p className={`font-semibold ${trendColor}`}>{trendText}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">ความเชื่อมั่น</p>
                        <Badge variant="outline" className="text-sm">
                            {predictionData.confidence}%
                        </Badge>
                    </div>
                </div>

                {/* Predictions Table */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">คาดการณ์รายวัน (USD/oz)</p>
                    <div className="max-h-48 overflow-auto rounded-lg border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="p-2 text-left">วันที่</th>
                                    <th className="p-2 text-right">คาดการณ์</th>
                                    <th className="p-2 text-right">ช่วง</th>
                                </tr>
                            </thead>
                            <tbody>
                                {predictionData.predictions.map((pred, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="p-2">
                                            {new Date(pred.date).toLocaleDateString("th-TH", {
                                                day: "numeric",
                                                month: "short"
                                            })}
                                        </td>
                                        <td className="p-2 text-right font-medium">
                                            ${pred.predicted.toFixed(2)}
                                        </td>
                                        <td className="p-2 text-right text-xs text-muted-foreground">
                                            ${pred.lower.toFixed(0)} - ${pred.upper.toFixed(0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
