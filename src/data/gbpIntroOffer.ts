export interface OfferFaq {
  id: "start" | "verified" | "period" | "renewal" | "results";
  question: string;
  answer: string;
}

export interface GbpIntroOffer {
  price: number;
  currency: "USD";
  profileCount: number;
  managementDays: number;
  continuationMonthlyPrice: number;
  headline: string;
  highlights: readonly string[];
  optimization: readonly string[];
  management: readonly string[];
  handoff: readonly string[];
  faqs: readonly OfferFaq[];
}

const price = 199;
const managementDays = 30;
const continuationMonthlyPrice = 300;

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export const gbpIntroOffer: GbpIntroOffer = {
  price,
  currency: "USD",
  profileCount: 1,
  managementDays,
  continuationMonthlyPrice,
  headline: "Make it easier for local customers to choose your business.",
  highlights: [
    "Profile optimization",
    "Four weekly posts",
    "Review monitoring & responses",
    "Client-supplied photo updates",
    "Review link + QR code",
    "Completed-work summary",
  ],
  optimization: [
    "Review your profile and local competitors",
    "Refine the primary and additional categories, services, and business description where appropriate",
    "Correct relevant attributes, hours, contact information, and service areas where access and Google policy allow",
  ],
  management: [
    "Publish four weekly posts",
    "Monitor reviews and write responses",
    "Update photos using images you provide",
  ],
  handoff: [
    "Create a review-request link and QR code",
    "Share a summary of completed work and available performance reporting",
  ],
  faqs: [
    {
      id: "start",
      question: "What happens after I get started?",
      answer:
        "Send your business details using the form below. We check your existing profile and email a secure payment link if it is eligible. After payment is confirmed, we send manager-access instructions. You keep ownership and never need to share your Google password.",
    },
    {
      id: "verified",
      question: "Does my profile need to be verified?",
      answer:
        "Yes. This offer is for one existing, verified Google Business Profile. If you are unsure whether yours is verified, email Mike before purchasing. Verification and reinstatement are outside this offer.",
    },
    {
      id: "period",
      question: "When do the 30 days start?",
      answer: `Your ${managementDays} days of management begin after the initial optimization is completed.`,
    },
    {
      id: "renewal",
      question: "Will I be charged again automatically?",
      answer: `No. The ${money(price)} purchase is one-time. After the ${managementDays} days, you may choose ongoing management at ${money(continuationMonthlyPrice)} per month; it does not start automatically.`,
    },
    {
      id: "results",
      question: "Can you guarantee a ranking or number of leads?",
      answer:
        "No. Search results and customer actions depend on factors outside our control. We commit to the work listed here and share available reporting.",
    },
  ],
};

export function getGbpOfferFaqs(checkoutEnabled: boolean): readonly OfferFaq[] {
  return gbpIntroOffer.faqs.map((faq) =>
    checkoutEnabled && faq.id === "start"
      ? {
          ...faq,
          answer:
            "Pay once through our secure checkout. After we confirm payment, we email instructions to add Lilos Growth as a profile manager. You keep ownership and never need to share your Google password.",
        }
      : faq
  );
}

/** A public, hosted checkout link. Never put a payment API key here. */
export function getGbpCheckoutUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("PUBLIC_GBP_INTRO_CHECKOUT_URL must be a public HTTPS checkout URL");
  }
  return url.href;
}
