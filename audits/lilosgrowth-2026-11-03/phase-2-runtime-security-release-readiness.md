# Phase 2 — Step 5: Runtime dependency security and release readiness

Date: 2026-11-03
Source: GitHub Actions run 41738753946 on `main` (`5967b5e8899925e4bb8ca0c98ea693fe4b4306a9`).
Scope: npm runtime advisory inventory and CI security regression controls; no package upgrade or release.

## Observed npm audit baseline

| Category | All dependencies | Runtime dependencies (`--omit=dev`) |
| --- | --- | --- |
| Critical | 0 | 0 |
| High | 3 | 3 |
| Moderate | 17 | 3 |
| Low | 0 | 0 |
| Total | 20 | 6 |

These are npm audit dependency findings, **not** proven exploitable production routes or a count of distinct CVEs.

Known high-severity runtime findings (all in the `@astrojs/vercel` dependency graph):

- `@astrojs/vercel` (direct dependency, repo currently `11.0.18`): npm audit flags the dependency and suggests `@astrojs/vercel@8.1.0` as a semver-major fix, which would be a **downgrade** of the current adapter and is not an appropriate automated remedy without migration testing.
- `@vercel/routing-utils` (transitive): high via the same dependency graph.
- `path-to-regexp` (transitive): affected 4.0.0–6.2.2, tracked as [GHSA-9wv6-86v2-598j](https://github.com/advisories/GHSA-9wv6-86v2-598j) / CVE-2024-45296. The advisory concerns regex backtracking / potential denial of service; severity does **not** establish this application exposes a vulnerable route in production.

## Implemented safeguards

- `scripts/security-runtime-baseline.mjs` explicitly identifies the three known high-severity npm audit findings and the reviewed path-to-regexp advisory.
- `scripts/audit-dependencies.mjs` continues to produce its original complete and production-only summaries, but now fails the check for **any critical runtime finding**, a high finding in a new package, or a new high advisory on a named baseline package.
- Tests simulate reviewed historical findings, a new high package, a new advisory on an existing package, a critical finding, and a completely patched dependency tree.
- The allowlist is **temporary monitoring**, not remediation or a waiver of the security risk. Do not claim a clean npm audit.
- No semver-major automated fix, `npm audit fix --force`, lockfile churn, dependency override, or runtime change was introduced.

## Remediation investigation before closing security workstream

1. Check official Astro Vercel adapter and routing-utils release notes / upstream issues for a safe compatible resolution, or isolate whether the affected transitive package is required in a production request handler. Preserve Astro 7 support.
2. Reproduce the build, generated routes, redirects, runtime APIs, and Vercel deployment on an isolated branch for each candidate upgrade. Inspect `npm ls path-to-regexp @vercel/routing-utils @astrojs/vercel`.
3. Remove reviewed exceptions once advisory reports no longer include them, and tighten CI to zero unresolved high/critical runtime findings.
4. Reassess moderate runtime advisories separately; maintain a dated owner and review interval.
5. When Vercel limits lift, merge validated outstanding work in the least number of PRs practicable, then confirm production deployment commit SHA and smoke-test live routes. The current development hold explicitly defers merging and deploying.

## Release gates

`npm ci`, `node scripts/audit-dependencies.mjs`, `npm run check:astro`, `npm run check:eslint`, `npm run check:ts`, changed-file Prettier, `npx vitest run`, `npm run build`, and `node scripts/verify-built-site.mjs`.

CI results require a fresh branch run. No new dependency upgrade has been validated in this phase.
