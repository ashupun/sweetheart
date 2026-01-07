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

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: "#fef3f2" }}>
      <div className="absolute top-10 left-10 text-4xl opacity-20">✿</div>
      <div className="absolute top-20 right-20 text-3xl opacity-20">♡</div>
      <div className="absolute bottom-20 left-20 text-3xl opacity-20">✧</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20">❀</div>

      <div className="w-full max-w-md text-center relative z-10">
        <div className="relative inline-block mb-6">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white"
            style={{ background: `linear-gradient(135deg, #fb7185, #f472b6)` }}
          >
            {profile?.displayName?.charAt(0) || "?"}
          </div>
          <span className="absolute -top-1 -right-1 text-2xl">🎀</span>
          <span className="absolute -bottom-1 left-0 text-xl">✿</span>
        </div>

        <h1 className="text-2xl font-bold text-rose-500 mb-1">
          {profile?.displayName || "Your Name"} ♡
        </h1>
        <p className="text-rose-400 text-sm mb-2">@{profile?.username || "username"}</p>
        <p className="text-rose-400/80 mb-8 max-w-xs mx-auto">
          ꒰ {profile?.bio || "welcome to my page!"} ꒱
        </p>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 bg-white rounded-full text-rose-500 font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border-2 border-rose-200"
            >
              ♡ {link.title} ♡
            </a>
          ))}
        </div>

        <p className="text-xs text-rose-300 mt-10">✧ sweethe.art ✧</p>
      </div>
    </div>
  );
}
