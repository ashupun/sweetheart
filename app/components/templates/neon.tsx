"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "neon",
  name: "neon",
  description: "vibrant & electric",
  vibe: "⚡ high voltage",
  previewBg: "#0a0a0a",
  previewAccent: "#f0abfc",
  tags: ["dark", "bold", "neon"],
  isPro: true,
};

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-black">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-fuchsia-500 blur-[100px] opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan-500 blur-[80px] opacity-15" />

      <div className="w-full max-w-sm text-center relative z-10">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold mb-6" style={{ boxShadow: "0 0 40px rgba(240,32,240,0.4)" }}>
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <h1 className="text-lg font-bold text-fuchsia-400 mb-1" style={{ textShadow: "0 0 20px rgba(240,32,240,0.5)" }}>
          {profile?.displayName || "USER"}
        </h1>
        <p className="text-sm text-fuchsia-300/50 mb-6">
          {profile?.bio || "living in neon lights"}
        </p>

        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 text-sm font-medium hover:border-fuchsia-500/50 hover:bg-fuchsia-500/20 transition-all"
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-fuchsia-500/30 mt-12">sweethe.art</p>
      </div>
    </div>
  );
}
