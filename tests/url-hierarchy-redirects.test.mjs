import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { industries } from "../src/data/industries";
import { locations } from "../src/data/locations";
import { metroServices } from "../src/data/metroServices";
import { industryPath, locationPath } from "../src/lib/routes";

const redirects = JSON.parse(readFileSync("vercel.json", "utf8")).redirects;

const expected = [
  ...locations.map((item) => ({ from: item.legacyPath, to: locationPath(item.slug) })),
  ...metroServices.map((item) => ({ from: item.legacyPath, to: item.path })),
  ...industries.map((item) => ({ from: item.legacyPath, to: industryPath(item.slug) })),
];

describe("hierarchical URL redirects", () => {
  it("covers every page with a legacyPath", () => {
    expect(expected).toHaveLength(6 + 12 + 11);
  });

  it("has exactly one permanent redirect from each legacyPath to its new path", () => {
    for (const { from, to } of expected) {
      const matches = redirects.filter((redirect) => redirect.source === from);
      expect(matches, from).toHaveLength(1);
      expect(matches[0].destination, from).toBe(to);
      expect(matches[0].permanent, from).toBe(true);
    }
  });

  it("never redirects to a URL that is itself a redirect source", () => {
    const sources = new Set(redirects.map((redirect) => redirect.source));
    for (const redirect of redirects) {
      expect(
        sources.has(redirect.destination),
        `${redirect.source} -> ${redirect.destination}`
      ).toBe(false);
    }
  });

  it("keeps new paths hierarchical, lowercase, and without trailing slashes", () => {
    for (const { to } of expected) {
      expect(to).toMatch(/^\/(locations|industries)\/[a-z0-9-]+(\/[a-z0-9-]+)?$/);
    }
  });
});
