// FILE: astro.config.ts
// Performance Optimizations v1.0.0-beta.53
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import compress from "astro-compress";
import vercel from "@astrojs/vercel";

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
  adapter: vercel(),

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      customPages: ["https://lilosgrowth.com/blog"],
      filter: (page) => {
        // Utility / confirmation page: noindex + keep out of sitemaps
        if (page === "https://lilosgrowth.com/thank-you") return false;

        // Archive pages we explicitly noindex
        if (page.startsWith("https://lilosgrowth.com/blog/tag/")) return false;
        if (page.startsWith("https://lilosgrowth.com/blog/category/")) return false;

        return true;
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
    compress({
      CSS: true,
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        }
      },
      Image: true,
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
    astrowind({ config: "./src/config.yaml" }),
  ],

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
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
