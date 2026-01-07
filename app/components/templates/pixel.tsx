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

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-[#1f1d2e]">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(#f6c177 1px, transparent 1px),
          linear-gradient(90deg, #f6c177 1px, transparent 1px)
        `,
        backgroundSize: "10px 10px",
      }} />

      <div className="w-full max-w-md text-center relative z-10" style={{ fontFamily: "monospace" }}>
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 mx-auto flex items-center justify-center text-[#1f1d2e] text-3xl font-bold" style={{
            background: "linear-gradient(135deg, #f6c177 25%, #eb6f92 75%)",
            clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
          }}>
            {profile?.displayName?.charAt(0) || "?"}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#f6c177] mb-1 tracking-wider">
          {profile?.displayName?.toUpperCase() || "PLAYER 1"}
        </h1>
        <p className="text-[#eb6f92] text-sm mb-2">@{profile?.username || "user"}</p>
        <p className="text-[#e0def4]/50 mb-8 max-w-xs mx-auto">
          「 {profile?.bio || "press start to continue"} 」
        </p>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full py-4 px-6 bg-[#393552] text-[#e0def4] font-medium hover:bg-[#524f7a] hover:text-[#f6c177] transition-colors"
              style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
            >
              <span className="text-[#f6c177]">►</span>
              {link.title}
            </a>
          ))}
        </div>

        <div className="mt-10 space-y-1">
          <p className="text-xs text-[#f6c177]/40">♥♥♥ LIVES: 3</p>
          <p className="text-[10px] text-[#e0def4]/30">SWEETHE.ART © 2026</p>
        </div>
      </div>
    </div>
  );
}
