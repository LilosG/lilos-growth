import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDirectory = path.resolve("src/content/blog");
const redirects = JSON.parse(fs.readFileSync(path.resolve("vercel.json"), "utf8")).redirects;
const files = fs
  .readdirSync(blogDirectory)
  .filter((file) => /\.(md|mdx)$/.test(file))
  .sort();

const blogRedirects = new Map(
  redirects
    .filter((rule) => /^\/blog\/[^/:*]+$/.test(rule.source) && typeof rule.destination === "string")
    .map((rule) => [rule.source, rule.destination])
);

const normalizeTitle = (title) =>
  title
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

const posts = files.map((filename) => {
  const document = matter(fs.readFileSync(path.join(blogDirectory, filename), "utf8"));
  const slug = (typeof document.data.slug === "string" && document.data.slug.trim()) ||
    filename.replace(/\.(md|mdx)$/, "");
  return {
    filename,
    slug,
    title: typeof document.data.title === "string" ? document.data.title.trim() : "",
    draft: document.data.draft === true,
    body: document.content,
  };
});

export function reviewBlogContent({ posts, redirects }) {
  const errors = [];
  const redirectsMap = new Map(redirects);
  const publishedPosts = posts.filter((post) => !post.draft);
  const publishedRoutes = new Set(publishedPosts.map((post) => `/blog/${post.slug}`));
  const slugs = new Map();
  const titles = new Map();
  const retirements = [];

  for (const post of publishedPosts) {
    const route = `/blog/${post.slug}`;
    if (!post.title) errors.push(`${post.filename}: published article missing title`);
    if (slugs.has(post.slug)) {
      errors.push(`${post.filename}: duplicate published slug shared with ${slugs.get(post.slug)}`);
    } else {
      slugs.set(post.slug, post.filename);
    }

    const titleKey = normalizeTitle(post.title);
    if (titleKey) {
      if (titles.has(titleKey)) {
        errors.push(`${post.filename}: duplicate published title shared with ${titles.get(titleKey)}`);
      } else {
        titles.set(titleKey, post.filename);
      }
    }

    if (redirectsMap.has(route)) {
      errors.push(`${post.filename}: published article is also a redirect source: ${route}`);
    }

    // Only validate literal internal blog paths in Markdown links and HTML hrefs.
    // Content may contain external URLs, anchors and Astro components; avoid guessing.
    const links = [
      ...post.body.matchAll(/\]\((\/blog\/[^)\s#?]+)(?:[?#][^)]*)?\)/g),
      ...post.body.matchAll(/href=["'](\/blog\/[^"'?#]+)(?:[?#][^"']*)?["']/g),
    ].map((match) => match[1].replace(/\/$/, ""));
    for (const link of links) {
      if (redirectsMap.has(link)) {
        retirements.push({ from: route, to: link, destination: redirectsMap.get(link) });
      } else if (!publishedRoutes.has(link)) {
        errors.push(`${post.filename}: internal blog link has no published article: ${link}`);
      }
    }
  }

  for (const [source, target] of redirectsMap) {
    if (publishedRoutes.has(source)) errors.push(`redirect source still published: ${source}`);
    if (source === target) errors.push(`self-redirect: ${source}`);
    if (redirectsMap.has(target)) errors.push(`redirect chain: ${source} -> ${target}`);
    if (!publishedRoutes.has(target)) {
      errors.push(`redirect destination has no published article: ${source} -> ${target}`);
    }
  }

  return {
    errors,
    staleInternalLinks: retirements,
    published: publishedPosts.length,
    drafts: posts.length - publishedPosts.length,
    redirects: redirectsMap.size,
  };
}

export function loadBlogContentReview() {
  return reviewBlogContent({ posts, redirects: [...blogRedirects] });
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const result = loadBlogContentReview();
  console.log(
    `Blog publication audit: ${result.published} published, ${result.drafts} draft, ${result.redirects} article redirects.`
  );
  if (result.staleInternalLinks.length) {
    console.log("Internal links to retired blog URLs (update before publishing):");
    for (const link of result.staleInternalLinks) {
      console.log(`- ${link.from} -> ${link.to} (canonical: ${link.destination})`);
    }
  }
  if (result.errors.length || result.staleInternalLinks.length) {
    for (const error of result.errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
  } else {
    console.log("Content integrity checks passed.");
  }
}
