"use client";

import React from "react";
import { Activity } from "lucide-react";

const ClubLevelComparison = () => {
  return (
    <div className="bg-[#111622] border border-[#1C2436] rounded-xl p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-[#F8FAFC]">
          Club-Level Comparison
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5 mb-5">
          Side-by-side performance comparison between Tennis and Hockey clubs
        </p>

        {/* Top 3 Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {/* Members Metric */}
          <div className="bg-[#0B0E17] border border-[#1C2436] rounded-lg p-3 text-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              MEMBERS
            </span>
            <div className="text-base font-bold text-[#F8FAFC]">
              4 <span className="text-[#64748B] font-normal">/</span> 4
            </div>
            <span className="text-[9px] text-[#64748B] mt-0.5 block">
              T2B vs H2B
            </span>
          </div>

          {/* Events Metric */}
          <div className="bg-[#0B0E17] border border-[#1C2436] rounded-lg p-3 text-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              EVENTS (TOTAL)
            </span>
            <div className="text-base font-bold text-[#F8FAFC]">
              3 <span className="text-[#64748B] font-normal">/</span> 2
            </div>
            <span className="text-[9px] text-[#64748B] mt-0.5 block">
              T2B vs H2B
            </span>
          </div>

          {/* Revenue Metric */}
          <div className="bg-[#0B0E17] border border-[#1C2436] rounded-lg p-3 text-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              TOTAL REV
            </span>
            <div className="text-sm font-bold truncate">
              <span className="text-[#C6F135]">CHF 17k</span>
              <span className="text-[#64748B] font-normal"> / </span>
              <span className="text-[#38BDF8]">CHF 5k</span>
            </div>
            <span className="text-[9px] text-[#64748B] mt-0.5 block">
              T2B vs H2B
            </span>
          </div>
        </div>

        {/* Side-by-side Progress Bars */}
        <div className="space-y-4">
          {/* T2B Tennis Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#C6F135]">
                <span className="w-2 h-2 rounded-full bg-[#C6F135]"></span>
                <span className="uppercase text-[11px] tracking-wider">
                  TENNIS TO BUSINESS (T2B)
                </span>
              </div>
              <span className="font-extrabold text-[#F8FAFC]">
                CHF 17,800
              </span>
            </div>
            <div className="w-full bg-[#1C2436] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C6F135] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(198,241,53,0.4)]"
                style={{ width: "78.8%" }}
              ></div>
            </div>
          </div>

          {/* H2B Hockey Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#38BDF8]">
                <Activity className="w-3 h-3 text-[#38BDF8]" />
                <span className="uppercase text-[11px] tracking-wider">
                  HOCKEY TO BUSINESS (H2B)
                </span>
              </div>
              <span className="font-extrabold text-[#F8FAFC]">
                CHF 4,800
              </span>
            </div>
            <div className="w-full bg-[#1C2436] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#38BDF8] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                style={{ width: "21.2%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubLevelComparison;