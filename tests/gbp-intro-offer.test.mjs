import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

describe("GBP introductory offer integrity", () => {
  it("keeps the offer distinct from ongoing management pricing", () => {
    const offer = read("src/data/gbpIntroOffer.ts");
    const packages = read("src/data/packages.ts");
    expect(offer).toContain("const price = 199");
    expect(offer).toContain("const managementDays = 30");
    expect(offer).toContain("const continuationMonthlyPrice = 300");
    expect(packages).toContain('name: "GBP Management"');
    expect(packages).toContain("price: 300");
  });

  it("never treats a Formspree inquiry as a payment", () => {
    const page = read("src/pages/google-business-profile-offer/index.astro");
    expect(page).toContain("const checkoutUrl = getGbpCheckoutUrl");
    expect(page).toContain("gbp_offer_inquiry_submitted");
    expect(page).toContain("gbp_offer_checkout_started");
    expect(page).not.toContain("gbp_offer_purchase_completed");
    expect(page).toContain("No automatic renewal");
  });

  it("preserves direct contact conversion and linked landing page", () => {
    const page = read("src/pages/google-business-profile-offer/index.astro");
    const gbp = read("src/pages/services/google-business-profile-optimization/index.astro");
    const layout = read("src/layouts/PageLayout.astro");
    expect(page).toContain("https://formspree.io/f/movlbqdk");
    expect(gbp).toContain('href="/google-business-profile-offer"');
    expect(layout).toContain('headerVariant === "focused"');
  });

  it("retains all historical redirects and adds canonical offer redirect", () => {
    const cfg = JSON.parse(read("vercel.json"));
    expect(cfg.redirects).toContainEqual({
      source: "/google-business-profile-offer/",
      destination: "/google-business-profile-offer",
      permanent: true,
    });
    expect(cfg.redirects.some((rule) => rule.source.includes("roofing"))).toBe(true);
  });
});
