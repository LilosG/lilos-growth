export type TrustLogo = {
  src: string;
  alt: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type TrustStat = {
  value: string;
  label: string;
};

export const trustLogos: TrustLogo[] = [
  { src: "/clients/blue-door-pest-control.jpg", alt: "Blue Door Pest Control logo" },
  { src: "/clients/tamarack-restoration.webp", alt: "Tamarack Restoration logo" },
  { src: "/clients/carlsbad-home-services.png", alt: "Carlsbad Home Services logo" },
  { src: "/clients/carlsbad-fixit.svg", alt: "Carlsbad Fix It logo" },
];

export const homeTestimonials: Testimonial[] = [
  {
    quote:
      "We went from struggling on page three to consistent calls every week. The new site and GBP work paid for itself.",
    author: "John T.",
    role: "Plumbing Business Owner",
  },
  {
    quote:
      "Their SEO roadmap was clear, and the execution was fast. Rankings improved in weeks and the phone started ringing.",
    author: "Melissa R.",
    role: "HVAC Operations Manager",
  },
  {
    quote:
      "Everything feels premium now—site, reviews, and local presence. Leads are up and sales feels easier.",
    author: "Anthony K.",
    role: "Pest Control Owner",
  },
];

export const servicesTestimonials: Testimonial[] = [
  {
    quote:
      "We got a premium site, a stronger GBP, and a clear SEO plan. Calls are up and the process is easy.",
    author: "Chris M.",
    role: "Restoration Business Owner",
  },
  {
    quote:
      "Their reporting is straightforward and the results are real. We’re booking more jobs without paid ads.",
    author: "Dana L.",
    role: "Home Services GM",
  },
  {
    quote:
      "Fast turnaround, real strategy, and a site that looks like a premium brand. We’re finally proud of our web presence.",
    author: "Brandon S.",
    role: "Electrical Contractor",
  },
];

export const servicesTrustStats: TrustStat[] = [
  { value: "+142%", label: "Avg. lead growth across active clients" },
  { value: "3.2×", label: "GBP calls increase after optimization" },
  { value: "96%", label: "Core Web Vitals pass rate on new builds" },
];
