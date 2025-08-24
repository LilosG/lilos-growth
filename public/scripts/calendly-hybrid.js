/**
 * calendly-hybrid.js
 * Desktop (>= breakpoint): open Calendly popup on FIRST click.
 *  - If Calendly isn't loaded yet, load it and open as soon as ready.
 *  - If loading fails or takes too long (>2500ms), fall back to the link.
 * Mobile (< breakpoint): follow the link immediately (no popup).
 * CSP-safe; idempotent; works with Astro client routing.
 */
(() => {
  if (window.__calendlyHybridBootstrapped) return;
  window.__calendlyHybridBootstrapped = true;

  const CSS_HREF = 'https://assets.calendly.com/assets/external/widget.css';
  const JS_SRC = 'https://assets.calendly.com/assets/external/widget.js';

  function isDesktop(el) {
    const bp = parseInt(el.getAttribute('data-cal-breakpoint') || '768', 10);
    return window.matchMedia(`(min-width: ${bp}px)`).matches;
  }

  function ensureCss() {
    if ([...document.styleSheets].some((s) => s && s.href === CSS_HREF)) return;
    if (document.querySelector(`link[rel="stylesheet"][href="${CSS_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_HREF;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  function ensureJs() {
    if (window.Calendly && typeof window.Calendly.showPopupWidget === 'function') {
      return Promise.resolve(window.Calendly);
    }
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${JS_SRC}"]`);
      if (existing) {
        const t = setInterval(() => {
          if (window.Calendly && typeof window.Calendly.showPopupWidget === 'function') {
            clearInterval(t);
            resolve(window.Calendly);
          }
        }, 50);
        setTimeout(() => {
          clearInterval(t);
          window.Calendly ? resolve(window.Calendly) : reject(new Error('Calendly timeout'));
        }, 8000);
        return;
      }
      const s = document.createElement('script');
      s.src = JS_SRC;
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.onload = () => resolve(window.Calendly);
      s.onerror = () => reject(new Error('Calendly failed to load'));
      document.head.appendChild(s);
    });
  }

  function showPopup(url) {
    try {
      if (window.Calendly && typeof window.Calendly.showPopupWidget === 'function') {
        window.Calendly.showPopupWidget(url);
        return true;
      }
    } catch {
      /* ignore */
    }
    return false;
  }

  function preloadDesktopAssets(el) {
    if (!isDesktop(el) || el.__calPreloaded) return;
    el.__calPreloaded = true;
    ensureCss();
    ensureJs().catch(() => {});
  }

  function handleClick(e) {
    const el = e.currentTarget;
    const url = el.getAttribute('data-cal-url') || '';
    const fallbackHref = el.getAttribute('href') || '/contact#book';

    // MOBILE: let the browser follow the link immediately.
    if (!isDesktop(el)) return;

    // DESKTOP: aim to open the popup on the first click.
    e.preventDefault();
    ensureCss();

    if (showPopup(url)) return; // already loaded

    // Not loaded yet: load + open; timeout -> navigate.
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = 'wait';

    let finished = false;
    const cleanup = () => {
      if (finished) return;
      finished = true;
      document.body.style.cursor = previousCursor || '';
    };

    const hardTimeout = setTimeout(() => {
      if (finished) return;
      cleanup();
      window.location.href = fallbackHref;
    }, 2500);

    ensureJs()
      .then(() => {
        if (finished) return;
        clearTimeout(hardTimeout);
        const opened = showPopup(url);
        cleanup();
        if (!opened) window.location.href = fallbackHref;
      })
      .catch(() => {
        if (finished) return;
        clearTimeout(hardTimeout);
        cleanup();
        window.location.href = fallbackHref;
      });
  }

  function bindAll() {
    document.querySelectorAll('[data-cal-hybrid]').forEach((el) => {
      if (el.__calHybridBound) return;
      el.__calHybridBound = true;

      el.addEventListener('mouseenter', () => preloadDesktopAssets(el), { passive: true });
      el.addEventListener('touchstart', () => preloadDesktopAssets(el), { passive: true });

      el.addEventListener('click', handleClick);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAll, { once: true });
  } else {
    bindAll();
  }
  document.addEventListener('astro:page-load', bindAll);
})();
