"use server";

import { db } from "@/lib/db";
import { waitlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function joinWaitlist(email: string) {
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return { error: "please enter a valid email ♡" };
  }

  const existing = await db.select().from(waitlist).where(eq(waitlist.email, email.toLowerCase())).limit(1);

  if (existing.length > 0) {
    return { error: "you're already on the list ♡" };
  }

  await db.insert(waitlist).values({
    email: email.toLowerCase(),
  });

  return { success: true };
}

export async function getWaitlistCount() {
  const result = await db.select().from(waitlist);
  return result.length;
}

