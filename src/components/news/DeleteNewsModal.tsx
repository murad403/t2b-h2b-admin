"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";
import { NewsArticle } from "@/types/news";

interface DeleteNewsModalProps {
    isOpen: boolean;
    article: NewsArticle | null;
    onClose: () => void;
    onConfirmDelete: (articleId: string) => void;
}

const DeleteNewsModal: React.FC<DeleteNewsModalProps> = ({ isOpen, article, onClose, onConfirmDelete }) => {
    if (!isOpen || !article) return null;

    const handleDelete = () => {
        onConfirmDelete(article.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto select-none">
            <div className="bg-card border border-card-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header Icon + Title */}
                <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-title">Delete Press Article</h2>
                        <p className="text-xs text-description mt-1.5 leading-relaxed">
                            Are you sure you want to permanently delete{" "}
                            <strong className="text-title font-semibold">&quot;{article.title}&quot;</strong>?
                            This action will remove the column from public portals and regional news feeds.
                        </p>
                    </div>
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
                        type="button"
                        onClick={handleDelete}
                        className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-extrabold shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all cursor-pointer"
                    >
                        Delete Article
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteNewsModal;
