import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = (path) => readFileSync(path, "utf8");
const offerPath = "/google-business-profile-offer";
const entryPoints = [
  ["src/pages/index.astro", "cta_home_gbp_intro_offer"],
  ["src/pages/services/index.astro", "cta_services_gbp_intro_offer"],
  ["src/pages/contact.astro", "cta_contact_gbp_intro_offer"],
];

describe("Phase 5 GBP offer lead qualification and navigation", () => {
  it.each(entryPoints)("provides a real GBP offer entry point from %s", (path, event) => {
    const page = source(path);
    expect(page).toContain(`href="${offerPath}"`);
    expect(page).toContain(`data-evt="${event}"`);
  });

  it("does not replace general inquiries or booking CTAs", () => {
    const home = source("src/pages/index.astro");
    const services = source("src/pages/services/index.astro");
    const contact = source("src/pages/contact.astro");
    expect(home).toContain('href="/contact#book"');
    expect(services).toContain('href="/contact#book"');
    expect(contact).toContain('action="https://formspree.io/f/movlbqdk"');
    expect(contact).toContain("https://calendly.com/mprickett-bluedoorsp/30min");
  });

  it("keeps the offer one-time and for a single verified profile", () => {
    const offer = source("src/data/gbpIntroOffer.ts");
    const page = source("src/pages/google-business-profile-offer/index.astro");
    expect(offer).toContain("const price = 199");
    expect(offer).toContain("const managementDays = 30");
    expect(offer).toContain("profileCount: 1");
    expect(page).toContain("No automatic renewal");
    expect(page).toContain('action={formAction}');
    expect(page).not.toContain("gbp_offer_purchase_completed");
  });

  it("keeps service landing page metadata inclusive of local business types", () => {
    const services = source("src/pages/services/index.astro");
    expect(services).toContain("Local SEO, GBP & Website Services for Businesses");
    expect(services).toContain("Built for trades, hospitality, and other local businesses");
  });
});
