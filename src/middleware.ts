import { defineMiddleware } from "astro:middleware";

const NOINDEX_PATHS: string[] = [
  "/offers/local-seo",
  "/offers/local-seo-locked",
  "/privacy",

  // Keep offline route if used by PWA/service worker, but noindex it.
  "/offline",
];

// If these are truly unused, we will also remove the routes entirely below.
// Header-based noindex is still helpful while they exist.
const NOINDEX_PREFIXES: string[] = [
  "/cards-preview",
  "/plans-preview",
  "/index-refactored",
  "/results-refactored",
];

function shouldNoindex(pathname: string) {
  if (NOINDEX_PATHS.includes(pathname)) return true;
  return NOINDEX_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (shouldNoindex(context.url.pathname)) {
    // Header-based directive is reliable and works even if templates/layouts change.
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
});
