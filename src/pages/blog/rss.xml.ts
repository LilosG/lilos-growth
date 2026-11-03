import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import { getDate, getDateTs, getSlug } from "../../lib/blog";

type BlogEntry = CollectionEntry<"blog">;

export async function GET() {
  const allowDrafts = import.meta.env.LOCAL_DRAFTS === "1";
  const posts = (await getCollection("blog")) as BlogEntry[];
  const filtered = posts
    .filter((post) => (allowDrafts || !post.data.draft) && getDate(post) !== null)
    .sort((a, b) => getDateTs(b) - getDateTs(a));

  return rss({
    title: "Lilos Growth Blog",
    description: "Local SEO, Google Business Profile, and conversion-focused websites for local businesses.",
    site: new URL("https://lilosgrowth.com"),
    items: filtered.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${getSlug(post)}`,
      pubDate: getDate(post)!,
      categories: [post.data.category, ...(post.data.tags || [])],
    })),
  });
}
