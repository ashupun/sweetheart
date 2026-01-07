"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { link, profile } from "@/lib/db/schema";
import { eq, asc, desc } from "drizzle-orm";
import { getSession } from "../auth/actions";

export async function getLinks() {
  const session = await getSession();
  if (!session?.user) return [];

  const result = await db.select().from(link).where(eq(link.userId, session.user.id)).orderBy(asc(link.position));

  return result;
}

export async function addLink(title: string, url: string) {
  const session = await getSession();
  if (!session?.user) return { error: "not authenticated" };

  const existing = await db.select().from(link).where(eq(link.userId, session.user.id)).orderBy(desc(link.position)).limit(1);

  const position = existing.length > 0 ? (existing[0].position ?? 0) + 1 : 0;

  await db.insert(link).values({
    userId: session.user.id,
    title,
    url,
    position,
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateLink(id: string, updates: Partial<typeof link.$inferSelect>) {
  const session = await getSession();
  if (!session?.user) return { error: "not authenticated" };

  await db
    .update(link)
    .set(updates)
    .where(eq(link.id, id));

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteLink(id: string) {
  const session = await getSession();
  if (!session?.user) return { error: "not authenticated" };

  await db.delete(link).where(eq(link.id, id));

  revalidatePath("/dashboard");
  return { success: true };
}

export async function toggleLink(id: string, enabled: boolean) {
  return updateLink(id, { enabled });
}

export async function getProfileData() {
  const session = await getSession();
  if (!session?.user) return null;

  const result = await db.select().from(profile).where(eq(profile.userId, session.user.id)).limit(1);

  return result[0] || null;
}

export async function updateProfile(updates: Partial<typeof profile.$inferSelect>) {
  const session = await getSession();
  if (!session?.user) return { error: "not authenticated" };

  if (updates.username) {
    const existing = await db.select().from(profile).where(eq(profile.username, updates.username.toLowerCase())).limit(1);

    if (existing.length > 0 && existing[0].userId !== session.user.id) {
      return { error: "username already taken ♡" };
    }
    updates.username = updates.username.toLowerCase();
  }

  await db
    .update(profile)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(profile.userId, session.user.id));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  return { success: true };
}
