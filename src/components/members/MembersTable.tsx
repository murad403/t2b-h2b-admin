"use client";
import React, { useState, useMemo } from "react";
import { Search, Eye, Edit3, Trash2, Download, Send, CheckCircle } from "lucide-react";
import { Member } from "@/types/member";
import { getStatusBadge, getTierBadge } from "@/utils/formatter";

interface MembersTableProps {
    members: Member[];
    onViewDetails: (member: Member) => void;
    onEditMember: (member: Member) => void;
    onDeleteMember: (member: Member) => void;
    onBulkActivate?: (selectedIds: string[]) => void;
}

const MembersTable: React.FC<MembersTableProps> = ({ members, onViewDetails, onEditMember, onDeleteMember, onBulkActivate }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClub, setSelectedClub] = useState<string>("ALL CLUBS");
    const [selectedRegion, setSelectedRegion] = useState<string>("ALL REGIONS");
    const [selectedTier, setSelectedTier] = useState<string>("ALL TIERS");
    const [selectedStatus, setSelectedStatus] = useState<string>("ALL STATUSES");
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

    // Filtered members calculation
    const filteredMembers = useMemo(() => {
        return members.filter((m) => {
            const matchesSearch =
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.email.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesClub =
                selectedClub === "ALL CLUBS" || m.club === selectedClub;

            const matchesRegion =
                selectedRegion === "ALL REGIONS" || m.region === selectedRegion;

            const matchesTier =
                selectedTier === "ALL TIERS" || m.tier === selectedTier;

            const matchesStatus =
                selectedStatus === "ALL STATUSES" || m.status === selectedStatus;

            return (
                matchesSearch &&
                matchesClub &&
                matchesRegion &&
                matchesTier &&
                matchesStatus
            );
        });
    }, [members, searchQuery, selectedClub, selectedRegion, selectedTier, selectedStatus]);

    // Checkbox toggle logic
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedMemberIds(filteredMembers.map((m) => m.id));
        } else {
            setSelectedMemberIds([]);
        }
    };

    const handleSelectOne = (id: string) => {
        setSelectedMemberIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isAllSelected =
        filteredMembers.length > 0 &&
        selectedMemberIds.length === filteredMembers.length;

    

    return (
        <div className="space-y-4 select-none">
            {/* Top Search & Dropdown Filter Bar */}
            <div className="bg-card border border-card-border rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                    {/* Search Input */}
                    <div className="md:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-description">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, company, email..."
                            className="w-full pl-9 pr-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                    </div>

                    {/* Club Dropdown */}
                    <select
                        value={selectedClub}
                        onChange={(e) => setSelectedClub(e.target.value)}
                        className="px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs font-bold text-title focus:outline-none focus:border-primary/60 transition-colors uppercase"
                    >
                        <option value="ALL CLUBS">ALL CLUBS</option>
                        <option value="T2B">T2B</option>
                        <option value="H2B">H2B</option>
                    </select>

                    {/* Region Dropdown */}
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs font-bold text-title focus:outline-none focus:border-primary/60 transition-colors uppercase"
                    >
                        <option value="ALL REGIONS">ALL REGIONS</option>
                        <option value="Lugano">Lugano</option>
                        <option value="Zurich">Zurich</option>
                        <option value="Geneva">Geneva</option>
                        <option value="Bern">Bern</option>
                        <option value="Lausanne">Lausanne</option>
                        <option value="Basel">Basel</option>
                    </select>

                    {/* Tier Dropdown */}
                    <select
                        value={selectedTier}
                        onChange={(e) => setSelectedTier(e.target.value)}
                        className="px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs font-bold text-title focus:outline-none focus:border-primary/60 transition-colors uppercase"
                    >
                        <option value="ALL TIERS">ALL TIERS</option>
                        <option value="VIP">VIP</option>
                        <option value="PREMIUM">PREMIUM</option>
                        <option value="PARTNER">PARTNER</option>
                        <option value="GOLD">GOLD</option>
                    </select>

                    {/* Status Dropdown */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs font-bold text-title focus:outline-none focus:border-primary/60 transition-colors uppercase sm:col-span-2 md:col-span-1"
                    >
                        <option value="ALL STATUSES">ALL STATUSES</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="PENDING">PENDING</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                        <option value="FLAGGED">FLAGGED</option>
                    </select>
                </div>

                {/* Bulk Actions Bar (Shown when 1 or more checked) */}
                {selectedMemberIds.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-card-border/60 bg-sidebar/50 p-3 rounded-lg animate-in fade-in duration-150">
                        <span className="text-xs font-bold text-primary">
                            {selectedMemberIds.length} members selected
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg bg-card-border text-title text-xs font-semibold hover:bg-card-border/80 flex items-center gap-1.5 transition-colors"
                            >
                                <Download className="w-3.5 h-3.5 text-description" />
                                Export CSV
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg bg-card-border text-title text-xs font-semibold hover:bg-card-border/80 flex items-center gap-1.5 transition-colors"
                            >
                                <Send className="w-3.5 h-3.5 text-description" />
                                Send Direct Message
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (onBulkActivate) onBulkActivate(selectedMemberIds);
                                    setSelectedMemberIds([]);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-primary text-bg-dark text-xs font-bold hover:brightness-110 flex items-center gap-1.5 transition-all shadow-sm"
                            >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Bulk Activate
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedMemberIds([])}
                                className="px-2.5 py-1.5 rounded-lg text-description hover:text-title text-xs transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Table Container */}
            <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-225">
                        <thead>
                            <tr className="border-b border-card-border/60 bg-sidebar/40 text-[10px] font-bold uppercase tracking-wider text-description">
                                <th className="p-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        className="rounded bg-sidebar border-card-border text-primary focus:ring-0 cursor-pointer accent-[#C6F135]"
                                    />
                                </th>
                                <th className="p-4 whitespace-nowrap">NAME & CORPORATE</th>
                                <th className="p-4">CLUB</th>
                                <th className="p-4">REGION</th>
                                <th className="p-4 whitespace-nowrap">JOIN DATE</th>
                                <th className="p-4">STATUS</th>
                                <th className="p-4 text-center">ATTENDED</th>
                                <th className="p-4 text-right pr-6">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-card-border/50 text-xs">
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-description">
                                        No delegates found matching current search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => {
                                    const isChecked = selectedMemberIds.includes(member.id);
                                    return (
                                        <tr
                                            key={member.id}
                                            className={`hover:bg-sidebar/50 transition-colors ${isChecked ? "bg-sidebar/80" : ""
                                                }`}
                                        >
                                            {/* Checkbox */}
                                            <td className="p-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => handleSelectOne(member.id)}
                                                    className="rounded bg-sidebar border-card-border text-primary focus:ring-0 cursor-pointer accent-[#C6F135]"
                                                />
                                            </td>

                                            {/* Name & Corporate */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                                                        alt={member.name}
                                                        className="w-8 h-8 rounded-full object-cover border border-card-border"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-title text-xs leading-snug">
                                                            {member.name}
                                                        </p>
                                                        <p className="text-[11px] text-description">
                                                            {member.title} <span className="text-[#94A3B8]">at</span>{" "}
                                                            <strong className="text-title font-semibold">
                                                                {member.company}
                                                            </strong>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Club */}
                                            <td className="p-4">
                                                {member.club === "T2B" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#182218] text-primary border border-primary/30">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                                        T2B
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0F2238] text-accent-h2b border border-accent-h2b/30">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-h2b"></span>
                                                        H2B
                                                    </span>
                                                )}
                                            </td>

                                            {/* Region & Tier */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-title font-medium text-xs">
                                                        {member.region}
                                                    </span>
                                                    {getTierBadge(member.tier)}
                                                </div>
                                            </td>

                                            {/* Join Date */}
                                            <td className="p-4 text-description font-medium whitespace-nowrap">
                                                {member.joinDate}
                                            </td>

                                            {/* Status */}
                                            <td className="p-4">{getStatusBadge(member.status)}</td>

                                            {/* Attended */}
                                            <td className="p-4 text-center font-bold text-title">
                                                {member.attended}
                                            </td>

                                            {/* Actions */}
                                            <td className="p-4 text-right pr-6">
                                                <div className="flex items-center justify-end gap-2 text-description">
                                                    <button
                                                        onClick={() => onViewDetails(member)}
                                                        className="p-1.5 rounded-lg hover:text-title hover:bg-card-border/60 transition-colors"
                                                        title="View Swiss Delegate Ledger"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => onEditMember(member)}
                                                        className="p-1.5 rounded-lg hover:text-title hover:bg-card-border/60 transition-colors"
                                                        title="Update Credentials"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => onDeleteMember(member)}
                                                        className="p-1.5 rounded-lg hover:text-red-400 hover:bg-red-950/40 transition-colors"
                                                        title="Delete Member"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MembersTable;