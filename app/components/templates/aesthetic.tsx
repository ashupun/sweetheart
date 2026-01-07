"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "aesthetic",
  name: "aesthetic",
  description: "dreamy & ethereal",
  vibe: "✧ soft vibes ✧",
  previewBg: "#fdf2f8",
  previewAccent: "#ec4899",
  tags: ["aesthetic", "cute", "dreamy"],
};

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: theme.bg }}>
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ backgroundColor: theme.primary }} />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme.secondary }} />

      <div className="w-full max-w-md text-center relative z-10">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ backgroundColor: theme.primary }} />
          <div
            className="relative w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-semibold shadow-xl border-4 border-white"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
          >
            {profile?.displayName?.charAt(0) || "?"}
          </div>
          <span className="absolute -top-2 -right-2 text-2xl">✧</span>
          <span className="absolute -bottom-1 -left-1 text-xl">♡</span>
        </div>

        <h1 className="text-2xl font-semibold mb-1" style={{ color: theme.secondary }}>
          {profile?.displayName || "Your Name"}
        </h1>
        <p className="text-sm opacity-60 mb-2" style={{ color: theme.primary }}>
          @{profile?.username || "username"}
        </p>
        <p className="mb-8 max-w-xs mx-auto opacity-70" style={{ color: theme.secondary }}>
          ✧ {profile?.bio || "dreaming in pixels"} ✧
        </p>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 bg-white/70 backdrop-blur-sm rounded-2xl font-medium hover:bg-white/90 hover:scale-[1.02] transition-all shadow-sm"
              style={{ color: theme.secondary }}
            >
              ♡ {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs mt-10 opacity-40" style={{ color: theme.primary }}>
          ✧ sweethe.art ✧
        </p>
      </div>
    </div>
  );
}
