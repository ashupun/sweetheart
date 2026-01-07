"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { DesktopPreview } from "../../components/preview";
import { getProfileData, getLinks } from "../actions";
import type { Profile, Link } from "@/lib/types";

export default function AnalyticsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [profileData, linksData] = await Promise.all([getProfileData(), getLinks()]);
      setProfile(profileData);
      setLinks(linksData);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Loading />;

  const totalLinks = links.length;
  const activeLinks = links.filter(l => l.enabled).length;

  return (
    <DashboardLayout>
      <Sidebar active="analytics" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="analytics" username={profile?.username} />
        <main className="p-6 lg:p-8">
          <div className="flex gap-8">
            <div className="flex-1 min-w-0 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">total links</p>
                      <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-[#1a1a1a] dark:text-white">{totalLinks}</p>
                    <p className="text-xs text-green-500 mt-1">all time</p>
                  </div>
                  <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">active links</p>
                      <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-[#1a1a1a] dark:text-white">{activeLinks}</p>
                    <p className="text-xs text-gray-400 mt-1">{totalLinks > 0 ? Math.round((activeLinks / totalLinks) * 100) : 0}% enabled</p>
                  </div>
                </div>

                {links.length > 0 && (
                  <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#252525]">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white">your links</h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500">overview of all your links</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {links.map((link, i) => (
                        <div key={link.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-400 w-5">{i + 1}</span>
                            <div>
                              <p className="text-sm text-[#1a1a1a] dark:text-white">{link.title}</p>
                              <p className="text-xs text-gray-400 truncate max-w-[200px]">{link.url}</p>
                            </div>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full ${link.enabled ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                            {link.enabled ? "active" : "hidden"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href="https://databuddy.cc/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 border border-pink-200 dark:border-pink-900/30 rounded-xl bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-500/5 dark:to-purple-500/5 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-500/10 dark:hover:to-purple-500/10 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-0.5">view detailed analytics ♡</h2>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        page views, visitors, referrers, devices & more
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
              </div>

            <div className="hidden xl:block w-[400px] shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a] dark:text-white">your page</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">how visitors see you</p>
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
                  profile={profile}
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
