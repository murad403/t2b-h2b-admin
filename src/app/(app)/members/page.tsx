"use client";
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import MembersTable from "@/components/members/MembersTable";
import MemberDetailsModal from "@/components/members/MemberDetailsModal";
import AddMemberModal from "@/components/members/AddMemberModal";
import MemberUpdateModal, { MemberFormData } from "@/components/members/MemberUpdateModal";
import MemberDeleteModal from "@/components/members/MemberDeleteModal";
import { Plus } from "lucide-react";
import { Member, MemberRegion, MemberStatus } from "@/types/member";

const initialMembers: Member[] = [
  {
    id: "mem-1",
    name: "Marc Keller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    title: "Managing Director, Wealth Management",
    company: "UBS Group AG",
    club: "T2B",
    region: "Lugano",
    tier: "VIP",
    joinDate: "2023-02-15",
    status: "ACTIVE",
    attended: 14,
    email: "m.keller@ubs.ch",
    phone: "+41 44 234 11 99",
    notes: "Key delegate for Swiss wealth networking events.",
    payments: [
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
    ],
  },
  {
    id: "mem-2",
    name: "Sarah Tschudi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    title: "Head of Enterprise Risk",
    company: "Zurich Insurance",
    club: "H2B",
    region: "Zurich",
    tier: "PREMIUM",
    joinDate: "2024-05-20",
    status: "ACTIVE",
    attended: 9,
    email: "sarah.tschudi@zurich.com",
    phone: "+41 43 555 20 40",
  },
  {
    id: "mem-3",
    name: "Michael Favre",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    title: "Senior Partner",
    company: "Pictet & Cie",
    club: "T2B",
    region: "Geneva",
    tier: "PARTNER",
    joinDate: "2022-11-01",
    status: "ACTIVE",
    attended: 22,
    email: "mfavre@pictet.com",
    phone: "+41 22 818 21 11",
  },
  {
    id: "mem-4",
    name: "Anna Bieri",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    title: "VP Corporate Innovation",
    company: "Swisscom AG",
    club: "H2B",
    region: "Bern",
    tier: "PREMIUM",
    joinDate: "2024-09-12",
    status: "ACTIVE",
    attended: 6,
    email: "anna.bieri@swisscom.ch",
    phone: "+41 31 342 99 00",
  },
  {
    id: "mem-5",
    name: "Stefano Corti",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    title: "Head of Private Clients",
    company: "BSI Bank",
    club: "T2B",
    region: "Lugano",
    tier: "GOLD",
    joinDate: "2025-01-20",
    status: "PENDING",
    attended: 2,
    email: "stefano.corti@bsi.ch",
    phone: "+41 91 800 33 44",
  },
  {
    id: "mem-6",
    name: "Chantal Moreau",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    title: "Global Brands Director",
    company: "Nestlé SA",
    club: "T2B",
    region: "Lausanne",
    tier: "VIP",
    joinDate: "2023-10-05",
    status: "ACTIVE",
    attended: 11,
    email: "chantal.moreau@nestle.com",
    phone: "+41 21 924 11 11",
  },
  {
    id: "mem-7",
    name: "Urs Giger",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    title: "Lead Pharma Legal Counsel",
    company: "Roche Holding",
    club: "H2B",
    region: "Basel",
    tier: "GOLD",
    joinDate: "2024-11-15",
    status: "SUSPENDED",
    attended: 4,
    email: "urs.giger@roche.com",
    phone: "+41 61 688 11 11",
  },
  {
    id: "mem-8",
    name: "Pascal Luginbühl",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    title: "Director of Sponsorships",
    company: "TAG Heuer",
    club: "H2B",
    region: "Geneva",
    tier: "PARTNER",
    joinDate: "2024-04-01",
    status: "FLAGGED",
    attended: 5,
    email: "pascal.luginbuhl@tagheuer.com",
    phone: "+41 32 919 80 00",
  },
];

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedDetailsMember, setSelectedDetailsMember] = useState<Member | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteMember, setSelectedDeleteMember] = useState<Member | null>(null);

  // Add / Edit Member Trigger
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (member: Member) => {
    setEditingMember(member);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDetailsModal = (member: Member) => {
    setSelectedDetailsMember(member);
    setIsDetailsModalOpen(true);
  };

  const handleOpenDeleteModal = (member: Member) => {
    setSelectedDeleteMember(member);
    setIsDeleteModalOpen(true);
  };

  // Add New Member
  const handleAddMember = (data: MemberFormData) => {
    const newMember: Member = {
      id: `mem-${Date.now()}`,
      name: data.name,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      title: data.title,
      company: data.company,
      club: data.club,
      region: data.region,
      tier: data.tier,
      joinDate: new Date().toISOString().split("T")[0],
      status: data.status,
      attended: 0,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
    };
    setMembers((prev) => [newMember, ...prev]);
  };

  // Update Member
  const handleSaveMember = (data: MemberFormData, memberId?: string) => {
    if (memberId) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === memberId
            ? {
                ...m,
                name: data.name,
                club: data.club,
                company: data.company,
                title: data.title,
                email: data.email,
                phone: data.phone,
                region: data.region,
                tier: data.tier,
                status: data.status,
                notes: data.notes,
              }
            : m
        )
      );
    }
  };

  // Delete Member
  const handleConfirmDelete = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  // Bulk Activate
  const handleBulkActivate = (ids: string[]) => {
    setMembers((prev) =>
      prev.map((m) => (ids.includes(m.id) ? { ...m, status: "ACTIVE" } : m))
    );
  };

  // Update Status directly from details drawer
  const handleUpdateStatusFromDrawer = (memberId: string, status: MemberStatus) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, status } : m))
    );
  };

  // Update Region directly from details drawer
  const handleUpdateRegionFromDrawer = (memberId: string, region: MemberRegion) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, region } : m))
    );
  };

  const headerActions = (
    <button
      onClick={handleOpenAddModal}
      className="bg-primary text-bg-dark font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm hover:brightness-110 flex items-center gap-1.5 transition-all cursor-pointer"
    >
      <Plus className="w-4 h-4 stroke-3" />
      Add Member
    </button>
  );

  return (
    <PageContainer
      title="Members"
      description="Configure, Inspect, and register networking delegates platform-wide"
      actions={headerActions}
    >
      {/* Main Members Data Table */}
      <MembersTable
        members={members}
        onViewDetails={handleOpenDetailsModal}
        onEditMember={handleOpenEditModal}
        onDeleteMember={handleOpenDeleteModal}
        onBulkActivate={handleBulkActivate}
      />

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMember}
      />

      {/* Member Edit Modal */}
      <MemberUpdateModal
        isOpen={isUpdateModalOpen}
        member={editingMember}
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleSaveMember}
      />

      {/* Swiss Delegate Ledger Drawer */}
      <MemberDetailsModal
        isOpen={isDetailsModalOpen}
        member={selectedDetailsMember}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        onUpdateStatus={handleUpdateStatusFromDrawer}
        onUpdateRegion={handleUpdateRegionFromDrawer}
      />

      {/* Member Delete Modal */}
      <MemberDeleteModal
        isOpen={isDeleteModalOpen}
        member={selectedDeleteMember}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </PageContainer>
  );
};

export default MembersPage;