import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";

const blogDir = path.resolve("src/content/blog");
const pagesDir = path.resolve("src/pages");
const configPath = path.resolve("src/config.yaml");
const robotsPath = path.resolve("public/robots.txt");
const rssPath = path.resolve("src/pages/rss.xml.ts");
const blogRssPath = path.resolve("src/pages/blog/rss.xml.ts");
const errors = [];
const warnings = [];

const walk = (dir, matcher) => {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full, matcher));
    } else if (entry.isFile() && matcher(entry.name)) {
      files.push(full);
    }
  }
  return files;
};

const read = (p) => fs.readFileSync(p, "utf8");

const blogFiles = walk(blogDir, (name) => /\.(md|mdx)$/i.test(name));
if (blogFiles.length === 0) {
  warnings.push("No blog content files found under src/content/blog.");
}

for (const file of blogFiles) {
  const raw = read(file);
  const { data } = matter(raw);
  const rel = path.relative(process.cwd(), file);

  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description = typeof data.description === "string" ? data.description.trim() : "";

  if (!title) errors.push(`${rel}: missing title`);
  if (!description) errors.push(`${rel}: missing description`);
  if (description.length > 155) warnings.push(`${rel}: description > 155 chars`);

  if (data.canonical && typeof data.canonical !== "string") {
    errors.push(`${rel}: canonical must be a string`);
  }
}

const pageFiles = walk(pagesDir, (name) => name.endsWith(".astro"));
for (const file of pageFiles) {
  const raw = read(file);
  const rel = path.relative(process.cwd(), file);
  const hasTitleProp = /title=/.test(raw) || /\{\s*title\s*\}/.test(raw);
  const hasMetadataProp = /metadata=/.test(raw);
  const hasExportedTitle = /export\s+const\s+title\s*=/.test(raw);
  const hasExportedDescription = /export\s+const\s+description\s*=/.test(raw);
  if (!hasTitleProp && !hasMetadataProp && !hasExportedTitle && !hasExportedDescription) {
    warnings.push(`${rel}: no explicit title/metadata prop`);
  }
}

if (!fs.existsSync(rssPath)) {
  warnings.push("Missing RSS route: src/pages/rss.xml.ts");
}
if (!fs.existsSync(blogRssPath)) {
  warnings.push("Missing blog RSS route: src/pages/blog/rss.xml.ts");
}

if (fs.existsSync(configPath)) {
  const configRaw = read(configPath);
  const config = yaml.load(configRaw);
  const siteUrl = config?.site?.site;
  const ogImages = config?.metadata?.openGraph?.images || [];

  if (!siteUrl || typeof siteUrl !== "string") {
    errors.push("src/config.yaml: missing site.site URL");
  }

  if (!fs.existsSync(robotsPath)) {
    errors.push("public/robots.txt is missing");
  } else {
    const robots = read(robotsPath);
    if (!/Sitemap:/i.test(robots)) {
      warnings.push("public/robots.txt: missing Sitemap line");
    }
    if (siteUrl && typeof siteUrl === "string") {
      const expected = `${siteUrl.replace(/\/$/, "")}/sitemap-index.xml`;
      if (!robots.includes(expected)) {
        warnings.push(`public/robots.txt: sitemap URL does not match ${expected}`);
      }
    }
  }

  if (Array.isArray(ogImages) && ogImages.length > 0) {
    const first = ogImages[0];
    const ogUrl = typeof first?.url === "string" ? first.url : "";
    if (ogUrl && siteUrl && ogUrl.startsWith(siteUrl)) {
      const relPath = ogUrl.replace(siteUrl.replace(/\/$/, ""), "");
      const candidate = path.resolve("public", relPath.replace(/^\//, ""));
      if (!fs.existsSync(candidate)) {
        warnings.push(`OpenGraph image not found at ${candidate}`);
      }
    }
  }
}

if (errors.length) {
  console.error("SEO validation failed:");
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

if (warnings.length) {
  console.warn("SEO validation warnings:");
  for (const warn of warnings) console.warn(`- ${warn}`);
}
