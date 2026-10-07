export interface OfferFaq {
  question: string;
  answer: string;
}

export interface GbpIntroOffer {
  price: number;
  currency: "USD";
  profileCount: number;
  managementDays: number;
  continuationMonthlyPrice: number;
  optimization: readonly string[];
  management: readonly string[];
  handoff: readonly string[];
  faqs: readonly OfferFaq[];
}

export const gbpIntroOffer: GbpIntroOffer = {
  price: 199,
  currency: "USD",
  profileCount: 1,
  managementDays: 30,
  continuationMonthlyPrice: 300,
  optimization: [
    "Review your profile and local competitors",
    "Check categories, services, description, and relevant attributes",
    "Check hours, contact information, and service areas",
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
      question: "Does my profile need to be verified?",
      answer:
        "Yes. This offer is for one existing, verified Google Business Profile. We confirm eligibility before sending a payment link.",
    },
    {
      question: "When do the 30 days start?",
      answer: "The management period starts after the initial optimization is completed.",
    },
    {
      question: "Will I be charged again automatically?",
      answer:
        "No. The $199 purchase is one-time. After the 30 days, you may choose ongoing management at $300 per month; it does not start automatically.",
    },
    {
      question: "Can you guarantee a ranking or number of leads?",
      answer:
        "No. Search results and customer actions depend on factors outside our control. We commit to the work listed here and share available reporting.",
    },
  ],
};
