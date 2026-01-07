"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layout";
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
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">total views</p>
                <p className="text-3xl font-bold text-[#1a1a1a] dark:text-white">—</p>
                <p className="text-xs text-gray-400 mt-1">coming soon</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">link clicks</p>
                <p className="text-3xl font-bold text-[#1a1a1a] dark:text-white">—</p>
                <p className="text-xs text-gray-400 mt-1">coming soon</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">total links</p>
                <p className="text-3xl font-bold text-pink-500">{totalLinks}</p>
                <p className="text-xs text-gray-400 mt-1">{activeLinks} active</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525]">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">click rate</p>
                <p className="text-3xl font-bold text-[#1a1a1a] dark:text-white">—</p>
                <p className="text-xs text-gray-400 mt-1">coming soon</p>
              </div>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#252525] mb-6">
              <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-4">top links</h2>
              {links.length > 0 ? (
                <div className="space-y-3">
                  {links.slice(0, 5).map((link, i) => (
                    <div key={link.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                        <div>
                          <p className="text-sm text-[#1a1a1a] dark:text-white">{link.title}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{link.url}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">— clicks</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">no links yet</p>
              )}
            </div>

            <div className="p-6 border border-pink-200 dark:border-pink-900/30 rounded-lg bg-pink-50 dark:bg-pink-500/5">
              <h2 className="text-sm font-medium text-pink-600 dark:text-pink-400 mb-2">analytics coming soon ♡</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                we&apos;re working on bringing you detailed analytics including page views, link clicks, referrers, and more.
              </p>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

