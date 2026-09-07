"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, Smartphone } from "lucide-react";
import { NotificationFormData, GeographicScope } from "@/types/notification";
import { notificationSchema } from "@/validation/app.validation";

interface BroadcastCommandCenterProps {
    onDispatch: (data: NotificationFormData) => void;
}

const scopeOptions: { value: GeographicScope; label: string }[] = [
    { value: "ONE_REGION", label: "One Region" },
    { value: "ALL_REGIONS", label: "All Regions in Club" },
    { value: "ALL_SWITZERLAND", label: "All Switzerland" },
    { value: "INTERNATIONAL", label: "International" },
];

const BroadcastCommandCenter: React.FC<BroadcastCommandCenterProps> = ({ onDispatch }) => {
    const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<NotificationFormData>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            subjectTitle: "",
            scope: "ONE_REGION",
            targetClub: "COMBINED",
            emailCampaign: true,
            mobilePush: true,
            body: "",
        },
    });

    const selectedScope = watch("scope");
    const emailCampaign = watch("emailCampaign");
    const mobilePush = watch("mobilePush");

    const onSubmit = (data: NotificationFormData) => {
        onDispatch(data);
        reset({
            subjectTitle: "",
            scope: "ONE_REGION",
            targetClub: "COMBINED",
            emailCampaign: true,
            mobilePush: true,
            body: "",
        });
    };

    return (
        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-card-border/60 pb-4">
                <Send className="w-4 h-4 text-primary shrink-0" />
                <h2 className="text-base font-bold text-title">Broadcast Command Center</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Subject Title / Alert Line */}
                <div>
                    <label className="block text-xs font-semibold text-description mb-1.5">
                        Subject Title / Alert Line <span className="text-primary">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("subjectTitle")}
                        placeholder="e.g. Autumn Clay Cup Registration Schedule"
                        className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/40 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                    {errors.subjectTitle && (
                        <span className="text-[10px] text-red-400 font-medium mt-1 block">
                            {errors.subjectTitle.message}
                        </span>
                    )}
                </div>

                {/* Scope and Target Club Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-sidebar/50 border border-card-border/60">
                    {/* Canton / Geographic Scope */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-2.5">
                            Canton/Geographic Scope
                        </label>
                        <div className="space-y-2">
                            {scopeOptions.map((opt) => (
                                <label
                                    key={opt.value}
                                    className="flex items-center gap-2.5 text-xs text-title/90 cursor-pointer select-none group"
                                >
                                    <input
                                        type="radio"
                                        value={opt.value}
                                        checked={selectedScope === opt.value}
                                        onChange={() => setValue("scope", opt.value)}
                                        className="hidden"
                                    />
                                    <div
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedScope === opt.value
                                                ? "border-primary bg-primary/20"
                                                : "border-card-border bg-sidebar group-hover:border-description/60"
                                            }`}
                                    >
                                        {selectedScope === opt.value && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        )}
                                    </div>
                                    <span className={selectedScope === opt.value ? "text-title font-semibold" : "text-description"}>
                                        {opt.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Target Club */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-2">
                            Target Club
                        </label>
                        <select
                            {...register("targetClub")}
                            className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                        >
                            <option value="COMBINED">Both Clubs (T2B + H2B)</option>
                            <option value="T2B">Tennis to Business (T2B)</option>
                            <option value="H2B">Hockey to Business (H2B)</option>
                        </select>
                    </div>
                </div>

                {/* Delivery Channels */}
                <div>
                    <label className="block text-xs font-semibold text-description mb-2.5">
                        Delivery Channels
                    </label>
                    <div className="flex flex-wrap items-center gap-6">
                        {/* Email Campaign Toggle */}
                        <button
                            type="button"
                            onClick={() => setValue("emailCampaign", !emailCampaign)}
                            className="flex items-center gap-2.5 cursor-pointer select-none group"
                        >
                            <div
                                className={`w-9 h-5 rounded-full p-0.5 transition-colors relative ${emailCampaign ? "bg-primary" : "bg-sidebar border border-card-border"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-bg-dark transition-transform ${emailCampaign ? "translate-x-4" : "translate-x-0"
                                        }`}
                                />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-title">
                                <Mail className="w-3.5 h-3.5 text-description" />
                                <span>Email Campaign</span>
                            </div>
                        </button>

                        {/* Mobile Push Toggle */}
                        <button
                            type="button"
                            onClick={() => setValue("mobilePush", !mobilePush)}
                            className="flex items-center gap-2.5 cursor-pointer select-none group"
                        >
                            <div
                                className={`w-9 h-5 rounded-full p-0.5 transition-colors relative ${mobilePush ? "bg-primary" : "bg-sidebar border border-card-border"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-bg-dark transition-transform ${mobilePush ? "translate-x-4" : "translate-x-0"
                                        }`}
                                />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-title">
                                <Smartphone className="w-3.5 h-3.5 text-description" />
                                <span>Mobile Push</span>
                            </div>
                        </button>
                    </div>
                    {errors.emailCampaign && (
                        <span className="text-[10px] text-red-400 font-medium mt-1 block">
                            {errors.emailCampaign.message}
                        </span>
                    )}
                </div>

                {/* Notification Body */}
                <div>
                    <label className="block text-xs font-semibold text-description mb-1.5">
                        Notification Body (Formatted Circular)
                    </label>
                    <textarea
                        {...register("body")}
                        placeholder="Type structural notification body or campaign circular text here..."
                        className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/40 focus:outline-none focus:border-primary/60 transition-colors h-32 resize-none"
                    />
                    {errors.body && (
                        <span className="text-[10px] text-red-400 font-medium mt-1 block">
                            {errors.body.message}
                        </span>
                    )}
                </div>

                {/* Action Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-sidebar/80 hover:bg-card-border border border-card-border/80 text-description/90 hover:text-title font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                    <Send className="w-3.5 h-3.5 text-primary" />
                    <span>Execute Dispatch Sequence</span>
                </button>
            </form>
        </div>
    );
};

export default BroadcastCommandCenter;
