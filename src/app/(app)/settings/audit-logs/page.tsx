"use client";

import { useState } from "react";
import {
  Clock,
  Search,
  Download,
  Shield,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
} from "lucide-react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  adminRole: string;
  adminInitials: string;
  adminEmail: string;
  action: string;
  category: "AUTH" | "ROLES" | "CONFIG" | "EXPORT" | "SECURITY";
  targetScope: string;
  ipAddress: string;
  location: string;
  status: "SUCCESS" | "WARNING" | "FAILURE";
}

const initialAuditLogs: AuditLogEntry[] = [
  {
    id: "LOG-9942",
    timestamp: "2026-09-07 12:42:15 CEST",
    adminName: "Hans-Peter",
    adminRole: "Super Admin",
    adminInitials: "HA",
    adminEmail: "hp.admin@t2b-h2b.ch",
    action: "PASSWORD_ROTATE",
    category: "AUTH",
    targetScope: "Master Terminal Security",
    ipAddress: "185.220.101.4",
    location: "Zurich, CH",
    status: "SUCCESS",
  },
  {
    id: "LOG-9938",
    timestamp: "2026-09-07 10:15:30 CEST",
    adminName: "Hans-Peter",
    adminRole: "Super Admin",
    adminInitials: "HA",
    adminEmail: "hp.admin@t2b-h2b.ch",
    action: "LEGAL_TERMS_PUBLISH",
    category: "CONFIG",
    targetScope: "Privacy Policy Document v3.2.1",
    ipAddress: "185.220.101.4",
    location: "Zurich, CH",
    status: "SUCCESS",
  },
  {
    id: "LOG-9910",
    timestamp: "2026-09-06 18:04:12 CEST",
    adminName: "Dr. Urs Widmer",
    adminRole: "Regional Manager",
    adminInitials: "UW",
    adminEmail: "u.widmer@bern-admin.ch",
    action: "EXPORT_ROSTER_CSV",
    category: "EXPORT",
    targetScope: "Bern Canton Delegate Roster",
    ipAddress: "85.218.45.19",
    location: "Bern, CH",
    status: "SUCCESS",
  },
  {
    id: "LOG-9875",
    timestamp: "2026-09-06 14:22:00 CEST",
    adminName: "Beat Keller",
    adminRole: "Club Representative",
    adminInitials: "BK",
    adminEmail: "beat.keller@keller-law.ch",
    action: "FAILED_LOGIN_ATTEMPT",
    category: "SECURITY",
    targetScope: "TWINT Payment Gateway API",
    ipAddress: "178.197.202.8",
    location: "Zurich, CH",
    status: "WARNING",
  },
  {
    id: "LOG-9821",
    timestamp: "2026-09-05 09:30:45 CEST",
    adminName: "Hans-Peter",
    adminRole: "Super Admin",
    adminInitials: "HA",
    adminEmail: "hp.admin@t2b-h2b.ch",
    action: "UPDATE_ROLE_PERMISSIONS",
    category: "ROLES",
    targetScope: "Regional Manager Authority Preset",
    ipAddress: "185.220.101.4",
    location: "Zurich, CH",
    status: "SUCCESS",
  },
  {
    id: "LOG-9788",
    timestamp: "2026-09-04 16:11:02 CEST",
    adminName: "Genevieve Dubois",
    adminRole: "Regional Manager",
    adminInitials: "GD",
    adminEmail: "g.dubois@geneva-finance.ch",
    action: "UNAUTHORIZED_SCOPE_ACCESS",
    category: "SECURITY",
    targetScope: "Master SIX Merchant Secret",
    ipAddress: "194.230.145.2",
    location: "Geneva, CH",
    status: "FAILURE",
  },
];

const AuditLogsPage = () => {
  const [logs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredLogs = logs.filter((log) => {
    const matchesCategory =
      categoryFilter === "ALL" || log.category === categoryFilter;
    const matchesStatus =
      statusFilter === "ALL" || log.status === statusFilter;
    const matchesSearch =
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetScope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: AuditLogEntry["status"]) => {
    switch (status) {
      case "SUCCESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            SUCCESS
          </span>
        );
      case "WARNING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" />
            WARNING
          </span>
        );
      case "FAILURE":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3 h-3" />
            FAILURE
          </span>
        );
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Timestamp", "Admin", "Role", "Action", "Scope", "IP Address", "Status"];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.adminName,
      l.adminRole,
      l.action,
      l.targetScope,
      `${l.ipAddress} (${l.location})`,
      l.status,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `swiss_audit_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border/60 pb-4">
        <div>
          <h2 className="text-base font-bold text-title flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>System Audit Ledger</span>
          </h2>
          <p className="text-xs text-description mt-0.5">
            Track administrative actions, security credential changes, permissions modifications, and system events
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-sidebar border border-card-border hover:border-primary/60 text-xs font-semibold text-title hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Ledger CSV</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-description/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by administrator, action, scope, or IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="AUTH">Auth & Passwords</option>
            <option value="ROLES">Roles & Access</option>
            <option value="CONFIG">System Config</option>
            <option value="EXPORT">Data Exports</option>
            <option value="SECURITY">Security Alerts</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUCCESS">Success Only</option>
            <option value="WARNING">Warning Only</option>
            <option value="FAILURE">Failure Only</option>
          </select>
        </div>
      </div>

      {/* Table Roster */}
      <div className="overflow-x-auto border border-card-border rounded-xl bg-sidebar/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-card-border/80 bg-sidebar/80 text-[10px] font-bold text-description uppercase tracking-wider">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Administrator</th>
              <th className="py-3 px-4">Action Event</th>
              <th className="py-3 px-4">Target Scope</th>
              <th className="py-3 px-4">IP Address & Node</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border/40 text-xs">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-description">
                  No audit log entries matching current search criteria.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-sidebar/80 transition-colors"
                >
                  {/* Timestamp */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-description whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  {/* Administrator */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#1F2E14] border border-primary/50 text-primary font-bold text-[10px] flex items-center justify-center shrink-0">
                        {log.adminInitials}
                      </div>
                      <div>
                        <div className="font-bold text-title">{log.adminName}</div>
                        <div className="text-[10px] text-description">{log.adminRole}</div>
                      </div>
                    </div>
                  </td>

                  {/* Action Event */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-primary font-semibold whitespace-nowrap">
                    {log.action}
                  </td>

                  {/* Target Scope */}
                  <td className="py-3.5 px-4 text-title font-medium whitespace-nowrap">
                    {log.targetScope}
                  </td>

                  {/* IP Address */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-description whitespace-nowrap">
                    {log.ipAddress}{" "}
                    <span className="text-description/60">({log.location})</span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    {getStatusBadge(log.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between text-xs text-description pt-2">
        <span>
          Showing <strong className="text-title">{filteredLogs.length}</strong> of{" "}
          <strong className="text-title">{logs.length}</strong> recorded ledger events
        </span>
        <span className="font-mono text-[11px]">
          Node ID: <strong className="text-title">CH-ZRH-LEDBOUND-01</strong>
        </span>
      </div>
    </div>
  );
};

export default AuditLogsPage;