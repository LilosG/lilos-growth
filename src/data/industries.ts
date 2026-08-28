export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  headline: string;
  title: string;
  description: string;
  intro: string;
  painPoints: string[];
  whatYouGet: string[];
  faqs: IndustryFAQ[];
  relatedBlogSlugs?: string[];
}

export const industries: IndustryData[] = [
  {
    slug: "plumber-seo",
    name: "Plumbers",
    headline: "Local SEO for Plumbers",
    title: "Local SEO for Plumbers",
    description:
      "Plumbing leads live in the Map Pack. We get your plumbing business into the top 3 for emergency and routine searches — more calls, more booked jobs, no contracts.",
    intro:
      "Plumbers live and die by emergency call volume. When a pipe bursts at midnight, the homeowner isn't scrolling page two — they call whoever's in the top 3 of the Map Pack. If you're not visible there for 'plumber near me' and 'emergency plumber [city]', those calls go to a competitor. We build the local presence — GBP optimization, high-intent service pages, and Map Pack signals — that puts you first when it counts.",
    painPoints: [
      "Emergency searches go to whoever ranks top 3 — invisible means zero calls",
      "Competitors with stronger GBP profiles steal jobs you should be winning",
      "Generic plumbing websites don't rank for 'water heater installation' or 'sewer line repair'",
      "No reviews strategy means newer competitors outrank established businesses",
    ],
    whatYouGet: [
      "GBP optimization for plumbing categories & service areas",
      "Service pages for emergency plumbing, drain cleaning, water heaters & more",
      "Map Pack ranking signals (citations, reviews, proximity content)",
      "On-page optimization for high-intent plumbing keywords",
      "Monthly ranking reports & strategy calls",
    ],
    faqs: [
      {
        question: "How fast can a plumbing business rank in the Map Pack?",
        answer:
          "Most plumbing clients see Map Pack movement in 30–60 days. Emergency searches in less competitive markets often move faster. We start with GBP and high-impact on-page fixes first.",
      },
      {
        question: "Do you handle both organic and Map Pack SEO?",
        answer:
          "Yes. Both channels matter for plumbers — organic ranks for research-phase searches, the Map Pack captures ready-to-book emergency calls. Our system addresses both.",
      },
      {
        question: "Can you build pages for specific plumbing services?",
        answer:
          "Absolutely. Drain cleaning, water heater installation, sewer repair, leak detection — each service should have its own optimized page. We create and optimize these as part of your retainer.",
      },
      {
        question: "What if I serve multiple cities?",
        answer:
          "We build location pages for each city in your service area. Multi-location coverage is included in our Growth and Authority tiers, and available as an add-on on Local.",
      },
    ],
  },
  {
    slug: "electrician-seo",
    name: "Electricians",
    headline: "Local SEO for Electricians",
    title: "Local SEO for Electricians",
    description:
      "Electricians need to rank for both emergency calls and high-value projects. We build the local SEO presence that fills your calendar with panel upgrades, EV charger installs, and rewires.",
    intro:
      "Electricians face a split market: homeowners searching 'electrician near me' at 9pm after a breaker trips, and contractors bidding on panel upgrades and whole-home rewires. The searches are different, the pages needed are different, and generic SEO misses both. We build a targeted presence — emergency service pages for the urgent calls and high-value project pages for the commercial work — so your business shows up when the job size actually matters.",
    painPoints: [
      "Emergency electrician searches convert instantly — if you're not ranked, someone else gets the call",
      "High-value jobs (panel upgrades, EV chargers, rewires) need their own optimized pages to rank",
      "Contractors and residential clients search differently — one strategy rarely covers both",
      "Without consistent GBP activity, newer competitors with fewer reviews can outrank you",
    ],
    whatYouGet: [
      "Service pages for panel upgrades, EV charger installation, rewiring, and emergency work",
      "GBP optimization with electrical trade categories",
      "Local content targeting your specific service area cities",
      "Keyword targeting for both emergency and project-based searches",
      "Monthly reports tracking rankings and call volume",
    ],
    faqs: [
      {
        question: "Should I target residential or commercial electrician searches?",
        answer:
          "Both, with separate pages for each. Residential homeowners and commercial clients use different search terms and have different needs. We build the page architecture to capture both audiences.",
      },
      {
        question: "Can you help me rank for EV charger installation searches?",
        answer:
          "Yes — EV charger installation is one of the fastest-growing local search categories for electricians. We build dedicated, optimized pages for this and other high-value services.",
      },
      {
        question: "How do reviews factor into electrician SEO?",
        answer:
          "Reviews are a major Map Pack ranking signal, especially recency and volume. We set up a review acquisition system so satisfied customers actually leave reviews without you having to chase them.",
      },
      {
        question: "What areas do you cover for electrician SEO?",
        answer:
          "We work with electricians nationwide. Our team has hands-on experience with electrical trade businesses in Southern California, Nevada, and beyond.",
      },
    ],
  },
  {
    slug: "hvac-seo",
    name: "HVAC Companies",
    headline: "Local SEO for HVAC Companies",
    title: "Local SEO for HVAC Companies",
    description:
      "HVAC is seasonal and hyper-competitive. We help heating and cooling companies rank year-round for AC repair, furnace installation, and tune-up services — not just during peak season.",
    intro:
      "HVAC search volume spikes in summer and winter and flatlines in between — but your overhead doesn't. The companies that win long-term are ranking for tune-ups and maintenance in spring and fall, not just AC repair in July. We build an HVAC SEO strategy that generates consistent leads year-round: seasonal content, service-specific pages, and Map Pack presence that keeps your schedule full even in the shoulder months.",
    painPoints: [
      "Competitors bid aggressively on Google Ads during peak season, making organic rankings critical for margin",
      "AC repair and furnace replacement searches spike suddenly — you need to already be ranked",
      "Seasonal businesses often neglect SEO in off-peak months, losing ground to competitors who don't",
      "HVAC search terms are highly local — 'AC repair [city]' beats generic keywords every time",
    ],
    whatYouGet: [
      "Year-round content strategy (seasonal maintenance, emergency repair, new installs)",
      "Service pages for AC repair, furnace installation, heat pumps, tune-ups, and duct work",
      "Map Pack optimization for each metro area you serve",
      "GBP management with seasonal post cadence",
      "Competitor gap analysis to find keyword opportunities",
    ],
    faqs: [
      {
        question: "How do you handle HVAC's seasonal search fluctuations?",
        answer:
          "We plan content around seasonal intent — maintenance and tune-up content in shoulder seasons, emergency repair content before peak season ramps up. The goal is consistent rankings year-round, not just summer spikes.",
      },
      {
        question: "Can you rank us for both residential and commercial HVAC?",
        answer:
          "Yes — with separate landing pages for each. Commercial HVAC searches use different terminology and have longer sales cycles. We build the architecture to target both without cannibalizing your rankings.",
      },
      {
        question: "What about ranking for new equipment brands (Carrier, Trane, etc.)?",
        answer:
          "We can build brand-specific installation pages targeting searches like 'Carrier AC installation [city]'. These are high-converting pages for homeowners already decided on a brand.",
      },
      {
        question: "How long does it take to see results for HVAC SEO?",
        answer:
          "Most HVAC clients see measurable ranking gains in 45–60 days. Markets with established competitors may take longer — we give you a clear baseline and timeline in the initial strategy.",
      },
    ],
  },
  {
    slug: "pest-control-seo",
    name: "Pest Control Companies",
    headline: "Local SEO for Pest Control Companies",
    title: "Local SEO for Pest Control",
    description:
      "Pest control is a repeat-service business won in the Map Pack. We help extermination and pest management companies rank for termites, rodents, ants, and bed bugs — city by city.",
    intro:
      "Pest control has two types of customers: the panicked homeowner who just found a scorpion in the bathroom and needs someone today, and the property manager booking quarterly service contracts. Both find you through local search. The difference is the panicked searcher converts in minutes — and they click whoever ranks first. We optimize for both the immediate emergency searches and the longer-consideration commercial inquiries, building a local presence that captures both.",
    painPoints: [
      "Emergency pest searches ('exterminator near me today') require top Map Pack placement to capture",
      "Termite and rodent pages need to rank independently — lumping all services on one page kills rankings",
      "Recurring service contracts come from trust signals: reviews, detailed service pages, and local authority",
      "Franchise competitors have national domain authority — independent operators need smart local strategy to win",
    ],
    whatYouGet: [
      "Pest-specific service pages (termites, rodents, ants, bed bugs, cockroaches, scorpions)",
      "Map Pack optimization for each city you service",
      "GBP optimization with pest control categories and services",
      "Content targeting both emergency and recurring-service searches",
      "Review strategy to build trust signals over franchise competitors",
    ],
    faqs: [
      {
        question: "How do you compete with national pest control franchises?",
        answer:
          "Franchises have domain authority but weak local signals. We build hyper-local relevance — neighborhood-level content, local citation consistency, and genuine review volume — that independent operators can win with in the Map Pack.",
      },
      {
        question: "Should I have separate pages for each pest type?",
        answer:
          "Yes. A 'termite treatment' page ranks for termite searches; a general 'pest control' page competes for everything and wins at nothing. We build the full page architecture so each service captures its own traffic.",
      },
      {
        question: "Can you target commercial pest control clients?",
        answer:
          "Absolutely. Restaurant inspections, property management contracts, and commercial accounts require separate pages and different keyword targeting. We build both residential and commercial tracks.",
      },
      {
        question: "Does seasonality affect pest control SEO?",
        answer:
          "Yes — ant season, termite swarming season, and rodent season all drive search spikes. We plan content ahead of these peaks so you're already ranked when the volume hits.",
      },
    ],
  },
  {
    slug: "roofing-seo",
    name: "Roofing Companies",
    headline: "Local SEO for Roofing Companies",
    title: "Local SEO for Roofing Companies",
    description:
      "Storm damage, replacements, and inspections — roofing has high-value searches and fierce competition. We get roofing companies into the Map Pack and ranking for the jobs that matter.",
    intro:
      "Roofing is one of the most competitive local search markets — high average job value means every company is fighting for the same keywords. The businesses winning aren't necessarily the biggest; they're the ones with the strongest local SEO foundation: a fully optimized GBP, service pages that rank for specific roofing types and materials, and enough local authority to beat the storm-chasing competitors who show up after every weather event.",
    painPoints: [
      "Storm chasers flood your market after weather events with aggressive local tactics",
      "High CPCs on Google Ads make organic rankings essential for sustainable lead flow",
      "Roofing searches spike unpredictably — you need to already be ranked before the storm hits",
      "Material and style searches (metal roofing, tile, shingle replacement) convert well but are often unranked",
    ],
    whatYouGet: [
      "Service pages for roof replacement, repair, inspection, storm damage, and specific materials",
      "Map Pack optimization to outrank storm-chasing competitors",
      "GBP strategy with roofing categories and before/after photo content",
      "Local content for each city in your service territory",
      "Reporting on rankings, traffic, and lead volume",
    ],
    faqs: [
      {
        question: "How do I compete with out-of-state roofing companies after storms?",
        answer:
          "Storm chasers lack local history, reviews, and NAP consistency — which are exactly what we build for you year-round. Established local rankings are harder to displace than one-off campaigns.",
      },
      {
        question: "Should I have pages for different roofing materials?",
        answer:
          "Yes — homeowners often search for specific materials ('metal roof installation [city]', 'tile roof repair'). These pages convert at higher rates because the searcher already knows what they want.",
      },
      {
        question: "What about commercial roofing SEO?",
        answer:
          "Commercial roofing requires separate targeting — different keywords, different buyer journey, different page content. We build both tracks if your business serves both markets.",
      },
      {
        question: "Can you help with roofing-specific review generation?",
        answer:
          "Yes. Post-job review requests are critical for roofing since jobs are infrequent. We set up a simple review acquisition workflow timed to when customers are most satisfied.",
      },
    ],
  },
  {
    slug: "water-damage-restoration-seo",
    name: "Water Damage Restoration",
    headline: "Local SEO for Water Damage Restoration Companies",
    title: "Water Damage Restoration SEO",
    description:
      "Water damage calls happen at 2am. Rank in the top 3 of the Map Pack for emergency restoration searches and capture the calls that competitors miss when they're not visible.",
    intro:
      "Water damage restoration is the ultimate emergency service — a burst pipe or flooded basement generates a search within minutes and a call within seconds of clicking. There's no consideration phase. The homeowner calls whoever's first in the Map Pack. If that's not you, the job goes to a competitor while your phone sits quiet. We build the emergency-ready local presence that puts restoration companies at the top when disaster strikes: optimized GBP, fast-loading service pages, and the citation and review foundation Google trusts for high-stakes searches.",
    painPoints: [
      "Emergency searches convert in under 60 seconds — top-3 Map Pack visibility is non-negotiable",
      "Mold remediation, fire damage, and biohazard cleanup each need separate pages to rank",
      "Insurance-driven work requires ranking for 'insurance claim restoration' terms too",
      "24/7 service businesses need to signal availability in GBP and on-page content",
    ],
    whatYouGet: [
      "Emergency service page optimization (water, fire, mold, sewage, storm damage)",
      "24/7 availability signals in GBP and on-page content",
      "Map Pack optimization for urgent, near-me searches",
      "Insurance restoration content and keyword targeting",
      "Fast-loading, conversion-focused page structure",
    ],
    faqs: [
      {
        question: "How do restoration companies rank for emergency searches specifically?",
        answer:
          "Emergency searches trigger 'near me' intent — Google prioritizes GBP proximity, reviews, and local signals. We optimize all three, plus on-page signals like 24/7 availability and response time.",
      },
      {
        question: "Should mold remediation have its own page?",
        answer:
          "Absolutely. Mold remediation, fire damage restoration, and water damage each attract different search queries. Separate pages rank independently and capture more total traffic.",
      },
      {
        question: "Can you help rank for insurance restoration work?",
        answer:
          "Yes — 'insurance claim water damage [city]' and similar terms are high-value. We build pages targeting insurance-related searches alongside direct emergency queries.",
      },
      {
        question: "Does it help to show 24/7 availability in SEO?",
        answer:
          "Yes. GBP has specific fields for business hours — marking 24/7 helps for emergency searches. On-page signals like response time and availability also improve conversion rates from the traffic you earn.",
      },
    ],
  },
  {
    slug: "cleaning-company-seo",
    name: "Cleaning Companies",
    headline: "Local SEO for Cleaning Companies",
    title: "Local SEO for Cleaning Companies",
    description:
      "Cleaning is a repeat-business model that thrives on local search. We help residential and commercial cleaning companies rank for recurring and one-time service searches.",
    intro:
      "A cleaning company's best customer books monthly recurring service — but they find you through a one-time 'house cleaning near me' search. Converting that first booking into a long-term client starts with ranking for the right terms. We build the local SEO presence that gets cleaning companies in front of both residential homeowners looking for recurring service and commercial property managers booking regular office cleaning — with separate pages, separate keyword strategies, and a GBP profile that builds the trust needed for someone to hand over their home or office key.",
    painPoints: [
      "Recurring service contracts start with a single search — if you don't rank, you lose the lifetime value",
      "Commercial and residential cleaning searches are completely different — one strategy misses one market",
      "High search competition in cleaning means weak SEO = invisible business",
      "Reviews matter more in cleaning than almost any trade — customers need to trust you in their home",
    ],
    whatYouGet: [
      "Service pages for residential, commercial, deep cleaning, move-out, and recurring services",
      "GBP optimization with cleaning categories and service descriptions",
      "Trust-signal content including reviews strategy and team/process pages",
      "Local keyword targeting for each city you serve",
      "Recurring content to maintain rankings in competitive markets",
    ],
    faqs: [
      {
        question: "Should residential and commercial cleaning be separate pages?",
        answer:
          "Yes. 'Commercial office cleaning [city]' and 'house cleaning near me' are entirely different searches with different buyer intent. Separate pages rank for each independently and convert better.",
      },
      {
        question: "How do reviews affect cleaning company SEO?",
        answer:
          "Reviews are critical for cleaning — customers are inviting strangers into their home. High review volume and quality is both a Map Pack ranking signal and a direct conversion factor. We build a review acquisition workflow into your system.",
      },
      {
        question: "Can you help rank for move-out cleaning searches?",
        answer:
          "Absolutely. Move-out cleaning is a high-intent, time-sensitive service. A dedicated page targeting 'move-out cleaning [city]' captures renters with a hard deadline — these convert extremely well.",
      },
      {
        question: "What about Airbnb and short-term rental cleaning?",
        answer:
          "Short-term rental turnover cleaning is a growing and underserved search category. We build pages for this if it's part of your service mix — it's a strong growth opportunity.",
      },
    ],
  },
  {
    slug: "party-rental-seo",
    name: "Party Rental Companies",
    headline: "Local SEO for Party Rental Companies",
    title: "Local SEO for Party Rental Companies",
    description:
      "Bounce houses, tent rentals, tables and chairs — party rental searches are seasonal and local. We get rental companies ranking before the busy season so you're not scrambling for bookings.",
    intro:
      "Party rental bookings are driven by seasons, holidays, and school schedules — and the searches peak weeks before the event. By the time someone searches 'bounce house rental [city]' in late April, they're booking for June. If you're not already ranking, you miss the season. We build the local SEO foundation that gets party rental companies visible before peak periods: equipment-specific pages, local area targeting, and a GBP profile that turns searchers into booked reservations.",
    painPoints: [
      "Seasonal searches peak 4–8 weeks before the busy season — you need rankings before it starts",
      "Equipment-specific searches ('tent rental', 'bounce house rental', 'table chair rental') need separate pages",
      "Event planners and parents search differently — content must speak to both",
      "Photos and visual content are critical for rental conversions but often missing from SEO strategy",
    ],
    whatYouGet: [
      "Equipment-specific pages (bounce houses, tents, tables/chairs, concessions, inflatables)",
      "Seasonal content strategy timed to booking patterns",
      "GBP optimization with rental category photos and service descriptions",
      "Local area coverage pages for each city in your delivery zone",
      "Conversion-focused page structure with clear booking CTAs",
    ],
    faqs: [
      {
        question: "When should a party rental company start SEO before the busy season?",
        answer:
          "At least 3–4 months before your peak season. Rankings take time to build, and you want to be established before searchers start looking — not ramping up while you're already losing bookings.",
      },
      {
        question: "Should each rental category have its own page?",
        answer:
          "Yes. 'Bounce house rental [city]' and 'tent rental [city]' are separate searches with different audiences. Equipment-specific pages rank more effectively and convert better than a single generic rental page.",
      },
      {
        question: "Do you help with event venue and corporate event rentals?",
        answer:
          "Yes — corporate and event-planner clients search differently than parents renting a bounce house. We build the content strategy for each audience if your business serves both.",
      },
      {
        question: "How important are photos for party rental SEO?",
        answer:
          "Very. GBP photos with real equipment drive engagement and clicks. We advise on photo strategy as part of your GBP optimization — Google rewards active, visual profiles in local search.",
      },
    ],
  },
  {
    slug: "landscaping-seo",
    name: "Landscaping Companies",
    headline: "Local SEO for Landscaping Companies",
    title: "Local SEO for Landscaping Companies",
    description:
      "Landscaping is a high-LTV business won through local search. We help lawn care, landscaping design, and maintenance companies rank for recurring and project-based work.",
    intro:
      "Landscaping clients are worth thousands per year in recurring revenue — but they find you through a $0 organic search. The businesses booking the most profitable accounts (landscape design projects, commercial maintenance contracts, regular lawn care) are the ones showing up in the Map Pack when homeowners and property managers search. We build the local presence that fills your schedule with high-value recurring accounts, not just one-off calls.",
    painPoints: [
      "Seasonal demand spikes mean rankings need to be established before the busy season",
      "Lawn care, landscape design, and irrigation are separate services that need separate pages",
      "Commercial landscaping contracts require different keyword targeting than residential",
      "High-quality project photos are critical for conversion — and most companies don't optimize them for search",
    ],
    whatYouGet: [
      "Service pages for lawn care, landscaping design, hardscaping, irrigation, and maintenance",
      "GBP optimization with landscaping categories and portfolio photos",
      "Seasonal content strategy to capture spring and fall search surges",
      "Local targeting for each neighborhood and city in your service area",
      "Before/after project content that builds trust and supports rankings",
    ],
    faqs: [
      {
        question: "Should lawn care and landscaping design be separate pages?",
        answer:
          "Yes. Weekly lawn maintenance clients and homeowners planning a full landscape renovation search completely differently. Separate pages capture each intent and convert better.",
      },
      {
        question: "Can you help rank for commercial landscaping contracts?",
        answer:
          "Yes — commercial property managers search for maintenance bids differently than homeowners. We build content targeting commercial searches if that's part of your business.",
      },
      {
        question: "How do project portfolio photos help SEO?",
        answer:
          "Portfolio photos uploaded to GBP drive profile engagement — a strong signal for Map Pack rankings. On the website, they support time-on-page and internal linking. We advise on how to structure and label them for maximum SEO value.",
      },
      {
        question: "What's the ROI timeline for landscaping SEO?",
        answer:
          "Most landscaping clients see organic traffic and ranking gains in 45–90 days. Given the high lifetime value of recurring accounts, even 2–3 new clients per month can deliver a strong ROI within the first quarter.",
      },
    ],
  },
  {
    slug: "painter-seo",
    name: "Painting Contractors",
    headline: "Local SEO for Painting Contractors",
    title: "Local SEO for Painting Contractors",
    description:
      "Interior, exterior, commercial — painting leads come from local search. We help painting contractors rank for high-value project searches and build a steady pipeline without paid ads.",
    intro:
      "Painting projects are deliberate — homeowners plan them, research contractors, and compare options before booking. That research journey starts with a Google search, and the painters who win the most bids are the ones ranking when that research happens. Interior vs. exterior, residential vs. commercial, new construction vs. repaint — each service has its own search pattern. We build the page architecture and local authority that puts painting contractors in front of qualified buyers at every stage of their decision.",
    painPoints: [
      "Interior and exterior painting searches are separate — one page trying to rank for both underperforms on both",
      "Commercial painting contracts are high-value but require different keyword targeting and trust signals",
      "Painting projects are seasonal — spring and fall are peak, but most companies don't prepare their SEO ahead of time",
      "Customers research painters carefully before booking — thin websites with no content lose to competitors with depth",
    ],
    whatYouGet: [
      "Service pages for interior, exterior, commercial, cabinet painting, and specialty finishes",
      "GBP optimization with painting categories and portfolio photos",
      "Seasonal content timed to spring and fall booking surges",
      "Local targeting for residential neighborhoods and commercial districts",
      "Conversion-focused structure with estimate CTAs and trust signals",
    ],
    faqs: [
      {
        question: "Should interior and exterior painting be separate pages?",
        answer:
          "Yes. 'Interior painter [city]' and 'exterior house painting [city]' are separate searches with different buyer intent and timing. Dedicated pages rank independently and convert better.",
      },
      {
        question: "Can you help attract commercial painting contracts?",
        answer:
          "Yes — commercial clients search very differently than homeowners. We build dedicated commercial painting pages targeting property managers, HOAs, and commercial landlords if that's part of your business.",
      },
      {
        question: "How do before/after photos factor into painting SEO?",
        answer:
          "Before/after photos are critical for painting conversion — customers want to see the quality before hiring. Uploading them to GBP drives profile engagement, which is a Map Pack signal. On the site, they support portfolio pages that rank for location-based terms.",
      },
      {
        question: "Is paid search necessary, or can SEO replace it?",
        answer:
          "SEO can absolutely replace paid search for painting — the lead quality is often better since organic searchers are further along in their research. Most of our painting clients reduce or eliminate ad spend within 6 months as organic rankings build.",
      },
    ],
  },
  {
    slug: "restaurant-seo",
    name: "Restaurants & Hospitality",
    headline: "Local SEO for Restaurants & Hospitality",
    title: "Local SEO for Restaurants & Hospitality",
    description:
      "Restaurants, hotels, event venues, and vacation rentals all depend on local search. We help hospitality businesses rank for dining, lodging, and event searches — not just on Google but on Maps and AI search too.",
    intro:
      "Hospitality is built on local discovery — the couple searching 'restaurants near me' on a Friday night, the traveler checking 'boutique hotels in [city]', the event planner looking for 'private dining rooms for corporate events'. These high-intent searches happen millions of times daily, and the businesses that show up are the ones that get the reservation. Whether you're running a restaurant, a boutique hotel, a vacation rental, or an event venue, we build the local SEO presence that makes discovery happen — on Google, Google Maps, and increasingly on AI search tools like ChatGPT and Perplexity.",
    painPoints: [
      "Google Maps drives the majority of local restaurant and hotel discovery — weak GBP presence means empty tables",
      "Menu pages, event booking pages, and location pages each need separate SEO treatment",
      "Hospitality review signals (Google, Yelp, TripAdvisor) directly impact search rankings",
      "AI search tools like ChatGPT are now surfacing local dining and lodging recommendations — most businesses aren't optimized for this",
    ],
    whatYouGet: [
      "GBP optimization with hospitality-specific categories, menus, and attributes",
      "Local search content for dining, lodging, events, and group booking",
      "Review strategy across Google, Yelp, and TripAdvisor",
      "AI search visibility (entity optimization for ChatGPT, Perplexity, and AI Overviews)",
      "Event and private dining SEO for group and corporate bookings",
    ],
    faqs: [
      {
        question: "Does local SEO work for restaurants with multiple locations?",
        answer:
          "Yes — each location gets its own GBP and location page, with consistent NAP data across all directories. Multi-location strategy is one of our specialties.",
      },
      {
        question: "How important is GBP for restaurants vs. traditional website SEO?",
        answer:
          "For restaurants, GBP is arguably more important than the website — most reservations and directions come from Maps. We prioritize GBP optimization first, then build the website presence to support it.",
      },
      {
        question: "Can you help with event venue SEO for private dining and corporate events?",
        answer:
          "Yes. 'Private dining room [city]' and 'corporate event venue [city]' are high-value searches with dedicated searcher intent. We build pages that capture this traffic and convert it to bookings.",
      },
      {
        question: "What about boutique hotels and vacation rental SEO?",
        answer:
          "Boutique hotels and vacation rentals need both GBP optimization and strong website content targeting traveler searches. We've worked with hospitality businesses across Southern California and can tailor strategy to your property type.",
      },
    ],
  },
];
