"use client";

import React from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-[#0B0E17] border-b border-[#1C2436] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile Menu Toggle + Search Container */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111622] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full max-w-xs sm:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#64748B]" />
          </div>
          <input
            type="text"
            placeholder="Search delegates, events..."
            className="w-full pl-9 pr-10 sm:pr-12 py-1.5 bg-[#111622] border border-[#1C2436] rounded-lg text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#C6F135]/50 transition-colors"
          />
          <div className="absolute inset-y-0 right-0 pr-2 hidden sm:flex items-center">
            <span className="bg-[#1C2436] text-[#64748B] text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border border-[#2D3952]/40">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 ml-2">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111622] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C6F135] rounded-full ring-2 ring-[#0B0E17]"></span>
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1C2436]">
          <div className="w-8 h-8 rounded-full bg-[#1C2436] border border-[#C6F135]/40 flex items-center justify-center text-[11px] font-bold text-[#C6F135] shadow-sm">
            HP
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#64748B] hover:text-[#F8FAFC] cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;