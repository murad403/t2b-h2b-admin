"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { AssemblyEvent } from "@/types/event";

interface DeleteEventModalProps {
    isOpen: boolean;
    event: AssemblyEvent | null;
    onClose: () => void;
    onConfirmDelete: (eventId: string) => void;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({ isOpen, event, onClose, onConfirmDelete }) => {
    const [confirmName, setConfirmName] = useState("");

    useEffect(() => {
        if (isOpen && event) {
            setConfirmName(event.name);
        }
    }, [isOpen, event]);

    if (!isOpen || !event) return null;

    const isConfirmed = confirmName.trim() === event.name.trim();

    const handleStrike = () => {
        if (isConfirmed) {
            onConfirmDelete(event.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header with Alert Icon */}
                <div className="flex items-center gap-3 border-b border-card-border/60 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-title">Cancel & Strike Event</h2>
                </div>

                {/* Notice text */}
                <p className="text-xs text-description leading-relaxed">
                    You are executing a full platform-wide cancellation for{" "}
                    <strong className="text-title font-bold">{event.name}</strong>. This
                    will immediately send push notifications and cancellation emails to all{" "}
                    <strong className="text-title font-bold">{event.registeredCount}</strong>{" "}
                    registered executives, invalidate ticket tokens, and initiate
                    automatic refund transactions for guest entries. This is irreversible.
                </p>

                {/* Confirmation Input */}
                <div className="space-y-2 p-4 rounded-xl bg-sidebar/60 border border-card-border/80">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-description/90">
                        TYPE EVENT NAME TO AUTHORIZE STRIKE ACTION:
                    </label>
                    <p className="text-[11px] text-description/70 font-mono">
                        Spelling key: "{event.name}"
                    </p>
                    <input
                        type="text"
                        value={confirmName}
                        onChange={(e) => setConfirmName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-medium focus:outline-none focus:border-rose-500/60 transition-colors"
                    />
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer"
                    >
                        Retain Event
                    </button>
                    <button
                        type="button"
                        onClick={handleStrike}
                        disabled={!isConfirmed}
                        className={`px-5 py-2.5 rounded-xl text-white text-xs font-extrabold transition-all cursor-pointer ${isConfirmed
                                ? "bg-rose-600 hover:bg-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.4)]"
                                : "bg-rose-950/40 text-rose-300/40 border border-rose-900/30 cursor-not-allowed"
                            }`}
                    >
                        Cancel and Strike Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEventModal;