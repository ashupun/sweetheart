"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/client";

interface SidebarProps {
  active: "links" | "appearance" | "templates" | "analytics" | "misc" | "settings";
  username?: string;
}

const navItems = [
  { id: "links", href: "/dashboard", label: "links" },
  { id: "appearance", href: "/dashboard/appearance", label: "appearance" },
  { id: "templates", href: "/dashboard/templates", label: "templates" },
  { id: "analytics", href: "/dashboard/analytics", label: "analytics" },
  { id: "misc", href: "/dashboard/misc", label: "misc" },
  { id: "settings", href: "/dashboard/settings", label: "settings" },
];

function getInitialCollapsed() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("sidebar-collapsed") === "true";
}

export function Sidebar({ active, username }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
    window.dispatchEvent(new Event("storage"));
  };

  const handleSignOut = () => {
    signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-500 hover:text-pink-500 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-56 bg-[#fdf5f3] dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="h-[57px] px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/sweethearticon.png" alt="" width={18} height={18} />
                <span className="text-sm font-medium text-[#1a1a1a] dark:text-white">
                  sweethe<span className="text-pink-500">.</span>art
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 py-6 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center h-9 px-2 text-sm transition-colors ${active === item.id
                    ? "text-pink-500 font-medium"
                    : "text-gray-400 hover:text-[#1a1a1a] dark:hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
              {username && (
                <a
                  href={`/${username}`}
                  target="_blank"
                  className="block text-xs text-gray-400 hover:text-pink-500 transition-colors mb-3 truncate"
                >
                  sweethe.art/{username} ↗
                </a>
              )}
              <button
                onClick={handleSignOut}
                className="text-xs text-gray-400 hover:text-pink-500 transition-colors"
              >
                sign out
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-[#fdf5f3] dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 hidden lg:flex flex-col transition-all duration-200 ${collapsed ? "w-14" : "w-48"
          }`}
      >
        <div className="h-[57px] px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <Image src="/sweethearticon.png" alt="" width={18} height={18} className="shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium text-[#1a1a1a] dark:text-white truncate">
                sweethe<span className="text-pink-500">.</span>art
              </span>
            )}
          </Link>
          <button
            onClick={toggleCollapsed}
            className="text-gray-300 dark:text-gray-600 hover:text-pink-500 dark:hover:text-pink-500 transition-colors shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-6 px-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center h-9 px-2 text-sm transition-colors ${active === item.id
                ? "text-pink-500 font-medium"
                : "text-gray-400 hover:text-[#1a1a1a] dark:hover:text-white"
                }`}
            >
              {collapsed ? item.label.charAt(0).toUpperCase() : item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
          {username && !collapsed && (
            <a
              href={`/${username}`}
              target="_blank"
              className="block text-xs text-gray-400 hover:text-pink-500 transition-colors mb-3 truncate"
            >
              sweethe.art/{username} ↗
            </a>
          )}
          <button
            onClick={handleSignOut}
            className="text-xs text-gray-400 hover:text-pink-500 transition-colors"
          >
            {collapsed ? "→" : "sign out"}
          </button>
        </div>
      </div>
    </>
  );
}

export function useSidebarWidth() {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed);

  useEffect(() => {
    const checkCollapsed = () => {
      const saved = localStorage.getItem("sidebar-collapsed");
      setCollapsed(saved === "true");
    };

    window.addEventListener("storage", checkCollapsed);
    return () => window.removeEventListener("storage", checkCollapsed);
  }, []);

  return collapsed ? "lg:ml-14" : "lg:ml-48";
}
