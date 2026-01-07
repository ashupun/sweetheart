"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema";
import * as schema from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function signup(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || username.length < 4) {
    return { error: "3+ characters ♡" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: "letters, numbers & underscores only ♡" };
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return { error: "please enter a valid email ♡" };
  }
  if (!password || password.length < 6) {
    return { error: "password must be 6+ characters ♡" };
  }

  const existing = await db.select().from(profile).where(eq(profile.username, username.toLowerCase())).limit(1);

  if (existing.length > 0) {
    return { error: "username already taken ♡" };
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: username,
      },
    });

    if (!result.user) {
      return { error: "signup failed" };
    }

    await db.insert(profile).values({
      userId: result.user.id,
      username: username.toLowerCase(),
      displayName: username,
    });
  } catch (e: unknown) {
    const error = e as Error;
    return { error: error.message || "signup failed" };
  }

  return { success: true };
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (e: unknown) {
    const error = e as Error;
    return { error: error.message || "invalid credentials" };
  }

  return { success: true };
}

export async function logout() {
  const headersList = await headers();
  await auth.api.signOut({
    headers: headersList,
  });
  redirect("/");
}

export async function getSession() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  return session;
}

export async function getProfile() {
  const session = await getSession();
  if (!session?.user) return null;

  const result = await db.select().from(profile).where(eq(profile.userId, session.user.id)).limit(1);

  return result[0] || null;
}

export async function getEmailByUsername(username: string) {
  const result = await db
    .select({ email: profile.userId })
    .from(profile)
    .where(eq(profile.username, username.toLowerCase()))
    .limit(1);

  if (result.length === 0) return null;

  const userResult = await db
    .select({ email: schema.user.email })
    .from(schema.user)
    .where(eq(schema.user.id, result[0].email))
    .limit(1);

  return userResult[0]?.email || null;
}

export async function createProfile(username: string, userId: string | null, checkOnly: boolean) {
  if (!username || username.length < 4) {
    return { error: "3+ characters ♡" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: "letters, numbers & underscores only ♡" };
  }

  const existing = await db.select().from(profile).where(eq(profile.username, username.toLowerCase())).limit(1);

  if (existing.length > 0) {
    return { error: "username already taken ♡" };
  }

  if (checkOnly) {
    return { success: true };
  }

  if (!userId) {
    return { error: "user id required" };
  }

  await db.insert(profile).values({
    userId,
    username: username.toLowerCase(),
    displayName: username,
  });

  return { success: true };
}
