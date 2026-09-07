export type ClubHostType = "T2B" | "H2B";
export type BillingCycleType = "Yearly" | "Monthly" | "Lifetime";

export interface MembershipPlan {
  id: string;
  name: string;
  clubHost: ClubHostType;
  price: number; // CHF
  billingCycle: BillingCycleType;
  eventsAllowance: string; // e.g. "up to 7/year", "Unlimited Access", "Corporate Team (5 Pax)"
  activeMembersCount: number;
  features: string[];
  isArchived: boolean;
}

export interface PlanFormData {
  name: string;
  clubHost: ClubHostType;
  price: number;
  billingCycle: BillingCycleType;
  eventsAllowance: string;
  features: string[];
  isArchived: boolean;
}
