"use client";

import React from "react";
import { Eye, Pencil, Trash2, Calendar, MapPin } from "lucide-react";
import { AssemblyEvent } from "@/types/event";

interface EventsTableProps {
    events: AssemblyEvent[];
    onView: (event: AssemblyEvent) => void;
    onEdit: (event: AssemblyEvent) => void;
    onDelete: (event: AssemblyEvent) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ events, onView, onEdit, onDelete }) => {
    return (
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-225">
                    <thead>
                        <tr className="border-b border-card-border/80 text-[11px] font-extrabold uppercase tracking-wider text-description/80 bg-sidebar/50">
                            <th className="py-4 px-6 whitespace-nowrap">EVENT DETAILS</th>
                            <th className="py-4 px-4 whitespace-nowrap">CLUB SCOPE</th>
                            <th className="py-4 px-4 whitespace-nowrap">SWISS REGION</th>
                            <th className="py-4 px-4 whitespace-nowrap">LOGISTICS & VENUE</th>
                            <th className="py-4 px-4 text-center whitespace-nowrap">
                                RESERVATIONS
                            </th>
                            <th className="py-4 px-4 text-center whitespace-nowrap">
                                STATUS
                            </th>
                            <th className="py-4 px-6 text-right whitespace-nowrap">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border/60 text-xs">
                        {events.map((event) => {
                            const isT2B = event.clubHost === "T2B";

                            return (
                                <tr
                                    key={event.id}
                                    className="hover:bg-sidebar/30 transition-colors group"
                                >
                                    {/* EVENT DETAILS */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={event.coverImage}
                                                alt={event.name}
                                                className="w-12 h-10 rounded-xl object-cover border border-card-border shrink-0"
                                            />
                                            <div>
                                                <p className="font-bold text-title text-xs sm:text-sm group-hover:text-primary transition-colors whitespace-nowrap">
                                                    {event.name}
                                                </p>
                                                <p className="text-[11px] whitespace-nowrap font-semibold text-primary mt-0.5">
                                                    {event.category}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* CLUB SCOPE */}
                                    <td className="py-4 px-4">
                                        {isT2B ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#152312] border border-primary/30 text-primary">
                                                <span>🎾</span> T2B
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0E1E32] border border-accent-h2b/30 text-accent-h2b">
                                                <span>🏒</span> H2B
                                            </span>
                                        )}
                                    </td>

                                    {/* SWISS REGION */}
                                    <td className="py-4 px-4 font-semibold text-title/90">
                                        {event.region}
                                    </td>

                                    {/* LOGISTICS & VENUE */}
                                    <td className="py-4 px-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-title/90 font-medium text-[11px]">
                                                <Calendar className="w-3 h-3 text-description shrink-0" />
                                                <span>
                                                    {event.date} • {event.timing}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-description text-[11px]">
                                                <MapPin className="w-3 h-3 text-description shrink-0" />
                                                <span className="truncate max-w-50">
                                                    {event.venue}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* RESERVATIONS */}
                                    <td className="py-4 px-4 text-center">
                                        <p className="font-bold text-title text-sm">
                                            {event.registeredCount}{" "}
                                            <span className="text-description text-xs font-normal">
                                                / {event.capacityLimit}
                                            </span>
                                        </p>
                                        <p className="text-[10px] text-description font-medium">
                                            Guest fee: CHF {event.guestFee}
                                        </p>
                                    </td>

                                    {/* STATUS */}
                                    <td className="py-4 px-4 text-center">
                                        {event.status === "PUBLISHED" && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-emerald-950/50 border border-emerald-500/40 text-emerald-400">
                                                PUBLISHED
                                            </span>
                                        )}
                                        {event.status === "DRAFT" && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-amber-950/50 border border-amber-500/40 text-amber-400">
                                                DRAFT
                                            </span>
                                        )}
                                        {event.status === "PAST" && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-slate-800/80 border border-slate-700 text-slate-400">
                                                PAST
                                            </span>
                                        )}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => onView(event)}
                                                title="View Details"
                                                className="p-2 rounded-xl text-description hover:text-title hover:bg-sidebar transition-colors cursor-pointer"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onEdit(event)}
                                                title="Edit Assembly"
                                                className="p-2 rounded-xl text-description hover:text-title hover:bg-sidebar transition-colors cursor-pointer"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(event)}
                                                title="Strike Event"
                                                className="p-2 rounded-xl text-description hover:text-rose-400 hover:bg-rose-950/20 transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
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

export default EventsTable;