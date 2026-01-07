"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "soft",
  name: "soft",
  description: "warm & cozy",
  vibe: "cottagecore dreams",
  previewBg: "#fff7ed",
  previewAccent: "#f97316",
  tags: ["cute", "aesthetic", "soft"],
};

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative" style={{ background: "linear-gradient(180deg, #fff7ed, #ffe4e6)" }}>
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-rose-200 opacity-40 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-orange-200 opacity-40 blur-3xl" />

      <div className="w-full max-w-md text-center relative z-10">
        <div className="relative inline-block mb-6">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-semibold shadow-lg border-4 border-white"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
          >
            {profile?.displayName?.charAt(0) || "?"}
          </div>
          <span className="absolute -top-1 -right-1 text-2xl">🌷</span>
        </div>

        <h1 className="text-2xl font-semibold text-rose-600 mb-1">
          {profile?.displayName || "Your Name"}
        </h1>
        <p className="text-orange-500 text-sm mb-2">@{profile?.username || "username"}</p>
        <p className="text-gray-600 mb-8 max-w-xs mx-auto leading-relaxed">
          {profile?.bio || "cozy vibes & warm tea ☕"}
        </p>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 bg-white/80 backdrop-blur-sm rounded-full text-rose-500 font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border border-rose-100"
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-10">made with ♡ by sweethe.art</p>
      </div>
    </div>
  );
}
