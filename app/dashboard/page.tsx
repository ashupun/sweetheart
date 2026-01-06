"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";

interface LinkItem {
  id: number;
  title: string;
  url: string;
  icon: string;
}

export default function Dashboard() {
  const [links, setLinks] = useState<LinkItem[]>([
    { id: 1, title: "My Twitch", url: "https://twitch.tv/myhandle", icon: "twitch" },
    { id: 2, title: "YouTube Channel", url: "https://youtube.com/@mychannel", icon: "youtube" },
    { id: 3, title: "Discord Server", url: "https://discord.gg/myserver", icon: "discord" },
  ]);

  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [isAdding, setIsAdding] = useState(false);

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, { id: Date.now(), title: newLink.title, url: newLink.url, icon: "heart" }]);
      setNewLink({ title: "", url: "" });
      setIsAdding(false);
    }
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

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
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-100 text-pink-900 font-medium">
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
          <a href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-pink-700 hover:bg-pink-50 transition-colors">
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
            <h1 className="text-xl font-semibold text-pink-900 hidden lg:block font-display">My Links</h1>
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
          <div className="max-w-2xl mx-auto">
            {/* Add Link Button */}
            {!isAdding ? (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full mb-6 py-4 rounded-2xl border-2 border-dashed border-pink-300 text-pink-600 font-medium hover:border-pink-400 hover:text-pink-700 hover:bg-pink-50 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Link
              </button>
            ) : (
              <div className="glass rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-pink-900 mb-4">Add New Link</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-pink-800 mb-2">Title</label>
                    <input
                      type="text"
                      value={newLink.title}
                      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-pink-900 placeholder-pink-300"
                      placeholder="My awesome link"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pink-800 mb-2">URL</label>
                    <input
                      type="url"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-pink-900 placeholder-pink-300"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={addLink}
                      className="flex-1 py-3 btn-primary text-white font-semibold rounded-xl"
                    >
                      Add Link
                    </button>
                    <button
                      onClick={() => {
                        setIsAdding(false);
                        setNewLink({ title: "", url: "" });
                      }}
                      className="px-6 py-3 btn-secondary rounded-xl text-pink-700 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Links List */}
            <div className="space-y-3">
              {links.map((link) => (
                <div key={link.id} className="glass rounded-2xl p-4 link-card group">
                  <div className="flex items-center gap-4">
                    <div className="cursor-grab text-pink-400 hover:text-pink-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-pink-900">{link.title}</h3>
                      <p className="text-sm text-pink-500 truncate">{link.url}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-pink-100 text-pink-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteLink(link.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-pink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {links.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-pink-900 mb-2">No links yet</h3>
                <p className="text-pink-600">Add your first link to get started!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
