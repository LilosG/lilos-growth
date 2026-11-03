# Commercial SEO and conversion audit — 2026-11-03

## Scope and limitations

Reviewed publicly rendered homepage, GBP, Local SEO, Website Design, pricing, and contact pages alongside the GitHub `main` implementation. This release addresses **confirmed code-level conversion and factual inconsistencies**; it does not purport to measure Google Search Console rankings, GA4 conversions, mobile visual appearance or Formspree/Calendly delivery. Those require authenticated performance data and end-to-end acceptance testing. The $199 GBP offer remains a separate draft PR #45.

## Confirmed findings, changes, and priority

| Priority | Page                      | Confirmed defect                                                                                            | Corrective action                                                                               |
| -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| P0       | GBP service               | Pricing and final CTAs linked to nonexistent `#contact`                                                     | Link to `/contact#book`, whose booking element exists                                           |
| P0       | Website design            | Final CTA pointed to nonexistent `#contact`                                                                 | Link to real booking path                                                                       |
| P1       | Website design            | Hero `#packages` link lacked a matching target; pricing uses `id="pricing"`                                 | Link to `#pricing`                                                                              |
| P0       | Local SEO                 | Visible "No setup fees" contradicted setup-month prices in canonical `src/data/packages.ts` and `/packages` | Show each plan's actual setup-month amount via `PricingCard.priceNote`, amend FAQ and paragraph |
| P1       | GBP service               | Cross-sell advertised stale starting rates ($399 SEO, $599 bundle)                                          | Derive each displayed starting price from `seoTiers`, `packages` and `websiteBuilds`            |
| P1       | Local SEO structured data | Service definition incorrectly included GBP management in standalone SEO                                    | Clarify that GBP is a separate add-on or bundled service                                        |
| P1       | Two service FAQs          | Hand-authored FAQ structured data diverged from visible FAQs                                                | Generate structured data from the same `faqs` source                                            |
| P2       | GBP service               | Unsupported "#1 driver" and "rank and stay there" claims                                                    | Replace with defensible service positioning; retain meaningful value proposition                |
| P2       | Contact                   | Home-service-only language excludes the agency's other demonstrated industries                              | Broad industry-aware positioning while preserving form action and callback                      |

## Guardrails

- No modification to plan prices, contract terms, Formspree ID, Calendly URL, CTA intent, server route, redirects or domain configuration.
- No GA4 event claims or fabricated performance statistics. Avoid expanding scope into claim verification without original Semrush/GSC exports.
- Do not merge before Astro, TypeScript, ESLint, Vitest, generated-site QA and Vercel preview pass.
- Current canonical pricing remains `src/data/packages.ts`; no separate hard-coded rates added.

## Next audit after deployment

1. Verify actual contact-form submission and delivery to Formspree plus thank-you redirect.
2. Verify Calendly scheduler and booking-confirmation analytics, including consent handling.
3. Test mobile keyboard and tap behavior on primary service CTAs in a real browser.
4. Obtain GSC non-branded query and page reports plus GA4 lead events to prioritize commercial intent pages.
5. Verify testimonials, performance claims, FAQ result eligibility and organization identity against original records; adjust only with evidence.
