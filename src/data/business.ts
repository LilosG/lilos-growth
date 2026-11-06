export interface BusinessMarket {
  name: string;
  /** Two-letter state code. */
  state: keyof typeof stateNames;
}

export interface Business {
  name: string;
  legalName: string;
  phoneE164: string;
  phoneDisplay: string;
  email: string;
  gbpUrl: string;
  mapEmbedSrc: string;
  youtubeUrl: string;
  facebookUrl: string;
  sameAs: string[];
  locality: string;
  region: string;
  country: string;
  /** Service-area business: no public street address. */
  streetAddress: string | null;
  postalCode: string | null;
  areaServed: BusinessMarket[];
}

export const stateNames = {
  CA: "California",
  NV: "Nevada",
  AZ: "Arizona",
  TX: "Texas",
} as const;

const gbpUrl = "https://www.google.com/maps?cid=10105481590020742186";
const youtubeUrl = "https://www.youtube.com/@lilos-growth";
const facebookUrl = "https://www.facebook.com/profile.php?id=61583390743665";

export const business: Business = {
  name: "Lilos Growth",
  legalName: "Lilos Growth",
  phoneE164: "+18587222920",
  phoneDisplay: "(858) 722-2920",
  email: "hello@lilosgrowth.com",
  gbpUrl,
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d484772.27154443134!2d-117.46236985217423!3d32.87276709068297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9550015892031%3A0x8c3de1f7096f9c2a!2sLilos%20Growth!5e1!3m2!1sen!2sus!4v1794008257055!5m2!1sen!2sus",
  youtubeUrl,
  facebookUrl,
  sameAs: [gbpUrl, youtubeUrl, facebookUrl],
  locality: "San Diego",
  region: "CA",
  country: "US",
  streetAddress: null,
  postalCode: null,
  areaServed: [
    { name: "San Diego", state: "CA" },
    { name: "Los Angeles", state: "CA" },
    { name: "Orange County", state: "CA" },
    { name: "Las Vegas", state: "NV" },
    { name: "Phoenix", state: "AZ" },
    { name: "Dallas", state: "TX" },
  ],
};
