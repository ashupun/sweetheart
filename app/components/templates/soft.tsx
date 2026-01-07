"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "soft",
  name: "soft",
  description: "warm & cozy",
  vibe: "☁ cotton candy",
  previewBg: "#fef7f0",
  previewAccent: "#f9a8d4",
  tags: ["cute", "aesthetic", "soft"],
};

export function Template({ profile, links, theme, showSocials }: TemplateProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide pt-8 pb-6 px-5 bg-linear-to-b from-rose-50 via-orange-50 to-amber-50">
      <div className="text-center font-sans">
        <div className="relative inline-block mb-4">
          <div className="absolute -inset-2 bg-gradient-to-br from-rose-200 to-orange-200 rounded-full blur-lg opacity-50" />
          <div
            className="relative w-[76px] h-[76px] rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-xl"
            style={{ 
              background: "linear-gradient(135deg, #fda4af, #fdba74)",
            }}
          >
            <span className="text-white drop-shadow-sm">
              {profile?.displayName?.charAt(0) || "?"}
            </span>
          </div>
          <span className="absolute -top-1 -right-1 text-lg">🌸</span>
        </div>
        
        <h1 className="text-[15px] font-semibold text-rose-400 mb-0.5">
          {profile?.displayName || "your name"}
        </h1>
        <p className="text-[10px] text-orange-400 mb-1">
          @{profile?.username || "username"}
        </p>
        <p className="text-[10px] mb-5 text-rose-300 px-4 leading-relaxed">
          {profile?.bio || "spreading warmth & love ♡"}
        </p>

        {showSocials && (
          <div className="flex justify-center gap-2 mb-5">
            {["💌", "🎀", "🌷"].map((emoji, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm bg-white shadow-md"
              >
                {emoji}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2.5">
          {links.map((link, i) => (
            <div
              key={link.id}
              className="py-3.5 px-4 rounded-2xl bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span className="text-[11px] text-rose-400 font-medium">
                {["🌸", "✿", "❀", "✾"][i % 4]} {link.title}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] mt-8 text-orange-300">
          ♡ sweethe.art ♡
        </p>
      </div>
    </div>
  );
}

