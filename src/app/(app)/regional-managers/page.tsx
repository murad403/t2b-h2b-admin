"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import RegionalManagersTable from "@/components/regional-managers/RegionalManagersTable";
import CreateManagerModal from "@/components/regional-managers/CreateManagerModal";
import AssignManagerModal from "@/components/regional-managers/AssignManagerModal";
import ModifyManagerModal from "@/components/regional-managers/ModifyManagerModal";
import RevokeManagerModal from "@/components/regional-managers/RevokeManagerModal";
import {
  RegionalManager,
  CreateManagerFormData,
  AssignManagerFormData,
} from "@/types/regional-manager";

const initialManagers: RegionalManager[] = [
  {
    id: "rm1",
    name: "Beat Hintermann",
    email: "b.hintermann@tennis2business.ch",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    clubBounds: "T2B",
    boundRegions: ["Zurich"],
    dateBound: "2024-01-15",
    authorityState: "ACTIVE",
  },
  {
    id: "rm2",
    name: "Chantal Dubois",
    email: "c.dubois@tennis2business.ch",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    clubBounds: "COMBINED",
    boundRegions: ["Geneva"],
    dateBound: "2024-03-10",
    authorityState: "ACTIVE",
  },
  {
    id: "rm3",
    name: "Christian Widmer",
    email: "c.widmer@tennis2business.ch",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    clubBounds: "T2B",
    boundRegions: ["Zurich"],
    dateBound: "2024-06-01",
    authorityState: "ACTIVE",
  },
  {
    id: "rm4",
    name: "Reto Müller",
    email: "r.mueller@hockey2business.ch",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    clubBounds: "H2B",
    boundRegions: ["Bern"],
    dateBound: "2024-02-18",
    authorityState: "ACTIVE",
  },
  {
    id: "rm5",
    name: "Giulia Bianchi",
    email: "g.bianchi@hockey2business.ch",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
    clubBounds: "COMBINED",
    boundRegions: ["Lausanne"],
    dateBound: "2024-08-22",
    authorityState: "ACTIVE",
  },
];

const RegionalManagersPage = () => {
  const [managers, setManagers] = useState<RegionalManager[]>(initialManagers);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [modifyingManager, setModifyingManager] =
    useState<RegionalManager | null>(null);
  const [revokingManager, setRevokingManager] =
    useState<RegionalManager | null>(null);

  const handleCreateManager = (data: CreateManagerFormData) => {
    const newManager: RegionalManager = {
      id: `rm_${Date.now()}`,
      name: data.name,
      email: data.email,
      avatarUrl: "",
      clubBounds: data.clubBounds,
      boundRegions: ["Zurich"],
      dateBound: new Date().toISOString().split("T")[0],
      authorityState: "ACTIVE",
    };
    setManagers((prev) => [newManager, ...prev]);
  };

  const handleAssignManager = (data: AssignManagerFormData) => {
    const newManager: RegionalManager = {
      id: `rm_${Date.now()}`,
      name: data.delegateSearch || "Swiss Delegate",
      email: "delegate@swiss-business.ch",
      avatarUrl: "",
      clubBounds: data.clubBounds,
      boundRegions: data.boundRegions.length > 0 ? data.boundRegions : ["Zurich"],
      dateBound: new Date().toISOString().split("T")[0],
      authorityState: data.status,
    };
    setManagers((prev) => [newManager, ...prev]);
  };

  const handleModifyManager = (
    managerId: string,
    data: AssignManagerFormData
  ) => {
    setManagers((prev) =>
      prev.map((m) => {
        if (m.id === managerId) {
          return {
            ...m,
            clubBounds: data.clubBounds,
            authorityState: data.status,
            boundRegions: data.boundRegions,
          };
        }
        return m;
      })
    );
  };

  const handleRevokeManager = (managerId: string) => {
    setManagers((prev) =>
      prev.map((m) =>
        m.id === managerId ? { ...m, authorityState: "REVOKED" } : m
      )
    );
  };

  const pageActions = (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setIsCreateModalOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sidebar border border-card-border hover:bg-card-border text-title text-xs font-semibold transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Create Manager
      </button>
      <button
        type="button"
        onClick={() => setIsAssignModalOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-3" />
        Assign Manager
      </button>
    </div>
  );

  return (
    <PageContainer
      title="Regional Managers"
      description="Delegate chapter credentials, bind Canton authorities, and configure access settings"
      actions={pageActions}
    >
      <RegionalManagersTable
        managers={managers}
        onModify={(manager) => setModifyingManager(manager)}
        onRevoke={(manager) => setRevokingManager(manager)}
      />

      {/* Create Manager Account Modal */}
      <CreateManagerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateManager}
      />

      {/* Elevate Swiss Delegate Modal */}
      <AssignManagerModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignManager}
      />

      {/* Modify Manager Assignment Modal */}
      <ModifyManagerModal
        isOpen={!!modifyingManager}
        manager={modifyingManager}
        onClose={() => setModifyingManager(null)}
        onUpdate={handleModifyManager}
      />

      {/* Revoke Administrative Access Modal */}
      <RevokeManagerModal
        isOpen={!!revokingManager}
        manager={revokingManager}
        onClose={() => setRevokingManager(null)}
        onConfirmRevoke={handleRevokeManager}
      />
    </PageContainer>
  );
};

export default RegionalManagersPage;