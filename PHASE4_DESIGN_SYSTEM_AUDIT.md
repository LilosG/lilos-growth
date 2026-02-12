# Phase 4 Design System & Component Audit (Findings Only)

## Scope

This phase reviews visual consistency and reusable component coverage to move toward agency-grade UI system quality.

## 1) Visual Consistency Audit

### Color/token consistency

- Design tokens are centralized in `src/styles/tokens.css` and mapped in Tailwind theme extensions.
- However, multiple pages/components still use ad-hoc hex classes/inline colors (`bg-[#...]`, `hover:bg-[#...]`, `text-[#...]`) instead of tokenized utilities.

Examples found:

- `src/pages/offers/local-seo-locked.astro` uses `hover:bg-[#c9400a]`.
- `src/pages/offers/local-seo.astro` uses `hover:bg-[#c9400a]`.
- `src/pages/about.astro` uses `text-[#f6b100]` and a hex hover background.
- `src/components/widgets/Footer.astro` uses `bg-[#fff4ed]` and a custom shadow token inline.

### Typography/spacing consistency

- Global typography/spacing tokens exist and are integrated into Tailwind (`tailwind.config.js` + `tokens.css`).
- Still, there is mixed usage of bespoke utility values and one-off class patterns in some legacy page sections.

### Inline style usage (anti-pattern hotspots)

Inline styles still appear in active code:

- `src/pages/contact.astro` (iframe sizing)
- `src/components/PromoPackageCard.astro`
- `src/components/PackageCardMini.astro`
- `src/components/PackageCard.astro`
- `src/components/composed/TrustBar.astro`
- `src/components/blog/ListItem.astro`
- `src/pages/offline.html`

## 2) Reusable Component Library Audit

Requested component set status:

- ✅ `src/components/ui/Button.astro` exists
- ❌ `src/components/ui/Card.astro` missing
- ❌ `src/components/sections/Hero.astro` missing
- ❌ `src/components/sections/ServiceCard.astro` missing
- ❌ `src/components/sections/CTA.astro` missing
- ❌ `src/components/sections/Testimonial.astro` missing

Current overlap indicates partial equivalents already exist:

- `src/components/core/Card.astro` (base card)
- `src/components/composed/ServiceCard.astro` (service card)
- `src/components/widgets/Hero.astro` (hero section)
- `src/components/widgets/CallToAction.astro` (CTA section)
- `src/components/widgets/Testimonials.astro` and `src/components/results/TestimonialBand.astro`

## 3) Component Architecture Risks

- Duplicate pattern layers (`core`, `ui`, `composed`, `widgets`, `sections`) increase ambiguity in where new UI should live.
- Similar component intents exist under different paths (e.g., testimonials/services cards), increasing drift risk.

## 4) Recommended Phase 4 Execution Plan

1. Create adapter components at requested paths (`ui/Card`, `sections/Hero`, `sections/ServiceCard`, `sections/CTA`, `sections/Testimonial`) that wrap existing stable components.
2. Refactor high-traffic pages to use adapters consistently.
3. Replace hardcoded hex utilities with tokenized Tailwind variables.
4. Remove/replace inline style hotspots with utility classes or token-based classes.
5. Define and document the canonical layering rule (`core` base, `ui` primitives, `sections` page blocks).

## Status

Phase 4 audit completed. Ready to implement design-system normalization in the next step.
