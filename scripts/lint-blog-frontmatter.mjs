import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join("src", "content", "blog");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function fileSlug(file) {
  const rel = path.relative(BLOG_DIR, file).replace(/\\/g, "/");
  return rel.replace(/(\/index)?\.(md|mdx)$/i, "");
}

const issues = [];

function addIssue(file, code, msg) {
  const rel = path.relative(process.cwd(), file).replace(/\\/g, "/");
  issues.push({ file: rel, code, msg });
}

console.log("=== LILOS BLOG FRONTMATTER LINT ===");
if (!fs.existsSync(BLOG_DIR)) {
  console.log("No src/content/blog directory found.");
  process.exit(0);
}

const files = walk(BLOG_DIR).filter((f) => !path.basename(f).startsWith("_"));

console.log(`Scanning ${files.length} blog file(s)...\n`);

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);

  const title = data.title;
  const description = data.description;
  const slug = data.slug;
  const img = data.image;
  const imageAlt =
    typeof data.imageAlt === "string" && data.imageAlt.trim()
      ? data.imageAlt.trim()
      : img && typeof img === "object" && typeof img.alt === "string"
        ? img.alt.trim()
        : "";

  // Title
  if (typeof title !== "string" || !title.trim()) {
    addIssue(file, "TITLE_MISSING", "title missing or empty.");
  }

  // Description (keep snippet-friendly)
  if (typeof description !== "string" || !description.trim()) {
    addIssue(file, "DESCRIPTION_MISSING", "description missing or empty.");
  } else if (description.length > 155) {
    addIssue(
      file,
      "DESCRIPTION_TOO_LONG",
      `description is ${description.length} chars (max ~155).`
    );
  }

  // Slug vs file path
  const expectedSlug = fileSlug(file);
  if (typeof slug !== "string" || !slug.trim()) {
    addIssue(file, "SLUG_MISSING", "slug missing or empty.");
  } else if (slug !== expectedSlug) {
    addIssue(file, "SLUG_MISMATCH", `slug "${slug}" does not match file slug "${expectedSlug}".`);
  }

  // Image + path
  let imagePath = null;
  if (typeof img === "string") imagePath = img;
  else if (img && typeof img === "object" && typeof img.src === "string") imagePath = img.src;

  if (!imagePath) {
    addIssue(file, "IMAGE_MISSING", "image is missing.");
  } else if (!imagePath.startsWith("/images/blog/")) {
    addIssue(
      file,
      "IMAGE_PATH_UNEXPECTED",
      `image path "${imagePath}" should start with "/images/blog/".`
    );
  }

  // Alt text
  if (!imageAlt) {
    addIssue(file, "IMAGE_ALT_MISSING", "No alt text: set imageAlt or image.alt.");
  }
}

if (!issues.length) {
  console.log("No frontmatter issues found. ✅");
  console.log("\n=== END FRONTMATTER LINT ===");
  process.exit(0);
}

const byFile = new Map();
for (const issue of issues) {
  if (!byFile.has(issue.file)) byFile.set(issue.file, []);
  byFile.get(issue.file).push(issue);
}

for (const [file, list] of byFile.entries()) {
  console.log("\n# " + file);
  for (const { code, msg } of list) {
    console.log(`- [${code}] ${msg}`);
  }
}

console.log("\n=== END FRONTMATTER LINT ===");
process.exit(1);
