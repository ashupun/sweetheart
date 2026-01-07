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

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative bg-gradient-to-b from-orange-50 to-rose-50">
      <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-orange-200/50 blur-3xl" />

      <div className="w-full max-w-sm text-center relative z-10">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-orange-300 to-rose-300 flex items-center justify-center text-white text-2xl font-medium mb-6 shadow-lg shadow-rose-200">
          {profile?.displayName?.charAt(0)?.toUpperCase() || "♡"}
        </div>

        <h1 className="text-lg font-medium text-rose-500 mb-1">
          {profile?.displayName || "Your Name"}
        </h1>
        <p className="text-sm text-orange-400/70 mb-6">
          {profile?.bio || "cozy vibes only ☕"}
        </p>

        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-white/80 backdrop-blur-sm rounded-full text-rose-500 text-sm font-medium shadow-sm hover:shadow-md hover:bg-white transition-all"
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-rose-300 mt-12">sweethe.art ♡</p>
      </div>
    </div>
  );
}
