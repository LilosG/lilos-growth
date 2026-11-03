import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = (file) => readFileSync(file, "utf8");

describe("measurement and attribution integrity", () => {
  it("gates all shared analytics events behind explicit consent", () => {
    const layout = source("src/layouts/Layout.astro");
    expect(layout).toContain('localStorage.getItem("lg_cookie_consent") !== "accepted"');
    expect(layout).toContain('window.gtag("event", eventName, data)');
  });

  it("exposes GA4 gtag globally and schedules the loader only once", () => {
    const ga = source("src/components/common/GoogleAnalytics.astro");
    expect(ga).toContain("window.gtag = window.gtag || function()");
    expect(ga).toContain("window.__gaLoaded || window.__gaScheduled");
    expect(ga).toContain('window.addEventListener("lg-consent-accepted", loadGa)');
  });

  it("routes ordinary CTA interactions through the shared event bridge", () => {
    const pageLayout = source("src/layouts/PageLayout.astro");
    expect(pageLayout).toContain("window.trackEvent?.(evt");
    expect(pageLayout).not.toContain('window.gtag("event", evt');
    expect(pageLayout).not.toContain('el.href || el.getAttribute("aria-label")');
  });

  it("keeps form attempts separate from verified booking events", () => {
    const contact = source("src/pages/contact.astro");
    expect(contact).toContain('"contact_form_submit_attempt"');
    expect(contact).toContain('event.origin !== "https://calendly.com"');
    expect(contact).toContain('"calendly.event_scheduled"');
    expect(contact).toContain('"calendly_event_scheduled"');
    expect(contact).not.toContain('"contact_form_submission_confirmed"');
  });

  it("does not infer a paid order from the GBP inquiry funnel", () => {
    const offer = source("src/pages/google-business-profile-offer/index.astro");
    expect(offer).toContain('"gbp_offer_inquiry_submitted"');
    expect(offer).toContain('"gbp_offer_checkout_started"');
    expect(offer).not.toContain('"gbp_offer_purchase_completed"');
  });
});
