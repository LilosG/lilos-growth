/**
 * Offer data for the ad landing pages (/google-maps-takeover, /free-website).
 * Checkout URLs come from PUBLIC_STRIPE_* env vars; an empty var falls back to the booking page.
 */

export type OfferId = "takeover" | "website";
export type PlanId = "monthly" | "6mo" | "12mo";

export interface OfferPlan {
  id: PlanId;
  /** Label on the segmented toggle */
  tabLabel: string;
  /** Whole-dollar price charged at checkout */
  price: number;
  /** Price as shown, e.g. "$199" */
  priceDisplay: string;
  /** Short cadence shown after the price, e.g. "/mo" or " today" */
  cadence: string;
  /** Plain-language "what this equals" line */
  equals: string;
  /** Minimum term / rate-lock note for the monthly plan */
  terms?: string;
  /** Prepay bonus line (prepay plans only) */
  bonus?: string;
  /** Regular price for the same service, shown crossed out (from src/data/packages.ts) */
  compareAt?: string;
  /** Savings line shown next to the crossed-out price */
  savings?: string;
  /** Extra note, e.g. early-exit terms */
  note?: string;
  popular?: boolean;
  /** Stripe checkout URL, or the booking URL when the env var is empty */
  checkoutUrl: string;
  /** True when checkoutUrl is the booking fallback (no Stripe link configured) */
  isFallback: boolean;
  ctaLabel: string;
}

export interface Offer {
  id: OfferId;
  name: string;
  route: string;
  plans: OfferPlan[];
  defaultPlan: PlanId;
  includes: string[];
  guarantee: { title: string; body: string };
  prepayBonus: string;
}

/** Existing site booking page (Calendly embed lives at /contact#book). */
export const BOOKING_URL = "/contact#book";

const env = import.meta.env as Record<string, string | undefined>;

function checkout(value: string | undefined): { url: string; isFallback: boolean } {
  const v = value?.trim();
  return v ? { url: v, isFallback: false } : { url: BOOKING_URL, isFallback: true };
}

const GUARANTEE = {
  title: "Day-90 map grid guarantee",
  body: "If your map grid isn't better at day 90, your next month is free.",
};

const takeoverCheckout = {
  monthly: checkout(env.PUBLIC_STRIPE_TAKEOVER_MONTHLY),
  "6mo": checkout(env.PUBLIC_STRIPE_TAKEOVER_6MO),
  "12mo": checkout(env.PUBLIC_STRIPE_TAKEOVER_12MO),
};

const websiteCheckout = {
  monthly: checkout(env.PUBLIC_STRIPE_WEBSITE_MONTHLY),
  "6mo": checkout(env.PUBLIC_STRIPE_WEBSITE_6MO),
  "12mo": checkout(env.PUBLIC_STRIPE_WEBSITE_12MO),
};

export const takeover: Offer = {
  id: "takeover",
  name: "Google Maps Takeover",
  route: "/google-maps-takeover",
  defaultPlan: "6mo",
  prepayBonus: "10 extra photo posts",
  includes: [
    "Week-1 full Google Business Profile optimization",
    "Weekly Google posts",
    "Review responses",
    "Review QR code + text link",
    "Monthly map-rank grid report",
  ],
  guarantee: GUARANTEE,
  plans: [
    {
      id: "monthly",
      tabLabel: "Monthly",
      price: 199,
      priceDisplay: "$199",
      compareAt: "$300",
      savings: "Save $101/mo",
      cadence: "/mo",
      equals: "3-month minimum, then cancel anytime",
      terms: "Rate locked as long as you stay.",
      checkoutUrl: takeoverCheckout.monthly.url,
      isFallback: takeoverCheckout.monthly.isFallback,
      ctaLabel: "Start monthly",
    },
    {
      id: "6mo",
      tabLabel: "6 months",
      price: 995,
      priceDisplay: "$995",
      compareAt: "$1,800",
      savings: "Save $805",
      cadence: " for 6 months",
      equals: "5 months' price, 6 months of service (1 month free)",
      bonus: "10 extra photo posts",
      popular: true,
      checkoutUrl: takeoverCheckout["6mo"].url,
      isFallback: takeoverCheckout["6mo"].isFallback,
      ctaLabel: "Prepay 6 months",
    },
    {
      id: "12mo",
      tabLabel: "12 months",
      price: 1990,
      priceDisplay: "$1,990",
      compareAt: "$3,600",
      savings: "Save $1,610",
      cadence: " for 12 months",
      equals: "10 months' price, 12 months of service (2 months free)",
      bonus: "10 extra photo posts",
      checkoutUrl: takeoverCheckout["12mo"].url,
      isFallback: takeoverCheckout["12mo"].isFallback,
      ctaLabel: "Prepay 12 months",
    },
  ],
};

export const website: Offer = {
  id: "website",
  name: "Free Website Program",
  route: "/free-website",
  defaultPlan: "6mo",
  prepayBonus: "Launch in 14 days instead of 4–6 weeks + 5 extra city pages",
  includes: [
    "Full website with a page for every service and every city you serve",
    "Schema markup on every page",
    "AI-search ready (AEO/GEO)",
    "Call + form tracking",
    "Everything in Google Maps Takeover",
    "Monthly local SEO",
  ],
  guarantee: GUARANTEE,
  plans: [
    {
      id: "monthly",
      tabLabel: "Monthly",
      price: 499,
      priceDisplay: "$499",
      compareAt: "$750",
      savings: "Save $251/mo + $1,250 build fee waived",
      cadence: "/mo",
      equals: "6-month minimum, then cancel anytime",
      terms: "Rate locked as long as you stay.",
      note: "Leave early on monthly and keep the site for $1,000.",
      checkoutUrl: websiteCheckout.monthly.url,
      isFallback: websiteCheckout.monthly.isFallback,
      ctaLabel: "Apply — monthly",
    },
    {
      id: "6mo",
      tabLabel: "6 months",
      price: 2495,
      priceDisplay: "$2,495",
      compareAt: "$5,750",
      savings: "Save $3,255",
      cadence: " for 6 months",
      equals: "5 months' price, 6 months of service (1 month free)",
      bonus: "Launch in 14 days instead of 4–6 weeks + 5 extra city pages",
      popular: true,
      checkoutUrl: websiteCheckout["6mo"].url,
      isFallback: websiteCheckout["6mo"].isFallback,
      ctaLabel: "Prepay 6 months",
    },
    {
      id: "12mo",
      tabLabel: "12 months",
      price: 4990,
      priceDisplay: "$4,990",
      compareAt: "$10,250",
      savings: "Save $5,260",
      cadence: " for 12 months",
      equals: "10 months' price, 12 months of service (2 months free)",
      bonus: "Launch in 14 days instead of 4–6 weeks + 5 extra city pages",
      checkoutUrl: websiteCheckout["12mo"].url,
      isFallback: websiteCheckout["12mo"].isFallback,
      ctaLabel: "Prepay 12 months",
    },
  ],
};

export const offers = { takeover, website } as const;
