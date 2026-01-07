"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "brutalist",
  name: "brutalist",
  description: "bold & raw",
  vibe: "NO RULES",
  previewBg: "#ffffff",
  previewAccent: "#000000",
  tags: ["minimal", "bold", "edgy"],
};

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-sm">
        <div className="w-20 h-20 border-2 border-black flex items-center justify-center text-2xl font-bold mb-6">
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <h1 className="text-2xl font-bold uppercase text-black mb-1">
          {profile?.displayName || "NAME"}
        </h1>
        <p className="text-sm font-mono text-gray-500 mb-6">
          {profile?.bio || "no bio"}
        </p>

        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {link.title} →
            </a>
          ))}
        </div>

        <p className="text-[10px] font-mono text-gray-300 mt-12 uppercase tracking-widest">sweethe.art</p>
      </div>
    </div>
  );
}
