import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const blogRoot = path.join(root, "src/content/blog");
const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
const retired = new Map(
  vercel.redirects
    .filter((entry) => /^\/blog\/[^/:*]+$/.test(entry.source) && entry.destination.startsWith("/blog/"))
    .map((entry) => [entry.source, entry.destination])
);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const file = path.join(dir, item.name);
    return item.isDirectory() ? walk(file) : item.isFile() ? [file] : [];
  });
}

const blogFiles = walk(blogRoot).filter((p) => /\.(?:md|mdx)$/.test(p) && !path.basename(p).startsWith("_"));
const liveSlugs = new Set();
for (const file of blogFiles) {
  const relative = path.relative(blogRoot, file).replaceAll(path.sep, "/").replace(/\.(md|mdx)$/, "");
  const front = matter(fs.readFileSync(file, "utf8")).data;
  liveSlugs.add((typeof front.slug === "string" && front.slug.trim() ? front.slug : relative.replace(/\/index$/, "")).replace(/^\/+|\/+$/g, ""));
}

const paths = [...blogFiles, ...walk(path.join(root, "src/pages")).filter((p) => /\.(?:astro|md|mdx)$/.test(p))];
const issues = [];
for (const file of paths) {
  const source = fs.readFileSync(file, "utf8");
  // Only inspect literal Markdown targets and quoted HTML/JSX hrefs; ignore dynamic links.
  const patterns = [
    /\]\(\s*(\/blog\/[^\s)#?]+)(?:[?#][^\s)]*)?\s*\)/g,
    /\bhref\s*=\s*["'](\/blog\/[^"'?#\s]+)(?:[?#][^"']*)?["']/g,
  ];
  const matches = new Set();
  for (const regex of patterns) {
    for (const match of source.matchAll(regex)) matches.add(match[1].replace(/\/$/, ""));
  }
  for (const link of matches) {
    if (link === "/blog") continue;
    const slug = decodeURIComponent(link.slice("/blog/".length));
    if (retired.has(link)) {
      issues.push({ file: path.relative(root, file), link, problem: "retired URL", directTarget: retired.get(link) });
    } else if (!liveSlugs.has(slug)) {
      issues.push({ file: path.relative(root, file), link, problem: "no matching blog entry" });
    }
  }
}

if (issues.length) {
  console.error(JSON.stringify({ scannedFiles: paths.length, issueCount: issues.length, issues }, null, 2));
  process.exitCode = 1;
} else {
  console.log(`Blog link audit passed: ${paths.length} files scanned, ${liveSlugs.size} active article slugs, ${retired.size} consolidation redirects checked.`);
}
