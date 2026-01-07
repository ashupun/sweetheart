"use client";

import { useState, useEffect, useRef } from "react";
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
  const [editingField, setEditingField] = useState<{ id: string; field: "title" | "url" } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const [linksData, profileData] = await Promise.all([getLinks(), getProfileData()]);
      setLinks(linksData);
      setProfile(profileData);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingField]);

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

  const startEdit = (id: string, field: "title" | "url", value: string) => {
    setEditingField({ id, field });
    setEditValue(value);
  };

  const saveEdit = async () => {
    if (!editingField || !editValue.trim()) {
      setEditingField(null);
      return;
    }

    const link = links.find(l => l.id === editingField.id);
    if (!link) return;

    const updates = editingField.field === "title" 
      ? { title: editValue } 
      : { url: editValue };

    await updateLink(editingField.id, updates);
    setLinks(links.map(l => l.id === editingField.id ? { ...l, ...updates } : l));
    setEditingField(null);
    setEditValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setEditingField(null);
      setEditValue("");
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
                className={`group py-4 border-b border-gray-200 dark:border-gray-800 ${!link.enabled && "opacity-40"}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-300 dark:text-gray-600 w-4 shrink-0">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    {editingField?.id === link.id && editingField.field === "title" ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={handleKeyDown}
                        className="w-full px-0 py-0 bg-transparent text-[#1a1a1a] dark:text-white border-0 text-sm focus:outline-none"
                      />
                    ) : (
                      <p
                        onClick={() => startEdit(link.id, "title", link.title)}
                        className="text-sm text-[#1a1a1a] dark:text-white truncate cursor-text hover:text-pink-500 transition-colors"
                      >
                        {link.title}
                      </p>
                    )}
                    {editingField?.id === link.id && editingField.field === "url" ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={handleKeyDown}
                        className="w-full px-0 py-0 bg-transparent text-gray-400 border-0 text-xs focus:outline-none"
                      />
                    ) : (
                      <p
                        onClick={() => startEdit(link.id, "url", link.url)}
                        className="text-xs text-gray-400 truncate cursor-text hover:text-pink-500 transition-colors"
                      >
                        {link.url}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="text-xs text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                  <Toggle enabled={link.enabled ?? false} onChange={() => handleToggleLink(link.id, link.enabled ?? false)} />
                </div>
              </div>
            ))}
          </div>

          {links.length === 0 && !isAdding && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">no links yet</p>
            </div>
          )}

          {links.length > 0 && (
            <p className="text-[10px] text-gray-300 dark:text-gray-700 mt-6">
              click to edit • enter to save • esc to cancel
            </p>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
