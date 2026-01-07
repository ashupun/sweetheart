"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Toggle } from "../components/toggle";
import { Loading } from "../components/loading";
import { DashboardLayout } from "../components/layouts";
import { getLinks, addLink, deleteLink, toggleLink, getProfileData } from "./actions";
import type { Link as LinkType, Profile } from "@/lib/types";

export default function Dashboard() {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
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

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="links" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="links" username={profile?.username} />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">
            {!isAdding ? (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full mb-6 py-3 border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm hover:border-pink-500 hover:text-pink-500 transition-colors rounded-lg flex items-center justify-center gap-2"
              >
                <span>+</span> add new link
              </button>
            ) : (
              <div className="mb-6 p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400"
                    placeholder="title"
                  />
                  <input
                    type="url"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400"
                    placeholder="https://"
                  />
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleAddLink}
                      className="flex-1 py-2 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors rounded"
                    >
                      add link
                    </button>
                    <button
                      onClick={() => { setIsAdding(false); setNewLink({ title: "", url: "" }); }}
                      className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm hover:text-pink-500 transition-colors"
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {links.map((link) => (
                <div
                  key={link.id}
                  className={`p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525] group transition-opacity ${!link.enabled && "opacity-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="cursor-grab text-gray-300 dark:text-gray-600 hover:text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zM8 11h2v2H8v-2zm6 0h2v2h-2v-2zm-6 5h2v2H8v-2zm6 0h2v2h-2v-2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#1a1a1a] dark:text-white truncate">{link.title}</h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{link.url}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-pink-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <Toggle enabled={link.enabled} onChange={() => handleToggleLink(link.id, link.enabled)} />
                  </div>
                </div>
              ))}
            </div>

            {links.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 dark:text-gray-500 text-sm">no links yet</p>
                <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">add your first link to get started ♡</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
