"use client";
import React from "react";
import Image from "next/image";
import { Pencil, Star, Trash2, Newspaper } from "lucide-react";
import { NewsArticle } from "@/types/news";
import { getClubScopeBadge } from "@/utils/formatter";

interface NewsCardProps {
    article: NewsArticle;
    onEdit: (article: NewsArticle) => void;
    onToggleFeatured: (articleId: string) => void;
    onDelete: (article: NewsArticle) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onEdit, onToggleFeatured, onDelete }) => {


    const geoLabel =
        article.geoScope === "NATIONAL"
            ? "National"
            : `Regional (${article.canton || "Swiss"})`;

    return (
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-card-border/90 transition-all">
            {/* Top Banner Image Container */}
            <div className="relative h-48 sm:h-52 w-full bg-sidebar overflow-hidden">
                {article.coverImage ? (
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-sidebar/80 text-description/40 gap-2">
                        <Newspaper className="w-8 h-8" />
                        <span className="text-xs font-mono">No Media Thumbnail</span>
                    </div>
                )}

                {/* Featured Badge Top Left */}
                {article.isFeatured && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-[#C6F135] text-bg-dark font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-lg uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-bg-dark text-bg-dark" />
                        <span>FEATURED</span>
                    </div>
                )}

                {/* Scope Badge Bottom Right */}
                <div className="absolute bottom-3 right-3 z-10 bg-black/75 backdrop-blur-xs text-title/90 text-[10px] font-mono px-2.5 py-0.5 rounded-md border border-white/10 shadow-sm">
                    {geoLabel}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                    {/* Badges Row */}
                    <div className="flex items-center gap-2">
                        {getClubScopeBadge(article.clubScope)}
                        {article.status === "PUBLISHED" ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                PUBLISHED
                            </span>
                        ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                DRAFT
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-title group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {article.title}
                    </h3>

                    {/* Body Preview */}
                    <p className="text-xs text-description line-clamp-3 leading-relaxed">
                        {article.body}
                    </p>
                </div>

                {/* Bottom Actions Row */}
                <div className="flex items-center gap-2 pt-3 border-t border-card-border/60">
                    <button
                        type="button"
                        onClick={() => onEdit(article)}
                        className="flex-1 py-2 px-3 bg-sidebar hover:bg-card-border border border-card-border/80 rounded-xl text-xs font-semibold text-title flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                        <Pencil className="w-3.5 h-3.5 text-description" />
                        <span>Edit Column</span>
                    </button>

                    {/* Star / Feature button */}
                    <button
                        type="button"
                        onClick={() => onToggleFeatured(article.id)}
                        title={article.isFeatured ? "Unpin from Hero Feed" : "Pin to Hero Feed"}
                        className="p-2 bg-sidebar hover:bg-card-border border border-card-border/80 rounded-xl transition-colors cursor-pointer"
                    >
                        <Star
                            className={`w-3.5 h-3.5 ${article.isFeatured
                                ? "text-primary fill-primary"
                                : "text-description/60 hover:text-title"
                                }`}
                        />
                    </button>

                    {/* Delete button */}
                    <button
                        type="button"
                        onClick={() => onDelete(article)}
                        title="Delete Press Article"
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
