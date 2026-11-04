# Phase 2 — Step 7: Commercial internal-link architecture

Date: 2026-11-03
Branch: `feat/phase-2-step-7-commercial-internal-links-2026-11-03`
Base: `main` commit `5967b5e8899925e4bb8ca0c98ea693fe4b4306a9`.

## Source inventory and intent separation

- `/services` already links the three core services and all 11 published industry pages; duplicating the entire industry inventory on every page would create unhelpful sitewide crosslinks.
- Eleven individual industry URLs share a dynamic Astro template (`src/pages/[slug].astro`). These pages already present pricing and contact conversion routes, but had no dedicated, curated sibling-industry discovery section.
- Four market pages share the same dynamic template. They link to core services but lack a concise pathway into industry-specific strategy pages.
- `/results` displays case studies and conversion CTAs but previously lacked specific contextual crosslinks into core service and matching trade pages.
- Blog posts already have category-driven commercial links and related-article recommendations. Existing blog pathways were preserved rather than introducing blanket keyword-based links throughout informational content.

## Implementation

1. Add a curated, build-resolved industry relationship map in `src/data/commercialInternalLinks.ts`. Related industries are selected by adjacent customer needs or marketing work, not purported performance or keyword difficulty.
2. The dynamic industry template exposes two contextual sibling industries and core service/evidence pages. The location template surfaces three published example industries plus the same service/evidence routes. Neither template links to itself.
3. Add clear results-to-service and results-to-trade pathways on `/results`, with explicit caution that individual client results are not guaranteed.
4. Add automated graph checks to ensure related routes exist, no self-links, duplicate links or missing location mappings, and no undisclosed URL drift in core service targets.

## Editorial controls

- Use descriptive labels, not exact-match keyword repetition or generic anchor stuffing.
- Keep the existing lead CTAs, pricing, navigation, canonicals, and schema untouched.
- No invented cities, rankings, testimonial claims, cross-client outcomes, or new offers.
- Links should remain relevant and visible to readers; no hidden navigation blocks or JS-only link injection.
- This is a controlled contextual navigation improvement, **not** a demonstrated ranking or conversion lift.

## Additional work after deployment / data access

- Crawl all generated pages and create an actual inlink/outlink graph to identify true orphans and excess link concentration; compare to GSC performance for priority pages.
- Review older blog posts for editorially appropriate deep links and stale redirects, avoiding keyword-stuffed mass edits.
- Validate canonical destinations and click behavior against deployed Vercel SHA and verify whether the changes affect qualified inquiries.

## Release policy

Draft PR only. No merge to `main` or production rollout while the Vercel deployment-rate limit remains an issue. Consolidate with pending PRs #81–83 and revalidate the final combined tree before merging.
