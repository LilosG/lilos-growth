import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import { getDate, getDateTs, getSlug } from "../lib/blog";

type BlogEntry = CollectionEntry<"blog">;

export async function GET() {
  const allowDrafts = import.meta.env.LOCAL_DRAFTS === "1";
  const posts = (await getCollection("blog")) as BlogEntry[];

  // RSS pubDate is the original publication date, not the latest content edit.
  // Do not invent today's date for entries with missing/invalid dates.
  const filtered = posts
    .filter((post) => (allowDrafts || !post.data.draft) && getDate(post) !== null)
    .sort((a, b) => getDateTs(b) - getDateTs(a));

  return rss({
    title: "Lilos Growth",
    description: "Latest from Lilos Growth.",
    site: new URL("https://lilosgrowth.com"),
    items: filtered.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${getSlug(post)}`,
      pubDate: getDate(post)!,
    })),
  });
}
