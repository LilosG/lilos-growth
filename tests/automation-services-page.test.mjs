import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const page = read("src/pages/automations/index.astro");
const navigation = read("src/navigation.ts");
const pricing = read("src/data/automationServices.ts");
const header = read("src/components/widgets/Header.astro");

describe("Custom automation services landing page", () => {
  it("appears in the centralized responsive navigation", () => {
    expect(navigation).toContain('{ text: "Automations", href: "/automations" }');
    expect(header).toContain("headerData.links");
    expect(header).toContain("navItems.map");
  });

  it("publishes scope-qualified prices without implying unlimited delivery", () => {
    expect(pricing).toContain("price: 995");
    expect(pricing).toContain("price: 2500");
    expect(pricing).toContain("price: 199");
    expect(page).toContain("written proposal");
    expect(page).toContain("third-party charges");
    expect(page).toContain("Monthly support is optional");
  });

  it("states real work examples and appropriate human review boundaries", () => {
    expect(pricing).toContain("Permit workflow assistance");
    expect(pricing).toContain("After-hours call handling");
    expect(pricing).toContain("Speed-to-lead and follow-up");
    expect(pricing).toContain("Invoice and receivables follow-up");
    expect(pricing).toContain("jurisdiction-specific submission");
    expect(page).toContain("human oversight");
  });

  it("uses existing Astro layout, UI components and valid inquiry fallback", () => {
    expect(page).toContain('import Layout from "~/layouts/PageLayout.astro"');
    expect(page).toContain('import Button from "~/components/ui/Button.astro"');
    expect(page).toContain('import Card from "~/components/ui/Card.astro"');
    expect(page).toContain('id="automation-pricing"');
    expect(page).toContain('id="automation-inquiry"');
    expect(page).toContain('action="https://formspree.io/f/movlbqdk"');
    expect(page).toContain('name="_redirect" value="https://lilosgrowth.com/thank-you"');
    expect(page).toContain('name="inquiry_type"');
    expect(page).toContain('href="/privacy"');
    expect(page).not.toContain("gbp_offer_purchase_completed");
  });
});
