"use client";
import React from "react";
import { MapPin, Pencil, AlertTriangle } from "lucide-react";
import { Region } from "@/types/region";

interface RegionsTableProps {
    regions: Region[];
    onEdit: (region: Region) => void;
    onToggleStatus: (regionId: string) => void;
}

const RegionsTable: React.FC<RegionsTableProps> = ({ regions, onEdit, onToggleStatus }) => {
    return (
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-225">
                    <thead>
                        <tr className="border-b border-card-border/80 text-[11px] font-extrabold uppercase tracking-wider text-description/80 bg-sidebar/50">
                            <th className="py-4 px-6 whitespace-">REGION NAME</th>
                            <th className="py-4 px-4 whitespace-">CLUB SCOPE</th>
                            <th className="py-4 px-4 whitespace-nowrap">ASSIGNED CHAPTER MANAGER</th>
                            <th className="py-4 px-4 text-center">MEMBERS</th>
                            <th className="py-4 px-4 text-center whitespace-nowrap">ACTIVE EVENTS</th>
                            <th className="py-4 px-4 text-center">STATUS</th>
                            <th className="py-4 px-6 text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border/60 text-xs">
                        {regions.map((region) => {
                            const showT2B = region.clubScope === "both" || region.clubScope === "t2b";
                            const showH2B = region.clubScope === "both" || region.clubScope === "h2b";

                            return (
                                <tr
                                    key={region.id}
                                    className="hover:bg-sidebar/30 transition-colors group"
                                >
                                    {/* REGION NAME */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-sidebar border border-card-border flex items-center justify-center text-primary">
                                                <MapPin className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="font-bold text-title text-sm">
                                                {region.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* CLUB SCOPE */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1.5">
                                            {showT2B && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#152312] border border-primary/30 text-primary shadow-xs">
                                                    <span className="text-xs leading-none">🎾</span>
                                                    T2B
                                                </span>
                                            )}
                                            {showH2B && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#0E1E32] border border-accent-h2b/30 text-accent-h2b shadow-xs">
                                                    <span className="text-xs leading-none">🏒</span>
                                                    H2B
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* ASSIGNED CHAPTER MANAGER */}
                                    <td className="py-4 px-4">
                                        {region.managerName ? (
                                            <div className="flex items-center gap-2.5">
                                                {region.managerAvatar ? (
                                                    <img
                                                        src={region.managerAvatar}
                                                        alt={region.managerName}
                                                        className="w-7 h-7 rounded-full object-cover border border-card-border"
                                                    />
                                                ) : (
                                                    <div className="w-7 h-7 rounded-full bg-sidebar border border-card-border flex items-center justify-center font-bold text-[10px] text-title">
                                                        {region.managerName
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </div>
                                                )}
                                                <span className="font-semibold text-title">
                                                    {region.managerName}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-950/30 border border-amber-500/40 text-amber-400">
                                                <AlertTriangle className="w-3.5 h-3.5" />
                                                Unassigned chapter
                                            </span>
                                        )}
                                    </td>

                                    {/* MEMBERS */}
                                    <td className="py-4 px-4 text-center font-medium text-title/90">
                                        {region.membersCount}
                                    </td>

                                    {/* ACTIVE EVENTS */}
                                    <td className="py-4 px-4 text-center font-medium text-title/90">
                                        {region.activeEventsCount}
                                    </td>

                                    {/* STATUS */}
                                    <td className="py-4 px-4 text-center">
                                        {region.isActive ? (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-emerald-950/50 border border-emerald-500/40 text-emerald-400">
                                                ACTIVE
                                            </span>
                                        ) : (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-slate-800/80 border border-slate-700 text-slate-400">
                                                INACTIVE
                                            </span>
                                        )}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onEdit(region)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sidebar border border-card-border text-title/90 hover:text-title hover:bg-card-border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                                            >
                                                <Pencil className="w-3 h-3 text-description" />
                                                Edit / Assign Leads
                                            </button>

                                            {region.isActive ? (
                                                <button
                                                    type="button"
                                                    onClick={() => onToggleStatus(region.id)}
                                                    className="px-3.5 py-1.5 rounded-xl bg-rose-950/20 border border-rose-900/50 text-rose-400 hover:bg-rose-900/40 text-xs font-semibold transition-colors cursor-pointer"
                                                >
                                                    Deactivate
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => onToggleStatus(region.id)}
                                                    className="px-3.5 py-1.5 rounded-xl bg-emerald-950/20 border border-emerald-900/50 text-emerald-400 hover:bg-emerald-900/40 text-xs font-semibold transition-colors cursor-pointer"
                                                >
                                                    Activate
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegionsTable;