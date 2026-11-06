import { industries } from "./industries";
import { locations } from "./locations";

export type MetroServiceKey = "web-design" | "google-business-profile-optimization";

export interface MetroServiceData {
  slug: string;
  service: MetroServiceKey;
  locationSlug: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  marketAngle: string;
  deliverables: string[];
  faqs: { question: string; answer: string }[];
}

export const metroServices: MetroServiceData[] = [
  // ---------------------------------------------------------------- Web design
  {
    slug: "web-design-san-diego",
    service: "web-design",
    locationSlug: "local-seo-san-diego",
    title: "Web Design for San Diego Businesses | Lilos Growth",
    description:
      "Fast, conversion-focused web design for San Diego businesses, built around coastal, North County, and inland service areas and the way customers reach you.",
    headline: "Web Design for San Diego Businesses",
    intro:
      "San Diego County stretches from the border communities up through North County and east into the inland valleys, and a business in Escondido rarely has the same customers as one in Chula Vista. A website that treats the whole county as one blob usually serves nobody well. We design sites for San Diego companies around the territory they actually cover, the services that pay the bills, and the first action a visitor should take, whether that is a call, a quote request, or a reservation. The result is a fast, clear site that states where you work and what you do in plain language, with a structure that gives local search something concrete to understand instead of a generic homepage.",
    marketAngle:
      "San Diego buyers compare options on a phone, often while standing in the situation that prompted the search: a leaking water heater in Vista, a rehearsal dinner venue near Little Italy, a restoration crew after a pipe burst in La Mesa. Tourism and a large military community also mean many visitors and newcomers arrive without a trusted provider in mind. Your site has to answer quickly who you are, which parts of the county you cover, and how to reach you. Coastal, North County, and East County customers think about distance differently, so the site should be honest about the areas you serve instead of claiming everything from Carlsbad to the border.",
    deliverables: [
      "Custom design built on a fast, modern framework rather than a heavy template",
      "Service pages structured around the jobs you want more of",
      "Mobile-first layouts with tap-to-call and short inquiry forms",
      "Service-area content that reflects where you genuinely work",
      "Technical SEO foundations including titles, headings, schema, and sitemaps",
      "Launch checks for speed, accessibility, and form delivery",
    ],
    faqs: [
      {
        question:
          "Should my San Diego website have separate pages for Carlsbad, Oceanside, and Chula Vista?",
        answer:
          "Only for the places you truly serve and can describe with substance. A North County contractor may justify pages for a few specific cities, while a business based near the border has a different footprint. We use your real routes and search data to decide, and we avoid thin pages that only swap a city name.",
      },
      {
        question: "Can you design for a restaurant or venue as well as for a trade business?",
        answer:
          "Yes. A hospitality site needs menus, hours, and reservation or event inquiry paths, while a plumber's site needs services, coverage, and a fast call button. We shape the structure around how each type of San Diego customer decides.",
      },
      {
        question: "Will you rebuild my site or improve the one I have?",
        answer:
          "It depends on the audit. If the current site has a sound structure and only needs better pages or speed fixes, we say so. If the foundation is holding the business back, we explain why a rebuild makes sense and what it would involve.",
      },
      {
        question: "Does a new San Diego website guarantee more calls?",
        answer:
          "No design can guarantee a result. A clearer, faster site with accurate service-area content removes common obstacles, and we set up tracking so you can see how visitors contact you and where they drop off.",
      },
    ],
  },
  {
    slug: "web-design-los-angeles",
    service: "web-design",
    locationSlug: "local-seo-los-angeles",
    title: "Web Design for Los Angeles Businesses | Lilos Growth",
    description:
      "Web design for Los Angeles businesses: fast, mobile-first sites that explain exactly which neighborhoods you serve across the Valley, Westside, and South Bay.",
    headline: "Web Design for Los Angeles Businesses",
    intro:
      "Greater Los Angeles is so large and so dependent on driving time that customers think in terms of neighborhoods and corridors, not one giant city. Someone in Pasadena looking for a contractor does not want a company that mostly works in Torrance, and traffic makes that distance feel even longer. A good Los Angeles website therefore has to say plainly which areas you cover, present each service without clutter, and load fast on a phone in the middle of a busy day. We design and build sites for LA businesses around those realities. We map your real service territory, organize the pages to match it, and make the next step obvious for every kind of visitor who lands on the site.",
    marketAngle:
      "In Los Angeles, the distance between two points on a map says little about the time it takes to travel, so customers quietly filter providers by how close they seem. Your website can either confirm a fit or create doubt. Clear coverage statements, recognizable neighborhood and city names, and fast mobile pages help a searcher in Burbank or Culver City decide you are the right call. The market also spans many communities and languages, so the site should be easy to read, simple to navigate, and open to bilingual content where it will serve your customers. Strong competition from larger brands makes a vague homepage an expensive choice.",
    deliverables: [
      "Custom design built on a fast, modern framework rather than a heavy template",
      "Service pages structured around the jobs you want more of",
      "Territory pages that match your real routes across LA sub-markets",
      "Mobile layouts tuned for quick calls and short quote forms",
      "Optional bilingual page planning where it serves your customers",
      "Technical SEO foundations including titles, headings, schema, and sitemaps",
    ],
    faqs: [
      {
        question: "How do you handle a site for a business that serves several parts of LA?",
        answer:
          "We group your coverage into sensible territories, such as the San Fernando Valley, the Westside, or the South Bay, and build pages that describe each honestly. That is clearer for visitors than one long list of neighborhood names.",
      },
      {
        question: "Do I need Spanish-language pages on my Los Angeles site?",
        answer:
          "Not always, but it is worth discussing. If a meaningful share of your customers prefer Spanish, translated service pages and contact options can help. We plan it as real content rather than machine-translated filler.",
      },
      {
        question:
          "Can a smaller Los Angeles company compete with national brands through its website?",
        answer:
          "A site cannot erase a larger competitor's budget, but it can make your specifics easier to see: the neighborhoods you work in, the services you do best, and how fast you respond. Clear local detail is something big brands often lack.",
      },
      {
        question: "How long does a Los Angeles web design project take?",
        answer:
          "That depends on the number of service and territory pages and how quickly content and approvals come back. We give a realistic timeline after the audit and scoping call instead of quoting one up front.",
      },
    ],
  },
  {
    slug: "web-design-orange-county",
    service: "web-design",
    locationSlug: "local-seo-orange-county",
    title: "Web Design for Orange County Businesses | Lilos Growth",
    description:
      "Polished, fast web design for Orange County businesses that need to look credible to homeowners in Irvine, Newport Beach, Anaheim, and the surrounding cities.",
    headline: "Web Design for Orange County Businesses",
    intro:
      "Orange County homeowners tend to research a company carefully before they call, and in a county known for well-kept homes and master-planned communities, a dated or confusing website sends them to the next result. We design Orange County sites to look credible at a glance and to answer practical questions quickly: what you do, where you work, and what happens after someone reaches out. The structure follows your real service area, which may be concentrated in North County around Anaheim and Fullerton or in the southern cities near Mission Viejo, and the pages explain your work with enough detail to build confidence without padding. Everything is built for speed on mobile devices, with clear paths to call or request an estimate.",
    marketAngle:
      "Orange County customers often hire for projects that matter to them, such as a remodel, a roof, or a landscape redesign, and they judge a company partly by how professional it looks online before any conversation happens. In a county of tidy suburbs and strong neighborhood identities, details like accurate city names, clear project descriptions, and photography that fits the work signal care. Homeowners in Irvine, Newport Beach, and Yorba Linda may also expect different tones. A site that feels generic or neglected reads as a risk, while a clean, specific one helps you stand out among many capable competitors who all claim to be the best.",
    deliverables: [
      "Custom design that reflects the quality of your work, not a stock template",
      "Project and service pages that explain scope, process, and expectations",
      "Gallery and photo layouts optimized for speed",
      "City and service-area content for the Orange County communities you serve",
      "Estimate request forms designed to qualify inquiries",
      "Technical SEO foundations including titles, headings, schema, and sitemaps",
    ],
    faqs: [
      {
        question: "How polished does my Orange County website need to be?",
        answer:
          "Polished enough that a careful homeowner feels confident, which usually means clean design, clear photos, and straightforward writing rather than elaborate effects. We aim for credibility and speed, not decoration for its own sake.",
      },
      {
        question: "Can the site reflect both North and South Orange County?",
        answer:
          "Yes. If you work in both, we organize the pages so visitors in Fullerton and visitors in Laguna Niguel each see that you serve their area, with content that is genuinely different instead of repeated.",
      },
      {
        question: "What kinds of Orange County businesses do you build sites for?",
        answer:
          "Mostly home service and trade companies, plus other local businesses whose customers research before contacting them. We scope each site around the specific business and its customers.",
      },
      {
        question: "Will new photos or project galleries slow my site down?",
        answer:
          "Not if they are prepared properly. We compress and size images, load them efficiently, and test speed before launch so a strong gallery does not cost you visitors on mobile.",
      },
    ],
  },
  {
    slug: "web-design-las-vegas",
    service: "web-design",
    locationSlug: "local-seo-las-vegas",
    title: "Web Design for Las Vegas Businesses | Lilos Growth",
    description:
      "Web design for Las Vegas businesses: fast, mobile-ready sites built for newcomers, summer emergencies, and customers across Henderson and Summerlin.",
    headline: "Web Design for Las Vegas Businesses",
    intro:
      "Las Vegas customers come in several kinds. There are long-time residents, a steady stream of newcomers who have not yet found a plumber or an air conditioning company, and visitors or event planners who need something right now. A Las Vegas website has to work for all of them without making anyone hunt for a phone number. We design and build sites for Las Vegas businesses around the way the valley actually works: communities like Henderson and Summerlin that people search by name, emergencies that happen in the middle of a hot night, and hospitality or event work that depends on quick, confident booking. Pages are fast, plainly written, and organized around your services and the areas you cover, so nobody has to dig for answers.",
    marketAngle:
      "The Las Vegas valley runs on speed. When cooling fails in July or a pipe bursts late at night, the person searching will usually call the first business that looks real and answers quickly. Your site needs to confirm hours, coverage, and contact options within seconds. Rapid growth also brings new residents who rely on search results instead of word of mouth, and many of them live in master-planned communities they refer to by name. Because the local economy includes round-the-clock hospitality and event work, a site may also need to speak to commercial clients who want proof of professionalism before they commit.",
    deliverables: [
      "Custom design built on a fast, modern framework rather than a heavy template",
      "Emergency and after-hours service sections with prominent call options",
      "Service pages structured around the jobs you want more of",
      "Community and service-area content for the valley areas you cover",
      "Commercial and event inquiry paths where relevant",
      "Technical SEO foundations including titles, headings, schema, and sitemaps",
    ],
    faqs: [
      {
        question: "What should a Las Vegas HVAC or plumbing website do first?",
        answer:
          "Show a clear phone number, hours, and the areas you serve at the top of every page. During heat waves and late-night emergencies, visitors decide in seconds, so the site should remove any doubt about whether you can help them now.",
      },
      {
        question: "Do I need pages for Henderson and Summerlin separately?",
        answer:
          "If you serve them and there is search demand, dedicated pages can help, because residents often search by community name. We keep each page specific and useful instead of copying one page with different names.",
      },
      {
        question: "Can you build a site for a hospitality or event business in Las Vegas?",
        answer:
          "Yes. Those sites focus on booking, capacity, or event details and on proof that you can deliver on a deadline. We design the flow around how planners and guests actually reach out.",
      },
      {
        question: "Can you promise that a new site will bring more Las Vegas customers?",
        answer:
          "No, and nobody honestly can. We build a faster, clearer site, set up measurement, and report on how visitors contact you so decisions are based on real data.",
      },
    ],
  },
  {
    slug: "web-design-phoenix",
    service: "web-design",
    locationSlug: "local-seo-phoenix",
    title: "Web Design for Phoenix Businesses | Lilos Growth",
    description:
      "Web design for Phoenix businesses: fast, mobile-first sites with suburb-level service content for Scottsdale, Mesa, Chandler, Gilbert, and the wider Valley.",
    headline: "Web Design for Phoenix Businesses",
    intro:
      "The Phoenix Valley is a patchwork of sizable suburbs, and the people who live in them usually search using their own city names. A website that only says Phoenix can miss the homeowner in Queen Creek or Peoria who is looking for someone nearby. We build sites for Valley businesses around that reality, starting with a map of the suburbs you truly serve and the services you want to sell. The design stays quick and clear, because many visitors arrive from a phone while dealing with something urgent, like an air conditioner that stopped or a pest problem in the house. You get plain language, strong calls to action, and page structure that lets search engines understand exactly how far your reach extends across the Valley.",
    marketAngle:
      "In Phoenix, urgency is seasonal and hard to ignore. When temperatures climb, searches for cooling repair, pool service, and pest control become immediate, and monsoon storms can bring sudden roof and cleanup needs. The visitor on your site is often uncomfortable and wants a fast answer. A page that loads slowly or buries the phone number loses that person to a competitor. The Valley's size matters too: drivers think about suburbs, not the central city, so the site should name Gilbert, Glendale, or Scottsdale only where you genuinely work, and present each service area with enough substance to be trusted.",
    deliverables: [
      "Custom design built on a fast, modern framework rather than a heavy template",
      "Click-to-call and quick-quote elements placed for urgent, mobile visitors",
      "Suburb-level service-area pages for the Valley cities you serve",
      "Seasonal service sections for cooling, pool, pest, or storm-related work",
      "Service pages structured around the jobs you want more of",
      "Technical SEO foundations including titles, headings, schema, and sitemaps",
    ],
    faqs: [
      {
        question: "Why not just have one Phoenix page for the whole Valley?",
        answer:
          "Because Valley residents often search by suburb, and one broad page rarely reflects that. We recommend separate pages only for suburbs you actually serve, and we keep each page substantive rather than repetitive.",
      },
      {
        question: "How do you design a site for seasonal Arizona demand?",
        answer:
          "We make the most urgent services easy to find and keep the contact path short. Seasonal sections can be updated as demand shifts, so visitors in June see the services they need most.",
      },
      {
        question: "Does the site need to load fast even on weak connections?",
        answer:
          "Yes. Many visitors arrive on phones, sometimes in the middle of a problem, so we optimize images, scripts, and layout and test performance before launch.",
      },
      {
        question: "Can you tell me which Phoenix suburbs deserve their own page?",
        answer:
          "We can help you decide using your real service area, your crews' routes, and search data. The goal is to cover the places that matter without creating pages that exist only for keywords.",
      },
    ],
  },
  {
    slug: "web-design-dallas",
    service: "web-design",
    locationSlug: "local-seo-dallas",
    title: "Web Design for Dallas Businesses | Lilos Growth",
    description:
      "Web design for Dallas-Fort Worth businesses: fast sites with city-level service content for Plano, Frisco, Irving, Arlington, and storm-driven search demand.",
    headline: "Web Design for Dallas Businesses",
    intro:
      "Dallas-Fort Worth works less like a single city and more like a cluster of them, each with its own identity and loyal residents. A roofer who covers Plano, Garland, and Arlington serves three distinct audiences, and a site that treats them as one can feel anonymous to all of them. We design websites for DFW businesses by starting with your actual territory and the work you want, then building pages that explain each service and each area in clear, confident language. The site is quick on mobile, easy to navigate, and prepared for the moments when searches spike, such as after a hailstorm, when homeowners need clear information and a simple way to get an inspection or estimate without calling five companies first.",
    marketAngle:
      "North Texas weather shapes the local web. After a hailstorm, homeowners search for roof inspections, storm damage help, and restoration within hours, and many are unsure how the insurance process works. A DFW website can earn trust by explaining that process in plain terms and making it easy to book an inspection. The metroplex structure matters as well: Dallas and Fort Worth have different neighborhoods and search habits, and suburbs such as Frisco, Allen, and McKinney are searched by name. A site that clearly separates these areas, and shows you actually serve them, helps customers feel they are dealing with a nearby company.",
    deliverables: [
      "Custom design built on a fast, modern framework rather than a heavy template",
      "Storm-damage, inspection, and emergency service pages with clear next steps",
      "City-level pages for the DFW communities you genuinely serve",
      "Plain-language explanations of your estimate and claim-related process",
      "Mobile layouts with prominent call and inspection request options",
      "Technical SEO foundations including titles, headings, schema, and sitemaps",
    ],
    faqs: [
      {
        question: "How should a Dallas roofing website handle storm season?",
        answer:
          "It should be ready before storms, with clear inspection and storm-damage pages, accurate coverage areas, and a quick request form. We also explain what homeowners can expect, which helps them take the next step.",
      },
      {
        question: "Do Dallas and Fort Worth need separate pages on my site?",
        answer:
          "If you serve both, usually. The areas have different neighborhoods and customer habits, so separate pages with real, distinct detail tend to serve visitors better than one combined page.",
      },
      {
        question: "Which DFW suburbs should I include?",
        answer:
          "The ones you genuinely serve and can describe well. We look at your routes and search demand rather than listing every city in the metroplex, since thin pages add little.",
      },
      {
        question: "Can you explain insurance claims on my site?",
        answer:
          "We can help present your process clearly, such as inspections, documentation, and how you work with homeowners. We do not give legal or insurance advice, and the content should reflect what your business actually does.",
      },
    ],
  },
  // ------------------------------------------------ Google Business Profile
  {
    slug: "google-business-profile-optimization-san-diego",
    service: "google-business-profile-optimization",
    locationSlug: "local-seo-san-diego",
    title: "Google Business Profile Management in San Diego",
    description:
      "Google Business Profile management for San Diego businesses: accurate service areas, categories, photos, posts, and review replies for coast and inland.",
    headline: "Google Business Profile Optimization for San Diego Businesses",
    intro:
      "For many San Diego customers, the Google Business Profile is the first thing they see, sometimes before they ever reach your website. A restaurant in Little Italy, an electrician serving Escondido, and a specialist supplier in Kearny Mesa all use the same tool, but they need very different setups. We manage San Diego profiles with attention to how the business really operates: whether customers visit a location or you travel to them, which categories describe the work accurately, and which photos, services, and posts give a searcher a true picture. We keep information consistent with your website, respond to reviews in a professional voice, and report on profile activity so you can see what people do after they find you.",
    marketAngle:
      "San Diego's geography makes profile accuracy matter. Coastal, North County, and inland customers all search near where they are, and a profile that lists the wrong service area or an out-of-date address can lose a call before it starts. A service-area business may travel across several cities, while a restaurant or shop depends on a precise pin and correct hours. A year-round stream of visitors, military families who relocate, and new residents means many searchers have no personal referral to rely on and read profiles closely. Photos, review replies, and clear service listings help them decide quickly whom to trust.",
    deliverables: [
      "Profile audit covering categories, services, attributes, and service areas",
      "Optimization of business description, products, and service listings",
      "Photo planning and upload guidance",
      "Regular post publishing and Q&A monitoring",
      "Professional review replies and a simple process for requesting reviews",
      "Monthly reporting on profile views, calls, and direction requests",
    ],
    faqs: [
      {
        question: "Should my San Diego profile show an address or hide it?",
        answer:
          "It depends on how you serve customers. If people visit you, show the address. If you travel to them, Google allows hiding it and listing service areas instead. We help you follow Google's guidelines and choose the setup that matches reality.",
      },
      {
        question: "How many San Diego cities can I list as service areas?",
        answer:
          "List the places you genuinely serve. Google allows a limited number of areas, and adding cities you do not reach can create confusion. We help you pick areas based on actual routes and demand.",
      },
      {
        question: "Can you manage profiles for a restaurant with several locations?",
        answer:
          "Yes. Each location needs its own accurate details, hours, and photos, plus consistent naming. We maintain them separately while keeping the brand consistent.",
      },
      {
        question: "Will profile management guarantee Map Pack placement in San Diego?",
        answer:
          "No. Placement depends on many factors, including distance, relevance, and prominence. We improve what is in your control and report on results honestly.",
      },
    ],
  },
  {
    slug: "google-business-profile-optimization-los-angeles",
    service: "google-business-profile-optimization",
    locationSlug: "local-seo-los-angeles",
    title: "Google Business Profile Management in Los Angeles",
    description:
      "Google Business Profile management for Los Angeles businesses: neighborhood-aware service areas, categories, photos, posts, and review replies.",
    headline: "Google Business Profile Optimization for Los Angeles Businesses",
    intro:
      "In Los Angeles, searchers see local results that feel unusually crowded, and Google weighs how close a business is to the person searching. That makes a profile's setup especially important. A contractor based in the Valley and a shop in Silver Lake are visible in very different ways, and a profile that overstates its reach can attract calls it cannot serve. We manage Los Angeles profiles with the geography in mind. We confirm your address or service-area configuration, select categories that fit the work, and keep services, hours, and photos accurate. We also handle review replies and regular updates, and we report on calls and direction requests so you can judge how the listing performs over time rather than guessing from a handful of calls.",
    marketAngle:
      "Because Los Angeles spans so many distinct communities, proximity plays an outsized role in local results. A profile can look strong and still appear mainly near the address on file. That is why accurate address handling, realistic service areas, and clear categories matter more here than broad claims. The sheer number of competitors also means small details, such as complete services, current photos, and thoughtful review responses, help a listing stand out. Multilingual customers add another layer: where it fits your clientele, profile content and replies can be written to be welcoming to Spanish-speaking customers as well.",
    deliverables: [
      "Profile audit covering categories, services, attributes, and service areas",
      "Address and service-area setup aligned with Google's guidelines",
      "Optimization of business description and service listings",
      "Photo planning and regular post publishing",
      "Review monitoring with professional replies",
      "Monthly reporting on profile views, calls, and direction requests",
    ],
    faqs: [
      {
        question: "Why does my Los Angeles listing show up mostly near my own address?",
        answer:
          "Google gives significant weight to distance from the searcher. A profile often appears most strongly close to its location. We cannot change geography, but we can make sure your setup, categories, and content support the areas you serve.",
      },
      {
        question: "Can I add every LA neighborhood to my service area?",
        answer:
          "It is better to list the places you truly cover. Overly broad areas can blur your profile and create inquiries you cannot fulfill, so we pick areas that match your routes.",
      },
      {
        question: "How do you handle reviews in a competitive market like LA?",
        answer:
          "We reply to each review professionally and consistently, and we set up a simple, compliant process for asking customers to leave feedback. We do not buy reviews or use gating tactics.",
      },
      {
        question: "Can you write replies in Spanish?",
        answer:
          "Where it suits your customers, yes. We discuss language needs during onboarding and keep replies natural and respectful.",
      },
    ],
  },
  {
    slug: "google-business-profile-optimization-orange-county",
    service: "google-business-profile-optimization",
    locationSlug: "local-seo-orange-county",
    title: "Google Business Profile Management in Orange County",
    description:
      "Google Business Profile management for Orange County businesses: accurate cities, categories, photos, posts, and review replies for discerning homeowners.",
    headline: "Google Business Profile Optimization for Orange County Businesses",
    intro:
      "Orange County homeowners often read a Google Business Profile closely before they pick up the phone, scanning photos, services, and what past customers have said. Because the county is a chain of established cities with strong local identities, the profile should show clearly where you work and what kind of projects you do. We manage Orange County profiles by confirming your category choices, completing services and attributes, and presenting photos that represent real work. We write consistent descriptions that match your website, respond to every review with care, and publish regular updates. Each month we share what we see in profile views, calls, and direction requests, so you can judge the profile on actual activity instead of impressions alone, and adjust what we do together.",
    marketAngle:
      "Orange County projects tend to be considered purchases, such as a roof, a repaint, or a landscape plan, and homeowners usually review several profiles side by side. The presentation of your listing therefore matters: complete services, real project photos, and thoughtful responses to reviews signal reliability. The county's many separate cities, from Anaheim to Laguna Niguel, also mean that service-area accuracy is important, because a company that covers only part of the county can frustrate customers by implying otherwise. Newport Beach, Irvine, and Yorba Linda residents may expect different kinds of service, and your profile can reflect that nuance.",
    deliverables: [
      "Profile audit covering categories, services, attributes, and service areas",
      "Service and product listings that describe real project types",
      "Photo planning with guidance on capturing finished work",
      "Regular posts and Q&A monitoring",
      "Review replies and a compliant process for requesting feedback",
      "Monthly reporting on profile views, calls, and direction requests",
    ],
    faqs: [
      {
        question: "What kind of photos work best on an Orange County profile?",
        answer:
          "Clear, recent photos of real projects, your team, and your vehicles or location tend to build the most trust. We give you a simple shot list and review what is uploaded.",
      },
      {
        question: "Should I list many Orange County cities as service areas?",
        answer:
          "Only the cities you actually cover. Listing places you cannot reach reduces trust, so we choose areas based on your real routes and work.",
      },
      {
        question: "Can you help if I have a few negative reviews?",
        answer:
          "Yes. We help you respond calmly and factually, which shows prospective customers how you handle problems. We cannot remove honest reviews, but we can flag ones that break Google's rules.",
      },
      {
        question: "How often do you update the profile?",
        answer:
          "We check it regularly, publish updates on an agreed schedule, and revise services, hours, and photos when something changes in your business.",
      },
    ],
  },
  {
    slug: "google-business-profile-optimization-las-vegas",
    service: "google-business-profile-optimization",
    locationSlug: "local-seo-las-vegas",
    title: "Google Business Profile Management in Las Vegas",
    description:
      "Google Business Profile management for Las Vegas businesses: accurate hours, service areas, photos, and review replies for urgent and after-hours searches.",
    headline: "Google Business Profile Optimization for Las Vegas Businesses",
    intro:
      "A large share of Las Vegas searches are urgent or time-sensitive. People look for a business that is open right now, close enough to arrive soon, and visibly real. Your Google Business Profile carries much of that burden, so accuracy about hours, service areas, and contact details counts for a lot. We manage Las Vegas profiles with those moments in mind. We check that hours, including special and holiday hours, are correct, that categories match your work, and that photos and services give a true impression. We also respond to reviews, publish regular updates, and track calls and direction requests, so you can see whether the profile is doing the job on the nights and weekends when it matters most.",
    marketAngle:
      "Las Vegas never really slows down, and neither do its searchers. Air conditioning fails on holiday weekends, hospitality staff work odd hours, and event planners look for vendors at short notice. If your profile shows the wrong hours or a stale phone number, you lose those customers immediately. Service-area businesses also cover a wide valley, from Summerlin to Henderson, so listing real coverage is essential. Newcomers who have just moved to town depend heavily on profile photos, ratings, and review replies, since they have no existing relationships to lean on. Clear details help them choose with confidence.",
    deliverables: [
      "Profile audit covering categories, services, attributes, and service areas",
      "Hours management including holiday and after-hours settings",
      "Service listings written for urgent and scheduled work",
      "Photo planning and regular post publishing",
      "Review replies with a compliant feedback request process",
      "Monthly reporting on profile views, calls, and direction requests",
    ],
    faqs: [
      {
        question: "How should I handle after-hours calls on my Las Vegas profile?",
        answer:
          "List your real hours and, if you offer emergency service, describe it clearly in the services and description. Never advertise availability you cannot provide, because it leads to bad reviews.",
      },
      {
        question: "Does Google let me list Henderson and Summerlin as service areas?",
        answer:
          "Yes, for service-area businesses, as long as you genuinely serve them. We choose areas that match your routes so the profile reflects reality.",
      },
      {
        question: "Can you manage a profile for a hospitality or event business?",
        answer:
          "Yes. We focus on accurate hours, photos, menus or services, and booking links, because those details drive decisions for guests and planners.",
      },
      {
        question: "Will you guarantee my Las Vegas profile ranks first?",
        answer:
          "No. We improve accuracy, completeness, and engagement, and we report honestly on results. Placement is determined by Google.",
      },
    ],
  },
  {
    slug: "google-business-profile-optimization-phoenix",
    service: "google-business-profile-optimization",
    locationSlug: "local-seo-phoenix",
    title: "Google Business Profile Management in Phoenix",
    description:
      "Google Business Profile management for Phoenix businesses: realistic Valley service areas, categories, photos, and review replies for urgent summer searches.",
    headline: "Google Business Profile Optimization for Phoenix Businesses",
    intro:
      "Phoenix customers searching on a hot afternoon rarely compare ten options. They tap the profiles that look current, nearby, and trustworthy, and call. We manage Phoenix-area profiles so those first impressions are accurate. That begins with a clear decision on whether to show an address or to list service areas, and which Valley suburbs to include. We then align categories, services, attributes, and descriptions with how you actually work, keep hours and contact details current, and add photos that show real jobs. We also respond to reviews and publish regular updates, and we report on calls and direction requests each month so you can see how the listing performs through the busiest and quietest parts of the year, including the stretch when the heat peaks.",
    marketAngle:
      "The Valley's size makes service-area choices more consequential than in a compact city. A cooling or pest company can easily be asked to cover Scottsdale, Surprise, and Queen Creek in the same week, and a profile that implies full-metro coverage may bring calls that cannot be served profitably. Seasonality adds pressure: during the hottest months, a profile with incomplete information or unanswered reviews quickly loses ground to one that looks active. Monsoon-season storms can also trigger sudden demand for roof and cleanup work, so updating hours and services promptly helps. Accuracy builds the trust that urgent searchers need.",
    deliverables: [
      "Profile audit covering categories, services, attributes, and service areas",
      "Service-area setup focused on the Valley suburbs you actually reach",
      "Seasonal service updates and post scheduling",
      "Photo planning and upload guidance",
      "Review replies with a compliant feedback request process",
      "Monthly reporting on profile views, calls, and direction requests",
    ],
    faqs: [
      {
        question: "Which Valley suburbs should I list on my Phoenix profile?",
        answer:
          "Those you can serve reliably and profitably. Listing every suburb can attract calls you cannot take, so we choose based on routes, response capacity, and where your best work comes from.",
      },
      {
        question: "Should I post differently during the summer months?",
        answer:
          "Yes. Posts and service descriptions can emphasize the work in highest demand, such as cooling, pool, or pest services, while keeping hours and details current. We schedule updates around the seasons.",
      },
      {
        question: "How quickly should I answer reviews?",
        answer:
          "Promptly and politely. Timely, specific replies show future customers that someone is paying attention, and we handle them in your voice with your approval where needed.",
      },
      {
        question: "Can I change my category later?",
        answer:
          "Yes, and it is common to refine categories after an audit. We pick the primary category that best matches your main service and add secondary ones where they are accurate.",
      },
    ],
  },
  {
    slug: "google-business-profile-optimization-dallas",
    service: "google-business-profile-optimization",
    locationSlug: "local-seo-dallas",
    title: "Google Business Profile Management in Dallas",
    description:
      "Google Business Profile management for Dallas-Fort Worth businesses: accurate service areas, categories, photos, review replies, and storm-season updates.",
    headline: "Google Business Profile Optimization for Dallas Businesses",
    intro:
      "A Google Business Profile in Dallas-Fort Worth has to do two jobs: it must show the right city to the right searcher, and it must be ready when conditions change quickly. The metroplex includes many cities, and homeowners usually search with the one they live in. We manage Dallas-area profiles by confirming whether your setup should show a location or service areas, choosing realistic cities, and matching categories and services to your work. We keep descriptions, hours, and photos accurate, answer reviews, and publish regular updates. When storm season hits, we help you reflect inspection, damage, and emergency services accurately, and we report on calls and direction requests monthly so you can see what the profile actually produces and where it needs work.",
    marketAngle:
      "North Texas storms can create demand in a single afternoon. After hail or high winds, residents search for roofing, restoration, and repair help, and they tend to trust profiles that look active, specific, and well reviewed. DFW also has a geographic split between Dallas and Fort Worth that a profile should respect, because covering both from one location may require careful service-area choices. Suburbs like Plano, Irving, and Arlington are searched by name, so a profile that lists the cities you truly serve helps customers see a good fit and helps you avoid calls from places outside your range.",
    deliverables: [
      "Profile audit covering categories, services, attributes, and service areas",
      "DFW service-area setup reflecting the cities you actually cover",
      "Storm and emergency service listings kept accurate and current",
      "Photo planning and regular post publishing",
      "Review replies with a compliant feedback request process",
      "Monthly reporting on profile views, calls, and direction requests",
    ],
    faqs: [
      {
        question: "How do I update my Dallas profile after a major storm?",
        answer:
          "Confirm your hours and services, add or update posts about storm-damage and inspection work, and make sure contact details are correct. We help you do this quickly and accurately, without overstating availability.",
      },
      {
        question: "Can one profile cover both Dallas and Fort Worth?",
        answer:
          "A service-area business can list both if it truly serves them, but a profile still shows most strongly near its address. We set expectations and choose areas carefully rather than listing everything.",
      },
      {
        question: "Do suburbs like Plano and Frisco need to be listed separately?",
        answer:
          "They can be listed as service areas if you cover them. We focus on the cities that matter most to your work and avoid long lists that dilute the profile.",
      },
      {
        question: "Can a Dallas profile guarantee more calls?",
        answer:
          "No. Our work improves accuracy, completeness, and responsiveness, and we report on calls and requests so you can see the results.",
      },
    ],
  },
];

// Build-time integrity checks: fail the build rather than ship broken or colliding routes.
const locationSlugs = new Set(locations.map((location) => location.slug));
const industrySlugs = new Set(industries.map((industry) => industry.slug));
const seenSlugs = new Set<string>();

for (const page of metroServices) {
  if (!locationSlugs.has(page.locationSlug)) {
    throw new Error(
      `metroServices: "${page.slug}" references unknown locationSlug "${page.locationSlug}"`
    );
  }
  if (locationSlugs.has(page.slug) || industrySlugs.has(page.slug)) {
    throw new Error(`metroServices: slug "${page.slug}" collides with a location or industry slug`);
  }
  if (seenSlugs.has(page.slug)) {
    throw new Error(`metroServices: duplicate slug "${page.slug}"`);
  }
  seenSlugs.add(page.slug);
}
