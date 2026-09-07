"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, CheckCircle2, XCircle, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { resetPasswordSchema, ResetPasswordInput } from "@/validation/auth.validation";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";

  const hasLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isMatching = newPassword.length > 0 && newPassword === confirmPassword;

  const onSubmit = (data: ResetPasswordInput) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 1500);
    }, 600);
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Decorative Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-emerald-400 to-accent-h2b" />

      {/* Header Icon & Title */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto sm:mx-0">
          <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-title tracking-tight">
            Reset Master Passkey
          </h2>
          <p className="text-xs text-description leading-relaxed mt-1">
            Specify a strong 8+ character password for your Swiss terminal account.
          </p>
        </div>
      </div>

      {isSuccess ? (
        <div className="p-6 text-center space-y-3 bg-sidebar/80 rounded-xl border border-primary/40 animate-in fade-in zoom-in-95">
          <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
          <h3 className="text-base font-bold text-title">Passkey Updated Successfully!</h3>
          <p className="text-xs text-description">
            Your master credentials have been rotated on the Zurich Node. Redirecting to sign in...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-description mb-1.5">
              New Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-description/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Specify strong 8+ character password"
                className={`w-full pl-10 pr-10 py-2.5 bg-sidebar border rounded-xl text-xs text-title font-mono placeholder:text-description/40 focus:outline-none transition-colors ${errors.password
                    ? "border-rose-500/80 focus:border-rose-500"
                    : "border-card-border focus:border-primary/60 focus:ring-1 focus:ring-primary/40"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-description/60 hover:text-title cursor-pointer p-0.5"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.password.message}</span>
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-description mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-description/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Repeat strong password choice"
                className={`w-full pl-10 pr-10 py-2.5 bg-sidebar border rounded-xl text-xs text-title font-mono placeholder:text-description/40 focus:outline-none transition-colors ${errors.confirmPassword
                    ? "border-rose-500/80 focus:border-rose-500"
                    : "border-card-border focus:border-primary/60 focus:ring-1 focus:ring-primary/40"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-description/60 hover:text-title cursor-pointer p-0.5"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.confirmPassword.message}</span>
              </p>
            )}
          </div>

          {/* Passkey Checklist */}
          <div className="p-3.5 rounded-xl bg-sidebar/60 border border-card-border/60 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-description uppercase tracking-wider block">
              SWISS PASSKEY REQUIREMENTS CHECKLIST:
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                {hasLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-description/40 shrink-0" />
                )}
                <span className={hasLength ? "text-title font-medium" : "text-description"}>
                  Contains at least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {hasNumber ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-description/40 shrink-0" />
                )}
                <span className={hasNumber ? "text-title font-medium" : "text-description"}>
                  Contains at least one number (0-9)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {hasSpecial ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-description/40 shrink-0" />
                )}
                <span className={hasSpecial ? "text-title font-medium" : "text-description"}>
                  Contains one special character (!@#$%^&*)
                </span>
              </div>
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  {isMatching ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                  <span className={isMatching ? "text-title font-medium" : "text-rose-400"}>
                    {isMatching ? "Passwords match" : "Passwords do not match"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_16px_rgba(198,241,53,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
                Encrypting & Updating Passkey...
              </span>
            ) : (
              <>
                <span>Rotate Master Password</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-card-border/60 flex items-center justify-center">
        <Link
          href="/auth/sign-in"
          className="text-xs font-semibold text-description hover:text-primary transition-colors cursor-pointer"
        >
          Cancel and return to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

