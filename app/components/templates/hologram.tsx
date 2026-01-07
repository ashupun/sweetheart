"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "hologram",
  name: "hologram",
  description: "futuristic & glitchy",
  vibe: "〔 SYSTEM ONLINE 〕",
  previewBg: "#0d0d1a",
  previewAccent: "#00ffaa",
  tags: ["dark", "cyber", "futuristic"],
  isPro: true,
};

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-[#0d0d1a]">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(0,255,170,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,170,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px",
      }} />
      <div className="absolute top-0 left-0 right-0 h-48 bg-linear-to-b from-[#00ffaa]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-[#00ffaa]/10 to-transparent" />

      <div className="w-full max-w-md text-center font-mono relative z-10">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 rounded-full" style={{
            background: "conic-gradient(from 0deg, #00ffaa, #00aaff, #aa00ff, #00ffaa)",
            filter: "blur(12px)",
            opacity: 0.4,
          }} />
          <div className="relative w-28 h-28 rounded-full border-2 border-[#00ffaa] flex items-center justify-center text-[#00ffaa] text-3xl font-bold bg-[#0d0d1a]">
            {profile?.displayName?.charAt(0) || "?"}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#00ffaa] mb-1" style={{ textShadow: "0 0 20px rgba(0,255,170,0.5)" }}>
          {profile?.displayName || "UNKNOWN"}
        </h1>
        <p className="text-[#00aaff] text-sm opacity-80 mb-2">@{profile?.username || "user"}</p>
        <p className="text-[#00ffaa]/50 mb-8 max-w-xs mx-auto">
          ▸ {profile?.bio || "accessing neural network..."} ◂
        </p>

        <div className="space-y-3">
          {links.map((link, i) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 rounded-lg border border-[#00ffaa]/30 bg-[#00ffaa]/5 text-[#00ffaa] font-medium hover:border-[#00ffaa]/60 hover:bg-[#00ffaa]/10 transition-all"
            >
              [{String(i + 1).padStart(2, "0")}] {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs text-[#00ffaa]/30 tracking-widest mt-10">◇ SWEETHE.ART ◇</p>
      </div>
    </div>
  );
}
