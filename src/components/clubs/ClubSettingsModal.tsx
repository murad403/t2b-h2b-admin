"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Club } from "@/types/club";
import { clubSettingsSchema, ClubSettingsFormData } from "@/validation/app.validation";

interface ClubSettingsModalProps {
    isOpen: boolean;
    club: Club | null;
    onClose: () => void;
    onSave: (clubId: string, data: ClubSettingsFormData) => void;
}

const ClubSettingsModal: React.FC<ClubSettingsModalProps> = ({ isOpen, club, onClose, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ClubSettingsFormData>({
        resolver: zodResolver(clubSettingsSchema),
        defaultValues: {
            description: "",
            email: "",
            phone: "",
            announcementsScope: "National + Regional (Locked)",
        },
    });

    useEffect(() => {
        if (club) {
            reset({
                description: club.description,
                email: club.email,
                phone: club.phone,
                announcementsScope: club.announcementsScope || "National + Regional (Locked)",
            });
        }
    }, [club, reset, isOpen]);

    if (!isOpen || !club) return null;

    const onSubmit = (data: ClubSettingsFormData) => {
        onSave(club.id, data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-card-border/60 pb-4">
                    <h2 className="text-base font-bold text-title">
                        Branding & Assets: {club.name}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xs font-bold text-description hover:text-title tracking-wider uppercase transition-colors p-1"
                    >
                        CLOSE
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Corporate Mission & Description */}
                    <div>
                        <label className="block text-[11px] font-semibold text-description mb-1">
                            Corporate Mission & Club Description
                        </label>
                        <textarea
                            rows={4}
                            {...register("description")}
                            placeholder="Connecting top executives..."
                            className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors resize-none leading-relaxed"
                        />
                        {errors.description && (
                            <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    {/* Administrative Email & Hotline Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-semibold text-description mb-1">
                                Administrative Email
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="hq@tennis2business.ch"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                            {errors.email && (
                                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold text-description mb-1">
                                Swiss Support Hotline
                            </label>
                            <input
                                type="text"
                                {...register("phone")}
                                placeholder="+41 44 210 11 22"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                            {errors.phone && (
                                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Announcements Scope */}
                    <div>
                        <label className="block text-[11px] font-semibold text-description mb-1">
                            Announcements Scope
                        </label>
                        <input
                            type="text"
                            {...register("announcementsScope")}
                            placeholder="National + Regional (Locked)"
                            className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
                        />
                        {errors.announcementsScope && (
                            <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                {errors.announcementsScope.message}
                            </span>
                        )}
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-end gap-3 pt-5 border-t border-card-border/60">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2 rounded-lg bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
                        >
                            Save Brand Setup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClubSettingsModal;