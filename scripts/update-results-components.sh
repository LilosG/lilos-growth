#!/bin/bash
# Update all results components at once

# Backup originals
echo "Creating backups..."
cp src/components/results/LogoWall.astro src/components/results/LogoWall.astro.backup
cp src/components/results/StatCard.astro src/components/results/StatCard.astro.backup
cp src/components/results/FAQResults.astro src/components/results/FAQResults.astro.backup
cp src/components/results/CaseStudyCard.astro src/components/results/CaseStudyCard.astro.backup

echo "Updating components..."

# Update LogoWall.astro
cat > src/components/results/LogoWall.astro << 'EOF'
---
/**
 * LogoWall Component
 * Displays client logos in a clean grid matching site card patterns
 * Uses site-wide theme: rounded-3xl cards, proper spacing, no grayscale
 */

type LogoItem = {
  src?: string;
  href?: string;
  name?: string;
  alt?: string;
  width?: number;
  height?: number;
};

const { items = [] } = Astro.props as { items: LogoItem[] };

type LogoInput = LogoItem & {
  logo?: string;
  image?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
};

const normalize = (it: LogoInput) => {
  const rawSrc: string =
    typeof it?.src === "string"
      ? it.src
      : typeof it?.logo === "string"
        ? it.logo
        : typeof it?.image === "string"
          ? it.image
          : "";

  const src = rawSrc ? (rawSrc.startsWith("/") ? rawSrc : "/" + rawSrc.replace(/^\/+/, "")) : "";
  const name = String(it?.name ?? it?.title ?? it?.alt ?? "").trim();
  const alt = String((it?.alt ?? name) || "Client logo");
  const href = typeof it?.href === "string" ? it.href : "";
  const width = Number(it?.width ?? 200);
  const height = Number(it?.height ?? 80);

  return { src, name, alt, href, width, height };
};

const logos: LogoItem[] = items.map((item) => normalize(item));
---

<section aria-label="Client logos">
  <ul class="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-4">
    {
      logos.map((l) => (
        <li class="flex">
          <div class="flex w-full items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
            {l.src ? (
              l.href ? (
                <a href={l.href} class="inline-flex items-center justify-center" data-astro-prefetch>
                  <img
                    src={l.src}
                    alt={l.alt}
                    width={l.width}
                    height={l.height}
                    loading="lazy"
                    decoding="async"
                    class="h-12 w-auto object-contain opacity-90"
                  />
                </a>
              ) : (
                <img
                  src={l.src}
                  alt={l.alt}
                  width={l.width}
                  height={l.height}
                  loading="lazy"
                  decoding="async"
                  class="h-12 w-auto object-contain opacity-90"
                />
              )
            ) : (
              <span class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-600">
                {l.name || "Client"}
              </span>
            )}
          </div>
        </li>
      ))
    }
  </ul>
</section>
EOF

# Update StatCard.astro
cat > src/components/results/StatCard.astro << 'EOF'
---
/**
 * StatCard Component
 * Displays key statistics matching homepage stat card patterns
 * Uses site theme: rounded-3xl, proper padding, clear typography
 */

import type { ResultsStat } from "~/data/results";
const { stat } = Astro.props as { stat: ResultsStat };

type StatWithNote = ResultsStat & { note?: string };
const note = (stat as StatWithNote).note;
---

<figure
  class="flex h-full min-h-[140px] flex-col justify-center rounded-3xl border border-gray-100 bg-white px-6 py-6 shadow-md"
>
  <figcaption class="text-xs font-semibold uppercase tracking-wider text-gray-500">
    {stat.label}
  </figcaption>
  <div
    class="mt-2 font-heading text-4xl font-bold tracking-tight text-heading"
    aria-label={note ?? stat.value}
  >
    {stat.value}
  </div>
  {note && <p class="mt-2 text-sm text-gray-600">{note}</p>}
</figure>
EOF

# Update FAQResults.astro
cat > src/components/results/FAQResults.astro << 'EOF'
---
/**
 * FAQResults Component
 * FAQ accordion matching homepage FAQ styling patterns
 * Uses site theme: rounded-3xl cards, proper spacing, smooth transitions
 */

