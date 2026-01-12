# Lilos Growth Runbook

## Runtime

- Node: 18.17+ or 20+ (see `package.json` engines)
- Package manager: npm (see `package.json` packageManager)

## Local setup

```bash
npm install
npm run dev
```

## Checks

```bash
npm run check
npm run test
```

## Build

```bash
npm run build
npm run preview
```

## Environment variables

- `GOOGLE_MAPS_API_KEY` (server-only, required for `/api/places`)
- `PUBLIC_GA_ID` or `PUBLIC_GOOGLE_MEASUREMENT_ID` (client)

See `.env.example` for the full list.

## Deployment notes

- Site output is static (`astro.config.ts`).
- `/api/places` requires a serverless/runtime that supports Node fetch.
- `public/robots.txt` references the sitemap index; keep `site` in `src/config.yaml` up to date.
