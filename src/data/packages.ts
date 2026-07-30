export const clientStats = [
  {
    stat: "+1,430%",
    label: "Keyword growth",
    sub: "Wheyland Electric — 20 to 306 keywords in 5 months",
  },
  {
    stat: "3,400%",
    label: "Keyword growth",
    sub: "Restoration client — 12 to 420 keywords in 12 months",
  },
  {
    stat: "29",
    label: "Top 3 Google rankings",
    sub: "Wheyland Electric — from 1 at launch to 29 in 5 months",
  },
];

export const caseStudies = [
  {
    id: "wheyland-electric",
    client: "Wheyland Electric",
    type: "Electrical Contractor · Carlsbad, CA",
    summary:
      "Full site build on Astro + Tailwind, local SEO retainer, GBP management. Started from near zero.",
    timeframe: "5 months",
    href: "/results/wheyland-electric",
    accentColor: "from-orange-500 to-orange-700",
    screenshot: "/images/results/wheyland.png",
    stats: [
      { value: "+1,430%", label: "Keyword growth", sub: "20 → 306" },
      { value: "434", label: "Monthly organic visits", sub: "from 43" },
      { value: "29", label: "Top 3 rankings", sub: "from 1" },
    ],
  },
  {
    id: "tamarack-restoration",
    client: "Tamarack Restoration",
    type: "Water & Fire Restoration · San Diego County",
    summary: "Full local SEO engagement starting from 12 ranked keywords and zero Top 3 positions.",
    timeframe: "12 months",
    href: "/results/tamarack-restoration",
    accentColor: "from-blue-500 to-blue-700",
    screenshot: "/images/results/tamarack.png",
    stats: [
      { value: "3,400%", label: "Keyword growth", sub: "12 → 420" },
      { value: "372", label: "Monthly organic visits", sub: "from 5" },
      { value: "17", label: "Top 3 rankings", sub: "from 0" },
    ],
  },
  {
    id: "kelari-party-rentals",
    client: "Kelari Party Rentals",
    type: "Party & Event Rentals · North County San Diego",
    summary:
      "New Astro/Tailwind site build with full local SEO — launched into a competitive market with zero prior rankings.",
    timeframe: "60 days",
    href: "/results/kelari-party-rentals",
    accentColor: "from-purple-500 to-purple-700",
    screenshot: "/images/results/kelari.png",
    stats: [
      { value: "0→38", label: "Keywords ranked", sub: "from launch" },
      { value: "8", label: "Top 3 rankings", sub: "within 60 days" },
      { value: "100%", label: "Schema coverage", sub: "full entity graph" },
    ],
  },
];

export const packages = [
  {
    id: "pkg-local",
    name: "Local",
    tagline: "GBP + SEO Foundation",
    price: 599,
    setupPrice: 999,
    badge: "Entry point",
    featured: false,
    inclusions: [
      "Full GBP management — posts, photos, reviews, Q&A, monthly report",
      "5 local content assets per month",
      "On-page SEO up to 10 pages per month",
      "Citations: 15–20 per month ongoing",
      "Schema maintained and expanded",
      "Monthly performance report + 30-min call",
    ],
  },
  {
    id: "pkg-growth",
    name: "Growth",
    tagline: "GBP + SEO Growth",
    price: 999,
    setupPrice: 1499,
    badge: "Most Popular",
    featured: true,
    inclusions: [
      "Everything in Local",
      "10 local content assets per month",
      "On-page SEO up to 20 pages per month",
      "Citations: 20+ per month ongoing",
      "2–4 local backlinks per month",
      "AEO + entity schema (FAQ, HowTo, entity graph)",
      "AI search visibility tracking and optimization",
      "Monthly report + 45-min strategy call",
      "Quarterly heatmap + competitor review",
    ],
  },
  {
    id: "pkg-authority",
    name: "Authority",
    tagline: "GBP + SEO Authority",
    price: 1499,
    setupPrice: 1999,
    badge: "Authority",
    featured: false,
    inclusions: [
      "Everything in Growth",
      "15 local content assets per month",
      "Unlimited on-page SEO",
      "4–6 local backlinks per month",
      "Full AEO + AI visibility optimization",
      "Quarterly AI visibility audit included",
      "Bi-weekly check-ins",
      "Conversion testing on top pages",
      "Priority turnaround on all requests",
    ],
  },
];

