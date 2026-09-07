"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity } from "lucide-react";

const chartData = [
  { month: "Jan 26", t2b: 14200, h2b: 8500 },
  { month: "Feb 26", t2b: 18500, h2b: 12800 },
  { month: "Mar 26", t2b: 16800, h2b: 11900 },
  { month: "Apr 26", t2b: 22400, h2b: 16100 },
  { month: "May 26", t2b: 39500, h2b: 29800 },
  { month: "Jun 26", t2b: 31200, h2b: 27500 },
];

const timeFrames = ["7D", "30D", "90D", "1Y"];

const RevenueTrend = () => {
  const [activeFrame, setActiveFrame] = useState("30D");

  return (
    <div className="bg-card border border-card-border rounded-xl p-6 flex flex-col justify-between h-full">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-title">
            Revenue Trend (CHF)
          </h2>
          <p className="text-xs text-description mt-0.5">
            Monthly platform-wide earnings categorized by Swiss club
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#0B0E17] p-1 rounded-lg border border-card-border">
          {timeFrames.map((frame) => (
            <button
              key={frame}
              onClick={() => setActiveFrame(frame)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                activeFrame === frame
                  ? "bg-card-border text-title shadow-sm"
                  : "text-description hover:text-title"
              }`}
            >
              {frame}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-64 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradientT2B" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C6F135" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#C6F135" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradientH2B" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1C2436" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `CHF ${value === 0 ? "0" : (value / 1000).toFixed(1) + "k"}`}
              domain={[0, 50000]}
              ticks={[0, 12500, 25000, 37500, 50000]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0B0E17",
                borderColor: "#1C2436",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#F8FAFC",
              }}
              formatter={(value) => [
                `CHF ${Number(value ?? 0).toLocaleString()}`,
                "",
              ]}
            />
            <Area
              type="monotone"
              dataKey="t2b"
              name="Tennis to Business (T2B)"
              stroke="#C6F135"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#gradientT2B)"
              dot={{ r: 4, fill: "#C6F135", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#C6F135" }}
            />
            <Area
              type="monotone"
              dataKey="h2b"
              name="Hockey to Business (H2B)"
              stroke="#38BDF8"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#gradientH2B)"
              dot={{ r: 4, fill: "#38BDF8", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#38BDF8" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Legend & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-card-border/60 text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6F135]"></span>
            <span className="text-[#94A3B8] font-medium">
              Tennis to Business (T2B) - <strong className="text-title">57% share</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-h2b"></span>
            <span className="text-[#94A3B8] font-medium">
              Hockey to Business (H2B) - <strong className="text-title">43% share</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-description font-medium text-[11px]">
          <Activity className="w-3.5 h-3.5 text-[#C6F135]" />
          <span>Live Swiss banking Sync</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrend;