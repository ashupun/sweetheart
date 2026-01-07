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

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="w-full max-w-sm text-center relative z-10">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-3xl font-medium mb-6 shadow-lg shadow-pink-200">
          {profile?.displayName?.charAt(0)?.toUpperCase() || "♡"}
        </div>

        <h1 className="text-xl font-medium text-gray-800 mb-1">
          {profile?.displayName || "Your Name"}
        </h1>
        <p className="text-sm text-pink-400 mb-6">
          {profile?.bio || "✧ dreaming in pixels ✧"}
        </p>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 px-4 bg-white/80 backdrop-blur-sm rounded-2xl text-gray-700 text-sm font-medium hover:bg-white hover:shadow-md hover:shadow-pink-100 transition-all"
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-pink-300 mt-12">sweethe.art ♡</p>
      </div>
    </div>
  );
}
