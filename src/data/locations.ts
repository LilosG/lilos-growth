export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  title: string;
  description: string;
  intro: string;
  neighborhoods: string[];
  trades: string[];
  whyCity: string;
  faqs: LocationFAQ[];
  geo: { latitude: number; longitude: number };
}

export const locations: LocationData[] = [
  {
    slug: "local-seo-san-diego",
    city: "San Diego",
    state: "California",
    stateAbbr: "CA",
    title: "Local SEO for San Diego Businesses",
    description:
      "San Diego's home service market is competitive. We help local businesses rank in the Map Pack and organic search across San Diego County — from Chula Vista to Oceanside.",
    intro:
      "San Diego County spans 4,200 square miles and 18 incorporated cities — and every one of them has local businesses competing for the same Map Pack spots. Whether you're a plumber in Carlsbad, an HVAC company in El Cajon, or a restoration company serving North County, your customers find you through Google. We've built local SEO strategies for San Diego-area home service businesses for years, and we understand the competitive landscape city by city — from the dense competition in Mission Valley to the lower-hanging fruit in Ramona and Fallbrook.",
    neighborhoods: [
      "Carlsbad",
      "Oceanside",
      "Encinitas",
      "Vista",
      "San Marcos",
      "Escondido",
      "Chula Vista",
      "El Cajon",
      "La Mesa",
      "National City",
      "Poway",
      "Santee",
      "Ramona",
    ],
    trades: [
      "Plumbers",
      "Electricians",
      "HVAC",
      "Pest Control",
      "Roofers",
      "Water Damage Restoration",
      "Cleaning Companies",
      "Landscaping",
      "Painters",
      "Party Rentals",
    ],
    whyCity:
      "San Diego's year-round mild climate drives steady demand for home services — HVAC is less seasonal than inland markets, pest control is active year-round, and the strong real estate market keeps remodeling and contracting work flowing. The county's spread-out geography means local intent is strong: a homeowner in Oceanside searches for an 'Oceanside plumber' before a generic 'San Diego plumber'. We build city-level targeting across the entire county, not just one-size-fits-all optimization.",
    faqs: [
      {
        question: "Do you work with businesses across all of San Diego County?",
        answer:
          "Yes — North County (Carlsbad, Oceanside, Vista, San Marcos, Escondido), South Bay (Chula Vista, National City), East County (El Cajon, La Mesa, Santee), and the city of San Diego itself. We build city-level pages for each area you serve.",
      },
      {
        question: "How competitive is local SEO in San Diego?",
        answer:
          "Highly competitive in the core city and beach communities, moderately competitive in suburbs, and less competitive in outlying areas like Ramona and Fallbrook. We identify the most winnable opportunities in your specific service area first.",
      },
      {
        question: "Can you help a home service business rank in North County specifically?",
        answer:
          "Absolutely. North County San Diego (Carlsbad, Oceanside, Vista, San Marcos) is where a significant portion of our client base operates. We understand the local competitive landscape and which citation sources and local links carry the most weight there.",
      },
      {
        question: "Do San Diego businesses need different SEO than businesses in LA or Las Vegas?",
        answer:
          "The fundamentals are the same, but market density, competitor strength, and city-level targeting vary significantly. San Diego's neighborhood-level search intent is strong — 'Carlsbad HVAC' performs differently than 'San Diego HVAC' and we account for both.",
      },
    ],
    geo: { latitude: 32.7157, longitude: -117.1611 },
  },
  {
    slug: "local-seo-los-angeles",
    city: "Los Angeles",
    state: "California",
    stateAbbr: "CA",
    title: "Local SEO for Los Angeles Businesses",
    description:
      "LA is one of the most competitive local search markets in the country. We help home service and trade businesses rank in the Map Pack across Greater Los Angeles — neighborhood by neighborhood.",
    intro:
      "Los Angeles isn't one market — it's dozens. A plumber in the San Fernando Valley competes against different businesses with different keyword volumes than one in Long Beach or Pasadena. Ranking in LA requires neighborhood-level precision: the right city-targeted pages, GBP optimization calibrated to your service territory, and local authority signals that Google reads as genuinely relevant to your specific corner of the metro. We build local SEO strategies that work at the scale of LA, targeting the specific communities where your customers actually search.",
    neighborhoods: [
      "Hollywood",
      "Silver Lake",
      "Burbank",
      "Glendale",
      "Pasadena",
      "San Fernando Valley",
      "Long Beach",
      "Torrance",
      "Culver City",
      "Santa Monica",
      "Inglewood",
      "Compton",
      "West Hollywood",
      "Venice",
    ],
    trades: [
      "Plumbers",
      "Electricians",
      "HVAC",
      "Pest Control",
      "Roofers",
      "Water Damage Restoration",
      "Cleaning Companies",
      "Landscaping",
      "Painters",
      "Party Rentals",
      "Restaurants & Hospitality",
    ],
    whyCity:
      "LA's size means there's enormous search volume — and enormous competition. National franchise brands and well-funded local operators fight for the same Map Pack spots. Independent businesses win by out-localizing them: building stronger GBP profiles, earning reviews faster, and creating neighborhood-specific content that signals genuine local relevance. We help LA-area businesses identify the neighborhoods where competition is beatable and build a presence there first, then expand.",
    faqs: [
      {
        question: "How do you approach SEO for such a large metro like LA?",
        answer:
          "We start with your primary service area and work outward. Rather than trying to rank for 'Los Angeles plumber' on day one, we build strong rankings in your specific neighborhoods first — that's where the most qualified leads are anyway.",
      },
      {
        question: "Is local SEO worth it in a market as competitive as LA?",
        answer:
          "Absolutely — the search volume in LA is enormous. Even ranking for a single neighborhood or sub-market can generate significant lead volume. And because paid search CPCs are so high in LA, organic rankings deliver far better ROI.",
      },
      {
        question: "Can you help a business rank in multiple LA neighborhoods?",
        answer:
          "Yes. We build location pages for each target neighborhood or city as part of your content strategy. Coverage expands over time as we build authority in each area.",
      },
      {
        question: "Do you work with both English and Spanish-speaking markets in LA?",
        answer:
          "We can advise on bilingual SEO strategy — LA's large Spanish-speaking population represents a significant underserved opportunity in many trades. Reach out to discuss if this is relevant to your business.",
      },
    ],
    geo: { latitude: 34.0522, longitude: -118.2437 },
  },
  {
    slug: "local-seo-orange-county",
    city: "Orange County",
    state: "California",
    stateAbbr: "CA",
    title: "Local SEO for Orange County Businesses",
    description:
      "Orange County's affluent, home-owning population generates strong demand for home services. We help OC businesses rank in the Map Pack across Anaheim, Irvine, Santa Ana, and beyond.",
    intro:
      "Orange County combines high household incomes, high homeownership rates, and dense suburban development — a near-ideal market for home service businesses. The customer base is educated, researches decisions online, and expects professional quality. They also have options: OC has no shortage of competing contractors. The businesses booking the most high-value work are the ones appearing in the Map Pack at the moment of search, backed by strong reviews and detailed service pages that speak to OC homeowners specifically. We build that presence.",
    neighborhoods: [
      "Anaheim",
      "Irvine",
      "Santa Ana",
      "Huntington Beach",
      "Garden Grove",
      "Orange",
      "Fullerton",
      "Costa Mesa",
      "Mission Viejo",
      "Laguna Niguel",
      "Newport Beach",
      "Yorba Linda",
      "Tustin",
      "Lake Forest",
    ],
    trades: [
      "Plumbers",
      "Electricians",
      "HVAC",
      "Pest Control",
      "Roofers",
      "Water Damage Restoration",
      "Cleaning Companies",
      "Landscaping",
      "Painters",
      "Party Rentals",
    ],
    whyCity:
      "OC's homeownership rate and median home values mean homeowners invest significantly in their properties — and they want quality contractors who show up professionally online before they call. A polished local SEO presence (complete GBP, detailed service pages, strong reviews) is table stakes in this market. We help OC businesses look the part online and rank for the searches that bring in the right customers.",
    faqs: [
      {
        question: "Is Orange County a single SEO market or should I target specific cities?",
        answer:
          "Both. 'Orange County [service]' captures broad searches, but city-level pages for Irvine, Anaheim, Huntington Beach, etc. capture higher-intent local searches and are easier to rank. We build both layers.",
      },
      {
        question: "How competitive is OC compared to LA for local SEO?",
        answer:
          "Generally less competitive than core LA — there are fewer competitors in many OC submarkets and the search volume is still strong. It's a good market to build rankings efficiently.",
      },
      {
        question: "Do you work with businesses primarily in South OC (Mission Viejo, Laguna Niguel)?",
        answer:
          "Yes. South OC has its own competitive dynamics — different from North OC around Anaheim. We understand the geography and build city-specific targeting accordingly.",
      },
      {
        question: "Can I rank in both OC and LA from a single SEO campaign?",
        answer:
          "Yes, if your service area spans both. We build the page architecture and GBP strategy to cover multi-county service areas. The content and targeting will be distinct for each metro.",
      },
    ],
    geo: { latitude: 33.7175, longitude: -117.8311 },
  },
  {
    slug: "local-seo-las-vegas",
    city: "Las Vegas",
    state: "Nevada",
    stateAbbr: "NV",
    title: "Local SEO for Las Vegas Businesses",
    description:
      "Las Vegas's rapid growth means new homeowners searching for contractors every day. We help home service businesses rank in the Las Vegas metro — Henderson, Summerlin, North Las Vegas, and beyond.",
    intro:
      "Las Vegas has grown faster than almost any other metro in the country over the past decade — and with that growth comes an enormous, consistently refreshing pool of new homeowners needing every home service imaginable. The challenge is that national franchises, private equity-backed service companies, and savvy local operators are all competing for the same Map Pack positions. We help independent Las Vegas-area businesses build the local authority that competes with well-funded competitors: optimized GBP profiles, service area coverage pages, and the citation and review foundation that Google uses to decide who shows up first.",
    neighborhoods: [
      "Henderson",
      "Summerlin",
      "North Las Vegas",
      "Spring Valley",
      "Enterprise",
      "Paradise",
      "Whitney",
      "Boulder City",
      "Mesquite",
      "Green Valley",
    ],
    trades: [
      "Plumbers",
      "Electricians",
      "HVAC",
      "Pest Control",
      "Roofers",
      "Water Damage Restoration",
      "Cleaning Companies",
      "Landscaping",
      "Painters",
      "Party Rentals",
    ],
    whyCity:
      "Las Vegas's desert climate creates year-round demand for HVAC (cooling season is aggressive), pest control (scorpions, roaches), and pool-related services. The rapid residential construction means electricians, plumbers, and roofers are in constant demand for new builds alongside service calls. And the short summer extreme heat means homeowners don't wait — when the AC breaks in July, they call whoever's first in the Map Pack within the hour. Position matters more in Vegas than almost anywhere.",
    faqs: [
      {
        question: "Is Las Vegas a good market for home service SEO?",
        answer:
          "Excellent. The metro's growth rate means a constant influx of new homeowners who haven't established contractor relationships yet — they find their plumber, electrician, and HVAC tech through Google. Early local SEO investment pays off well here.",
      },
      {
        question: "Should I target 'Las Vegas' or specific communities like Henderson or Summerlin?",
        answer:
          "Both. 'Las Vegas HVAC' captures broad searches, but Henderson and Summerlin residents often search with their specific community name. We build pages for both the broad metro and key suburbs.",
      },
      {
        question: "How does the extreme Las Vegas heat affect HVAC and related SEO?",
        answer:
          "AC repair searches spike hard in May–September. We build seasonal content strategies so HVAC clients are already ranking when the heat hits — not scrambling to publish content mid-summer.",
      },
      {
        question: "Do you work with Las Vegas businesses remotely?",
        answer:
          "Yes — we're a digital-first agency. Our Las Vegas clients get the same strategy, deliverables, and reporting as our San Diego clients. Local presence is built through digital signals, not our physical location.",
      },
    ],
    geo: { latitude: 36.1699, longitude: -115.1398 },
  },
];
