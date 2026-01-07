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

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-rose-50">
      <div className="absolute top-16 left-16 text-4xl text-rose-200">✿</div>
      <div className="absolute top-24 right-24 text-2xl text-rose-200">♡</div>
      <div className="absolute bottom-24 left-24 text-2xl text-rose-200">✧</div>
      <div className="absolute bottom-16 right-16 text-4xl text-rose-200">❀</div>

      <div className="w-full max-w-sm text-center relative z-10">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {profile?.displayName?.charAt(0)?.toUpperCase() || "♡"}
          </div>
          <span className="absolute -top-1 -right-1 text-xl">🎀</span>
        </div>

        <h1 className="text-lg font-bold text-rose-500 mb-1">
          {profile?.displayName || "Your Name"}
        </h1>
        <p className="text-sm text-rose-300 mb-6">
          {profile?.bio || "welcome to my page!"}
        </p>

        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-white rounded-full text-rose-500 text-sm font-medium shadow-sm hover:shadow-md transition-all border border-rose-100"
            >
              ♡ {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-rose-300 mt-12">sweethe.art ♡</p>
      </div>
    </div>
  );
}
