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

// ==========================================
// REGIONAL MANAGER VALIDATION SCHEMAS
// ==========================================

export const createManagerSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.string().email("Valid email address is required"),
  clubBounds: z.enum(["T2B", "H2B", "COMBINED"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const assignManagerSchema = z.object({
  delegateSearch: z.string().min(2, "Delegate selection is required"),
  clubBounds: z.enum(["T2B", "H2B", "COMBINED"]),
  status: z.enum(["ACTIVE", "PENDING", "REVOKED"]),
  boundRegions: z.array(z.string()).min(1, "At least one region must be bound"),
});

export type CreateManagerFormData = z.infer<typeof createManagerSchema>;
export type AssignManagerFormData = z.infer<typeof assignManagerSchema>;

// ==========================================
// NOTIFICATION VALIDATION SCHEMAS
// ==========================================

export const notificationSchema = z
  .object({
    subjectTitle: z.string().min(3, "Subject Title / Alert Line is required"),
    scope: z.enum(["ONE_REGION", "ALL_REGIONS", "ALL_SWITZERLAND", "INTERNATIONAL"]),
    targetClub: z.enum(["COMBINED", "T2B", "H2B"]),
    emailCampaign: z.boolean(),
    mobilePush: z.boolean(),
    body: z.string().min(5, "Notification body text is required"),
  })
  .refine((data) => data.emailCampaign || data.mobilePush, {
    message: "At least one delivery channel (Email or Mobile Push) must be selected",
    path: ["emailCampaign"],
  });

export type NotificationSchemaFormData = z.infer<typeof notificationSchema>;

