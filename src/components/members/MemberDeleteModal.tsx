"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Member } from "@/types/member";

interface MemberDeleteModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onConfirm: (memberId: string) => void;
}

const MemberDeleteModal: React.FC<MemberDeleteModalProps> = ({
  isOpen,
  member,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="bg-card border border-card-border rounded-xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2C181B] border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-title">Delete Delegate</h3>
              <p className="text-xs text-description">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-description hover:text-title p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-sidebar/80 border border-card-border p-4 rounded-lg text-xs space-y-2">
          <p className="text-[#94A3B8]">
            Are you sure you want to permanently remove <strong className="text-title">{member.name}</strong> ({member.company}) from the platform directory?
          </p>
          <p className="text-description text-[11px]">
            Their membership records, region assignments, and event history will be archived.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-card-border text-title text-xs font-semibold hover:bg-card-border/80 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(member.id);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDeleteModal;