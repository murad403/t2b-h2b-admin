"use client";

import { useState } from "react";
import { Shield, Info } from "lucide-react";

interface PermissionItem {
  id: string;
  title: string;
  description: string;
  hasInfo?: boolean;
  enabled: boolean;
}

const initialPermissions: PermissionItem[] = [
  {
    id: "edit_profiles",
    title: "Can Edit Delegate Profiles",
    description: "Allow user to update member notes, email, and canton roster assignments locally",
    enabled: true,
  },
  {
    id: "schedule_events",
    title: "Can Schedule & Edit Canton Events",
    description: "Allow scheduled matching tournaments or regional CEO dinners within authorized Cantons",
    enabled: true,
  },
  {
    id: "delete_events",
    title: "Can Cancel & Delete Canton Events",
    description: "Permit permanent cancellation of matches or events. Overrides general safeguard guidelines.",
    hasInfo: true,
    enabled: true,
  },
  {
    id: "refund_ops",
    title: "Can Process Refund Operations",
    description: "Grant users access to directly trigger SIX transaction credit reversals. High-risk operational item.",
    hasInfo: true,
    enabled: true,
  },
  {
    id: "broadcast_alerts",
    title: "Can Broadcast National Alerts",
    description: "Allow users to compose push/email alerts going beyond single canton scopes",
    enabled: true,
  },
  {
    id: "modify_gateways",
    title: "Can Modify Payment Gateways",
    description: "Reconfigure global SIX credit card parameters and custom TWINT merchant credentials",
    enabled: true,
  },
  {
    id: "edit_legal",
    title: "Can Edit Legal Terms & Privacy Documents",
    description: "Alter national privacy guidelines and terms of service draft versionings",
    enabled: true,
  },
];

const RolesPermissionsPage = () => {
  const [selectedRole, setSelectedRole] = useState("SUPER_ADMIN");
  const [permissions, setPermissions] = useState<PermissionItem[]>(initialPermissions);

  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-card-border/60 pb-4">
        <div>
          <h2 className="text-base font-bold text-title">
            Roles &amp; Permission Presets
          </h2>
          <p className="text-xs text-description mt-0.5">
            Control access rights for different user tiers across both clubs
          </p>
        </div>
        <Shield className="w-5 h-5 text-description/50" />
      </div>

      {/* Role Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-sidebar border border-card-border rounded-xl">
        {[
          { id: "SUPER_ADMIN", label: "Super Admin" },
          { id: "REGIONAL_MANAGER", label: "Regional Manager" },
          { id: "CLUB_REP", label: "Club Representative" },
          { id: "STANDARD_DELEGATE", label: "Standard Delegate" },
        ].map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedRole(role.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedRole === role.id
                ? "bg-[#202D15] text-primary border border-primary/40 shadow-xs"
                : "text-description hover:text-title hover:bg-card-border/40"
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Permissions List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-card-border/60 pb-3">
            <h3 className="text-xs font-bold text-title tracking-wider uppercase">
              ACTIVE PERMISSIONS FOR &quot;{selectedRole.replace("_", " ")}&quot;
            </h3>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-primary/10 border border-primary/20 text-primary uppercase">
              IMMUTABLE FULL CONTROL
            </span>
          </div>

          <div className="space-y-3">
            {permissions.map((perm) => (
              <div
                key={perm.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-sidebar/50 border border-card-border/60 hover:border-card-border transition-colors gap-4"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-title">
                    <span>{perm.title}</span>
                    {perm.hasInfo && <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-description/80 leading-relaxed">
                    {perm.description}
                  </p>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => togglePermission(perm.id)}
                  className="cursor-pointer select-none shrink-0"
                >
                  <div
                    className={`w-11 h-6 rounded-full p-1 transition-colors relative ${
                      perm.enabled ? "bg-primary" : "bg-[#334155]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-transform ${
                        perm.enabled ? "translate-x-5 bg-bg-dark" : "translate-x-0 bg-[#94A3B8]"
                      }`}
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Roster Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="bg-sidebar/60 border border-card-border/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-[10px] font-bold text-description tracking-wider uppercase border-b border-card-border/60 pb-3">
              ROSTER WITH &quot;SUPER ADMIN&quot; ROLE
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-sidebar border border-card-border/80 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-title">Hans-Peter (You)</p>
                  <p className="text-[11px] text-description/70 font-mono mt-0.5">
                    Jurisdiction:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary font-mono">Zurich HQ</span>
              </div>

              <div className="p-3 rounded-xl bg-sidebar border border-card-border/80 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-title">Dr. Urs Widmer</p>
                  <p className="text-[11px] text-description/70 font-mono mt-0.5">
                    Jurisdiction:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary font-mono">Bern HQ</span>
              </div>
            </div>

            {/* Note box */}
            <p className="text-[11px] text-description/70 bg-sidebar/80 p-3 rounded-xl border border-card-border/40 leading-relaxed">
              Note: To upgrade a specific delegate profile&apos;s role or assign them to a Canton chapter, navigate to the Members or Regional Managers screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionsPage;