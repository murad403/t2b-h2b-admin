"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import BroadcastCommandCenter from "@/components/notifications/BroadcastCommandCenter";
import CampaignLogs from "@/components/notifications/CampaignLogs";
import { CampaignLog, NotificationFormData } from "@/types/notification";

const initialLogs: CampaignLog[] = [
  {
    id: "log-1",
    title: "Summer Match Scheduling for Zurich Executives",
    status: "Sent",
    body: "We are pleased to invite all Swiss VIP members to schedule their corporate matches on clay courts starting next Monday. Reserve via the member app.",
    scope: "One Region",
    sentDate: "2026-06-25",
    recipientsCount: 245,
    deliveryChannels: ["email", "push"],
  },
  {
    id: "log-2",
    title: "All-Switzerland Hockey League VIP Suite Pre-registration",
    status: "Sent",
    body: "Pre-registration for Skybox VIP seating for the Swiss National League Autumn schedule is now open. Seats are extremely limited.",
    scope: "All Switzerland",
    sentDate: "2026-06-28",
    recipientsCount: 328,
    deliveryChannels: ["email", "push"],
  },
  {
    id: "log-3",
    title: "Welcome New Chapter Manager of Geneva",
    status: "Sent",
    body: "We are proud to announce Chantal Dubois as the joint Chapter Manager for Geneva. Feel free to connect during next week's Sunset Cocktail.",
    scope: "All Regions in Club",
    sentDate: "2026-06-30",
    recipientsCount: 740,
    deliveryChannels: ["push"],
  },
];

const NotificationsPage = () => {
  const [logs, setLogs] = useState<CampaignLog[]>(initialLogs);

  const handleDispatch = (data: NotificationFormData) => {
    const scopeLabels: Record<string, string> = {
      ONE_REGION: "One Region",
      ALL_REGIONS: "All Regions in Club",
      ALL_SWITZERLAND: "All Switzerland",
      INTERNATIONAL: "International",
    };

    const channels: ("email" | "push")[] = [];
    if (data.emailCampaign) channels.push("email");
    if (data.mobilePush) channels.push("push");

    const newLog: CampaignLog = {
      id: `log_${Date.now()}`,
      title: data.subjectTitle,
      status: "Sent",
      body: data.body,
      scope: scopeLabels[data.scope] || "One Region",
      sentDate: new Date().toISOString().split("T")[0],
      recipientsCount: Math.floor(Math.random() * 500) + 150,
      deliveryChannels: channels,
    };

    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <PageContainer
      title="Global Notifications"
      description="Compose platform-wide circulars, configure targeted push/email alerts, and review sent logs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Broadcast Command Center (7 cols) */}
        <div className="lg:col-span-7">
          <BroadcastCommandCenter onDispatch={handleDispatch} />
        </div>

        {/* Right Column: Campaign Logs (5 cols) */}
        <div className="lg:col-span-5">
          <CampaignLogs logs={logs} />
        </div>
      </div>
    </PageContainer>
  );
};

export default NotificationsPage;