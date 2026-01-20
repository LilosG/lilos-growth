// FILE: src/pages/results.astro

```astro
---
import PageLayout from "~/layouts/PageLayout.astro";

import LogoWall from "~/components/results/LogoWall.astro";
import StatCard from "~/components/results/StatCard.astro";
import CaseStudyCard from "~/components/results/CaseStudyCard.astro";
import TestimonialBand from "~/components/results/TestimonialBand.astro";
import ProcessStrip from "~/components/results/ProcessStrip.astro";
import FAQResults from "~/components/results/FAQResults.astro";
import StickyResultsCTA from "~/components/results/StickyResultsCTA.astro";
import ResultsCTABand from "~/components/results/ResultsCTABand.astro";
import SectionHeader from "~/components/ui/SectionHeader.astro";

import type {
  ResultsStat,
  LogoItem,
  CaseStudy,
  Testimonial,
  ProcessStep,
  FaqItem,
} from "~/data/results";
import { resultsStats, resultsLogos, resultsCaseStudies, resultsFaqs } from "~/data/results";

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Audit & prioritize",
    text: "Fix tracking, speed, and GBP first for quick wins.",
  },
  {
    step: "02",
    title: "Local SEO foundation",
    text: "Pages, internal links, and citations that actually rank.",
  },
  {
    step: "03",
    title: "Conversion tune-up",
    text: "Cleaner UX, better offers, and click-to-call everywhere.",
  },
  {
    step: "04",
    title: "Proof & reviews",
    text: "Show real results; build trust with review flywheels.",
  },
  {
    step: "05",
    title: "Scale what works",
    text: "Double-down on channels with the lowest blended CPL.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote: "They shipped fixes fast and our phones lit up the next month.",
    author: "Operations Manager",
    role: "Pest Control, FL",
  },
  {
    quote: "Site speed + GBP cadence was the unlock we needed.",
    author: "Owner",
    role: "Restoration, CA",
  },
  {
    quote: "Simple process, clear reporting, real results.",
    author: "Founder",
    role: "Handyman, CA",
  },
];

// JSON-LD ItemList for case studies (SEO)
const caseList = (resultsCaseStudies as CaseStudy[]).map((s, i) => ({
  "@type": "ListItem",
  position: i + 1,
  name: s.title ?? `${s.client} — ${s.city}`,
  url: s.ctaHref ?? "/contact",
}));
const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: caseList };
---

<PageLayout
  title="Client Results"
  description="Proof points, success stories, and how we get results."
>
  <main id="main" class="min-h-screen">
    <script type="application/ld+json" is:inline set:html={JSON.stringify(jsonLd)} />
    <script
      type="application/ld+json"
      is:inline
      set:html={JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (resultsFaqs as any[])
          .map((it: any) => {
            const q = String(it.q ?? it.question ?? it.title ?? "").trim();
            const a = String(it.a ?? it.answer ?? it.text ?? it.content ?? "").trim();
            return q && a
              ? { "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }
              : null;
          })
          .filter(Boolean),
      })}
    />
    <script
      type="application/ld+json"
      is:inline
      set:html={JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (resultsFaqs as any[])
          .map((it: any) => {
            const q = String(it.q ?? it.question ?? it.title ?? "").trim();
            const a = String(it.a ?? it.answer ?? it.text ?? it.content ?? "").trim();
            return q && a
              ? { "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }
              : null;
          })
          .filter(Boolean),
      })}
    />

    {
      /*
      FAQ JSON-LD (optional but recommended): builds from resultsFaqs robustly.
      It tolerates different key names (q/question/title and a/answer/text/content).
    */
    }
    <script
      type="application/ld+json"
      is:inline
      set:html={JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (resultsFaqs as FaqItem[])
          .map((it: any) => {
            const q = String(
              (it as any).q ?? (it as any).question ?? (it as any).title ?? ""
            ).trim();
            const a = String(
              (it as any).a ?? (it as any).answer ?? (it as any).text ?? (it as any).content ?? ""
            ).trim();
            return q && a
              ? { "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }
              : null;
          })
          .filter(Boolean),
      })}
    />

    <!-- HERO -->
    <section
      id="results-hero"
      class="relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden bg-[#253242] pb-20 pt-16"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#253242] to-[#2e4159]"
        aria-hidden="true"
      >
      </div>
      <div
        class="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 text-center"
      >
        <h1
          class="text-balance font-heading text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl"
        >
          Real Results for Home-Service Brands
        </h1>
        <span
          class="-mt-1 block text-xl font-semibold uppercase tracking-wider text-[#f56b2a] md:text-2xl"
        >
          Proof points, case studies &amp; how we deliver
        </span>
        <p class="max-w-2xl text-balance text-lg font-medium text-white/80 md:text-xl">
          Faster pages, conversion-ready UX, and a disciplined GBP + content cadence—so you get more
          booked jobs.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            data-astro-prefetch
            aria-label="Book a call to discuss a growth plan"
            class="inline-flex items-center rounded-3xl bg-[#f56b2a] px-8 py-4 font-heading text-lg font-semibold text-white shadow transition hover:bg-[#e85718] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f56b2a] focus-visible:ring-offset-2"
            data-evt="cta_results_book_call"
          >
            Book a Call
            <svg
              class="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 18l6-6-6-6"></path>
            </svg>
          </a>
          <a
            href="/services"
            data-astro-prefetch
            aria-label="See services we offer"
            class="inline-flex items-center rounded-3xl bg-secondary px-8 py-4 font-heading text-lg font-semibold text-white shadow transition hover:bg-[#27394b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2"
          >
            See Services
            <svg
              class="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 18l6-6-6-6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="bg-cream border-t border-gray-100 py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4">
        <h2 class="sr-only font-heading">Key outcomes</h2>
        <span class="mx-auto mt-2 block h-1 w-12 rounded bg-[#f56b2a]"></span>
        <div class="grid grid-cols-1 gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {(resultsStats as ResultsStat[]).map((stat) => <StatCard stat={stat} />)}
        </div>
      </div>
    </section>

    <!-- LOGO WALL -->
    <section class="border-t border-gray-100 bg-white py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4">
        <h2 class="text-center font-heading text-2xl font-bold text-heading md:text-3xl">
          Trusted by local service brands
        </h2>
        <LogoWall items={resultsLogos as LogoItem[]} />
      </div>
    </section>

    <!-- INLINE CTA -->
    <div id="results-inline-cta">
      <ResultsCTABand />
    </div>

    <!-- CASE STUDIES -->
    <section class="border-t border-gray-100 bg-white py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4">
        <SectionHeader title="Success Stories from Real Clients" accent="top" />
        <div
          id="results-grid"
          class="mt-10 grid auto-rows-fr grid-cols-1 items-stretch gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {(resultsCaseStudies as CaseStudy[]).map((study) => <CaseStudyCard study={study} />)}
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="bg-cream border-t border-gray-100 py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4">
        <TestimonialBand items={testimonials} />
      </div>
    </section>

    <!-- PROCESS -->
    <section class="border-t border-gray-100 bg-white py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="How We Get Results"
          subtitle="Exactly how we drive more local calls and booked jobs—with clear deliverables each sprint."
          accent="none"
        />
        <div class="mt-12">
          <ProcessStrip steps={processSteps} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="border-t border-gray-100 bg-white py-16 md:py-20">
      <div class="mx-auto max-w-4xl px-4">
        <SectionHeader title="FAQs" accent="top" />
        <div class="mt-8">
          <FAQResults faqs={resultsFaqs as FaqItem[]} />
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="bg-cream border-t border-gray-100 py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4 text-center">
        <SectionHeader
          title="Ready to turn searches into scheduled jobs?"
          subtitle="Get a tailored plan for your market—no long contracts, just clear movement in GBP, SEO, and conversions."
          accent="none"
        />
        <div class="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            data-astro-prefetch
            aria-label="Book a call"
            class="inline-flex items-center rounded-3xl bg-[#f56b2a] px-7 py-3 font-heading font-semibold text-white shadow transition hover:bg-[#e85718] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f56b2a] focus-visible:ring-offset-2"
            data-evt="cta_results_book_call"
          >
            Book a Call
          </a>
          <a
            href="/services"
            data-astro-prefetch
            aria-label="See services"
            class="inline-flex items-center rounded-3xl border border-gray-300 bg-white px-7 py-3 font-heading font-semibold text-heading shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          >
            See Services
          </a>
        </div>
      </div>
    </section>

    <StickyResultsCTA
      text="Ready to grow consistent, local leads?"
      primaryHref="/contact"
      primaryText="Book a Call"
      secondaryHref="/services"
      secondaryText="See Services"
    />
    <style>
      /* results inline CTA heading contrast */
      #results-inline-cta h1,
      #results-inline-cta h2,
      #results-inline-cta h3 {
        color: #fff !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
      }
    </style>
  </main>
</PageLayout>

<script type="application/ld+json" is:inline>
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lilosgrowth.com/" },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Results",
        "item": "https://lilosgrowth.com/results"
      }
    ]
  }
</script>
```
