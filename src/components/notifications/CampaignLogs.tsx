"use client";
import React from "react";
import { Clock, Mail, Smartphone } from "lucide-react";
import { CampaignLog } from "@/types/notification";

interface CampaignLogsProps {
  logs: CampaignLog[];
}

const CampaignLogs: React.FC<CampaignLogsProps> = ({ logs }) => {
  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-card-border/60 pb-4">
        <Clock className="w-4 h-4 text-primary shrink-0" />
        <h2 className="text-base font-bold text-title">Campaign Logs</h2>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="py-12 text-center text-xs text-description">
            No campaign logs recorded yet.
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="bg-sidebar/60 border border-card-border/80 rounded-xl p-4 space-y-3 hover:border-card-border transition-colors"
            >
              {/* Title & Status */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xs font-bold text-title leading-snug">
                  {log.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  {log.status}
                </span>
              </div>

              {/* Body */}
              <p className="text-xs text-description/80 leading-relaxed">
                {log.body}
              </p>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-card-border/40 text-[11px]">
                <div className="flex items-center gap-4 text-description/70">
                  <span>
                    Scope: <strong className="text-title/90 font-medium">{log.scope}</strong>
                  </span>
                  <span>
                    Sent: <span className="font-mono text-description">{log.sentDate}</span>
                  </span>
                </div>

                <div className="text-primary font-bold font-mono text-xs">
                  {log.recipientsCount} Recip.
                </div>
              </div>

              {/* Delivery Channels */}
              <div className="flex items-center gap-3 pt-0.5">
                {log.deliveryChannels.includes("email") && (
                  <div className="inline-flex items-center gap-1 text-[10px] text-description/70 font-medium">
                    <Mail className="w-3 h-3 text-description/60" />
                    <span>Email Campaign</span>
                  </div>
                )}
                {log.deliveryChannels.includes("push") && (
                  <div className="inline-flex items-center gap-1 text-[10px] text-description/70 font-medium">
                    <Smartphone className="w-3 h-3 text-description/60" />
                    <span>Mobile Push</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignLogs;
