// src/lib/blog.ts
import type { CollectionEntry } from "astro:content";

/** Strong type alias for blog entries */
export type BlogEntry = CollectionEntry<"blog">;

/** Frontmatter keys we’ll check (in order) to find a publish date */
const DATE_KEYS = [
  "pubDate", // z.date() is ideal in your schema
  "datePublished", // ISO string or Date
  "publishedAt", // ISO string or Date
  "date", // ISO string or Date
  "updated", // fallback if above are missing
  "lastmod", // occasional key in migrated content
] as const;

type DateLike = Date | string | number | undefined | null;

/* ------------------------------- Core utils ------------------------------- */

/** True when local dev preview of drafts is enabled */
export function allowDrafts(): boolean {
  // Set LOCAL_DRAFTS=1 in your .env.local to include drafts in lists.
  return import.meta.env.LOCAL_DRAFTS === "1";
}

/** Best-effort coercion of a value to a valid Date (or null). */
function toDate(v: DateLike): Date | null {
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  if (typeof v === "string" || typeof v === "number") {
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

/** Extract the first usable publish date from a BlogEntry’s frontmatter. */
export function getDate(entry: BlogEntry): Date | null {
  // Prefer explicit pubDate if present/typed by Zod
  if (entry.data && (entry.data as any).pubDate instanceof Date) {
    return (entry.data as any).pubDate as Date;
  }
  // Otherwise scan known keys
  for (const key of DATE_KEYS) {
    const v = (entry.data as Record<string, unknown>)[key];
    const d = toDate(v as DateLike);
    if (d) return d;
  }
  return null;
}

/** Publish timestamp (ms since epoch). Falls back to 0 for missing dates. */
export function getDateTs(entry: BlogEntry): number {
  return (getDate(entry) ?? new Date(0)).getTime();
}

/** Slug helper: prefer frontmatter `slug`, else content collection slug. */
export function getSlug(entry: BlogEntry): string {
  const fmSlug = (entry.data as Record<string, unknown>).slug;
  return typeof fmSlug === "string" && fmSlug.trim() ? fmSlug : entry.slug;
}

/** Draft flag resolver (frontmatter: draft: true). */
export function isDraft(entry: BlogEntry): boolean {
  const v = (entry.data as Record<string, unknown>).draft;
  return v === true;
}

/** Filter out drafts unless LOCAL_DRAFTS=1. */
export function visibleOnly(entries: BlogEntry[]): BlogEntry[] {
  return allowDrafts() ? entries : entries.filter((e) => !isDraft(e));
}

/** Locale-aware date formatter. Safe on missing/invalid dates. */
export function formatDate(input?: Date | string, locale = "en-US"): string {
  const d = typeof input === "string" ? toDate(input) : (input ?? null);
  if (!d) return "";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ------------------------------- Sort helpers ----------------------------- */

/** Newest first (descending by publish date). */
export function byNewest(a: BlogEntry, b: BlogEntry): number {
  return getDateTs(b) - getDateTs(a);
}

/** Oldest first (ascending by publish date). */
export function byOldest(a: BlogEntry, b: BlogEntry): number {
  return getDateTs(a) - getDateTs(b);
}

/* ------------------------------ Filter helpers ---------------------------- */

/** Match a given tag (case-sensitive by default, matching your data). */
export const byTag =
  (tag: string) =>
  (p: BlogEntry): boolean =>
    Array.isArray((p.data as Record<string, unknown>).tags) &&
    ((p.data as Record<string, unknown>).tags as unknown[]).includes(tag);

/** Match a given category (string). */
export const byCategory =
  (cat: string) =>
  (p: BlogEntry): boolean =>
    typeof (p.data as Record<string, unknown>).category === "string" &&
    ((p.data as Record<string, unknown>).category as string) === cat;

/** Simple text search across title/description (case-insensitive). */
export const bySearch = (q: string) => {
  const needle = q.trim().toLowerCase();
  return (p: BlogEntry): boolean => {
    if (!needle) return true;
    const { title, description } = p.data as Record<string, unknown>;
    const hay =
      `${typeof title === "string" ? title : ""} ${typeof description === "string" ? description : ""}`.toLowerCase();
    return hay.includes(needle);
  };
};

/* ----------------------------- Pipeline helpers --------------------------- */

/**
 * Build a standard listing pipeline:
 *   1) remove drafts (unless LOCAL_DRAFTS=1)
 *   2) optional additional filter(s)
 *   3) sort newest-first
 */
export function toListing(
  entries: BlogEntry[],
  ...filters: Array<(e: BlogEntry) => boolean>
): BlogEntry[] {
  const base = visibleOnly(entries);
  const filtered = filters.length ? base.filter((e) => filters.every((f) => f(e))) : base;
  return filtered.sort(byNewest);
}
