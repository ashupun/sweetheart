"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "aesthetic",
  name: "aesthetic",
  description: "dreamy & ethereal",
  vibe: "✧ soft vibes ✧",
  previewBg: "#fdf2f8",
  previewAccent: "#ec4899",
  tags: ["aesthetic", "cute", "dreamy"],
};

export function Template({ profile, links, theme, showSocials }: TemplateProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide pt-10 pb-6 px-5 relative" style={{ backgroundColor: theme.bg }}>
      <div className="absolute top-6 left-3 w-28 h-28 rounded-full opacity-15 blur-3xl animate-pulse" style={{ backgroundColor: theme.primary }} />
      <div className="absolute bottom-12 right-2 w-24 h-24 rounded-full opacity-10 blur-3xl animate-pulse" style={{ backgroundColor: theme.secondary, animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: theme.primary }} />
      
      <div className="text-center relative z-10 font-sans">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 rounded-full blur-lg opacity-40" style={{ backgroundColor: theme.primary }} />
          <div
            className="relative w-[76px] h-[76px] rounded-full flex items-center justify-center text-white text-2xl font-light border-2 border-white/60 shadow-xl"
            style={{ background: `linear-gradient(145deg, ${theme.primary}, ${theme.secondary})` }}
          >
            {profile?.displayName?.charAt(0) || "?"}
          </div>
          <span className="absolute -top-0.5 -right-1 text-xs">✦</span>
          <span className="absolute -bottom-0.5 -left-1 text-xs">✦</span>
        </div>
        
        <h1 className="text-[15px] font-medium mb-0.5" style={{ color: theme.secondary }}>
          {profile?.displayName || "your name"}
        </h1>
        <p className="text-[10px] mb-1 opacity-70" style={{ color: theme.primary }}>
          @{profile?.username || "username"}
        </p>
        <p className="text-[10px] mb-5 opacity-50 italic px-4 leading-relaxed" style={{ color: theme.secondary }}>
          {profile?.bio || "・゚✧ dreaming ✧゚・"}
        </p>

        {showSocials && (
          <div className="flex justify-center gap-2 mb-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                style={{ backgroundColor: `${theme.primary}10` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary, opacity: 0.4 }} />
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2.5">
          {links.map((link) => (
            <div
              key={link.id}
              className="py-3 px-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm"
            >
              <span className="text-[11px]" style={{ color: theme.secondary }}>
                ♡ {link.title}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[9px] mt-8 opacity-30" style={{ color: theme.primary }}>
          ✦ sweethe.art ✦
        </p>
      </div>
    </div>
  );
}
