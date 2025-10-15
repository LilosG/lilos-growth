set -euo pipefail
FILE="src/pages/additional-services/index.astro"
DIST="dist/additional-services/index.html"
[ -s "$FILE" ] || { echo "FAIL source missing or empty"; exit 1; }
npm run build >/dev/null 2>&1 || { echo "FAIL build"; exit 1; }
[ -f "$DIST" ] || { echo "FAIL dist html missing $DIST"; exit 1; }
TITLE=$(grep -oE '<title>[^<]+' "$DIST" | sed 's/<title>//' | head -n1 || true)
[ -n "$TITLE" ] && echo "OK title: $TITLE" || { echo "FAIL missing <title>"; FAIL=1; }
MDCOUNT=$(grep -oEi '<meta[^>]+name=["'"'"']description["'"'"']' "$DIST" | wc -l | tr -d ' ')
[ "$MDCOUNT" -eq 1 ] && echo "OK one meta description" || { echo "FAIL meta description count: $MDCOUNT"; FAIL=1; }
DESC=$(perl -0777 -ne 'while (/<meta\b[^>]*\bname=["'\''"]description["'\''"][^>]*\bcontent=["'\''"]([^"'\''"]+)["'\''"][^>]*>/ig){print "$1\n"}' "$DIST" | head -n1 || true)
[ -n "$DESC" ] && echo "OK description: ${DESC:0:120}" || echo "WARN could not extract description content"
H1=$(grep -oE '<h1[^>]*>.*</h1>' "$DIST" | head -n1 || true)
[ -n "$H1" ] && echo "OK H1 present" || { echo "FAIL missing H1"; FAIL=1; }
grep -q "Additional Services" "$DIST" && echo "OK text found: Additional Services" || echo "WARN missing text: Additional Services"
grep -q "Google Business Profile" "$DIST" && echo "OK text found: Google Business Profile" || echo "WARN missing text: Google Business Profile"
grep -q '"@type":"BreadcrumbList"' "$DIST" && echo "OK BreadcrumbList JSON-LD" || echo "WARN no BreadcrumbList"
SM_OK=0
if [ -f dist/sitemap-index.xml ]; then
  mapfile -t SMAPS < <(grep -oE '<loc>[^<]+' dist/sitemap-index.xml | sed -E 's#<loc>https?://[^/]+/##')
  for s in "${SMAPS[@]}"; do
    [ -f "dist/$s" ] && grep -q "/additional-services/" "dist/$s" && SM_OK=1 && break
  done
fi
[ "$SM_OK" -eq 1 ] && echo "OK found in a sitemap" || echo "WARN not found in sitemap set"
test -z "${FAIL:-}" && echo "PASS audit" || { echo "FAIL audit"; exit 1; }
