// Ambient types for the AstroWind virtual module.
// This makes imports like `import { SITE, APP_BLOG } from 'astrowind:config'`
// type-check across the project (no `any`).

declare module "astrowind:config" {
  // ----- SITE -----
  export interface SiteConfig {
    site?: string; // e.g. "https://lilosgrowth.com"
    name?: string; // used in RSS/SEO
    base?: string; // base pathname
    trailingSlash?: boolean;
    googleSiteVerificationId?: string | null;
  }

  // ----- METADATA -----
  export interface TitleConfig {
    default?: string;
    template?: string;
  }
  export interface RobotsConfig {
    index?: boolean;
    follow?: boolean;
  }
  export interface MetaDataImage {
    url: string;
    width?: number;
    height?: number;
  }
  export interface MetaDataOpenGraph {
    url?: string;
    siteName?: string;
    images?: Array<MetaDataImage>;
    locale?: string;
    type?: string;
  }
  export interface MetaDataTwitter {
    handle?: string;
    site?: string;
    cardType?: string;
  }
  export interface MetadataConfig {
    title?: TitleConfig;
    robots?: RobotsConfig;
    description?: string;
    openGraph?: MetaDataOpenGraph;
    twitter?: MetaDataTwitter;
  }

  // ----- UI -----
  export interface UIConfig {
    theme?: string; // e.g. "light:only"
  }

  // ----- I18N -----
  export interface I18NConfig {
    language?: Intl.LocalesArgument; // used by utils.ts
    textDirection?: "ltr" | "rtl"; // used by ToBlogLink.astro
  }

  // ----- ANALYTICS -----
  export interface AnalyticsConfig {
    vendors?: {
      googleAnalytics?: {
        id?: string | number;
        partytown?: boolean;
      };
    };
  }

  // ----- BLOG / APP_BLOG -----
  export interface RobotsTag {
    index?: boolean;
    follow?: boolean;
  }

  export interface BlogSection {
    pathname?: string;
    isEnabled?: boolean;
    robots?: RobotsTag;
    pageSize?: number; // per-section pagination if used
    permalink?: string; // for post pattern
  }

  // NOTE: many components access `APP_BLOG.list/category/tag/post`
  // *without optional chaining*, so we model them as required objects.
  export interface AppBlogConfig {
    isEnabled?: boolean; // global blog toggle
    isRelatedPostsEnabled?: boolean; // used in RelatedPosts/Blog utils
    postsPerPage?: number; // used in blog.ts
    list: BlogSection;
    post: BlogSection;
    category: BlogSection;
    tag: BlogSection;
  }

  // ----- Exports -----
  export const SITE: Readonly<SiteConfig>;
  export const METADATA: Readonly<MetadataConfig>;
  export const UI: Readonly<UIConfig>;
  export const I18N: Readonly<I18NConfig>;
  export const ANALYTICS: Readonly<AnalyticsConfig>;
  export const APP_BLOG: Readonly<AppBlogConfig>;
  export const PERMALINKS: Readonly<Record<string, unknown>>;
}
