"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Building2, Globe2, Calendar, Layers, CreditCard, UserCheck, Bell, Newspaper, Settings, LogOut, ShieldCheck, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Members", href: "/members", icon: Users },
  { name: "Clubs", href: "/clubs", icon: Building2 },
  { name: "Regions", href: "/regions", icon: Globe2 },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Membership Plans", href: "/membership-plans", icon: Layers },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Regional Managers", href: "/regional-managers", icon: UserCheck },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "News", href: "/news", icon: Newspaper },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`w-64 bg-sidebar border-r border-card-border flex flex-col h-screen fixed md:sticky top-0 left-0 z-50 select-none transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Top Logo & Title */}
        <div className="p-5 flex items-center justify-between border-b border-card-border/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-bg-dark font-bold shadow-[0_0_15px_rgba(198,241,53,0.3)]">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-wide text-title">
                T2B & H2B
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                SUPER ADMIN
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-[#94A3B8] hover:text-title p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Menu Items */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${isActive
                    ? "bg-[#182218] text-primary shadow-inner border border-primary/20"
                    : "text-[#94A3B8] hover:text-title hover:bg-card"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-description"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-6">
            <Link
              href="/settings"
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${pathname === "/settings"
                  ? "bg-[#182218] text-primary border border-primary/20"
                  : "text-[#94A3B8] hover:text-title hover:bg-card"
                }`}
            >
              <Settings className="w-4 h-4 text-description" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-card-border bg-sidebar">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-card transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-card-border border border-primary/40 flex items-center justify-center text-[11px] font-bold text-primary">
                HP
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-title truncate leading-snug">
                  Hans-Peter
                </p>
                <p className="text-[9px] font-medium text-description tracking-wider uppercase truncate">
                  SWISS HQ DIRECTOR
                </p>
              </div>
            </div>
            <button className="text-description group-hover:text-title transition-colors p-1">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;