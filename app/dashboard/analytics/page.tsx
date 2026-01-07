"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
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

  return (
    <DashboardLayout>
      <Sidebar active="analytics" username={profile?.username} />
      <div className="lg:ml-56 min-h-screen">
        <Header title="analytics" username={profile?.username} />
        <main className="p-6 lg:p-8 max-w-2xl">
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="py-4 border-b border-gray-200 dark:border-gray-800">
                <p className="text-2xl font-bold text-[#1a1a1a] dark:text-white">{links.length}</p>
                <p className="text-xs text-gray-400">total links</p>
              </div>
              <div className="py-4 border-b border-gray-200 dark:border-gray-800">
                <p className="text-2xl font-bold text-pink-500">{links.filter(l => l.enabled).length}</p>
                <p className="text-xs text-gray-400">active</p>
              </div>
            </div>
          </section>

          {links.length > 0 && (
            <section className="mb-12">
              <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">your links</h2>
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
            </section>
          )}

          <section>
            <a
              href="https://databuddy.cc/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-4 border-b border-gray-200 dark:border-gray-800 text-sm text-pink-500 hover:text-pink-400 transition-colors"
            >
              view detailed analytics →
            </a>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
}
