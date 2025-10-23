# Astro/Tailwind Local SEO & Tech Audit

- Timestamp: `2025-10-20 22:26:59`
- Working dir: `/Users/michaelprickett/lilos-growth`

## Project & Tooling

- Package manager: `pnpm`

### package.json quick scan

- astro: `^5.13.3`
- tailwindcss: `^3`
- @astrojs/sitemap: `^3.4.2`
- @astrojs/robots: `absent`
- @astrojs/mdx: `^4.3.3`

## Core Files

- ❌ sitemap missing (expected public/sitemap.xml or public/sitemap-index.xml)
- ✅ public/robots.txt exists

## Layout & Head (canonical, meta, JSON-LD)

- ❌ No `<link rel="canonical" ...>` found in `src/layouts`
- ❌ No global meta description in layout(s) (ensure per-page descriptions are set)
- ✅ JSON-LD detected in project

## Page-level On-Page Signals

| File                                                                  | <title> | H1 count | Meta Description |
| --------------------------------------------------------------------- | ------: | -------: | ---------------: |
| `src/pages/privacy-policy.astro`                                      |       0 |        1 |                0 |
| `src/pages/offers/local-seo.astro`                                    |       0 |        1 |                0 |
| `src/pages/local-seo-tools/index.astro`                               |       0 |        1 |                0 |
| `src/pages/404.astro`                                                 |       0 |        0 |                0 |
| `src/pages/additional-services/index.astro`                           |       0 |        1 |                0 |
| `src/pages/about.astro`                                               |       0 |        1 |                0 |
| `src/pages/index.astro`                                               |       0 |        0 |                0 |
| `src/pages/privacy.md`                                                |       1 |        0 |                0 |
| `src/pages/blog/category/[category].astro`                            |       0 |        1 |                0 |
| `src/pages/blog/index.astro`                                          |       0 |        0 |                0 |
| `src/pages/blog/[slug].astro`                                         |       0 |        0 |                0 |
| `src/pages/blog/[...page].astro`                                      |       0 |        0 |                0 |
| `src/pages/blog/tag/[tag].astro`                                      |       0 |        1 |                0 |
| `src/pages/contact.astro`                                             |       0 |        1 |                0 |
| `src/pages/terms.md`                                                  |       1 |        0 |                0 |
| `src/pages/thank-you.astro`                                           |       0 |        1 |                0 |
| `src/pages/packages.astro`                                            |       0 |        1 |                0 |
| `src/pages/_landing/pre-launch.astro`                                 |       0 |        0 |                0 |
| `src/pages/_landing/lead-generation.astro`                            |       0 |        0 |                0 |
| `src/pages/_landing/sales.astro`                                      |       0 |        0 |                0 |
| `src/pages/_landing/product.astro`                                    |       0 |        0 |                0 |
| `src/pages/_landing/subscription.astro`                               |       0 |        0 |                0 |
| `src/pages/_landing/click-through.astro`                              |       0 |        0 |                0 |
| `src/pages/services/web-design/index.astro`                           |       0 |        1 |                0 |
| `src/pages/services/index.astro`                                      |       0 |        1 |                0 |
| `src/pages/services/google-business-profile-optimization/index.astro` |       0 |        1 |                0 |
| `src/pages/services/local-seo/index.astro`                            |       0 |        1 |                0 |
| `src/pages/results.astro`                                             |       0 |        1 |                0 |

- ❌ Pages missing title/frontmatter title: 26
- ❌ Pages missing H1: 13
- ❌ Pages missing meta description: 28

- Found ~ 24 internal link occurrences
