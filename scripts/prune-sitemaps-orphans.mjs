import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://lilosgrowth.com";

// Paths we want to REMOVE from any sitemap XMLs
const ORPHAN_PATHS = [
  "/offers/local-seo/",
  "/offers/local-seo-locked/",
  "/privacy/",
  "/cards-preview/",
  "/plans-preview/",
];

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pruneFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  for (const p of ORPHAN_PATHS) {
    const urlWithSlash = `${BASE_URL}${p}`;
    const urlNoSlash = urlWithSlash.replace(/\/$/, "");

    for (const loc of [urlWithSlash, urlNoSlash]) {
      const pattern = new RegExp(
        `<url>\\s*<loc>${escapeRegExp(loc)}<\\/loc>[\\s\\S]*?<\\/url>\\s*`,
        "g"
      );
      content = content.replace(pattern, "");
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log("  • Pruned orphan URLs from", path.relative(process.cwd(), filePath));
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name.endsWith(".xml")) {
      pruneFile(fullPath);
    }
  }
}

const distDir = path.join(process.cwd(), "dist");
if (!fs.existsSync(distDir)) {
  console.warn("dist/ not found, skipping sitemap pruning.");
  process.exit(0);
}

console.log("Pruning orphan-like URLs from sitemap XMLs...");
walk(distDir);
console.log("Finished pruning sitemaps.");
