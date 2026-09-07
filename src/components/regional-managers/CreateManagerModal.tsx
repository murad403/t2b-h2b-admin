"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, UserPlus } from "lucide-react";
import { CreateManagerFormData } from "@/types/regional-manager";
import { createManagerSchema } from "@/validation/app.validation";

interface CreateManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: CreateManagerFormData) => void;
}

const CreateManagerModal: React.FC<CreateManagerModalProps> = ({ isOpen, onClose, onCreate }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateManagerFormData>({
        resolver: zodResolver(createManagerSchema),
        defaultValues: {
            name: "",
            email: "",
            clubBounds: "COMBINED",
            password: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                name: "",
                email: "",
                clubBounds: "COMBINED",
                password: "",
            });
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = (data: CreateManagerFormData) => {
        onCreate(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-card-border/60 pb-4">
                    <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-primary" />
                        <h2 className="text-base font-bold text-title">Create Manager Account</h2>
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
                    {/* Row 1: Full Name & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="e.g. Beat Hintermann"
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                            {errors.name && (
                                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="e.g. b.hintermann@tennis2business.ch"
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                            {errors.email && (
                                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Row 2: Canton Club Scope & Account Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Canton Club Scope
                            </label>
                            <select
                                {...register("clubBounds")}
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                            >
                                <option value="COMBINED">Both Clubs (T2B & H2B)</option>
                                <option value="T2B">Tennis to Business (T2B)</option>
                                <option value="H2B">Hockey to Business (H2B)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Account Password
                            </label>
                            <input
                                type="password"
                                {...register("password")}
                                placeholder="Enter security password"
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                            {errors.password && (
                                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-end gap-3 pt-5 border-t border-card-border/60">
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
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateManagerModal;