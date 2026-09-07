"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { NewsFormData } from "@/types/news";
import { newsSchema } from "@/validation/app.validation";

interface AddNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: NewsFormData) => void;
}

const cantons = ["Basel", "Zurich", "Geneva", "Bern", "Lausanne", "Lugano"];

const AddNewsModal: React.FC<AddNewsModalProps> = ({ isOpen, onClose, onAdd }) => {
    const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<NewsFormData>({
        resolver: zodResolver(newsSchema),
        defaultValues: {
            title: "",
            clubScope: "T2B",
            status: "PUBLISHED",
            geoScope: "NATIONAL",
            canton: "Zurich",
            isFeatured: false,
            coverImage: "",
            body: "",
        },
    });

    const geoScope = watch("geoScope");
    const isFeatured = watch("isFeatured");

    useEffect(() => {
        if (isOpen) {
            reset({
                title: "",
                clubScope: "T2B",
                status: "PUBLISHED",
                geoScope: "NATIONAL",
                canton: "Zurich",
                isFeatured: false,
                coverImage: "",
                body: "",
            });
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = (data: NewsFormData) => {
        onAdd(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-card-border/60 pb-3">
                    <h2 className="text-base font-bold text-title">
                        Draft New Swiss Media Release
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
                    {/* Article Headline / Title */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1">
                            Article Headline / Title <span className="text-primary">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("title")}
                            placeholder="e.g. Basel Tennis Circle Announces Autumn Tournament Expansion"
                            className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                        {errors.title && (
                            <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                {errors.title.message}
                            </span>
                        )}
                    </div>

                    {/* Row 2: Club Affiliation & Editorial Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Club Affiliation Scope <span className="text-primary">*</span>
                            </label>
                            <select
                                {...register("clubScope")}
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                            >
                                <option value="T2B">Tennis To Business (T2B)</option>
                                <option value="H2B">Hockey To Business (H2B)</option>
                                <option value="COMBINED">Both Clubs (T2B & H2B)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-description mb-1">
                                Editorial Status <span className="text-primary">*</span>
                            </label>
                            <select
                                {...register("status")}
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                            >
                                <option value="PUBLISHED">Published (Live On Portal)</option>
                                <option value="DRAFT">Draft (Internal Review)</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3: Geographic Scope, Specific Canton, and Hero Pin Toggle */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                        <div className="sm:col-span-4">
                            <label className="block text-xs font-semibold text-description mb-1">
                                Geographic Scope <span className="text-primary">*</span>
                            </label>
                            <select
                                {...register("geoScope")}
                                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
                            >
                                <option value="NATIONAL">National (All Switzerland)</option>
                                <option value="REGIONAL">Regional (Specific Canton)</option>
                            </select>
                        </div>

                        <div className="sm:col-span-4">
                            <label className="block text-xs font-semibold text-description mb-1">
                                Specific Canton Scope
                            </label>
                            <select
                                {...register("canton")}
                                disabled={geoScope !== "REGIONAL"}
                                className={`w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer ${geoScope !== "REGIONAL" ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {cantons.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Pin to Hero Feed Toggle */}
                        <div className="sm:col-span-4 flex items-center gap-2.5 h-10 pb-0.5 pl-1">
                            <button
                                type="button"
                                onClick={() => setValue("isFeatured", !isFeatured)}
                                className="flex items-center gap-2.5 cursor-pointer select-none"
                            >
                                <div
                                    className={`w-11 h-6 rounded-full p-1 transition-colors relative shrink-0 ${isFeatured
                                            ? "bg-primary"
                                            : "bg-[#334155]"
                                        }`}
                                >
                                    <div
                                        className={`w-4 h-4 rounded-full transition-transform ${isFeatured
                                                ? "translate-x-5 bg-bg-dark"
                                                : "translate-x-0 bg-[#94A3B8]"
                                            }`}
                                    />
                                </div>
                                <span className="text-xs font-semibold text-title/90 whitespace-nowrap">
                                    Pin to Hero Feed
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Banner Media / Thumbnail URL */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1">
                            Banner Media / Thumbnail URL
                        </label>
                        <textarea
                            {...register("coverImage")}
                            rows={2}
                            placeholder="https://images.unsplash.com/photo-1542144512-9b509b5785c6?auto=format&fit=crop&w=400&q=80"
                            className="w-full px-3.5 py-2 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors resize-none leading-relaxed"
                        />
                    </div>

                    {/* Article Body */}
                    <div>
                        <label className="block text-xs font-semibold text-description mb-1">
                            Article Body (Plaintext or HTML formatting) <span className="text-primary">*</span>
                        </label>
                        <textarea
                            {...register("body")}
                            placeholder="Write deep business summaries, regional news reports, match logs, or sponsors reviews..."
                            className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors h-28 resize-none"
                        />
                        {errors.body && (
                            <span className="text-[10px] text-red-400 font-medium mt-1 block">
                                {errors.body.message}
                            </span>
                        )}
                    </div>

                    {/* Action Footer */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-card-border/60">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-3 rounded-xl bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors cursor-pointer text-center"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer text-center"
                        >
                            Commit Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewsModal;

