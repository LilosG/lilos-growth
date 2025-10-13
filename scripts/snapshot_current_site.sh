set -euo pipefail
ts=$(date +"%Y%m%d-%H%M%S")
out=".backups/snapshot-$ts"
mkdir -p "$out/files"

git rev-parse --is-inside-work-tree >/dev/null 2>&1 && git status --porcelain > "$out/git_status.txt" || echo "not a git repo" > "$out/git_status.txt"
node -v > "$out/node_version.txt" 2>/dev/null || true
npx astro --version > "$out/astro_version.txt" 2>/dev/null || true
npx tailwindcss -v > "$out/tailwind_version.txt" 2>/dev/null || true

printf "%s\n" \
  "src/pages" \
  "src/layouts" \
  "src/components" \
  "src/config.yaml" \
  "astro.config.*" \
  "package.json" \
  "tsconfig.*" \
  "tailwind.config.*" \
  "postcss.config.*" \
  "public" > "$out/paths_included.txt"

find src/pages -type f -maxdepth 2 -print 2>/dev/null | sort > "$out/pages_list.txt" || true
find src/layouts -type f -maxdepth 2 -print 2>/dev/null | sort > "$out/layouts_list.txt" || true
find src/components -type f -maxdepth 3 -print 2>/dev/null | sort > "$out/components_list.txt" || true

grep -RInH --include="*.astro" --include="*.md" --include="*.mdx" -E "export const title|<h1|<H1|<title>|define:metadata|JSON-LD|script type=\"application/ld\+json\"" src/pages src/layouts src/components > "$out/headings_titles_schema_grep.txt" || true

for p in \
  src/pages/pricing.astro \
  src/pages/gbp.astro \
  src/pages/additional-services.astro \
  src/layouts/PageLayout.astro \
  src/layouts/Base.astro \
  src/components; do
  if [ -e "$p" ]; then
    mkdir -p "$out/files/$(dirname "$p")"
    rsync -a "$p" "$out/files/$p"
  fi
done

if [ -f package.json ]; then cp package.json "$out/files/package.json"; fi
if ls astro.config.* >/dev/null 2>&1; then cp astro.config.* "$out/files/"; fi
if ls tailwind.config.* >/dev/null 2>&1; then cp tailwind.config.* "$out/files/"; fi
if ls postcss.config.* >/dev/null 2>&1; then cp postcss.config.* "$out/files/"; fi
if [ -f src/config.yaml ]; then mkdir -p "$out/files/src"; cp src/config.yaml "$out/files/src/"; fi

find "$out" -type f -print0 | xargs -0 shasum > "$out/checksums.txt" 2>/dev/null || true

tar -czf "$out.tar.gz" -C "$(dirname "$out")" "$(basename "$out")"
echo "$out.tar.gz"
