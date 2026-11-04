import { describe, expect, it } from "vitest";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");

describe("commercial credibility and conversion paths", () => {
  it("avoids unsourced portfolio-wide statistics on the results page", () => {
    const page = read("src/pages/results.astro");
    expect(page).toContain("const measurementPillars =");
    expect(page).toContain("Individual project outcomes are not guarantees");
    expect(page).not.toContain("const agencyStats =");
    expect(page).not.toContain('label: "Client retention"');
    expect(page).not.toContain('label: "Avg lead increase"');
  });

  it("keeps individual case studies while clarifying that figures are client-specific", () => {
    const page = read("src/pages/results.astro");
    expect(page).toContain("resultsCaseStudies");
    expect(page).toContain("featuredStudy.kpis");
    expect(page).toContain("Selected Business Profile reports and interaction snapshots");
  });

  it("uses consistent response expectations and discloses inquiry privacy", () => {
    const contact = read("src/pages/contact.astro");
    const thankYou = read("src/pages/thank-you.astro");
    expect(contact).toContain("1 business day");
    expect(thankYou).toContain("1 business day");
    expect(contact).not.toContain("respond within 24 hours");
    expect(contact).not.toContain("Your info is always confidential.");
    expect(contact).toContain('href="/privacy"');
    expect(contact).toContain('action="https://formspree.io/f/movlbqdk"');
    expect(contact).toContain('value="https://lilosgrowth.com/thank-you"');
    expect(contact).toContain('id="book"');
  });

  it("does not promise a universal rankings timeline or claim seasonality is excluded", () => {
    const results = read("src/data/results.ts");
    expect(results).not.toContain("Local SEO momentum typically builds over 6–12 weeks");
    expect(results).not.toContain("it's not a seasonal artifact");
    expect(results).toContain("rather than promise a ranking or lead timeline");
  });
});
