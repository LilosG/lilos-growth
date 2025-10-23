#!/usr/bin/env bash
set -euo pipefail

REPORT="seo_audit_report.txt"
: > "$REPORT"

echo "== Branch & Status ==" | tee -a "$REPORT"
git rev-parse --abbrev-ref HEAD | tee -a "$REPORT"
git status -sb | tee -a "$REPORT"

echo "" | tee -a "$REPORT"
echo "== Build Health ==" | tee -a "$REPORT"
if command -v npx >/dev/null 2>&1; then
  npx astro check | tee -a "$REPORT" || true
fi
if command -v pnpm >/dev/null 2>&1; then
  pnpm build | tee -a "$REPORT" || npm run build | tee -a "$REPORT"
else
  npm run build | tee -a "$REPORT"
fi

echo "" | tee -a "$REPORT"
echo "== Head Tags (title / meta description / canonical) ==" | tee -a "$REPORT"
if command -v rg >/dev/null 2>&1; then
  rg -n '<title|name="description"|rel="canonical"' src/layouts src/components src/pages | sed -n '1,200p' | tee -a "$REPORT" || true
else
  echo "ripgrep (rg) not found" | tee -a "$REPORT"
fi

echo "" | tee -a "$REPORT"
echo "== H1 usage ==" | tee -a "$REPORT"
if command -v rg >/dev/null 2>&1; then
  rg -n '<h1' src/pages src/components | sed -n '1,200p' | tee -a "$REPORT" || true
fi

echo "" | tee -a "$REPORT"
echo "== Robots & Sitemap ==" | tee -a "$REPORT"
if test -f public/robots.txt; then
  echo "robots.txt found" | tee -a "$REPORT"
else
  echo "robots.txt MISSING" | tee -a "$REPORT"
fi
if command -v rg >/dev/null 2>&1; then
  rg -n 'sitemap' src/pages src | sed -n '1,80p' | tee -a "$REPORT" || true
fi
if test -f public/sitemap.xml; then
  echo "static sitemap present (check freshness)" | tee -a "$REPORT"
else
  echo "no static sitemap (ok if dynamic / sitemap-index.xml)" | tee -a "$REPORT"
fi

echo "" | tee -a "$REPORT"
echo "== Heavy Images (>300 KB) ==" | tee -a "$REPORT"
find public src -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -size +300k -print | sed -n '1,200p' | tee -a "$REPORT" || true

echo "" | tee -a "$REPORT"
echo "== Non-next-gen image references (png/jpg) ==" | tee -a "$REPORT"
if command -v rg >/dev/null 2>&1; then
  rg -n '\.(png|jpe?g)' public src | sed -n '1,200p' | tee -a "$REPORT" || true
fi

echo "" | tee -a "$REPORT"
echo "== /blog catch-all conflict check ==" | tee -a "$REPORT"
if test -f src/pages/blog/\[...page].astro; then
  echo "Found src/pages/blog/[...page].astro — ensure it does NOT generate page 1 (/blog)" | tee -a "$REPORT"
else
  echo "No catch-all blog route detected (ok)" | tee -a "$REPORT"
fi

echo "" | tee -a "$REPORT"
echo "== Done. Open $REPORT for results. ==" | tee -a "$REPORT"
