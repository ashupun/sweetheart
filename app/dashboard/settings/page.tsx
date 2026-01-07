"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { Alert } from "../../components/alert";
import { DashboardLayout } from "../../components/layouts";
import { DesktopPreview } from "../../components/preview";
import { getProfileData, getLinks, updateProfile } from "../actions";
import { signOut } from "@/lib/client";
import type { Profile, Link } from "@/lib/types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "account">("profile");

  useEffect(() => {
    async function load() {
      const [data, linksData] = await Promise.all([getProfileData(), getLinks()]);
      setProfile(data);
      setLinks(linksData);
      if (data) {
        setForm({
          displayName: data.displayName || "",
          username: data.username || "",
          bio: data.bio || "",
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    const result = await updateProfile({
      displayName: form.displayName,
      username: form.username,
      bio: form.bio,
    });

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setProfile(prev => prev ? { ...prev, ...form } : null);
      setTimeout(() => setSuccess(false), 2000);
    }
    setSaving(false);
  };

  if (loading) return <Loading />;

  const previewProfile = { ...profile, ...form } as Profile;

  return (
    <DashboardLayout>
      <Sidebar active="settings" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="settings" username={profile?.username} />
        <main className="p-6 lg:p-8">
          <div className="flex gap-8">
            <div className="flex-1 min-w-0 space-y-6">
                {error && <Alert type="error" message={error} />}
                {success && <Alert type="success" message="saved successfully ♡" />}

                <div className="flex gap-1 p-1 bg-gray-100 dark:bg-[#252525] rounded-xl">
                  {(["profile", "account"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab
                          ? "bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-[#1a1a1a] dark:hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "profile" && (
                  <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                    <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">profile info</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">this is how you appear on your page</p>

                    <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl">
                      <div className="w-20 h-20 rounded-full bg-linear-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {form.displayName.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <button className="text-sm text-pink-500 hover:text-pink-400 transition-colors mb-1">
                          upload photo
                        </button>
                        <p className="text-xs text-gray-400 dark:text-gray-500">jpg, png or gif. max 2mb</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">display name</label>
                        <input
                          type="text"
                          value={form.displayName}
                          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                          placeholder="your name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">username</label>
                        <div className="flex items-center bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-xl focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500 transition-colors overflow-hidden">
                          <span className="text-sm text-gray-400 dark:text-gray-500 pl-4">sweethe.art/</span>
                          <input
                            type="text"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") })}
                            className="flex-1 px-0 py-3 pr-4 bg-transparent text-[#1a1a1a] dark:text-white text-sm focus:outline-none"
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">bio</label>
                        <textarea
                          value={form.bio}
                          onChange={(e) => setForm({ ...form, bio: e.target.value })}
                          rows={3}
                          maxLength={150}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors resize-none"
                          placeholder="tell people about yourself ♡"
                        />
                        <p className="text-xs text-gray-400 mt-1 text-right">{form.bio.length}/150</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "account" && (
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                      <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">account</h2>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">manage your account settings</p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                          <div>
                            <p className="text-sm text-[#1a1a1a] dark:text-white">email</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">contact support to change</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm text-[#1a1a1a] dark:text-white">password</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">••••••••</p>
                          </div>
                          <a href="/forgot" className="text-xs text-pink-500 hover:text-pink-400 transition-colors">
                            change
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-500/5 dark:to-purple-500/5 border border-pink-200 dark:border-pink-900/30">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm shrink-0">
                          ♡
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">upgrade to pro</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            unlock custom backgrounds, music, and premium templates
                          </p>
                          <a href="/pricing" className="text-xs text-pink-500 hover:text-pink-400 transition-colors font-medium">
                            view pricing →
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border border-red-200 dark:border-red-900/50 rounded-xl bg-white dark:bg-[#252525]">
                      <h2 className="text-sm font-medium text-red-500 mb-1">danger zone</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                        these actions are irreversible. please be careful.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
                          className="py-2.5 px-5 text-gray-600 dark:text-gray-400 text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-xl"
                        >
                          sign out
                        </button>
                        <button className="py-2.5 px-5 text-red-500 text-sm border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-xl">
                          delete account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab !== "account" && (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-3.5 bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors rounded-xl disabled:opacity-50"
                  >
                    {saving ? "saving..." : "save changes"}
                  </button>
                )}
              </div>

            <div className="hidden xl:block w-[400px] shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a] dark:text-white">live preview</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">see changes in real-time</p>
                  </div>
                  <a
                    href={`/${profile?.username}`}
                    target="_blank"
                    className="text-xs text-pink-500 hover:text-pink-400 transition-colors"
                  >
                    open page ↗
                  </a>
                </div>
                <DesktopPreview
                  profile={previewProfile}
                  links={links}
                  theme={profile?.theme ?? undefined}
                  showSocials={profile?.showSocials ?? undefined}
                  template={profile?.template ?? undefined}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
