"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "glass",
  name: "glass",
  description: "modern & sleek",
  vibe: "frosted elegance",
  previewBg: "#e0e7ff",
  previewAccent: "#6366f1",
  tags: ["minimal", "modern", "glass"],
};

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div
      className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${theme.bg}, ${theme.primary}20)` }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ backgroundColor: theme.primary }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme.secondary }} />

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl">
          <div className="text-center">
            <div
              className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-white text-3xl font-semibold mb-6 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
            >
              {profile?.displayName?.charAt(0) || "?"}
            </div>

            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
              {profile?.displayName || "Your Name"}
            </h1>
            <p className="text-sm mb-2" style={{ color: theme.primary }}>
              @{profile?.username || "username"}
            </p>
            <p className="text-gray-600 mb-8 max-w-xs mx-auto">
              {profile?.bio || "your bio goes here"}
            </p>

            <div className="space-y-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 px-6 bg-white/50 backdrop-blur-sm rounded-xl text-gray-800 font-medium hover:bg-white/70 hover:scale-[1.02] transition-all border border-white/30"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-center mt-6 opacity-50" style={{ color: theme.secondary }}>
          sweethe.art
        </p>
      </div>
    </div>
  );
}
