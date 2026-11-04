# Phase 4 — Search performance, query intent and commercial-page actions

**Review date:** 2026-11-03  
**Source:** Previously supplied Search Console exports for Aug 1–Oct 31, 2026, summarized in `audits/lilosgrowth-2026-11-02/phase1-search-baseline-and-decisions.md`; current `main` service pages and redirect/landing-page architecture.  
**Scope:** Small, low-risk commercial-page refinement. No redirect, high-impression article title, ranking guarantee, or new city landing page.

## Measurement cautions

The daily chart reports 23,303 impressions and 21 clicks. The exported query table and page table have different totals because they are separately aggregated and potentially filtered; **do not join the tables by assumption**. We have no query × landing-page, device, country or conversion join. GSC average position is a historical aggregate, not a current rank.

The top three agency-comparison pages accounted for 18,051 impressions across the page export (9,155 roofers, 5,331 electricians, 3,565 restoration) with two observed clicks in total. Their large impressions do not demonstrate that rewriting titles will generate clicks. Preserve their current URLs, titles and canonicals until the exact query-to-page distribution and editorial comparison claims have been reviewed.

## Intent-to-URL decisions

| Query cluster / role                       | Baseline evidence                                                                                                    | Primary URL to evaluate                                          | Action and guardrail                                                                                                     |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Brand and broad agency navigation          | Homepage: 1,121 page impressions / 16 clicks                                                                         | `/`                                                              | Preserve broad agency positioning; do not overfit site to roofing                                                        |
| GBP optimization + San Diego               | Query: 159 impressions, avg position 3.36; GBP service page: 109 page impressions / 0 clicks                         | `/services/google-business-profile-optimization` (provisional)   | Better describe setup versus ongoing management and initial offer; **confirm which URL actually appears for this query** |
| GBP one-off price and purchase eligibility | Offer added to `main` after export                                                                                   | `/google-business-profile-offer`                                 | Keep separate buying intent and original $199 terms; no inference that historical GSC measured this new page             |
| General local SEO services                 | Service page: 54 impressions / 0 clicks / avg position 64.78                                                         | `/services/local-seo`                                            | Keep nationwide/generic service intent; qualify SEO timing claims; concise metadata                                      |
| San Diego agency and local SEO services    | Query `local seo san diego`: 308 impressions / avg 75.18; location page: 919 page impressions / 0 clicks / avg 73.80 | `/local-seo-san-diego`                                           | Maintain distinct regional intent; avoid duplicating generic service page or creating nearby doorway pages               |
| Electrician SEO services and agency        | Queries `electrician seo services`: 1,157 impressions / avg 36.50; `electrician seo agency`: 589 / avg 31.50         | `/electrician-seo` (provisional)                                 | Audit query association, link to legitimate electrician experience without extrapolating outcomes                        |
| Roofing company local SEO services         | Queries `roofing company local seo services`: 1,050 / avg 14.43; `roofing local seo company`: 921 / avg 16.89        | Distinguish roofing buyer page and comparison / blog information | Do not change 9,155-impression roundup without query-by-URL and backlink check                                           |
| Pricing and plan comparison                | Packages page: 57 impressions / 0 clicks                                                                             | `/packages`                                                      | Preserve shared pricing data; no duplicate pricing page                                                                  |

The URL assignments marked provisional are content-architecture hypotheses, **not observed GSC associations**. Search results in November 2026 include directory/comparison formats for generic “San Diego local SEO agency” discovery (examples: Semrush Agency Partners and The Manifest). Directory presence is context for evaluating the search-result mix, not proof that a particular organic page ranks or that these are all the competitors.

## Changes in this PR

1. **GBP service metadata** describes the actual optimization/management offering without promising Google Map Pack placement. It targets local businesses, including San Diego, without replacing the national service role with a geo doorway.
2. **GBP decision-support section** differentiates initial profile cleanup from ongoing management; links to the existing $199 one-off offer, existing management plan and local San Diego SEO explanation. No pricing, checkout endpoint or eligibility changed.
3. **FAQ calibration** removes unsupported blanket 30–60 day ranking promises on GBP and local SEO service pages. Visible FAQs remain the source of FAQ JSON-LD.
4. **Local SEO metadata** gets a concise, audience-aware description, while maintaining its broad service intent.
5. **Regression tests** ensure offer and internal links, metadata length, pricing source, honest FAQs and CTA path are preserved.

## Follow-up needed for evidence-led search optimization

Export GSC **query + page dimensions together**, ideally with date/device/country filters for the above clusters, and record the exact served landing pages, impressions, clicks and CTR. Then inspect live search-result snippets and content quality for each high-impression query, identify genuine mismatches, and make page-specific revisions. Do not imply changes in this PR improved clicks or conversions; establish a comparison period after launch.

For next release: retain Phase 3 PR #88 as a separate draft and combine only after CI checks, to conserve Vercel production deployments.

## References

- Internal GSC baseline: `audits/lilosgrowth-2026-11-02/phase1-search-baseline-and-decisions.md`
- Editorial integrity audit: `audits/lilosgrowth-2026-11-03/agency-comparison-editorial-integrity-review.md`
- Public directory format examples: https://agencies.semrush.com/list/local-seo/san-diego/ and https://themanifest.com/seo/local/agencies/san-diego
