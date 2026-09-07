"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ShieldCheck, Search, ShieldAlert } from "lucide-react";
import { AssignManagerFormData } from "@/types/regional-manager";
import { assignManagerSchema } from "@/validation/app.validation";

interface CantonOption {
    name: string;
    members: number;
}

const availableCantons: CantonOption[] = [
    { name: "Zurich", members: 245 },
    { name: "Geneva", members: 180 },
    { name: "Basel", members: 95 },
    { name: "Bern", members: 110 },
    { name: "Lausanne", members: 88 },
    { name: "Lugano", members: 22 },
];

interface AssignManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAssign: (data: AssignManagerFormData) => void;
}

const AssignManagerModal: React.FC<AssignManagerModalProps> = ({ isOpen, onClose, onAssign }) => {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<AssignManagerFormData>({
        resolver: zodResolver(assignManagerSchema),
        defaultValues: {
            delegateSearch: "",
            clubBounds: "COMBINED",
            status: "ACTIVE",
            boundRegions: ["Zurich"],
        },
    });

    const selectedRegions = watch("boundRegions") || [];

    useEffect(() => {
        if (isOpen) {
            reset({
                delegateSearch: "",
                clubBounds: "COMBINED",
                status: "ACTIVE",
                boundRegions: ["Zurich"],
            });
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const toggleRegion = (regionName: string) => {
        if (selectedRegions.includes(regionName)) {
            setValue(
                "boundRegions",
                selectedRegions.filter((r) => r !== regionName)
            );
        } else {
            setValue("boundRegions", [...selectedRegions, regionName]);
        }
    };

    const onSubmit = (data: AssignManagerFormData) => {
        onAssign(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-card-border/60 pb-3">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <h2 className="text-base font-bold text-title">
                            Elevate Swiss Delegate to Manager
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

                {/* Form Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Section 1: Search Delegate */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-title/90">
                            1. Search & Select Existing Swiss Delegate
                        </h3>
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-description/70" />
                            <input
                                type="text"
                                {...register("delegateSearch")}
                                placeholder="Type delegate email or name..."
                                className="w-full pl-10 pr-4 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                        {errors.delegateSearch && (
                            <span className="text-[10px] text-red-400 font-medium block">
                                {errors.delegateSearch.message}
                            </span>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            <div>
                                <label className="block text-xs font-semibold text-description mb-1">
                                    Canton Club Scope
                                </label>
                                <select
                                    {...register("clubBounds")}
                                    className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                                >
                                    <option value="COMBINED">Both Clubs (T2B & H2B)</option>
                                    <option value="T2B">Tennis to Business (T2B)</option>
                                    <option value="H2B">Hockey to Business (H2B)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-description mb-1">
                                    Administrative Status
                                </label>
                                <select
                                    {...register("status")}
                                    className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                                >
                                    <option value="ACTIVE">Active Credentials</option>
                                    <option value="PENDING">Pending Clearance</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Bind Swiss Regional Cantons */}
                    <div className="space-y-3 pt-2">
                        <h3 className="text-xs font-bold text-title/90">
                            2. Bind Swiss Regional Cantons
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {availableCantons.map((canton) => {
                                const isSelected = selectedRegions.includes(canton.name);

                                return (
                                    <div
                                        key={canton.name}
                                        onClick={() => toggleRegion(canton.name)}
                                        className={`p-3 rounded-xl border text-center cursor-pointer select-none transition-all ${isSelected
                                                ? "bg-[#202D15] border-primary/60 text-primary font-bold shadow-xs"
                                                : "bg-sidebar/80 border-card-border/80 text-title/80 hover:border-card-border"
                                            }`}
                                    >
                                        <p className="text-xs font-bold">{canton.name}</p>
                                        <p className="text-[10px] text-description/70 font-mono mt-0.5">
                                            ({canton.members} members)
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        {errors.boundRegions && (
                            <span className="text-[10px] text-red-400 font-medium block">
                                {errors.boundRegions.message}
                            </span>
                        )}
                    </div>

                    {/* Privileges Info Box */}
                    <div className="p-4 rounded-xl bg-sidebar/70 border border-card-border/80 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-title">
                            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>Manager Privileges Grant</span>
                        </div>
                        <ul className="text-[11px] text-description space-y-1.5 list-disc list-inside pl-1 leading-relaxed">
                            <li>Edit local member notes and reassign bound canton structures</li>
                            <li>Schedule, draft, and publish events matching bound canton region</li>
                            <li>Draft regional announcements (restricted scope, no global push)</li>
                            <li>Strictly NO delete privileges for events, payments, or membership tiers</li>
                        </ul>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border/60">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
                        >
                            Confirm Assignment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignManagerModal;