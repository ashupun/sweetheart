"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/client";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarProps {
  active: "links" | "appearance" | "templates" | "analytics" | "settings";
  username?: string;
}

export function Sidebar({ active, username }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  const navItems = [
    { id: "links", href: "/dashboard", label: "links" },
    { id: "appearance", href: "/dashboard/appearance", label: "appearance" },
    { id: "templates", href: "/dashboard/templates", label: "templates" },
    { id: "analytics", href: "/dashboard/analytics", label: "analytics" },
    { id: "settings", href: "/dashboard/settings", label: "settings" },
  ];

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/sweethearticon.png" alt="sweetheart" width={20} height={20} className="rounded" />
          {(!collapsed || mobile) && (
            <span className="text-sm font-medium text-[#1a1a1a] dark:text-white">
              sweethe<span className="text-pink-500">.</span>art
            </span>
          )}
        </Link>
        {!mobile && (
          <button
            onClick={toggleCollapsed}
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        )}
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => mobile && setMobileOpen(false)}
            className={`flex items-center gap-3 py-2 text-sm transition-colors ${
              active === item.id
                ? "text-pink-500"
                : "text-gray-500 dark:text-gray-400 hover:text-pink-500"
            }`}
          >
            {(!collapsed || mobile) ? item.label : item.label.charAt(0)}
            {active === item.id && (!collapsed || mobile) && <span className="text-pink-500">←</span>}
          </Link>
        ))}
      </nav>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
        {username && (!collapsed || mobile) && (
          <a
            href={`/${username}`}
            target="_blank"
            className="block text-xs text-pink-500 hover:text-pink-400 transition-colors truncate"
          >
            /{username} ↗
          </a>
        )}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
            className="text-xs text-gray-400 hover:text-pink-500 transition-colors"
          >
            {(!collapsed || mobile) ? "sign out" : "×"}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-500 hover:text-pink-500 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-56 bg-[#fdf5f3] dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <SidebarContent mobile />
          </div>
        </div>
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-[#fdf5f3] dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 p-6 hidden lg:flex flex-col transition-all duration-200 ${
          collapsed ? "w-16" : "w-48"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}

export function useSidebarWidth() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") setCollapsed(true);

    const handleStorage = () => {
      const saved = localStorage.getItem("sidebar-collapsed");
      setCollapsed(saved === "true");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return collapsed ? "lg:ml-16" : "lg:ml-48";
}
