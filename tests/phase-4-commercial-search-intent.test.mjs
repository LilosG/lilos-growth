import { describe, expect, it } from "vitest";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const gbp = () => read("src/pages/services/google-business-profile-optimization/index.astro");
const seo = () => read("src/pages/services/local-seo/index.astro");

describe("Phase 4 commercial search intent", () => {
  it("keeps service meta descriptions concise and differentiated", () => {
    for (const source of [gbp(), seo()]) {
      const match = source.match(/export const description =\s*\n\s*"([^"]+)"/);
      expect(match).not.toBeNull();
      expect(match[1].length).toBeLessThanOrEqual(160);
    }
    expect(gbp()).toContain("Google Business Profile optimization and management");
    expect(seo()).toContain("Local SEO services for trades");
  });

  it("explains GBP one-time vs ongoing purchase paths without changing pricing", () => {
    const page = gbp();
    expect(page).toContain("GBP Optimization vs. Ongoing Management");
    expect(page).toContain('href="/google-business-profile-offer"');
    expect(page).toContain("Our $199 introductory offer");
    expect(page).toContain("It does not renew automatically.");
    expect(page).toContain('href="#gbp-package"');
    expect(page).toContain("{gbpManagement.price}");
    expect(page).toContain('locationPath("san-diego")');
  });

  it("avoids universal timelines and keeps displayed FAQ and schema unified", () => {
    for (const source of [gbp(), seo()]) {
      expect(source).toContain("mainEntity: faqs.map((faq)");
      expect(source).not.toContain("Most see measurable gains in 30–60 days");
      expect(source).not.toContain("Most clients see measurable gains in 30–60 days");
      expect(source).toContain('href="/contact#book"');
    }
  });
});
