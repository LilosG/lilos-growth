# Phase 3 — Astro/Vercel dependency advisory investigation

**Review date:** 2026-11-03. **Scope:** GitHub `main` after Phase 2, `package.json`, `package-lock.json`, `astro.config.ts`, `vercel.json`, and upstream advisory / routing-utils issue.

## Findings

- `@astrojs/vercel@11.0.18` uses `@vercel/routing-utils@6.6.1`, which explicitly depends on `path-to-regexp@6.1.0` **and** on `path-to-regexp-updated` (alias to `path-to-regexp@6.3.0`). The older version is in the affected range for [GHSA-9wv6-86v2-598j](https://github.com/advisories/GHSA-9wv6-86v2-598j), a route-pattern regular-expression denial-of-service issue. The fixed 6.x version is 6.3.0.
- The Vercel routing package retains this split deliberately. Vercel's [upstream tracker #11543](https://github.com/vercel/vercel/issues/11543) describes an attempted update that was reverted; [issue #13044](https://github.com/vercel/vercel/issues/13044) reports the downstream Astro adapter impact. This does **not** prove that this website exposes the vulnerable route matcher to unauthenticated traffic.
- The site uses Astro `output: "static"` with the Vercel adapter needed for `/api/places` on-demand rendering. A static output does not imply zero server execution or zero affected build tooling.
- `vercel.json` contains no source route with multiple named parameters inside one path segment, such as `/:a-:b`. The specific advisory identifies such source patterns as a trigger; checking configured sources is useful defense-in-depth, **not a vulnerability fix or exhaustive reachability proof**.
- As of this review, no upstream-compatible, fully validated replacement has been established. Do **not** run `npm audit fix --force`, downgrade `@astrojs/vercel` to 8.x, or force an npm override against a Vercel package's exact version without full behavior and deployment validation.

## Implemented regression gate

- `scripts/audit-vercel-route-patterns.mjs` detects source patterns with multiple named parameters per segment in redirects, rewrites, and headers.
- `tests/vercel-route-patterns.test.mjs` tests dangerous and safe examples against actual `vercel.json`.
- GitHub Actions runs the guard for PRs and `main`; the existing `npm audit` runtime baseline remains active. This work changes neither dependency resolutions nor runtime configuration.

## What remains to fully remediate

1. Follow the Astro/Vercel adapter release notes and Vercel's routing-utils fix upstream; prefer a supported adapter/routing-utils update.
2. If investigating a targeted dependency override, do so on a separate branch with a regenerated npm lockfile, tests of Vercel redirect/rewrites and dynamic API endpoints, the full Astro static build, and an isolated Vercel preview. Do not promote if compatibility is uncertain.
3. Once the dependency graph is genuinely patched, delete the temporary high-severity exception from `scripts/security-runtime-baseline.mjs` and require zero high/critical runtime advisories in CI.
4. The site owner can separately review the moderate dependency advisories. None of the current findings implies confirmed exploitation of the live site.

## Source references

- https://github.com/advisories/GHSA-9wv6-86v2-598j
- https://github.com/vercel/vercel/issues/11543
- https://github.com/vercel/vercel/issues/13044
- https://github.com/withastro/astro/releases
