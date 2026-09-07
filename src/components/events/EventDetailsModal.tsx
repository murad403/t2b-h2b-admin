"use client";
import React from "react";
import { X, Clock, MapPin, Users } from "lucide-react";
import { AssemblyEvent } from "@/types/event";

interface EventDetailsModalProps {
    isOpen: boolean;
    event: AssemblyEvent | null;
    onClose: () => void;
    onEdit: (event: AssemblyEvent) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, event, onClose, onEdit }) => {
    if (!isOpen || !event) return null;

    const isT2B = event.clubHost === "T2B";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Cover Image Header */}
                <div className="relative h-56 w-full bg-sidebar overflow-hidden">
                    <img
                        src={event.coverImage}
                        alt={event.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 text-title/80 hover:text-title bg-black/50 hover:bg-black/80 p-2 rounded-full backdrop-blur-md transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content Body */}
                <div className="p-6 pt-2 space-y-6">
                    {/* Badge & Location */}
                    <div className="flex items-center justify-between gap-3">
                        {isT2B ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#152312] border border-primary/40 text-primary uppercase tracking-wider">
                                <span>🎾</span> TENNIS TO BUSINESS
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#0E1E32] border border-accent-h2b/40 text-accent-h2b uppercase tracking-wider">
                                <span>🏒</span> HOCKEY TO BUSINESS
                            </span>
                        )}
                        <span className="text-xs font-bold text-description/80 uppercase tracking-widest">
                            {event.region} REGION
                        </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                        <h2 className="text-xl font-extrabold text-title tracking-tight mb-2">
                            {event.name}
                        </h2>
                        <p className="text-xs text-description leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    {/* Logistics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-sidebar/50 border border-card-border/80">
                        {/* Schedule */}
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-description">
                                <Clock className="w-3.5 h-3.5 text-title/70" />
                                <span>Schedule Logistics</span>
                            </div>
                            <p className="text-xs font-medium text-title/90 pl-5">
                                {event.date}
                            </p>
                            <p className="text-xs font-medium text-description pl-5">
                                {event.timing}
                            </p>
                        </div>

                        {/* Location & Fee */}
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-description">
                                <MapPin className="w-3.5 h-3.5 text-title/70" />
                                <span>Canton Location</span>
                            </div>
                            <p className="text-xs font-medium text-title/90 pl-5">
                                {event.venue}
                            </p>
                            <p className="text-xs font-semibold text-primary/90 pl-5">
                                Guest Entry Fee: CHF {event.guestFee}
                            </p>
                        </div>
                    </div>

                    {/* Registered Delegates & Status */}
                    <div className="flex items-center justify-between border-t border-card-border/60 pt-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-description">
                            <Users className="w-4 h-4 text-primary" />
                            <span>
                                Registered delegates:{" "}
                                <strong className="text-title">{event.registeredCount}</strong> of{" "}
                                <strong className="text-title">{event.capacityLimit}</strong>
                            </span>
                        </div>

                        {event.status === "PUBLISHED" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-950/50 border border-emerald-500/40 text-emerald-400">
                                PUBLISHED
                            </span>
                        )}
                        {event.status === "DRAFT" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-950/50 border border-amber-500/40 text-amber-400">
                                DRAFT
                            </span>
                        )}
                        {event.status === "PAST" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-800/80 border border-slate-700 text-slate-400">
                                PAST
                            </span>
                        )}
                    </div>

                    {/* Actions Footer */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer"
                        >
                            Close Panel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                onEdit(event);
                            }}
                            className="px-5 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
                        >
                            Modify Event Setup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;