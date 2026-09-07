"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface TierItem {
  name: string;
  count: number;
  share: string;
  color: string;
}

const tierData: TierItem[] = [
  { name: "VIP Level", count: 2, share: "(25%)", color: "#C6F135" },
  { name: "Premium Level", count: 2, share: "(25%)", color: "#38BDF8" },
  { name: "Gold Level", count: 2, share: "(25%)", color: "#F59E0B" },
  { name: "Partner Level", count: 2, share: "(25%)", color: "#10B981" },
];

const pieChartData = tierData.map((t) => ({
  name: t.name,
  value: t.count,
  color: t.color,
}));

const MembershipDistribution = () => {
  return (
    <div className="bg-[#111622] border border-[#1C2436] rounded-xl p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-[#F8FAFC]">
          Membership Distribution
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Subscriber counts segmented by Swiss membership levels
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-auto">
        {/* Donut Chart with Center Text */}
        <div className="relative w-full h-44 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
                stroke="#111622"
                strokeWidth={3}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-extrabold text-[#F8FAFC]">8</span>
            <span className="text-[9px] font-bold tracking-wider text-[#64748B] uppercase">
              MEMBERS
            </span>
          </div>
        </div>

        {/* Legend / Breakdown Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#64748B] pb-2 border-b border-[#1C2436]">
            <span>Tier</span>
            <span>Count & Share</span>
          </div>
          {tierData.map((tier) => (
            <div
              key={tier.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: tier.color }}
                ></span>
                <span className="text-[#94A3B8] font-medium">{tier.name}</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-[#F8FAFC]">
                <span>{tier.count}</span>
                <span className="text-[#64748B] text-[11px]">{tier.share}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipDistribution;