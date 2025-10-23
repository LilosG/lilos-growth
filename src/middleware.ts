import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  const url = new URL(ctx.request.url);
  const n = Number(url.searchParams.get("page"));

  if (Number.isFinite(n) && n > 1) {
    // /blog?page=N  -> /blog/N
    if (url.pathname === "/blog") {
      return ctx.redirect(`/blog/${n}`, 308);
    }
    // /blog/tag/<tag>?page=N -> /blog/tag/<tag>/N
    const tagMatch = url.pathname.match(/^\/blog\/tag\/([^/]+)$/);
    if (tagMatch) {
      return ctx.redirect(`/blog/tag/${tagMatch[1]}/${n}`, 308);
    }
    // /blog/category/<cat>?page=N -> /blog/category/<cat>/N
    const catMatch = url.pathname.match(/^\/blog\/category\/([^/]+)$/);
    if (catMatch) {
      return ctx.redirect(`/blog/category/${catMatch[1]}/${n}`, 308);
    }
  }

  return next();
};
