"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { EventFormData } from "@/types/event";
import { addEventSchema } from "@/validation/app.validation";

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: EventFormData) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAdd }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EventFormData>({
        resolver: zodResolver(addEventSchema),
        defaultValues: {
            name: "",
            category: "Tennis Tournament",
            clubHost: "T2B",
            region: "Zurich",
            regionalManager: "Bashar",
            guestFee: 250,
            date: "2026-08-15",
            timing: "14:00 - 20:00",
            venue: "",
            capacityLimit: 60,
            coverImage:
                "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800",
            description: "",
            status: "DRAFT",
        },
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                name: "",
                category: "Tennis Tournament",
                clubHost: "T2B",
                region: "Zurich",
                regionalManager: "Bashar",
                guestFee: 250,
                date: "2026-08-15",
                timing: "14:00 - 20:00",
                venue: "",
                capacityLimit: 60,
                coverImage:
                    "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800",
                description: "",
                status: "DRAFT",
            });
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = (data: EventFormData) => {
        onAdd(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-card-border/60 pb-3">
                    <h2 className="text-base font-bold text-title">
                        Schedule New Executive Assembly
                    </h2>
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
                    {/* Row 1: Event Name & Swiss Club Host */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Event Name *
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Zurich Executive Cup & Clay Match"
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

                    {/* Row 2: Canton/Region, Manager & Fee */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Canton/Region Location *
                            </label>
                            <select
                                {...register("region")}
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                            >
                                <option value="Zurich">Zurich</option>
                                <option value="Geneva">Geneva</option>
                                <option value="Lausanne">Lausanne</option>
                                <option value="Bern">Bern</option>
                                <option value="Lugano">Lugano</option>
                                <option value="Basel">Basel</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Regional manager
                            </label>
                            <select
                                {...register("regionalManager")}
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                            >
                                <option value="Bashar">Bashar</option>
                                <option value="Beat Hintermann">Beat Hintermann</option>
                                <option value="Chantal Dubois">Chantal Dubois</option>
                                <option value="Christian Widmer">Christian Widmer</option>
                                <option value="Reto Müller">Reto Müller</option>
                                <option value="Giulia Bianchi">Giulia Bianchi</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Guest Entry Fee (CHF) *
                            </label>
                            <input
                                type="number"
                                {...register("guestFee", { valueAsNumber: true })}
                                placeholder="250"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Row 3: Calendar Date & Daily Timing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Calendar Date *
                            </label>
                            <input
                                type="date"
                                {...register("date")}
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Daily Timing Span *
                            </label>
                            <input
                                type="text"
                                {...register("timing")}
                                placeholder="14:00 - 20:00"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Row 4: Arena/Venue & Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-description mb-1">
                                Specific Arena / Venue *
                            </label>
                            <input
                                type="text"
                                {...register("venue")}
                                placeholder="Grasshopper Club Zürich, Tennis Arena"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Capacity Limit (Pax) *
                            </label>
                            <input
                                type="number"
                                {...register("capacityLimit", { valueAsNumber: true })}
                                placeholder="60"
                                className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Banner Stock Image URL */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1">
                            Banner Stock Image URL
                        </label>
                        <input
                            type="text"
                            {...register("coverImage")}
                            placeholder="upload your image"
                            className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                    </div>

                    {/* Descriptive Summary */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1">
                            Brief Descriptive Summary *
                        </label>
                        <textarea
                            rows={3}
                            {...register("description")}
                            placeholder="Provide registration details, agenda summary, and dress codes..."
                            className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                        />
                    </div>

                    {/* Publication State */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1">
                            Publication State
                        </label>
                        <select
                            {...register("status")}
                            className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                        >
                            <option value="DRAFT">Draft (Internal Board Only)</option>
                            <option value="PUBLISHED">Published (Live to Delegates)</option>
                            <option value="PAST">Past (Archived)</option>
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
                            Commit Logistics
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;