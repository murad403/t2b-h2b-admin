"use client";
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import ClubCard from "@/components/clubs/ClubCard";
import ClubSettingsModal, { ClubSettingsFormData } from "@/components/clubs/ClubSettingsModal";
import { Club } from "@/types/club";

const initialClubs: Club[] = [
  {
    id: "club-t2b",
    name: "Tennis to Business",
    code: "T2B",
    subtitle: "TENNIS TO BUSINESS SWISS NETWORKING CLUB",
    description:
      "The premier Swiss business networking circle centered around tennis enthusiasts, bringing senior executives and founders onto the clay courts of Zurich, Geneva, and Lugano.",
    isActive: true,
    delegatesCount: 4,
    regionsCount: 6,
    revenueFormatted: "CHF 17,800",
    revenueAmount: 17800,
    email: "hq@tennis2business.ch",
    phone: "+41 44 210 11 22",
    announcementsScope: "National + Regional (Locked)",
    accentColor: "primary",
  },
  {
    id: "club-h2b",
    name: "Hockey to Business",
    code: "H2B",
    subtitle: "HOCKEY TO BUSINESS SWISS NETWORKING CLUB",
    description:
      "Connecting top executives and hockey leaders across Switzerland, holding elite business networking sessions alongside National League hockey match VIP events.",
    isActive: true,
    delegatesCount: 4,
    regionsCount: 4,
    revenueFormatted: "CHF 4,800",
    revenueAmount: 4800,
    email: "hq@hockey2business.ch",
    phone: "+41 31 312 33 44",
    announcementsScope: "National + Regional (Locked)",
    accentColor: "accent-h2b",
  },
];

const ClubsPage = () => {
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleToggleStatus = (clubId: string) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === clubId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleOpenConfigure = (club: Club) => {
    setSelectedClub(club);
    setIsSettingsModalOpen(true);
  };

  const handleSaveSettings = (clubId: string, data: ClubSettingsFormData) => {
    setClubs((prev) =>
      prev.map((c) =>
        c.id === clubId
          ? {
              ...c,
              description: data.description,
              email: data.email,
              phone: data.phone,
              announcementsScope: data.announcementsScope,
            }
          : c
      )
    );
  };

  return (
    <PageContainer
      title="Clubs"
      description="Supervise global brand definitions, revenue shares, and communications"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onToggleStatus={handleToggleStatus}
            onConfigure={handleOpenConfigure}
          />
        ))}
      </div>

      {/* Brand & Assets Configuration Modal */}
      <ClubSettingsModal
        isOpen={isSettingsModalOpen}
        club={selectedClub}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={handleSaveSettings}
      />
    </PageContainer>
  );
};

export default ClubsPage;