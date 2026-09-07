export type PaymentStatus = "PAID" | "PENDING" | "REFUNDED";
export type PaymentMethod = "Credit Card" | "Bank Transfer" | "TWINT" | "PayPal";
export type PaymentClubScope = "T2B" | "H2B";

export interface PaymentTransaction {
  id: string; // e.g. "T2B-9842"
  payerName: string; // e.g. "Marc Keller"
  payerEmail: string; // e.g. "m.keller@ubs.ch"
  clubScope: PaymentClubScope;
  category: string; // e.g. "Membership", "Guest Fee"
  amount: number; // CHF
  paymentDate: string; // e.g. "2026-06-28"
  status: PaymentStatus;
  method: PaymentMethod;
  cantonRegion: string; // e.g. "Zurich", "Bern", "Geneva"
}
