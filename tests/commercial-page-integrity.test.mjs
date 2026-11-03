import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/pages");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const targets = [
  "services/local-seo/index.astro",
  "services/google-business-profile-optimization/index.astro",
  "services/web-design/index.astro",
];

describe("commercial-page integrity", () => {
  it("routes service conversion CTAs to the existing contact booking section", () => {
    const contact = read("contact.astro");
    expect(contact).toContain('id="book"');
    for (const page of targets) {
      const text = read(page);
      expect(text).not.toContain('href="#contact"');
      expect(text).toContain("/contact#book");
    }
  });

  it("does not hide standalone SEO setup-month pricing", () => {
    const page = read("services/local-seo/index.astro");
    expect(page).toContain("tier.setupPrice.toLocaleString()");
    expect(page).not.toMatch(/No setup fees/i);
    expect(page).toContain("GBP management isn't included at these prices");
  });

  it("renders cross-service prices from the shared package source", () => {
    const page = read("services/google-business-profile-optimization/index.astro");
    expect(page).toContain("seoTiers[0].price.toLocaleString()");
    expect(page).toContain("packages[0].price.toLocaleString()");
    expect(page).toContain("websiteBuilds[0].price.toLocaleString()");
    expect(page).not.toMatch(/From \$399|From \$599/);
  });

  it("keeps FAQ structured data generated from the same visible FAQ entries", () => {
    for (const page of targets.slice(0, 2)) {
      const text = read(page);
      expect(text).toContain("mainEntity: faqs.map((faq)");
    }
  });

  it("links the website hero pricing action to its actual pricing section", () => {
    const page = read("services/web-design/index.astro");
    expect(page).toContain('id="pricing"');
    expect(page).not.toContain('href="#packages"');
  });
});
