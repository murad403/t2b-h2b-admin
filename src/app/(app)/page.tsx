"use client";
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import StatsCard from "@/components/shared/StatsCard";
import RevenueTrend from "@/components/overview/RevenueTrend";
import TopRegionsRevenue from "@/components/overview/TopRegionsRevenue";
import RecentActivity from "@/components/overview/RecentActivity";
import MembershipDistribution from "@/components/overview/MembershipDistribution";
import ClubLevelComparison from "@/components/overview/ClubLevelComparison";
import { Users, UserCheck, CreditCard, Globe, Calendar, Clock } from "lucide-react";

const DashboardPage = () => {
  const [selectedClub, setSelectedClub] = useState<"all clubs" | "t2b" | "h2b">("all clubs");

  const headerActions = (
    <div className="flex items-center bg-[#0B0E17] p-1 rounded-lg border border-card-border">
      {
        ["all clubs", "t2b", "h2b"].map((tab: string, index: number) =>
          <button
            key={index}
            onClick={() => setSelectedClub(tab as "all clubs" | "t2b" | "h2b")}
            className={`px-3 py-1.5 rounded text-xs font-bold cursor-pointer transition-all ${selectedClub === tab
              ? "bg-card-border text-[#C6F135] shadow-sm border border-[#C6F135]/30"
              : "text-description hover:text-title"
              }`}
          >
            {tab.toUpperCase()}
          </button>
        )
      }
    </div>
  );

  return (
    <PageContainer
      title="Dashboard"
      description="Platform Overview · T2B & H2B Swiss Clubs"
      actions={headerActions}
    >
      <div className="space-y-6">
        {/* Top 6 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatsCard
            title="TOTAL MEMBERS"
            value="8"
            trend="+12%"
            subtitle="Active Swiss networkers"
            icon={Users}
          />
          <StatsCard
            title="GUESTS (MTD)"
            value="3"
            trend="+4%"
            subtitle="Corporate prospects"
            icon={UserCheck}
          />
          <StatsCard
            title="REVENUE (MTD)"
            value="CHF 21,800"
            trend="+8%"
            subtitle="Paid fees in Switzerland"
            icon={CreditCard}
          />
          <StatsCard
            title="ACTIVE REGIONS"
            value="6"
            trend="Stable"
            trendType="neutral"
            subtitle="Swiss cities active"
            icon={Globe}
          />
          <StatsCard
            title="UPCOMING EVENTS"
            value="3"
            trend="+2 new"
            subtitle="Scheduled next 30 days"
            icon={Calendar}
          />
          <StatsCard
            title="PENDING APPROVALS"
            value="1"
            trend="Needs Review"
            trendType="warning"
            subtitle="Members awaiting boarding"
            icon={Clock}
          />
        </div>

        {/* Middle Section: Revenue Trend & Top Regions + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueTrend />
          </div>
          <div className="space-y-6 flex flex-col justify-between">
            <TopRegionsRevenue />
            <RecentActivity />
          </div>
        </div>

        {/* Bottom Section: Membership Distribution & Club Level Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MembershipDistribution />
          <ClubLevelComparison />
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;