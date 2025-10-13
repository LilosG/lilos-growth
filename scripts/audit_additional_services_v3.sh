set -euo pipefail
FILE="src/pages/additional-services/index.astro"
URL_PATH="/additional-services"
DIST="dist${URL_PATH}/index.html"
PASS=true
[ -s "$FILE" ] || { echo "FAIL source missing or empty"; exit 1; }
npm run build >/dev/null 2>&1 || { echo "FAIL build"; exit 1; }
[ -f "$DIST" ] || { echo "FAIL dist html missing $DIST"; exit 1; }
TITLE=$(grep -oE '<title>[^<]+' "$DIST" | sed 's/<title>//' | head -n1 || true)
[ -n "$TITLE" ] && echo "OK title: $TITLE" || { echo "FAIL missing <title>"; PASS=false; }
META_LINE=$(grep -oE '<meta[^>]+name=["'"'"']description["'"'"'][^>]*>' "$DIST" | head -n1 || true)
if [ -n "$META_LINE" ]; then
  DESC=$(printf "%s\n" "$META_LINE" | sed -E 's/.*content=["'"'"']([^"'"'"']+)["'"'"'].*/\1/;t;s/.*/ /')
  [ -n "$DESC" ] && echo "OK description: ${DESC:0:120}" || { echo "FAIL description content attr missing"; PASS=false; }
else
  echo "FAIL missing meta description"
  PASS=false
fi
H1=$(grep -oE '<h1[^>]*>.*</h1>' "$DIST" | head -n1 || true)
[ -n "$H1" ] && echo "OK H1 present" || { echo "FAIL missing H1"; PASS=false; }
grep -q "Additional Services" "$DIST" && echo "OK text found: Additional Services" || echo "WARN missing text: Additional Services"
grep -q "Google Business Profile" "$DIST" && echo "OK text found: Google Business Profile" || echo "WARN missing text: Google Business Profile"
grep -q '"@type":"BreadcrumbList"' "$DIST" && echo "OK BreadcrumbList JSON-LD" || echo "WARN no BreadcrumbList"
TMP_LINKS="$(mktemp)"; grep -oE 'href="/[^"#?]+' "$DIST" | sed 's/^href="//' | sort -u > "$TMP_LINKS" || true
MISSING=0
while read -r path; do
  case "$path" in */_astro/*|*.css|*.js|*.png|*.jpg|*.jpeg|*.svg|*.ico|*.xml) continue ;; esac
  tgt="dist${path%/}"; f="${tgt}/index.html"; [ -d "$tgt" ] && [ -f "$f" ] || f="${tgt}.html"
  [ -f "$f" ] || { echo "WARN missing target: $path"; MISSING=$((MISSING+1)); }
done < "$TMP_LINKS"
rm -f "$TMP_LINKS"
echo "Missing HTML targets: $MISSING"
SM_OK=0
if [ -f dist/sitemap-index.xml ]; then
  mapfile -t SMAPS < <(grep -oE '<loc>[^<]+' dist/sitemap-index.xml | sed -E 's#<loc>https?://[^/]+/##')
  for s in "${SMAPS[@]}"; do
    [ -f "dist/$s" ] && grep -q "${URL_PATH}/" "dist/$s" && SM_OK=1 && break
  done
fi
[ "$SM_OK" -eq 1 ] && echo "OK found in a sitemap" || echo "WARN not found in sitemap set"
[ "$PASS" = true ] && echo "PASS audit" || echo "FAIL audit"
