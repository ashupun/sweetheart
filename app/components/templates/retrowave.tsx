"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "retrowave",
  name: "retrowave",
  description: "80s sunset vibes",
  vibe: "◈ NEON NIGHTS ◈",
  previewBg: "#1a0a2e",
  previewAccent: "#ff6b9d",
  tags: ["dark", "retro", "80s"],
  isPro: true,
};

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 70%, #ff6b9d 100%)" }}>
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: `linear-gradient(0deg, rgba(255,107,157,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,157,0.2) 1px, transparent 1px)`,
        backgroundSize: "100% 20px, 40px 100%",
        transform: "perspective(200px) rotateX(50deg)",
        transformOrigin: "bottom",
      }} />

      <div className="w-full max-w-sm text-center relative z-10">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#c44569] flex items-center justify-center text-white text-2xl font-bold mb-6" style={{ boxShadow: "0 0 30px rgba(255,107,157,0.4)" }}>
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <h1 className="text-xl font-bold text-white mb-1" style={{ textShadow: "2px 2px 0 #ff6b9d" }}>
          {profile?.displayName || "DREAMER"}
        </h1>
        <p className="text-sm text-white/50 mb-6">
          {profile?.bio || "chasing neon dreams"}
        </p>

        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 rounded text-white text-sm font-medium transition-all hover:scale-[1.02]"
              style={{ background: "rgba(255,107,157,0.2)", border: "1px solid rgba(255,107,157,0.4)" }}
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-[#ff6b9d]/40 tracking-[0.2em] mt-12">SWEETHE.ART</p>
      </div>
    </div>
  );
}
