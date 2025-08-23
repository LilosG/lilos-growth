/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Type shims for the AstroWind virtual config module.
// Broad on purpose—just to satisfy TS; runtime reads from src/config.yaml.
declare module 'astrowind:config' {
  export const SITE: any;
  export const METADATA: any;
  export const UI: any;
  export const I18N: any;
  export const ANALYTICS: any;
  export const APP_BLOG: any;
  export const PERMALINKS: any;
}
