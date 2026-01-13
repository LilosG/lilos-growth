#!/usr/bin/env node
/**
 * Capture client website screenshots
 * Uses Puppeteer to take screenshots of client sites
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const clients = [
  { name: 'blue-door-pest-control', url: 'https://bluedoorpest.com' },
  { name: 'tamarack-restoration', url: 'https://www.tamarackrestoration.com' },
  { name: 'carlsbad-home-services', url: 'https://carlsbadhomeservices.com' },
  { name: 'carlsbad-fixit', url: 'https://www.carlsbadfixit.com' },
  { name: 'sd-commercial-mailboxes', url: 'https://sandiegocommercialmailboxes.com' },
];

const outputDir = path.join(__dirname, '..', 'public', 'clients');

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const client of clients) {
    try {
      console.log(`Capturing ${client.name}...`);
      const page = await browser.newPage();

      // Set viewport to standard desktop size
      await page.setViewport({ width: 1200, height: 800 });

      // Navigate to the site
      await page.goto(client.url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait a bit for any animations
      await page.waitForTimeout(1000);

      // Take screenshot
      const outputPath = path.join(outputDir, `${client.name}.png`);
      await page.screenshot({
        path: outputPath,
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: 630,
        },
      });

      console.log(`✓ Saved ${client.name}.png`);
      await page.close();
    } catch (error) {
      console.error(`✗ Failed to capture ${client.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('Done!');
}

captureScreenshots().catch(console.error);
