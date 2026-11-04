import { industries } from "./industries";
import { locations } from "./locations";

/**
 * Contextual commercial navigation only. This is an editorial relationship map,
 * not a claim about rankings or a city-specific service result.
 * Links resolve against known, published route data at build time.
 */
const relatedIndustrySlugs: Record<string, string[]> = {
  "plumber-seo": ["water-damage-restoration-seo", "hvac-seo"],
  "electrician-seo": ["hvac-seo", "plumber-seo"],
  "hvac-seo": ["electrician-seo", "plumber-seo"],
  "pest-control-seo": ["cleaning-company-seo", "landscaping-seo"],
  "roofing-seo": ["water-damage-restoration-seo", "painter-seo"],
  "water-damage-restoration-seo": ["plumber-seo", "roofing-seo"],
  "cleaning-company-seo": ["pest-control-seo", "water-damage-restoration-seo"],
  "party-rental-seo": ["restaurant-seo", "landscaping-seo"],
  "landscaping-seo": ["pest-control-seo", "painter-seo"],
  "painter-seo": ["roofing-seo", "landscaping-seo"],
  "restaurant-seo": ["party-rental-seo", "cleaning-company-seo"],
};

const industryBySlug = new Map(industries.map((industry) => [industry.slug, industry]));
const locationBySlug = new Map(locations.map((location) => [location.slug, location]));

/** Curated sibling industries, never self-links or nonexistent landing pages. */
export function getRelatedIndustries(slug: string) {
  return (relatedIndustrySlugs[slug] ?? [])
    .map((related) => industryBySlug.get(related))
    .filter((industry): industry is (typeof industries)[number] => industry !== undefined && industry.slug !== slug);
}

/** Market-specific path to the core local-SEO service and relevant industry examples. */
export function getLocationIndustryExamples(slug: string) {
  if (!locationBySlug.has(slug)) return [];
  const examples =
    slug === "local-seo-las-vegas"
      ? ["restaurant-seo", "party-rental-seo", "hvac-seo"]
      : slug === "local-seo-orange-county"
        ? ["electrician-seo", "pest-control-seo", "restaurant-seo"]
        : slug === "local-seo-los-angeles"
          ? ["hvac-seo", "roofing-seo", "cleaning-company-seo"]
          : ["plumber-seo", "electrician-seo", "water-damage-restoration-seo"];
  return examples.map((related) => industryBySlug.get(related)).filter((industry): industry is (typeof industries)[number] => industry !== undefined);
}

/** Product-level pathways supported by actual published service routes. */
export const commercialServices = [
  { href: "/services/local-seo", label: "Local SEO services" },
  { href: "/services/google-business-profile-optimization", label: "Google Business Profile management" },
  { href: "/services/web-design", label: "Website design" },
] as const;
