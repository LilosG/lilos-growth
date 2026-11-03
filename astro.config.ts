// FILE: astro.config.ts
// Performance Optimizations v1.0.0-beta.53
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";
import { unified } from "@astrojs/markdown-remark";

import astrowind from "./vendor/integration";
import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin,
} from "./src/utils/frontmatter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  trailingSlash: "never",
  site: "https://lilosgrowth.com",
  output: "static",
  // /api/places is rendered on demand; Vercel adapter is required.
  adapter: vercel(),

  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = (() => {
          try {
            return decodeURIComponent(new URL(page, "https://lilosgrowth.com").pathname);
          } catch {
            return decodeURIComponent(page);
          }
        })();

        if (pathname.startsWith("/offers/")) return false;
        if (pathname === "/google-maps-takeover" || pathname === "/free-website") return false;
        if (pathname.startsWith("/blog/tag/")) return false;
        if (pathname.startsWith("/blog/category/")) return false;
        if (/^\/blog\/\d+$/.test(pathname)) return false;

        return !new Set([
          "/cards-preview",
          "/plans-preview",
          "/index-refactored",
          "/results-refactored",
          "/offline",
          "/thank-you",
        ]).has(pathname);
      },
      customPages: ["https://lilosgrowth.com/blog"],
      serialize(item) {
        return { ...item, lastmod: new Date().toISOString().split("T")[0] };
      },
    }),
    mdx(),
    icon({
      include: {
        tabler: ["*"],
        "flat-color-icons": [
          "template",
          "gallery",
          "approval",
          "document",
          "advertising",
          "currency-exchange",
          "voice-presentation",
          "business-contact",
          "database",
        ],
      },
    }),
    astrowind({ config: "./src/config.yaml" }),
  ],

  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin],
      rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
    }),
    syntaxHighlight: "shiki",
    shikiConfig: {
      // Map ```astro fences to HTML highlighting to avoid Shiki warnings without adding deps
      langAlias: { astro: "html" },
    },
  },

  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
