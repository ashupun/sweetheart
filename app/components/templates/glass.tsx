"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "glass",
  name: "glass",
  description: "modern & sleek",
  vibe: "frosted elegance",
  previewBg: "#e0e7ff",
  previewAccent: "#6366f1",
  tags: ["minimal", "modern", "glass"],
};

export function Template({ profile, links, theme, showSocials }: TemplateProps) {
  return (
    <div 
      className="h-full overflow-y-auto scrollbar-hide pt-8 pb-6 px-4"
      style={{ background: `linear-gradient(160deg, ${theme.bg} 0%, ${theme.primary}20 50%, ${theme.secondary}15 100%)` }}
    >
      <div className="text-center font-sans">
        <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-6 border border-white/30 shadow-2xl mx-1">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white text-xl font-semibold shadow-lg rotate-3 hover:rotate-0 transition-transform"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
          >
            {profile?.displayName?.charAt(0) || "?"}
          </div>
          
          <h1 className="text-sm font-semibold mb-0.5" style={{ color: theme.secondary }}>
            {profile?.displayName || "your name"}
          </h1>
          <p className="text-[10px] opacity-60 mb-4 px-2 leading-relaxed" style={{ color: theme.secondary }}>
            {profile?.bio || "your bio"}
          </p>

          <div className="space-y-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="py-3 px-4 bg-white/30 backdrop-blur rounded-xl border border-white/20 hover:bg-white/40 transition-colors"
              >
                <span className="text-[11px] font-medium" style={{ color: theme.secondary }}>
                  {link.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[9px] mt-6 opacity-30" style={{ color: theme.secondary }}>
          sweethe.art
        </p>
      </div>
    </div>
  );
}
