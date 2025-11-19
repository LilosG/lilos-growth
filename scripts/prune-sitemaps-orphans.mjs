import fs from "node:fs";
import path from "node:path";

function loadXml(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

function parseUrlBlocks(xml) {
  const blocks = [];
  const re = /<url>[\s\S]*?<\/url>/g;
  let match;
  while ((match = re.exec(xml)) !== null) {
    const block = match[0];
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) continue;
    const loc = locMatch[1].trim();
    blocks.push({ loc, block });
  }
  return blocks;
}

function removeBlocks(xml, predicate) {
  const blocks = parseUrlBlocks(xml);
  let updated = xml;
  let removed = 0;

  for (const { loc, block } of blocks) {
    if (predicate(loc)) {
      updated = updated.replace(block, "");
      removed++;
    }
  }

  if (removed > 0) {
    // Clean up excess blank lines
    updated = updated.replace(/\n{3,}/g, "\n\n");
  }

  return { xml: updated, removed };
}

const distDir = "dist";
const mainPath = path.join(distDir, "sitemap-0.xml");
const blogPath = path.join(distDir, "sitemap-blog.xml");

console.log("Pruning sitemap duplicates / low-priority URLs...");

const mainXml = loadXml(mainPath);
if (!mainXml) {
  console.log("  • No sitemap-0.xml found, nothing to do.");
  process.exit(0);
}

const blogXml = loadXml(blogPath);
let updatedMain = mainXml;
let totalRemoved = 0;

// 1) Remove URLs that also appear in sitemap-blog.xml (blog posts)
if (blogXml) {
  const blogUrls = new Set(
    parseUrlBlocks(blogXml)
      .map((u) => u.loc.trim())
      .filter((loc) => loc.includes("/blog/"))
  );

  if (blogUrls.size > 0) {
    const result = removeBlocks(updatedMain, (loc) => blogUrls.has(loc.trim()));
    updatedMain = result.xml;
    totalRemoved += result.removed;
    console.log(
      `  • Removed ${result.removed} URL(s) from sitemap-0.xml that also appear in sitemap-blog.xml.`
    );
  } else {
    console.log("  • No blog URLs found in sitemap-blog.xml, skipping dedupe.");
  }
} else {
  console.log("  • sitemap-blog.xml not found, skipping blog URL dedupe.");
}

// 2) Drop a few low-priority / orphan-y utility URLs from sitemap-0.xml
const dropList = new Set([
  "https://lilosgrowth.com/offers/local-seo-locked",
  "https://lilosgrowth.com/privacy",
  "https://lilosgrowth.com/cards-preview",
  "https://lilosgrowth.com/plans-preview",
]);

const dropResult = removeBlocks(updatedMain, (loc) => {
  const norm = loc.trim().replace(/\/$/, "");
  return dropList.has(norm);
});

updatedMain = dropResult.xml;
totalRemoved += dropResult.removed;
if (dropResult.removed > 0) {
  console.log(`  • Removed ${dropResult.removed} low-priority URL(s) from sitemap-0.xml.`);
}

if (totalRemoved > 0) {
  fs.writeFileSync(mainPath, updatedMain.trim() + "\n");
  console.log(`Finished. Total URLs removed from sitemap-0.xml: ${totalRemoved}.`);
} else {
  console.log("  • No changes needed to sitemap-0.xml.");
}
