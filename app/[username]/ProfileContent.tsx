"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { ThemeToggle } from "../components/ThemeToggle";

interface User {
  username: string;
  displayName: string;
  bio: string;
  avatar: string | null;
  theme: string;
  buttonStyle: string;
  font: string;
  showSocials: boolean;
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
};

const buttonStyles: Record<string, string> = {
  rounded: "rounded-xl",
  pill: "rounded-full",
  sharp: "rounded-md",
};

const icons: Record<string, ReactNode> = {
  twitch: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  discord: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  shop: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  heart: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
};

export default function ProfileContent({ user }: { user: User }) {
  const theme = themes[user.theme] || themes.pink;
  const btnStyle = buttonStyles[user.buttonStyle] || buttonStyles.rounded;
  const fontClass = user.font === "sans" ? "font-sans" : "font-mono";

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden" style={{ backgroundColor: theme.bg }}>
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-40 animate-float-slow"
          style={{ background: `linear-gradient(to bottom right, ${theme.primary}66, ${theme.secondary}66)` }}
        />
        <div
          className="absolute top-1/2 -left-20 w-60 h-60 rounded-full blur-3xl opacity-30 animate-float"
          style={{ background: `linear-gradient(to top right, ${theme.primary}44, ${theme.secondary}44)` }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-40 h-40 rounded-full blur-2xl opacity-30 animate-float-delayed"
          style={{ background: `linear-gradient(to bottom left, ${theme.primary}66, ${theme.secondary}66)` }}
        />
      </div>

      <div className={`max-w-md mx-auto relative z-10 ${fontClass}`}>
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div
              className="w-24 h-24 rounded-full p-1 animate-pulse-glow"
              style={{ background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})` }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${theme.bg}` }}>
                {user.avatar ? (
                  <Image src={user.avatar} alt={user.displayName} width={96} height={96} className="object-cover" />
                ) : (
                  <span className="text-3xl font-bold" style={{ color: theme.primary }}>
                    {user.displayName.charAt(0)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-1 font-display" style={{ color: theme.secondary }}>
            {user.displayName}
          </h1>
          <p className="text-sm mb-4" style={{ color: theme.primary }}>@{user.username}</p>
          <p className="max-w-xs mx-auto" style={{ color: theme.secondary }}>{user.bio}</p>

          {user.showSocials && Object.keys(user.socials).length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              {user.socials.twitter && (
                <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center transition-all hover:scale-110" style={{ color: theme.primary }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {user.socials.instagram && (
                <a href={user.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center transition-all hover:scale-110" style={{ color: theme.primary }}>
                  {icons.instagram}
                </a>
              )}
              {user.socials.tiktok && (
                <a href={user.socials.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center transition-all hover:scale-110" style={{ color: theme.primary }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {user.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full bg-white/80 backdrop-blur-sm p-4 ${btnStyle} transition-all hover:scale-[1.02] hover:shadow-lg group`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 ${btnStyle} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                  style={{ background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})` }}
                >
                  {icons[link.icon] || icons.heart}
                </div>
                <span className="flex-1 font-medium" style={{ color: theme.secondary }}>{link.title}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {user.links.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: theme.primary }}>no links yet ♡</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 transition-colors" style={{ color: theme.primary }}>
            <span className="text-sm">Made with</span>
            <span className="font-semibold font-display" style={{ color: theme.secondary }}>sweetheart</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
