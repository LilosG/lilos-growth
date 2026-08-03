// Until case study detail pages exist, never emit /results/<slug> links.
export const normalizeCaseStudyHref = (href?: string | null): string => {
  if (typeof href === "string" && href.startsWith("/results/")) return "/results";
  return href ?? "/results";
};
