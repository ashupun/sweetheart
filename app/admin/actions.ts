"use server";

import { db } from "@/lib/db";
import { waitlist } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

const attempts = new Map<string, { count: number; timestamp: number }>();

async function getClientIP(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const real = headersList.get("x-real-ip");
  return forwarded?.split(",")[0] || real || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    attempts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_ATTEMPTS) {
    return true;
  }

  record.count++;
  return false;
}

function clearRateLimit(ip: string) {
  attempts.delete(ip);
}

export async function verifyAdmin(password: string): Promise<boolean> {
  if (!ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD not set in environment");
    return false;
  }

  const ip = await getClientIP();

  if (isRateLimited(ip)) {
    return false;
  }

  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

  const isValid = password === ADMIN_PASSWORD;

  if (isValid) {
    clearRateLimit(ip);
  }

  return isValid;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: Date;
}

export async function getWaitlistEmails(token: string): Promise<WaitlistEntry[] | null> {
  if (!ADMIN_PASSWORD || token !== ADMIN_PASSWORD) {
    return null;
  }

  const entries = await db
    .select()
    .from(waitlist)
    .orderBy(desc(waitlist.createdAt));

  return entries;
}

export async function getWaitlistStats(token: string): Promise<{ total: number; today: number; week: number } | null> {
  if (!ADMIN_PASSWORD || token !== ADMIN_PASSWORD) {
    return null;
  }

  const entries = await db.select().from(waitlist);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);

  return {
    total: entries.length,
    today: entries.filter((e) => new Date(e.createdAt) >= todayStart).length,
    week: entries.filter((e) => new Date(e.createdAt) >= weekStart).length,
  };
}

