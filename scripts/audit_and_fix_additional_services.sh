set -euo pipefail
FILE="src/pages/additional-services/index.astro"
URL_PATH="/additional-services"
DIST="dist${URL_PATH}/index.html"
PASS=true
echo "==== CHECK: source file exists and has content ===="
if [ ! -s "$FILE" ]; then echo "FAIL source missing or empty"; PASS=false; else echo "OK $FILE"; fi
echo "==== CHECK: required exports present ===="
has_title=$(grep -cE '^export const title *= *' "$FILE" || true)
has_desc=$(grep -cE '^export const description *= *' "$FILE" || true)
if [ "$has_title" -eq 0 ] || [ "$has_desc" -eq 0 ]; then echo "MISSING title or description"; PASS=false; fi
echo "==== CHECK: Layout usage ===="
has_layout_tag=$(grep -cE '<Layout' "$FILE" || true)
if [ "$has_layout_tag" -eq 0 ]; then echo "MISSING <Layout>"; PASS=false; fi
echo "==== OPTIONAL FIX: inject breadcrumbs and metadata if absent ===="
has_breadcrumbs_export=$(grep -cE '^export const breadcrumbs *= *\[' "$FILE" || true)
if [ "$has_breadcrumbs_export" -eq 0 ]; then
  if [ "${APPLY:-0}" = "1" ]; then
    perl -0777 -i -pe 's#(export const description\s*=\s*[^;]+;)#\1\nexport const breadcrumbs = [\n  { name: "Services", item: "/services" },\n  { name: "Additional Services", item: "/additional-services" }\n];#' "$FILE"
    echo "APPLIED breadcrumbs export"
  else
    echo "FIX NEEDED add breadcrumbs export or run with APPLY=1"
    PASS=false
  fi
fi
has_layout_metadata=$(grep -cE '<Layout[^>]*metadata=' "$FILE" || true)
has_layout_breadcrumbs=$(grep -cE '<Layout[^>]*breadcrumbs=' "$FILE" || true)
if [ "$has_layout_metadata" -eq 0 ] || [ "$has_layout_breadcrumbs" -eq 0 ]; then
  if [ "${APPLY:-0}" = "1" ]; then
    perl -0777 -i -pe 's#<Layout([^>]*)>#my $attrs=$1; my $m=($attrs=~m/metadata=/)?$attrs: "$attrs metadata={{ title, description }}"; my $b=($m=~m/breadcrumbs=/)?$m: "$m breadcrumbs={breadcrumbs}"; "<Layout$b>";#e' "$FILE"
    echo "APPLIED Layout metadata and breadcrumbs props"
  else
    echo "FIX NEEDED ensure <Layout ... metadata={{ title, description }} breadcrumbs={breadcrumbs}> or run with APPLY=1"
    PASS=false
  fi
fi
echo "==== BUILD SITE ===="
npm run build >/dev/null 2>&1 || { echo "FAIL build"; exit 1; }
if [ ! -f "$DIST" ]; then echo "FAIL dist html missing $DIST"; exit 1; fi
echo "OK dist html present $DIST"
echo "==== CHECK: title and meta description in dist ===="
page_title=$(grep -oE '<title>[^<]+'</ "$DIST" | sed 's/<title>//' | head -n1 || true)
meta_desc=$(grep -oE '<meta name="description" content="[^"]+"' "$DIST" | sed 's/.*content="//;s/"$//' | head -n1 || true)
if [ -z "$page_title" ]; then echo "FAIL missing <title>"; PASS=false; else echo "OK title: $page_title"; fi
if [ -z "$meta_desc" ]; then echo "FAIL missing meta description"; PASS=false; else echo "OK description: ${meta_desc:0:120}"; fi
echo "==== CHECK: H1 and key headings exist ===="
h1=$(grep -oE '<h1[^>]*>.*</h1>' "$DIST" | head -n1 || true)
if [ -z "$h1" ]; then echo "FAIL missing H1"; PASS=false; else echo "OK H1 present"; fi
needles='Additional Services|Order Additional Services|Google Business Profile'
echo "$needles" | tr '|' '\n' | while read -r n; do [ -z "$n" ] && continue; if grep -q "$n" "$DIST"; then echo "OK text found: $n"; else echo "WARN missing text: $n"; fi; done
echo "==== CHECK: BreadcrumbList JSON-LD present ===="
if grep -q '"@type":"BreadcrumbList"' "$DIST"; then echo "OK BreadcrumbList"; else echo "WARN no BreadcrumbList"; fi
echo "==== CHECK: internal links resolve in dist ===="
tmp_links="$(mktemp)"; grep -oE 'href="/[^"#?]+' "$DIST" | sed 's/^href="//' | sort -u > "$tmp_links" || true
missing=0
while read -r path; do
  tgt="dist${path%/}"
  if [ -d "$tgt" ]; then f="$tgt/index.html"; else f="${tgt}/index.html"; fi
  [ -f "$f" ] || f="${tgt}.html"
  if [ ! -f "$f" ]; then echo "WARN missing target: $path"; missing=$((missing+1)); fi
done < "$tmp_links"
rm -f "$tmp_links"
echo "Missing targets: $missing"
echo "==== CHECK: sitemap contains page ===="
sm_count=$(grep -RIl "sitemap.*\.xml" dist | wc -l | tr -d ' ')
found_sm=0
if [ "$sm_count" -gt 0 ]; then
  if grep -RIl "sitemap.*\.xml" dist | xargs grep -q "${URL_PATH}/"; then echo "OK found in sitemap"; found_sm=1; else echo "WARN not found in sitemap"; fi
else
  echo "WARN no sitemap files detected"
fi
echo "==== SUMMARY ===="
if [ "$PASS" = true ]; then echo "PASS audit"; else echo "FAIL audit"; fi
if [ "$missing" -gt 0 ]; then echo "WARN unresolved internal links: $missing"; fi
if [ "$found_sm" -eq 0 ]; then echo "WARN sitemap may need regeneration"; fi
exit 0
