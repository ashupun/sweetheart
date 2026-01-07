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

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-violet-100">
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-indigo-300/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-violet-300/40 blur-3xl" />

      <div className="w-full max-w-sm relative z-10">
        <div className="p-8 bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-2xl font-medium mb-6 shadow-lg shadow-indigo-200">
              {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
            </div>

            <h1 className="text-lg font-medium text-gray-800 mb-1">
              {profile?.displayName || "Your Name"}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {profile?.bio || "your bio"}
            </p>

            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-white/60 backdrop-blur-sm rounded-xl text-gray-700 text-sm font-medium hover:bg-white/80 transition-all border border-white/50"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[10px] text-center text-indigo-300 mt-8">sweethe.art</p>
      </div>
    </div>
  );
}
