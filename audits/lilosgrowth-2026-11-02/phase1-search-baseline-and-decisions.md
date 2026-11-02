# LILOs Growth — Phase 1 commercial search baseline and decisions
**Date:** 2026-11-02  
**Status:** Research and recommendation; no site or production changes  
**Sources:** User-provided Google Search Console performance export (2026-08-01–2026-10-31); 2026-10-30 technical audit; GitHub `main` source; Vercel deployment metadata.  
**Do not interpret these observations as guaranteed ranking outcomes.**

## Business positioning — approved constraint
LILOs Growth offers **local SEO, Google Business Profile optimization and management, and website design/development** to local and regional businesses. Trades and home services are a proven strong vertical, **not an exclusivity constraint**. Other demonstrated engagements include hospitality/restaurants, restaurant groups, and specialized commercial equipment suppliers/refurbishers. Preserve useful trades exposure while broadening core services and agency presentation. Do not invent cross-vertical case results.

## Grounded performance baseline
Source: `Chart.csv` in GSC ZIP; Search type as provided by export; no GA4 or GBP conversion joins.
| Period | Impressions | Clicks |
|---|---:|---:|
| 2026-08 | 7,210 | 10 |
| 2026-09 | 4,660 | 6 |
| 2026-10 | 11,433 | 5 |
| **Total** | **23,303** | **21** |

Aggregate CTR is ~0.09%; GSC average position ~30.9 in the prior analysis. **Data limitation:** exported Queries.csv is 658 rows, totals 22,366 impressions / 2 clicks; Pages.csv is 74 rows, totals 24,138 impressions / 22 clicks. Do **not** force reconciliation. Aggregation, privacy and filtering may affect these exports. No joined query×URL data is included. GSC average position is impression-weighted across searches and dates, not today's live rank. No conversion baseline yet.

## Highest-impression pages, Pages.csv
| URL | Impr. | Clicks | Avg pos. | Decision |
|---|---:|---:|---:|---|
| /blog/top-local-seo-agencies-roofers-san-diego-local-guide | 9,155 | 0 | 16.94 | Retain pending content, SERP and link analysis; not an agency positioning model |
| /blog/top-local-seo-agencies-electricians-san-diego-local-guide | 5,331 | 2 | 34.94 | Retain pending assessment |
| /blog/top-local-seo-agencies-restoration-companies-san-diego-local-guide | 3,565 | 0 | 40.50 | Retain pending assessment |
| / | 1,121 | 16 | 31.54 | Broad agency hub; measure branded vs nonbranded |
| /local-seo-san-diego | 919 | 0 | 73.80 | Priority geographic commercial page |
| /services/google-business-profile-optimization | 109 | 0 | 53.93 | Priority service page |
| /services/local-seo | 54 | 0 | 64.78 | Priority service page |
| /packages | 57 | 0 | 38.60 | Pricing/comparison intent |
These figures derive from **Pages.csv**, not from a query-to-page join. Top 3 comparison pages = 18,051 impressions, ~74.8% of the Pages.csv impressions.

## Query opportunities (Queries.csv)
| Query | Impr. | Avg pos. | First check |
|---|---:|---:|---|
| google business profile optimization san diego | 159 | 3.36 | Verify URL, device, geography, time distribution and current SERP BEFORE editing |
| roofing company local seo services | 1,050 | 14.43 | Determine whether blog and industry page compete; preserve current reach |
| roofing local seo company | 921 | 16.89 | Same |
| electrician seo services | 1,157 | 36.50 | Connect commercially relevant industry page and authentic proof |
| electrician seo agency | 589 | 31.50 | Same |
| local seo san diego | 308 | 75.18 | Strengthen San Diego service offering and distinctive local evidence |
| local seo services san diego | 117 | 81.15 | Assess SERP intent and service/geo URL roles |
Keyword impressions are NOT search demand estimates; missing hospitality/B2B exposure is not evidence that those markets lack demand.

