#!/usr/bin/env bash
set -euo pipefail
# Usage: scripts/make-hero.sh 'TITLE (use \n for line breaks)' slug ['SUBTITLE']
if [ $# -lt 2 ]; then
  echo "Usage: scripts/make-hero.sh 'TITLE (use \\n for line breaks)' slug ['SUBTITLE']"
  exit 1
fi

TITLE_RAW="$1"
SLUG="$2"
SUBTITLE="${3:-}"

# Convert literal \n into real newlines
TITLE="$(printf "%s" "$TITLE_RAW" | sed 's/\\n/\n/g')"

# Split into lines
IFS=$'\n' read -rd '' -a LINES <<<"$TITLE" || true
[ ${#LINES[@]} -eq 0 ] && LINES=("$TITLE")

# Find longest line length (characters)
LONGEST=0
for L in "${LINES[@]}"; do
  # strip leading/trailing spaces
  L="${L#"${L%%[![:space:]]*}"}"; L="${L%"${L##*[![:space:]]}"}"
  LEN=${#L}
  (( LEN > LONGEST )) && LONGEST=$LEN
done

# Card geometry: text area ~1280px wide (from x=120 to right margin)
# Base font 96 fits ~28 chars comfortably in bold; scale down for longer lines.
BASE=96
MAX_CHARS_AT_BASE=28
FS=$BASE
if (( LONGEST > MAX_CHARS_AT_BASE )); then
  FS=$(( BASE * MAX_CHARS_AT_BASE / LONGEST ))
fi

# Clamp font-size depending on number of lines (more lines -> slightly smaller)
if (( ${#LINES[@]} >= 3 )); then
  (( FS > 80 )) && FS=80
elif (( ${#LINES[@]} == 2 )); then
  (( FS > 90 )) && FS=90
fi
# Don’t let it go too small
(( FS < 56 )) && FS=56

# Build <tspan> blocks so lines actually wrap in SVG
TSPANS=""
for i in "${!LINES[@]}"; do
  LINE="${LINES[$i]}"
  # escape &
  LINE="${LINE//&/&amp;}"
  if [ "$i" -eq 0 ]; then
    TSPANS+="<tspan x=\"0\" y=\"0\">$LINE</tspan>"
  else
    TSPANS+="<tspan x=\"0\" dy=\"1.2em\">$LINE</tspan>"
  fi
done

OUTDIR="public/images/blog/$SLUG"
mkdir -p "$OUTDIR"

# Create SVG (template inline so this script is standalone)
cat > "$OUTDIR/hero.svg" <<SVG
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a3a4a"/>
      <stop offset="100%" stop-color="#2a3a4a"/>
    </linearGradient>
  </defs>
  <rect x="40" y="40" rx="48" ry="48" width="1520" height="820" fill="url(#bg)"/>
  <g transform="translate(120,330)">
    <text font-family="Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
          font-size="$FS" font-weight="800" fill="#ffffff">
      $TSPANS
    </text>
  </g>
  <rect x="120" y="500" width="520" height="18" rx="9" fill="#f56b2a"/>
  <g transform="translate(120,580)">
    <text x="0" y="0"
          font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
          font-size="36" font-weight="500" fill="#cfd8e3">$SUBTITLE</text>
  </g>
</svg>
SVG

echo "✓ Wrote $OUTDIR/hero.svg  (lines=${#LINES[@]}, longest=$LONGEST chars, font-size=${FS})"
