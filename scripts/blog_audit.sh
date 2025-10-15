set -e
report=".reports/blog_audit_$(date +%Y%m%d_%H%M%S).txt"
echo "Blog Audit Start" > "$report"
echo "Datetime: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$report"
echo "Node: $(node -v)" >> "$report"
echo "NPM: $(npm -v)" >> "$report"
echo "Astro: $(npx astro --version || true)" >> "$report"
echo "" >> "$report"
echo "package.json" >> "$report"
if [ -f package.json ]; then cat package.json >> "$report"; fi
echo "" >> "$report"
echo "astro.config.*" >> "$report"
if [ -f astro.config.mjs ]; then cat astro.config.mjs >> "$report"; fi
if [ -f astro.config.ts ]; then cat astro.config.ts >> "$report"; fi
echo "" >> "$report"
echo "Tailwind config" >> "$report"
if [ -f tailwind.config.cjs ]; then cat tailwind.config.cjs >> "$report"; fi
if [ -f tailwind.config.js ]; then cat tailwind.config.js >> "$report"; fi
if [ -f tailwind.config.ts ]; then cat tailwind.config.ts >> "$report"; fi
echo "" >> "$report"
echo "PostCSS config" >> "$report"
if [ -f postcss.config.cjs ]; then cat postcss.config.cjs >> "$report"; fi
if [ -f postcss.config.js ]; then cat postcss.config.js >> "$report"; fi
if [ -f postcss.config.ts ]; then cat postcss.config.ts >> "$report"; fi
echo "" >> "$report"
echo "Existing blog routes under src/pages/blog" >> "$report"
if [ -d src/pages/blog ]; then find src/pages/blog -maxdepth 5 -type f | sort >> "$report"; fi
echo "" >> "$report"
echo "Legacy flat archive routes check" >> "$report"
if [ -d src/pages/blog ]; then find src/pages/blog -maxdepth 2 -type f -name "[...page].astro" | sort >> "$report"; fi
echo "" >> "$report"
echo "Nested archive routes check" >> "$report"
if [ -d src/pages/blog/category ]; then find src/pages/blog/category -maxdepth 5 -type f | sort >> "$report"; fi
if [ -d src/pages/blog/tag ]; then find src/pages/blog/tag -maxdepth 5 -type f | sort >> "$report"; fi
echo "" >> "$report"
echo "Content collections config" >> "$report"
if [ -f src/content/config.ts ]; then cat src/content/config.ts >> "$report"; fi
echo "" >> "$report"
echo "Content directories probe" >> "$report"
if [ -d src/content/blog ]; then find src/content/blog -maxdepth 2 -type f | sort >> "$report"; fi
if [ -d src/data/post ]; then find src/data/post -maxdepth 2 -type f | sort >> "$report"; fi
echo "" >> "$report"
echo "Helpers and layouts probe" >> "$report"
if [ -f src/lib/sorters.ts ]; then echo "lib/sorters.ts present" >> "$report"; fi
if [ -f src/lib/seo.ts ]; then echo "lib/seo.ts present" >> "$report"; fi
if [ -f src/layouts/PageLayout.astro ]; then echo "layouts/PageLayout.astro present" >> "$report"; fi
if [ -f src/layouts/BlogPost.astro ]; then echo "layouts/BlogPost.astro present" >> "$report"; fi
if [ -f src/components/BlogCard.astro ]; then echo "components/BlogCard.astro present" >> "$report"; fi
if [ -f src/components/Breadcrumbs.astro ]; then echo "components/Breadcrumbs.astro present" >> "$report"; fi
if [ -f src/components/RelatedPosts.astro ]; then echo "components/RelatedPosts.astro present" >> "$report"; fi
if [ -f src/components/TagPill.astro ]; then echo "components/TagPill.astro present" >> "$report"; fi
echo "" >> "$report"
echo "Sitemap and robots probe" >> "$report"
if [ -f public/robots.txt ]; then echo "public/robots.txt present" >> "$report"; fi
if [ -f src/pages/sitemap.xml.ts ]; then echo "src/pages/sitemap.xml.ts present" >> "$report"; fi
echo "" >> "$report"
echo "Draft flag probe" >> "$report"
grep -RIn "LOCAL_DRAFTS" || true >> "$report"
echo "" >> "$report"
echo "Build checks" >> "$report"
rm -rf .astro dist || true
npx astro check >> "$report" || echo "astro check reported issues" >> "$report"
npm run -s build >> "$report" || echo "npm run build failed" >> "$report"
echo "" >> "$report"
echo "RSS probe" >> "$report"
if [ -f src/pages/blog/rss.xml.ts ]; then echo "src/pages/blog/rss.xml.ts present" >> "$report"; fi
echo "" >> "$report"
echo "Blog Audit Complete" >> "$report"
echo "$report"
