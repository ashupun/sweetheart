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
};

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide pt-10 pb-6 px-4 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-fuchsia-500 rounded-full blur-[80px] opacity-30" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-cyan-500 rounded-full blur-[100px] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full blur-[120px] opacity-10" />
      </div>
      
      <div className="text-center font-sans relative z-10">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-fuchsia-500 animate-pulse" />
          <div
            className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center text-xl font-bold border-2 border-fuchsia-400"
            style={{ 
              background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
              boxShadow: "0 0 30px rgba(240,171,252,0.5), inset 0 0 20px rgba(240,171,252,0.1)"
            }}
          >
            <span className="text-fuchsia-300" style={{ textShadow: "0 0 20px rgba(240,171,252,0.8)" }}>
              {profile?.displayName?.charAt(0) || "?"}
            </span>
          </div>
        </div>
        
        <h1 
          className="text-base font-bold text-fuchsia-300 mb-0.5"
          style={{ textShadow: "0 0 30px rgba(240,171,252,0.6)" }}
        >
          {profile?.displayName || "your name"}
        </h1>
        <p className="text-[10px] text-cyan-400 opacity-80 mb-1">
          @{profile?.username || "username"}
        </p>
        <p className="text-[10px] mb-5 text-fuchsia-200 opacity-40 px-4">
          {profile?.bio || "⚡ electric dreams ⚡"}
        </p>

        <div className="space-y-2.5">
          {links.map((link) => (
            <div
              key={link.id}
              className="py-3.5 px-4 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/5 backdrop-blur-sm hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 transition-all group"
              style={{ boxShadow: "0 0 20px rgba(240,171,252,0.1), inset 0 0 20px rgba(240,171,252,0.02)" }}
            >
              <span className="text-[11px] text-fuchsia-200 group-hover:text-fuchsia-100 transition-colors font-medium">
                {link.title}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[9px] mt-8 text-fuchsia-400 opacity-30">
          ✦ sweethe.art ✦
        </p>
      </div>
    </div>
  );
}

