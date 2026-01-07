"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { Alert } from "../../components/alert";
import { DashboardLayout } from "../../components/layout";
import { getProfileData, updateProfile } from "../actions";
import { signOut } from "@/lib/client";
import type { Profile } from "@/lib/types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getProfileData();
      setProfile(data);
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
      setTimeout(() => setSuccess(false), 2000);
    }
    setSaving(false);
  };

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="settings" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="settings" username={profile?.username} />
        <main className="p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message="saved successfully ♡" />}

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
              <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">profile</h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white text-xl font-bold">
                  {form.displayName.charAt(0).toUpperCase() || "?"}
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
                    value={form.displayName}
                    onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">username</label>
                  <div className="flex items-center border-b border-gray-200 dark:border-gray-700 focus-within:border-pink-500 transition-colors">
                    <span className="text-sm text-gray-400 dark:text-gray-500">sweethe.art/</span>
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="flex-1 px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">bio</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={2}
                    className="w-full px-0 py-2 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="py-2 px-4 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors rounded disabled:opacity-50"
                >
                  {saving ? "saving..." : "save changes"}
                </button>
              </div>
            </div>

            <div className="p-6 border border-red-200 dark:border-red-900/50 rounded-lg bg-white dark:bg-[#252525]">
              <h2 className="text-sm font-medium text-red-500 mb-2">danger zone</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                once you delete your account, there is no going back.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
                  className="py-2 px-4 text-gray-500 text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded"
                >
                  sign out
                </button>
                <button className="py-2 px-4 text-red-500 text-sm border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded">
                  delete account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
