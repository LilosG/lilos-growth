// FILE: astro.config.ts
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';

import astrowind from './vendor/integration';
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  trailingSlash: 'never',
  site: 'https://lilosgrowth.com',
  output: 'static',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({ customPages: ['https://lilosgrowth.com/blog'] }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),
    compress({
      CSS: true,
      HTML: { 'html-minifier-terser': { removeAttributeQuotes: false } },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({ config: './src/config.yaml' }),
  ],

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Map ```astro fences to HTML highlighting to avoid Shiki warnings without adding deps
      langAlias: { astro: 'html' },
    },
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
