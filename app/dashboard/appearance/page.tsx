"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar, useSidebarWidth } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Toggle } from "../../components/toggle";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { getProfileData, updateProfile } from "../actions";
import type { Profile } from "@/lib/types";

const themes = [
  { id: "pink", name: "pink" },
  { id: "lavender", name: "lavender" },
  { id: "mint", name: "mint" },
  { id: "peach", name: "peach" },
  { id: "ocean", name: "ocean" },
  { id: "rose", name: "rose" },
  { id: "midnight", name: "midnight" },
  { id: "sunset", name: "sunset" },
  { id: "forest", name: "forest" },
];

const themeColors: Record<string, string> = {
  pink: "#ec4899",
  lavender: "#a78bfa",
  mint: "#34d399",
  peach: "#fb923c",
  ocean: "#38bdf8",
  rose: "#f472b6",
  midnight: "#818cf8",
  sunset: "#fb7185",
  forest: "#22c55e",
};

export default function AppearancePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("pink");
  const [showSocialIcons, setShowSocialIcons] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getProfileData();
      setProfile(data);
      if (data) {
        setSelectedTheme(data.theme || "pink");
        setShowSocialIcons(data.showSocials ?? true);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({
      theme: selectedTheme,
      showSocials: showSocialIcons,
    });
    setSaving(false);
  };

  const sidebarWidth = useSidebarWidth();

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="appearance" username={profile?.username} />
      <div className={`${sidebarWidth} min-h-screen transition-all duration-200`}>
        <Header title="appearance" username={profile?.username} />
        <main className="p-6 lg:p-8 max-w-2xl">
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white">theme</h2>
                <p className="text-xs text-gray-400">choose your color</p>
              </div>
              <Link href="/dashboard/templates" className="text-xs text-pink-500 hover:text-pink-400">
                templates →
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`flex items-center gap-2 px-3 py-2 border transition-colors ${selectedTheme === theme.id
                    ? "border-pink-500 text-pink-500"
                    : "border-gray-200 dark:border-gray-800 text-gray-500 hover:border-gray-300"
                    }`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: themeColors[theme.id] }}
                  />
                  <span className="text-xs">{theme.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">options</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <p className="text-sm text-[#1a1a1a] dark:text-white">social icons</p>
                  <p className="text-xs text-gray-400">show below your bio</p>
                </div>
                <Toggle enabled={showSocialIcons} onChange={setShowSocialIcons} />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800 opacity-40">
                <div>
                  <p className="text-sm text-[#1a1a1a] dark:text-white">custom background <span className="text-[10px] text-pink-500">pro</span></p>
                  <p className="text-xs text-gray-400">upload your own image</p>
                </div>
                <Toggle enabled={false} onChange={() => { }} />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800 opacity-40">
                <div>
                  <p className="text-sm text-[#1a1a1a] dark:text-white">profile music <span className="text-[10px] text-pink-500">pro</span></p>
                  <p className="text-xs text-gray-400">add background music</p>
                </div>
                <Toggle enabled={false} onChange={() => { }} />
              </div>
            </div>
          </section>

          <button
            onClick={handleSave}
            disabled={saving}
            className="py-3 px-8 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors disabled:opacity-50"
          >
            {saving ? "saving..." : "save changes"}
          </button>
        </main>
      </div>
    </DashboardLayout>
  );
}
