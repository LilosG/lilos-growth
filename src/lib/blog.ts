import type { CollectionEntry } from "astro:content";
export type BlogEntry = CollectionEntry<"blog">;

export function getSlug(entry: BlogEntry): string {
  return entry.data.slug || entry.slug;
}

export function getDate(entry: BlogEntry): string | Date | undefined {
  return entry.data.datePublished || (entry.data as any).pubDate;
}

export function byNewest(a: BlogEntry, b: BlogEntry): number {
  const ad = new Date(getDate(a) || 0).getTime();
  const bd = new Date(getDate(b) || 0).getTime();
  return bd - ad;
}

export function allowDrafts(): boolean {
  return import.meta.env.LOCAL_DRAFTS === "1";
}

export function formatDate(input?: string | Date): string {
  if (!input) return "";
  const d = typeof input === "string" ? new Date(input) : input;
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
