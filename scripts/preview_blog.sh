set -e
port="${PORT:-4321}"
altport="${ALT_PORT:-4322}"
skip="${SKIP_BUILD:-0}"

if [ "$skip" != "1" ]; then npm run -s build; fi

try_preview() {
  p="$1"
  npx astro preview --host --port "$p" >/dev/null 2>&1 &
  pid="$!"
  for i in $(seq 1 80); do
    if curl -sSf "http://localhost:$p/blog" >/dev/null 2>&1; then
      echo "Preview running at http://localhost:$p"
      os="$(uname 2>/dev/null || echo)"
      if [ "$os" = "Darwin" ]; then
        open "http://localhost:$p/blog"
        open "http://localhost:$p/blog/launching-the-lilos-growth-blog"
      else
        command -v xdg-open >/dev/null 2>&1 && xdg-open "http://localhost:$p/blog" || true
      fi
      wait "$pid"
      return 0
    fi
    sleep 0.25
  done
  kill "$pid" >/dev/null 2>&1 || true
  return 1
}

try_preview "$port" || try_preview "$altport" || { echo "Could not start preview on $port or $altport"; exit 1; }
