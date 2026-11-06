import { industries } from "./industries";
import { locations } from "./locations";

/**
 * Contextual commercial navigation only. This is an editorial relationship map,
 * not a claim about rankings or a city-specific service result.
 * Links resolve against known, published route data at build time.
 */
const relatedIndustrySlugs: Record<string, string[]> = {
  plumbers: ["water-damage-restoration", "hvac"],
  electricians: ["hvac", "plumbers"],
  hvac: ["electricians", "plumbers"],
  "pest-control": ["cleaning", "landscaping"],
  roofing: ["water-damage-restoration", "painters"],
  "water-damage-restoration": ["plumbers", "roofing"],
  cleaning: ["pest-control", "water-damage-restoration"],
  "party-rentals": ["restaurants", "landscaping"],
  landscaping: ["pest-control", "painters"],
  painters: ["roofing", "landscaping"],
  restaurants: ["party-rentals", "cleaning"],
};

const industryBySlug = new Map(industries.map((industry) => [industry.slug, industry]));
const locationBySlug = new Map(locations.map((location) => [location.slug, location]));

/** Curated sibling industries, never self-links or nonexistent landing pages. */
export function getRelatedIndustries(slug: string) {
  return (relatedIndustrySlugs[slug] ?? [])
    .map((related) => industryBySlug.get(related))
    .filter(
      (industry): industry is (typeof industries)[number] =>
        industry !== undefined && industry.slug !== slug
    );
}

const locationIndustryExampleSlugs: Record<string, string[]> = {
  "las-vegas": ["restaurants", "party-rentals", "hvac"],
  "orange-county": ["electricians", "pest-control", "restaurants"],
  "los-angeles": ["hvac", "roofing", "cleaning"],
  phoenix: ["hvac", "pest-control", "roofing"],
  dallas: ["roofing", "water-damage-restoration", "electricians"],
};
const defaultLocationIndustryExamples = ["plumbers", "electricians", "water-damage-restoration"];

/** Market-specific path to the core local-SEO service and relevant industry examples. */
export function getLocationIndustryExamples(slug: string) {
  if (!locationBySlug.has(slug)) return [];
  const examples = locationIndustryExampleSlugs[slug] ?? defaultLocationIndustryExamples;
  return examples
    .map((related) => industryBySlug.get(related))
    .filter((industry): industry is (typeof industries)[number] => industry !== undefined);
}

/** Product-level pathways supported by actual published service routes. */
export const commercialServices = [
  { href: "/services/local-seo", label: "Local SEO services" },
  {
    href: "/services/google-business-profile-optimization",
    label: "Google Business Profile management",
  },
  { href: "/services/web-design", label: "Website design" },
] as const;
