"use server";

import { getProfileAnalytics, getLinkClicks, getCountries, getReferrers, getDevices, getBrowsers } from "@/lib/analytics";
import { getSession } from "@/app/auth/actions";
import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getUserAnalytics() {
  const session = await getSession();
  if (!session?.user) return null;

  const userProfile = await db.select().from(profile).where(eq(profile.userId, session.user.id)).limit(1);
  if (!userProfile[0]) return null;

  const username = userProfile[0].username;

  const [profileViews, linkClicks, countries, referrers, devices, browsers] = await Promise.all([
    getProfileAnalytics(username),
    getLinkClicks(username),
    getCountries(username),
    getReferrers(username),
    getDevices(username),
    getBrowsers(username),
  ]);

  return {
    username,
    profileViews: profileViews?.data?.length || profileViews?.total || 0,
    linkClicks: linkClicks?.data?.length || linkClicks?.total || 0,
    recentViews: profileViews?.data?.slice(0, 10) || [],
    recentClicks: linkClicks?.data?.slice(0, 10) || [],
    countries: countries?.data || [],
    referrers: referrers?.data || [],
    devices: devices?.data || [],
    browsers: browsers?.data || [],
  };
}

