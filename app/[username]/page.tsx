import { db } from "@/lib/db";
import { profile, link, social } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProfileContent from "./ProfileContent";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const userProfile = await db.query.profile.findFirst({
    where: eq(profile.username, username.toLowerCase()),
  });

  if (!userProfile) {
    notFound();
  }

  const links = await db.query.link.findMany({
    where: and(eq(link.userId, userProfile.userId), eq(link.enabled, true)),
    orderBy: [link.position],
  });

  const socials = await db.query.social.findMany({
    where: eq(social.userId, userProfile.userId),
  });

  const socialsMap: Record<string, string> = {};
  socials.forEach((s) => {
    socialsMap[s.platform] = s.url;
  });

  const user = {
    username: userProfile.username,
    displayName: userProfile.displayName,
    bio: userProfile.bio || "",
    avatar: userProfile.avatarUrl,
    theme: userProfile.theme || "pink",
    template: userProfile.template || "minimal",
    buttonStyle: userProfile.buttonStyle || "rounded",
    font: userProfile.font || "mono",
    showSocials: userProfile.showSocials ?? true,
    isPro: false,
    links: links.map((l) => ({
      id: l.id,
      title: l.title,
      url: l.url,
      icon: l.icon || "heart",
    })),
    socials: socialsMap,
  };

  return <ProfileContent user={user} />;
}
