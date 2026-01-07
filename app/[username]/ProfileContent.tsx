"use client";

import { useEffect } from "react";
import { track } from "@databuddy/sdk";
import { getTemplate } from "../components/templates";

interface User {
  username: string;
  displayName: string;
  bio: string;
  avatar: string | null;
  theme: string;
  template: string;
  buttonStyle: string;
  font: string;
  showSocials: boolean;
  isPro: boolean;
  links: { id: string; title: string; url: string; icon: string }[];
  socials: Record<string, string>;
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

function ensureAbsoluteUrl(url: string): string {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return `https://${url}`;
}

export default function ProfileContent({ user }: { user: User }) {
  const theme = themes[user.theme] || themes.pink;
  const templateModule = getTemplate(user.template);
  const TemplateComponent = templateModule.Template;

  useEffect(() => {
    track("profile_viewed", { username: user.username, template: user.template });
  }, [user.username, user.template]);

  const linksWithAbsoluteUrls = user.links.map(link => ({
    ...link,
    url: ensureAbsoluteUrl(link.url),
    enabled: true,
  }));

  const profile = {
    id: "",
    userId: "",
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatar,
    theme: user.theme,
    template: user.template,
    buttonStyle: user.buttonStyle,
    font: user.font,
    showSocials: user.showSocials,
    backgroundUrl: null,
    backgroundBlur: 0,
    backgroundOpacity: 100,
    musicUrl: null,
    musicTitle: null,
    hideBranding: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="min-h-screen w-full">
      <TemplateComponent
        profile={profile}
        links={linksWithAbsoluteUrls}
        theme={theme}
        showSocials={user.showSocials}
      />
    </div>
  );
}
