"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import PlanCard from "@/components/membership-plans/PlanCard";
import AddPlanModal from "@/components/membership-plans/AddPlanModal";
import UpdatePlanModal from "@/components/membership-plans/UpdatePlanModal";
import { MembershipPlan, PlanFormData } from "@/types/membership-plan";

const initialPlans: MembershipPlan[] = [
  {
    id: "p1",
    name: "T2B Club Member",
    clubHost: "T2B",
    price: 1500,
    billingCycle: "Yearly",
    eventsAllowance: "up to 7/year",
    activeMembersCount: 215,
    features: [
      "Directory access",
      "Standard event tickets",
      "Local chapter forums",
      "T2B Member Pin",
    ],
    isArchived: false,
  },
  {
    id: "p2",
    name: "T2B Executive VIP",
    clubHost: "T2B",
    price: 3500,
    billingCycle: "Yearly",
    eventsAllowance: "Unlimited Access",
    activeMembersCount: 142,
    features: [
      "Directory access",
      "Priority RSVP for matches",
      "CEO Circle eligibility",
      "Private luxury suites",
      "Personal Chapter concierge",
    ],
    isArchived: false,
  },
  {
    id: "p3",
    name: "T2B Corporate Partner",
    clubHost: "T2B",
    price: 10000,
    billingCycle: "Yearly",
    eventsAllowance: "Corporate Team (5 Pax)",
    activeMembersCount: 55,
    features: [
      "Logo on court backdrops",
      "Full executive listings",
      "5 All-Access tickets",
      "Guaranteed slot in National Cup",
      "Feature article on Swiss News portal",
    ],
    isArchived: false,
  },
  {
    id: "p4",
    name: "H2B Club Member",
    clubHost: "H2B",
    price: 1500,
    billingCycle: "Yearly",
    eventsAllowance: "up to 7/year",
    activeMembersCount: 180,
    features: [
      "Directory access",
      "Standard match seats",
      "Local Hockey roundtables",
    ],
    isArchived: false,
  },
  {
    id: "p5",
    name: "H2B Platinum VIP",
    clubHost: "H2B",
    price: 3500,
    billingCycle: "Yearly",
    eventsAllowance: "Unlimited Access",
    activeMembersCount: 112,
    features: [
      "Directory access",
      "Elite Box VIP seating",
      "Exclusive roundtables",
      "National League Finals early pre-sale",
      "1-on-1 introductions with team chairmen",
    ],
    isArchived: false,
  },
];

const MembershipPlansPage = () => {
  const [plans, setPlans] = useState<MembershipPlan[]>(initialPlans);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);

  const handleAddPlan = (data: PlanFormData) => {
    const newPlan: MembershipPlan = {
      id: `p_${Date.now()}`,
      name: data.name,
      clubHost: data.clubHost,
      price: data.price,
      billingCycle: data.billingCycle,
      eventsAllowance: data.eventsAllowance,
      activeMembersCount: 0,
      features: data.features,
      isArchived: data.isArchived,
    };
    setPlans((prev) => [...prev, newPlan]);
  };

  const handleUpdatePlan = (planId: string, data: PlanFormData) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === planId) {
          return {
            ...p,
            name: data.name,
            clubHost: data.clubHost,
            price: data.price,
            billingCycle: data.billingCycle,
            eventsAllowance: data.eventsAllowance,
            features: data.features,
            isArchived: data.isArchived,
          };
        }
        return p;
      })
    );
  };

  const handleToggleArchive = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, isArchived: !p.isArchived } : p))
    );
  };

  const actions = (
    <button
      type="button"
      onClick={() => setIsAddModalOpen(true)}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
    >
      <Plus className="w-4 h-4 stroke-3" />
      Add Plan
    </button>
  );

  return (
    <PageContainer
      title="Membership Plans"
      description="Establish legal tiers, configure subscription billing parameters in CHF, and list features"
      actions={actions}
    >
      {/* Plans Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onConfigure={(p) => setEditingPlan(p)}
            onToggleArchive={handleToggleArchive}
          />
        ))}
      </div>

      {/* Add Plan Modal */}
      <AddPlanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPlan}
      />

      {/* Update Plan Modal */}
      <UpdatePlanModal
        isOpen={!!editingPlan}
        plan={editingPlan}
        onClose={() => setEditingPlan(null)}
        onUpdate={handleUpdatePlan}
      />
    </PageContainer>
  );
};

export default MembershipPlansPage;