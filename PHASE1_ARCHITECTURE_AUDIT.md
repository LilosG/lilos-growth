# Phase 1 Architecture & Data Audit (Findings Only, No Fixes Applied)

This report covers the approved Phase 1 tasks: code quality assessment, data centralization audit, centralized data file check, and file structure review.

## 1) Code Quality Assessment

### Commands executed

- `npm run check`
- `npm run lint`
- `rg -n "@ts-nocheck" src`

### `npm run check` results

`npm run check` fails during `check:astro` with 3 TypeScript errors and 1 hint in `src/pages/results.astro`:

- `src/pages/results.astro:400:16` — `Property 'style' does not exist on type 'Element'.`
- `src/pages/results.astro:398:16` — `Property 'style' does not exist on type 'Element'.`
- `src/pages/results.astro:397:51` — `Argument of type 'string | null' is not assignable to parameter of type 'string'.`
- Hint: `src/pages/results.astro:344:32` — `'index' is declared but its value is never read.`

### `npm run lint` results

`npm run lint` reports one lint error:

- `src/pages/results.astro:344:32` — `'index' is defined but never used` (`@typescript-eslint/no-unused-vars`).

### `@ts-nocheck` scan

No `@ts-nocheck` directives were found under `src/`.

### Files needing type fixes

- `src/pages/results.astro` (DOM element narrowing/typing and nullable string handling).

---

## 2) Data Centralization Audit (Priority Files)

## 2.1 `src/pages/index.astro`

Hardcoded content found:

- Inline SEO metadata (`title`, `description`) exported directly in the page.
- Hardcoded marketing promise copy and CTA text.
- Hardcoded Formspree endpoint and redirect URL.
- Hardcoded KPI copy and FAQ JSON-LD text.

Examples:

- Metadata: lines 5–7.
- “90 days” guarantee text: line 65.
- Formspree + redirect: lines 115–116.
- FAQ JSON-LD text block includes hardcoded claims/pricing language near lines 646+.

## 2.2 `src/pages/services/*.astro`

Audited files:

- `src/pages/services/index.astro`
- `src/pages/services/local-seo/index.astro`
- `src/pages/services/google-business-profile-optimization/index.astro`
- `src/pages/services/web-design/index.astro`

Hardcoded content found:

- Inline SEO metadata for service pages.
- Hardcoded service descriptions and package/plan language.
- Hardcoded CTA destinations (`#packages`, `/contact#book`, etc.).

Examples:

- Service index metadata: `src/pages/services/index.astro` lines 9–11.
- Local SEO metadata: `src/pages/services/local-seo/index.astro` lines 10–11.
- GBP metadata: `src/pages/services/google-business-profile-optimization/index.astro` lines 10–12.
- Web design metadata + pricing-related text references (`$199/mo`, WaaS tiers): `src/pages/services/web-design/index.astro` lines 10–12, 50, 139–176.

## 2.3 `src/pages/packages/index.astro` target

- File path requested does **not** exist in this repo.
- Equivalent active file is `src/pages/packages.astro`.

Hardcoded content found in `src/pages/packages.astro`:

- Inline SEO metadata.
- Hardcoded pricing and package details (`$` values, month-to-month copy).
- Hardcoded FAQ answer content.

Examples:

- Metadata: lines 12–14.
- “Never. All plans are month-to-month.” FAQ answer: line 71.
- Promo pricing (`$999` then `$1,299`): line 515.

## 2.4 `src/components/Header.astro` / `src/components/Footer.astro` targets

- Requested paths do **not** exist.
- Active files are:
  - `src/components/widgets/Header.astro`
  - `src/components/widgets/Footer.astro`

### Header findings (`src/components/widgets/Header.astro`)

- Main nav is **not hardcoded in component**; it is sourced from `~/navigation`.
- Brand link and alt text are hardcoded in component.

Examples:

- Uses centralized nav source: lines 2 and 7.
- Hardcoded brand home anchor: line 22.

### Footer findings (`src/components/widgets/Footer.astro`)

- Hardcoded email and company branding in component.
- Footer nav links are hardcoded route list in component.
- Hardcoded copyright year.

Examples:

- Hardcoded email: lines 20–21.
- Hardcoded route links: lines 83, 95, 112, 119, 126, 134, 151, 156, 161.
- Hardcoded year text: line 148.

