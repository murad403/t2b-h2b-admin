export type ClubScopeOption = "both" | "t2b" | "h2b";

export interface ChapterManager {
  id: string;
  name: string;
  avatarUrl?: string;
  clubAffiliation?: string;
}

export interface Region {
  id: string;
  name: string;
  clubScope: ClubScopeOption; // "both" | "t2b" | "h2b"
  managerId: string | null;
  managerName?: string | null;
  managerAvatar?: string | null;
  membersCount: number;
  activeEventsCount: number;
  isActive: boolean;
}

export interface RegionFormData {
  name: string;
  clubScope: ClubScopeOption;
  managerId: string;
  isActive: boolean;
}
