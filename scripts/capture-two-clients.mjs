/**
 * One-shot screenshot capture for wheyland-electric and kelari-party-rentals.
 * Uses default CJS import (required for the global playwright symlink) and
 * CDP Page.captureScreenshot to bypass Playwright's font-load wait.
 */
import pkg from "/home/user/lilos-growth/node_modules/playwright/index.js";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const { chromium } = pkg;

const SITES = [
  { name: "wheyland-electric", url: "https://wheylandelectric.com" },
  { name: "kelari-party-rentals", url: "https://kelaripartyrentals.com" },
];

const OUTPUT_DIR = join(process.cwd(), "public", "clients", "screenshots");
await mkdir(OUTPUT_DIR, { recursive: true });

// Parse proxy credentials from environment (Chromium doesn't inherit them automatically)
const rawProxy = process.env.https_proxy || process.env.http_proxy || "";
let proxyConfig = undefined;
if (rawProxy) {
  const u = new URL(rawProxy);
  proxyConfig = {
    server: `${u.protocol}//${u.hostname}:${u.port}`,
    username: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
  };
  console.log(`Using proxy: ${proxyConfig.server}`);
}

const browser = await chromium.launch({
  headless: true,
  proxy: proxyConfig,
  args: ["--ignore-certificate-errors"],
});
const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  proxy: proxyConfig,
});

for (const site of SITES) {
  console.log(`Capturing ${site.name}...`);
  const page = await context.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });

  await page.goto(site.url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);

  // CDP screenshot bypasses Playwright's internal font-load wait
  const cdp = await context.newCDPSession(page);
  const { data } = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  });
  await cdp.detach();

  const filepath = join(OUTPUT_DIR, `${site.name}-full.png`);
  await writeFile(filepath, Buffer.from(data, "base64"));
  console.log(`  ✅ Saved: ${site.name}-full.png`);
  await page.close();
}

await browser.close();
console.log("Done.");
