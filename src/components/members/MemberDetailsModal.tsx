"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Trash2,
  Edit3
} from "lucide-react";
import { Member, MemberRegion, MemberStatus } from "@/types/member";

interface MemberDetailsModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  onUpdateStatus?: (memberId: string, status: MemberStatus) => void;
  onUpdateRegion?: (memberId: string, region: MemberRegion) => void;
}

const MemberDetailsModal: React.FC<MemberDetailsModalProps> = ({
  isOpen,
  member,
  onClose,
  onEdit,
  onDelete,
  onUpdateStatus,
  onUpdateRegion,
}) => {
  const [currentRegion, setCurrentRegion] = useState<MemberRegion>("Zurich");
  const [currentStatus, setCurrentStatus] = useState<MemberStatus>("ACTIVE");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (member) {
      setCurrentRegion(member.region);
      setCurrentStatus(member.status);
      setNotes(member.notes || "");
    }
  }, [member]);

  if (!isOpen || !member) return null;

  const handleStatusChange = (status: MemberStatus) => {
    setCurrentStatus(status);
    if (onUpdateStatus) {
      onUpdateStatus(member.id, status);
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value as MemberRegion;
    setCurrentRegion(region);
    if (onUpdateRegion) {
      onUpdateRegion(member.id, region);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#0B0E17] border-l border-card-border shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-card-border flex items-center justify-between">
          <h2 className="text-base font-extrabold text-title tracking-wide">
            Swiss Delegate Ledger
          </h2>
          <button
            onClick={onClose}
            className="text-description hover:text-title p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative">
              <img
                src={member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary/40 shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-title">{member.name}</h3>
              <p className="text-xs text-description">{member.title}</p>
              <p className="text-xs font-bold text-primary mt-0.5">{member.company}</p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="bg-[#182218] text-primary border border-primary/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {member.club} CLUB
              </span>
              <span className="bg-card-border text-title text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-card-border">
                {member.tier}
              </span>
            </div>
          </div>

          {/* Corporate Contact */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-description">
              CORPORATE CONTACT
            </h4>
            <div className="bg-card border border-card-border rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-description">
                <Mail className="w-4 h-4 text-description/80 shrink-0" />
                <span className="text-title font-medium truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-3 text-description">
                <Phone className="w-4 h-4 text-description/80 shrink-0" />
                <span className="text-title font-medium">{member.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-description">
                <MapPin className="w-4 h-4 text-description/80 shrink-0" />
                <span>
                  Region: <strong className="text-title">{currentRegion}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-description">
                <Calendar className="w-4 h-4 text-description/80 shrink-0" />
                <span>
                  Enrolled: <strong className="text-title">{member.joinDate}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Operations */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-description">
              QUICK OPERATIONS
            </h4>
            <div className="bg-card border border-card-border rounded-xl p-4 space-y-4 text-xs">
              {/* Region Select */}
              <div>
                <label className="block text-[11px] text-description mb-1.5 font-medium">
                  Reassign Swiss Region
                </label>
                <select
                  value={currentRegion}
                  onChange={handleRegionChange}
                  className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title font-bold focus:outline-none focus:border-primary/60 transition-colors uppercase"
                >
                  <option value="ZURICH">ZURICH</option>
                  <option value="LUGANO">LUGANO</option>
                  <option value="GENEVA">GENEVA</option>
                  <option value="BERN">BERN</option>
                  <option value="LAUSANNE">LAUSANNE</option>
                  <option value="BASEL">BASEL</option>
                </select>
              </div>

              {/* Administrative Status Pills */}
              <div>
                <label className="block text-[11px] text-description mb-1.5 font-medium">
                  Administrative Status
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["ACTIVE", "PENDING", "FLAGGED", "SUSPENDED"] as MemberStatus[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleStatusChange(status)}
                      className={`py-1.5 px-1 rounded text-[10px] font-bold transition-all ${
                        currentStatus === status
                          ? status === "ACTIVE"
                            ? "bg-green-950 text-green-400 border border-green-500/40"
                            : status === "PENDING"
                            ? "bg-amber-950 text-amber-400 border border-amber-500/40"
                            : status === "FLAGGED"
                            ? "bg-red-950 text-red-400 border border-red-500/40"
                            : "bg-gray-900 text-gray-400 border border-gray-600/40"
                          : "bg-sidebar text-description border border-card-border hover:text-title"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Payments */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-description">
              PREMIUM PAYMENTS
            </h4>
            <div className="bg-card border border-card-border rounded-xl p-4 space-y-3 text-xs">
              {(member.payments || [
                {
                  id: "tx-101",
                  date: "2026-02-14",
                  description: "Membership Fee",
                  amount: "CHF 3,500",
                  status: "Paid",
                },
                {
                  id: "tx-102",
                  date: "2026-08-10",
                  description: "Guest Fee",
                  amount: "CHF 150",
                  status: "Paid",
                },
              ]).map((pay) => (
                <div key={pay.id} className="flex items-center justify-between pb-2 border-b border-card-border/50 last:border-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-title">{pay.id}</span>
                      <span className="text-[10px] text-description">• {pay.description}</span>
                    </div>
                    <span className="text-[10px] text-description">{pay.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-title block">{pay.amount}</span>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-green-950 text-green-400 border border-green-500/30">
                      {pay.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secretariat Notes */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-description">
              <FileText className="w-3.5 h-3.5" />
              <h4 className="text-[10px] font-bold uppercase tracking-wider">
                SECRETARIAT NOTES
              </h4>
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Secretariat notes, preferences, or issues..."
              className="w-full p-3 bg-card border border-card-border rounded-xl text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-card-border flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onEdit(member);
            }}
            className="flex-1 py-2.5 px-4 rounded-lg bg-card border border-card-border hover:border-primary/40 text-title text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Complete Details
          </button>
          <button
            onClick={() => {
              onClose();
              onDelete(member);
            }}
            className="py-2.5 px-4 rounded-lg bg-[#2C181B] border border-red-500/30 hover:bg-red-950 text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsModal;