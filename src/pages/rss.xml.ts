import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';

type BlogEntry = CollectionEntry<'blog'>;

export async function GET() {
  const allowDrafts = import.meta.env.LOCAL_DRAFTS === '1';
  const posts = (await getCollection('blog')) as BlogEntry[];
  const filtered = posts
    .filter((p: BlogEntry) => allowDrafts || !p.data.draft)
    .sort(
      (a: BlogEntry, b: BlogEntry) =>
        new Date(b.data.datePublished || (b as any).data?.pubDate || 0).getTime() -
        new Date(a.data.datePublished || (a as any).data?.pubDate || 0).getTime()
    );

  return rss({
    title: 'Lilos Growth',
    description: 'Latest from Lilos Growth.',
    site: new URL('https://lilosgrowth.com'),
    items: filtered.map((p: BlogEntry) => ({
      title: p.data.title,
      description: p.data.description,
      link: `/blog/${p.data.slug || p.slug}`,
      pubDate: new Date(p.data.datePublished || (p as any).data?.pubDate || Date.now()),
    })),
  });
}
