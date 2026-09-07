"use client";
import React from "react";
import Image from "next/image";
import { Shield, UserX, Mail } from "lucide-react";
import { RegionalManager } from "@/types/regional-manager";
import { getClubBoundsBadge } from "@/utils/formatter";

interface RegionalManagersTableProps {
    managers: RegionalManager[];
    onModify: (manager: RegionalManager) => void;
    onRevoke: (manager: RegionalManager) => void;
}

const RegionalManagersTable: React.FC<RegionalManagersTableProps> = ({ managers, onModify, onRevoke }) => {
    
    return (
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-225">
                    <thead>
                        <tr className="border-b border-card-border/80 text-[10px] uppercase font-bold tracking-wider text-description/80 bg-sidebar/50">
                            <th className="py-4 px-5">REGIONAL MANAGER</th>
                            <th className="py-4 px-5">CLUB BOUNDS</th>
                            <th className="py-4 px-5">BOUND REGION(S)</th>
                            <th className="py-4 px-5">DATE BOUND</th>
                            <th className="py-4 px-5">AUTHORITY STATE</th>
                            <th className="py-4 px-5 text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border/60 text-xs">
                        {managers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-description">
                                    No regional managers found.
                                </td>
                            </tr>
                        ) : (
                            managers.map((manager) => (
                                <tr
                                    key={manager.id}
                                    className="hover:bg-sidebar/40 transition-colors group"
                                >
                                    {/* Regional Manager */}
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-sidebar border border-card-border shrink-0">
                                                {manager.avatarUrl ? (
                                                    <Image
                                                        src={manager.avatarUrl}
                                                        alt={manager.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xs">
                                                        {manager.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-title text-xs group-hover:text-primary transition-colors">
                                                    {manager.name}
                                                </p>
                                                <div className="flex items-center gap-1 text-[11px] text-description/70 font-mono mt-0.5">
                                                    <Mail className="w-3 h-3 text-description/50" />
                                                    <span>{manager.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Club Bounds */}
                                    <td className="py-4 px-5">
                                        {getClubBoundsBadge(manager.clubBounds)}
                                    </td>

                                    {/* Bound Region(s) */}
                                    <td className="py-4 px-5">
                                        <div className="flex flex-wrap gap-1.5">
                                            {manager.boundRegions.map((region) => (
                                                <span
                                                    key={region}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sidebar/90 border border-card-border/80 text-title/90"
                                                >
                                                    <Shield className="w-3 h-3 text-primary/80" />
                                                    {region}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Date Bound */}
                                    <td className="py-4 px-5 font-mono text-description/90 text-xs">
                                        {manager.dateBound}
                                    </td>

                                    {/* Authority State */}
                                    <td className="py-4 px-5">
                                        {manager.authorityState === "ACTIVE" ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                ACTIVE
                                            </span>
                                        ) : manager.authorityState === "PENDING" ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                                PENDING
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-red-500/10 border border-red-500/20 text-red-400">
                                                REVOKED
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onModify(manager)}
                                                className="px-3 py-1.5 rounded-xl bg-sidebar hover:bg-card-border border border-card-border/80 text-title text-xs font-medium transition-colors cursor-pointer"
                                            >
                                                Modify Assignment
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onRevoke(manager)}
                                                className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                                            >
                                                <UserX className="w-3.5 h-3.5" />
                                                Revoke
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegionalManagersTable;
