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

export function PhonePreview({ profile, links, theme = "pink", showSocials = true, template = "minimal" }: PreviewProps) {
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
      <div className="w-[280px] h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
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

export function TemplatePreview({ template, selected, onClick }: {
  template: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  const templateModule = getTemplate(template);
  const config = templateModule.config;
  const isBrutalist = template === "brutalist";
  const isY2k = template === "y2k";
  const isGlass = template === "glass";

  return (
    <button
      onClick={onClick}
      className={`w-full aspect-9/16 rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.02] hover:shadow-lg relative group ${selected ? "border-pink-500 ring-2 ring-pink-500/20 shadow-md" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        }`}
      style={{
        background: isY2k
          ? "linear-gradient(180deg, #0f0f23, #1e1b4b)"
          : isGlass
            ? `linear-gradient(160deg, ${config.previewBg} 0%, ${config.previewAccent}20 100%)`
            : config.previewBg
      }}
    >
      {isGlass && (
        <div className="absolute inset-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30" />
      )}
      <div className="absolute inset-0 p-4 flex flex-col items-center justify-center z-10">
        <div
          className={`w-10 h-10 mb-3 flex items-center justify-center text-white text-sm font-medium ${isBrutalist ? "border-2" : isY2k ? "rounded-lg" : "rounded-full"
            }`}
          style={{
            backgroundColor: isBrutalist ? "transparent" : config.previewAccent,
            borderColor: isBrutalist ? config.previewAccent : "transparent",
            color: isBrutalist ? config.previewAccent : "white",
            boxShadow: isY2k ? `0 0 15px ${config.previewAccent}60` : "none"
          }}
        >
          ♡
        </div>
        <div
          className="w-12 h-1.5 rounded mb-1"
          style={{
            backgroundColor: isY2k || isBrutalist ? config.previewAccent : config.previewAccent,
            opacity: isY2k ? 0.8 : 0.4
          }}
        />
        <div
          className="w-8 h-1 rounded mb-4"
          style={{ backgroundColor: config.previewAccent, opacity: 0.2 }}
        />
        <div className="w-full space-y-2 px-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-5 ${isBrutalist ? "" : "rounded-lg"}`}
              style={{
                backgroundColor: isBrutalist ? "transparent" : isY2k ? `${config.previewAccent}15` : `${config.previewAccent}18`,
                border: isBrutalist ? `2px solid ${config.previewAccent}` : isY2k ? `1px solid ${config.previewAccent}30` : "none",
                boxShadow: isBrutalist ? `2px 2px 0 ${config.previewAccent}` : "none"
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
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
