set -euo pipefail
FILE="src/pages/additional-services/index.astro"
echo "File: $FILE"

if [ -s "$FILE" ]; then
  echo "Status: present and non-empty"
  exit 0
fi

is_git=0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 && is_git=1

if [ $is_git -eq 1 ]; then
  echo "Repo: git"
  echo "History (most recent 5 touching commits):"
  git log --follow --pretty=format:'%h %ad %an %s' --date=iso -n 5 -- "$FILE" || true
  last_commit=$(git rev-list -n 1 HEAD -- "$FILE" || true)
  if [ -n "${last_commit:-}" ]; then
    echo "Last commit containing file: $last_commit"
    echo "Last commit date:"
    git show -s --format=%ad --date=iso "$last_commit"
    restore_src=".proposed/$FILE"
    mkdir -p "$(dirname "$restore_src")"
    git show "${last_commit}:${FILE}" > "$restore_src" || true
    if [ -s "$restore_src" ]; then
      echo "Restored candidate written to: $restore_src"
      if [ "${APPLY:-0}" = "1" ]; then
        mkdir -p "$(dirname "$FILE")"
        cp "$restore_src" "$FILE"
        echo "Applied restore to $FILE"
      else
        echo "Dry run. To apply now: APPLY=1 bash scripts/find_and_restore_additional_services.sh"
      fi
      exit 0
    fi
  else
    echo "File has no history in git HEAD"
  fi
else
  echo "Repo: not a git repo"
fi

echo "Searching backups for the file"
latest_with_file=""
for tgz in $(ls -t .backups/snapshot-*.tar.gz 2>/dev/null || true); do
  if tar -tzf "$tgz" | grep -q "^$(printf '%s' ".backups"/ | sed 's/[].[^$\\*|]/\\&/g')"; then :; fi
  if tar -tzf "$tgz" | grep -q "files/$FILE$"; then
    latest_with_file="$tgz"
    break
  fi
done

if [ -n "$latest_with_file" ]; then
  echo "Found in backup: $latest_with_file"
  tmpdir="$(mktemp -d)"
  tar -xzf "$latest_with_file" -C "$tmpdir"
  src_path="$(find "$tmpdir" -type f -path "*/files/$FILE" -print -quit)"
  if [ -n "$src_path" ]; then
    restore_src=".proposed/$FILE"
    mkdir -p "$(dirname "$restore_src")"
    cp "$src_path" "$restore_src"
    echo "Restored candidate from backup to: $restore_src"
    if [ "${APPLY:-0}" = "1" ]; then
      mkdir -p "$(dirname "$FILE")"
      cp "$restore_src" "$FILE"
      echo "Applied restore to $FILE"
    else
      echo "Dry run. To apply now: APPLY=1 bash scripts/find_and_restore_additional_services.sh"
    fi
    rm -rf "$tmpdir"
    exit 0
  fi
  rm -rf "$tmpdir"
fi

echo "No git history and not found in backups. To recover, check Time Machine, your Vercel repo, or other remotes."
exit 1
