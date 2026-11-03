# Dependency and runtime maintenance policy

**Baseline:** Node.js 22.x, aligned across `package.json`, the npm lockfile root, GitHub Actions and Vercel. The exact patch release can change for Node 22 security updates.

## Dependency update process

1. Dependabot groups minor and patch updates by purpose: Astro ecosystem, code-quality tooling and remaining dependencies. Its scheduled **version updates exclude SemVer major updates**; security updates still require triage and are not blocked by this policy.
2. Each dependency PR must pass a clean install (`npm ci`), Astro diagnostics, ESLint, TypeScript, changed-file Prettier, `npx vitest run`, and `npm run build` with the mandatory internal-link audit. Existing formatting debt (25 pre-existing files as of 2026-11-03) is tracked separately; full `npm run check:prettier` remains available locally, but PR CI validates all changed files and will not ignore new violations. Inspect Vercel preview and the changed pages before merging.
3. Plan major migrations as separate projects. An Astro major upgrade requires verifying the Astro adapter, MDX, integrations, content collections, Vite and static output. A Tailwind major upgrade requires an explicit stylesheet/config and UI review. TypeScript, ESLint, Prettier and `js-yaml` majors require their own compatibility checks.
4. Update `package.json` and `package-lock.json` together; don't bypass peer dependency or compatibility failures just to obtain a green build.
5. Prefer a single validated batch per compatible dependency family rather than repeatedly merging tiny deploy-triggering changes. Don't merge a PR with failing preview or checks.

## Known technical debt

The repository currently has `.npmrc` containing `legacy-peer-deps=true`. It pre-dates this change and is intentionally **not** removed in a runtime-only repair: removing it without migrating conflicting package families risks breaking installs. Resolve underlying peer ranges in a planned dependency migration, then remove the flag and verify `npm ci` without it.

The legacy Dependabot PRs **#46** (development dependencies) and **#42** (runtime dependencies) mixed major framework/package changes and must be superseded, not merged directly. The failed #46 preview reported `js-yaml` missing a default export after its v5 upgrade. That failure does not affect current production.
