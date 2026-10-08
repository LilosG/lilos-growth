// Captures above-the-fold WebP screenshots of client sites for the ad landing pages.
// Usage: node scripts/capture-sites.mjs
import { chromium } from "playwright";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "../public/images/landers");
const sites = [
  { slug: "tamarack", url: "https://www.tamarackrestoration.com" },
  { slug: "carlsbadfixit", url: "https://www.carlsbadfixit.com" },
];
const views = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
];
const DISMISS = /^(accept|accept all|allow|allow all|agree|got it|ok|okay|i agree|decline|reject|close|no thanks)$/i;

const browser = await chromium.launch();
for (const site of sites) {
  for (const v of views) {
    const ctx = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: 1,
      isMobile: v.mobile,
      hasTouch: v.mobile,
    });
    const page = await ctx.newPage();
    try {
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 });
    } catch (e) {
      console.warn(`networkidle timeout for ${site.url}, continuing`);
    }
    for (const b of await page.locator("button, a[role=button]").all()) {
      try {
        const t = ((await b.innerText({ timeout: 300 })) || "").trim();
        if (DISMISS.test(t) && (await b.isVisible())) await b.click({ timeout: 800 });
      } catch {}
    }
    await page.waitForTimeout(1200);
    const buf = await page.screenshot({ type: "png" });
    const file = path.join(out, `${site.slug}-${v.name}.webp`);
    await sharp(buf).webp({ quality: 82 }).toFile(file);
    console.log("saved", file);
    await ctx.close();
  }
}
await browser.close();
