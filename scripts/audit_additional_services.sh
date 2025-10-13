set -euo pipefail
FILE="src/pages/additional-services/index.astro"
echo "==== PATH ===="
echo "$FILE"

echo "==== STAT ===="
if [ -e "$FILE" ]; then
  stat -f "mtime=%Sm size=%z bytes" -t "%Y-%m-%d %H:%M:%S %Z" "$FILE" 2>/dev/null || ls -lT "$FILE"
  shasum "$FILE" || true
else
  echo "MISSING"
  exit 1
fi

echo "==== GIT HISTORY (5) ===="
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git log --follow --pretty=format:'%h %ad %an %s' --date=iso -n 5 -- "$FILE" || true
else
  echo "not a git repo"
fi

echo "==== HEAD CONTAINS? ===="
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git rev-list -n 1 HEAD -- "$FILE" >/dev/null 2>&1 && echo "present in HEAD" || echo "no entry in HEAD"
fi

echo "==== LENGTH (LINES) ===="
wc -l "$FILE" || true

echo "==== GREP SCANS ===="
grep -nE '"@type": *"FAQPage"|data-evt=|"@type": *"Offer"|Google Business Profile|Additional Services' "$FILE" || true

echo "==== CONTENT BEGIN ===="
sed -n '1,9999p' "$FILE"
echo "==== CONTENT END ===="
