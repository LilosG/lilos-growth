# Phase 2 — Step 4: Measurement, Attribution, and Conversion Audit

Date: 2026-11-03
Branch: `feat/phase-2-step-4-measurement-attribution-2026-11-03`
Base: `main` after $199 GBP offer release (PR #80)

## Scope

Source-level inspection of the consent manager, GA4 bootstrap, shared `trackEvent` bridge, `data-evt` CTA delegation, Formspree contact form, Calendly embed, and $199 GBP offer funnel.

**No authenticated GA4 or Google Search Console reports were available.** This audit does not assert traffic counts, rankings, event deliveries, user behavior, lead count, payment count, or tested inbox delivery. Changes are measurement plumbing and honest event taxonomy, not demonstrated CRO lift.

## Confirmed defects and interventions

| Priority | Finding | Action |
| --- | --- | --- |
| P0 | Shared `window.trackEvent` called Vercel Analytics and GA4 with no consent gate, despite event callers assuming consent was enforced. | Gate shared event emission on accepted `lg_cookie_consent`; return if localStorage unavailable. |
| P0 | GA4 loader declared a local `gtag` function; other components relied on `window.gtag`, so CTA events could silently fail. | Expose `window.gtag` when consent has enabled GA4. |
| P1 | GA4 loader could be scheduled repeatedly before the idle callback completed. | Add one-shot scheduled guard. |
| P1 | Shared CTA delegation emitted directly to GA4 rather than the consent-aware event bridge and used `el.href` as a label, possibly forwarding query strings. | Use `window.trackEvent` and only trimmed public-facing link text / aria label, never href or form content. |
| P1 | Contact form's `data-track-event` marker was not connected to a script; a click is not a verified inquiry. | Emit `contact_form_submit_attempt` only on a valid native submit, leaving the existing Formspree POST and redirect untouched. |
| P1 | Calendly embed booking completion lacked an event. | Listen for the origin-checked `calendly.event_scheduled` postMessage and emit `calendly_event_scheduled` after consent. |

## Event definitions and GA4 configuration

| Event name | Trigger | Interpretation | GA4 key event? |
| --- | --- | --- | --- |
| `contact_form_submit_attempt` | Valid native contact form submit | Attempted Formspree delivery, **not** a confirmed lead | **No** |
| `calendly_event_scheduled` | Origin-validated Calendly booking completion message | Booking completion reported by Calendly | Candidate **Yes**, after real-browser and DebugView validation |
| `gbp_offer_cta_click` | Introductory offer CTA click with consent | Interest, not inquiry/payment | No |
| `gbp_offer_inquiry_submitted` | Eligible Formspree JSON response indicates accepted request | Form accepted the inquiry; inbox delivery not confirmed | Candidate Yes after live delivery validation |
| `gbp_offer_checkout_started` | Outbound hosted checkout link click | Checkout initiated, not payment | No |
| Existing `data-evt` action events | CTA / phone / email clicks | Engagement only | No by default |

Never map `contact_form_submit_attempt` or `gbp_offer_checkout_started` to `generate_lead`, `purchase`, or revenue. Do not declare a purchase event without trusted payment-provider verification. Avoid transmitting names, emails, phone numbers, message bodies, and URL query parameters to GA4 or Vercel events.

## GSC and GA4 baseline needed before CRO prioritization

- **GSC**: Last 3 complete months plus prior comparison; export non-branded queries and pages, impressions, clicks, CTR, average position. Segment homepage, three core services, 11 industries, four location pages, offer landing page and pricing/contact. De-duplicate navigational variants.
- **GA4**: Landing page, session source/medium and campaign, sessions, engaged sessions, relevant event counts, key events and consent configuration; compare device categories and landing pages. Prefer BigQuery or standard report exports if event parameter joins are required.
- **Lead delivery**: Confirm Formspree accepted responses vs actual recipient inbox, source/campaign attribution from CRM if available, and Calendly booking existence; deduplicate per lead before computing true conversions.
- **QA**: Verify consent-declined sends no analytics events; consent-accepted GA4 loads once; CTA events arrive once; consent changes have proper effect; contact form attempts do not count as leads; Calendly booking fires only on completed bookings; confirm the deployed Vercel SHA matches `main`.

## Release disposition

Changes remain on a feature branch, not `main`, until the user returns to deployment. GitHub CI can validate a single consolidated PR. No new tracking vendor, pricing change, offer change, form destination change, canonical URL change, or Vercel configuration change is intended.

Performance-based CRO decisions must await GA4, GSC, and lead records; no A/B testing or page redesign without a baseline.
