import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const page = readFileSync("src/pages/google-business-profile-offer/index.astro", "utf8");

describe("GBP introductory offer landing page redesign", () => {
  it("qualifies visitors before the request form while keeping the existing offer route", () => {
    expect(page).toContain('id="offer-title"');
    expect(page).toContain('id="fit-title"');
    expect(page).toContain('id="included-title"');
    expect(page).toContain('id="request"');
    expect(page.indexOf('id="fit-title"')).toBeLessThan(page.indexOf('id="request"'));
    expect(page).toContain("existing, verified");
  });

  it("keeps honest historical proof separate from the $199 package", () => {
    expect(page).toContain("not a promise of results");
    expect(page).toContain("broader engagement");
    expect(page).toContain("href={gbpProof[0].image}");
  });

  it("preserves the existing protected lead, consent and payment semantics", () => {
    expect(page).toContain("action={formAction}");
    expect(page).toContain('id="gbp-offer-form"');
    expect(page).toContain('id="offer-form-success"');
    expect(page).toContain('id="offer-form-status"');
    expect(page).toContain('localStorage.getItem(consentKey) === "accepted"');
    expect(page).toContain('trackOfferEvent("gbp_offer_inquiry_submitted")');
    expect(page).toContain('"gbp_offer_checkout_started"');
    expect(page).not.toContain("gbp_offer_purchase_completed");
    expect(page).toContain("No automatic renewal");
  });
});
