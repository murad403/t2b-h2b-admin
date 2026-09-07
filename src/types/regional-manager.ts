export type ClubBoundsType = "T2B" | "H2B" | "COMBINED";
export type AuthorityStateType = "ACTIVE" | "PENDING" | "REVOKED";

export interface RegionalManager {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  clubBounds: ClubBoundsType;
  boundRegions: string[]; // e.g. ["Zurich"], ["Geneva"], etc.
  dateBound: string; // e.g. "2024-01-15"
  authorityState: AuthorityStateType;
}

export interface CreateManagerFormData {
  name: string;
  email: string;
  clubBounds: ClubBoundsType;
  password: string;
}

export interface AssignManagerFormData {
  delegateSearch: string;
  clubBounds: ClubBoundsType;
  status: AuthorityStateType;
  boundRegions: string[];
}
