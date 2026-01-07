"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { getProfileData, updateProfile } from "../actions";
import { signOut } from "@/lib/client";
import type { Profile } from "@/lib/types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ displayName: "", username: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
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
    setError("");
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
        <main className="p-6 lg:p-8 max-w-2xl">
          {error && <p className="text-pink-500 text-sm mb-6">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-6">saved ♡</p>}

          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">display name</label>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="your name"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">username</label>
                <div className="flex items-center border-b border-gray-300 dark:border-gray-700 focus-within:border-pink-500 transition-colors">
                  <span className="text-sm text-gray-400">sweethe.art/</span>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") })}
                    className="flex-1 px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white text-sm focus:outline-none"
                    placeholder="username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  maxLength={150}
                  className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] dark:text-white border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-pink-500 transition-colors resize-none"
                  placeholder="about you"
                />
                <p className="text-xs text-gray-400 text-right mt-1">{form.bio.length}/150</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">account</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-500">password</p>
                <Link href="/forgot" className="text-xs text-pink-500 hover:text-pink-400">change</Link>
              </div>
            </div>
          </section>

          <div className="flex items-center gap-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="py-3 px-8 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              {saving ? "saving..." : "save changes"}
            </button>
            <button
              onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              sign out
            </button>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
