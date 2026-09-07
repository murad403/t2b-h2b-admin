"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { verifyOtpSchema, VerifyOtpInput } from "@/validation/auth.validation";

const VerifyOtpPage = () => {
  const router = useRouter();
  const [otpDigits, setOtpDigits] = useState<string[]>(["8", "2", "4", "1", "0", "9"]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { handleSubmit, setValue, formState: { errors } } = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "824109",
    },
  });

  useEffect(() => {
    setValue("otp", otpDigits.join(""), { shouldValidate: true });
  }, [otpDigits, setValue]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    // Auto-advance focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = (data: VerifyOtpInput) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/reset-password");
    }, 600);
  };

  const handleResend = () => {
    setOtpDigits(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
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
            Verify Security OTP
          </h2>
          <p className="text-xs text-description leading-relaxed mt-1">
            We have sent a 6-digit cryptographic passcode to{" "}
            <strong className="text-title font-mono">hp.admin@t2b-h2b.ch</strong>
          </p>
        </div>
      </div>

      {/* OTP Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-description mb-3 text-center">
            6-Digit Security Token
          </label>
          <div className="flex items-center justify-between gap-2">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-11 h-12 text-center bg-sidebar border rounded-xl text-base font-extrabold font-mono text-primary focus:outline-none transition-colors ${errors.otp
                    ? "border-rose-500"
                    : "border-card-border focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-[11px] text-rose-400 mt-2 text-center flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.otp.message}</span>
            </p>
          )}
        </div>

        {/* Resend Link */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-description">Didn&apos;t receive code?</span>
          <button
            type="button"
            onClick={handleResend}
            className="text-primary hover:underline font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resend OTP Code</span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || otpDigits.join("").length < 6}
          className="w-full py-3 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_16px_rgba(198,241,53,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
              Verifying Security Token...
            </span>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify Code & Continue</span>
            </>
          )}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-card-border/60 flex items-center justify-center">
        <Link
          href="/auth/forgot-password"
          className="inline-flex items-center gap-2 text-xs font-semibold text-description hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Email Address</span>
        </Link>
      </div>
    </div>
  );
};

export default VerifyOtpPage;

