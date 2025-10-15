set -euo pipefail
FILE="src/pages/additional-services/index.astro"
URL_PATH="/additional-services"
DIST="dist${URL_PATH}/index.html"
PASS=true
if [ ! -s "$FILE" ]; then echo "FAIL source missing or empty"; exit 1; fi
npm run build >/dev/null 2>&1 || { echo "FAIL build"; exit 1; }
[ -f "$DIST" ] || { echo "FAIL dist html missing $DIST"; exit 1; }
TITLE=$(grep -oE '<title>[^<]+' "$DIST" | sed 's/<title>//' | head -n1 || true)
DESC=$(grep -oE '<meta name="description" content="[^"]+"' "$DIST" | sed 's/.*content="//;s/"$//' | head -n1 || true)
H1=$(grep -oE '<h1[^>]*>.*</h1>' "$DIST" | head -n1 || true)
[ -n "$TITLE" ] && echo "OK title: $TITLE" || { echo "FAIL missing <title>"; PASS=false; }
[ -n "$DESC" ] && echo "OK description: ${DESC:0:120}" || { echo "FAIL missing meta description"; PASS=false; }
[ -n "$H1" ] && echo "OK H1 present" || { echo "FAIL missing H1"; PASS=false; }
grep -q "Additional Services" "$DIST" && echo "OK text found: Additional Services" || echo "WARN missing text: Additional Services"
grep -q "Google Business Profile" "$DIST" && echo "OK text found: Google Business Profile" || echo "WARN missing text: Google Business Profile"
grep -q '"@type":"BreadcrumbList"' "$DIST" && echo "OK BreadcrumbList JSON-LD" || echo "WARN no BreadcrumbList"
TMP_LINKS="$(mktemp)"; grep -oE 'href="/[^"#?]+' "$DIST" | sed 's/^href="//' | sort -u > "$TMP_LINKS" || true
MISSING=0
while read -r path; do
  case "$path" in
    */_astro/*|*.css|*.js|*.png|*.jpg|*.jpeg|*.svg|*.ico|*.xml) continue ;;
  esac
  tgt="dist${path%/}"
  if [ -d "$tgt" ]; then f="$tgt/index.html"; else f="${tgt}/index.html"; fi
  [ -f "$f" ] || f="${tgt}.html"
  if [ ! -f "$f" ]; then echo "WARN missing target: $path"; MISSING=$((MISSING+1)); fi
done < "$TMP_LINKS"
rm -f "$TMP_LINKS"
echo "Missing HTML targets: $MISSING"
SM_FOUND=0
if [ -f dist/sitemap-index.xml ]; then
  grep -q "<loc>.*/additional-services/</loc>" dist/sitemap-index.xml && SM_FOUND=1
fi
[ "$SM_FOUND" -eq 1 ] && echo "OK found in sitemap-index.xml" || echo "WARN not found in sitemap-index.xml"
if [ "$PASS" = true ]; then echo "PASS audit"; else echo "FAIL audit"; fi
exit 0
