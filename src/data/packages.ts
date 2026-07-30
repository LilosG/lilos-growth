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

/**
 * Bundle = GBP + Local SEO together. Priced as the matching standalone
 * SEO tier (see seoTiers below) + a flat $250/mo for full GBP
 * management, consistently across every tier — Local: $500+$250=$750,
 * Growth: $750+$250=$1,000, Authority: $1,250+$250=$1,500.
 */
export const packages = [
  {
    id: "pkg-local",
    name: "Local",
    tagline: "GBP + SEO Foundation",
    price: 750,
    setupPrice: 1150,
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
    price: 1000,
    setupPrice: 1500,
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
    price: 1500,
    setupPrice: 2000,
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

/**
 * GBP is a single tier — month-to-month with no setup fee already
 * covers the "just want it fixed, no commitment" case a separate
 * one-time SKU used to try to solve. Automation keeps the standing
 * price fair without a first-month markup.
 */
export const gbpManagement = {
  name: "GBP Management",
  price: 300,
  description: "Month-to-month · no setup fee · no contract",
  inclusions: [
    "Full profile optimization & category alignment",
    "Weekly posts + EXIF-optimized photos",
    "Review replies + proactive requests",
    "Q&A monitoring and updates",
    "Monthly profile audit — catch suspensions, edits, spam early",
    "Monthly performance report: views, calls, direction requests",
  ],
};

/**
 * Local SEO, standalone — no GBP included. Same deliverable-volume
 * logic as before (more pages/posts/backlinks per month = more real
 * recurring hours), just rounded and re-priced so the bundle above
 * has one clean, consistent delta.
 */
export const seoTiers = [
  {
    name: "SEO Local",
    price: 500,
    setupPrice: 800,
    featured: false,
    bestFor: "Best for: a single-service business in a smaller or less competitive market.",
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
    price: 750,
    setupPrice: 1250,
    featured: true,
    bestFor: "Best for: businesses ready to actively compete for rankings.",
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
    price: 1250,
    setupPrice: 1750,
    featured: false,
    bestFor: "Best for: multi-service businesses or competitive metro markets.",
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

/**
 * Website builds — same scalable Astro city×service framework on
 * every tier. Tiers differ by how much of the city×service matrix is
 * live at launch, not by artificially rationing pages. bundledPrice
 * is the flat rate when paired with any ongoing GBP/SEO package —
 * no minimum term, just a real upfront number that makes walking away
 * a real cost without requiring a contract.
 */
export const websiteBuilds = [
  {
    name: "Starter",
    price: 1250,
    bundledPrice: 1000,
    featured: false,
    timeline: "1–2 weeks",
    description:
      "The same scalable Astro framework as every build. Launches with 1–2 cities × your core services live.",
    bestFor: "Best for: single-location businesses testing the waters or with 1–3 core services.",
    inclusions: [
      "Same city × service Astro framework as Growth",
      "Home, About, Services, Contact",
      "LocalBusiness + Service schema",
      "GA4 + Google Search Console setup",
      "Click-to-call + contact form with reCAPTCHA",
      "Mobile-first, Core Web Vitals optimized",
      "Add cities or services anytime — the framework's already built",
    ],
  },
  {
    name: "Growth",
    price: 2250,
    bundledPrice: 1000,
    featured: true,
    timeline: "2–4 weeks",
    description:
      "Full city × service matrix live at launch — broader day-one coverage on the same framework.",
    bestFor: "Best for: businesses serving multiple cities or with 4+ services.",
    inclusions: [
      "Everything in Starter",
      "Full city × service matrix live at launch",
      "Blog foundation (seed posts included)",
      "FAQ page with FAQ schema",
      "Google Review widget integration",
      "Add cities or services anytime — the framework's already built",
    ],
  },
];

export const websiteAsAService = {
  name: "Website as a Service",
  price: 199,
  inclusions: [
    "Hosting, security monitoring, and uptime",
    "Up to 5 minor edits/mo via support ticket",
    "Analytics and lead tracking maintained",
    "Month-to-month — cancel anytime",
  ],
};

/**
 * One-time audits. "Local Search Audit" used to exist as two separate
 * near-identical entries in this file (seoOneTime + audits) and
 * rendered twice on the same page — consolidated to one.
 */
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
    price: 500,
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
    note: "This $500 fee is credited in full toward any retainer started within 30 days.",
  },
];

export const addOns = [
  { name: "Extra local content asset (beyond plan)", price: "$75/asset" },
  { name: "Additional city or service page (one-time)", price: "$150/page" },
  { name: "Review response management only", price: "$100/mo" },
  { name: "AI visibility quarterly audit (standalone)", price: "$300/quarter" },
  { name: "Citation cleanup (one-time, up to 50 directories)", price: "$350" },
  { name: "Schema implementation (one-time)", price: "$300" },
  { name: "Local backlink (per link, vetted)", price: "$150–$300" },
  { name: "Strategy consultation (60 min, no retainer)", price: "$200" },
];
