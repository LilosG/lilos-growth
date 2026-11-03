import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const output = path.resolve("dist");

function read(relative) {
  const location = path.join(output, relative);
  assert.ok(fs.existsSync(location), `Missing generated file: ${relative}`);
  const value = fs.readFileSync(location, "utf8");
  assert.ok(value.trim().length > 0, `Empty generated file: ${relative}`);
  return value;
}

const renderedPages = fs.readdirSync(output, { recursive: true }).filter((filename) => String(filename).endsWith(".html"));
assert.ok(renderedPages.length >= 200, `Unexpectedly small static site: ${renderedPages.length} pages`);

const homepage = read("index.html");
const blogIndex = read("blog/index.html");
const article = read("blog/top-local-seo-agencies-roofers-san-diego-local-guide/index.html");
const rss = read("rss.xml");
const sitemap = read("sitemap-index.xml");

for (const [name, html] of [
  ["home", homepage],
  ["blog", blogIndex],
  ["article", article],
]) {
  for (const key of ["<title>", 'name="description"', 'rel="canonical"', 'property="og:title"', 'name="twitter:card"']) {
    assert.ok(html.includes(key), `Missing ${key} in ${name} HTML`);
  }
  assert.ok(html.includes("lilosgrowth.com"), `Missing first-party canonical host in ${name}`);
}

assert.match(article, /application\/ld\+json/, "Article structured data is missing");
assert.match(rss, /<rss\b/, "Invalid RSS root");
assert.match(sitemap, /<sitemapindex\b/, "Invalid sitemap index");

const styles = path.join(output, "_astro");
const cssFiles = fs
  .readdirSync(styles)
  .filter((name) => name.endsWith(".css") && fs.statSync(path.join(styles, name)).size > 30_000);

assert.ok(cssFiles.length > 0, "Missing substantial compiled Tailwind CSS");
const compiled = cssFiles.map((name) => fs.readFileSync(path.join(styles, name), "utf8")).join("");
assert.ok(compiled.includes(".bg-primary"), "Tailwind theme utilities did not compile");

console.log("Built-site smoke validation passed:", {
  routes: 3,
  feeds: 2,
  cssFiles: cssFiles.length,
});
