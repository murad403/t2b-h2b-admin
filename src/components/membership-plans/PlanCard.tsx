"use client";

import React from "react";
import { SlidersHorizontal, Users, Pencil, Check } from "lucide-react";
import { MembershipPlan } from "@/types/membership-plan";

interface PlanCardProps {
    plan: MembershipPlan;
    onConfigure: (plan: MembershipPlan) => void;
    onToggleArchive: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onConfigure, onToggleArchive }) => {
    const isT2B = plan.clubHost === "T2B";

    return (
        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between hover:border-card-border/90 transition-all">
            <div className="space-y-5">
                {/* Top Header Row: Name & Price */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="font-extrabold text-title text-base sm:text-lg">
                            {plan.name}
                        </h3>
                        {/* Club Scope Badge */}
                        <div className="mt-2">
                            {isT2B ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#152312] border border-primary/30 text-primary uppercase">
                                    <span>🎾</span> T2B CLUB
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0E1E32] border border-accent-h2b/30 text-accent-h2b uppercase">
                                    <span>🏒</span> H2B CLUB
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-lg sm:text-xl font-black text-title tracking-tight">
                            <span className="text-xs font-semibold text-description mr-1">
                                CHF
                            </span>
                            {plan.price}
                        </div>
                        <p className="text-[10px] font-extrabold text-description uppercase tracking-wider mt-0.5">
                            PER {plan.billingCycle.toUpperCase()}
                        </p>
                    </div>
                </div>

                {/* Allowance & Active Members Bar */}
                <div className="bg-sidebar/60 border border-card-border/80 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-primary font-medium">
                        <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-title/90 font-semibold">
                            {plan.eventsAllowance}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-description">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>
                            <strong className="text-title font-bold">
                                {plan.activeMembersCount}
                            </strong>{" "}
                            active
                        </span>
                    </div>
                </div>

                {/* Features Included List */}
                <div className="space-y-3 pt-1">
                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-description/80">
                        FEATURES INCLUDED:
                    </h4>
                    <ul className="space-y-2 text-xs">
                        {plan.features.map((feat, index) => (
                            <li key={index} className="flex items-start gap-2 text-title/90">
                                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                <span className="font-medium leading-tight">{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Action Footer Buttons */}
            <div className="flex items-center gap-2 pt-4 border-t border-card-border/60">
                <button
                    type="button"
                    onClick={() => onConfigure(plan)}
                    className="flex-1 bg-sidebar border border-card-border hover:bg-card-border text-title/90 hover:text-title text-xs font-semibold py-2.5 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                    <Pencil className="w-3.5 h-3.5 text-description" />
                    Configure Plan
                </button>

                {!plan.isArchived ? (
                    <button
                        type="button"
                        onClick={() => onToggleArchive(plan.id)}
                        className="px-4 py-2.5 rounded-xl bg-rose-950/20 border border-rose-900/50 text-rose-400 hover:bg-rose-900/40 text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Archive
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => onToggleArchive(plan.id)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/50 text-emerald-400 hover:bg-emerald-900/40 text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Restore
                    </button>
                )}
            </div>
        </div>
    );
};

export default PlanCard;