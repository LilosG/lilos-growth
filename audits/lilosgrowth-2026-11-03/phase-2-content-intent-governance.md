# Phase 2 — Step 8: Content quality and search-intent governance

**Review date:** 2026-11-03
**Branch:** `feat/phase-2-step-8-content-quality-governance-2026-11-03`
**Base commit:** `5967b5e8899925e4bb8ca0c98ea693fe4b4306a9`
**Release status:** Draft only. Do not merge or deploy until the user's consolidated Vercel release.

## Reconciliation with the previous content inventory

The November 2 duplicate-content inventory was a **decision report**. Current `main` already contains direct permanent redirects for the first several overlapping families, including emergency plumber SEO in San Marcos, HVAC local SEO versus GBP management, restoration-company SEO, emergency electrician SEO in San Marcos, and four generic roofing guides. Their retired source files are no longer published. Accordingly, this step does **not** attempt to consolidate them a second time.

Earlier evidence from a user-provided GSC Pages export (2026-08-01 through 2026-10-31) recorded 9,155 impressions for the roofing agency comparison, 5,331 for the electrician comparison, and 3,565 for the restoration comparison. Those are historical page-level impressions, not query-to-page or conversion evidence. No new redirects or deletion of those higher-visibility pages are warranted from this export alone.

## New issue identified and corrected

Automated publication validation detected a surviving duplicate **exact article title**, shared by:

- `/blog/local-seo-long-tail-strategy`
- `/blog/long-tail-local-seo-guide`

Review of both full source articles found substantial overlap in a service + city + qualifier formula, and unsupported assertions such as fixed ranking timelines, automatic compounding of calls, invented example ratings, response-time promises, and generic trip-fee claims.

**Editorial decision:** retain both URLs temporarily, but establish verifiably different user tasks and rewrite their content accordingly:

1. **Long-Tail Local SEO Strategy: Prioritize Searches That Fit Real Services** — deciding which query themes justify improving or creating a distinct URL, supported by actual demand, operations, and measurable customer decisions.
2. **Local Service Page Template: Write Useful, Accurate Content** — operational brief, evidence worksheet, page sections, QA, and post-publication monitoring after deciding which page is justified.

Both documents now include a transparent update date, accurate qualifications, and purposeful crosslinks. Publication dates and URL slugs are retained. No fake testimonials, prices, geographic branches, calls, rankings, or conversion results are introduced.

**Limit:** There is not enough per-query/per-URL and backlink evidence to conclude that the two URLs do or do not cannibalize Google rankings. The different editorial roles are an interim, reader-focused improvement rather than a claim of SEO success.

## Publication quality gate

New `scripts/audit-blog-publication.mjs` checks:

- Published slug collisions, including overrides from article frontmatter.
- Exact normalized title collisions across published articles.
- Published article URLs that are also redirect sources.
- Blog redirect cycles/chains and redirects to missing published articles.
- Static internal blog links that point to missing or retired pages.
- Draft exclusions from public title collisions.

CI runs the audit on every PR alongside existing Astro, TypeScript, lint, formatting, Vitest, build and generated-site verification. Tests exercise duplicate titles/slugs, redirect chains, stale links and valid canonical destinations.

The audit intentionally does not infer semantic duplication from keyword overlap or automatically select redirect survivors. Its static-link parsing covers literal Markdown and HTML blog links, not computed Astro JSX links or external sites. A rendered crawl is still needed to prove the absence of orphaned and redirected links sitewide.

## Remaining editorial program

1. Obtain URL Inspection status, page-query performance and external-link signals for surviving generic roofing, local GBP, and price-comparison clusters before any further URL consolidation.
2. Spot-check high-impression agency comparisons for current named-competitor factual accuracy, fair methodology, disclosure, and no unsupported performance claims.
3. Have owners verify any agency aggregate-results claims and testimonials prior to expanding their use.
4. During the consolidated release, rebase outstanding PRs #81–#85 into one validated production tree; verify redirects, sitemap, content dates, and high-intent page attribution in production.

**No new article publishing cadence, traffic forecasts, ranking guarantees, or speculative search opportunities are claimed.**