export interface Props {
  faqs: import("~/data/results").FaqItem[];
}
const { faqs = [] } = Astro.props;
---

<div class="space-y-6">
  {
    faqs.map((f) => (
      <details class="group rounded-3xl border border-gray-100 bg-white p-6 shadow-md [&[open]>summary_svg]:rotate-45">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <h3 class="font-heading text-base font-semibold text-heading">{f.q}</h3>
          <svg
            class="h-5 w-5 flex-shrink-0 text-primary transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </summary>
        <div class="mt-3 text-[15px] leading-relaxed text-body">{f.a}</div>
      </details>
    ))
  }
</div>
EOF

# Update CaseStudyCard.astro  
cat > src/components/results/CaseStudyCard.astro << 'EOF'
---
/**
 * CaseStudyCard Component
 * Displays client case studies with screenshots
 * Uses site theme: rounded-3xl, proper shadows, hover effects matching homepage cards
 */

import BrowserMockup from "~/components/ui/BrowserMockup.astro";

export interface Props {
  study: import("~/data/results").CaseStudy;
}
const { study } = Astro.props;

const kpis = Array.isArray(study.kpis) ? study.kpis.slice(0, 3) : [];
const primaryHref = study.ctaHref ?? "/contact";
const primaryText = study.ctaText ?? "See details";

const screenshot = study.screenshot?.src;
const websiteUrl = study.websiteUrl;
---

<article
  class="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
>
  <!-- Logo Header -->
  <header class="flex items-center gap-4 p-6 pb-4">
    <div
      class="flex h-12 w-[160px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white"
    >
      {
        study.image?.src ? (
          <img
            src={study.image.src}
            alt={study.image.alt ?? study.client}
            width="160"
            height="48"
            loading="lazy"
            decoding="async"
            class="max-h-10 w-auto object-contain opacity-90"
          />
        ) : (
          <span class="px-3 text-sm font-semibold text-gray-600">{study.client}</span>
        )
      }
    </div>
    <div class="min-w-0 flex-1">
      <h3 class="font-heading text-lg font-bold tracking-tight text-heading md:text-xl">
        {study.title ?? `${study.client} — ${study.city}`}
      </h3>
      <div class="mt-1.5 flex flex-wrap gap-2">
        {
          study.sectorTag && (
            <span class="inline-flex items-center rounded-full bg-bluelight px-3 py-0.5 text-xs font-semibold text-heading">
              {study.sectorTag}
            </span>
          )
        }
        {
          study.locationTag && (
            <span class="inline-flex items-center rounded-full bg-bluelight px-3 py-0.5 text-xs font-semibold text-heading">
              {study.locationTag}
            </span>
          )
        }
      </div>
    </div>
  </header>

  <!-- Website Screenshot -->
  {screenshot && websiteUrl && (
    <div class="px-6 pb-4">
      <BrowserMockup
        screenshot={screenshot}
        url={websiteUrl}
        alt={`${study.client} website`}
        loading="lazy"
      />
    </div>
  )}

  <!-- Content -->
  <div class="flex flex-1 flex-col px-6 pb-6">
    {
      kpis.length > 0 && (
        <ul class="flex flex-wrap gap-2">
          {kpis.map((k) => (
            <li class="inline-flex items-center rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm">
              <span class="font-bold text-heading">{k.value}</span>
              <span class="ml-1 text-gray-600">{k.label}</span>
              {k.sr && <span class="sr-only">{k.sr}</span>}
            </li>
          ))}
        </ul>
      )
    }

    {study.blurb && <p class="mt-4 text-[15px] leading-relaxed text-body">{study.blurb}</p>}

    <footer class="mt-auto flex items-center justify-between border-t border-gray-100 pt-5 mt-6">
      <span class="text-sm font-medium text-gray-500">Case study</span>
      <a
        href={primaryHref}
        data-astro-prefetch
        class="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 font-heading text-base font-semibold text-white shadow-md transition hover:bg-primaryHover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`${primaryText} for ${study.client}`}
      >
        {primaryText}
      </a>
    </footer>
  </div>
</article>
EOF

echo "✅ All components updated!"
echo "Backups saved with .backup extension"
echo "Run 'npm run dev' to see changes"
