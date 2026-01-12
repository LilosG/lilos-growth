import slugify from "limax";
import { SITE, APP_BLOG } from "astrowind:config";
import { trim } from "~/utils/utils";

// ---- Local config shapes (minimal but typed) -----------------
type SiteConfig = { site?: string; base?: string; trailingSlash?: boolean };
type BlogCfg = {
  list?: { pathname?: string };
  category?: { pathname?: string };
  tag?: { pathname?: string };
  post?: { permalink?: string };
};

const SITE_CFG = SITE as SiteConfig;
const BLOG_CFG = APP_BLOG as BlogCfg;

// ---- Utilities ------------------------------------------------
export const trimSlash = (s: string) => trim(trim(s, "/"));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
  return "/" + paths + (SITE_CFG.trailingSlash && paths ? "/" : "");
};

const BASE_PATHNAME = SITE_CFG.base || "/";

export const cleanSlug = (text = "") =>
  trimSlash(text)
    .split("/")
    .map((slug) => slugify(slug))
    .join("/");

export const BLOG_BASE = cleanSlug(BLOG_CFG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(BLOG_CFG?.category?.pathname);
export const TAG_BASE = cleanSlug(BLOG_CFG?.tag?.pathname) || "tag";

export const POST_PERMALINK_PATTERN = trimSlash(BLOG_CFG?.post?.permalink || `${BLOG_BASE}/%slug%`);

// ---- Canonical ------------------------------------------------
export const getCanonical = (path = ""): string | URL => {
  const base = SITE_CFG.site ?? "http://localhost";
  const url = String(new URL(path, base));
  if (SITE_CFG.trailingSlash === false && path && url.endsWith("/")) {
    return url.slice(0, -1);
  } else if (SITE_CFG.trailingSlash === true && path && !url.endsWith("/")) {
    return url + "/";
  }
  return url;
};

// ---- Permalinks -----------------------------------------------
type PermalinkType = "home" | "blog" | "asset" | "page" | "category" | "tag" | "post";

export const getPermalink = (slug = "", type: PermalinkType = "page"): string => {
  let permalink: string;

  if (
    slug.startsWith("https://") ||
    slug.startsWith("http://") ||
    slug.startsWith("://") ||
    slug.startsWith("#") ||
    slug.startsWith("javascript:")
  ) {
    return slug;
  }

  switch (type) {
    case "home":
      permalink = getHomePermalink();
      break;
    case "blog":
      permalink = getBlogPermalink();
      break;
    case "asset":
      permalink = getAsset(slug);
      break;
    case "category":
      permalink = createPath(BLOG_BASE, CATEGORY_BASE, trimSlash(slug));
      break;
    case "tag":
      permalink = createPath(BLOG_BASE, TAG_BASE, trimSlash(slug));
      break;
    case "post":
      permalink = createPath(trimSlash(slug));
      break;
    case "page":
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

export const getHomePermalink = (): string => getPermalink("/");
export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);

export const getAsset = (path: string): string =>
  "/" +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");

const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);

// ---- Menu transformer (strongly typed, no any) ----------------
type LinkObj = { type?: PermalinkType; url?: string };
type Menu = string | LinkObj | { [key: string]: Menu } | Menu[];

export const applyGetPermalinks = (menu: Menu): Menu => {
  if (Array.isArray(menu)) {
    return menu.map((item) => applyGetPermalinks(item));
  }

  if (typeof menu === "string") {
    return getPermalink(menu);
  }

  if (menu && typeof menu === "object") {
    // Shallow link object (has type/url)
    const maybeLink = menu as LinkObj;
    if ("url" in maybeLink || "type" in maybeLink) {
      if (maybeLink.type === "home") return getHomePermalink();
      if (maybeLink.type === "blog") return getBlogPermalink();
      if (maybeLink.type === "asset" && maybeLink.url) return getAsset(maybeLink.url);
      if (maybeLink.url) return getPermalink(maybeLink.url, maybeLink.type ?? "page");
      return menu; // not enough info; leave as-is
    }

    // Nested object case
    const input = menu as { [key: string]: Menu };
    const obj: { [key: string]: Menu } = {};
    for (const key in input) {
      if (key === "href") {
        const hrefVal = input[key];
        if (typeof hrefVal === "string") {
          obj[key] = getPermalink(hrefVal);
        } else if (hrefVal && typeof hrefVal === "object" && !Array.isArray(hrefVal)) {
          const v = hrefVal as LinkObj;
          if (v.type === "home") obj[key] = getHomePermalink();
          else if (v.type === "blog") obj[key] = getBlogPermalink();
          else if (v.type === "asset" && v.url) obj[key] = getAsset(v.url);
          else if (v.url) obj[key] = getPermalink(v.url, v.type ?? "page");
          else obj[key] = hrefVal;
        } else {
          obj[key] = hrefVal;
        }
      } else {
        obj[key] = applyGetPermalinks(input[key]);
      }
    }
    return obj;
  }

  return menu;
};
