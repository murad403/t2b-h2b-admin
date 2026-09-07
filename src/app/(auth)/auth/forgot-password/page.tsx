"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, Send, KeyRound, AlertCircle } from "lucide-react";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/validation/auth.validation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "hp.admin@t2b-h2b.ch",
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/verify-otp");
    }, 600);
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Decorative Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-emerald-400 to-accent-h2b" />

      {/* Header Icon & Title */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto sm:mx-0">
          <KeyRound className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-title tracking-tight">
            Forgot Master Passkey?
          </h2>
          <p className="text-xs text-description leading-relaxed mt-1">
            Enter your registered administrator email address to receive a 6-digit Swiss node OTP verification code.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-description mb-1.5">
            Registered Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-description/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              {...register("email")}
              placeholder="hp.admin@t2b-h2b.ch"
              className={`w-full pl-10 pr-3.5 py-2.5 bg-sidebar border rounded-xl text-xs text-title font-mono placeholder:text-description/40 focus:outline-none transition-colors ${errors.email
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-card-border focus:border-primary/60 focus:ring-1 focus:ring-primary/40"
                }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_16px_rgba(198,241,53,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
              Dispatching OTP Code...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Verification Code</span>
            </>
          )}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-card-border/60 flex items-center justify-center">
        <Link
          href="/auth/sign-in"
          className="inline-flex items-center gap-2 text-xs font-semibold text-description hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Terminal Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

