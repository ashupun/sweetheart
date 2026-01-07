"use server";

import { getProfileAnalytics, getLinkClicks } from "@/lib/analytics";
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

  const [profileViews, linkClicks] = await Promise.all([
    getProfileAnalytics(username),
    getLinkClicks(username),
  ]);

  return {
    username,
    profileViews: profileViews?.data?.length || 0,
    linkClicks: linkClicks?.data?.length || 0,
    recentViews: profileViews?.data?.slice(0, 10) || [],
    recentClicks: linkClicks?.data?.slice(0, 10) || [],
  };
}

