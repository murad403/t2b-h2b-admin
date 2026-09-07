"use client";
import React from "react";
import { CreditCard, Landmark, Smartphone, Wallet, FileText, RotateCcw } from "lucide-react";
import { PaymentTransaction } from "@/types/payment";

interface PaymentsTableProps {
    transactions: PaymentTransaction[];
    onViewReceipt: (transaction: PaymentTransaction) => void;
    onRefund: (transaction: PaymentTransaction) => void;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ transactions, onViewReceipt, onRefund }) => {
    const getMethodIcon = (method: string) => {
        switch (method) {
            case "Credit Card":
                return <CreditCard className="w-3.5 h-3.5 text-description shrink-0" />;
            case "Bank Transfer":
                return <Landmark className="w-3.5 h-3.5 text-description shrink-0" />;
            case "TWINT":
                return <Smartphone className="w-3.5 h-3.5 text-description shrink-0" />;
            default:
                return <Wallet className="w-3.5 h-3.5 text-description shrink-0" />;
        }
    };

    return (
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-250">
                    <thead>
                        <tr className="border-b border-card-border/80 text-[11px] font-extrabold uppercase tracking-wider text-description/80 bg-sidebar/50">
                            <th className="py-4 px-6 whitespace-nowrap">TRANSACTION ID</th>
                            <th className="py-4 px-6 whitespace-nowrap">SWISS PAYER</th>
                            <th className="py-4 px-4 whitespace-nowrap">CLUB SCOPE</th>
                            <th className="py-4 px-4 whitespace-nowrap">CATEGORY</th>
                            <th className="py-4 px-4 whitespace-nowrap">DUES (CHF)</th>
                            <th className="py-4 px-4 whitespace-nowrap">PAYMENT DATE</th>
                            <th className="py-4 px-4 text-center whitespace-nowrap">STATUS</th>
                            <th className="py-4 px-4 whitespace-nowrap">METHOD</th>
                            <th className="py-4 px-6 text-right whitespace-nowrap">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border/60 text-xs">
                        {transactions.map((tx) => {
                            const isT2B = tx.clubScope === "T2B";

                            return (
                                <tr
                                    key={tx.id}
                                    className="hover:bg-sidebar/30 transition-colors group"
                                >
                                    {/* TRANSACTION ID */}
                                    <td className="py-4 px-6 font-mono font-bold text-title">
                                        {tx.id}
                                    </td>

                                    {/* SWISS PAYER */}
                                    <td className="py-4 px-6">
                                        <div>
                                            <p className="font-bold text-title text-xs sm:text-sm">
                                                {tx.payerName}
                                            </p>
                                            <p className="text-[11px] font-mono text-description">
                                                {tx.payerEmail}
                                            </p>
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

                                    {/* CATEGORY */}
                                    <td className="py-4 px-4 font-medium text-title/90">
                                        {tx.category}
                                    </td>

                                    {/* DUES (CHF) */}
                                    <td className="py-4 px-4 font-extrabold text-title">
                                        CHF {tx.amount.toLocaleString()}
                                    </td>

                                    {/* PAYMENT DATE */}
                                    <td className="py-4 px-4 font-mono text-description text-[11px]">
                                        {tx.paymentDate}
                                    </td>

                                    {/* STATUS */}
                                    <td className="py-4 px-4 text-center">
                                        {tx.status === "PAID" && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-emerald-950/50 border border-emerald-500/40 text-emerald-400">
                                                PAID
                                            </span>
                                        )}
                                        {tx.status === "PENDING" && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-amber-950/50 border border-amber-500/40 text-amber-400">
                                                PENDING
                                            </span>
                                        )}
                                        {tx.status === "REFUNDED" && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-slate-800/80 border border-slate-700 text-slate-400">
                                                REFUNDED
                                            </span>
                                        )}
                                    </td>

                                    {/* METHOD */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2 text-title/90 font-medium text-[11px]">
                                            {getMethodIcon(tx.method)}
                                            <span>{tx.method}</span>
                                        </div>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onViewReceipt(tx)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sidebar border border-card-border text-title/90 hover:text-title hover:bg-card-border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                                            >
                                                <FileText className="w-3 h-3 text-description" />
                                                Receipt
                                            </button>

                                            {tx.status === "PAID" && (
                                                <button
                                                    type="button"
                                                    onClick={() => onRefund(tx)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-950/20 border border-rose-900/50 text-rose-400 hover:bg-rose-900/40 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                                                >
                                                    <RotateCcw className="w-3 h-3" />
                                                    Refund
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

export default PaymentsTable;