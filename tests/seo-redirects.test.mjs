import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.resolve(".");
const redirects = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8")).redirects;
const blogDir = path.join(root, "src/content/blog");

const slugFor = (urlPath) => urlPath.match(/^\/blog\/([^/?#]+)$/)?.[1] ?? null;
const hasBlogEntry = (slug) =>
  [".md", ".mdx"].some((extension) => fs.existsSync(path.join(blogDir, slug + extension)));

describe("SEO content consolidation redirects", () => {
  const blogRedirects = redirects.filter(
    (redirect) => slugFor(redirect.source) !== null && redirect.destination.startsWith("/blog/")
  );

  it("keeps unique blog redirect sources and permanent direct destinations", () => {
    const sources = blogRedirects.map((redirect) => redirect.source);
    expect(new Set(sources).size).toBe(sources.length);
    const destinations = new Set(redirects.map((redirect) => redirect.source));

    for (const redirect of blogRedirects) {
      const destinationSlug = slugFor(redirect.destination);
      expect(redirect.permanent, redirect.source).toBe(true);
      expect(destinationSlug, redirect.source).not.toBeNull();
      expect(redirect.destination, redirect.source).not.toBe(redirect.source);
      expect(destinations.has(redirect.destination), redirect.source).toBe(false);
      expect(hasBlogEntry(destinationSlug), redirect.source).toBe(true);
    }
  });

  it("does not leave retired blog files in the content collection", () => {
    for (const redirect of blogRedirects) {
      expect(hasBlogEntry(slugFor(redirect.source)), redirect.source).toBe(false);
    }
  });

  it("preserves original publication dates in revised posts", () => {
    const revised = [
      "top-local-seo-agencies-roofers-san-diego-local-guide",
      "top-local-seo-agencies-electricians-san-diego-local-guide",
      "top-local-seo-agencies-restoration-companies-san-diego-local-guide",
    ];
    for (const slug of revised) {
      const file = [".mdx", ".md"].map((extension) => path.join(blogDir, slug + extension)).find(fs.existsSync);
      expect(file, slug).toBeDefined();
      const { data } = matter(fs.readFileSync(file, "utf8"));
      expect(data.date, slug).toBeTruthy();
      expect(data.updatedDate, slug).toBeTruthy();
      expect(new Date(data.updatedDate).getTime(), slug).toBeGreaterThanOrEqual(
        new Date(data.date).getTime()
      );
    }
  });
});
