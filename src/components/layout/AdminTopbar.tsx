"use client";
import React from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-sidebar border-b border-card-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile Menu Toggle + Search Container */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-title hover:bg-card transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full max-w-xs sm:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-description" />
          </div>
          <input
            type="text"
            placeholder="Search delegates, events..."
            className="w-full pl-9 pr-10 sm:pr-12 py-1.5 bg-card border border-card-border rounded-lg text-xs text-title placeholder-description focus:outline-none focus:border-primary/50 transition-colors"
          />
          <div className="absolute inset-y-0 right-0 pr-2 hidden sm:flex items-center">
            <span className="bg-card-border text-description text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border border-[#2D3952]/40">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 ml-2">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-[#94A3B8] hover:text-title hover:bg-card transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-bg-dark"></span>
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-card-border">
          <div className="w-8 h-8 rounded-full bg-card-border border border-primary/40 flex items-center justify-center text-[11px] font-bold text-primary shadow-sm">
            HP
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-description hover:text-title cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;