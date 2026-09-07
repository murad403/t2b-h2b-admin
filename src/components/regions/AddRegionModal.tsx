"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { RegionFormData, ChapterManager } from "@/types/region";

const addRegionSchema = z.object({
    name: z.string().min(2, "Region/City Name is required"),
    clubScope: z.enum(["both", "t2b", "h2b"], {
        message: "Club Affiliation Scope is required",
    }),
    managerId: z.string(),
    isActive: z.boolean(),
});

interface AddRegionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: RegionFormData) => void;
    managersList: ChapterManager[];
}

const AddRegionModal: React.FC<AddRegionModalProps> = ({ isOpen, onClose, onAdd, managersList }) => {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<RegionFormData>({
        resolver: zodResolver(addRegionSchema),
        defaultValues: {
            name: "",
            clubScope: "both",
            managerId: "",
            isActive: true,
        },
    });

    const isActiveValue = watch("isActive");

    useEffect(() => {
        if (isOpen) {
            reset({
                name: "",
                clubScope: "both",
                managerId: "",
                isActive: true,
            });
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = (data: RegionFormData) => {
        onAdd(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-card-border/60 pb-4">
                    <h2 className="text-base font-bold text-title">Add Chapter</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-description hover:text-title p-1 rounded-lg hover:bg-sidebar transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Region/City Name */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1.5">
                            Region/City Name *
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder="e.g. Zurich"
                            className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                        {errors.name && (
                            <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    {/* Club Affiliation Scope */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1.5">
                            Club Affiliation Scope *
                        </label>
                        <div className="relative">
                            <select
                                {...register("clubScope")}
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors appearance-none cursor-pointer pr-10"
                            >
                                <option value="both">Both Clubs (Tennis & Hockey)</option>
                                <option value="t2b">Tennis to Business (T2B)</option>
                                <option value="h2b">Hockey to Business (H2B)</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-description">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {errors.clubScope && (
                            <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                {errors.clubScope.message}
                            </span>
                        )}
                    </div>

                    {/* Assign Chapter Lead (Chapter Manager) */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1.5">
                            Assign Chapter Lead (Chapter Manager)
                        </label>
                        <div className="relative">
                            <select
                                {...register("managerId")}
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors appearance-none cursor-pointer pr-10"
                            >
                                <option value="">-- Select Chapter Lead --</option>
                                {managersList.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.name} {m.clubAffiliation ? `(${m.clubAffiliation})` : ""}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-description">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[11px] text-description/80 mt-1.5 leading-relaxed">
                            Assigned managers receive full administrative authority to edit local member applications and schedule region events.
                        </p>
                    </div>

                    {/* Administrative Status Toggle */}
                    <div className="pt-2">
                        <label className="block text-xs font-semibold text-description mb-2">
                            Administrative Status
                        </label>
                        <div
                            className="flex items-center gap-3 cursor-pointer select-none"
                            onClick={() => setValue("isActive", !isActiveValue)}
                        >
                            <button
                                type="button"
                                role="switch"
                                aria-checked={isActiveValue}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActiveValue ? "bg-primary" : "bg-card-border"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-bg-dark transition-transform ${isActiveValue ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                            <span className="text-xs text-title font-medium">
                                Chapter is Active
                            </span>
                        </div>
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
                            Add Region
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRegionModal;