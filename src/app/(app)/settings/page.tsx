"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

const EditProfilePage = () => {
  const [name, setName] = useState("Hans-Peter");
  const [roleTitle, setRoleTitle] = useState("Super Admin");
  const [email, setEmail] = useState("hp.admin@t2b-h2b.ch");
  const [phone, setPhone] = useState("+41 44 200 11 22");
  const [hqCanton, setHqCanton] = useState("Geneva");
  const [bio, setBio] = useState(
    "Overseeing Swiss tennis and hockey business networks since 2024. Authority over canton operations and SIX TWINT integration nodes."
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save state feedback logic
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-card-border/60 pb-4">
        <div>
          <h2 className="text-base font-bold text-title">
            Edit Profile Credentials
          </h2>
          <p className="text-xs text-description mt-0.5">
            Modify your master account name, avatar styling, and contact details
          </p>
        </div>
        <User className="w-5 h-5 text-description/50" />
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Row 1: Name & Role Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  Official Role Title
                </label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  Master Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-description mb-1">
                  Direct Phone Link
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-mono focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>
            </div>

            {/* Row 3: HQ Canton Base */}
            <div>
              <label className="block text-xs font-semibold text-description mb-1">
                HQ Canton Base
              </label>
              <select
                value={hqCanton}
                onChange={(e) => setHqCanton(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
              >
                <option value="Geneva">Geneva</option>
                <option value="Zurich">Zurich</option>
                <option value="Bern">Bern</option>
                <option value="Lausanne">Lausanne</option>
                <option value="Basel">Basel</option>
              </select>
            </div>

            {/* Row 4: User Bio & Authority Bounds */}
            <div>
              <label className="block text-xs font-semibold text-description mb-1">
                User Bio & Authority Bounds
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title focus:outline-none focus:border-primary/60 transition-colors resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Right Live Preview Context (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <h3 className="text-[10px] font-bold tracking-wider text-description uppercase">
              LIVE PREVIEW CONTEXT
            </h3>
            <div className="bg-sidebar/60 border border-card-border/80 rounded-2xl p-5 space-y-4">
              {/* Avatar + Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full bg-[#1F2E14] border-2 border-primary text-primary flex items-center justify-center font-extrabold text-base shadow-md shrink-0">
                  HA
                </div>
                <div>
                  <h4 className="font-bold text-title text-sm">{name}</h4>
                  <p className="text-xs font-bold text-primary mt-0.5">
                    {roleTitle}
                  </p>
                </div>
              </div>

              {/* Contact list */}
              <div className="space-y-2 text-xs text-description/80 pt-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-description/60 shrink-0" />
                  <span className="font-mono text-[11px]">{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-description/60 shrink-0" />
                  <span className="font-mono text-[11px]">{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-description/60 shrink-0" />
                  <span>
                    HQ Base:{" "}
                    <strong className="text-title font-medium">
                      {hqCanton} Canton
                    </strong>
                  </span>
                </div>
              </div>

              {/* Bio quote */}
              <p className="text-xs text-description/80 italic bg-sidebar/80 p-3 rounded-xl border border-card-border/40 leading-relaxed">
                &quot;{bio}&quot;
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
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;