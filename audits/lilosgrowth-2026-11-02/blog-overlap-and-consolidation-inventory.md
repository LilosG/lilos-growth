# LILOs Growth: blog duplication and search-intent overlap review

**Review date:** 2026-11-02  
**Status:** Decision inventory only. No redirects, removals, canonicals, or blog rewrites implemented.  
**Scope:** Current GitHub blog inventory + supplied Google Search Console Pages export (2026-08-01–2026-10-31), with direct content review of the three most obvious duplicate families.

## Guardrails
- Maintain LILOs Growth's identity as a local SEO, GBP and website agency serving **trades, hospitality and specialized businesses**, not a roofing-only marketing provider.
- Preserve indexed URLs and existing links until each target page's links, quality, backlinks, impressions, conversion role, and canonical status are verified.
- GSC Pages.csv has only URL-level aggregates, not query-to-page breakdowns; zero recorded clicks does not prove uselessness. GSC excludes/aggregates some low-volume information.
- `-2` and `-3` suffixes indicate potential duplication, not proof of low content quality. Source reviewed for exact families below.
- Redirect retired URLs with direct permanent 301s only after the retained page substantively fulfills their intent and has merged unique useful details; update internal links/sitemap, then check redirect chains and indexing.
- No reciprocal canonicals, no redirects to the homepage unrelated to intent, no automatically generated near-duplicate replacement pages.

## Priority A: Clear overlapping families

### 1. Emergency plumber SEO — San Marcos
| Article | GSC impressions | Clicks | GSC avg position |
|---|---:|---:|---:|
| `/blog/emergency-plumber-seo-san-marcos-guide` | not listed | not listed | — |
| `/blog/emergency-plumber-seo-san-marcos-guide-2` | 6 | 0 | 17.33 |
| `/blog/emergency-plumber-seo-san-marcos-guide-3` | 6 | 0 | 8.17 |

Source review: all three discuss GBP optimization, citations, emergency-oriented website content, reviews, and monitoring, and have similar headings. Two use the identical title, and all target substantially the same buyer/problem. Parts include unsupported rank-timing and GBP keyword-mechanics claims, requiring factual edits before republishing.

**Provisional decision:** likely consolidate to one accurate, comprehensive article. Do not assume the unsuffixed post wins: investigate backlinks/index status, and compare quality; `-3` has the best observed average position but only six impressions, which is weak evidence. Candidate set only; winner unselected.

### 2. Local SEO vs GBP management — HVAC San Diego
| Article | GSC impressions | Clicks | GSC avg position |
|---|---:|---:|---:|
| `/blog/local-seo-vs-gbp-management-hvac-san-diego-comparison-guide` | 12 | 0 | 46.00 |
| `/blog/local-seo-vs-gbp-management-hvac-san-diego-comparison-guide-2` | 37 | 0 | 21.35 |
| `/blog/local-seo-vs-gbp-management-hvac-san-diego-comparison-guide-3` | 23 | 0 | 33.09 |

Source review: all three have **exactly the same title**, same city/industry, and substantially equivalent arguments. Pricing, timing, ROI and immediate-results claims should be fact-checked.

**Provisional decision:** consolidate after checking query×URL, backlinks and source accuracy; `-2` has highest observed impressions/position but small samples. Single page should be genuinely useful, separate from the generalized `/services/local-seo` and GBP service page.

### 3. Restoration company SEO guide
| Article | GSC impressions | Clicks | GSC avg position |
|---|---:|---:|---:|
| `/blog/restoration-company-seo-guide` | 118 | 0 | 66.70 |
| `/blog/restoration-company-seo-guide-2` | not listed | not listed | — |

Source review: both are lengthy step-by-step restoration SEO guidance covering GBP, technical foundations, content, citations, links and reviews. Titles differ but informational intent largely overlaps. The unsuffixed post has some measured exposure; `-2` is unreported, not necessarily zero impressions.

**Provisional decision:** consolidate after content, link and query-intent comparison; retain useful restoration-specific expertise and case evidence without unverifiable results.

## Priority B: Other families requiring full-page review
- `/blog/emergency-electrician-seo-san-marcos-guide` + `-2`: same subject, same area.
- Roofing guide family: `/blog/local-seo-for-roofing-companies-guide`, `/blog/local-seo-for-roofing-company-guide`, `/blog/roofing-company-local-seo-marketing-guide`, `/blog/roofing-company-local-seo-services-guide`, `/blog/roofing-local-seo-company-guide`, `/blog/roofing-local-seo-services-guide`. Some may have distinct agency-versus-education intent. **Do not combine wholesale.**
- Restoration agency comparisons for Carlsbad vs San Diego: geographic modifier alone is insufficient to justify two pages, but inspect search intent and local evidence before decisions.
- Pricing family: `local-seo-cost-*` variants, `gbp-management-cost-*`, `website-design-cost-*`. Different service or industry targets may warrant separate pages when genuinely distinct. Check repetitive templates and misleading pricing claims.
- General GBP education: `google-business-profile-essentials`, `gbp-optimization-for-home-services`, `diy-google-business-profile-optimization-checklist`, `gbp-categories-services-attributes-setup-2025`, `best-gbp-categories-home-service-businesses`. Compare actual topic scope and update stale advice.

## Content worth safeguarding first
- `/blog/top-local-seo-agencies-roofers-san-diego-local-guide`: **9,155 impressions**, 0 clicks, average position 16.94.
- `/blog/top-local-seo-agencies-electricians-san-diego-local-guide`: **5,331 impressions**, 2 clicks, average position 34.94.
- `/blog/top-local-seo-agencies-restoration-companies-san-diego-local-guide`: **3,565 impressions**, 0 clicks, average position 40.50.

These three comparison pieces dominate the *reported page-level* impressions. Their current visibility does not mean the agency should narrow its positioning or that the copy is necessarily accurate. Review content integrity, comparison fairness, dated claims and commercial linking separately, with no auto redirects.

## Technical observations
- Astro blog route uses `getSlug(entry)` and filters drafts in `src/pages/blog/[slug].astro`. Do not assume removing an MDX file alone safely handles an indexed legacy URL.
- `vercel.json` contains redirect configuration. Before retiring articles, use explicit permanent URL mappings, verify there is no conflict with existing rules, and test HTTP response behavior.
- Blog metadata/open-graph is handled in the blog route; article schema should be verified against factual author and image data when content is edited.

## Recommended execution sequence
1. Obtain GSC **page + query** breakdown for affected URLs (date, country, device where practical), URL Inspection/indexation where access permits, and link/backlink evidence.
2. Review every article in each family, unique information, sources, titles and internal backlinks.
3. Select an authoritative survivor based on intent, content and link signals; enrich it with legitimate unique sections from alternatives and correct inaccurate advice.
4. In a **separate implementation PR**, add exact 301s for retired URLs, revise internal links, update related posts and sitemap expectations, then test each source and destination.
5. Publish in small batches, record change dates, monitor landing-page impressions and indexation over several weeks.
6. Track broader commercial service visibility independent of roofing content success.

**Not authorized by this inventory:** deleting content, adding canonicals, modifying robots or sitemap, or claiming actual cannibalization (which requires query-level overlap evidence).
