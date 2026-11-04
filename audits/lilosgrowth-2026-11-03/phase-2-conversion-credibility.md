# Phase 2 — Step 9: Commercial credibility and conversion-path audit

**Review date:** 2026-11-03
**Base:** `main` at `5967b5e8899925e4bb8ca0c98ea693fe4b4306a9`
**Release:** Draft-only; do not merge or deploy until the consolidated release.

## Scope inspected

- `src/pages/results.astro`: results hero, agency summary statistics, case-study cards, GBP performance screenshots, consultation CTAs.
- `src/data/results.ts`: individual project KPIs, supporting prose, FAQ claims, lead and timing descriptions.
- `src/data/proof.ts`: additional testimonials and summary figures.
- `src/pages/contact.astro` and `src/pages/thank-you.astro`: Formspree POST, booking widget, contact address and reply-time copy.
- Existing commercial-page integration tests.

Source review alone does not authenticate client permission, GA4/GBP/Semrush exports, CRM lead counts, calculations, attribution, or business retention. Numbers remaining on case studies are **not independently verified by this phase**.

## Implemented corrections

### Unsupported agency aggregate claims

The results page claimed portfolio-wide `+142%` average lead increase, `3.2×` calls per client, `−38%` cost per lead, and `96%` client retention without a displayed denominator, sampling window, calculation methodology, or independently accessible source evidence. Those values should not appear as if verified aggregate statistics.

**Action:** Replace the agency-wide numeric strip with a four-pillar, non-numeric measurement explanation covering search visibility, GBP actions, qualified inquiries, and website experience. Keep the individual project cards and their specific KPIs visible; do not rewrite or silently suppress potentially valid client evidence before source verification.

### Causal and timeframe overclaims

- The results FAQ implied SEO visibility typically materializes in 6–12 weeks after Google "trusts" changes. Replaced with a qualified explanation and baseline-based monitoring.
- The Park 101 prose concluded that a month-over-month rise and a same-month year-over-year comparison proved results were not seasonal. Rephrased to recognize the usefulness of the comparison without pretending seasonality and other influences have been excluded.
- Results-page copy described guaranteed dominance and growth; revised to state the nature of the agency's work and explain that individual outcomes vary.

### Conversion copy and privacy

- Contact page promised responses "within 24 hours" while the thank-you page specified "within 1 business day". Contact now says the agency **aims** to reply within one business day, consistent with the thank-you page. Do not interpret this as an SLA that has been tested.
- Replaced absolute "always confidential" copy with a link to the live site's privacy policy.
- The existing Formspree destination, redirect, phone and email actions, Calendly integration, contact fields, CTA targets, page canonicals, and JSON-LD were not changed.

## Proof artifacts requiring owner-side verification before stronger claims

| Claim family                                                                              | Existing source                                                       | Required evidence before endorsing or expanding                                                                 |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Testimonials attributed to John T., Melissa R., Anthony K., Chris M., Dana L., Brandon S. | `src/data/proof.ts`                                                   | Original testimonial, identity/attribution approval, date, context, permission for publication                  |
| Services aggregate +142%, 3.2× GBP, 96% CWV                                               | `src/data/proof.ts`                                                   | Per-client denominators, observation window, aggregation methodology, raw analytics and Core Web Vitals runs    |
| Project-level lead and traffic growth                                                     | `src/data/results.ts`                                                 | Raw before/after period exports, attribution, client authorization, sample size and calculation reproducibility |
| Park 101 GBP call and interaction growth                                                  | `src/data/results.ts`                                                 | GBP performance screenshots/exports for Feb–June 2026 and June 2025, definitions of calls and interactions      |
| Wheyland Electric marketing attribution                                                   | `src/data/results.ts` and `src/pages/results/wheyland-electric.astro` | GA4 events, form records, call tracking, launch comparison dates, client authorization                          |
| GBP snapshot figures                                                                      | `src/pages/results.astro` and images                                  | Exact screenshot/source periods, context for percentages, confirmation the display matches the source           |

Those are **review items**, not findings that the figures or testimonials are false. Do not fabricate replacement metrics or quotes. Do not claim the results page's case-study statistics have been audited against source records.

## Regression gates

`tests/commercial-credibility.test.mjs` ensures the unsupported aggregate strip and timing promises do not return, case-study sections remain, contact/thank-you reply-time expectations agree, and Formspree/Calendly URLs and privacy reference remain intact.

## Follow-through

1. Gather original client exports, signed permissions or approved testimonials, and service-period evidence; review and annotate each visible case-study number.
2. Verify live form completion to Formspree inbox, Calendly completion, phone/email taps, and the single production commit SHA after release.
3. Measure qualified inquiries rather than mistaking a click, an attempted form submit, or a GBP interaction for a booked job.
4. Once the Vercel rate limit clears, consolidate PRs #81–#86 into one tested tree; rerun CI, assess any conflicts, then release with production smoke tests.

No production changes, lead count, revenue growth, or SEO improvement are claimed by this draft.
