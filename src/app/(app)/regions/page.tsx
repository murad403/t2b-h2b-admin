"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import RegionsTable from "@/components/regions/RegionsTable";
import AddRegionModal from "@/components/regions/AddRegionModal";
import UpdateRegionModal from "@/components/regions/UpdateRegionModal";
import { Region, RegionFormData, ChapterManager } from "@/types/region";

const mockManagers: ChapterManager[] = [
  {
    id: "m1",
    name: "Beat Hintermann",
    clubAffiliation: "T2B + H2B",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "m2",
    name: "Chantal Dubois",
    clubAffiliation: "T2B + H2B",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "m3",
    name: "Christian Widmer",
    clubAffiliation: "T2B",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "m4",
    name: "Reto Müller",
    clubAffiliation: "H2B",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "m5",
    name: "Giulia Bianchi",
    clubAffiliation: "T2B + H2B",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
  },
];

const initialRegions: Region[] = [
  {
    id: "r1",
    name: "Zurich",
    clubScope: "both",
    managerId: "m1",
    managerName: "Beat Hintermann",
    managerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    membersCount: 245,
    activeEventsCount: 3,
    isActive: false,
  },
  {
    id: "r2",
    name: "Geneva",
    clubScope: "both",
    managerId: "m2",
    managerName: "Chantal Dubois",
    managerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    membersCount: 180,
    activeEventsCount: 2,
    isActive: true,
  },
  {
    id: "r3",
    name: "Basel",
    clubScope: "t2b",
    managerId: "m3",
    managerName: "Christian Widmer",
    managerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    membersCount: 95,
    activeEventsCount: 1,
    isActive: true,
  },
  {
    id: "r4",
    name: "Bern",
    clubScope: "h2b",
    managerId: "m4",
    managerName: "Reto Müller",
    managerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    membersCount: 110,
    activeEventsCount: 2,
    isActive: true,
  },
  {
    id: "r5",
    name: "Lausanne",
    clubScope: "both",
    managerId: "m5",
    managerName: "Giulia Bianchi",
    managerAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
    membersCount: 88,
    activeEventsCount: 1,
    isActive: true,
  },
  {
    id: "r6",
    name: "Lugano",
    clubScope: "t2b",
    managerId: null,
    managerName: null,
    managerAvatar: null,
    membersCount: 22,
    activeEventsCount: 0,
    isActive: true,
  },
];

const RegionsPage = () => {
  const [regions, setRegions] = useState<Region[]>(initialRegions);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);

  const handleAddRegion = (data: RegionFormData) => {
    const selectedManager = mockManagers.find((m) => m.id === data.managerId);
    const newRegion: Region = {
      id: `r_${Date.now()}`,
      name: data.name,
      clubScope: data.clubScope,
      managerId: selectedManager ? selectedManager.id : null,
      managerName: selectedManager ? selectedManager.name : null,
      managerAvatar: selectedManager ? selectedManager.avatarUrl : null,
      membersCount: 0,
      activeEventsCount: 0,
      isActive: data.isActive,
    };
    setRegions((prev) => [newRegion, ...prev]);
  };

  const handleUpdateRegion = (regionId: string, data: RegionFormData) => {
    const selectedManager = mockManagers.find((m) => m.id === data.managerId);
    setRegions((prev) =>
      prev.map((r) => {
        if (r.id === regionId) {
          return {
            ...r,
            name: data.name,
            clubScope: data.clubScope,
            managerId: selectedManager ? selectedManager.id : null,
            managerName: selectedManager ? selectedManager.name : null,
            managerAvatar: selectedManager ? selectedManager.avatarUrl : null,
            isActive: data.isActive,
          };
        }
        return r;
      })
    );
  };

  const handleToggleStatus = (regionId: string) => {
    setRegions((prev) =>
      prev.map((r) => (r.id === regionId ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const actions = (
    <button
      type="button"
      onClick={() => setIsAddModalOpen(true)}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
    >
      <Plus className="w-4 h-4 stroke-3" />
      Add Region
    </button>
  );

  return (
    <PageContainer
      title="Regions"
      description="Establish national chapters, assign regional chapter leads, and track activities"
      actions={actions}
    >
      <RegionsTable
        regions={regions}
        onEdit={(region) => setEditingRegion(region)}
        onToggleStatus={handleToggleStatus}
      />

      {/* Add Region Modal */}
      <AddRegionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRegion}
        managersList={mockManagers}
      />

      {/* Edit Region Modal */}
      <UpdateRegionModal
        isOpen={!!editingRegion}
        region={editingRegion}
        onClose={() => setEditingRegion(null)}
        onUpdate={handleUpdateRegion}
        managersList={mockManagers}
      />
    </PageContainer>
  );
};

export default RegionsPage;