"use client";

import type { Profile, Link } from "@/lib/types";
import { templateList, getTemplate } from "./templates";

interface PreviewProps {
  profile: Profile | null;
  links: Link[];
  theme?: string;
  showSocials?: boolean;
  template?: string;
}

const themes: Record<string, { primary: string; secondary: string; bg: string }> = {
  pink: { primary: "#ec4899", secondary: "#db2777", bg: "#fce7f3" },
  lavender: { primary: "#a78bfa", secondary: "#8b5cf6", bg: "#ede9fe" },
  mint: { primary: "#34d399", secondary: "#10b981", bg: "#d1fae5" },
  peach: { primary: "#fb923c", secondary: "#f97316", bg: "#ffedd5" },
  ocean: { primary: "#38bdf8", secondary: "#0ea5e9", bg: "#e0f2fe" },
  rose: { primary: "#f472b6", secondary: "#ec4899", bg: "#fdf2f8" },
  midnight: { primary: "#818cf8", secondary: "#6366f1", bg: "#1e1b4b" },
  sunset: { primary: "#fb7185", secondary: "#f43f5e", bg: "#fff1f2" },
  forest: { primary: "#22c55e", secondary: "#16a34a", bg: "#f0fdf4" },
};

export function DesktopPreview({ profile, links, theme = "pink", showSocials = true, template = "minimal" }: PreviewProps) {
  const currentTheme = themes[theme] || themes.pink;
  const templateModule = getTemplate(template);
  const TemplateComponent = templateModule.Template;

  const displayLinks = links.length > 0
    ? links.filter(l => l.enabled !== false).slice(0, 4)
    : [
      { id: "1", title: "my website", url: "#", enabled: true },
      { id: "2", title: "youtube", url: "#", enabled: true },
      { id: "3", title: "discord", url: "#", enabled: true },
    ];

  return (
    <div className="relative">
      <div className="w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        <div className="h-6 bg-gray-800 flex items-center gap-1.5 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="h-[calc(100%-24px)] overflow-hidden">
          <TemplateComponent
            profile={profile}
            links={displayLinks}
            theme={currentTheme}
            showSocials={showSocials}
          />
        </div>
      </div>
    </div>
  );
}

export function MiniPreview({ theme = "pink", selected }: {
  theme: string;
  selected?: boolean;
}) {
  const currentTheme = themes[theme] || themes.pink;
  const isDark = theme === "midnight";

  return (
    <div
      className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition-all group-hover:scale-[1.02] group-hover:shadow-md ${selected ? "border-pink-500 ring-2 ring-pink-500/20 shadow-md" : "border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600"
        }`}
      style={{ backgroundColor: currentTheme.bg }}
    >
      <div className="h-full p-2 flex flex-col items-center justify-center gap-1">
        <div
          className="w-6 h-6 rounded-full shadow-sm"
          style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})` }}
        />
        <div className="w-8 h-1 rounded" style={{ backgroundColor: currentTheme.secondary, opacity: 0.5 }} />
        <div className="w-full space-y-1 px-1.5 mt-1">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 rounded-lg"
              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { templateList };
