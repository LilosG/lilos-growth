import { defineMiddleware } from "astro:middleware";

// Only /offline remains here -- the old /offers/* promo landing pages
// and /cards-preview, /plans-preview, /index-refactored,
// /results-refactored routes this used to noindex have all been
// deleted; they were confirmed orphaned (no internal links, no
// consumers) and removed entirely rather than left as dead routes
// with a noindex header.
const NOINDEX_PATHS: string[] = ["/offline"];

function shouldNoindex(pathname: string) {
  return NOINDEX_PATHS.includes(pathname);
}

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (shouldNoindex(context.url.pathname)) {
    // Header-based directive is reliable and works even if templates/layouts change.
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
});