export const gbpOneTime = {
  name: "GBP Complete Optimization",
  price: 499,
  delivery: "5–7 business days",
  description:
    "A one-time deep optimization of your Google Business Profile — every field, every category, every signal. Built to rank and convert from day one.",
  inclusions: [
    "Full profile audit and scoring against local pack benchmarks",
    "Category selection (primary + secondary) optimized for your market",
    "Business description rewritten for keyword relevance and conversion",
    "Service menu: all services added with optimized descriptions",
    "Photos: organization, naming, geo-tagging recommendations",
    "Q&A section: 10 pre-loaded optimized questions and answers",
    "Attributes and features fully populated",
    "Citation consistency check — top 5 directories audited",
    "Delivered with optimization report and recommendations doc",
  ],
  note: "This fee is credited in full toward any ongoing GBP management plan started within 30 days.",
};

export const gbpRecurring = {
  name: "GBP Active Management",
  price: 249,
  description: "Month-to-month · cancel anytime · 30-day notice to offboard",
  inclusions: [
    "4 GBP posts per month (service spotlight, offers, seasonal)",
    "8–12 photos added per month",
    "Review monitoring and response within 24 hours",
    "Q&A monitoring and response",
    "Monthly profile audit — catch suspensions, edits, spam early",
    "Google Updates monitoring and attribute refresh",
    "Monthly performance report: views, calls, direction requests",
    "Direct access via email — no ticketing system",
  ],
};

export const seoOneTime = {
  name: "Local Search Audit",
  price: 499,
  delivery: "5–7 business days",
  note: "This $499 is credited in full toward any retainer started within 30 days.",
  inclusions: [
    "GBP scored and benchmarked against top 3 local pack competitors",
    "Technical SEO audit: crawlability, Core Web Vitals, mobile, indexing",
    "Keyword landscape: 50–100 local keywords mapped to pages and gaps",
    "Competitive analysis: top 3 organic and Maps competitors",
    "Schema audit: what's installed, what's missing, what's broken",
    "Citation audit: accuracy and consistency across top 30 directories",
    "AI visibility assessment: ChatGPT Search, Perplexity, AI Overviews",
    "Full written 90-day action plan with prioritized recommendations",
    "Delivered as a structured PDF + strategy document",
  ],
};

export const seoTiers = [
  {
    name: "SEO Local",
    price: 399,
    setupPrice: 699,
    featured: false,
    inclusions: [
      "Written strategy document + foundation audit (setup month)",
      "5 local content assets per month",
      "On-page SEO up to 10 pages per month",
      "Technical SEO maintenance",
      "Citations: 15–20 per month",
      "Schema maintained and expanded",
      "Monthly performance report",
    ],
  },
  {
    name: "SEO Growth",
    price: 749,
    setupPrice: 1249,
    featured: true,
    inclusions: [
      "Everything in SEO Local",
      "10 local content assets per month",
      "On-page SEO up to 20 pages per month",
      "Citations: 20+ per month",
      "2–4 local backlinks per month",
      "AEO + entity schema (FAQ, HowTo, entity graph)",
      "AI search visibility tracking and optimization",
      "Monthly report + 45-min strategy call",
      "Quarterly heatmap + competitor review",
    ],
  },
  {
    name: "SEO Authority",
    price: 1249,
    setupPrice: 1749,
    featured: false,
    inclusions: [
      "Everything in SEO Growth",
      "15 local content assets per month",
      "Unlimited on-page SEO",
      "4–6 local backlinks per month",
      "Full AEO + AI visibility optimization",
      "Quarterly AI visibility audit included",
      "Bi-weekly check-ins",
      "Conversion testing on top pages",
      "Priority turnaround on all requests",
    ],
  },
];

