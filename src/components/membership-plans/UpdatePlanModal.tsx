"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Check } from "lucide-react";
import { MembershipPlan, PlanFormData } from "@/types/membership-plan";
import { updatePlanSchema } from "@/validation/app.validation";

const availablePerksList = [
    "Directory access",
    "Standard event tickets",
    "Local chapter forums",
    "T2B Member Pin",
    "Priority RSVP for matches",
    "CEO Circle eligibility",
    "Private luxury suites",
    "Personal Chapter concierge",
    "Logo on court backdrops",
    "Corporate Team (5 Pax)",
];

interface UpdatePlanModalProps {
    isOpen: boolean;
    plan: MembershipPlan | null;
    onClose: () => void;
    onUpdate: (planId: string, data: PlanFormData) => void;
}

const UpdatePlanModal: React.FC<UpdatePlanModalProps> = ({ isOpen, plan, onClose, onUpdate }) => {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<PlanFormData>({
        resolver: zodResolver(updatePlanSchema),
        defaultValues: {
            name: "",
            clubHost: "T2B",
            price: 3500,
            billingCycle: "Yearly",
            eventsAllowance: "Unlimited Access",
            features: [],
            isArchived: false,
        },
    });

    const selectedFeatures = watch("features") || [];

    useEffect(() => {
        if (plan && isOpen) {
            reset({
                name: plan.name,
                clubHost: plan.clubHost,
                price: plan.price,
                billingCycle: plan.billingCycle,
                eventsAllowance: plan.eventsAllowance,
                features: plan.features || [],
                isArchived: plan.isArchived,
            });
        }
    }, [plan, isOpen, reset]);

    if (!isOpen || !plan) return null;

    const toggleFeature = (feature: string) => {
        if (selectedFeatures.includes(feature)) {
            setValue(
                "features",
                selectedFeatures.filter((f) => f !== feature)
            );
        } else {
            setValue("features", [...selectedFeatures, feature]);
        }
    };

    const onSubmit = (data: PlanFormData) => {
        onUpdate(plan.id, data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-card-border/60 pb-3">
                    <h2 className="text-base font-bold text-title">Edit Plan Details</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-description hover:text-title p-1 rounded-lg hover:bg-sidebar transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Row 1: Plan Display Name & Swiss Club Host */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Plan Display Name *
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="T2B Executive VIP"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                            {errors.name && (
                                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Swiss Club Host *
                            </label>
                            <select
                                {...register("clubHost")}
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                            >
                                <option value="T2B">Tennis To Business (T2B)</option>
                                <option value="H2B">Hockey To Business (H2B)</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Plan Cost, Billing Cycle & Events Allowance */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Plan Cost (CHF) *
                            </label>
                            <input
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                                placeholder="3500"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                            {errors.price && (
                                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                    {errors.price.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Billing Cycle *
                            </label>
                            <select
                                {...register("billingCycle")}
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                            >
                                <option value="Yearly">Yearly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Lifetime">Lifetime</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Events Allowance *
                            </label>
                            <input
                                type="text"
                                {...register("eventsAllowance")}
                                placeholder="Unlimited Access"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Section: Select Included Features & Perks */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-2">
                            Select Included Features & Perks *
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1 pr-2">
                            {availablePerksList.map((perk) => {
                                const isChecked = selectedFeatures.includes(perk);

                                return (
                                    <div
                                        key={perk}
                                        onClick={() => toggleFeature(perk)}
                                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${isChecked
                                            ? "bg-[#293B14] border-primary/50 text-primary font-bold shadow-xs"
                                            : "bg-sidebar/80 border-card-border/80 text-title/80 font-medium hover:border-card-border"
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked
                                                ? "bg-primary border-primary text-bg-dark"
                                                : "border-card-border bg-sidebar"
                                                }`}
                                        >
                                            {isChecked && <Check className="w-3 h-3 stroke-3" />}
                                        </div>
                                        <span className="truncate">{perk}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Row 3: Plan Status */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1">
                            Plan Status
                        </label>
                        <select
                            value={watch("isArchived") ? "archived" : "active"}
                            onChange={(e) =>
                                setValue("isArchived", e.target.value === "archived")
                            }
                            className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                        >
                            <option value="active">Active (Publish Live To Application)</option>
                            <option value="archived">Archived / Inactive</option>
                        </select>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border/60">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
                        >
                            Save Plan Metrics
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePlanModal;