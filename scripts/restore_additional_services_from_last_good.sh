set -euo pipefail
FILE="src/pages/additional-services/index.astro"
DEST=".proposed/$FILE"
APPLY="${APPLY:-0}"

git rev-parse --is-inside-work-tree >/dev/null 2>&1

last_good=""
while IFS= read -r c; do
  tmp="$(mktemp)"
  if git show "${c}:${FILE}" > "$tmp" 2>/dev/null; then
    bytes=$(wc -c <"$tmp" | tr -d ' ')
    norm=$(tr -d '[:space:]' < "$tmp")
    if [ "$bytes" -ge 100 ] && [ "$norm" != "..." ]; then
      last_good="$c"
      mv "$tmp" "$tmp.restored"
      break
    fi
  fi
  rm -f "$tmp"
done < <(git rev-list HEAD -- "$FILE")

if [ -z "$last_good" ]; then
  echo "No substantial prior version found."
  exit 1
fi

echo "Last good: $last_good  $(git show -s --format=%ad --date=iso "$last_good")"
mkdir -p "$(dirname "$DEST")"
git show "${last_good}:${FILE}" > "$DEST"

echo "Candidate written: $DEST"
wc -l "$DEST"; wc -c "$DEST"; shasum "$DEST" || true

if [ -f "$FILE" ]; then
  echo "Diff (working tree vs candidate):"
  diff -u "$FILE" "$DEST" || true
fi

if [ "$APPLY" = "1" ]; then
  mkdir -p "$(dirname "$FILE")"
  cp "$DEST" "$FILE"
  echo "Applied to $FILE"
  echo "Next:"
  echo "  git add \"$FILE\" && git commit -m \"restore: additional-services from last good\" && git push origin main"
else
  echo "Dry run. To apply now: APPLY=1 bash scripts/restore_additional_services_from_last_good.sh"
fi
