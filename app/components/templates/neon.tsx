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

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-black">
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-fuchsia-500 blur-[100px] opacity-30" />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-cyan-500 blur-[80px] opacity-20" />

      <div className="w-full max-w-md text-center font-mono relative z-10">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-fuchsia-500" />
          <div
            className="relative w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-fuchsia-400"
            style={{ background: "linear-gradient(135deg, #f020f0, #00ffff)" }}
          >
            <span className="text-white" style={{ textShadow: "0 0 20px rgba(240,32,240,0.8)" }}>
              {profile?.displayName?.charAt(0) || "?"}
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-fuchsia-400 mb-1" style={{ textShadow: "0 0 30px rgba(240,32,240,0.6)" }}>
          {profile?.displayName || "NEON_GIRL"}
        </h1>
        <p className="text-cyan-400 text-sm opacity-80 mb-2">@{profile?.username || "username"}</p>
        <p className="text-fuchsia-200/50 mb-8 max-w-xs mx-auto">
          {"// "}{profile?.bio || "living in the digital world"}{" //"}
        </p>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 rounded-xl border border-fuchsia-500/30 bg-fuchsia-900/20 backdrop-blur-sm text-fuchsia-200 font-medium hover:border-fuchsia-500/60 hover:bg-fuchsia-500/10 transition-all"
              style={{ boxShadow: "0 0 20px rgba(240,32,240,0.1)" }}
            >
              {">"} {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs text-cyan-400/40 mt-10">{"<SWEETHE.ART />"}</p>
      </div>
    </div>
  );
}
