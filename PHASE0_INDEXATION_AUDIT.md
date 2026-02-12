# Phase 0 Indexation Audit (No Fixes Applied)

This report captures the current state after `npm install` and `npm run build`. No code fixes were executed in this phase.

## 1) Noindex pages in sitemap (critical blocker)

- Total URLs in generated `dist/client/sitemap-0.xml`: **141**.
- URLs that currently resolve to noindex states: **102** (matches Ahrefs blocker).
- Root cause: sitemap includes blog tag/category archive pages and utility routes (`/thank-you`, `/offers/*`, `/offline`, `/privacy`) that are set to noindex.

### Full noindex-in-sitemap URL list (102)
- https://lilosgrowth.com/blog/category/Announcements
- https://lilosgrowth.com/blog/category/Announcements/1
- https://lilosgrowth.com/blog/category/Content
- https://lilosgrowth.com/blog/category/Content/1
- https://lilosgrowth.com/blog/category/Google%20Business%20Profile
- https://lilosgrowth.com/blog/category/Google%20Business%20Profile/1
- https://lilosgrowth.com/blog/category/Local%20SEO
- https://lilosgrowth.com/blog/category/Local%20SEO/1
- https://lilosgrowth.com/blog/category/SEO
- https://lilosgrowth.com/blog/category/SEO/1
- https://lilosgrowth.com/blog/category/Websites
- https://lilosgrowth.com/blog/category/Websites/1
- https://lilosgrowth.com/blog/category/Workflows
- https://lilosgrowth.com/blog/category/Workflows/1
- https://lilosgrowth.com/blog/tag/aeo
- https://lilosgrowth.com/blog/tag/aeo/1
- https://lilosgrowth.com/blog/tag/architecture
- https://lilosgrowth.com/blog/tag/architecture/1
- https://lilosgrowth.com/blog/tag/call-tracking
- https://lilosgrowth.com/blog/tag/call-tracking/1
- https://lilosgrowth.com/blog/tag/categories
- https://lilosgrowth.com/blog/tag/categories/1
- https://lilosgrowth.com/blog/tag/checklist
- https://lilosgrowth.com/blog/tag/checklist/1
- https://lilosgrowth.com/blog/tag/compliance
- https://lilosgrowth.com/blog/tag/compliance/1
- https://lilosgrowth.com/blog/tag/content
- https://lilosgrowth.com/blog/tag/content/1
- https://lilosgrowth.com/blog/tag/conversion
- https://lilosgrowth.com/blog/tag/conversion/1
- https://lilosgrowth.com/blog/tag/diagnostics
- https://lilosgrowth.com/blog/tag/diagnostics/1
- https://lilosgrowth.com/blog/tag/drafts
- https://lilosgrowth.com/blog/tag/drafts/1
- https://lilosgrowth.com/blog/tag/entities
- https://lilosgrowth.com/blog/tag/entities/1
- https://lilosgrowth.com/blog/tag/faqs
- https://lilosgrowth.com/blog/tag/faqs/1
- https://lilosgrowth.com/blog/tag/gbp
- https://lilosgrowth.com/blog/tag/gbp/1
- https://lilosgrowth.com/blog/tag/ia
- https://lilosgrowth.com/blog/tag/ia/1
- https://lilosgrowth.com/blog/tag/internal-links
- https://lilosgrowth.com/blog/tag/internal-links/1
- https://lilosgrowth.com/blog/tag/keyword-research
- https://lilosgrowth.com/blog/tag/keyword-research/1
- https://lilosgrowth.com/blog/tag/landing-pages
- https://lilosgrowth.com/blog/tag/landing-pages/1
- https://lilosgrowth.com/blog/tag/links
- https://lilosgrowth.com/blog/tag/links/1
- https://lilosgrowth.com/blog/tag/local-seo
- https://lilosgrowth.com/blog/tag/local-seo/1
- https://lilosgrowth.com/blog/tag/local-seo/2
- https://lilosgrowth.com/blog/tag/location-pages
- https://lilosgrowth.com/blog/tag/location-pages/1
- https://lilosgrowth.com/blog/tag/long-tail
- https://lilosgrowth.com/blog/tag/long-tail/1
- https://lilosgrowth.com/blog/tag/map-pack
- https://lilosgrowth.com/blog/tag/map-pack/1
- https://lilosgrowth.com/blog/tag/maps
- https://lilosgrowth.com/blog/tag/maps/1
- https://lilosgrowth.com/blog/tag/posts
- https://lilosgrowth.com/blog/tag/posts/1
- https://lilosgrowth.com/blog/tag/pr
- https://lilosgrowth.com/blog/tag/pr/1
- https://lilosgrowth.com/blog/tag/ranking-factors
- https://lilosgrowth.com/blog/tag/ranking-factors/1
- https://lilosgrowth.com/blog/tag/reputation
- https://lilosgrowth.com/blog/tag/reputation/1
- https://lilosgrowth.com/blog/tag/reviews
- https://lilosgrowth.com/blog/tag/reviews/1
- https://lilosgrowth.com/blog/tag/sab
- https://lilosgrowth.com/blog/tag/sab/1
- https://lilosgrowth.com/blog/tag/seo
- https://lilosgrowth.com/blog/tag/seo/1
- https://lilosgrowth.com/blog/tag/service-area-pages
- https://lilosgrowth.com/blog/tag/service-area-pages/1
- https://lilosgrowth.com/blog/tag/service-pages
- https://lilosgrowth.com/blog/tag/service-pages/1
- https://lilosgrowth.com/blog/tag/services
- https://lilosgrowth.com/blog/tag/services/1
- https://lilosgrowth.com/blog/tag/setup
- https://lilosgrowth.com/blog/tag/setup/1
- https://lilosgrowth.com/blog/tag/strategy
- https://lilosgrowth.com/blog/tag/strategy/1
- https://lilosgrowth.com/blog/tag/suspension
- https://lilosgrowth.com/blog/tag/suspension/1
- https://lilosgrowth.com/blog/tag/templates
- https://lilosgrowth.com/blog/tag/templates/1
- https://lilosgrowth.com/blog/tag/utm
- https://lilosgrowth.com/blog/tag/utm/1
- https://lilosgrowth.com/blog/tag/ux
- https://lilosgrowth.com/blog/tag/ux/1
- https://lilosgrowth.com/blog/tag/web
- https://lilosgrowth.com/blog/tag/web/1
- https://lilosgrowth.com/blog/tag/workflow
- https://lilosgrowth.com/blog/tag/workflow/1
- https://lilosgrowth.com/offers/local-seo
- https://lilosgrowth.com/offers/local-seo-locked
- https://lilosgrowth.com/offline
- https://lilosgrowth.com/privacy
- https://lilosgrowth.com/thank-you

