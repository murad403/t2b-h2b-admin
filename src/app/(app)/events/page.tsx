"use client";

import React, { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import EventsTable from "@/components/events/EventsTable";
import AddEventModal from "@/components/events/AddEventModal";
import UpdateEventModal from "@/components/events/UpdateEventModal";
import EventDetailsModal from "@/components/events/EventDetailsModal";
import DeleteEventModal from "@/components/events/DeleteEventModal";
import { AssemblyEvent, EventFormData } from "@/types/event";

const initialEvents: AssemblyEvent[] = [
  {
    id: "ev1",
    name: "Zurich Executive Cup & Clay Match",
    category: "Tennis Tournament",
    clubHost: "T2B",
    region: "Zurich",
    regionalManager: "Bashar",
    coverImage:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800",
    date: "2026-07-15",
    timing: "14:00 - 20:00",
    venue: "Grasshopper Club Zürich, Tennis Arena",
    registeredCount: 45,
    capacityLimit: 60,
    guestFee: 250,
    description:
      "The flagship clay-court exhibition event of Zurich, welcoming top executives. Followed by a premium networking banquet hosted at Grasshopper Club Zürich.",
    status: "PUBLISHED",
  },
  {
    id: "ev2",
    name: "ZSC Lions VIP Suite Networking",
    category: "Ice Hockey Cup",
    clubHost: "H2B",
    region: "Zurich",
    regionalManager: "Chantal Dubois",
    coverImage:
      "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&q=80&w=800",
    date: "2026-07-28",
    timing: "18:30 - 22:30",
    venue: "Swiss Life Arena, Zurich (Private Skybox 4)",
    registeredCount: 22,
    capacityLimit: 30,
    guestFee: 350,
    description:
      "Exclusive skybox seating and executive networking during the ZSC Lions championship showcase game.",
    status: "PUBLISHED",
  },
  {
    id: "ev3",
    name: "Private Banking CEO Circle",
    category: "CEO Circle",
    clubHost: "T2B",
    region: "Geneva",
    regionalManager: "Christian Widmer",
    coverImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    date: "2026-08-05",
    timing: "08:00 - 11:30",
    venue: "Hotel Beau-Rivage, Geneva",
    registeredCount: 12,
    capacityLimit: 15,
    guestFee: 0,
    description:
      "Closed-door morning roundtable discussion on wealth management trends in Switzerland for C-level members.",
    status: "DRAFT",
  },
  {
    id: "ev4",
    name: "Lausanne Lac Léman Business Gala",
    category: "Keynote Gala",
    clubHost: "T2B",
    region: "Lausanne",
    regionalManager: "Giulia Bianchi",
    coverImage:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=800",
    date: "2026-08-18",
    timing: "19:00 - 23:30",
    venue: "The Royal Savoy Hotel, Lausanne",
    registeredCount: 85,
    capacityLimit: 120,
    guestFee: 400,
    description:
      "Black-tie annual gala dinner overlooking Lake Geneva, featuring keynote speeches from Swiss industrial leaders.",
    status: "PUBLISHED",
  },
  {
    id: "ev5",
    name: "Bern Hockey Summit & VC Forum",
    category: "Business Forum",
    clubHost: "H2B",
    region: "Bern",
    regionalManager: "Reto Müller",
    coverImage:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
    date: "2026-06-12",
    timing: "13:00 - 18:00",
    venue: "PostFinance Arena, Bern (VIP Lounge)",
    registeredCount: 42,
    capacityLimit: 50,
    guestFee: 180,
    description:
      "Venture capital investment panel followed by an informal hockey skills exhibition match with former professionals.",
    status: "PAST",
  },
];

const EventsPage = () => {
  const [events, setEvents] = useState<AssemblyEvent[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState("ALL");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingEvent, setViewingEvent] = useState<AssemblyEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<AssemblyEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<AssemblyEvent | null>(
    null
  );

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClub = selectedClub === "ALL" || e.clubHost === selectedClub;
      const matchesRegion =
        selectedRegion === "ALL" ||
        e.region.toLowerCase() === selectedRegion.toLowerCase();
      const matchesStatus =
        selectedStatus === "ALL" || e.status === selectedStatus;

      return matchesSearch && matchesClub && matchesRegion && matchesStatus;
    });
  }, [events, searchQuery, selectedClub, selectedRegion, selectedStatus]);

  const handleAddEvent = (data: EventFormData) => {
    const newEv: AssemblyEvent = {
      id: `ev_${Date.now()}`,
      name: data.name,
      category: data.category,
      clubHost: data.clubHost,
      region: data.region,
      regionalManager: data.regionalManager,
      coverImage:
        data.coverImage ||
        "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800",
      date: data.date,
      timing: data.timing,
      venue: data.venue,
      registeredCount: 0,
      capacityLimit: data.capacityLimit,
      guestFee: data.guestFee,
      description: data.description,
      status: data.status,
    };
    setEvents((prev) => [newEv, ...prev]);
  };

  const handleUpdateEvent = (eventId: string, data: EventFormData) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            name: data.name,
            category: data.category,
            clubHost: data.clubHost,
            region: data.region,
            regionalManager: data.regionalManager,
            coverImage: data.coverImage || e.coverImage,
            date: data.date,
            timing: data.timing,
            venue: data.venue,
            capacityLimit: data.capacityLimit,
            guestFee: data.guestFee,
            description: data.description,
            status: data.status,
          };
        }
        return e;
      })
    );
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const actions = (
    <button
      type="button"
      onClick={() => setIsAddModalOpen(true)}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
    >
      <Plus className="w-4 h-4 stroke-[3]" />
      Create Event
    </button>
  );

  return (
    <PageContainer
      title="Events"
      description="Super Admin Suite: Create, reschedule, publish, and delete high-end Swiss assemblies"
      actions={actions}
    >
      {/* Search & Filter Bar */}
      <div className="bg-sidebar border border-card-border p-4 rounded-2xl space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-description/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, location, keyword..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Club Scope Filter */}
          <div>
            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
            >
              <option value="ALL">ALL CLUBS</option>
              <option value="T2B">Tennis To Business (T2B)</option>
              <option value="H2B">Hockey To Business (H2B)</option>
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
            >
              <option value="ALL">ALL REGIONS</option>
              <option value="Zurich">Zurich</option>
              <option value="Geneva">Geneva</option>
              <option value="Lausanne">Lausanne</option>
              <option value="Bern">Bern</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
              <option value="PAST">PAST</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Events Table */}
      <EventsTable
        events={filteredEvents}
        onView={(ev) => setViewingEvent(ev)}
        onEdit={(ev) => setEditingEvent(ev)}
        onDelete={(ev) => setDeletingEvent(ev)}
      />

      {/* View Event Details Modal */}
      <EventDetailsModal
        isOpen={!!viewingEvent}
        event={viewingEvent}
        onClose={() => setViewingEvent(null)}
        onEdit={(ev) => setEditingEvent(ev)}
      />

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEvent}
      />

      {/* Edit Event Modal */}
      <UpdateEventModal
        isOpen={!!editingEvent}
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onUpdate={handleUpdateEvent}
      />

      {/* Strike/Delete Event Modal */}
      <DeleteEventModal
        isOpen={!!deletingEvent}
        event={deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirmDelete={handleDeleteEvent}
      />
    </PageContainer>
  );
};

export default EventsPage;