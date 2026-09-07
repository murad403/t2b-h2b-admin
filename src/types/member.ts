export type MemberClub = "T2B" | "H2B";
export type MemberRegion = "Lugano" | "Zurich" | "Geneva" | "Bern" | "Lausanne" | "Basel";
export type MemberTier = "VIP" | "PREMIUM" | "PARTNER" | "GOLD";
export type MemberStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "FLAGGED";

export interface MemberPayment {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Refunded";
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  club: MemberClub;
  region: MemberRegion;
  tier: MemberTier;
  joinDate: string;
  status: MemberStatus;
  attended: number;
  email: string;
  phone: string;
  notes?: string;
  payments?: MemberPayment[];
}
