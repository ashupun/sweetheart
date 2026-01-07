"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "y2k",
  name: "y2k",
  description: "cyber dreams",
  vibe: "</digital_era>",
  previewBg: "#0f0f23",
  previewAccent: "#22d3ee",
  tags: ["dark", "retro", "cyber"],
  isPro: true,
};

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0f23, #1e1b4b)" }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      <div className="w-full max-w-md text-center font-mono relative z-10">
        <div className="relative inline-block mb-6">
          <div
            className="w-24 h-24 rounded-lg flex items-center justify-center text-3xl font-bold border-2"
            style={{
              background: "linear-gradient(135deg, #0f0f23, #1e1b4b)",
              borderColor: "#22d3ee",
              color: "#22d3ee",
              boxShadow: "0 0 30px rgba(34,211,238,0.3)",
            }}
          >
            {profile?.displayName?.charAt(0) || "?"}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-1" style={{ color: "#22d3ee", textShadow: "0 0 20px rgba(34,211,238,0.5)" }}>
          {profile?.displayName || "CYBER_USER"}
        </h1>
        <p className="text-violet-400 text-sm mb-2">@{profile?.username || "username"}</p>
        <p className="text-cyan-300/60 mb-8 max-w-xs mx-auto text-sm">
          {"// "}{profile?.bio || "welcome to the matrix"}{" //"}
        </p>

        <div className="space-y-3">
          {links.map((link, i) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 rounded-lg font-medium transition-all hover:scale-[1.02]"
              style={{
                background: "rgba(34,211,238,0.1)",
                border: "1px solid rgba(34,211,238,0.3)",
                color: "#22d3ee",
                boxShadow: "0 0 15px rgba(34,211,238,0.1)",
              }}
            >
              [{String(i + 1).padStart(2, "0")}] {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs text-cyan-500/40 mt-10 tracking-widest">{"<SWEETHE.ART />"}</p>
      </div>
    </div>
  );
}