## Intended URL roles (provisional; no mass edits until joined GSC validation)
- `/`: LILOs Growth brand, broad local SEO/GBP/websites positioning, proof and clear paths to each service.
- `/services/local-seo`: primary non-geographic local SEO offering.
- `/services/google-business-profile-optimization`: GBP optimization and management offering; target audiences should not be confined to trades.
- `/services/web-design`: design/development for service businesses and relevant broader verticals, not exclusively home services.
- `/local-seo-san-diego`: San Diego agency/service relevance with real San Diego proof; not a clone of general service page.
- `/packages`: SEO/GBP/website pricing and buying-decision intent.
- Existing `/{trade}-seo` pages: evidence-based vertical specialization, not sitewide agency identity.
- Existing blog comparison content: assess quality and links before redirecting; informational/comparison support distinct from the service offer.
- Hospitality and commercial-equipment specialization: support through verified work/examples; create standalone pages only after demand, evidence and distinct purpose are confirmed.

## Repository findings requiring action
- `src/pages/[slug].astro` centrally generates industry and location pages; `src/data/industries.ts` / `locations.ts` hold differentiated text but templates share blocks. Support optional proof and specific examples with reusable typed components rather than copy-paste sites.
- Core service metadata and body messaging in `src/pages/services/local-seo/index.astro`, `.../google-business-profile-optimization/index.astro`, `.../web-design/index.astro` explicitly concentrate on home services. Broaden only the general service-level audience; retain focused trade-specific pages.
- `src/data/proof.ts` holds testimonials and aggregate outcomes; publication and calculation require evidence checks. Do not assert unverifiable client outcomes.
- Blog collection schema at `src/content/config.ts` does not on its own prevent duplicate search-intent articles. Add duplicate-slug/topic governance after listing affected articles.
- Current `main` metadata differs from October 30 audit in places; check active production SHA, built HTML and redirects before declaring production fixed.
- Vercel production READY deployment at SHA `c81a1346ce7eacb949cccca58d4d1a2acb8d9c73` was observed; newer ERROR records inspected were Dependabot nonproduction. Confirm active alias and current main before changes.

## Prioritized implementation backlog
1. **P0, measurement:** Get GSC query+page dimensions (or API export) including date, device and country for the GBP San Diego query, category/sector queries, and core commercial pages. Obtain GA4 source/medium and form/call/booking conversions.
2. **P0, QA:** Reconcile current main, latest successful production SHA, served HTML, robots/canonicals/sitemap, then take snapshots.
3. **P1, strategic messaging:** Propose updates to homepage and core service pages that accurately include trades, hospitality and specialized commercial business services, with concrete proof and without keyword stuffing. Do not remove high-intent trade terms from their own pages.
4. **P1, commercial keyword map:** SERP review for local SEO agency/services San Diego, GBP optimization/management San Diego, website design San Diego, electrician and restoration SEO, trade SEO pricing. Select one primary landing URL for each intent; document conflicts.
5. **P1, content integrity:** Inventory near-duplicate blog pairs/triples and any conflicting canonicals, retain winners only after GSC/backlinks/content equivalence review. Avoid reflexive redirects.
6. **P1, proof:** Replace or qualify claims/testimonials not supported by source evidence, add approved, measured cross-industry case studies with permission.
7. **P2, engineering:** Validate metadata and structured data, enhance typed content models and contextual links, test analytics and forms, resolve OG image and secondary technical defects.
8. **P2, authority:** Earn relevant editorial/local references and testimonials; no purchased links, doorway city pages or manufactured reviews.

## Phase 1 completion gate
- Validated complete commercial URL inventory, GSC query-to-landing-page mapping, primary/secondary keyword assignment, live SERP and competitor examples, index status where accessible, and measurement definitions.
- Document accepted scope before touching production.
- For implementation: branch → PR → tests and Vercel preview → approval → merge; no production push from this report.

## Out-of-scope conclusions
We cannot infer guaranteed traffic gains, claim verified modern rankings from GSC averages, attribute contact submissions without GA4/CRM data, or infer that restaurant/commercial manufacturing topics have no search market from the present GSC exports.
