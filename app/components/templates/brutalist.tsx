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

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-lg text-center">
        <div className="w-28 h-28 mx-auto border-4 border-black flex items-center justify-center text-4xl font-black mb-6 bg-yellow-300">
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <h1 className="text-4xl font-black uppercase tracking-tight text-black mb-2">
          {profile?.displayName || "YOUR NAME"}
        </h1>
        <p className="text-lg font-mono text-black mb-2">@{profile?.username || "username"}</p>
        <p className="text-black font-mono mb-10 max-w-sm mx-auto border-t-2 border-b-2 border-black py-4">
          {profile?.bio || "NO BIO SET."}
        </p>

        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 bg-white border-4 border-black text-black font-black uppercase tracking-wide hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#000]"
            >
              → {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs font-mono mt-12 text-black">[ SWEETHE.ART ]</p>
      </div>
    </div>
  );
}
