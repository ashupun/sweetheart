"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "y2k",
  name: "y2k",
  description: "cyber dreams",
  vibe: "</digital_era>",
  previewBg: "#0f0f23",
  previewAccent: "#22d3ee",
  tags: ["dark", "retro", "cyber"],
  isPro: true,
};

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-[#0f0f23]">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
      }} />

      <div className="w-full max-w-sm text-center font-mono relative z-10">
        <div className="w-20 h-20 mx-auto rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl font-bold mb-6" style={{ boxShadow: "0 0 20px rgba(34,211,238,0.2)" }}>
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <h1 className="text-lg font-bold text-cyan-400 mb-1" style={{ textShadow: "0 0 10px rgba(34,211,238,0.5)" }}>
          {profile?.displayName || "USER"}
        </h1>
        <p className="text-sm text-cyan-600 mb-6">
          {profile?.bio || "welcome to the matrix"}
        </p>

        <div className="space-y-2">
          {links.map((link, i) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 rounded-lg text-cyan-400 text-sm font-medium transition-all hover:bg-cyan-500/20"
              style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)" }}
            >
              [{String(i + 1).padStart(2, "0")}] {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-cyan-700 mt-12 tracking-widest">{"<SWEETHE.ART />"}</p>
      </div>
    </div>
  );
}
