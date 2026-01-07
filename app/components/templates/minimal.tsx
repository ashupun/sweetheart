"use client";

import type { TemplateProps, TemplateConfig } from "./types";

export const config: TemplateConfig = {
  id: "minimal",
  name: "minimal",
  description: "clean & elegant",
  vibe: "less is more",
  previewBg: "#fafafa",
  previewAccent: "#171717",
  tags: ["minimal", "clean", "simple"],
};

export function Template({ profile, links, theme }: TemplateProps) {
  return (
    <div className="min-h-full w-full flex items-center justify-center p-8" style={{ backgroundColor: "#fafafa" }}>
      <div className="w-full max-w-md text-center">
        <div
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-6 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
        >
          {profile?.displayName?.charAt(0) || "?"}
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          {profile?.displayName || "Your Name"}
        </h1>
        <p className="text-gray-500 mb-2">@{profile?.username || "username"}</p>
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
              className="block w-full py-4 px-6 bg-white rounded-xl border border-gray-200 text-gray-900 font-medium hover:border-gray-300 hover:shadow-sm transition-all"
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-10">sweethe.art</p>
      </div>
    </div>
  );
}
