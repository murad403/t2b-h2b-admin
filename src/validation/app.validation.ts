import { z } from "zod";

// ==========================================
// MEMBER VALIDATION SCHEMAS
// ==========================================

export const memberSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  club: z.enum(["T2B", "H2B"] as const),
  company: z.string().min(2, "Company/Organization is required"),
  title: z.string().min(2, "Professional Designation is required"),
  email: z.string().email("Valid business email is required"),
  phone: z.string().min(5, "Mobile hotline is required"),
  region: z.enum(["Lugano", "Zurich", "Geneva", "Bern", "Lausanne", "Basel"] as const),
  tier: z.enum(["VIP", "PREMIUM", "GOLD", "PARTNER"] as const),
  status: z.enum(["ACTIVE", "PENDING", "SUSPENDED", "FLAGGED"] as const),
  notes: z.string().optional(),
});

export const addMemberSchema = memberSchema;
export const updateMemberSchema = memberSchema;

export type MemberFormData = z.infer<typeof memberSchema>;

// ==========================================
// CLUB SETTINGS VALIDATION SCHEMAS
// ==========================================

export const clubSettingsSchema = z.object({
  description: z
    .string()
    .min(10, "Mission & description must be at least 10 characters"),
  email: z.string().email("Valid administrative email is required"),
  phone: z.string().min(5, "Swiss support hotline is required"),
  announcementsScope: z.string().min(3, "Announcements scope is required"),
});

export type ClubSettingsFormData = z.infer<typeof clubSettingsSchema>;

// ==========================================
// REGION VALIDATION SCHEMAS
// ==========================================

export const regionSchema = z.object({
  name: z.string().min(2, "Region/City Name is required"),
  clubScope: z.enum(["both", "t2b", "h2b"], {
    message: "Club Affiliation Scope is required",
  }),
  managerId: z.string(),
  isActive: z.boolean(),
});

export const addRegionSchema = regionSchema;
export const updateRegionSchema = regionSchema;

export type RegionFormData = z.infer<typeof regionSchema>;

// ==========================================
// EVENT VALIDATION SCHEMAS
// ==========================================

export const eventSchema = z.object({
  name: z.string().min(2, "Event Name is required"),
  category: z.string().min(2, "Category is required"),
  clubHost: z.enum(["T2B", "H2B"]),
  region: z.string().min(2, "Region Location is required"),
  regionalManager: z.string(),
  guestFee: z.number().min(0, "Fee must be 0 or higher"),
  date: z.string().min(2, "Calendar Date is required"),
  timing: z.string().min(2, "Daily Timing Span is required"),
  venue: z.string().min(2, "Specific Arena / Venue is required"),
  capacityLimit: z.number().min(1, "Capacity limit must be at least 1"),
  coverImage: z.string(),
  description: z.string().min(10, "Summary must be at least 10 characters"),
  status: z.enum(["PUBLISHED", "DRAFT", "PAST"]),
});

export const addEventSchema = eventSchema;
export const updateEventSchema = eventSchema;

export type EventFormData = z.infer<typeof eventSchema>;

// ==========================================
// MEMBERSHIP PLAN VALIDATION SCHEMAS
// ==========================================

export const planSchema = z.object({
  name: z.string().min(2, "Plan Display Name is required"),
  clubHost: z.enum(["T2B", "H2B"]),
  price: z.number().min(0, "Plan cost must be 0 or higher"),
  billingCycle: z.enum(["Yearly", "Monthly", "Lifetime"]),
  eventsAllowance: z.string().min(2, "Events allowance is required"),
  features: z.array(z.string()),
  isArchived: z.boolean(),
});

export const addPlanSchema = planSchema;
export const updatePlanSchema = planSchema;

export type PlanFormData = z.infer<typeof planSchema>;
