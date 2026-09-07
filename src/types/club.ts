export interface Club {
  id: string;
  name: string;
  code: "T2B" | "H2B";
  subtitle: string;
  description: string;
  isActive: boolean;
  delegatesCount: number;
  regionsCount: number;
  revenueFormatted: string;
  revenueAmount: number;
  email: string;
  phone: string;
  announcementsScope: string;
  accentColor: "primary" | "accent-h2b";
}
