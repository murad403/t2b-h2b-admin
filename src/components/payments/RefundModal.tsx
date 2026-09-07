"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { PaymentTransaction } from "@/types/payment";

interface RefundModalProps {
    isOpen: boolean;
    transaction: PaymentTransaction | null;
    onClose: () => void;
    onConfirmRefund: (transactionId: string) => void;
}

const RefundModal: React.FC<RefundModalProps> = ({ isOpen, transaction, onClose, onConfirmRefund }) => {
    const [confirmId, setConfirmId] = useState("");

    useEffect(() => {
        if (isOpen && transaction) {
            setConfirmId(transaction.id);
        }
    }, [isOpen, transaction]);

    if (!isOpen || !transaction) return null;

    const isConfirmed = confirmId.trim() === transaction.id.trim();

    const handleExecuteRefund = () => {
        if (isConfirmed) {
            onConfirmRefund(transaction.id);
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
                    <h2 className="text-base font-bold text-title">
                        Authorize Refund Execution
                    </h2>
                </div>

                {/* Notice description text */}
                <p className="text-xs text-description leading-relaxed">
                    You are about to execute a corporate refund of{" "}
                    <strong className="text-title font-bold">
                        CHF {transaction.amount.toLocaleString()}
                    </strong>{" "}
                    for{" "}
                    <strong className="text-title font-bold">
                        {transaction.payerName}
                    </strong>
                    . This will automatically initiate a reversing wire/card transfer via the
                    synchronized SIX gateway, void their matching active receipt token, and
                    adjust region revenue statements. This is irreversible.
                </p>

                {/* Confirmation Input Box */}
                <div className="space-y-2 p-4 rounded-xl bg-sidebar/60 border border-card-border/80">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-description/90">
                        TYPE RECEIPT ID TO AUTHORIZE REVERSAL:
                    </label>
                    <p className="text-[11px] text-description/70 font-mono">
                        Verify Transaction ID: "{transaction.id}"
                    </p>
                    <input
                        type="text"
                        value={confirmId}
                        onChange={(e) => setConfirmId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono focus:outline-none focus:border-rose-500/60 transition-colors"
                    />
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer"
                    >
                        Cancel Reversal
                    </button>
                    <button
                        type="button"
                        onClick={handleExecuteRefund}
                        disabled={!isConfirmed}
                        className={`px-5 py-2.5 rounded-xl text-white text-xs font-extrabold transition-all cursor-pointer ${isConfirmed
                                ? "bg-rose-600 hover:bg-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.4)]"
                                : "bg-rose-950/40 text-rose-300/40 border border-rose-900/30 cursor-not-allowed"
                            }`}
                    >
                        Execute SIX Wire Reversal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RefundModal;