/** Types */
export type ResultsStat = {
  id: string;
  label: string;
  value: string;
  note?: string;
  icon?: string;
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
  category?: "local-seo" | "gbp" | "leads";
};

export type ServiceType = "website" | "gbp" | "local-seo";

export type CaseStudy = {
  id: string;
  client: string;
  city: string;
  sectorTag: string;
  locationTag: string;
  serviceTypes: ServiceType[];
  kpis: KPI[];
  problem?: string[];
  plan?: string[];
  outcome?: string[];
  ctaText?: string;
  ctaHref?: string;
  title?: string;
  image?: { src: string; alt?: string };
  screenshot?: { src: string; alt?: string };
  blurb?: string;
  websiteUrl?: string;
  featured?: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
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

/** Service type labels for display */
export const serviceTypeLabels: Record<ServiceType, string> = {
  website: "Website",
  gbp: "GBP",
  "local-seo": "Local SEO",
};

/** Stats */
export const resultsStats: ResultsStat[] = [
  {
    id: "lead-growth",
    label: "Avg. lead growth",
    value: "+142%",
    note: "12-month median across active clients",
    icon: "chart",
  },
  {
    id: "gbp-calls",
    label: "GBP calls increase",
    value: "3.2×",
    note: "After profile optimization & posting",
    icon: "phone",
  },
  {
    id: "cpl",
    label: "Cost per lead",
    value: "−38%",
    note: "Landing page + tracking improvements",
    icon: "dollar",
  },
  {
    id: "vitals",
    label: "Core Web Vitals",
    value: "96%",
    note: "Pass rate on Astro-built sites",
    icon: "speed",
  },
];

/** Case studies with service types */
export const resultsCaseStudies: CaseStudy[] = [
  {
    id: "bdp-jupiter-fl",
    title: "Blue Door Pest Control",
    client: "Blue Door Pest Control",
    city: "Jupiter, FL",
    sectorTag: "Pest Control",
    locationTag: "Florida",
    serviceTypes: ["website", "gbp", "local-seo"],
    websiteUrl: "https://bluedoorpest.com",
    image: { src: "/clients/blue-door-pest-control.jpg", alt: "Blue Door Pest Control logo" },
    screenshot: {
      src: "/clients/screenshots/blue-door-pest-full.png",
      alt: "Blue Door Pest Control website",
    },
    kpis: [
      {
        label: "organic leads",
        value: "+118%",
        sr: "plus one hundred eighteen percent organic leads",
      },
      { label: "cost per lead", value: "−41%" },
      { label: "GBP calls", value: "+89%" },
    ],
    blurb:
      "Full-service engagement: Astro website rebuild, GBP optimization with weekly posts, and local SEO strategy targeting Jupiter and surrounding Palm Beach County cities.",
    ctaText: "View SEO approach",
    ctaHref: "/services/local-seo",
  },
  {
    id: "tamarack-carlsbad-ca",
    title: "Tamarack Restoration",
    client: "Tamarack Restoration",
    city: "Carlsbad, CA",
    sectorTag: "Restoration",
    locationTag: "California",
    serviceTypes: ["website", "gbp", "local-seo"],
    websiteUrl: "https://www.tamarackrestoration.com",
    image: { src: "/clients/tamarack-restoration.webp", alt: "Tamarack Restoration logo" },
    screenshot: {
      src: "/clients/screenshots/tamarack-restoration-full.png",
      alt: "Tamarack Restoration website",
    },
    kpis: [
      {
        label: "keywords ranked",
        value: "+2,184%",
        sr: "twenty one hundred eighty four percent increase in keywords ranked",
        category: "local-seo",
      },
      {
        label: "organic traffic",
        value: "+1,160%",
        sr: "eleven hundred sixty percent increase in organic traffic",
        category: "local-seo",
      },
      {
        label: "organic leads",
        value: "~15-20×",
        sr: "fifteen to twenty times increase in organic leads",
        category: "leads",
      },
    ],
    blurb:
      "Fast Astro build with service-area pages, GBP optimization, and local link building for water damage and mold remediation searches. Started May 2025. Semrush: 19 → 434 keywords ranked (0 → 21 in the top 3), organic traffic 25 → 315 sessions/mo, plus branded search appearing for the first time (0 → 32) — people searching the company by name. Organic leads went from 1-2/mo to a sustained 25-30/mo, and these are high-ticket restoration jobs, not low-value form fills.",
    ctaText: "View approach",
    ctaHref: "/services/web-design",
  },
  {
    id: "carlsbad-home-services",
    title: "Carlsbad Home Services",
    client: "Carlsbad Home Services",
    city: "Carlsbad, CA",
    sectorTag: "Home Services",
    locationTag: "California",
    serviceTypes: ["website", "local-seo"],
    websiteUrl: "https://carlsbadhomeservices.com",
    image: { src: "/clients/carlsbad-home-services.png", alt: "Carlsbad Home Services logo" },
    screenshot: {
      src: "/clients/screenshots/carlsbad-home-services-full.png",
      alt: "Carlsbad Home Services website",
    },
    kpis: [
      { label: "quote requests", value: "+52%" },
      { label: "cost per lead", value: "−33%" },
    ],
    blurb:
      "Conversion-focused website with service pages and FAQ schema, plus local SEO targeting North County San Diego service areas.",
    ctaText: "View approach",
    ctaHref: "/services",
  },
  {
    id: "carlsbad-fixit",
    title: "Carlsbad Fix It",
    client: "Carlsbad Fix It",
    city: "Carlsbad, CA",
    sectorTag: "Handyman",
    locationTag: "California",
    serviceTypes: ["website", "gbp", "local-seo"],
    websiteUrl: "https://www.carlsbadfixit.com",
    image: { src: "/clients/carlsbad-fixit.svg", alt: "Carlsbad Fix It logo" },
    screenshot: {
      src: "/clients/screenshots/carlsbad-fixit-full.png",
      alt: "Carlsbad Fix It website",
    },
    kpis: [
      { label: "Maps visibility", value: "+73%" },
      { label: "avg. session time", value: "+45%" },
    ],
    blurb:
      "Complete local presence overhaul: fast website, optimized GBP with service menus, and location-specific content for handyman searches.",
    ctaText: "View approach",
    ctaHref: "/services/local-seo",
  },
  {
    id: "postal-systems",
    title: "Postal Systems",
    client: "Postal Systems",
    city: "San Diego, CA",
    sectorTag: "Commercial Services",
    locationTag: "California",
    serviceTypes: ["website", "gbp", "local-seo"],
    websiteUrl: "https://sandiegocommercialmailboxes.com",
    image: { src: "/clients/sd-commercial-mailboxes.svg", alt: "Postal Systems logo" },
    screenshot: {
      src: "/clients/screenshots/san-diego-commercial-mailboxes-full.png",
      alt: "Postal Systems website",
    },
    kpis: [
      { label: "GBP calls", value: "3.1×" },
      { label: "form conversion", value: "+22%" },
    ],
    blurb:
      "Niche B2B focus: productized service pages for mailbox installation, GBP optimization with product listings, and local SEO for commercial property managers.",
    ctaText: "View approach",
    ctaHref: "/services/google-business-profile-optimization",
  },
  {
    id: "wheyland-electric-north-county-ca",
    title: "Wheyland Electric",
    client: "Wheyland Electric",
    city: "North County San Diego, CA",
    sectorTag: "Electrician",
    locationTag: "California",
    serviceTypes: ["website", "gbp", "local-seo"],
    featured: true,
    websiteUrl: "https://wheylandelectric.com",
    screenshot: {
      src: "/clients/screenshots/wheyland-electric-full.png",
      alt: "Wheyland Electric website",
    },
    kpis: [
      {
        label: "organic traffic",
        value: "+909%",
        sr: "nine hundred nine percent increase in organic traffic",
        category: "local-seo",
      },
      {
        label: "keywords ranked",
        value: "+1,430%",
        sr: "fourteen hundred thirty percent increase in keywords ranked",
        category: "local-seo",
      },
      {
        label: "website form leads",
        value: "~9×",
        sr: "approximately nine times increase in website form leads",
        category: "leads",
      },
      {
        label: "GBP profile views",
        value: "+224%",
        sr: "two hundred twenty four percent increase in GBP profile views",
        category: "gbp",
      },
    ],
    blurb:
      "Full rebuild from scratch on Astro/Tailwind. 107 pages, 64 city × service money pages, 13 blog posts at launch. Previous agency had them at 3-4 web form leads/mo and 2-3 click-to-call leads/mo. Five months post-launch: ~35 form leads/mo and ~28 click-to-call leads/mo (GA4, May-Jun 2026 average), plus sustained GBP call growth.",
    ctaText: "Read the full case study",
    ctaHref: "/results/wheyland-electric",
  },
  {
    id: "kelari-party-rentals-carlsbad-ca",
    title: "Kelari Party Rentals",
    client: "Kelari Party Rentals",
    city: "Carlsbad, CA",
    sectorTag: "Party Rentals",
    locationTag: "California",
    serviceTypes: ["website", "gbp", "local-seo"],
    websiteUrl: "https://kelaripartyrentals.com",
    screenshot: {
      src: "/clients/screenshots/kelari-party-rentals-full.png",
      alt: "Kelari Party Rentals website",
    },
    kpis: [],
  },
  {
    id: "park-101-carlsbad-ca",
    title: "Park 101",
    client: "Park 101",
    city: "Carlsbad, CA",
    sectorTag: "Restaurant",
    locationTag: "California",
    serviceTypes: ["gbp"],
    kpis: [
      {
        label: "GBP calls, May → June",
        value: "+313%",
        sr: "three hundred thirteen percent increase in GBP calls month over month",
        category: "gbp",
      },
      {
        label: "Profile interactions, May → June",
        value: "+121%",
        sr: "one hundred twenty one percent increase in profile interactions month over month",
        category: "gbp",
      },
      {
        label: "June calls vs June 2025",
        value: "+188.5%",
        sr: "one hundred eighty eight point five percent increase in calls versus the same month last year",
        category: "gbp",
      },
    ],
    blurb:
      "GBP management only, no site rebuild. Took over the profile at the start of May 2026. Calls averaged ~208/mo across Feb-Apr (213 in May — consistent with that baseline, not a fluke low month) before jumping to 880 in June. Profile interactions followed the same pattern: ~3,161/mo average Feb-Apr, 3,523 in May, then 7,798 in June. June also beat June 2025 by +188.5% (calls) and +109.7% (interactions) — same month, year prior, so it's not a seasonal artifact.",
  },
];

export const caseStudies = resultsCaseStudies;

/** FAQs */
export const resultsFaqs: FaqItem[] = [
  {
    q: "How quickly will I see results?",
    a: "Technical improvements (speed, structure) are immediate. Local SEO momentum typically builds over 6–12 weeks as Google re-crawls and trusts the changes.",
  },
  {
    q: "Do I need to increase my ad spend?",
    a: "Usually no. We focus on organic visibility first. Paid ads only make sense once tracking is solid and landing pages convert well.",
  },
  {
    q: "Can you work with my existing website?",
    a: "Yes. We can optimize an existing site or rebuild on Astro for better speed and maintainability. We preserve URLs and redirects either way.",
  },
  {
    q: "How do you measure success?",
    a: "Leads and booked jobs are the primary metrics. We also track GBP actions (calls, directions, clicks), conversion rates, page speed, and keyword rankings.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Access to Google Analytics, Search Console, and your GBP. Quick feedback loops on content approvals help us move faster.",
  },
  {
    q: "Are there long-term contracts?",
    a: "Month-to-month is available. Most clients choose 3–6 month engagements to let organic SEO compound, but you're never locked in.",
  },
];
