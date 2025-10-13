set -euo pipefail
FILE="src/pages/additional-services/index.astro"

echo "=== File ==="
echo "$FILE"
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repo. Exiting."
  exit 2
fi

if [ ! -e "$FILE" ]; then
  echo "Status: missing in working tree."
else
  echo "Status: present (size=$(wc -c <"$FILE") bytes, lines=$(wc -l <"$FILE"))"
fi

echo
echo "=== Locating purge commit (where content became '...' or trivially small) ==="
purge_commit=""
# Grep for the literal '...' introduction; if not found, we'll fallback to trivial-size heuristic.
purge_commit=$(git rev-list -n 1 -S '...' HEAD -- "$FILE" || true)
if [ -n "$purge_commit" ]; then
  echo "Found commit that *mentions* '...' in diff: $purge_commit"
else
  echo "No explicit '...' add found; using size-based heuristic."
fi

echo
echo "=== Finding last good commit with substantial content ==="
last_good=""
# Iterate through history (newest->oldest) and pick the first with content size >= 100 bytes AND not equal to '...'
while IFS= read -r c; do
  tmp="$(mktemp)"
  if git show "${c}:${FILE}" > "$tmp" 2>/dev/null; then
    bytes=$(wc -c <"$tmp" | tr -d ' ')
    # Normalize whitespace and compare content to '...'
    norm=$(tr -d '[:space:]' < "$tmp")
    if [ "$bytes" -ge 100 ] && [ "$norm" != "..." ]; then
      last_good="$c"
      rm -f "$tmp"
      break
    fi
  fi
  rm -f "$tmp"
done < <(git rev-list HEAD -- "$FILE")

if [ -n "$last_good" ]; then
  echo "Last good commit: $last_good"
  echo "Last good date:   $(git show -s --format=%ad --date=iso "$last_good")"
else
  echo "No substantial prior version found in git history."
fi

echo
echo "=== Context (most recent 8 commits touching file) ==="
git log --follow --pretty=format:'%h %ad %an %s' --date=iso -n 8 -- "$FILE" || true

echo
echo "=== Diff around purge (if identified) ==="
if [ -n "$purge_commit" ]; then
  # Show the commit that introduced '...' plus one parent for context
  git show --stat --patch "$purge_commit" -- "$FILE" || true
else
  echo "No purge commit with '...' detected."
fi

echo
echo "=== Ready to restore? Use the companion script with APPLY=1 to write the last good content. ==="
