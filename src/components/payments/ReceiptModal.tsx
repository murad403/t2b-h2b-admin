"use client";
import React from "react";
import { X, Receipt } from "lucide-react";
import { PaymentTransaction } from "@/types/payment";

interface ReceiptModalProps {
    isOpen: boolean;
    transaction: PaymentTransaction | null;
    onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, transaction, onClose }) => {
    if (!isOpen || !transaction) return null;

    const clubAffiliationText =
        transaction.clubScope === "T2B"
            ? "Tennis to Business"
            : "Hockey to Business";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-card-border/60 pb-4">
                    <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-primary" />
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-title">
                            SWISS RECEIPT LEDGER
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-description hover:text-title p-1 rounded-lg hover:bg-sidebar transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Top Transaction Amount Card */}
                <div className="bg-sidebar/80 border border-card-border/90 rounded-2xl p-5 text-center space-y-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-description">
                        TRANSACTION AMOUNT
                    </p>
                    <p className="text-2xl font-black text-title tracking-tight font-mono">
                        CHF {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <div className="pt-1">
                        {transaction.status === "PAID" && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-emerald-950/50 border border-emerald-500/40 text-emerald-400">
                                PAID
                            </span>
                        )}
                        {transaction.status === "PENDING" && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-amber-950/50 border border-amber-500/40 text-amber-400">
                                PENDING
                            </span>
                        )}
                        {transaction.status === "REFUNDED" && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-slate-800/80 border border-slate-700 text-slate-400">
                                REFUNDED
                            </span>
                        )}
                    </div>
                </div>

                {/* Ledger Details List */}
                <div className="space-y-2.5 text-xs font-mono p-4 rounded-2xl bg-sidebar/40 border border-card-border/60">
                    <div className="flex items-center justify-between py-1 border-b border-card-border/40">
                        <span className="text-description">Receipt Reference:</span>
                        <span className="font-bold text-title">{transaction.id}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-card-border/40">
                        <span className="text-description">Payer Name:</span>
                        <span className="font-semibold text-title">{transaction.payerName}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-card-border/40">
                        <span className="text-description">Payer Email:</span>
                        <span className="text-title/90 font-mono text-[11px]">
                            {transaction.payerEmail}
                        </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-card-border/40">
                        <span className="text-description">Club Affiliation:</span>
                        <span className="font-semibold text-title">{clubAffiliationText}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-card-border/40">
                        <span className="text-description">Canton Origin:</span>
                        <span className="font-semibold text-title">{transaction.cantonRegion}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-card-border/40">
                        <span className="text-description">Cleared Method:</span>
                        <span className="font-semibold text-title">{transaction.method}</span>
                    </div>

                    <div className="flex items-center justify-between py-1">
                        <span className="text-description">Settlement Date:</span>
                        <span className="font-semibold text-title">{transaction.paymentDate}</span>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-5 py-2.5 rounded-xl bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer"
                    >
                        Print Receipt
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
                    >
                        Confirm Log
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;