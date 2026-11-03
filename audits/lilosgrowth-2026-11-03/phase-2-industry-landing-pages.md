# LILOs Growth — Phase 2, Step 2: service and industry landing pages

Date: 2026-11-03
Repository: `LilosG/lilos-growth`
Scope: repository-grounded commercial SEO, lead paths, claims, and internal-link review.

## Route inventory and intent

- Main service hub: `/services` — compares the three primary service categories and directs users to packages/consultation.
- Dedicated service pages: `/services/local-seo`, `/services/google-business-profile-optimization`, `/services/web-design` — distinct service decision intent.
- Industry pages: 11 generated routes from `src/data/industries.ts`, rendered by `src/pages/[slug].astro`: plumber, electrician, HVAC, pest control, roofing, water-damage restoration, cleaning, party rentals, landscaping, painting, restaurants.
- Location pages: four generated routes from `src/data/locations.ts`. They serve geographic intent, not industry-specific service intent.
- Package and contact routes remain the transaction/conversion endpoints.

## Verified implementation defects

| Priority | Finding | Evidence | Resolution |
| --- | --- | --- | --- |
| P0 | All industry pricing blocks described the bundles as having “No setup fees,” despite `packages[].setupPrice` being greater than the monthly fee. | `src/pages/[slug].astro`, `src/data/packages.ts` | Disclose canonical setup-month prices on every generated industry page. |
| P0 | Industry cross-sell advertised GBP management at $250/mo, but canonical standalone GBP is $300/mo. | `src/pages/[slug].astro`, `gbpManagement.price` | Bind price to source of truth; no price changes. |
| P1 | Service hub omitted contextual links to dedicated industry pages. | `src/pages/services/index.astro` | Add a scannable, accessible list of all industry pages. |
| P1 | Several industry descriptions or FAQ answers promised specific top-three rankings or 30–60-day outcomes without supporting evidence. | `src/data/industries.ts` | Replace selected explicit promises with accurate descriptions of deliverables and measurement; preserve the vertical-specific expertise. |

## Search intent mapping

- `/services/local-seo`: primary broad commercial service intent, e.g., “local SEO services,” “local SEO agency for small businesses.”
- `/services/google-business-profile-optimization`: GBP optimization/management intent; distinguish ongoing management from one-time audit.
- `/services/web-design`: local business website design and site-build intent; avoid competing with Local SEO page for generic agency queries.
- Industry routes: “SEO for [industry]” and “[industry] local SEO” service-buyer intent, **not** generic consumer searches such as “emergency plumber near me.”
- Location routes: “local SEO agency [city]” intent; avoid presenting city-specific pages as physical branch locations.
- `/packages` and `/contact`: pricing and inquiry intent; preserve existing booking, form, and event wiring.

This is a hypothesis-based content map from the site structure, not search-volume or ranking proof. Before expanding or consolidating industry pages, obtain GSC page/query exports and evaluate non-branded impressions, clicks, CTR, overlap and converting sessions.

## Release guardrails

Preserve URLs, canonical paths, existing packages and numbers in the catalog, Formspree/Calendly integrations, GA4 event attributes, and service promises supported by records. Do not invent testimonials, rankings, case studies, performance lifts, or new geographic presence. No speculative new landing pages in this batch.

## Follow-up acceptance checks

1. Run `npm ci`, `npm run check`, `npx vitest run`, and `npm run build` with Node 22. Check generated industry pricing and hyperlinks.
2. Run GitHub CI; inspect the PR preview on Vercel when build-rate limits permit. Verify mobile service-hub link grid, industry cards, contact actions, metadata and schema.
3. Confirm production deployment commit matches merged `main`. Note that prior PR #78 also remains pending deployment confirmation.
4. Retrieve GSC and GA4 non-branded landing-page data before any further content consolidation or expansion.
5. Review industry-level claims and case study testimonials against underlying records; this batch addresses confirmed overpromises, not every legacy result claim.
