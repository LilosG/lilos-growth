# Phase 5 — Qualified inquiry and GBP offer conversion paths

Date: 2026-11-04. Scope: cross-navigation on existing commercial pages; no form or booking integration change.

## Journey finding

The existing homepage and services hub emphasize free calls and package comparisons. The dedicated $199 Google Business Profile offer exists but is not directly linked from these two primary service-discovery entry points. Visitors who already have an eligible, verified GBP and need a fixed-scope starting engagement should not have to browse multiple pages to find it. The general consultation route remains preferable for SEO, website builds, multi-location profiles and unverified profiles.

## Implemented changes

- Homepage: a small explanatory $199 offer link below the primary free-audit and pricing actions.
- Services hub: a supplementary GBP entry point near the existing book-call and pricing buttons; copy explains the one-profile eligibility, 30 days and nonrenewal.
- Contact page: a discreet alternative to the generic form for readers seeking one existing verified profile.
- Updated services hub metadata title to reflect the agency's actual broader local-business market.
- Each link carries a specific existing `data-evt` convention for intent-level click measurement; **this is not a claim of observed GA4 event delivery**.
- No extra form fields or new checkout path. Preserved Formspree `movlbqdk`, Calendly link, free consultation CTAs, and the existing offer inquiry process. The $199 offer remains one-time without automatic renewal.
- Vitest assertions protect the entry paths and guard against changing the existing integrations.

## Release and evaluation

Bundle with Phase 3 PR #88 and Phase 4 PR #89 into **one validated main merge**, avoiding repetitive Vercel production builds. Verify checks, then confirm Vercel production commit matches main and review the destination routes. Following deployment compare offer-page views, offer inquiries and qualified leads against a defined baseline (where tracking is available); do not invent conversion lift or declare an A/B result.

No user-supplied performance source proves the conversion outcome of these navigation changes. Optimizations are UX hypotheses grounded in the current page structure and the published eligibility/pricing terms.
