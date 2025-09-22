import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

// RSS 2.0 feed for the blog collection (no extra deps)
export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog')) as CollectionEntry<'blog'>[];

  posts.sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
    (a.data.date as string) > (b.data.date as string) ? -1 : 1
  );

  const siteUrl = String(site ?? 'https://lilosgrowth.com');
  const feedTitle = 'Lilos Growth — Blog';
  const feedDesc =
    'Guides on Local SEO, Google Business Profile, and high-converting web design for service businesses.';

  const items = posts
    .map((p: CollectionEntry<'blog'>) => {
      const url = new URL(`/blog/${p.slug}`, siteUrl).toString();
      const pub = new Date(p.data.date as string).toUTCString();
      const upd = p.data.updated ? new Date(p.data.updated as string).toUTCString() : pub;
      const description = (p.data.description as string) || (p.data.excerpt as string);

      return `
  <item>
    <title><![CDATA[${p.data.title}]]></title>
    <link>${url}</link>
    <guid>${url}</guid>
    <pubDate>${pub}</pubDate>
    <description><![CDATA[${description}]]></description>
    <atom:updated>${upd}</atom:updated>
  </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${feedTitle}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${feedDesc}]]></description>
    <atom:link href="${new URL('/rss.xml', siteUrl).toString()}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
