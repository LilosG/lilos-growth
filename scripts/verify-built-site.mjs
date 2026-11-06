import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const output = path.resolve("dist/client");

function read(relative) {
  const location = path.join(output, relative);
  assert.ok(fs.existsSync(location), `Missing generated file: ${relative}`);
  const value = fs.readFileSync(location, "utf8");
  assert.ok(value.trim().length > 0, `Empty generated file: ${relative}`);
  return value;
}

const renderedPages = fs.readdirSync(output, { recursive: true }).filter((filename) => String(filename).endsWith(".html"));
assert.ok(renderedPages.length >= 200, `Unexpectedly small static site: ${renderedPages.length} pages`);

// Verify indexable commercial routes and intentional non-indexable utility routes
// against the generated HTML, not just page-source configuration.
const inspectedRoutes = [
  { path: "/", file: "index.html" },
  { path: "/services", file: "services/index.html" },
  { path: "/services/local-seo", file: "services/local-seo/index.html" },
  { path: "/services/web-design", file: "services/web-design/index.html" },
  {
    path: "/services/google-business-profile-optimization",
    file: "services/google-business-profile-optimization/index.html",
  },
  {
    path: "/services/ai-search-optimization",
    file: "services/ai-search-optimization/index.html",
  },
  { path: "/google-business-profile-offer", file: "google-business-profile-offer/index.html" },
  { path: "/contact", file: "contact/index.html" },
  { path: "/industries", file: "industries/index.html" },
  { path: "/industries/plumbers", file: "industries/plumbers/index.html" },
  { path: "/locations", file: "locations/index.html" },
  { path: "/locations/san-diego", file: "locations/san-diego/index.html" },
  { path: "/locations/las-vegas", file: "locations/las-vegas/index.html" },
  { path: "/locations/las-vegas/web-design", file: "locations/las-vegas/web-design/index.html" },
  { path: "/thank-you", file: "thank-you/index.html", noindex: true },
];

const canonicalHost = "https://lilosgrowth.com";
for (const route of inspectedRoutes) {
  const html = read(route.file);
  const expectedCanonical = canonicalHost + (route.path === "/" ? "/" : route.path);
  const canonicals = [...html.matchAll(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi)];
  assert.equal(canonicals.length, 1, `Expected one canonical on ${route.path}`);
  const canonical = canonicals[0][0].match(/href=["']([^"']+)["']/i)?.[1];
  assert.equal(canonical, expectedCanonical, `Unexpected canonical on ${route.path}`);

  const robots = html.match(/<meta\s+[^>]*name=["']robots["'][^>]*>/i)?.[0] ?? "";
  const directives = robots.match(/content=["']([^"']+)["']/i)?.[1] ?? "";
  assert.ok(directives, `Missing robots directives on ${route.path}`);
  assert.match(
    directives,
    route.noindex ? /(?:^|[,\s])noindex(?:$|[,\s])/i : /(?:^|[,\s])index(?:$|[,\s])/i,
    `Unexpected indexability on ${route.path}`
  );

  const jsonLd = [...html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  assert.ok(jsonLd.length > 0, `Missing structured data on ${route.path}`);
  for (const [, raw] of jsonLd) {
    const schema = JSON.parse(raw);
    assert.ok(schema && typeof schema === "object", `Invalid JSON-LD on ${route.path}`);
  }
}

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
  routes: inspectedRoutes.length,
  feeds: 2,
  cssFiles: cssFiles.length,
});