### Should be indexed vs should stay noindex
- **Should remain noindex**: `/thank-you`, `/offers/local-seo`, `/offers/local-seo-locked`, `/offline`, `/privacy`, blog tag archives (`/blog/tag/**`), blog category archives (`/blog/category/**`) if taxonomy pages are intentionally thin/utility.
- **Should be indexed**: primary commercial pages (`/services/**`, `/packages`, `/results`, `/about`, `/contact`, `/local-seo-tools`), blog posts (`/blog/<slug>`), legal policy page (`/privacy-policy`, `/terms`) where appropriate.

## 2) Sitemap cleanup audit

- Generated file reviewed: `dist/client/sitemap-0.xml`.
- Current sitemap includes many noindex URLs, causing indexation contradiction.
- Existing `astro.config.ts` sitemap filter attempts to exclude some URLs but uses relative paths in `startsWith`/set checks while `@astrojs/sitemap` passes absolute URLs; this mismatch allows noindex URLs to leak into sitemap.

### Proposed sitemap fixes (not executed)
1. Normalize `page` to pathname in sitemap filter (`new URL(page).pathname`) before comparisons.
2. Exclude all routes matching noindex policy:
   - `/offers/**`
   - `/offline`
   - `/privacy`
   - `/thank-you`
   - `/blog/tag/**`
   - `/blog/category/**`
3. Optionally generate a dedicated blog-post sitemap containing only `/blog/<slug>` URLs.
4. Add CI check: fail build if any sitemap URL resolves to `noindex`.

