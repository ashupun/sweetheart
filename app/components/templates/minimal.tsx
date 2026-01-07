"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "minimal",
  name: "minimal",
  description: "clean & elegant",
  vibe: "less is more",
  previewBg: "#fafafa",
  previewAccent: "#171717",
  tags: ["minimal", "clean", "simple"],
};

export function Template({ profile, links, theme, showSocials }: TemplateProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide pt-14 pb-8 px-6" style={{ backgroundColor: theme.bg }}>
      <div className="text-center font-mono max-w-[220px] mx-auto">
        <div
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl font-light shadow-sm"
          style={{ backgroundColor: theme.primary }}
        >
          {profile?.displayName?.charAt(0) || "?"}
        </div>
        
        <h1 className="text-base font-medium tracking-tight mb-1" style={{ color: theme.secondary }}>
          {profile?.displayName || "your name"}
        </h1>
        <p className="text-[11px] opacity-50 leading-relaxed mb-8" style={{ color: theme.secondary }}>
          {profile?.bio || "your bio goes here"}
        </p>

        <div className="space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="py-3.5 px-4 bg-white/80 backdrop-blur-sm rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-[12px] tracking-wide" style={{ color: theme.secondary }}>
                {link.title}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[9px] mt-10 opacity-25 tracking-[0.2em] uppercase" style={{ color: theme.secondary }}>
          sweethe.art
        </p>
      </div>
    </div>
  );
}
