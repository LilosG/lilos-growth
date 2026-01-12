import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";

type BlogEntry = CollectionEntry<"blog">;

export async function GET() {
  const allowDrafts = import.meta.env.LOCAL_DRAFTS === "1";
  const posts = (await getCollection("blog")) as BlogEntry[];
  const getDateValue = (entry: BlogEntry) =>
    entry.data.datePublished ??
    entry.data.pubDate ??
    entry.data.date ??
    entry.data.dateModified ??
    0;
  const filtered = posts
    .filter((p: BlogEntry) => allowDrafts || !p.data.draft)
    .sort(
      (a: BlogEntry, b: BlogEntry) =>
        new Date(getDateValue(b)).getTime() - new Date(getDateValue(a)).getTime()
    );

  return rss({
    title: "Lilos Growth Blog",
    description: "Local SEO, GBP, and conversion-focused websites for home service pros.",
    site: new URL("https://lilosgrowth.com"),
    items: filtered.map((p: BlogEntry) => ({
      title: p.data.title,
      description: p.data.description,
      link: `/blog/${p.data.slug || p.slug}`,
      pubDate: new Date(getDateValue(p) || Date.now()),
      categories: [p.data.category, ...(p.data.tags || [])],
    })),
  });
}
