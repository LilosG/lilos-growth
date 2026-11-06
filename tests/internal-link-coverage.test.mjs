import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const output = path.resolve("dist/client");
const built = fs.existsSync(output);
const MIN_INBOUND_LINKS = 3;

const routeOf = (file) => {
  const route = "/" + file.replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "");
  return route === "/" ? route : route.replace(/\/$/, "");
};

const normalize = (href) => {
  const local = href.replace(/^https:\/\/lilosgrowth\.com/, "");
  if (!local.startsWith("/") || local.startsWith("//")) return null;
  return local.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
};

function collectLinks() {
  const files = fs
    .readdirSync(output, { recursive: true })
    .map(String)
    .filter((file) => file.endsWith(".html"));
  const inbound = new Map();
  const mainLinks = [];
  const routes = new Set();
  for (const file of files) {
    const source = routeOf(file);
    routes.add(source);
    const html = fs.readFileSync(path.join(output, file), "utf8");
    // Count in-content links only: header and footer sit outside <main>.
    const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
    for (const match of main.matchAll(/<a\s[^>]*?href="([^"]+)"/g)) {
      const target = normalize(match[1]);
      if (!target) continue;
      mainLinks.push({
        source,
        target,
        raw: match[1]
          .replace(/^https:\/\/lilosgrowth\.com/, "")
          .split("#")[0]
          .split("?")[0],
      });
      if (target === source) continue;
      if (!inbound.has(target)) inbound.set(target, new Set());
      inbound.get(target).add(source);
    }
  }
  return { inbound, mainLinks, routes };
}

// Needs the build output; run `npm run build` first.
describe.skipIf(!built)("internal link coverage (built site)", () => {
  const { inbound, mainLinks, routes } = built
    ? collectLinks()
    : { inbound: new Map(), mainLinks: [], routes: new Set() };

  const guarded =
    /^\/(services\/[^/]+|locations|locations\/[^/]+|locations\/[^/]+\/[^/]+|industries|industries\/[^/]+)$/;

  it("gives every service, location and industry page at least 3 in-content links from other pages", () => {
    const guardedRoutes = [...routes].filter((route) => guarded.test(route));
    expect(guardedRoutes.length).toBeGreaterThanOrEqual(35);
    const weak = guardedRoutes
      .map((route) => ({ route, count: inbound.get(route)?.size ?? 0 }))
      .filter(({ count }) => count < MIN_INBOUND_LINKS)
      .map(({ route, count }) => `${route} (${count})`);
    expect(weak, "pages with too few in-content inbound links").toEqual([]);
  });

  it("never links to a redirect source from page content", () => {
    const sources = new Set(
      JSON.parse(fs.readFileSync("vercel.json", "utf8"))
        .redirects.map((redirect) => redirect.source)
        .filter((source) => !source.includes(":"))
    );
    const bad = mainLinks
      // Compare the href exactly as written: trailing-slash rules only match slashed links.
      .filter(({ raw }) => sources.has(raw))
      .map(({ source, raw }) => `${source} -> ${raw}`);
    expect([...new Set(bad)]).toEqual([]);
  });
});
