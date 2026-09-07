"use client";

import React, { useState, useMemo } from "react";
import { Search, DollarSign, CreditCard, Ticket, Clock } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import StatsCard from "@/components/shared/StatsCard";
import PaymentsTable from "@/components/payments/PaymentsTable";
import ReceiptModal from "@/components/payments/ReceiptModal";
import RefundModal from "@/components/payments/RefundModal";
import { PaymentTransaction } from "@/types/payment";

const initialTransactions: PaymentTransaction[] = [
  {
    id: "T2B-9842",
    payerName: "Marc Keller",
    payerEmail: "m.keller@ubs.ch",
    clubScope: "T2B",
    category: "Membership",
    amount: 3500,
    paymentDate: "2026-06-28",
    status: "PAID",
    method: "Credit Card",
    cantonRegion: "Zurich",
  },
  {
    id: "H2B-1294",
    payerName: "Sarah Tschudi",
    payerEmail: "sarah.tschudi@zurich.ch",
    clubScope: "H2B",
    category: "Membership",
    amount: 2400,
    paymentDate: "2026-06-25",
    status: "PAID",
    method: "Bank Transfer",
    cantonRegion: "Zurich",
  },
  {
    id: "T2B-1082",
    payerName: "Michael Favre",
    payerEmail: "mfavre@pictet.com",
    clubScope: "T2B",
    category: "Membership",
    amount: 5000,
    paymentDate: "2026-06-20",
    status: "PAID",
    method: "Bank Transfer",
    cantonRegion: "Geneva",
  },
  {
    id: "T2B-3914",
    payerName: "Chantal Moreau",
    payerEmail: "chantal.moreau@nestle.com",
    clubScope: "T2B",
    category: "Membership",
    amount: 3500,
    paymentDate: "2026-06-15",
    status: "PAID",
    method: "Credit Card",
    cantonRegion: "Lausanne",
  },
  {
    id: "H2B-4519",
    payerName: "Anna Bieri",
    payerEmail: "anna.bieri@swisscom.ch",
    clubScope: "H2B",
    category: "Membership",
    amount: 2400,
    paymentDate: "2026-06-10",
    status: "PAID",
    method: "TWINT",
    cantonRegion: "Bern",
  },
  {
    id: "T2B-7832",
    payerName: "Stefano Corti",
    payerEmail: "stefano.corti@bsi.ch",
    clubScope: "T2B",
    category: "Membership",
    amount: 1500,
    paymentDate: "2026-06-05",
    status: "PENDING",
    method: "PayPal",
    cantonRegion: "Lugano",
  },
  {
    id: "H2B-8912",
    payerName: "Urs Giger",
    payerEmail: "urs.giger@roche.com",
    clubScope: "H2B",
    category: "Membership",
    amount: 1500,
    paymentDate: "2026-05-20",
    status: "REFUNDED",
    method: "Bank Transfer",
    cantonRegion: "Basel",
  },
  {
    id: "T2B-9021",
    payerName: "Pascal Luginbühl",
    payerEmail: "p.luginbuhl@tagheuer.ch",
    clubScope: "T2B",
    category: "Membership",
    amount: 5000,
    paymentDate: "2026-05-18",
    status: "PAID",
    method: "Credit Card",
    cantonRegion: "Zurich",
  },
];

const PaymentsPage = () => {
  const [transactions, setTransactions] =
    useState<PaymentTransaction[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState("ALL");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modal States
  const [viewingReceipt, setViewingReceipt] =
    useState<PaymentTransaction | null>(null);
  const [refundingTx, setRefundingTx] = useState<PaymentTransaction | null>(
    null
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.payerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.payerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClub =
        selectedClub === "ALL" || tx.clubScope === selectedClub;
      const matchesRegion =
        selectedRegion === "ALL" ||
        tx.cantonRegion.toLowerCase() === selectedRegion.toLowerCase();
      const matchesStatus =
        selectedStatus === "ALL" || tx.status === selectedStatus;

      return matchesSearch && matchesClub && matchesRegion && matchesStatus;
    });
  }, [transactions, searchQuery, selectedClub, selectedRegion, selectedStatus]);

  const handleConfirmRefund = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, status: "REFUNDED" } : t))
    );
  };

  return (
    <PageContainer
      title="Payments"
      description="Review executive dues, guest credentials, and Swiss bank/TWINT transaction histories"
    >
      {/* Top Stats Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="TOTAL CUMULATIVE REVENUE"
          value="CHF 21,800"
          valueColor="primary"
          subtitle="Aggregated Swiss ledger"
          icon={DollarSign}
        />
        <StatsCard
          title="MEMBERSHIP DUES"
          value="CHF 21,800"
          valueColor="title"
          subtitle="85% retention yield"
          icon={CreditCard}
        />
        <StatsCard
          title="GUEST & TOURNAMENT FEES"
          value="CHF 0"
          valueColor="title"
          subtitle="Ad-hoc networking entries"
          icon={Ticket}
        />
        <StatsCard
          title="PENDING ESCROWS"
          value="1 transactions"
          valueColor="warning"
          subtitle="Awaiting wire clearing"
          icon={Clock}
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-sidebar border border-card-border p-4 rounded-2xl space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-description/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, email..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Club Scope Filter */}
          <div>
            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
            >
              <option value="ALL">ALL CLUBS</option>
              <option value="T2B">Tennis To Business (T2B)</option>
              <option value="H2B">Hockey To Business (H2B)</option>
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
            >
              <option value="ALL">ALL REGIONS</option>
              <option value="Zurich">Zurich</option>
              <option value="Geneva">Geneva</option>
              <option value="Lausanne">Lausanne</option>
              <option value="Bern">Bern</option>
              <option value="Lugano">Lugano</option>
              <option value="Basel">Basel</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="PAID">PAID</option>
              <option value="PENDING">PENDING</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Payments Table */}
      <PaymentsTable
        transactions={filteredTransactions}
        onViewReceipt={(tx) => setViewingReceipt(tx)}
        onRefund={(tx) => setRefundingTx(tx)}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={!!viewingReceipt}
        transaction={viewingReceipt}
        onClose={() => setViewingReceipt(null)}
      />

      {/* Refund Modal */}
      <RefundModal
        isOpen={!!refundingTx}
        transaction={refundingTx}
        onClose={() => setRefundingTx(null)}
        onConfirmRefund={handleConfirmRefund}
      />
    </PageContainer>
  );
};

export default PaymentsPage;