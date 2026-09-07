"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Lock,
  Shield,
  Clock,
  Globe,
  Mail,
  ChevronRight,
} from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    name: "Edit Profile",
    href: "/settings",
    icon: User,
  },
  {
    name: "Password Change",
    href: "/settings/password-change",
    icon: Lock,
  },
  {
    name: "Roles & Permissions",
    href: "/settings/roles-ermissions",
    icon: Shield,
  },
  {
    name: "Audit Logs",
    href: "/settings/audit-logs",
    icon: Clock,
  },
  {
    name: "Privacy & Terms",
    href: "/settings/privacy-terms",
    icon: Globe,
  },
  {
    name: "Support Mail & Reply",
    href: "/settings/support-mail-reply",
    icon: Mail,
  },
];

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const syncStatusBadge = (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sidebar/80 border border-card-border text-xs font-mono text-description">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span>Sync Status: <strong className="text-title font-medium">Zurich Node Active</strong></span>
    </div>
  );

  return (
    <PageContainer
      title="System Settings"
      description="Configure edit profile settings, security password credentials, role authority, privacy terms, and audit ledgers."
      actions={syncStatusBadge}
    >
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Settings Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-card border border-card-border rounded-2xl p-3 shadow-xl space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/settings"
                  ? pathname === "/settings"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-[#202D15] border border-primary/60 text-primary font-bold shadow-xs"
                      : "text-description hover:text-title hover:bg-sidebar/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-description/70"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full min-w-0">{children}</div>
      </div>
    </PageContainer>
  );
};

export default SettingsLayout;
