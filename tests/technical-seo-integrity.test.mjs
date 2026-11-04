import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

describe("technical SEO release integrity", () => {
  it("does not fabricate sitemap lastmod dates from build time", () => {
    const config = read("astro.config.ts");
    expect(config).toContain("sitemap({");
    expect(config).not.toContain('lastmod: new Date().toISOString()');
    expect(config).toContain('"/thank-you"');
    expect(config).toContain('pathname.startsWith("/offers/")');
  });

  it("preserves canonical host and trailing-slash policy", () => {
    const config = read("astro.config.ts");
    expect(config).toContain('trailingSlash: "never"');
    expect(config).toContain('site: "https://lilosgrowth.com"');
    const robots = read("public/robots.txt");
    expect(robots).toContain("Sitemap: https://lilosgrowth.com/sitemap-index.xml");
  });

  it("runs production generated-site SEO assertions", () => {
    const verifier = read("scripts/verify-built-site.mjs");
    expect(verifier).toContain("const inspectedRoutes");
    expect(verifier).toContain("google-business-profile-offer/index.html");
    expect(verifier).toContain('file: "thank-you/index.html", noindex: true');
    expect(verifier).toContain("JSON.parse(raw)");
    expect(verifier).toContain("Expected one canonical");
  });
});