---

## 3) Centralized Data Files Check (`src/data/`)

### Required files requested

- `src/data/site-config.ts` → **Missing**
- `src/data/services.ts` → **Missing**
- `src/data/navigation.ts` → **Missing**
- `src/data/packages.ts` → **Missing**
- `src/data/pricing.ts` → **Missing**

### What exists in `src/data/`

- `src/data/proof.ts`
- `src/data/results.ts`
- `src/data/post/*` markdown/mdx content files

### Typing quality in existing data files

- `src/data/proof.ts` is typed (declares `TrustLogo`, `Testimonial`, `TrustStat`).
- `src/data/results.ts` is typed (declares `ResultsStat`, `LogoItem`, `KPI`, `ServiceType`, `CaseStudy`, `Testimonial`, `ProcessStep`, `FaqItem`).

### Navigation centralization status

- Navigation currently centralized in `src/navigation.ts` (outside `src/data/`) and typed via `as const`.

---

## 4) File Structure Review

### 4.1 `src/pages/` inventory

Current pages/routes found:

- `src/pages/404.astro`
- `src/pages/_landing/click-through.astro`
- `src/pages/_landing/lead-generation.astro`
- `src/pages/_landing/pre-launch.astro`
- `src/pages/_landing/product.astro`
- `src/pages/_landing/sales.astro`
- `src/pages/_landing/subscription.astro`
- `src/pages/about.astro`
- `src/pages/additional-services/index.astro`
- `src/pages/api/places.ts`
- `src/pages/blog/[...page].astro`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/category/[category]/[page].astro`
- `src/pages/blog/category/[category]/index.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/rss.xml.ts`
- `src/pages/blog/tag/[tag]/[page].astro`
- `src/pages/blog/tag/[tag]/index.astro`
- `src/pages/contact.astro`
- `src/pages/index.astro`
- `src/pages/local-seo-tools/index.astro`
- `src/pages/offers/local-seo-locked.astro`
- `src/pages/offers/local-seo.astro`
- `src/pages/offline.html`
- `src/pages/packages.astro`
- `src/pages/privacy-policy.astro`
- `src/pages/privacy.md`
- `src/pages/results.astro`
- `src/pages/rss.xml.ts`
- `src/pages/services/google-business-profile-optimization/index.astro`
- `src/pages/services/index.astro`
- `src/pages/services/local-seo/index.astro`
- `src/pages/services/web-design/index.astro`
- `src/pages/terms.md`
- `src/pages/thank-you.astro`

### 4.2 Candidate unused/deprecated routes (needs product decision)

- `_landing/*` routes appear campaign/experimental by naming.
- `privacy.md` and `privacy-policy.astro` coexist (potential duplication/confusion).
- `offers/local-seo-locked` and other utility pages are intentionally isolated/noindex from Phase 0.

### 4.3 Backup/deprecated artifacts detected under `src/`

- `src/assets/styles/tailwind.css.backup`
- `src/assets/styles/tailwind.css.bak.20250911-000939`
- `src/assets/styles/tailwind.css.bak.pre-fix`
- `src/components/results/CaseStudyCard.astro.backup`
- `src/components/results/FAQResults.astro.backup`
- `src/components/results/LogoWall.astro.backup`
- `src/components/results/StatCard.astro.backup`
- `src/content/blog/google-business-profile-essentials.md.bak.20251107-150547`
- `src/layouts/PageLayout.astro.bak.20251107-150127`
- `src/layouts/PageLayout.astro.bak.20251107-150823`

### 4.4 Component organization snapshot

`src/components/` contains these subfolders:

- `Tools/`, `blog/`, `common/`, `composed/`, `core/`, `includes/`, `results/`, `sections/`, `snippets/`, `ui/`, `widgets/`

Potential duplication/deprecation indicators:

- Parallel component systems (`core/Button.astro` and `ui/Button.astro`).
- Root-level and folder-level similarly named components (`RelatedPosts.astro` vs `blog/RelatedPosts.astro`).
- Archive artifacts checked into component tree (`src/components/blog.zip`, `src/components/results.zip`).

---

## Stop Point

Phase 1 audit completed. No fixes have been implemented in this report.
