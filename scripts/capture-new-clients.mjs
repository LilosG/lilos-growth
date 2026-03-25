import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const SITES = [
  { name: "wheyland-electric", url: "https://wheylandelectric.com" },
  { name: "kelari-party-rentals", url: "https://kelaripartyrentals.com" },
];

const OUTPUT_DIR = join(process.cwd(), "public", "clients", "screenshots");

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
});

await mkdir(OUTPUT_DIR, { recursive: true });

for (const site of SITES) {
  console.log(`Capturing ${site.name}...`);
  const page = await context.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });

  await page.goto(site.url, { waitUntil: "commit", timeout: 30000 });
  await page.waitForTimeout(4000);

  // Use CDP directly to bypass Playwright's font-loading wait
  const cdpSession = await context.newCDPSession(page);
  const result = await cdpSession.send("Page.captureScreenshot", { format: "png", fromSurface: true });
  await cdpSession.detach();

  const filepath = join(OUTPUT_DIR, `${site.name}-full.png`);
  await writeFile(filepath, Buffer.from(result.data, "base64"));
  console.log(`  Saved: ${site.name}-full.png`);
  await page.close();
}

await browser.close();
console.log("Done.");
