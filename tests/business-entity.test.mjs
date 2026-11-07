import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { business } from "../src/data/business";

const output = path.resolve("dist/client");
const ORG_ID = "https://lilosgrowth.com/#org";

// Utility pages that intentionally carry no site chrome or schema: the Decap CMS admin
// (noindex) and the static offline fallback copied from public/.
const UTILITY_PAGES = new Set(["decapcms/index.html", "offline/index.html"]);

const pages = fs.existsSync(output)
  ? fs
      .readdirSync(output, { recursive: true })
      .map(String)
      .filter((file) => file.endsWith(".html") && !UTILITY_PAGES.has(file))
      .map((file) => ({ file, html: fs.readFileSync(path.join(output, file), "utf8") }))
  : [];

const jsonLd = (html) =>
  [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1])
  );

// Needs the build output; run `npm run build` first.
describe.skipIf(pages.length === 0)("business entity (built site)", () => {
  it("emits exactly one #org JSON-LD node on every page", () => {
    const bad = pages
      .map(({ file, html }) => ({
        file,
        count: jsonLd(html).filter((node) => node["@id"] === ORG_ID).length,
      }))
      .filter(({ count }) => count !== 1)
      .map(({ file, count }) => `${file} (${count})`);
    expect(bad).toEqual([]);
  });

  it("has no #localbiz reference and no street address anywhere", () => {
    for (const needle of ["#localbiz", "1440 Columbia", "Suite 909"]) {
      const found = pages.filter(({ html }) => html.includes(needle)).map(({ file }) => file);
      expect(found, needle).toEqual([]);
    }
  });

  it("links the GBP and official profiles from the #org node", () => {
    const org = jsonLd(pages.find(({ file }) => file === "index.html").html).find(
      (node) => node["@id"] === ORG_ID
    );
    expect(org["@type"]).toBe("ProfessionalService");
    expect(org.hasMap).toBe(business.gbpUrl);
    expect(org.sameAs).toEqual(
      expect.arrayContaining([
        "https://www.google.com/maps?cid=10105481590020742186",
        "https://www.youtube.com/@lilos-growth",
        "https://www.facebook.com/profile.php?id=61583390743665",
      ])
    );
  });

  it("embeds the Google map on /contact", () => {
    const contact = pages.find(({ file }) => file === "contact/index.html").html;
    expect(contact).toMatch(/<iframe[^>]*src="https:\/\/www\.google\.com\/maps\/embed/);
  });
});

describe.skipIf(pages.length === 0)("areaServed place types (built site)", () => {
  const typeOf = (area) => area["@type"];

  it("types Orange County as AdministrativeArea in the #org node and the other markets as City", () => {
    const org = jsonLd(pages.find(({ file }) => file === "index.html").html).find(
      (node) => node["@id"] === ORG_ID
    );
    for (const area of org.areaServed) {
      expect(typeOf(area), area.name).toBe(
        area.name === "Orange County" ? "AdministrativeArea" : "City"
      );
      expect(area.containedInPlace["@type"]).toBe("State");
    }
    expect(org.areaServed.find((area) => area.name === "Orange County").containedInPlace.name).toBe(
      "California"
    );
  });

  it("uses the same typing on the Orange County hub and its metro-service pages", () => {
    for (const file of [
      "locations/orange-county/index.html",
      "locations/orange-county/web-design/index.html",
      "locations/orange-county/google-business-profile-optimization/index.html",
      "locations/phoenix/index.html",
    ]) {
      const service = jsonLd(pages.find((page) => page.file === file).html).find(
        (node) => node["@type"] === "Service"
      );
      expect(typeOf(service.areaServed), file).toBe(
        file.includes("orange-county") ? "AdministrativeArea" : "City"
      );
    }
  });
});
