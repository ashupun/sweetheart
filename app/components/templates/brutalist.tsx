"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "brutalist",
  name: "brutalist",
  description: "bold & raw",
  vibe: "NO RULES",
  previewBg: "#ffffff",
  previewAccent: "#000000",
  tags: ["minimal", "bold", "edgy"],
};

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide pt-10 pb-6 px-4 bg-white">
      <div className="text-center font-mono">
        <div
          className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-2xl font-black"
          style={{ 
            border: `4px solid ${theme.primary}`,
            color: theme.primary,
          }}
        >
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>
        
        <h1 className="text-lg font-black uppercase tracking-tight text-black mb-0.5">
          {profile?.displayName || "YOUR NAME"}
        </h1>
        <p className="text-[9px] uppercase tracking-[0.25em] mb-6" style={{ color: theme.primary }}>
          {profile?.bio || "YOUR BIO HERE"}
        </p>

        <div className="space-y-2">
          {links.map((link, i) => (
            <div
              key={link.id}
              className="py-3.5 px-4 text-left hover:translate-x-1 hover:-translate-y-1 transition-transform cursor-pointer"
              style={{ 
                border: "3px solid black",
                backgroundColor: i % 2 === 0 ? theme.bg : "white",
                boxShadow: "3px 3px 0 black",
              }}
            >
              <span className="text-[11px] font-black uppercase tracking-wide text-black">
                {link.title} →
              </span>
            </div>
          ))}
        </div>

        <p className="text-[9px] mt-8 font-black uppercase tracking-[0.3em]" style={{ color: theme.primary }}>
          SWEETHE.ART
        </p>
      </div>
    </div>
  );
}
