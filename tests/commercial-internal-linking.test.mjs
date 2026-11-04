import { describe, expect, it } from "vitest";
import { industries } from "../src/data/industries";
import { locations } from "../src/data/locations";
import {
  commercialServices,
  getLocationIndustryExamples,
  getRelatedIndustries,
} from "../src/data/commercialInternalLinks";
import { readFileSync } from "node:fs";

const source = (path) => readFileSync(path, "utf8");

describe("curated commercial internal linking", () => {
  const validIndustries = new Set(industries.map((item) => item.slug));

  it("links every industry to existing, distinct and relevant sibling routes", () => {
    for (const industry of industries) {
      const related = getRelatedIndustries(industry.slug);
      expect(related.length, industry.slug).toBeGreaterThan(0);
      expect(related.length, industry.slug).toBeLessThanOrEqual(3);
      expect(new Set(related.map((item) => item.slug)).size, industry.slug).toBe(related.length);
      for (const item of related) {
        expect(validIndustries.has(item.slug), item.slug).toBe(true);
        expect(item.slug, industry.slug).not.toBe(industry.slug);
      }
    }
  });

  it("links each published location to actual industry pages", () => {
    for (const location of locations) {
      const related = getLocationIndustryExamples(location.slug);
      expect(related.length, location.slug).toBe(3);
      for (const item of related) expect(validIndustries.has(item.slug)).toBe(true);
    }
    expect(getLocationIndustryExamples("nonexistent-location")).toEqual([]);
  });

  it("keeps core service URLs explicit and unique", () => {
    expect(commercialServices.map((item) => item.href)).toEqual([
      "/services/local-seo",
      "/services/google-business-profile-optimization",
      "/services/web-design",
    ]);
  });

  it("connects the shared landing-page template and results page", () => {
    const landing = source("src/pages/[slug].astro");
    const results = source("src/pages/results.astro");
    expect(landing).toContain("getRelatedIndustries(industry!.slug)");
    expect(landing).toContain("getLocationIndustryExamples(location!.slug)");
    expect(landing).toContain('href="/results"');
    expect(results).toContain('href="/electrician-seo"');
    expect(results).toContain('href="/pest-control-seo"');
  });
});
