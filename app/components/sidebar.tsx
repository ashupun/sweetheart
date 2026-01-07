"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/client";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarProps {
  active: "links" | "appearance" | "templates" | "analytics" | "settings";
  username?: string;
}

export function Sidebar({ active, username }: SidebarProps) {
  const navItems = [
    { id: "links", href: "/dashboard", label: "links", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
    { id: "appearance", href: "/dashboard/appearance", label: "appearance", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
    { id: "templates", href: "/dashboard/templates", label: "templates", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
    { id: "analytics", href: "/dashboard/analytics", label: "analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { id: "settings", href: "/dashboard/settings", label: "settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-56 bg-[#fdf5f3] dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 p-6 hidden lg:flex flex-col transition-colors">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Image src="/sweethearticon.png" alt="sweetheart" width={24} height={24} className="rounded" />
        <span className="text-lg font-bold text-[#1a1a1a] dark:text-white">
          sweethe<span className="text-pink-500">.</span>art
        </span>
      </Link>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              active === item.id
                ? "bg-pink-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
        {username && (
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-600 mb-1">your page</p>
            <a href={`/${username}`} target="_blank" className="text-sm text-pink-500 hover:text-pink-400 transition-colors">
              sweethe.art/{username} ↗
            </a>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
            className="text-xs text-gray-400 dark:text-gray-600 hover:text-pink-500 transition-colors"
          >
            sign out
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
