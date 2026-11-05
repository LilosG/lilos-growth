import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const page = readFileSync("src/pages/google-business-profile-offer/index.astro", "utf8");
const offerData = readFileSync("src/data/gbpIntroOffer.ts", "utf8");

describe("GBP offer inquiry funnel refinement", () => {
  it("makes the inquiry-first path prominent and explicitly distinguishes payment", () => {
    expect(page).toContain('const ctaHref = checkoutUrl ?? "#request"');
    expect(page).toContain("Request my profile tune-up");
    expect(page).toContain("Request my eligibility review");
    expect(page).toContain("No payment today.");
    expect(page).toContain("before requesting payment.");
    expect(page).toContain("No payment is collected here.");
    expect(page.indexOf('data-offer-cta={checkoutUrl ? "checkout" : "hero"}')).toBeLessThan(
      page.indexOf('aria-label="Included services"')
    );
  });

  it("provides a second accessible path from eligibility to the same form", () => {
    expect(page).toContain('data-offer-cta={checkoutUrl ? "checkout" : "eligibility"}');
    expect(page).toContain('id="request"');
    expect(page).toContain('class="scroll-mt-20');
    expect(page).toContain('href="/contact#book"');
  });

  it("keeps shared pricing, consent-aware events, Formspree and no auto-renewal", () => {
    expect(offerData).toContain("const price = 199");
    expect(offerData).toContain("const managementDays = 30");
    expect(offerData).toContain("profileCount: 1");
    expect(page).toContain("action={formAction}");
    expect(page).toContain('id="gbp-offer-form"');
    expect(page).toContain('id="offer-form-status"');
    expect(page).toContain('id="offer-form-success"');
    expect(page).toContain("gbp_offer_inquiry_submitted");
    expect(page).toContain("gbp_offer_checkout_started");
    expect(page).not.toContain("gbp_offer_purchase_completed");
    expect(page).toContain("No automatic renewal");
  });
});
