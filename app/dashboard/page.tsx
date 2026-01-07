"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Toggle } from "../components/toggle";
import { Loading } from "../components/loading";
import { DashboardLayout } from "../components/layouts";
import { PhonePreview } from "../components/preview";
import { getLinks, addLink, deleteLink, toggleLink, updateLink, getProfileData } from "./actions";
import type { Link as LinkType, Profile } from "@/lib/types";

export default function Dashboard() {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", url: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [linksData, profileData] = await Promise.all([getLinks(), getProfileData()]);
      setLinks(linksData);
      setProfile(profileData);
      setLoading(false);
    }
    load();
  }, []);

  const handleAddLink = async () => {
    if (newLink.title && newLink.url) {
      const result = await addLink(newLink.title, newLink.url);
      if (result.success) {
        const updatedLinks = await getLinks();
        setLinks(updatedLinks);
        setNewLink({ title: "", url: "" });
        setIsAdding(false);
      }
    }
  };

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id);
    setLinks(links.filter(link => link.id !== id));
  };

  const handleToggleLink = async (id: string, enabled: boolean) => {
    await toggleLink(id, !enabled);
    setLinks(links.map(link => link.id === id ? { ...link, enabled: !enabled } : link));
  };

  const handleEditLink = (link: LinkType) => {
    setEditingLink(link.id);
    setEditForm({ title: link.title, url: link.url });
  };

  const handleSaveEdit = async () => {
    if (editingLink && editForm.title && editForm.url) {
      await updateLink(editingLink, { title: editForm.title, url: editForm.url });
      setLinks(links.map(link => link.id === editingLink ? { ...link, ...editForm } : link));
      setEditingLink(null);
      setEditForm({ title: "", url: "" });
    }
  };

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="links" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="links" username={profile?.username} />
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white dark:bg-[#252525] rounded-xl border border-gray-200 dark:border-gray-800">
                    <p className="text-2xl font-bold text-[#1a1a1a] dark:text-white">{links.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">total links</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-[#252525] rounded-xl border border-gray-200 dark:border-gray-800">
                    <p className="text-2xl font-bold text-pink-500">{links.filter(l => l.enabled).length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">active</p>
                  </div>
                  <div className="p-4 bg-linear-to-br from-pink-500 to-purple-500 rounded-xl text-white">
                    <p className="text-2xl font-bold">—</p>
                    <p className="text-xs opacity-80">clicks today</p>
                  </div>
                </div>

                {!isAdding ? (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="w-full mb-6 py-4 border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm hover:border-pink-500 hover:text-pink-500 transition-colors rounded-xl flex items-center justify-center gap-2 group"
                  >
                    <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-500 transition-colors">+</span>
                    add new link
                  </button>
                ) : (
                  <div className="mb-6 p-5 border border-pink-200 dark:border-pink-900/50 rounded-xl bg-white dark:bg-[#252525]">
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={newLink.title}
                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors placeholder:text-gray-400"
                        placeholder="link title"
                        autoFocus
                      />
                      <input
                        type="url"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors placeholder:text-gray-400"
                        placeholder="https://example.com"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={handleAddLink}
                          disabled={!newLink.title || !newLink.url}
                          className="flex-1 py-3 bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          add link
                        </button>
                        <button
                          onClick={() => { setIsAdding(false); setNewLink({ title: "", url: "" }); }}
                          className="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm hover:text-pink-500 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div
                      key={link.id}
                      className={`p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525] group transition-all ${!link.enabled && "opacity-60"}`}
                    >
                      {editingLink === link.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-pink-500"
                            autoFocus
                          />
                          <input
                            type="url"
                            value={editForm.url}
                            onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-pink-500"
                          />
                          <div className="flex gap-2">
                            <button onClick={handleSaveEdit} className="px-4 py-2 bg-pink-500 text-white text-xs rounded-lg">save</button>
                            <button onClick={() => setEditingLink(null)} className="px-4 py-2 text-gray-500 text-xs">cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center gap-1 text-gray-300 dark:text-gray-600">
                            <span className="text-xs font-medium">{index + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-[#1a1a1a] dark:text-white truncate">{link.title}</h3>
                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{link.url}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditLink(link)}
                              className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteLink(link.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <Toggle enabled={link.enabled ?? false} onChange={() => handleToggleLink(link.id, link.enabled ?? false)} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {links.length === 0 && !isAdding && (
                  <div className="text-center py-16 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">no links yet</p>
                    <p className="text-gray-400 dark:text-gray-600 text-xs">add your first link to get started ♡</p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 hidden lg:block">
                <div className="sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a] dark:text-white">live preview</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">updates as you edit</p>
                    </div>
                    <a
                      href={`/${profile?.username}`}
                      target="_blank"
                      className="text-xs text-pink-500 hover:text-pink-400 transition-colors"
                    >
                      open page ↗
                    </a>
                  </div>
                  <div className="flex justify-center">
                    <PhonePreview
                      profile={profile}
                      links={links}
                      theme={profile?.theme ?? undefined}
                      showSocials={profile?.showSocials ?? undefined}
                      template={profile?.template ?? undefined}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
