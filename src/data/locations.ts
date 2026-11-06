export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  legacyPath: string;
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
    slug: "san-diego",
    legacyPath: "/local-seo-san-diego",
    city: "San Diego",
    state: "California",
    stateAbbr: "CA",
    title: "San Diego Local SEO Agency & Services | Lilos Growth",
    description:
      "Local SEO services for San Diego businesses: Google Business Profile optimization, technical SEO, content, and websites designed to earn qualified inquiries.",
    intro:
      "Lilos Growth helps San Diego businesses compete for the searches that bring customers through the door, onto the phone, or to a booking page. Our work spans local trades, restaurants and hospitality, and specialized service businesses. We start with your market, current search visibility, and the actions customers need to take — then build a practical plan for your website and Google Business Profile.",
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
      "Restaurants & Hospitality",
      "Specialized Commercial Services",
    ],
    whyCity:
      "San Diego businesses compete across distinct neighborhoods, cities, and customer needs. A North County electrician, a Little Italy restaurant, and a specialist supplier may all need local discovery, but they do not need identical service pages, business categories, or conversion paths. We use search data and actual service areas to decide where dedicated pages, GBP improvements, technical fixes, and local references will be useful. We do not manufacture city pages or promise a specific Map Pack position.",
    faqs: [
      {
        question: "What does local SEO for a San Diego business include?",
        answer:
          "It starts with an audit of your website, Google Business Profile, search queries, competitors, and inquiry paths. The work may include technical fixes, service-page improvements, profile optimization, accurate citations, relevant local references, and measurement.",
      },
      {
        question: "Do you only work with home service and trade companies?",
        answer:
          "No. Trades and home services are an important part of our experience, but we also work with hospitality businesses and specialized commercial companies. Each engagement is scoped to the actual business and its customers.",
      },
      {
        question: "Can you support businesses throughout San Diego County?",
        answer:
          "Yes. We work with businesses in San Diego and North County, including Carlsbad, Oceanside, Encinitas, Vista, and San Marcos. Geographic targeting depends on where the business genuinely operates and serves customers.",
      },
      {
        question: "Can you guarantee a top-three Google Maps position?",
        answer:
          "No agency can guarantee a particular ranking. We focus on accurate local business information, useful content, sound technical foundations, and transparent reporting on search visibility and inquiries.",
      },
    ],
    geo: { latitude: 32.7157, longitude: -117.1611 },
  },
  {
    slug: "los-angeles",
    legacyPath: "/local-seo-los-angeles",
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
    slug: "orange-county",
    legacyPath: "/local-seo-orange-county",
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
        question:
          "Do you work with businesses primarily in South OC (Mission Viejo, Laguna Niguel)?",
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
    slug: "las-vegas",
    legacyPath: "/local-seo-las-vegas",
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
        question:
          "Should I target 'Las Vegas' or specific communities like Henderson or Summerlin?",
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
          "Yes — we're a digital-first agency. Las Vegas businesses get the same strategy, deliverables, and reporting as every other engagement. Local presence is built through digital signals, not our physical location.",
      },
    ],
    geo: { latitude: 36.1699, longitude: -115.1398 },
  },
  {
    slug: "phoenix",
    legacyPath: "/local-seo-phoenix",
    city: "Phoenix",
    state: "Arizona",
    stateAbbr: "AZ",
    title: "Local SEO for Phoenix Businesses",
    description:
      "Local SEO for Phoenix-area businesses: Google Business Profile management, suburb-level service pages, and websites built around how Valley customers actually search.",
    intro:
      "The Phoenix metro is a grid of large suburbs rather than one dense city, and customers tend to search with the name of the suburb they live in. Lilos Growth builds local search foundations for Valley businesses that start with the real service area: which suburbs the crew drives to, which services bring in the best work, and how customers prefer to reach you. From there we plan the website pages, Google Business Profile improvements, and measurement that fit that footprint.",
    neighborhoods: [
      "Scottsdale",
      "Tempe",
      "Mesa",
      "Chandler",
      "Gilbert",
      "Glendale",
      "Peoria",
      "Surprise",
      "Goodyear",
      "Queen Creek",
    ],
    trades: [
      "HVAC",
      "Pest Control",
      "Roofers",
      "Plumbers",
      "Electricians",
      "Landscaping",
      "Cleaning Companies",
      "Painters",
    ],
    whyCity:
      "Phoenix summers are long and punishing, and that shapes what people search for. A failed air conditioner, a green pool, or a scorpion in the garage is an urgent problem, so HVAC, pool, and pest businesses see searches arrive in bursts and expect to be found immediately. The Valley is also a sprawl of connected suburbs, and a homeowner in Gilbert is likely to search with Gilbert in the query, not Phoenix. Strong local visibility here means matching seasonal urgency and suburb-level search habits to the places a business genuinely serves. We do not promise a specific Map Pack position.",
    faqs: [
      {
        question:
          "Should a Phoenix business target Phoenix or individual suburbs like Mesa and Chandler?",
        answer:
          "Usually both, in proportion to the real service area. The Valley's suburbs are large and many customers search with their own city name, so dedicated pages for the suburbs you actually serve can match that behavior. We decide which suburbs deserve pages from search data and your crews' routes, not by listing every city on the map.",
      },
      {
        question: "How does the summer heat change local SEO planning in Arizona?",
        answer:
          "Demand for cooling, pool, and pest services builds before and during the hot months, so useful pages and a well-maintained Google Business Profile should be in place ahead of the season. Planning the content calendar around those cycles means you are not publishing in the middle of the rush.",
      },
      {
        question: "Can you help if I serve both the East Valley and the West Valley?",
        answer:
          "Yes. We map the service area first and then decide how to structure pages and profile information so each side of the Valley is represented accurately. If the business operates in both, we keep the content distinct rather than repeating one page with a different suburb name.",
      },
      {
        question: "Do you guarantee a top Map Pack spot in Phoenix?",
        answer:
          "No. Nobody can guarantee a specific position in Google results. We work on accurate business information, useful service pages, sound technical foundations, and clear reporting so you can see how visibility and inquiries change over time.",
      },
    ],
    geo: { latitude: 33.4484, longitude: -112.074 },
  },
  {
    slug: "dallas",
    legacyPath: "/local-seo-dallas",
    city: "Dallas",
    state: "Texas",
    stateAbbr: "TX",
    title: "Local SEO for Dallas Businesses",
    description:
      "Local SEO for Dallas-Fort Worth businesses: Google Business Profile management, city-by-city service pages, and websites built for the DFW metroplex.",
    intro:
      "Dallas-Fort Worth is a metroplex made up of many cities that each behave like their own local market. Lilos Growth helps DFW businesses sort out where customers really search, which of the surrounding cities belong in the strategy, and how to present each service clearly on the website and Google Business Profile. We begin with your actual service area and the jobs you want more of, then build a practical plan around pages, profile quality, and measurement rather than a long list of cities.",
    neighborhoods: [
      "Plano",
      "Frisco",
      "Irving",
      "Garland",
      "McKinney",
      "Richardson",
      "Arlington",
      "Carrollton",
      "Allen",
      "Grand Prairie",
    ],
    trades: [
      "Roofers",
      "Water Damage Restoration",
      "Electricians",
      "Plumbers",
      "HVAC",
      "Landscaping",
      "Painters",
      "Cleaning Companies",
    ],
    whyCity:
      "DFW is a multi-city metroplex, and customers often search by the city they live in, from Plano and Frisco in the north to Arlington and Grand Prairie in the middle. Dallas and Fort Worth also split search behavior, so a business serving both sides should not assume one page covers them. North Texas storm season adds another layer: hail and wind damage send homeowners looking for roofers and restoration companies in sudden waves after a storm. Local visibility here depends on city-level relevance and being ready before the weather arrives. We do not promise a specific Map Pack position.",
    faqs: [
      {
        question: "Do I need separate pages for Dallas and Fort Worth?",
        answer:
          "If you serve both, usually yes. The two cities have their own neighborhoods, search habits, and competitors, and one page rarely serves both well. We look at your real service area and search data before recommending how to split the pages.",
      },
      {
        question: "How should a roofing or restoration company prepare for hail season?",
        answer:
          "Have your service pages, Google Business Profile, and contact paths in good shape before a storm hits, since searches jump quickly afterward. We focus on clear storm-damage and emergency service pages, accurate profile details, and a fast way for homeowners to reach you.",
      },
      {
        question: "Is it worth targeting suburbs like Plano, Frisco, and McKinney?",
        answer:
          "Often, when you genuinely serve them. Many North Dallas suburb residents search with their own city name. We recommend suburb pages only where there is real demand and you can describe the service honestly, rather than creating pages for every city in the metroplex.",
      },
      {
        question: "Can you promise first-page or Map Pack rankings in DFW?",
        answer:
          "No. Rankings depend on many factors outside anyone's control. We commit to a clear plan, accurate local information, useful content, and transparent reporting on visibility and inquiries.",
      },
    ],
    geo: { latitude: 32.7767, longitude: -96.797 },
  },
];
