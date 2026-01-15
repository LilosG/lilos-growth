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
};

export type ServiceType = 'website' | 'gbp' | 'local-seo';

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
  'website': 'Website',
  'gbp': 'GBP',
  'local-seo': 'Local SEO',
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
    serviceTypes: ['website', 'gbp', 'local-seo'],
    featured: true,
    websiteUrl: "https://bluedoorpest.com",
    image: { src: "/clients/blue-door-pest-control.jpg", alt: "Blue Door Pest Control logo" },
    screenshot: { src: "/clients/screenshots/blue-door-pest-full.png", alt: "Blue Door Pest Control website" },
    kpis: [
      { label: "organic leads", value: "+118%", sr: "plus one hundred eighteen percent organic leads" },
      { label: "cost per lead", value: "−41%" },
      { label: "GBP calls", value: "+89%" },
    ],
    blurb: "Full-service engagement: Astro website rebuild, GBP optimization with weekly posts, and local SEO strategy targeting Jupiter and surrounding Palm Beach County cities.",
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
    serviceTypes: ['website', 'gbp', 'local-seo'],
    websiteUrl: "https://www.tamarackrestoration.com",
    image: { src: "/clients/tamarack-restoration.webp", alt: "Tamarack Restoration logo" },
    screenshot: { src: "/clients/screenshots/tamarack-restoration-full.png", alt: "Tamarack Restoration website" },
    kpis: [
      { label: "Maps top-3 keywords", value: "+5" },
      { label: "page load time", value: "<1s" },
    ],
    blurb: "Fast Astro build with service-area pages, GBP optimization, and local link building for water damage and mold remediation searches.",
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
    serviceTypes: ['website', 'local-seo'],
    websiteUrl: "https://carlsbadhomeservices.com",
    image: { src: "/clients/carlsbad-home-services.png", alt: "Carlsbad Home Services logo" },
    screenshot: { src: "/clients/screenshots/carlsbad-home-services-full.png", alt: "Carlsbad Home Services website" },
    kpis: [
      { label: "quote requests", value: "+52%" },
      { label: "cost per lead", value: "−33%" },
    ],
    blurb: "Conversion-focused website with service pages and FAQ schema, plus local SEO targeting North County San Diego service areas.",
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
    serviceTypes: ['website', 'gbp', 'local-seo'],
    websiteUrl: "https://www.carlsbadfixit.com",
    image: { src: "/clients/carlsbad-fixit.svg", alt: "Carlsbad Fix It logo" },
    screenshot: { src: "/clients/screenshots/carlsbad-fixit-full.png", alt: "Carlsbad Fix It website" },
    kpis: [
      { label: "Maps visibility", value: "+73%" },
      { label: "avg. session time", value: "+45%" },
    ],
    blurb: "Complete local presence overhaul: fast website, optimized GBP with service menus, and location-specific content for handyman searches.",
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
    serviceTypes: ['website', 'gbp', 'local-seo'],
    websiteUrl: "https://sandiegocommercialmailboxes.com",
    image: { src: "/clients/sd-commercial-mailboxes.svg", alt: "Postal Systems logo" },
    screenshot: { src: "/clients/screenshots/san-diego-commercial-mailboxes-full.png", alt: "Postal Systems website" },
    kpis: [
      { label: "GBP calls", value: "3.1×" },
      { label: "form conversion", value: "+22%" },
    ],
    blurb: "Niche B2B focus: productized service pages for mailbox installation, GBP optimization with product listings, and local SEO for commercial property managers.",
    ctaText: "View approach",
    ctaHref: "/services/google-business-profile-optimization",
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
