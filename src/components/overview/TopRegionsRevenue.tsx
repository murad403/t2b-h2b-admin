"use client";

import React from "react";

interface RegionItem {
  rank: number;
  name: string;
  badge: string;
  revenue: string;
  members: number;
  performance: number;
}

const regionsData: RegionItem[] = [
  {
    rank: 1,
    name: "Basel",
    badge: "T2B",
    revenue: "CHF 25,000",
    members: 1,
    performance: 100,
  },
  {
    rank: 2,
    name: "Lugano",
    badge: "T2B",
    revenue: "CHF 25,000",
    members: 1,
    performance: 100,
  },
  {
    rank: 3,
    name: "Geneva",
    badge: "T2B & H2B",
    revenue: "CHF 10,000",
    members: 2,
    performance: 40,
  },
  {
    rank: 4,
    name: "Zurich",
    badge: "T2B & H2B",
    revenue: "CHF 5,900",
    members: 2,
    performance: 24,
  },
];

const TopRegionsRevenue = () => {
  return (
    <div className="bg-card border border-card-border rounded-xl p-6 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-base font-bold text-title mb-4">
          Top Regions by Revenue
        </h2>

        <div className="space-y-4">
          {regionsData.map((item) => (
            <div key={item.rank} className="space-y-1.5">
              {/* Item Header */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold">
                  <span className="text-description">#{item.rank}</span>
                  <span className="text-title font-bold">{item.name}</span>
                  <span className="bg-card-border text-[#94A3B8] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#2D3952]/40">
                    {item.badge}
                  </span>
                </div>
                <span className="font-extrabold text-title">
                  {item.revenue}
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-card-border h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C6F135] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(198,241,53,0.4)]"
                  style={{ width: `${item.performance}%` }}
                ></div>
              </div>

              {/* Item Subtitle Footers */}
              <div className="flex items-center justify-between text-[11px] text-description">
                <span>{item.members} active members</span>
                <span>{item.performance}% performance</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRegionsRevenue;