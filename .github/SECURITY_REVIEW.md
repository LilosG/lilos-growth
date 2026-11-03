# Dependency security review — Astro 7 baseline (November 2026)

## Changes validated

- The site uses Astro 7.4.5 and Node.js >=22.23.4 <23 with strict npm peer dependency resolution.
- The obsolete `astro-compress` build integration was removed. Astro's native build pipeline and Vercel CDN serve the pre-rendered pages without that extra package.
- Full test gates include Astro diagnostics, ESLint, TypeScript, Vitest, static blog-link checks, and built HTML/SEO/CSS smoke checks.
- Dependency audit: before this cleanup **25 total** (17 moderate, 8 high, 0 critical), after **21 total** (17 moderate, 4 high, 0 critical). Production-dependency-scope findings remain **6** (3 moderate, 3 high, 0 critical).

## Why the Vercel adapter is retained

While the website's primary content is pre-rendered, `src/pages/api/places.ts` deliberately declares `export const prerender = false`. It provides a runtime Google Places lookup used by the review link generator. Removing `@astrojs/vercel` failed the real production build with `[NoAdapterInstalled]`, so the adapter was retained to prevent breaking a production API.

The 3 production-scope high findings arise from `@astrojs/vercel` and its `@vercel/routing-utils` / `path-to-regexp` chain (GHSA-9wv6-86v2-598j). Npm currently reports only an incompatible downgrade of the adapter as a possible fix, not a validated patch on the Astro 7 platform. Avoid force installation, peer overrides, or removing the API without a separate verified replacement.

## Remaining actions

1. Track patched adapter/routing-utils releases through Dependabot and re-audit when a compatible fix becomes available.
2. Review runtime reachability and add appropriate protection / usage limits for the publicly exposed Places API. Verify any change against its consumers and secret configuration.
3. Triage remaining moderate findings and the development-scoped high finding based on actual reachability and supported upstream fixes.
4. Do not mark the dependency review *zero-vulnerability* while npm audit reports open findings.

Note: `npm audit --omit=dev` categorizes installed dependencies; it does not prove that each advisory is reachable in a deployed server function. Do not conflate npm's transitive dependency count with individual exploitable vulnerabilities.
