"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { RegionalManager } from "@/types/regional-manager";

interface RevokeManagerModalProps {
    isOpen: boolean;
    manager: RegionalManager | null;
    onClose: () => void;
    onConfirmRevoke: (managerId: string) => void;
}

const RevokeManagerModal: React.FC<RevokeManagerModalProps> = ({ isOpen, manager, onClose, onConfirmRevoke }) => {
    const [confirmationName, setConfirmationName] = useState("");

    useEffect(() => {
        if (isOpen && manager) {
            setConfirmationName(manager.name);
        } else {
            setConfirmationName("");
        }
    }, [isOpen, manager]);

    if (!isOpen || !manager) return null;

    const handleRevoke = (e: React.FormEvent) => {
        e.preventDefault();
        if (confirmationName.trim().toLowerCase() === manager.name.trim().toLowerCase()) {
            onConfirmRevoke(manager.id);
            onClose();
        }
    };

    const isMatch = confirmationName.trim().toLowerCase() === manager.name.trim().toLowerCase();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header Icon + Title */}
                <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-title">
                            Revoke Administrative Access
                        </h2>
                        <p className="text-xs text-description mt-1.5 leading-relaxed">
                            You are about to completely strip the administrative credentials for{" "}
                            <strong className="text-title font-semibold">{manager.name}</strong>.
                            This will immediately lock them out of any local canton management
                            panels, cancel their chapter email redirection, and restore their standard
                            delegate profile status. This action is irreversible.
                        </p>
                    </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleRevoke} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold tracking-wider text-description uppercase mb-1">
                            TYPE MANAGER NAME TO AUTHORIZE REVOCATION:
                        </label>
                        <p className="text-[11px] text-description/70 mb-1.5">
                            Verify spelling: &quot;<span className="text-title font-medium">{manager.name}</span>&quot;
                        </p>
                        <input
                            type="text"
                            value={confirmationName}
                            onChange={(e) => setConfirmationName(e.target.value)}
                            placeholder={`Type "${manager.name}"`}
                            className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-red-500/60 transition-colors font-mono"
                        />
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border/60">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer"
                        >
                            Cancel Revoke
                        </button>
                        <button
                            type="submit"
                            disabled={!isMatch}
                            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${isMatch
                                    ? "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                                    : "bg-red-500/30 text-white/50 cursor-not-allowed"
                                }`}
                        >
                            Revoke Credentials
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RevokeManagerModal;
