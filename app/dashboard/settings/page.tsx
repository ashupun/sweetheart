"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../../components/ThemeToggle";
import { Sidebar } from "../../components/sidebar";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    displayName: "sakura",
    username: "sakura",
    email: "sakura@example.com",
    bio: "gamer girl, artist & pink enthusiast ♡",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    weeklyDigest: false,
    newFollowers: true,
    linkClicks: false,
  });

  return (
    <div className="min-h-screen bg-[#fdf5f3] dark:bg-[#1a1a1a] font-mono transition-colors">
      <Sidebar active="settings" />

      <div className="lg:ml-56 min-h-screen">
        <header className="sticky top-0 z-20 bg-[#fdf5f3]/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="lg:hidden">
              <Link href="/" className="text-lg font-bold text-[#1a1a1a] dark:text-white">
                sweethe<span className="text-pink-500">.</span>art
              </Link>
            </div>
            <h1 className="text-sm text-gray-500 dark:text-gray-400 hidden lg:block">settings</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a href="/sakura" target="_blank" className="text-xs text-pink-500 hover:text-pink-400 transition-colors">
                preview ↗
              </a>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
              <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">profile</h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white text-xl font-bold">
                  {profile.displayName.charAt(0).toUpperCase()}
                </div>
                <button className="text-xs text-pink-500 hover:text-pink-400 transition-colors">
                  upload photo
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">display name</label>
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">username</label>
                  <div className="flex items-center border-b border-gray-200 dark:border-gray-700 focus-within:border-pink-500 transition-colors">
                    <span className="text-sm text-gray-400 dark:text-gray-500">sweethe.art/</span>
                    <input
                      type="text"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      className="flex-1 px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={2}
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors resize-none"
                  />
                </div>
                <button className="py-2 px-4 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors rounded">
                  save changes
                </button>
              </div>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
              <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">account</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">current password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">new password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  />
                </div>
                <button className="py-2 px-4 text-gray-500 dark:text-gray-400 text-sm hover:text-pink-500 transition-colors">
                  update password
                </button>
              </div>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
              <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">notifications</h2>

              <div className="space-y-4">
                {[
                  { key: "emailUpdates", label: "email updates", desc: "receive updates about new features" },
                  { key: "weeklyDigest", label: "weekly digest", desc: "get a summary of your stats" },
                  { key: "newFollowers", label: "new followers", desc: "be notified when someone follows you" },
                  { key: "linkClicks", label: "link clicks", desc: "get alerts when your links get clicks" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm text-[#1a1a1a] dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${notifications[item.key as keyof typeof notifications] ? "bg-pink-500" : "bg-gray-300 dark:bg-gray-600"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${notifications[item.key as keyof typeof notifications] ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border border-red-200 dark:border-red-900/50 rounded-lg bg-white dark:bg-[#252525]">
              <h2 className="text-sm font-medium text-red-500 mb-2">danger zone</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                once you delete your account, there is no going back.
              </p>
              <button className="py-2 px-4 text-red-500 text-sm border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded">
                delete account
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
