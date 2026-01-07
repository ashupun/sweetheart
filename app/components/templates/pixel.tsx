"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "pixel",
  name: "pixel",
  description: "retro game style",
  vibe: "♥ PLAYER ONE ♥",
  previewBg: "#1f1d2e",
  previewAccent: "#f6c177",
  tags: ["dark", "retro", "gaming"],
  isPro: true,
};

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-[#191724]">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(#f6c177 1px, transparent 1px), linear-gradient(90deg, #f6c177 1px, transparent 1px)`,
        backgroundSize: "8px 8px",
      }} />

      <div className="w-full max-w-sm text-center relative z-10 font-mono">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#f6c177] to-[#eb6f92] flex items-center justify-center text-[#191724] text-2xl font-bold mb-6" style={{ clipPath: "polygon(15% 0, 85% 0, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0 85%, 0 15%)" }}>
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <h1 className="text-lg font-bold text-[#f6c177] mb-1 tracking-wide">
          {profile?.displayName?.toUpperCase() || "PLAYER 1"}
        </h1>
        <p className="text-sm text-[#e0def4]/40 mb-6">
          {profile?.bio || "press start"}
        </p>

        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full py-3 px-4 bg-[#26233a] text-[#e0def4] text-sm font-medium hover:bg-[#393552] hover:text-[#f6c177] transition-colors"
            >
              <span className="text-[#f6c177]">►</span>
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-[#e0def4]/20 mt-12">SWEETHE.ART</p>
      </div>
    </div>
  );
}
