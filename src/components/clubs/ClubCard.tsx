"use client";

import React from "react";
import { Mail, Phone, Settings, Activity } from "lucide-react";
import { Club } from "@/types/club";

interface ClubCardProps {
  club: Club;
  onToggleStatus: (clubId: string) => void;
  onConfigure: (club: Club) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({
  club,
  onToggleStatus,
  onConfigure,
}) => {
  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-card-border/80 transition-all shadow-sm">
      {/* Top Section: Icon, Title, Subtitle, Toggle */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            {/* Club Icon */}
            {club.code === "T2B" ? (
              <div className="w-11 h-11 rounded-xl bg-[#1C2814] border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(198,241,53,0.2)]">
                <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-bg-dark text-[10px] font-bold">
                  🎾
                </span>
              </div>
            ) : (
              <div className="w-11 h-11 rounded-xl bg-[#0F2238] border border-accent-h2b/40 flex items-center justify-center text-accent-h2b shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <Activity className="w-6 h-6 text-accent-h2b" />
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-title leading-snug">
                {club.name}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-description">
                {club.subtitle}
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-description">
              CLUB STATUS
            </span>
            <button
              type="button"
              onClick={() => onToggleStatus(club.id)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                club.isActive ? "bg-emerald-500 justify-end" : "bg-card-border justify-start"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-description leading-relaxed">
          {club.description}
        </p>
      </div>

      {/* Metrics Row (3 Columns) */}
      <div className="grid grid-cols-3 gap-3 bg-sidebar/60 border border-card-border/60 rounded-xl p-4 text-center">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-description block mb-1">
            DELEGATES
          </span>
          <span className="text-xl font-extrabold text-title">
            {club.delegatesCount}
          </span>
        </div>
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-description block mb-1">
            REGIONS
          </span>
          <span className="text-xl font-extrabold text-title">
            {club.regionsCount}
          </span>
        </div>
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-description block mb-1">
            REVENUE
          </span>
          <span
            className={`text-base font-extrabold ${
              club.accentColor === "primary" ? "text-primary" : "text-accent-h2b"
            }`}
          >
            {club.revenueFormatted}
          </span>
        </div>
      </div>

      {/* Contact Details & Configure Button */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1.5 text-xs text-description">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-description/80" />
            <span>
              Contact: <strong className="text-title font-semibold">{club.email}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-description/80" />
            <span>
              Hotline: <strong className="text-title font-semibold">{club.phone}</strong>
            </span>
          </div>
        </div>

        {/* Configure Button */}
        <button
          type="button"
          onClick={() => onConfigure(club)}
          className="w-full py-2.5 px-4 rounded-xl bg-sidebar border border-card-border hover:border-primary/40 text-title text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Settings className="w-4 h-4 text-description group-hover:text-primary transition-colors" />
          <span>Configure Brand & Communications</span>
        </button>
      </div>
    </div>
  );
};

export default ClubCard;