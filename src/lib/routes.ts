export type MetroServiceKey = "web-design" | "google-business-profile-optimization";

export const LOCATIONS_INDEX = "/locations";
export const INDUSTRIES_INDEX = "/industries";

export const locationPath = (metro: string) => `${LOCATIONS_INDEX}/${metro}`;

export const metroServicePath = (metro: string, service: MetroServiceKey) =>
  `${locationPath(metro)}/${service}`;

export const industryPath = (slug: string) => `${INDUSTRIES_INDEX}/${slug}`;
