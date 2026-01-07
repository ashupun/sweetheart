"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Toggle } from "../../components/toggle";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { DesktopPreview, MiniPreview } from "../../components/preview";
import { getProfileData, getLinks, updateProfile } from "../actions";
import type { Profile, Link as LinkType } from "@/lib/types";

const themes = [
  { id: "pink", name: "pink dreams" },
  { id: "lavender", name: "lavender" },
  { id: "mint", name: "mint" },
  { id: "peach", name: "peach" },
  { id: "ocean", name: "ocean" },
  { id: "rose", name: "rose gold" },
  { id: "midnight", name: "midnight" },
  { id: "sunset", name: "sunset" },
  { id: "forest", name: "forest" },
];

const buttonStyles = [
  { id: "rounded", name: "rounded", class: "rounded-xl" },
  { id: "pill", name: "pill", class: "rounded-full" },
  { id: "sharp", name: "sharp", class: "rounded-md" },
];

const fontOptions = [
  { id: "mono", name: "mono", class: "font-mono" },
  { id: "sans", name: "sans", class: "font-sans" },
  { id: "serif", name: "serif", class: "font-serif" },
];

export default function AppearancePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [selectedTheme, setSelectedTheme] = useState("pink");
  const [selectedButton, setSelectedButton] = useState("rounded");
  const [selectedFont, setSelectedFont] = useState("mono");
  const [showSocialIcons, setShowSocialIcons] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    async function load() {
      const [data, linksData] = await Promise.all([getProfileData(), getLinks()]);
      setProfile(data);
      setLinks(linksData);
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

  const handleStringChange = (setter: (v: string) => void, value: string) => {
    setter(value);
    setHasChanges(true);
  };

  const handleBoolChange = (setter: (v: boolean) => void, value: boolean) => {
    setter(value);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({
      theme: selectedTheme,
      buttonStyle: selectedButton,
      font: selectedFont,
      showSocials: showSocialIcons,
    });
    setHasChanges(false);
    setSaving(false);
  };

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="appearance" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="appearance" username={profile?.username} />
        <main className="p-6 lg:p-8">
          <div className="flex gap-8">
            <div className="flex-1 min-w-0 space-y-6">
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white">theme</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500">choose your color palette</p>
                  </div>
                  <Link href="/dashboard/templates" className="text-xs text-pink-500 hover:text-pink-400 transition-colors">
                    view all templates ↗
                  </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleStringChange(setSelectedTheme, theme.id)}
                      className="group"
                    >
                      <MiniPreview theme={theme.id} selected={selectedTheme === theme.id} />
                      <p className={`text-xs mt-2 text-center transition-colors ${selectedTheme === theme.id ? "text-pink-500" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        }`}>{theme.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                  <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">button style</h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">shape of your link buttons</p>
                  <div className="space-y-2">
                    {buttonStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => handleStringChange(setSelectedButton, style.id)}
                        className={`w-full p-3 rounded-xl border transition-all flex items-center gap-3 ${selectedButton === style.id
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-500/10"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                      >
                        <div className={`w-12 h-6 bg-pink-500 ${style.class}`} />
                        <span className={`text-sm ${selectedButton === style.id ? "text-pink-500" : "text-gray-600 dark:text-gray-400"}`}>{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                  <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">typography</h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">font style for your page</p>
                  <div className="grid grid-cols-3 gap-2">
                    {fontOptions.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => handleStringChange(setSelectedFont, font.id)}
                        className={`p-4 rounded-xl border transition-all text-center ${selectedFont === font.id
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-500/10"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                      >
                        <p className={`text-base mb-1 ${font.class} ${selectedFont === font.id ? "text-pink-500" : "text-[#1a1a1a] dark:text-white"}`}>
                          Aa
                        </p>
                        <p className={`text-xs ${font.class} ${selectedFont === font.id ? "text-pink-400" : "text-gray-400"}`}>
                          {font.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-1">display options</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">customize what shows on your page</p>
                <div className="space-y-0">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-sm text-[#1a1a1a] dark:text-white">social icons</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">show icons below your bio</p>
                    </div>
                    <Toggle enabled={showSocialIcons} onChange={(v) => handleBoolChange(setShowSocialIcons, v)} />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 opacity-50">
                    <div>
                      <p className="text-sm text-[#1a1a1a] dark:text-white flex items-center gap-2">
                        custom background
                        <span className="text-[10px] bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 px-1.5 py-0.5 rounded">pro</span>
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">add your own background image</p>
                    </div>
                    <Toggle enabled={false} onChange={() => { }} />
                  </div>
                  <div className="flex items-center justify-between py-3 opacity-50">
                    <div>
                      <p className="text-sm text-[#1a1a1a] dark:text-white flex items-center gap-2">
                        profile music
                        <span className="text-[10px] bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 px-1.5 py-0.5 rounded">pro</span>
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">add background music to your page</p>
                    </div>
                    <Toggle enabled={false} onChange={() => { }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="flex-1 py-3.5 bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "saving..." : hasChanges ? "save changes" : "saved ♡"}
                </button>
                {hasChanges && (
                  <button
                    onClick={() => {
                      if (profile) {
                        setSelectedTheme(profile.theme || "pink");
                        setSelectedButton(profile.buttonStyle || "rounded");
                        setSelectedFont(profile.font || "mono");
                        setShowSocialIcons(profile.showSocials ?? true);
                        setHasChanges(false);
                      }
                    }}
                    className="px-6 py-3.5 text-gray-500 dark:text-gray-400 text-sm border border-gray-200 dark:border-gray-700 rounded-xl hover:text-pink-500 transition-colors"
                  >
                    reset
                  </button>
                )}
              </div>
            </div>

            <div className="hidden xl:block w-[400px] shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a] dark:text-white">live preview</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">see changes in real-time</p>
                  </div>
                  {hasChanges && (
                    <span className="text-xs text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-full">
                      unsaved
                    </span>
                  )}
                </div>
                <DesktopPreview
                  profile={profile}
                  links={links}
                  theme={selectedTheme}
                  showSocials={showSocialIcons}
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