export const websiteBuilds = [
  {
    name: "Starter Build",
    price: 1999,
    featured: false,
    pages: "5–7 pages",
    timeline: "2–3 weeks",
    description: "A clean, fast local site built to rank for your primary service and city.",
    bestFor: "Best for: single-location businesses with 1–3 core services.",
    inclusions: [
      "Home, About, Services (1–3), Contact",
      "LocalBusiness schema + Services schema",
      "GA4 + Google Search Console setup",
      "Click-to-call + contact form with reCAPTCHA",
      "Mobile-first, Core Web Vitals optimized",
      "On-page SEO on all pages",
      "Vercel hosting setup",
    ],
  },
  {
    name: "Standard Build",
    price: 3499,
    featured: true,
    pages: "10–15 pages",
    timeline: "3–4 weeks",
    description:
      "Full local SEO site with service pages, city pages, and service × city page architecture.",
    bestFor: "Best for: businesses serving multiple cities or with 4–8 services.",
    inclusions: [
      "Everything in Starter",
      "Up to 8 service pages — written and optimized",
      "Up to 6 city/location pages — written and optimized",
      "Service × city page architecture (up to 20 pages)",
      "FAQ page with FAQ schema",
      "Blog foundation (3 seed posts)",
      "Google Review widget integration",
    ],
  },
  {
    name: "Authority Build",
    price: 5999,
    featured: false,
    pages: "25–40+ pages",
    timeline: "4–6 weeks",
    description:
      "A complete local search authority site built to dominate every service and city in your market.",
    bestFor: "Best for: established businesses ready to own their market.",
    inclusions: [
      "Everything in Standard",
      "Unlimited service pages",
      "Up to 20 city/location pages",
      "Full service × city matrix (up to 50 pages)",
      "Case study or results pages",
      "Full AEO content — FAQ, HowTo, entity pages",
      "AI-optimized structured content throughout",
      "Custom schema beyond LocalBusiness",
      "30-day post-launch support included",
    ],
  },
];

export const websiteAsAService = [
  {
    name: "WaaS Starter",
    price: 149,
    inclusions: [
      "Starter site build included (no upfront fee)",
      "Vercel hosting — fast, reliable, global CDN",
      "Ongoing page additions (up to 2/mo)",
      "Monthly plugin and dependency updates",
      "Uptime monitoring",
      "You own your content and domain",
    ],
  },
  {
    name: "WaaS Growth",
    price: 249,
    inclusions: [
      "Standard site build included (no upfront fee)",
      "Everything in WaaS Starter",
      "Up to 5 new pages per month",
      "Quarterly content refresh on top pages",
      "Priority support — 24-hour response",
      "Annual CRO review and UX improvements",
    ],
  },
];

export const audits = [
  {
    name: "Free GBP Audit",
    price: 0,
    delivery: "24–48 hours",
    description:
      "A scored, benchmarked review of your Google Business Profile against the top 3 competitors in your local pack. You'll see exactly what's missing, what's hurting you, and what to fix first.",
    inclusions: [
      "GBP completeness score (out of 100)",
      "Category and attribute gap analysis",
      "Review velocity and rating benchmark vs. competitors",
      "Photo count and recency check",
      "Post activity assessment",
      "Top 3 priority fixes — written, specific, actionable",
    ],
    note: null,
  },
  {
    name: "Local Search Audit",
    price: 499,
    delivery: "5–7 business days",
    description:
      "A comprehensive audit of your entire local search presence — GBP, technical SEO, keyword landscape, competitive position, schema, citations, and AI visibility. Delivered as a structured PDF with a 90-day action plan.",
    inclusions: [
      "Full GBP audit and competitive benchmark",
      "Technical SEO: crawlability, Core Web Vitals, mobile, indexing",
      "Keyword landscape: 50–100 local keywords mapped to pages",
      "Competitive analysis: top 3 organic and Maps competitors",
      "Schema audit: installed, missing, broken",
      "Citation audit: top 30 directories for accuracy",
      "AI visibility assessment: ChatGPT, Perplexity, AI Overviews",
      "Full 90-day written action plan",
    ],
    note: "The $499 fee is credited in full toward any retainer started within 30 days.",
  },
];

export const addOns = [
  { name: "Extra local content asset (beyond plan)", price: "$75/asset" },
  { name: "Additional city or service page (one-time)", price: "$150/page" },
  { name: "Review response management only", price: "$99/mo" },
  { name: "AI visibility quarterly audit (standalone)", price: "$299/quarter" },
  { name: "Citation cleanup (one-time, up to 50 directories)", price: "$349" },
  { name: "Schema implementation (one-time)", price: "$299" },
  { name: "Local backlink (per link, vetted)", price: "$150–$300" },
  { name: "Strategy consultation (60 min, no retainer)", price: "$199" },
];
