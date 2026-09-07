"use client";

import { useState } from "react";
import {
  Mail,
  Plus,
  Search,
  Trash2,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
  User,
  X,
} from "lucide-react";

interface Ticket {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  fullMessage: string;
  date: string;
  time: string;
  canton: string;
  status: "PENDING" | "REPLIED" | "CLOSED";
}

const initialTickets: Ticket[] = [
  {
    id: "TKT-8241",
    senderName: "Beat Keller",
    senderEmail: "beat.keller@keller-law.ch",
    subject: "TWINT payment issues for Zurich Summer Event",
    snippet:
      "Hello support, I tried to register for the upcoming Zurich Double Match event using TWINT but received a transaction timeout. The amount of...",
    fullMessage:
      "Hello support, I tried to register for the upcoming Zurich Double Match event using TWINT but received a transaction timeout. The amount of CHF 75 was deducted from my bank but the app does not show me as registered. Can you verify this from your ledger?",
    date: "01 Jul 2026",
    time: "14:32 CEST",
    canton: "Zurich",
    status: "PENDING",
  },
  {
    id: "TKT-8190",
    senderName: "Genevieve Dubois",
    senderEmail: "g.dubois@geneva-finance.ch",
    subject: "Double affiliation clearance request",
    snippet:
      "I am registered as both a Tennis (T2B) and Hockey (H2B) delegate under our corporate subscription. However, I can only see event feeds...",
    fullMessage:
      "I am registered as both a Tennis (T2B) and Hockey (H2B) delegate under our corporate subscription. However, I can only see event feeds for T2B. Could you please grant dual clearance for my account profile?",
    date: "28 Jun 2026",
    time: "09:15 CEST",
    canton: "Geneva",
    status: "REPLIED",
  },
  {
    id: "TKT-8104",
    senderName: "Dr. Marco Giger",
    senderEmail: "m.giger@stgallen-klinik.ch",
    subject: "Delegate list export permission",
    snippet:
      "Hello, as a Regional Representative, I need to export the St. Gallen club delegates roster to CSV for preparing print name-tags for the match...",
    fullMessage:
      "Hello, as a Regional Representative, I need to export the St. Gallen club delegates roster to CSV for preparing print name-tags for the upcoming regional meeting.",
    date: "25 Jun 2026",
    time: "16:45 CEST",
    canton: "St. Gallen",
    status: "CLOSED",
  },
  {
    id: "TKT-8055",
    senderName: "Sarah Meier",
    senderEmail: "sarah.meier@sg-bauburo.ch",
    subject: "Canton event scheduling question",
    snippet:
      "Can you clarify the deadline for scheduling our Canton CEO golf tournament? We are finalizing dates with the local club and need to...",
    fullMessage:
      "Can you clarify the deadline for scheduling our Canton CEO golf tournament? We are finalizing dates with the local club and need to know when the portal submission window closes.",
    date: "20 Jun 2026",
    time: "11:20 CEST",
    canton: "Aargau",
    status: "PENDING",
  },
];

const cannedReplies = [
  {
    label: "👤 SIX Refund Approved",
    text: "Dear Member, we have verified your TWINT transaction with SIX Payment Services. A full refund of CHF 75.00 has been dispatched to your original payment method.",
  },
  {
    label: "🔑 Dual Affiliation Cleared",
    text: "Hello, dual T2B & H2B affiliation rights have been granted for your account. You can now access both tennis and hockey network feeds.",
  },
  {
    label: "📜 Canton Roster Emailed",
    text: "Hello Dr., the requested Canton delegate roster CSV export has been securely generated and attached to this reply email.",
  },
];

const SupportMailReplyPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("TKT-8241");
  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING" | "REPLIED" | "CLOSED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [closeOnSend, setCloseOnSend] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // New mail state for compose modal
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const filteredTickets = tickets.filter((t) => {
    const matchesTab = activeTab === "ALL" || t.status === activeTab;
    const matchesSearch =
      t.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.canton.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCannedClick = (text: string) => {
    setReplyMessage(text);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, status: closeOnSend ? "CLOSED" : "REPLIED" }
          : t
      )
    );
    setReplyMessage("");
    setCloseOnSend(false);
  };

  const handleStatusChange = (newStatus: "PENDING" | "REPLIED" | "CLOSED") => {
    setTickets((prev) =>
      prev.map((t) => (t.id === selectedTicket.id ? { ...t, status: newStatus } : t))
    );
  };

  const handleDeleteTicket = () => {
    setTickets((prev) => prev.filter((t) => t.id !== selectedTicket.id));
    if (tickets.length > 1) {
      const remaining = tickets.filter((t) => t.id !== selectedTicket.id);
      setSelectedTicketId(remaining[0].id);
    }
  };

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject) return;

    const newTicket: Ticket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      senderName: composeTo.split("@")[0] || "Delegate Member",
      senderEmail: composeTo,
      subject: composeSubject,
      snippet: composeBody.slice(0, 100) + "...",
      fullMessage: composeBody,
      date: "Today",
      time: "Just now",
      canton: "Zurich",
      status: "REPLIED",
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicketId(newTicket.id);
    setIsComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            PENDING
          </span>
        );
      case "REPLIED":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            REPLIED
          </span>
        );
      case "CLOSED":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-500/10 text-slate-400 border border-slate-500/20">
            CLOSED
          </span>
        );
    }
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border/60 pb-4">
        <div>
          <h2 className="text-base font-bold text-title flex items-center gap-2">
            <span>Support Mail & Reply Center</span>
          </h2>
          <p className="text-xs text-description mt-0.5">
            Manage Swiss delegate inquiries, view incoming mail, and dispatch official administrator replies
          </p>
        </div>

        <button
          onClick={() => setIsComposeOpen(true)}
          className="px-4 py-2 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-3" />
          <span>Outbound Compose</span>
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search, Tabs & Mail Roster (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-description/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sender, mail, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-sidebar border border-card-border rounded-xl">
            {(["ALL", "PENDING", "REPLIED", "CLOSED"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                  activeTab === tab
                    ? "bg-card text-primary shadow-xs border border-card-border/80"
                    : "text-description hover:text-title"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Ticket List */}
          <div className="space-y-3 max-h-160 overflow-y-auto pr-1">
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center bg-sidebar/50 rounded-xl border border-card-border text-xs text-description">
                No support inquiries found matching filter.
              </div>
            ) : (
              filteredTickets.map((t) => {
                const isSelected = selectedTicket && selectedTicket.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 relative ${
                      isSelected
                        ? "bg-sidebar/90 border-primary/70 shadow-md ring-1 ring-primary/30"
                        : "bg-sidebar/40 border-card-border/70 hover:bg-sidebar/70 hover:border-card-border"
                    }`}
                  >
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-title">{t.senderName}</h4>
                      <span className="text-[10px] text-description font-mono">{t.date}</span>
                    </div>

                    {/* Email */}
                    <p className="text-[10px] font-mono text-description/70">{t.senderEmail}</p>

                    {/* Subject */}
                    <p className="text-xs font-semibold text-title leading-snug">{t.subject}</p>

                    {/* Snippet */}
                    <p className="text-[11px] text-description line-clamp-2 leading-relaxed">
                      {t.snippet}
                    </p>

                    {/* Footer tag bar */}
                    <div className="flex items-center justify-between pt-1 border-t border-card-border/40 text-[10px]">
                      <span className="text-description/80 font-medium">
                        Canton: <strong className="text-title">{t.canton}</strong>
                      </span>
                      {getStatusBadge(t.status)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Ticket Details & Reply Editor (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedTicket ? (
            <div className="bg-sidebar/60 border border-card-border rounded-2xl p-5 space-y-5">
              {/* Ticket Metadata Bar */}
              <div className="flex items-center justify-between border-b border-card-border/60 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-extrabold">
                    {selectedTicket.id}
                  </span>
                  <span className="text-xs font-mono text-description">
                    {selectedTicket.date} at {selectedTicket.time}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedTicket.status}
                    onChange={(e) =>
                      handleStatusChange(
                        e.target.value as "PENDING" | "REPLIED" | "CLOSED"
                      )
                    }
                    className="px-2.5 py-1 bg-sidebar border border-card-border rounded-lg text-xs font-semibold text-title focus:outline-none focus:border-primary/60 cursor-pointer"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="REPLIED">Replied</option>
                    <option value="CLOSED">Closed</option>
                  </select>

                  <button
                    onClick={handleDeleteTicket}
                    className="p-1.5 rounded-lg text-description hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                    title="Delete Ticket"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Ticket Title */}
              <h3 className="text-sm font-bold text-title">{selectedTicket.subject}</h3>

              {/* Inquiring Member Box */}
              <div className="p-3.5 rounded-xl bg-sidebar border border-card-border/60 space-y-2 text-xs">
                <p className="text-[10px] font-bold text-description uppercase tracking-wider">
                  INQUIRING MEMBER DETAILS:
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-title">{selectedTicket.senderName}</span>
                    <span className="text-description font-mono text-[11px] ml-2">
                      {selectedTicket.senderEmail}
                    </span>
                  </div>
                  <span className="text-description/90">
                    Swiss Canton Base: <strong className="text-title">{selectedTicket.canton}</strong>
                  </span>
                </div>
              </div>

              {/* Original Message Quote Box */}
              <div className="p-4 rounded-xl bg-card border border-card-border/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-description border-b border-card-border/40 pb-2">
                  <span className="flex items-center gap-1.5 font-semibold text-title">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    Original Message ({selectedTicket.senderName})
                  </span>
                  <span className="font-mono text-[10px]">{selectedTicket.date}</span>
                </div>
                <p className="text-xs text-description/90 leading-relaxed italic">
                  &quot;{selectedTicket.fullMessage}&quot;
                </p>
              </div>

              {/* Canned Replies */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-description uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3 text-primary" />
                  FAST CANNED REPLIES (CLICK TO AUTO-INSERT)
                </label>
                <div className="flex flex-wrap gap-2">
                  {cannedReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCannedClick(reply.text)}
                      className="px-3 py-1.5 rounded-xl bg-sidebar border border-card-border hover:border-primary/60 text-xs text-description hover:text-title transition-all cursor-pointer font-medium"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-4">
                <div>
                  <textarea
                    rows={5}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={`Type your reply to ${selectedTicket.senderName}...`}
                    className="w-full p-3.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors leading-relaxed resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-description">
                    <input
                      type="checkbox"
                      checked={closeOnSend}
                      onChange={(e) => setCloseOnSend(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-card-border bg-sidebar text-primary focus:ring-0 cursor-pointer"
                    />
                    <span>Close ticket without reply</span>
                  </label>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Official Dispatch</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-12 text-center bg-sidebar/40 rounded-2xl border border-card-border text-xs text-description">
              Select a support inquiry ticket from the left panel to inspect details and dispatch reply.
            </div>
          )}
        </div>
      </div>

      {/* Outbound Compose Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-card-border rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-card-border/60 pb-3">
              <h3 className="text-base font-bold text-title flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Outbound Support Dispatch
              </h3>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-1 rounded-lg text-description hover:text-title hover:bg-sidebar transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendCompose} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  Recipient Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. delegate@swiss-company.ch"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  required
                  placeholder="Official Notice / Response..."
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  Dispatch Message Body
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Type official Swiss T2B & H2B dispatch note..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full p-3.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors leading-relaxed resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-card-border/60">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-4 py-2 rounded-xl bg-sidebar border border-card-border text-xs font-semibold text-description hover:text-title transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportMailReplyPage;
