"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  date: string;
  tag: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    actor: "Hans-Peter (Super Admin)",
    action: "Assigned Giulia Bianchi to",
    target: "Lausanne chapter",
    date: "2026-06-30 14:22",
    tag: "Lausanne Region",
  },
  {
    id: "2",
    actor: "Hans-Peter (Super Admin)",
    action: "Created membership plan",
    target: "T2B Executive VIP",
    date: "2026-06-29 09:11",
    tag: "Membership Plans",
  },
  {
    id: "3",
    actor: "Hans-Peter (Super Admin)",
    action: "Suspended Urs Giger",
    target: "(Roche Group AG)",
    date: "2026-06-28 11:45",
    tag: "Urs Giger (Member)",
  },
  {
    id: "4",
    actor: "Hans-Peter (Super Admin)",
    action: "Published Event:",
    target: "ZSC Lions VIP Suite Networking",
    date: "2026-06-27 16:30",
    tag: "ZSC Lions Event",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-[#111622] border border-[#1C2436] rounded-xl p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#F8FAFC]">
            Recent Activity
          </h2>
          <a
            href="#audit-log"
            className="text-xs font-semibold text-[#C6F135] hover:underline flex items-center gap-1"
          >
            Audit Log <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="space-y-4">
          {activities.map((item) => (
            <div key={item.id} className="flex gap-3 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6F135] mt-1.5 shrink-0 shadow-[0_0_6px_rgba(198,241,53,0.8)]"></span>
              <div>
                <p className="text-[#94A3B8] leading-relaxed">
                  <strong className="text-[#F8FAFC] font-semibold">
                    {item.actor}
                  </strong>{" "}
                  {item.action}{" "}
                  <span className="text-[#F8FAFC]">{item.target}</span>
                </p>
                <div className="flex items-center gap-2 text-[10px] text-[#64748B] mt-0.5">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="bg-[#1C2436] px-1.5 py-0.5 rounded text-[#94A3B8]">
                    {item.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
