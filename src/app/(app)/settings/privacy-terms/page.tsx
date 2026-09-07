"use client";

import { useState } from "react";
import { Globe, FileCheck } from "lucide-react";

const initialPrivacyDoc = `# Privacy Policy - T2B & H2B Switzerland
Last updated: June 30, 2026

We value your trust. This document outlines how Tennis to Business (T2B) and Hockey to Business (H2B) networks handle delegate records across Swiss Cantons.

1. Scope of Collection
We collect corporate details, membership level tiering, transaction history verified by SIX Payment Services, and Canton event participation statistics.

2. No Third-Party Selling
Delegate corporate telemetry is strictly bound within Switzerland clusters. No details are distributed to unapproved third parties.`;

const initialTermsDoc = `# Terms & Conditions - T2B & H2B Switzerland
Last updated: June 30, 2026

Welcome to the Swiss Executive Sports & Business Networking Network.

1. Membership Eligibility
Membership is restricted to corporate executives, business owners, and verified VIP delegates residing or operating in Swiss Cantons.

2. Match & Event Rules
All participants must adhere to Swiss fair play standards during CEO double matches and regional tournaments.`;

const PrivacyTermsPage = () => {
  const [activeTab, setActiveTab] = useState<"PRIVACY" | "TERMS">("PRIVACY");
  const [privacyDoc, setPrivacyDoc] = useState(initialPrivacyDoc);
  const [termsDoc, setTermsDoc] = useState(initialTermsDoc);
  const [versionId, setVersionId] = useState("v3.2.1-swiss");
  const [complianceContext, setComplianceContext] = useState(
    "EU GDPR & Swiss FADP (June 2026)"
  );

  const currentDoc = activeTab === "PRIVACY" ? privacyDoc : termsDoc;
  const setCurrentDoc = (val: string) => {
    if (activeTab === "PRIVACY") setPrivacyDoc(val);
    else setTermsDoc(val);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-card-border/60 pb-4">
        <div>
          <h2 className="text-base font-bold text-title">
            Privacy &amp; Terms Policy Suite
          </h2>
          <p className="text-xs text-description mt-0.5">
            Edit regulatory documents shown to corporate T2B &amp; H2B members
          </p>
        </div>
        <Globe className="w-5 h-5 text-description/50" />
      </div>

      {/* Document Selector Tabs */}
      <div className="flex gap-3 border-b border-card-border/60 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("PRIVACY")}
          className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "PRIVACY"
              ? "border-primary text-primary"
              : "border-transparent text-description hover:text-title"
          }`}
        >
          Privacy Policy Document
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("TERMS")}
          className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "TERMS"
              ? "border-primary text-primary"
              : "border-transparent text-description hover:text-title"
          }`}
        >
          Terms &amp; Conditions Document
        </button>
      </div>

      <form onSubmit={handlePublish} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Editor Area (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-title tracking-wider uppercase">
                {activeTab === "PRIVACY" ? "PRIVACY POLICY DRAFT" : "TERMS & CONDITIONS DRAFT"}
              </h3>
              <span className="text-[11px] font-mono text-description/70">
                Character Count: {currentDoc.length}
              </span>
            </div>

            <textarea
              value={currentDoc}
              onChange={(e) => setCurrentDoc(e.target.value)}
              rows={10}
              className="w-full px-3.5 py-3 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono placeholder:text-description/40 focus:outline-none focus:border-primary/60 transition-colors leading-relaxed resize-none"
            />

            {/* Version & Context inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  Canton Suite Version ID
                </label>
                <input
                  type="text"
                  value={versionId}
                  onChange={(e) => setVersionId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  Compliance Context
                </label>
                <input
                  type="text"
                  value={complianceContext}
                  onChange={(e) => setComplianceContext(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Right Mobile Sandbox Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-description uppercase">
              <span>MOBILE SANDBOX PREVIEW</span>
            </div>

            <div className="bg-sidebar/80 border border-card-border/80 rounded-2xl p-4 space-y-3 relative">
              {/* Phone Status Bar Mockup */}
              <div className="flex items-center justify-between text-[10px] font-mono text-description/70 border-b border-card-border/50 pb-2">
                <span className="font-extrabold text-title/80">SWISS T2B/H2B APP</span>
                <span className="px-1.5 py-0.5 rounded bg-card border border-card-border text-[9px]">
                  {versionId}
                </span>
              </div>

              {/* Render Preview Document */}
              <div className="bg-[#0F1623] border border-card-border/60 rounded-xl p-4 text-[11px] leading-relaxed text-title/90 font-sans space-y-2 max-h-72 overflow-y-auto">
                {currentDoc.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("# ")) {
                    return (
                      <h4 key={index} className="font-bold text-xs text-title border-b border-card-border/40 pb-1">
                        {paragraph.replace("# ", "")}
                      </h4>
                    );
                  }
                  return (
                    <p key={index} className="text-description/90 text-[11px]">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Note Box */}
              <p className="text-[10px] text-description/70 bg-sidebar/80 p-2.5 rounded-xl border border-card-border/40 leading-relaxed">
                Publishing compiles the Markdown payload into static JSON documents fetched immediately by delegates upon launching iOS or Android wrappers.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-4 border-t border-card-border/60">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>Publish Legal Documents</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivacyTermsPage;