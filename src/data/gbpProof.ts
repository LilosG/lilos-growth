export interface GbpProof {
  client: string;
  metric: string;
  value: string;
  period: string;
  comparison?: string;
  work: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
}

// Transcribed from the existing Google Business Profile performance screenshots.
export const gbpProof: readonly GbpProof[] = [
  {
    client: "Blue Door Pest Control",
    metric: "Direction requests made from Business Profile",
    value: "194",
    period: "Sep 2025–Dec 2025",
    comparison: "+19.0% vs Sep 2024–Dec 2024",
    work: "Google Business Profile optimization and weekly posts, alongside website and local SEO work.",
    image: "/images/results/blue-door-gbp.png",
    imageWidth: 2048,
    imageHeight: 1091,
    imageAlt:
      "Google Business Profile Directions screen for Blue Door Pest Control, showing 194 direction requests from September through December 2025, up 19.0% from the same period in 2024.",
  },
  {
    client: "Carlsbad Fix It",
    metric: "Business Profile interactions",
    value: "38",
    period: "Sep 2025–Dec 2025",
    work: "Google Business Profile optimization with service menus, alongside website and local SEO work.",
    image: "/images/results/carlsbad-fixit-gbp.png",
    imageWidth: 2048,
    imageHeight: 1127,
    imageAlt:
      "Google Business Profile Overview screen for Carlsbad Fix It, showing 38 Business Profile interactions from September through December 2025.",
  },
];
