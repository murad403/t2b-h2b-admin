import { MemberStatus, MemberTier } from "@/types/member";

export const getTierBadge = (tier: MemberTier) => {
    switch (tier) {
        case "VIP":
            return (
                <span className="bg-[#182218] text-primary border border-primary/30 text-[9px] font-bold px-2 py-0.5 rounded">
                    VIP
                </span>
            );
        case "PREMIUM":
            return (
                <span className="bg-[#0F2238] text-sky-400 border border-sky-500/30 text-[9px] font-bold px-2 py-0.5 rounded">
                    PREMIUM
                </span>
            );
        case "PARTNER":
            return (
                <span className="bg-[#0D281E] text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 rounded">
                    PARTNER
                </span>
            );
        case "GOLD":
            return (
                <span className="bg-[#2A200F] text-amber-400 border border-amber-500/30 text-[9px] font-bold px-2 py-0.5 rounded">
                    GOLD
                </span>
            );
        default:
            return null;
    }
};

export const getStatusBadge = (status: MemberStatus) => {
    switch (status) {
        case "ACTIVE":
            return (
                <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    ACTIVE
                </span>
            );
        case "PENDING":
            return (
                <span className="bg-amber-950/80 text-amber-400 border border-amber-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    PENDING
                </span>
            );
        case "SUSPENDED":
            return (
                <span className="bg-gray-900 text-gray-400 border border-gray-600/30 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    SUSPENDED
                </span>
            );
        case "FLAGGED":
            return (
                <span className="bg-red-950/80 text-red-400 border border-red-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    FLAGGED
                </span>
            );
        default:
            return null;
    }
};

export const getClubBoundsBadge = (bounds: string) => {
    switch (bounds) {
        case "T2B":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1B291A] border border-[#2B4524] text-[#86EFAC]">
                    <span className="w-2 h-2 rounded-full bg-[#C6F135]" />
                    T2B
                </span>
            );
        case "H2B":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#132738] border border-[#1E4061] text-[#93C5FD]">
                    <span className="text-[10px]">🏒</span>
                    H2B
                </span>
            );
        case "COMBINED":
        default:
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1F2430] border border-[#333D52] text-title/90">
                    <span className="w-2 h-2 rounded-full bg-[#C6F135]" />
                    <span className="text-description">+</span>
                    <span className="text-[10px]">🏒</span>
                    <span className="text-[10px] font-extrabold tracking-wider text-description/90">
                        COMBINED
                    </span>
                </span>
            );
    }
};


export const getClubScopeBadge = (scope: string) => {
    switch (scope) {
        case "T2B":
            return (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1B291A] border border-[#2B4524] text-[#86EFAC]">
                    T2B
                </span>
            );
        case "H2B":
            return (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#132738] border border-[#1E4061] text-[#93C5FD]">
                    H2B
                </span>
            );
        case "COMBINED":
        default:
            return (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1F2430] border border-[#333D52] text-title/90">
                    COMBINED
                </span>
            );
    }
};