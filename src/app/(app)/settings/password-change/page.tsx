"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, XCircle, CheckCircle2, KeyRound } from "lucide-react";

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const handleRotate = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-card-border/60 pb-4">
        <div>
          <h2 className="text-base font-bold text-title">
            Password Change Security
          </h2>
          <p className="text-xs text-description mt-0.5">
            Rotate your master terminal passkeys regularly to secure Canton rosters
          </p>
        </div>
        <Lock className="w-5 h-5 text-description/50" />
      </div>

      <form onSubmit={handleRotate} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-description mb-1">
                Current Secure Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-description/60 hover:text-title"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Master Password */}
            <div>
              <label className="block text-xs font-semibold text-description mb-1">
                New Master Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Specify strong 8+ character password"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono placeholder:text-description/40 focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-description/60 hover:text-title"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-description mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat strong password choice"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono placeholder:text-description/40 focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-description/60 hover:text-title"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Rotate Master Password</span>
              </button>
            </div>
          </div>

          {/* Right Security Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="bg-sidebar/60 border border-card-border/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-title border-b border-card-border/60 pb-3">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>SWISS SECURITY STANDARDS</span>
              </div>

              {/* Password strength */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-description/80">Current Passkey Strength:</span>
                  <strong className="text-title font-mono">
                    {newPassword ? (hasMinLength && hasNumber && hasSpecialChar ? "Strong" : "Weak") : "Empty"}
                  </strong>
                </div>
                <div className="w-full h-1.5 bg-sidebar rounded-full overflow-hidden border border-card-border/40">
                  <div
                    className={`h-full transition-all duration-300 ${
                      !newPassword
                        ? "w-0"
                        : hasMinLength && hasNumber && hasSpecialChar
                        ? "w-full bg-emerald-400"
                        : "w-1/3 bg-amber-400"
                    }`}
                  />
                </div>
              </div>

              {/* Requirements checklist */}
              <div className="space-y-2 text-xs">
                <p className="font-semibold text-title text-[11px]">
                  Minimum requirements checklist:
                </p>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-center gap-2">
                    {hasMinLength ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-400/80 shrink-0" />
                    )}
                    <span className={hasMinLength ? "text-title" : "text-description/70"}>
                      Contains at least 8 characters
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {hasNumber ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-400/80 shrink-0" />
                    )}
                    <span className={hasNumber ? "text-title" : "text-description/70"}>
                      Contains at least one number (0-9)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {hasSpecialChar ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-400/80 shrink-0" />
                    )}
                    <span className={hasSpecialChar ? "text-title" : "text-description/70"}>
                      Contains one special character (!@#$%^&*)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Note Box */}
              <p className="text-[11px] text-description/70 bg-sidebar/80 p-3 rounded-xl border border-card-border/40 leading-relaxed">
                All terminal secrets are hashed using PBKDF2 cryptography algorithms with dynamic salts before sync across local canton nodes.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangePage;