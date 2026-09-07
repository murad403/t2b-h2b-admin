"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Zap, AlertCircle } from "lucide-react";
import { signInSchema, SignInInput } from "@/validation/auth.validation";

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "hp.admin@t2b-h2b.ch",
      password: "SwissAdmin2026!#",
      rememberMe: true,
    },
  });

  const onSubmit = (data: SignInInput) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 600);
  };

  const handleQuickFill = () => {
    setValue("email", "hp.admin@t2b-h2b.ch", { shouldValidate: true });
    setValue("password", "SwissAdmin2026!#", { shouldValidate: true });
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-emerald-400 to-accent-h2b" />

      {/* Title & Subtitle */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h2 className="text-xl font-extrabold text-title tracking-tight">
          Sign In to Terminal
        </h2>
        <p className="text-xs text-description leading-relaxed">
          Enter your master credentials to access the Swiss T2B & H2B Super Admin console.
        </p>
      </div>


      {/* Sign In Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold text-description mb-1.5">
            Master Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-description/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              {...register("email")}
              placeholder="admin@t2b-h2b.ch"
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

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-description">
              Secure Passkey
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary hover:underline font-medium cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-description/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••••••"
              className={`w-full pl-10 pr-10 py-2.5 bg-sidebar border rounded-xl text-xs text-title font-mono placeholder:text-description/40 focus:outline-none transition-colors ${errors.password
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-card-border focus:border-primary/60 focus:ring-1 focus:ring-primary/40"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-description/60 hover:text-title cursor-pointer p-0.5"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.password.message}</span>
            </p>
          )}
        </div>

        {/* Session Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-description">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-3.5 h-3.5 rounded border-card-border bg-sidebar text-primary focus:ring-0 cursor-pointer"
            />
            <span>Remember session for 24 hours</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_16px_rgba(198,241,53,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
              Authenticating Terminal...
            </span>
          ) : (
            <>
              <span>Sign In to Terminal</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;

