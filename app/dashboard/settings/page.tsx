"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    displayName: "Sakura",
    username: "sakura",
    email: "sakura@example.com",
    bio: "Gamer girl, artist & pink enthusiast. Let's be friends!",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    weeklyDigest: false,
    newFollowers: true,
    linkClicks: false,
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full blur-3xl opacity-30 animate-float-slow" />
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-pink-200 to-pink-300 rounded-full blur-3xl opacity-20 animate-float" />
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 glass border-r border-pink-200 p-6 hidden lg:block">
        <Link href="/" className="text-2xl font-bold gradient-text font-display block mb-8">
          sweetheart
        </Link>

        <nav className="space-y-2">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-pink-700 hover:bg-pink-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Links
          </a>
          <a href="/dashboard/appearance" className="flex items-center gap-3 px-4 py-3 rounded-xl text-pink-700 hover:bg-pink-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Appearance
          </a>
          <a href="/dashboard/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-pink-700 hover:bg-pink-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </a>
          <a href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-100 text-pink-900 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-pink-600 text-sm mb-2">Your page is live at:</p>
            <a href="/sakura" target="_blank" className="text-pink-800 font-medium hover:text-pink-900 break-all">
              sweetheart.link/sakura
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 glass border-b border-pink-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              <Link href="/" className="text-xl font-bold gradient-text font-display">
                sweetheart
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-pink-900 hidden lg:block font-display">Settings</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a href="/sakura" target="_blank" className="btn-secondary px-4 py-2 rounded-full text-sm font-medium text-pink-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </a>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile Section */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-pink-900 mb-6 font-display flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-pink-500">
                      {profile.displayName.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <button className="btn-secondary px-4 py-2 rounded-xl text-sm font-medium text-pink-700">
                    Upload Photo
                  </button>
                  <p className="text-xs text-pink-500 mt-1">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">Display Name</label>
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-pink-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">Username</label>
                  <div className="flex">
                    <span className="px-4 py-3 bg-pink-100 border-2 border-r-0 border-pink-200 rounded-l-xl text-pink-600 text-sm">
                      sweetheart.link/
                    </span>
                    <input
                      type="text"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-r-xl bg-white/50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-pink-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-pink-900 resize-none"
                  />
                </div>
                <button className="btn-primary px-6 py-3 rounded-xl text-white font-semibold">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Account Section */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-pink-900 mb-6 font-display flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Account
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-pink-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-pink-900 placeholder-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-pink-900 placeholder-pink-300"
                  />
                </div>
                <button className="btn-secondary px-6 py-3 rounded-xl text-pink-700 font-semibold">
                  Update Password
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-pink-900 mb-6 font-display flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
              </h2>

              <div className="space-y-4">
                {[
                  { key: "emailUpdates", label: "Email Updates", desc: "Receive updates about new features" },
                  { key: "weeklyDigest", label: "Weekly Digest", desc: "Get a summary of your stats every week" },
                  { key: "newFollowers", label: "New Followers", desc: "Be notified when someone follows you" },
                  { key: "linkClicks", label: "Link Clicks", desc: "Get alerts when your links get clicks" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-pink-100 last:border-0">
                    <div>
                      <p className="font-medium text-pink-900">{item.label}</p>
                      <p className="text-sm text-pink-600">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-pink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass rounded-2xl p-6 border-2 border-red-200">
              <h2 className="text-lg font-semibold text-red-600 mb-4 font-display flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Danger Zone
              </h2>
              <p className="text-pink-700 text-sm mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-xl transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
