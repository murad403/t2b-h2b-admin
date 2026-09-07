export type GeographicScope =
  | "ONE_REGION"
  | "ALL_REGIONS"
  | "ALL_SWITZERLAND"
  | "INTERNATIONAL";

export type TargetClub = "COMBINED" | "T2B" | "H2B";

export interface NotificationFormData {
  subjectTitle: string;
  scope: GeographicScope;
  targetClub: TargetClub;
  emailCampaign: boolean;
  mobilePush: boolean;
  body: string;
}

export interface CampaignLog {
  id: string;
  title: string;
  status: "Sent" | "Draft" | "Failed";
  body: string;
  scope: string;
  sentDate: string;
  recipientsCount: number;
  deliveryChannels: ("email" | "push")[];
}
