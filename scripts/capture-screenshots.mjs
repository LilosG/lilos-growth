#!/usr/bin/env node
/**
 * Screenshot Capture Tool for Lilos Growth Client Sites
 *
 * Usage: node scripts/capture-screenshots.mjs
 *
 * Requirements: npm install -D playwright
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const CLIENT_SITES = [
  {
    name: "blue-door-pest",
    url: "https://bluedoorpest.com",
    viewport: { width: 1200, height: 800 },
  },
  {
    name: "tamarack-restoration",
    url: "https://tamarackrestoration.com",
    viewport: { width: 1200, height: 800 },
  },
  {
    name: "carlsbad-home-services",
    url: "https://carlsbadhomeservices.com",
    viewport: { width: 1200, height: 800 },
  },
  {
    name: "carlsbad-fixit",
    url: "https://carlsbadfixit.com",
    viewport: { width: 1200, height: 800 },
  },
  {
    name: "san-diego-commercial-mailboxes",
    url: "https://sandiegocommercialmailboxes.com",
    viewport: { width: 1200, height: 800 },
  },
];

const OUTPUT_DIR = join(process.cwd(), "public", "clients", "screenshots");

async function captureScreenshots() {
  console.log("🚀 Starting screenshot capture...\n");

  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  });

  let captured = 0;
  let failed = 0;

  for (const site of CLIENT_SITES) {
    try {
      console.log(`📸 Capturing ${site.name}...`);

      const page = await context.newPage();
      await page.setViewportSize(site.viewport);

      // Navigate with timeout
      await page.goto(site.url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      // Wait a bit for any animations/lazy loading
      await page.waitForTimeout(2000);

      // Capture screenshot
      const screenshot = await page.screenshot({
        type: "png",
        fullPage: false, // Just above the fold
      });

      // Save screenshot
      const filename = `${site.name}-full.png`;
      const filepath = join(OUTPUT_DIR, filename);
      await writeFile(filepath, screenshot);

      console.log(`   ✅ Saved: ${filename}`);
      captured++;

      await page.close();
    } catch (error) {
      console.error(`   ❌ Failed: ${site.name}`);
      console.error(`      ${error.message}`);
      failed++;
    }
  }

  await browser.close();

  console.log("\n" + "=".repeat(50));
  console.log(`✨ Complete! ${captured} captured, ${failed} failed`);
  console.log(`📁 Screenshots saved to: ${OUTPUT_DIR}`);
  console.log("=".repeat(50) + "\n");
}

captureScreenshots().catch(console.error);
