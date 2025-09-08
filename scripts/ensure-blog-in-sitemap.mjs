import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://lilosgrowth.com';
const dist = 'dist';
const blogDir = path.join(dist, 'blog');

if (!fs.existsSync(blogDir)) {
  console.log('No dist/blog found; skipping.');
  process.exit(0);
}

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile() && e.name === 'index.html') out.push(full);
  }
  return out;
}

const files = walk(blogDir);
const urls = files.map((f) => {
  const rel = '/' + path.posix.relative(dist, path.dirname(f)).replace(/\\/g, '/');
  return SITE + rel;
});

const urlset = urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap-blog.xml'), xml, 'utf8');

const indexPath = path.join(dist, 'sitemap-index.xml');
let index = fs.readFileSync(indexPath, 'utf8');
const loc = `${SITE}/sitemap-blog.xml`;
if (!index.includes(loc)) {
  const insert = `<sitemap><loc>${loc}</loc></sitemap>`;
  index = index.replace('</sitemapindex>', `${insert}\n</sitemapindex>`);
  fs.writeFileSync(indexPath, index, 'utf8');
}
console.log(`✅ Wrote ${urls.length} blog URLs to sitemap-blog.xml and linked from sitemap-index.xml`);
