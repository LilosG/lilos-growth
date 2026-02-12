/**
 * Service Worker for Lilos Growth
 * Provides intelligent caching for better performance and offline support
 * Version: 1.0
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `lilos-growth-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = ["/", "/offline.html", "/logo-lcp-320.webp"];

// Cache strategies
const CACHE_STRATEGIES = {
  // Images: Cache first, fallback to network
  images: /\.(png|jpg|jpeg|webp|avif|gif|svg|ico)$/i,

  // Static assets: Cache first
  static: /\/_astro\/.+\.(css|js)$/,

  // Fonts: Cache first
  fonts: /\.(woff|woff2|ttf|otf|eot)$/i,

  // API/Analytics: Network only (don't cache)
  analytics: /(google-analytics|googletagmanager|analytics\.ahrefs|vercel-insights|calendly)/i,
};

// Install event - precache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Precaching assets");
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith("lilos-growth-") && name !== CACHE_NAME)
            .map((name) => {
              console.log("[SW] Deleting old cache:", name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests except fonts and analytics
  if (url.origin !== location.origin && !CACHE_STRATEGIES.fonts.test(url.pathname)) {
    // Let analytics and external scripts pass through
    if (CACHE_STRATEGIES.analytics.test(url.href)) {
      return;
    }
  }

  // Network-only for analytics
  if (CACHE_STRATEGIES.analytics.test(url.href)) {
    return;
  }

  // Cache-first for images
  if (CACHE_STRATEGIES.images.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Cache-first for static assets (CSS/JS)
  if (CACHE_STRATEGIES.static.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Cache-first for fonts
  if (CACHE_STRATEGIES.fonts.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Network-first for HTML pages
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default: Network-first
  event.respondWith(networkFirst(request));
});

/**
 * Cache-first strategy
 * 1. Check cache
 * 2. If not in cache, fetch from network and cache
 * 3. If network fails, return offline page
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    // Only cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error("[SW] Cache-first fetch failed:", error);
    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

/**
 * Network-first strategy
 * 1. Try network first
 * 2. If network fails, fall back to cache
 * 3. If both fail, return offline page
 */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    // Cache successful HTML responses for offline fallback
    if (response.ok && request.mode === "navigate") {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.warn("[SW] Network failed, trying cache:", error);

    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      const offlinePage = await cache.match("/offline.html");
      if (offlinePage) {
        return offlinePage;
      }
    }

    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

// Message handler for cache clearing
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => caches.delete(name)));
      })
    );
  }
});
