"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Toggle } from "../components/toggle";
import { Loading } from "../components/loading";
import { DashboardLayout } from "../components/layouts";
import { useSidebarWidth } from "../components/sidebar";
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

  const sidebarWidth = useSidebarWidth();

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="links" username={profile?.username} />
      <div className={`${sidebarWidth} min-h-screen transition-all duration-200`}>
        <Header title="links" username={profile?.username} />
        <main className="p-6 lg:p-8 max-w-2xl">
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full mb-8 py-3 border-b border-dashed border-gray-300 dark:border-gray-700 text-gray-400 text-sm hover:border-pink-500 hover:text-pink-500 transition-colors text-left"
            >
              + add new link
            </button>
          ) : (
            <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
              <input
                type="text"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400"
                placeholder="title"
                autoFocus
              />
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-400"
                placeholder="url"
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleAddLink}
                  disabled={!newLink.title || !newLink.url}
                  className="py-2 px-6 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors disabled:opacity-50"
                >
                  add
                </button>
                <button
                  onClick={() => { setIsAdding(false); setNewLink({ title: "", url: "" }); }}
                  className="text-gray-500 text-sm hover:text-pink-500 transition-colors"
                >
                  cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-0">
            {links.map((link, index) => (
              <div
                key={link.id}
                className={`py-4 border-b border-gray-200 dark:border-gray-800 ${!link.enabled && "opacity-40"}`}
              >
                {editingLink === link.id ? (
                  <div>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500"
                      autoFocus
                    />
                    <input
                      type="url"
                      value={editForm.url}
                      onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                      className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500"
                    />
                    <div className="flex gap-4 mt-3">
                      <button onClick={handleSaveEdit} className="text-pink-500 text-sm">save</button>
                      <button onClick={() => setEditingLink(null)} className="text-gray-500 text-sm">cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-300 dark:text-gray-600 w-4">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#1a1a1a] dark:text-white truncate">{link.title}</p>
                      <p className="text-xs text-gray-400 truncate">{link.url}</p>
                    </div>
                    <button
                      onClick={() => handleEditLink(link)}
                      className="text-xs text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      delete
                    </button>
                    <Toggle enabled={link.enabled ?? false} onChange={() => handleToggleLink(link.id, link.enabled ?? false)} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {links.length === 0 && !isAdding && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">no links yet</p>
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
