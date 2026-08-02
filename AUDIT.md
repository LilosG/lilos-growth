# Component Consistency Audit — Cards, CTA Buttons, Form Inputs

Read-only audit of the current working tree only (git history of the removed `Tools/`,
`sections/` vs `tools/`, `results/` duplicates was not examined). No code was changed as
part of this pass.

## Summary

The repo has a real design-system layer (`src/components/ui/Button.astro`,
`Card.astro`, `Input.astro` + the `.btn` / `.card` / `.input` classes registered in
`tailwind.config.js`), but it's only consumed by three service subpages and a handful
of widgets. Every marketing page that matters most for conversion — the homepage,
`/local-seo-tools`, `/packages`, `/about`, `/contact`, `/results`, the blog templates —
bypasses it entirely and hand-rolls cards, buttons, and inputs with inline Tailwind
classes that drift from file to file. On top of that, `src/assets/styles/tailwind.css`
contains a full, unused second "tool card / tool input / tool button" component system
(lines 427–536) that no page or component references — it's dead CSS left over from
an earlier version of the tools page, shadowed by a page-local, differently-valued
`<style>` block in the current `local-seo-tools/index.astro`.

---

## 1. Tool cards / feature cards / bordered content blocks

| # | File | Shared component or inline? | Icon treatment | Button/CTA placement | Border / shadow / radius |
|---|------|------------------------------|-----------------|------------------------|----------------------------|
| 1 | `src/pages/local-seo-tools/index.astro:193-364` (7 tool cards) | **Inline**, styled by a page-scoped `<style>` block at `index.astro:411-486` using bespoke `.tool-card*` class names | 40x40px icon box (`h-10 w-10`, `rounded-xl`), color keyed to a `--green/--blue/--indigo/--purple/--primary/--teal` modifier per card | No visible CTA button — each card *is* the form; submit button lives inside the embedded tool component | `rounded-2xl`, `border border-border-subtle`, `shadow-sm`, hover `-translate-y-1` + `shadow-xl` |
| 2 | `src/pages/local-seo-tools/index.astro:130-186` (featured "Review Link Generator" card) | Inline, one-off, not reusing `.tool-card` | 48x48px icon box (`h-12 w-12`, `bg-white/10`, `rounded-xl`) on a dark `bg-secondary` panel — different size/treatment than the 7 cards below it | CTA (`Open ROI Calculator`) is a full-width button *inside* the card, `rounded-xl`, separate from the two-column card shell | `rounded-2xl`, `border border-border-subtle`, `shadow-lg` (no hover lift, unlike the grid cards) |
| 3 | `src/components/sections/FeatureCard.astro` | **Shared component**, wraps `ui/Card.astro` with `variant="elevated"` | 56x56px circular gradient icon badge (`h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary-dark`), centered | No CTA — presentational only | Whatever `Card.astro`'s `elevated` variant defines, plus `hover:shadow-xl hover:-translate-y-1` |
| 4 | `src/pages/services/index.astro:139,174,204` (3 "why choose us" blocks) | Inline | No icon | No CTA | `rounded-3xl`, `border border-border-subtle`, `bg-background-cream`, **no shadow** |
| 5 | `src/pages/services/index.astro:377` | Inline | — | — | `rounded-2xl`, `border border-border-subtle`, `shadow-sm`, hover `shadow-md` + `border-primary/20` |
| 6 | `src/pages/services/index.astro:426` | Inline | — | — | `rounded-2xl`, `border border-border-base` (different border token than #5), `shadow-sm` |
| 7 | `src/pages/index.astro:128` (stat card) | Inline | No icon | No CTA | `rounded-2xl`, `border border-border-subtle`, `bg-background-subtle`, `shadow-sm` |
| 8 | `src/pages/index.astro:373` | Inline | — | — | `rounded-2xl`, `border border-border-subtle`, `p-7` (unique padding value, everyone else uses p-5/p-6/p-8), `shadow-sm` |
| 9 | `src/pages/index.astro:781` | Inline | — | — | `rounded-2xl`, `border border-border-subtle`, `p-6`, `shadow-sm` |
| 10 | `src/pages/index.astro:889` | Inline | — | — | `rounded-2xl`, `border border-border-base`, `p-8`, `shadow-md` |
| 11 | `src/pages/about.astro:318,328,338` | Inline | — | — | `rounded-2xl`, `border border-gray-100` (raw Tailwind gray, not a design token), `shadow` |
| 12 | `src/pages/packages.astro:366` | Inline | — | — | `rounded-2xl`, `border border-border-subtle`, `bg-background-subtle`, **no shadow class** |
| 13 | `src/pages/packages.astro:576` (pricing table shell) | Inline | — | — | `rounded-2xl`, `border border-border-subtle`, `shadow-sm` |
| 14 | `src/components/sections/PricingCard.astro` | Shared component | Checkmarks, no icon badge | Full-width `Button` (uses design system) | Uses `Card.astro`-style tokens |
| 15 | `src/components/results/CaseStudyCard.astro` | Inline in a dedicated component (not `Card.astro`) | Logo image, not an icon badge | CTA button at bottom | Own bespoke border/shadow/radius (not cross-checked against `.card`) |
| 16 | `src/pages/services/web-design/index.astro:294,311` | **Shared**: `FeatureCard` + `ui/Card.astro` | Uses `FeatureCard`'s gradient circle icon | — | Correctly delegates to the shared system |

**Key finding:** only `services/web-design`, `services/local-seo`, and
`services/google-business-profile-optimization` use `Card.astro` / `FeatureCard.astro`.
Every other page in the table (`index.astro`, `local-seo-tools`, `packages.astro`,
`about.astro`, `services/index.astro`'s own inline blocks) reinvents the card shell
with a different radius (`rounded-2xl` vs `rounded-3xl`), a different border color
token (`border-border-subtle` vs `border-border-base` vs raw `border-gray-100`), and
inconsistent shadow (`shadow-sm`, `shadow`, `shadow-md`, or none).

---

## 2. The `.tool-card` naming collision (dead code vs. live code)

- `src/assets/styles/tailwind.css:426-536` defines a full **global** component system:
  `.tool-card`, `.tool-card-header`, `.tool-card-icon(--green/--blue/--purple/--orange)`,
  `.tool-card-title`, `.tool-card-description`, `.tool-card-body`, `.tool-input`,
  `.tool-textarea`, `.tool-select`, `.tool-label`, `.tool-button-primary`,
  `.tool-button-secondary`, `.tool-output*`, `.tool-badge*`, `.tool-copy-button`.
- **None of these classes are used anywhere** in `src/components/tools/*` or
  `src/pages/local-seo-tools/index.astro` — confirmed by grep. This is dead CSS.
- Meanwhile `src/pages/local-seo-tools/index.astro:411-486` defines its own **scoped**
  `<style>` block reusing the *same* class names (`.tool-card`, `.tool-card-header`,
  `.tool-card-icon`, `.tool-card-body`) with **different values** — e.g. icon box is
  `h-10 w-10` locally vs `h-12 w-12` globally; header padding is `px-5 py-4` locally vs
  `p-6`/`p-8` (responsive) globally; the global version has no color-modifier classes
  matching the local `--green/--blue/--indigo/--primary/--teal` set (global only has
  `--green/--blue/--purple/--orange`).
- Net effect: a maintainer editing `.tool-card` in `tailwind.css` today would change
  nothing on the live page, because Astro's scoped styles in `index.astro` win. This
  looks like exactly the kind of leftover the user mentioned — a component system that
  was superseded but not deleted.

---

## 3. Primary CTA buttons sitewide

The design system's canonical button is `src/components/ui/Button.astro`, which emits
`class="btn btn-{variant} btn-{size}"`, and those classes are registered via a Tailwind
plugin in `tailwind.config.js:270-360` (pill radius via `--radius-button` = `9999px`,
padding fixed per size, `shadow-sm`→`shadow-md` on hover).

**It is used in only 9 files**: `Form.astro`, `Hero.astro`, `Content.astro`,
`Pricing.astro`, `Testimonials.astro`, `CallToAction.astro`, and the three
`services/*` subpages. Everywhere else on the site, primary CTAs are hand-written
`<a>` tags. Grouping the distinct patterns found (representative refs only — the full
grep turned up 70+ instances):

| Pattern (radius / padding / shadow) | Representative file:line | Also seen at |
|---|---|---|
| `rounded-full`, `px-10 py-4`, `shadow-[0_8px_32px_rgba(245,107,42,0.4)]` | `index.astro:45` | `services/index.astro:40`, `services/index.astro.bak:23` (stale copy, see note below) |
| `rounded-full`, `px-8 py-3.5`, plain `shadow` | `local-seo-roi-calculator.astro:70` | `additional-services/index.astro:100,356` |
| `rounded-2xl`, `px-8 py-4`, `shadow-[0_8px_32px_rgba(245,107,42,0.4)]` | `local-seo-tools/index.astro:80` | none exact match elsewhere — unique combo |
| `rounded-2xl`, `px-10 py-4`, `shadow-[0_8px_32px_rgba(245,107,42,0.45)]` | `local-seo-tools/index.astro:389` | `results.astro:360` |
| `rounded-xl`, `px-6 py-3`, plain `shadow` | `results.astro:177` | — |
| `rounded-xl`, `px-6 py-3.5`, plain `shadow` | `contact.astro:87` | `packages.astro:222`, `additional-services/index.astro:304` |
| `rounded-xl`, `px-5 py-3`, no shadow | `contact.astro:146` | — |
| `rounded-xl`, `px-6 py-3`, plain `shadow` | `about.astro:72` | — |
| `rounded-2xl`, `px-8 py-4`, `hover:bg-[#c9400a]` (raw hex, not `--color-primary-dark` token) | `about.astro:365` | — |
| `rounded-xl`, border-outline variant, `px-5 py-2.5` | `packages.astro:396` | — |
| Bespoke button ignoring `.btn` entirely: `rounded-lg`, `px-6 py-3.5`, `hover:bg-primary-hover` | `components/tools/ReviewLinkGenerator.astro:32` | — |

Additional specific issues:
- **`src/pages/about.astro:365`** hardcodes `hover:bg-[#c9400a]` instead of the
  `--color-primary-dark` token every other CTA uses for its hover state — a color that
  will drift silently if the brand primary is ever retuned.
- **`src/pages/index.astro.bak`** and **`src/pages/services/index.astro.bak`** are
  stale, uncommitted-looking backup files still sitting in `src/pages/`. They contain
  their *own* additional CTA/card variants (e.g. `index.astro.bak:309`
  `rounded-2xl … px-12 py-5`) that don't match the live page. They shouldn't factor
  into any button/card standardization work, but worth flagging since Astro will treat
  `.astro.bak` as a non-route file only as long as the extension isn't `.astro` —
  confirm these are genuinely inert before cleanup.
- **`ReviewLinkGenerator.astro:32`** is the only tool-component submit button that does
  not use the `.btn .btn-primary` classes every sibling tool uses (`GBPCategoryFinder`,
  `FAQSchemaGenerator`, `LandingPageOutlineGenerator`, `SERPPreview`, `UTMLinkBuilder`,
  `LocalKeywordIdeas`, `LocalBusinessSchema` all use `class="btn btn-primary h-11 ..."`).
  Yet the *same file*'s injected results HTML (`ReviewLinkGenerator.astro:87-88`) does
  use `btn btn-secondary btn-sm` / `btn btn-primary btn-sm` — so the file is
  internally inconsistent with itself.
- **`src/layouts/Layout.astro:139-156`** defines a *third*, page-global `.btn` /
  `.btn-primary` (pill radius via literal `9999px`, `padding: 0.75rem 1.5rem`,
  hardcoded hover color `#e65c1e`) inside a `<style>` block. This is a different value
  set than the canonical `tailwind.config.js` plugin version, but reuses the identical
  class names. `Layout.astro` is used by `404.astro`, `privacy.astro`, and
  `privacy-policy.astro` — any `Button.astro` usage on those three pages would receive
  whichever ruleset wins on CSS specificity/order, not necessarily the design-system one.

---

## 4. Form inputs

`src/components/ui/Input.astro` (wraps the canonical `.input` class from
`tailwind.config.js:412-438`) has **zero usages** anywhere in `src/pages` or
`src/components` — confirmed by grep. Every tool's form fields are hand-written.

Seven of eight tool components converged, likely by copy-paste, on:
```
h-11 w-full rounded-lg border border-border-base px-4 text-sm
focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40
```
(`GBPCategoryFinder.astro:14`, `LandingPageOutlineGenerator.astro:14,21`,
`SERPPreview.astro:18,28`, `UTMLinkBuilder.astro:16` and 5 more inputs in the same
file, `LocalKeywordIdeas.astro:16,26,37`, `LocalBusinessSchema.astro:16` and 6 more
inputs/select/textarea in the same file). But two deviate:

| File:line | Deviation |
|---|---|
| `ReviewLinkGenerator.astro:15,21,27` | `h-12` (not `h-11`), `focus:ring-primary/20` (not `/40`), adds explicit `bg-white`, no `placeholder:text-muted` |
| `FAQSchemaGenerator.astro:16,23` | `h-10` (not `h-11`), adds `mb-2` inline instead of a wrapper gap, `focus:ring-primary/40` unchanged |

Label pattern is also inconsistent:
- `SERPPreview.astro:10,23,32`, `UTMLinkBuilder.astro` (5x), `LocalKeywordIdeas.astro`
  (3x), `LocalBusinessSchema.astro` (6x) all render a visible
  `<label class="mb-1 block text-xs font-medium text-body">`.
- `GBPCategoryFinder.astro:9-16` and `ReviewLinkGenerator.astro:10-28` have **no
  visible label at all** — placeholder text is the only affordance, which is an
  accessibility gap (no programmatic label/placeholder pairing) as well as a visual
  inconsistency against the other five tools.

`FAQSchemaGenerator.astro:63-65`'s dynamically-added "add another question" row
duplicates the initial pair's input/textarea classes as a JS string literal rather than
reusing a template — if the static markup's classes drift, the JS-injected copy will
silently fall out of sync (it already differs by omitting the `mb-2` seen in the
static version... actually it's included; but any future edit to the static block must
be manually mirrored in the JS string).

Global dead CSS again: `tailwind.css:461-482` (`.tool-input`, `.tool-textarea`,
`.tool-select`, `.tool-label`) defines an unused third input style, distinct from both
the canonical `.input` class and the ad-hoc `h-11 rounded-lg` convention above.

---

## 5. Recommended follow-up (not implemented — audit only)

1. Delete the dead `.tool-card*` / `.tool-input` / `.tool-button-*` / `.tool-output*` /
   `.tool-badge*` block in `tailwind.css:426-536` — confirm zero references first (done
   above), then remove.
2. Reconcile `Layout.astro`'s local `.btn`/`.btn-primary` with the canonical
   `tailwind.config.js` version, or rename one pair to avoid the collision.
3. Decide on one canonical CTA button spec (radius + padding + shadow) and migrate the
   ~15 distinct hand-rolled variants in section 3 onto `Button.astro`, at least for
   pages sharing a template family (blog templates already share one variant near-
   identically, easiest first target).
4. Either delete `index.astro.bak` / `services/index.astro.bak` or move them out of
   `src/pages` if they're meant to be kept as reference.
5. Standardize the tool-form input convention (`h-11`, ring opacity, visible label) and
   consider finally wiring `ui/Input.astro` into the tool components instead of the
   copy-pasted class string.

### Deferred during the card-migration rollout

6. Homepage's pricing-preview cards (`index.astro`, the `packages.map(...)` grid) and
   `packages.astro`'s four pricing-tier grids (`packages`/`seoTiers`/`websiteBuilds`/
   `audits`) are still hand-rolled and don't use the existing `PricingCard.astro`
   component — a different fix shape than the rest of this audit (swapping to an
   existing component, not extending Card/Button/Input props), deliberately left out
   of the card-migration rollout to stay scoped to what AUDIT.md section 1 itemized.
7. `about.astro:365` still hardcodes `hover:bg-[#c9400a]` instead of the
   `--color-primary-dark` token — a section-3 (CTA button) finding, deferred since the
   rollout stayed scoped to section-1 card patterns.
8. `Card.astro`'s `iconColor` enum gained a `pink` member during the homepage
   migration (`src/components/ui/Card.astro`) to replace a same-day `primary`
   approximation. Confirmed via grep that every `iconColor` usage introduced across
   the rollout (homepage, local-seo-tools, services/index.astro) maps to a real enum
   member — no other card was left on an approximated color.
9. `src/components/tools/ReviewLinkGenerator.astro` is fully built and was migrated to
   Card/Button/Input during this rollout, but it's orphaned — not imported or rendered
   anywhere in `src/` (confirmed via exhaustive grep). It was deliberately removed from
   `local-seo-tools/index.astro` in commit `e34f4d5b`, predating this rollout, in favor
   of a static marketing teaser card occupying that page slot instead. Needs a decision
   — delete the dead file, or wire it into a live page slot — not resolved this
   session; flagging for a future call, not fixing now.
