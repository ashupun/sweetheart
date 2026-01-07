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

export function Template({ profile, links }: TemplateProps) {
  return (
    <div className="min-h-full w-full bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-sm text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-medium mb-6">
          {profile?.displayName?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <h1 className="text-lg font-medium text-gray-900 mb-1">
          {profile?.displayName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {profile?.bio || "your bio"}
        </p>

        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-gray-50 text-gray-900 text-sm hover:bg-gray-100 transition-colors"
            >
              {link.title}
            </a>
          ))}
        </div>

        <p className="text-[10px] text-gray-300 mt-12 tracking-wider">SWEETHE.ART</p>
      </div>
    </div>
  );
}
