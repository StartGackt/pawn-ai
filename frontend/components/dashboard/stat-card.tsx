"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon?: React.ReactNode;
    description?: string;
}

export function StatCard({
    title,
    value,
    change,
    changeLabel,
    icon,
    description,
}: StatCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon && <div className="text-muted-foreground">{icon}</div>}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change !== undefined && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {isPositive && <TrendingUp className="h-3 w-3 text-green-500" />}
                        {isNegative && <TrendingDown className="h-3 w-3 text-red-500" />}
                        <span
                            className={cn(
                                "font-medium",
                                isPositive && "text-green-500",
                                isNegative && "text-red-500"
                            )}
                        >
                            {change > 0 ? "+" : ""}
                            {change}%
                        </span>
                        {changeLabel && <span>{changeLabel}</span>}
                    </div>
                )}
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
            </CardContent>
        </Card>
    );
}
