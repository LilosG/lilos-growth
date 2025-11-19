/** Types */
export type ResultsStat = {
  id: string;
  label: string;
  value: string;
  note?: string;
};

export type LogoItem = {
  name: string;
  href?: string;
  src?: string;
};

export type KPI = {
  label: string;
  value: string;
  sr?: string;
};

export type CaseStudy = {
  client: string;
  city: string;
  sectorTag: string;
  locationTag: string;
  kpis: KPI[];
  problem?: string[];
  plan?: string[];
  outcome?: string[];
  ctaText?: string;
  ctaHref?: string;
  id?: string;
  title?: string;
  image?: { src: string; alt?: string };
  blurb?: string;
  ctaLabel?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  text: string;
  desc?: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

/** Placeholder (for cards without logos) */
const _PLACEHOLDER_21_9 =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='514'>
      <rect width='100%' height='100%' fill='#f5f5f5'/>
      <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'
            font-family='system-ui, -apple-system, Segoe UI, Roboto, Ubuntu' font-size='20' fill='#9ca3af'>
        —
      </text>
    </svg>`
  );

/** Stats */
export const resultsStats: ResultsStat[] = [
  {
    id: "lead-growth",
    label: "YoY lead growth (median)",
    value: "+142%",
    note: "12-month median across active retainers",
  },
  {
    id: "gbp-calls",
    label: "GBP calls vs. baseline",
    value: "3.2×",
    note: "After profile fixes & posting cadence",
  },
  {
    id: "cpl",
    label: "Cost per lead (blended)",
    value: "−38%",
    note: "Landing page + tracking improvements",
  },
  {
    id: "vitals",
    label: "Core Web Vitals pass rate",
    value: "96%",
    note: "Post-migration to Astro",
  },
];

/** Logo wall */
export const resultsLogos: LogoItem[] = [
  {
    name: "Blue Door Pest Control",
    href: "/results",
    src: "/clients/blue-door-pest-control.jpg",
  },
  {
    name: "Tamarack Restoration",
    href: "/results",
    src: "/clients/tamarack-restoration.webp",
  },
  {
    name: "Carlsbad Home Services",
    href: "/results",
    src: "/clients/carlsbad-home-services.png",
  },
  { name: "Postal Systems" },
  { name: "North County Handyman" },
  { name: "Encinitas Mold Pros" },
  { name: "Jupiter Pest & Rodent" },
  { name: "Vista Flood Cleanup" },
];
export const logoWall = resultsLogos;

/** Case studies */
export const resultsCaseStudies: CaseStudy[] = [
  {
    id: "bdp-jupiter-fl",
    title: "Blue Door Pest Control — Jupiter, FL",
    client: "Blue Door Pest Control",
    city: "Jupiter, FL",
    sectorTag: "Pest Control",
    locationTag: "Florida",
    image: { src: "/clients/blue-door-pest-control.jpg", alt: "Blue Door Pest Control logo" },
    kpis: [
      {
        label: "organic leads (90d)",
        value: "+118%",
        sr: "plus one hundred eighteen percent organic leads in ninety days",
      },
      { label: "CPL vs. prior agency", value: "−41%" },
    ],
    blurb: "Astro rebuild + GBP cadence drove faster pages and more qualified calls.",
    ctaText: "See pest playbook",
    ctaHref: "/services/local-seo",
  },
  {
    id: "tamarack-carlsbad-ca",
    title: "Tamarack Restoration — Carlsbad, CA",
    client: "Tamarack Restoration",
    city: "Carlsbad, CA",
    sectorTag: "Restoration",
    locationTag: "California",
    image: { src: "/clients/tamarack-restoration.webp", alt: "Tamarack Restoration logo" },
    kpis: [
      { label: "Top-3 Maps adds", value: "+5" },
      { label: "TTFB", value: "<200ms" },
    ],
    blurb: "Partial hydration + schema cleanup improved crawl, UX, and calls.",
    ctaText: "View restoration framework",
    ctaHref: "/services/web-design",
  },
  {
    id: "postal-north-county",
    title: "Postal Systems — North County, CA",
    client: "Postal Systems",
    city: "North County, CA",
    sectorTag: "Home Services",
    locationTag: "California",
    kpis: [
      { label: "GBP calls q/q", value: "3.1×" },
      { label: "quote form CVR", value: "+22%" },
    ],
    blurb: "Productized installs + GBP products boosted discovery and conversion.",
    ctaText: "See install structure",
    ctaHref: "/services/google-business-profile-optimization",
  },
  {
    id: "vista-flood",
    title: "Vista Flood Cleanup — Vista, CA",
    client: "Vista Flood Cleanup",
    city: "Vista, CA",
    sectorTag: "Restoration",
    locationTag: "California",
    kpis: [
      { label: "speed index", value: "−48%" },
      { label: "qualified calls", value: "+64%" },
    ],
    blurb: "Lean Astro build + hubs increased crawl depth and conversions.",
    ctaText: "See page template",
    ctaHref: "/services/web-design",
  },
  {
    id: "carlsbad-home-services-carlsbad-ca",
    title: "Carlsbad Home Services — Carlsbad, CA",
    client: "Carlsbad Home Services",
    city: "Carlsbad, CA",
    sectorTag: "Home Services",
    locationTag: "California",
    image: { src: "/clients/carlsbad-home-services.png", alt: "Carlsbad Home Services logo" },
    kpis: [
      { label: "quote requests", value: "+52%" },
      { label: "CPL", value: "−33%" },
    ],
    blurb: "Service packages + FAQs lifted SERP coverage and LP conversion.",
    ctaText: "View conversion patterns",
    ctaHref: "/services",
  },
];
export const caseStudies = resultsCaseStudies;

/** FAQs */
export const resultsFaqs: FaqItem[] = [
  {
    q: "How fast are results?",
    a: "Technical gains are immediate; local SEO momentum typically compounds over 6–12 weeks.",
  },
  {
    q: "Do we need more ad spend?",
    a: "Only if it improves blended CPL/CPA. We start with conversion and tracking fixes first.",
  },
  {
    q: "Can you work in our CMS?",
    a: "We prefer Astro for speed and maintainability, and we migrate content while preserving URLs.",
  },
  {
    q: "How is success measured?",
    a: "Leads and booked jobs; we also track GBP actions, CVR, speed, and rankings.",
  },
  {
    q: "What do you need from us?",
    a: "Access to analytics/GBP and quick feedback loops to approve content and changes.",
  },
  {
    q: "Is there a long contract?",
    a: "Month-to-month is available; most clients opt for 3–6 months to compound organic gains.",
  },
];

void _PLACEHOLDER_21_9;
