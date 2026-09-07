"use client";
import React from "react";
import { TrendingUp, LucideIcon } from "lucide-react";

export interface StatsCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendType?: "positive" | "negative" | "neutral" | "warning";
    subtitle: string;
    icon: LucideIcon;
    valueColor?: "primary" | "warning" | "title";
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendType = "positive", subtitle, icon: Icon, valueColor = "title" }) => {
    const getTrendBadge = () => {
        if (!trend) return null;
        if (trendType === "warning") {
            return (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#2C181B] text-[#F87171] border border-[#F87171]/20">
                    {trend}
                </span>
            );
        }
        if (trendType === "neutral") {
            return (
                <span className="text-[11px] font-medium text-description">
                    {trend}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C6F135]">
                <TrendingUp className="w-3 h-3" />
                {trend}
            </span>
        );
    };

    const getValueColorClass = () => {
        if (valueColor === "primary") return "text-primary";
        if (valueColor === "warning") return "text-amber-400";
        return "text-title";
    };

    return (
        <div className="bg-card border border-card-border rounded-xl p-5 flex flex-col justify-between hover:border-card-border/80 transition-all duration-200 shadow-sm">
            {/* Top Row: Title & Icon */}
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-description">
                    {title}
                </span>
                <div className="w-7 h-7 rounded-lg bg-card-border/60 flex items-center justify-center text-[#C6F135]">
                    <Icon className="w-3.5 h-3.5" />
                </div>
            </div>

            {/* Middle Row: Value & Trend */}
            <div className="my-3 flex items-baseline justify-between">
                <h3 className={`text-2xl font-extrabold tracking-tight ${getValueColorClass()}`}>
                    {value}
                </h3>
                {getTrendBadge()}
            </div>

            {/* Bottom Row: Subtitle */}
            <p className="text-[11px] font-medium text-description truncate">
                {subtitle}
            </p>
        </div>
    );
};

export default StatsCard;