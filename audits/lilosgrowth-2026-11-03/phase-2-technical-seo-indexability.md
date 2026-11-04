# Phase 2 — Step 6: Technical SEO and structured-data release integrity

Date: 2026-11-03
Base: `main` at `5967b5e8899925e4bb8ca0c98ea693fe4b4306a9`.

## Scope and source audit

Inspected Astro configuration, shared metadata, canonical URL utility, global schema layout, robots.txt, redirect regression tests, and generated-site verification script. This is source and CI validation, not an authenticated Google Search Console index coverage audit or a browser crawl of deployed production.

## Verified issue: inaccurate sitemap update dates

The `@astrojs/sitemap` configuration previously assigned every URL `lastmod: new Date().toISOString().split("T")[0]` at each build, regardless of page changes. That value claimed significant changes to unchanged pages and could reduce trust in update timestamps. Google states sitemap lastmod should reflect the last significant update, not merely a rebuild. [Google Search Central](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping).

**Fix:** remove the blanket `serialize` callback. Do not invent timestamps. A future migration may populate per-page lastmod from actual content changes where a reliable source of truth exists.

## Generated-site checks added

- Verify one canonical URL for home, service hub, each core service, $199 GBP offer, contact, one industry, one city, and thank-you.
- Canonical must use `https://lilosgrowth.com`, with the actual configured no-trailing-slash path.
- Confirm commercial pages are indexable and thank-you is explicitly noindex.
- Parse all application/ld+json blocks on inspected routes to detect invalid JSON output.
- Keep existing checks on index, blog, representative article, RSS, sitemap index and compiled Tailwind CSS.
- Add lightweight regression tests for sitemap policies and verifier coverage.

## Review notes and deliberate non-changes

- `robots.txt` blocks utility routes and points to the sitemap. The sitemap filter excludes test, offers, blog archive and thank-you routes. No disallow list or redirect changes introduced.
- Shared schema includes Organization, LocalBusiness, WebSite, optional BreadcrumbList, and page-specific extras. These are not independently verified against Google rich-result eligibility, physical office representation, or live knowledge graph.
- The current global LocalBusiness address, contact info, and claims should be verified by the site owner before attempting schema expansion. No address or credibility claims were invented.
- Current noindex paths blocked in robots.txt may not be crawled to expose a noindex directive. Reassess individually with GSC coverage data; avoid sweeping robots changes.
- Any trailing-slash or redirect design modification must be based on real crawl results, not automated assumptions.
- Existing site builds may expose legacy canonicals in article content; the added sampled assertions are a first automated regression gate, not a complete sitewide crawl.

## Remaining work

1. Confirm PR CI checks and build artifact verification, correcting any real canonical or schema regressions uncovered.
2. When Vercel releases are available, consolidate with outstanding draft work and verify all deployed commercial routes and sitemap entries against the final release SHA.
3. Inspect GSC indexed/excluded URL lists, server-side redirects, actual schema eligibility, and major commercial templates across all 200+ generated pages.
4. Expand canonical coverage once exceptions are inventoried and recorded.

**Release policy:** draft-only, no merge to main and no production deployment while user defers releases for Vercel build-rate limits.
