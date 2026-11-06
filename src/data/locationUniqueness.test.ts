import { describe, expect, it } from "vitest";
import { locations } from "./locations";
import { metroServices } from "./metroServices";

const THRESHOLD = 0.25;
const SHINGLE_SIZE = 5;

function shingles(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  const set = new Set<string>();
  for (let i = 0; i + SHINGLE_SIZE <= words.length; i++) {
    set.add(words.slice(i, i + SHINGLE_SIZE).join(" "));
  }
  return set;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection++;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function offendingPairs(items: { slug: string; text: string }[]) {
  const prepared = items.map((item) => ({ slug: item.slug, set: shingles(item.text) }));
  const offenders: string[] = [];
  for (let i = 0; i < prepared.length; i++) {
    for (let j = i + 1; j < prepared.length; j++) {
      const score = jaccard(prepared[i].set, prepared[j].set);
      if (score > THRESHOLD) {
        offenders.push(`${prepared[i].slug} vs ${prepared[j].slug}: ${score.toFixed(3)}`);
      }
    }
  }
  return offenders;
}

describe("location copy uniqueness", () => {
  it("keeps metro-service pages of the same service distinct", () => {
    for (const service of ["web-design", "google-business-profile-optimization"] as const) {
      const pages = metroServices
        .filter((page) => page.service === service)
        .map((page) => ({
          slug: page.path,
          text: [page.intro, page.marketAngle, ...page.faqs.map((faq) => faq.answer)].join(" "),
        }));
      expect(offendingPairs(pages), `Similarity above ${THRESHOLD} for ${service}`).toEqual([]);
    }
  });

  it("keeps location hubs distinct", () => {
    const hubs = locations.map((location) => ({
      slug: location.slug,
      text: [location.intro, location.whyCity, ...location.faqs.map((faq) => faq.answer)].join(" "),
    }));
    expect(offendingPairs(hubs), `Similarity above ${THRESHOLD} for location hubs`).toEqual([]);
  });
});
