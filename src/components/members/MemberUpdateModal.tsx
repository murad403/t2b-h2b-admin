"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Member } from "@/types/member";
import { updateMemberSchema, MemberFormData } from "@/validation/app.validation";
export type { MemberFormData };

interface MemberUpdateModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onSave: (data: MemberFormData, memberId?: string) => void;
}

const MemberUpdateModal: React.FC<MemberUpdateModalProps> = ({
  isOpen,
  member,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      name: "",
      club: "T2B",
      company: "",
      title: "",
      email: "",
      phone: "",
      region: "Zurich",
      tier: "VIP",
      status: "ACTIVE",
      notes: "",
    },
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        club: member.club,
        company: member.company,
        title: member.title,
        email: member.email,
        phone: member.phone,
        region: member.region,
        tier: member.tier,
        status: member.status,
        notes: member.notes || "",
      });
    } else {
      reset({
        name: "",
        club: "T2B",
        company: "",
        title: "",
        email: "",
        phone: "",
        region: "Zurich",
        tier: "VIP",
        status: "ACTIVE",
        notes: "",
      });
    }
  }, [member, reset, isOpen]);

  if (!isOpen) return null;

  const onSubmit = (data: MemberFormData) => {
    onSave(data, member?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto select-none">
      <div className="bg-card border border-card-border rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] flex flex-col justify-between">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-card-border/60 pb-4">
          <h2 className="text-base font-bold text-title">
            {member ? "Update Delegate Credentials" : "Enroll New Swiss Delegate"}
          </h2>
          <button
            onClick={onClose}
            className="text-description hover:text-title p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 overflow-y-auto pr-1">
          {/* Row 1: Full Name & Swiss Club */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Ahsanul Haque"
                {...register("name")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors"
              />
              {errors.name && (
                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Swiss Club Association *
              </label>
              <select
                {...register("club")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
              >
                <option value="T2B">Tennis To Business (T2B)</option>
                <option value="H2B">Hockey To Business (H2B)</option>
              </select>
              {errors.club && (
                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                  {errors.club.message}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Company & Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Company / Organization *
              </label>
              <input
                type="text"
                placeholder="e.g. UBS Switzerland"
                {...register("company")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors"
              />
              {errors.company && (
                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                  {errors.company.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Professional Designation *
              </label>
              <input
                type="text"
                placeholder="e.g. Managing Director"
                {...register("title")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors"
              />
              {errors.title && (
                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>

          {/* Row 3: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Business Email *
              </label>
              <input
                type="email"
                placeholder="e.g. m.keller@ubs.ch"
                {...register("email")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors"
              />
              {errors.email && (
                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Mobile Hotline *
              </label>
              <input
                type="text"
                placeholder="+41 44....."
                {...register("phone")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors"
              />
              {errors.phone && (
                <span className="text-[10px] text-red-400 font-medium mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* Row 4: Region, Tier, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Home Canton/Region *
              </label>
              <select
                {...register("region")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
              >
                <option value="Zurich">Zurich</option>
                <option value="Lugano">Lugano</option>
                <option value="Geneva">Geneva</option>
                <option value="Bern">Bern</option>
                <option value="Lausanne">Lausanne</option>
                <option value="Basel">Basel</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Membership Tier *
              </label>
              <select
                {...register("tier")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
              >
                <option value="VIP">VIP Level</option>
                <option value="PREMIUM">Premium Level</option>
                <option value="GOLD">Gold Level</option>
                <option value="PARTNER">Partner Level</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-description mb-1">
                Account Status *
              </label>
              <select
                {...register("status")}
                className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
              >
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
                <option value="FLAGGED">Flagged</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>

          {/* Row 5: Notes */}
          <div>
            <label className="block text-[11px] font-semibold text-description mb-1">
              Administrative Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. key shareholder, sport preference, special invitation codes..."
              {...register("notes")}
              className="w-full px-3 py-2 bg-sidebar border border-card-border rounded-lg text-xs text-title placeholder:text-description/60 focus:outline-none focus:border-primary/60 transition-colors resize-none"
            ></textarea>
          </div>

          {/* Form Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border/60">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-sidebar border border-card-border text-title text-xs font-semibold hover:bg-card-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
            >
              {member ? "Confirm Enrollment" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberUpdateModal;