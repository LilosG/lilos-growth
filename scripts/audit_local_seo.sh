#!/usr/bin/env bash
set -euo pipefail

# ---------- CONFIG ----------
OUT_DIR=".audit"
REPORT="$OUT_DIR/report.md"
PAGES_DIR="${PAGES_DIR:-src/pages}"
COMP_DIR="${COMP_DIR:-src/components}"
LAYOUT_DIR="${LAYOUT_DIR:-src/layouts}"
PUBLIC_DIR="${PUBLIC_DIR:-public}"
CONTENT_DIR="${CONTENT_DIR:-src/content}"
MAX_WARN=0

# ---------- HELPERS ----------
ts() { date +"%Y-%m-%d %H:%M:%S"; }
have() { command -v "$1" >/dev/null 2>&1; }
pm_detect() {
  if [ -f pnpm-lock.yaml ]; then echo "pnpm"; return; fi
  if [ -f yarn.lock ]; then echo "yarn"; return; fi
  echo "npm"
}
RG=""; if have rg; then RG="rg"; else RG="grep -R --line-number --binary-files=without-match"; fi
JQ=""; if have jq; then JQ="jq"; fi
add_warn() { MAX_WARN=$((MAX_WARN+1)); }

search() {
  local pat="$1"; shift
  local paths=("$@")
  if [ "$RG" = "rg" ]; then
    rg -n --no-ignore -S --glob '!.git' "$pat" "${paths[@]}" || true
  else
    grep -R -n -E "$pat" "${paths[@]}" 2>/dev/null || true
  fi
}

# ---------- PREP ----------
mkdir -p "$OUT_DIR"
: > "$REPORT"
{
  echo "# Astro/Tailwind Local SEO & Tech Audit"
  echo
  echo "- Timestamp: \`$(ts)\`"
  echo "- Working dir: \`$PWD\`"
  echo
} >> "$REPORT"

# ---------- ENV / PKG ----------
{
  echo "## Project & Tooling"
  PM=$(pm_detect)
  echo "- Package manager: \`$PM\`"
  echo
  echo "### package.json quick scan"
} >> "$REPORT"

if [ -f package.json ]; then
  if [ -n "$JQ" ]; then
    ASTRO_VER=$($JQ -r '.devDependencies.astro // .dependencies.astro // empty' package.json || true)
    TAILWIND_VER=$($JQ -r '.devDependencies.tailwindcss // .dependencies.tailwindcss // empty' package.json || true)
    SITEMAP_PKG=$($JQ -r '.devDependencies["@astrojs/sitemap"] // .dependencies["@astrojs/sitemap"] // empty' package.json || true)
    ROBOTS_PKG=$($JQ -r '.devDependencies["@astrojs/robots"] // .dependencies["@astrojs/robots"] // empty' package.json || true)
    MDX_PKG=$($JQ -r '.devDependencies["@astrojs/mdx"] // .dependencies["@astrojs/mdx"] // empty' package.json || true)
    {
      echo "- astro: \`${ASTRO_VER:-missing}\`"
      echo "- tailwindcss: \`${TAILWIND_VER:-missing}\`"
      echo "- @astrojs/sitemap: \`${SITEMAP_PKG:-absent}\`"
      echo "- @astrojs/robots: \`${ROBOTS_PKG:-absent}\`"
      echo "- @astrojs/mdx: \`${MDX_PKG:-absent}\`"
    } >> "$REPORT"
  else
    echo "- (tip) Install \`jq\` for richer package scans." >> "$REPORT"
    search '"astro"|tailwind|@astrojs/sitemap|@astrojs/robots|@astrojs/mdx' package.json | sed 's/^/- /' >> "$REPORT" || true
  fi
else
  echo "- WARNING: no package.json" >> "$REPORT"; add_warn
fi
echo >> "$REPORT"

# ---------- CORE FILES ----------
{
  echo "## Core Files"
  SITEMAP_PRI="$PUBLIC_DIR/sitemap.xml"
  SITEMAP_IDX="$PUBLIC_DIR/sitemap-index.xml"
  ROBOTS_FILE="$PUBLIC_DIR/robots.txt"
} >> "$REPORT"

if [ -f "$SITEMAP_PRI" ] || [ -f "$SITEMAP_IDX" ]; then
  echo "- ✅ sitemap present: $( [ -f "$SITEMAP_PRI" ] && echo "$SITEMAP_PRI" || echo "$SITEMAP_IDX" )" >> "$REPORT"
else
  echo "- ❌ sitemap missing (expected $SITEMAP_PRI or $SITEMAP_IDX)" >> "$REPORT"; add_warn
fi
[ -f "$ROBOTS_FILE" ] && echo "- ✅ $ROBOTS_FILE exists" >> "$REPORT" || { echo "- ❌ $ROBOTS_FILE missing" >> "$REPORT"; add_warn; }
echo >> "$REPORT"

# ---------- LAYOUT / CANONICAL / META ----------
{
  echo "## Layout & Head (canonical, meta, JSON-LD)"
  LAYOUTS_FOUND=$(ls "$LAYOUT_DIR"/*.astro 2>/dev/null || true)
} >> "$REPORT"

if [ -n "$LAYOUTS_FOUND" ]; then
  CANON=$(search 'rel=["'\'']canonical["'\'']' "$LAYOUT_DIR")
  [ -z "$CANON" ] && { echo "- ❌ No \`<link rel=\"canonical\" ...>\` found in \`$LAYOUT_DIR\`" >> "$REPORT"; add_warn; } || echo "- ✅ Canonical tag present in layout(s)" >> "$REPORT"
  META_DESC=$(search '<meta[^>]+name=["'\'']description["'\'']' "$LAYOUT_DIR")
  [ -z "$META_DESC" ] && { echo "- ❌ No global meta description in layout(s) (ensure per-page descriptions are set)" >> "$REPORT"; add_warn; } || echo "- ✅ Meta description present" >> "$REPORT"
  JSONLD=$(search 'application/ld\+json' "$LAYOUT_DIR" "$PAGES_DIR" "$COMP_DIR")
  [ -z "$JSONLD" ] && echo "- ⚠️ No JSON-LD detected (consider LocalBusiness/Service/FAQPage where relevant)" >> "$REPORT" || echo "- ✅ JSON-LD detected in project" >> "$REPORT"
else
  echo "- ⚠️ No files in \`$LAYOUT_DIR\` (custom head injection may live elsewhere)" >> "$REPORT"
fi
echo >> "$REPORT"

# ---------- PAGES: TITLES, H1, DESCRIPTIONS ----------
{
  echo "## Page-level On-Page Signals"
  TMP_PAGES="$OUT_DIR/pages_list.txt"
} >> "$REPORT"

find "$PAGES_DIR" -type f \( -name "*.astro" -o -name "*.md" -o -name "*.mdx" \) > "$TMP_PAGES"

MISSING_TITLE=0; MISSING_H1=0; MISSING_DESC=0
{
  echo
  echo "| File | <title> | H1 count | Meta Description |"
  echo "|---|---:|---:|---:|"
} >> "$REPORT"

while IFS= read -r f; do
  TITLE_CNT=$(search '<title>.*</title>' "$f" | wc -l | tr -d ' ')
  H1_CNT=$(search '<h1[^>]*>' "$f" | wc -l | tr -d ' ')
  DESC_CNT=$(search '<meta[^>]+name=["'\'']description["'\'']' "$f" | wc -l | tr -d ' ')
  FM_TITLE=0
  case "$f" in
    *.md|*.mdx)
      if awk 'BEGIN{f=0} /^---/{f++;next} f==1 && /^title:/{print; exit}' "$f" >/dev/null; then FM_TITLE=1; fi
      ;;
  esac
  [ "$TITLE_CNT" -eq 0 ] && [ "$FM_TITLE" -eq 0 ] && MISSING_TITLE=$((MISSING_TITLE+1))
  [ "$H1_CNT" -eq 0 ] && MISSING_H1=$((MISSING_H1+1))
  [ "$DESC_CNT" -eq 0 ] && MISSING_DESC=$((MISSING_DESC+1))
  echo "| \`$f\` | $((TITLE_CNT+FM_TITLE)) | ${H1_CNT} | ${DESC_CNT} |" >> "$REPORT"
done < "$TMP_PAGES"

[ "$MISSING_TITLE" -gt 0 ] && { echo "- ❌ Pages missing title/frontmatter title: $MISSING_TITLE" >> "$REPORT"; add_warn; }
[ "$MISSING_H1" -gt 0 ] && { echo "- ❌ Pages missing H1: $MISSING_H1" >> "$REPORT"; add_warn; }
[ "$MISSING_DESC" -gt 0 ] && { echo "- ❌ Pages missing meta description: $MISSING_DESC" >> "$REPORT"; add_warn; }
echo >> "$REPORT"

# ---------- LINKS: INTERNAL, TRAILING SLASHES ----------
{
  echo "## Links & Routing Hygiene"
  ALL_LINKS_FILE="$OUT_DIR/links_raw.txt"
}
search 'href=['"'"'"]/' "$PAGES_DIR" "$COMP_DIR" "$LAYOUT_DIR" > "$ALL_LINKS_FILE" || true
TOTAL_LINKS=$(wc -l < "$ALL_LINKS_FILE" 2>/dev/null || echo 0)
echo "- Found ~${TOTAL_LINKS} internal link occurrences" >> "$REPORT"

TRL_FILE="$OUT_DIR/links_trailing_slash.txt"
awk -F'href=' "
  {
    if (match(\$0, /href=(\"[^\"]+\"|['\"][^'\"]+['\"])/, a)) {
      url=a[1]
      gsub(/^['\"]/ ,\"\", url)
      gsub(/['\"]$/, \"\", url)
      if (url ~ /^\/.+\/$/ && url != \"/\") print url
    }
  }
" "$ALL_LINKS_FILE" | sort -u > "$TRL_FILE"

TRL_CNT=$(wc -l < "$TRL_FILE" 2>/dev/null || echo 0)
if [ "$TRL_CNT" -gt 0 ]; then
  {
    echo "- ⚠️ Internal links with trailing slashes (policy check): $TRL_CNT"
    echo
    echo "<details><summary>Examples</summary>"
  } >> "$REPORT"
  head -n 25 "$TRL_FILE" | sed 's/^/- /' >> "$REPORT"
  echo "</details>" >> "$REPORT"
fi
echo >> "$REPORT"

# ---------- IMAGES: ALT ----------
{
  echo "## Media Accessibility (ALT attributes)"
  IMG_MISS_ALT_FILE="$OUT_DIR/images_missing_alt.txt"
}
search '<img[^>]*>' "$PAGES_DIR" "$COMP_DIR" "$LAYOUT_DIR" \
| awk -F: "
  {
    file=\$1; sub(/:.*/,\"\",file)
    tag=\$0; sub(/^[^:]*:[0-9]+:/,\"\",tag)
    if (tag ~ /<img/ && tag !~ /alt=(\"[^\"]*\"|['\"][^'\"]*['\"])|alt={[^}]*}/) print file \":\" tag
  }
" > "$IMG_MISS_ALT_FILE" || true
IMG_MISS_CNT=$(wc -l < "$IMG_MISS_ALT_FILE" 2>/dev/null || echo 0)
if [ "$IMG_MISS_CNT" -gt 0 ]; then
  echo "- ❌ Images missing \`alt\`: $IMG_MISS_CNT" >> "$REPORT"; add_warn
  {
    echo
    echo "<details><summary>First 20</summary>"
  } >> "$REPORT"
  head -n 20 "$IMG_MISS_ALT_FILE" | sed 's/^/- /' >> "$REPORT"
  echo "</details>" >> "$REPORT"
else
  echo "- ✅ All scanned <img> tags include an \`alt\` attribute" >> "$REPORT"
fi
echo >> "$REPORT"

# ---------- STATIC PERFORMANCE HINTS ----------
{
  echo "## Static Performance Hints (code-level)"
  UNOPT_IMG="$OUT_DIR/images_unoptimized.txt"
}
search '<img[^>]*>' "$PAGES_DIR" "$COMP_DIR" "$LAYOUT_DIR" \
| awk -F: "
  {
    tag=\$0; sub(/^[^:]*:[0-9]+:/,\"\",tag)
    lazy = (tag ~ /loading=(\"lazy\"|['\"]lazy['\"]|{[^}]*lazy[^}]*)/)?1:0
    hasW = (tag ~ /width=(\"[0-9]+\"|{[^{]*})/)?1:0
    hasH = (tag ~ /height=(\"[0-9]+\"|{[^{]*})/)?1:0
    if (!lazy || !hasW || !hasH) print tag
  }
" | head -n 50 > "$UNOPT_IMG" || true
UNOPT_CNT=$(wc -l < "$UNOPT_IMG" 2>/dev/null || echo 0)
if [ "$UNOPT_CNT" -gt 0 ]; then
  echo "- ⚠️ Potential unoptimized <img> tags (missing lazy/width/height): $UNOPT_CNT (showing up to 50)" >> "$REPORT"
  {
    echo "<details><summary>Examples</summary>"
    sed 's/^/- /' "$UNOPT_IMG"
    echo "</details>"
  } >> "$REPORT"
else
  echo "- ✅ No obvious <img> optimization issues detected" >> "$REPORT"
fi
echo >> "$REPORT"

# ---------- AEO SIGNALS ----------
{
  echo "## AEO (AI Engine Optimization) Signals"
}
FAQ_HINTS=$(search '(FAQ|Frequently Asked Questions|schema.org/FAQPage)' "$PAGES_DIR" "$COMP_DIR" "$LAYOUT_DIR")
HOWTO_HINTS=$(search '(HowTo|schema.org/HowTo)' "$PAGES_DIR" "$COMP_DIR" "$LAYOUT_DIR")
ENTITY_HINTS=$(search '(LocalBusiness|Service|Organization|@type)' "$PAGES_DIR" "$COMP_DIR" "$LAYOUT_DIR")
[ -n "$FAQ_HINTS" ] && echo "- ✅ FAQ evidence found" >> "$REPORT" || echo "- ⚠️ No FAQ evidence (consider FAQPage where useful)" >> "$REPORT"
[ -n "$HOWTO_HINTS" ] && echo "- ✅ HowTo evidence found" >> "$REPORT" || echo "- ⚠️ No HowTo evidence (use only when truly helpful)" >> "$REPORT"
[ -n "$ENTITY_HINTS" ] && echo "- ✅ Entity JSON-LD hints found" >> "$REPORT" || echo "- ⚠️ No LocalBusiness/Service JSON-LD hints found" >> "$REPORT"
echo >> "$REPORT"

# ---------- SITEMAP & ROBOTS ----------
{
  echo "## Sitemap & Robots Cross-check"
}
if [ -f "$ROBOTS_FILE" ]; then
  if grep -Eiq '^sitemap:' "$ROBOTS_FILE"; then
    echo "- ✅ robots.txt references sitemap" >> "$REPORT"
  else
    echo "- ⚠️ robots.txt does not reference sitemap" >> "$REPORT"
  fi
fi
SITEMAP_USE="$SITEMAP_PRI"
[ -f "$SITEMAP_IDX" ] && SITEMAP_USE="$SITEMAP_IDX"
if [ -f "$SITEMAP_USE" ]; then
  URLS=$(grep -Eo '<loc>[^<]+' "$SITEMAP_USE" | sed 's/<loc>//' | wc -l | tr -d ' ')
  echo "- Sitemap URL count (approx): ${URLS}" >> "$REPORT"
fi
echo >> "$REPORT"

# ---------- SUMMARY ----------
echo "## Summary" >> "$REPORT"
if [ "$MAX_WARN" -gt 0 ]; then
  echo "- Issues found: **$MAX_WARN** (see sections above)" >> "$REPORT"
else
  echo "- ✅ No critical issues detected by static audit" >> "$REPORT"
fi
echo >> "$REPORT"
echo "> Next: paste the Summary + any ❌ sections and I'll ship full-file fixes via hero-doc Bash." >> "$REPORT"

echo "Wrote $REPORT"
