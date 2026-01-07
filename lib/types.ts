import type { profile, link } from "./db/schema";

export type Profile = typeof profile.$inferSelect;
export type Link = typeof link.$inferSelect;
