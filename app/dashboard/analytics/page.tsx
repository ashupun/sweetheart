"use client";

import { useState, useEffect } from "react";
import { Sidebar, useSidebarWidth } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { getProfileData, getLinks } from "../actions";
import { getUserAnalytics } from "./actions";
import type { Profile, Link } from "@/lib/types";

interface AnalyticsData {
  country?: string;
  referrer?: string;
  device?: string;
  browser?: string;
  views?: number;
  count?: number;
  name?: string;
}

interface Analytics {
  username: string;
  profileViews: number;
  linkClicks: number;
  recentViews: Array<{ timestamp: string; properties?: Record<string, string> }>;
  recentClicks: Array<{ timestamp: string; properties?: Record<string, string> }>;
  countries: AnalyticsData[];
  referrers: AnalyticsData[];
  devices: AnalyticsData[];
  browsers: AnalyticsData[];
}

const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  "Canada": "🇨🇦",
  "Australia": "🇦🇺",
  "Germany": "🇩🇪",
  "France": "🇫🇷",
  "Japan": "🇯🇵",
  "Brazil": "🇧🇷",
  "India": "🇮🇳",
  "Netherlands": "🇳🇱",
  "Spain": "🇪🇸",
  "Italy": "🇮🇹",
  "Mexico": "🇲🇽",
  "South Korea": "🇰🇷",
  "Sweden": "🇸🇪",
  "Poland": "🇵🇱",
  "Ireland": "🇮🇪",
  "Singapore": "🇸🇬",
  "Unknown": "🌍",
};

function StatCard({ value, label, accent }: { value: number | string; label: string; accent?: boolean }) {
  return (
    <div className="py-4 border-b border-gray-200 dark:border-gray-800">
      <p className={`text-3xl font-bold ${accent ? "text-pink-500" : "text-[#1a1a1a] dark:text-white"}`}>
        {value}
      </p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}

function DataList({ title, items, emptyText }: { title: string; items: { name: string; value: number; icon?: string }[]; emptyText: string }) {
  const maxValue = Math.max(...items.map(i => i.value), 1);
  
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-4">{title}</h3>
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="relative">
              <div 
                className="absolute inset-0 bg-pink-50 dark:bg-pink-500/5 rounded"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
              <div className="relative flex items-center justify-between py-2 px-3">
                <span className="text-sm text-[#1a1a1a] dark:text-white flex items-center gap-2">
                  {item.icon && <span>{item.icon}</span>}
                  {item.name || "direct"}
                </span>
                <span className="text-xs text-gray-500">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">{emptyText}</p>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "sources" | "audience">("overview");

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

  const sidebarWidth = useSidebarWidth();

  if (loading) return <Loading />;

  const countriesData = analytics?.countries?.map(c => ({
    name: c.country || c.name || "unknown",
    value: c.views || c.count || 0,
    icon: countryFlags[c.country || c.name || ""] || "🌍",
  })) || [];

  const referrersData = analytics?.referrers?.map(r => ({
    name: r.referrer || r.name || "direct",
    value: r.views || r.count || 0,
  })) || [];

  const devicesData = analytics?.devices?.map(d => ({
    name: d.device || d.name || "unknown",
    value: d.views || d.count || 0,
    icon: (d.device || d.name || "").toLowerCase().includes("mobile") ? "📱" : 
          (d.device || d.name || "").toLowerCase().includes("tablet") ? "📱" : "💻",
  })) || [];

  const browsersData = analytics?.browsers?.map(b => ({
    name: b.browser || b.name || "unknown",
    value: b.views || b.count || 0,
  })) || [];

  const activeLinks = links.filter(l => l.enabled).length;

  return (
    <DashboardLayout>
      <Sidebar active="analytics" username={profile?.username} />
      <div className={`${sidebarWidth} min-h-screen transition-all duration-200`}>
        <Header title="analytics" username={profile?.username} />
        <main className="p-6 lg:p-8 max-w-2xl">
          <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
            {(["overview", "sources", "audience"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm transition-colors ${
                  tab === t
                    ? "text-pink-500 border-b-2 border-pink-500 -mb-px"
                    : "text-gray-400 hover:text-[#1a1a1a] dark:hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <>
              <section className="mb-12">
                <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">last 30 days</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <StatCard value={analytics?.profileViews ?? "—"} label="profile views" />
                  <StatCard value={analytics?.linkClicks ?? "—"} label="link clicks" accent />
                  <StatCard value={links.length} label="total links" />
                  <StatCard value={activeLinks} label="active links" />
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">your links</h2>
                {links.length > 0 ? (
                  <div className="space-y-0">
                    {links.map((link, i) => (
                      <div key={link.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-300 dark:text-gray-600 w-4">{i + 1}</span>
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
            </>
          )}

          {tab === "sources" && (
            <>
              <DataList 
                title="top referrers" 
                items={referrersData} 
                emptyText="no referrer data yet"
              />
              <DataList 
                title="browsers" 
                items={browsersData} 
                emptyText="no browser data yet"
              />
            </>
          )}

          {tab === "audience" && (
            <>
              <DataList 
                title="countries" 
                items={countriesData} 
                emptyText="no location data yet"
              />
              <DataList 
                title="devices" 
                items={devicesData} 
                emptyText="no device data yet"
              />
            </>
          )}

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
