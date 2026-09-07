export type EventStatus = "PUBLISHED" | "DRAFT" | "PAST";
export type ClubHost = "T2B" | "H2B";

export interface AssemblyEvent {
  id: string;
  name: string;
  category: string; // e.g. "Tennis Tournament", "Ice Hockey Cup", "CEO Circle", "Keynote Gala", "Business Forum"
  clubHost: ClubHost;
  region: string; // e.g. "Zurich", "Geneva", "Lausanne", "Bern"
  regionalManager?: string;
  coverImage: string;
  date: string; // e.g. "2026-07-15"
  timing: string; // e.g. "14:00 - 20:00"
  venue: string; // e.g. "Grasshopper Club Zürich, Tennis Arena"
  registeredCount: number;
  capacityLimit: number;
  guestFee: number; // CHF
  description: string;
  status: EventStatus;
}

export interface EventFormData {
  name: string;
  category: string;
  clubHost: ClubHost;
  region: string;
  regionalManager: string;
  guestFee: number;
  date: string;
  timing: string;
  venue: string;
  capacityLimit: number;
  coverImage: string;
  description: string;
  status: EventStatus;
}
