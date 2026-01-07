"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Toggle } from "../../components/toggle";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layout";
import { getProfileData, updateProfile } from "../actions";
import type { Profile } from "@/lib/types";

const themes = [
  { id: "pink", name: "pink dreams", colors: ["#ec4899", "#db2777", "#fce7f3"] },
  { id: "lavender", name: "lavender", colors: ["#a78bfa", "#8b5cf6", "#ede9fe"] },
  { id: "mint", name: "mint", colors: ["#34d399", "#10b981", "#d1fae5"] },
  { id: "peach", name: "peach", colors: ["#fb923c", "#f97316", "#ffedd5"] },
  { id: "ocean", name: "ocean", colors: ["#38bdf8", "#0ea5e9", "#e0f2fe"] },
  { id: "rose", name: "rose gold", colors: ["#f472b6", "#ec4899", "#fdf2f8"] },
];

const buttonStyles = [
  { id: "rounded", name: "rounded", class: "rounded-xl" },
  { id: "pill", name: "pill", class: "rounded-full" },
  { id: "sharp", name: "sharp", class: "rounded-md" },
];

const fontOptions = [
  { id: "mono", name: "mono", class: "font-mono" },
  { id: "sans", name: "sans", class: "font-sans" },
];

export default function AppearancePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("pink");
  const [selectedButton, setSelectedButton] = useState("rounded");
  const [selectedFont, setSelectedFont] = useState("mono");
  const [showSocialIcons, setShowSocialIcons] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getProfileData();
      setProfile(data);
      if (data) {
        setSelectedTheme(data.theme || "pink");
        setSelectedButton(data.buttonStyle || "rounded");
        setSelectedFont(data.font || "mono");
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
      buttonStyle: selectedButton,
      font: selectedFont,
      showSocials: showSocialIcons,
    });
    setSaving(false);
  };

  const currentTheme = themes.find(t => t.id === selectedTheme);
  const currentButton = buttonStyles.find(s => s.id === selectedButton);

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="appearance" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="appearance" username={profile?.username} maxWidth="4xl" />
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                  <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">theme</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedTheme === theme.id
                            ? "border-pink-500"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className="flex gap-1 mb-2">
                          {theme.colors.map((color, i) => (
                            <div key={i} className="w-5 h-5 rounded-full" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                  <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">button style</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {buttonStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedButton(style.id)}
                        className={`p-4 rounded-lg border transition-all ${
                          selectedButton === style.id
                            ? "border-pink-500"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className={`w-full h-8 bg-pink-500 ${style.class} mb-2`} />
                        <p className="text-xs text-gray-600 dark:text-gray-400">{style.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                  <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">font</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {fontOptions.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={`p-4 rounded-lg border transition-all ${
                          selectedFont === font.id
                            ? "border-pink-500"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <p className={`text-lg text-[#1a1a1a] dark:text-white mb-1 ${font.class}`}>{font.name}</p>
                        <p className={`text-xs text-gray-400 dark:text-gray-500 ${font.class}`}>the quick brown fox</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                  <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">display</h2>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm text-[#1a1a1a] dark:text-white">social icons</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">show icons below your bio</p>
                    </div>
                    <Toggle enabled={showSocialIcons} onChange={setShowSocialIcons} />
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3 bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors rounded disabled:opacity-50"
                >
                  {saving ? "saving..." : "save changes"}
                </button>
              </div>

              <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">preview</p>
                  <div
                    className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                    style={{ backgroundColor: currentTheme?.colors[2] }}
                  >
                    <div className="p-6 min-h-[400px]">
                      <div className="text-center">
                        <div
                          className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-white text-xl font-bold"
                          style={{ backgroundColor: currentTheme?.colors[0] }}
                        >
                          {profile?.displayName?.charAt(0) || "?"}
                        </div>
                        <h4
                          className={`text-lg font-bold mb-1 ${selectedFont === "sans" ? "font-sans" : "font-mono"}`}
                          style={{ color: currentTheme?.colors[1] }}
                        >
                          {profile?.displayName || "you"}
                        </h4>
                        <p className="text-xs mb-4" style={{ color: currentTheme?.colors[0] }}>
                          {profile?.bio || "your bio here"}
                        </p>

                        {showSocialIcons && (
                          <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full opacity-60"
                                style={{ backgroundColor: currentTheme?.colors[0] }}
                              />
                            ))}
                          </div>
                        )}

                        <div className="space-y-2">
                          {["my twitch", "youtube", "discord"].map((link) => (
                            <div key={link} className={`bg-white/80 p-3 ${currentButton?.class}`}>
                              <span
                                className={`text-sm ${selectedFont === "sans" ? "font-sans" : "font-mono"}`}
                                style={{ color: currentTheme?.colors[1] }}
                              >
                                {link}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
