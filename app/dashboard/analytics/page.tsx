"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { getProfileData, getLinks } from "../actions";
import { getUserAnalytics } from "./actions";
import type { Profile, Link } from "@/lib/types";

interface Analytics {
  username: string;
  profileViews: number;
  linkClicks: number;
  recentViews: Array<{ timestamp: string; properties?: Record<string, string> }>;
  recentClicks: Array<{ timestamp: string; properties?: Record<string, string> }>;
}

export default function AnalyticsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [profileData, linksData, analyticsData] = await Promise.all([
        getProfileData(),
        getLinks(),
        getUserAnalytics(),
      ]);
      setProfile(profileData);
      setLinks(linksData);
      setAnalytics(analyticsData);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <Sidebar active="analytics" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="analytics" username={profile?.username} />
        <main className="p-6 lg:p-8 max-w-2xl">
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">last 30 days</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="py-4 border-b border-gray-200 dark:border-gray-800">
                <p className="text-3xl font-bold text-[#1a1a1a] dark:text-white">
                  {analytics?.profileViews ?? "—"}
                </p>
                <p className="text-xs text-gray-400">profile views</p>
              </div>
              <div className="py-4 border-b border-gray-200 dark:border-gray-800">
                <p className="text-3xl font-bold text-pink-500">
                  {analytics?.linkClicks ?? "—"}
                </p>
                <p className="text-xs text-gray-400">link clicks</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">your links</h2>
            {links.length > 0 ? (
              <div className="space-y-0">
                {links.map((link, i) => (
                  <div key={link.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-300 w-4">{i + 1}</span>
                      <div>
                        <p className="text-sm text-[#1a1a1a] dark:text-white">{link.title}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{link.url}</p>
                      </div>
                    </div>
                    <span className={`text-xs ${link.enabled ? "text-green-500" : "text-gray-400"}`}>
                      {link.enabled ? "active" : "hidden"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">no links yet</p>
            )}
          </section>

          {!analytics && (
            <section className="py-8 text-center border border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-400 mb-2">analytics coming soon</p>
              <p className="text-xs text-gray-500">we&apos;re setting up detailed stats for you ♡</p>
            </section>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