## 3) Orphan page audit (62 pages)

- Method: internal-link graph over built HTML in `dist/client/**/*.html` (excluding `/404` and `/decapcms`).
- Orphan pages detected: **62** (close alignment with Ahrefs 62).

### Full orphan URL list (62)
- /blog/category/Announcements
- /blog/category/Announcements/1
- /blog/category/Content
- /blog/category/Content/1
- /blog/category/Google Business Profile
- /blog/category/Google Business Profile/1
- /blog/category/Local SEO
- /blog/category/Local SEO/1
- /blog/category/SEO
- /blog/category/SEO/1
- /blog/category/Websites
- /blog/category/Websites/1
- /blog/category/Workflows
- /blog/category/Workflows/1
- /blog/tag/aeo/1
- /blog/tag/architecture/1
- /blog/tag/call-tracking/1
- /blog/tag/categories/1
- /blog/tag/checklist/1
- /blog/tag/compliance/1
- /blog/tag/content/1
- /blog/tag/conversion/1
- /blog/tag/diagnostics/1
- /blog/tag/drafts/1
- /blog/tag/entities/1
- /blog/tag/faqs/1
- /blog/tag/gbp/1
- /blog/tag/ia/1
- /blog/tag/internal-links/1
- /blog/tag/keyword-research/1
- /blog/tag/landing-pages/1
- /blog/tag/links/1
- /blog/tag/local-seo/1
- /blog/tag/location-pages/1
- /blog/tag/long-tail/1
- /blog/tag/map-pack/1
- /blog/tag/maps/1
- /blog/tag/posts/1
- /blog/tag/pr/1
- /blog/tag/ranking-factors/1
- /blog/tag/reputation/1
- /blog/tag/reviews/1
- /blog/tag/sab/1
- /blog/tag/seo
- /blog/tag/seo/1
- /blog/tag/service-area-pages/1
- /blog/tag/service-pages/1
- /blog/tag/services
- /blog/tag/services/1
- /blog/tag/setup/1
- /blog/tag/strategy/1
- /blog/tag/suspension/1
- /blog/tag/templates/1
- /blog/tag/utm/1
- /blog/tag/ux/1
- /blog/tag/web/1
- /blog/tag/workflow/1
- /offers/local-seo
- /offers/local-seo-locked
- /offline
- /privacy
- /thank-you

### Orphan categorization
- **Valuable content to internally link**:
  - `/blog/tag/**` taxonomy hubs (if kept indexable in future strategy).
  - `/blog/category/**` taxonomy hubs (if kept/indexed).
  - `/offers/local-seo` only if this is an active campaign landing page.
- **Utility / likely noindex / low-value**:
  - `/offers/local-seo-locked`, `/offline`, `/thank-you`, `/privacy` (keep out of crawl paths and sitemap).

### Proposed orphan resolution plan (not executed)
1. Keep taxonomy pages noindex + remove from sitemap + optionally add discoverability links only for UX (blog nav/sidebar), not for indexation.
2. If taxonomy pages should rank, reverse policy: set indexable, add links from `/blog`, posts, and nav taxonomy blocks.
3. Keep conversion utility pages (`/thank-you`, locked offers) noindex and out of global nav/footer; optionally block via robots/disallow where appropriate.
4. Add contextual internal links from service pages/blog posts to all strategic pages (especially `/services/*`, `/packages`, `/results`).

## 4) Canonical vs sitemap consistency check

- Canonicals are generated from pathname via `getCanonical(...)` in metadata component, so canonical format is generally consistent with clean URL routes.
- Main issue is not canonical mismatch, but sitemap inclusion of URLs intentionally marked noindex.

## 5) Immediate execution plan for approval (Phase 0 only)

1. Patch sitemap filter in `astro.config.ts` to use pathname normalization and explicit exclusion patterns above.
2. Rebuild and verify `sitemap-0.xml` contains **0 noindex URLs**.
3. Add/adjust links for pages you want discoverable (or keep noindex utility pages intentionally orphaned and unsitemapped).
4. Re-run indexation checks and provide before/after URL diffs.
