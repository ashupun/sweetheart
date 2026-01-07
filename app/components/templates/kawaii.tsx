"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "kawaii",
  name: "kawaii",
  description: "cute & playful",
  vibe: "꒰ᐢ. ̫ .ᐢ꒱",
  previewBg: "#fef3f2",
  previewAccent: "#fb7185",
  tags: ["cute", "aesthetic", "kawaii"],
};

export function Template({ profile, links, theme, showSocials }: TemplateProps) {
  const emojis = ["🌸", "💫", "🎀", "✨", "💕", "🌷"];
  const decorations = ["♡", "✧", "♪", "☆"];
  
  return (
    <div className="h-full overflow-y-auto scrollbar-hide pt-8 pb-6 px-4 relative" style={{ backgroundColor: theme.bg }}>
      <div className="absolute top-4 left-4 text-lg opacity-20">♡</div>
      <div className="absolute top-12 right-6 text-sm opacity-15">✧</div>
      <div className="absolute bottom-20 left-6 text-base opacity-10">♪</div>
      <div className="absolute bottom-8 right-4 text-lg opacity-20">☆</div>
      
      <div className="text-center font-sans relative z-10">
        <div className="relative inline-block mb-3">
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white text-xl font-bold border-4 border-white shadow-lg"
            style={{ backgroundColor: theme.primary }}
          >
            {profile?.displayName?.charAt(0) || "?"}
          </div>
          <span className="absolute -top-1 -right-0 text-sm animate-bounce" style={{ animationDuration: "2s" }}>✨</span>
          <span className="absolute -bottom-0.5 -left-1 text-sm animate-bounce" style={{ animationDuration: "2.5s" }}>💖</span>
        </div>
        
        <h1 className="text-[14px] font-bold mb-0.5" style={{ color: theme.secondary }}>
          {profile?.displayName || "your name"} ♡
        </h1>
        <p className="text-[10px] mb-1" style={{ color: theme.primary }}>
          ꒰ @{profile?.username || "username"} ꒱
        </p>
        <p className="text-[10px] mb-4 opacity-60 px-4" style={{ color: theme.secondary }}>
          {profile?.bio || "✿ your bio ✿"}
        </p>

        {showSocials && (
          <div className="flex justify-center gap-2 mb-4">
            {["💌", "🎵", "📸"].map((emoji, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm border-2 border-white shadow-sm"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {links.map((link, i) => (
            <div
              key={link.id}
              className="py-3 px-4 rounded-2xl border-2 border-white shadow-sm hover:scale-[1.02] transition-transform"
              style={{ backgroundColor: `${theme.primary}12` }}
            >
              <span className="text-[11px]" style={{ color: theme.secondary }}>
                {emojis[i % emojis.length]} {link.title}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] mt-6" style={{ color: theme.primary }}>
          ♡ sweethe.art ♡
        </p>
      </div>
    </div>
  );
}
