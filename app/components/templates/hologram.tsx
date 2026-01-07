"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "hologram",
  name: "hologram",
  description: "futuristic & clean",
  vibe: "〔 SYSTEM ONLINE 〕",
  previewBg: "#0d0d1a",
  previewAccent: "#00ffaa",
  tags: ["dark", "cyber", "futuristic"],
  isPro: true,
};

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(0,255,170,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.2) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="w-full max-w-sm text-center font-mono relative z-10">
        <div className="w-20 h-20 mx-auto rounded-full border border-[#00ffaa]/50 flex items-center justify-center text-[#00ffaa] text-2xl font-bold mb-6 bg-[#00ffaa]/5">
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <h1 className="text-lg font-bold text-[#00ffaa] mb-1" style={{ textShadow: "0 0 10px rgba(0,255,170,0.3)" }}>
          {profile?.displayName || "USER"}
        </h1>
        <p className="text-sm text-[#00ffaa]/40 mb-6">
          {profile?.bio || "system active"}
        </p>

        <div className="space-y-2">
          {links.map((link, i) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 rounded border border-[#00ffaa]/20 bg-[#00ffaa]/5 text-[#00ffaa] text-sm font-medium hover:border-[#00ffaa]/40 hover:bg-[#00ffaa]/10 transition-all"
            >
              [{String(i + 1).padStart(2, "0")}] {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-[#00ffaa]/20 mt-12 tracking-widest">SWEETHE.ART</p>
      </div>
    </div>
  );
}
