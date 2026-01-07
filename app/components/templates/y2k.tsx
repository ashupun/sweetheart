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
};

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide pt-10 pb-6 px-4 relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>
      
      <div className="text-center font-mono relative z-10">
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-xl blur-xl opacity-50 bg-cyan-500" />
          <div
            className="relative w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold border border-cyan-500/50"
            style={{ 
              background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15))",
            }}
          >
            <span className="text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              {profile?.displayName?.charAt(0) || "?"}
            </span>
          </div>
        </div>
        
        <h1 
          className="text-sm font-bold text-cyan-300 mt-4 mb-0.5"
          style={{ textShadow: "0 0 20px rgba(34,211,238,0.6)" }}
        >
          {profile?.displayName || "your_name"}
        </h1>
        <p className="text-[10px] text-purple-400 opacity-80 mb-1">
          @{profile?.username || "username"}
        </p>
        <p className="text-[10px] mb-5 text-cyan-200 opacity-50 px-4">
          {`>`} {profile?.bio || "loading..."} {`<`}
        </p>

        <div className="space-y-2">
          {links.map((link) => (
            <div
              key={link.id}
              className="py-3 px-4 rounded-lg border border-cyan-500/20 bg-black/30 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group"
              style={{ boxShadow: "0 0 15px rgba(34,211,238,0.05)" }}
            >
              <span className="text-[11px] text-cyan-200 group-hover:text-cyan-100 transition-colors">
                {"["} {link.title} {"]"}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[9px] mt-8 text-purple-400 opacity-40">
          {"<>"} sweethe.art {"</>"}
        </p>
      </div>
    </div>
  );
}
