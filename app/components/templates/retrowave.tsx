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

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #ff6b9d 100%)" }}>
      <div className="absolute bottom-0 left-0 right-0 h-64" style={{
        background: `
          linear-gradient(0deg, #ff6b9d 2px, transparent 2px),
          linear-gradient(90deg, rgba(255,107,157,0.3) 1px, transparent 1px)
        `,
        backgroundSize: "100% 30px, 50px 100%",
        transform: "perspective(300px) rotateX(60deg)",
        transformOrigin: "bottom",
        opacity: 0.5,
      }} />

      <div className="w-full max-w-md text-center relative z-10">
        <div className="relative inline-block mb-6">
          <div className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold" style={{
            background: "linear-gradient(135deg, #ff6b9d, #c44569)",
            boxShadow: "0 0 40px rgba(255,107,157,0.5), 0 0 80px rgba(255,107,157,0.3)",
          }}>
            <span className="text-white">{profile?.displayName?.charAt(0) || "?"}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2" style={{ textShadow: "3px 3px 0 #ff6b9d, 5px 5px 0 #c44569", fontStyle: "italic" }}>
          {profile?.displayName || "DREAMER"}
        </h1>
        <p className="text-[#ff6b9d] text-sm tracking-widest mb-2">@{profile?.username || "user"}</p>
        <p className="text-white/60 mb-8 max-w-xs mx-auto">
          {profile?.bio || "chasing neon dreams"}
        </p>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 rounded-lg text-white font-medium transition-all hover:scale-105"
              style={{
                background: "linear-gradient(90deg, rgba(255,107,157,0.3), rgba(196,69,105,0.3))",
                border: "2px solid #ff6b9d",
                boxShadow: "0 0 20px rgba(255,107,157,0.3)",
              }}
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs text-[#ff6b9d]/50 tracking-[0.3em] mt-10">SWEETHE.ART</p>
      </div>
    </div>
  );
}
