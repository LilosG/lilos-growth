import fs from "node:fs";
import path from "node:path";

const REPLACEMENTS = [
  // services/websites -> services/web-design
  { from: "https://lilosgrowth.com/services/websites", to: "/services/web-design" },
  { from: "/services/websites", to: "/services/web-design" },

  // old /work/* case study URLs -> /results
  { from: "https://lilosgrowth.com/work/tamarack", to: "/results" },
  { from: "/work/tamarack", to: "/results" },
  { from: "https://lilosgrowth.com/work/blue-door", to: "/results" },
  { from: "/work/blue-door", to: "/results" },
  { from: "https://lilosgrowth.com/work/carlsbad-home-services", to: "/results" },
  { from: "/work/carlsbad-home-services", to: "/results" },

  // old SEO audit tool URL -> tools hub
  { from: "https://lilosgrowth.com/local-seo-tools/seo-audit/", to: "/local-seo-tools" },
  { from: "/local-seo-tools/seo-audit/", to: "/local-seo-tools" },

  // tag pagination URL -> non-paginated tag
  { from: "https://lilosgrowth.com/blog/tag/local-seo/2", to: "/blog/tag/local-seo" },
  { from: "/blog/tag/local-seo/2", to: "/blog/tag/local-seo" },
];

const ALLOWED_EXTS = new Set([
  ".astro",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".md",
  ".mdx",
  ".json",
  ".html",
]);

const IGNORED_DIRS = new Set(["node_modules", "dist", ".git", ".vercel", ".github", ".vscode"]);

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  return ALLOWED_EXTS.has(ext);
}

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      walk(fullPath, files);
    } else {
      if (shouldProcessFile(fullPath)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

function applyReplacements(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const { from, to } of REPLACEMENTS) {
    if (content.includes(from)) {
      const newContent = content.split(from).join(to);
      if (newContent !== content) {
        content = newContent;
        changed = true;
        console.log(`  • ${path.relative(process.cwd(), filePath)}: '${from}' -> '${to}'`);
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
}

console.log("Fixing internal links for Ahrefs 404s...");
const allFiles = walk(process.cwd(), []);
for (const file of allFiles) {
  applyReplacements(file);
}
console.log("Done fixing internal links.");
