/* Calendly hybrid loader — desktop popup, mobile navigate, bulletproof fallback. */
/* eslint-env browser */
(() => {
  'use strict';

  // Prevent double-binding across re-renders / multiple imports
  if (window.__lgCalendlyHybridInit) return;
  window.__lgCalendlyHybridInit = true;

  const SELECTOR = [
    '[data-cal-hybrid]', // primary (your floating CTA)
    '[data-calendly="open"]',
    '[data-cal-open="true"]',
    '#calendlyBtn',
    '.calendly-open',
  ].join(', ');

  const CAL_ATTRS = ['data-cal-url', 'data-calendly-url', 'href'];
  const WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';

  const ready = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  const getUrl = (el) => {
    for (const a of CAL_ATTRS) {
      const v = el.getAttribute(a);
      if (v) return v;
    }
    return '';
  };

  const getBreakpoint = (el) => {
    const raw = el.getAttribute('data-cal-breakpoint');
    const n = raw ? parseInt(raw, 10) : NaN;
    return Number.isFinite(n) ? n : null;
  };

  const ensureScript = () =>
    new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${WIDGET_SRC}"]`);
      if (existing) {
        if (typeof window.Calendly !== 'undefined') return resolve();
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', (e) => reject(e), { once: true });
        return;
      }
      const s = document.createElement('script');
      s.src = WIDGET_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });

  const tryPopup = (url) => {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({ url });
      return true;
    }
    return false;
  };

  const bind = () => {
    const targets = Array.from(document.querySelectorAll(SELECTOR));
    if (!targets.length) return;

    targets.forEach((el) => {
      if (el.__lgCalBound) return;
      el.__lgCalBound = true;

      el.addEventListener(
        'click',
        (e) => {
          const url = getUrl(el);
          if (!url) return;

          const bp = getBreakpoint(el) ?? 768;
          const w = window.innerWidth || document.documentElement.clientWidth || 0;

          // Mobile (< breakpoint): allow normal navigation (no preventDefault)
          if (w < bp) return;

          // Desktop (>= breakpoint): prefer popup, but NEVER leave the user stuck
          e.preventDefault();

          // If the widget is already present, open instantly
          if (tryPopup(url)) return;

          // Otherwise, load it and race with a short fallback to hard navigate
          let navigated = false;
          const navigate = () => {
            if (!navigated) {
              navigated = true;
              window.location.href = url;
            }
          };

          const fallbackTimer = setTimeout(navigate, 1800);

          ensureScript()
            .then(() => {
              if (tryPopup(url)) {
                clearTimeout(fallbackTimer);
              } else {
                navigate();
              }
            })
            .catch(navigate);
        },
        { passive: false }
      );
    });
  };

  ready(bind);
  // Re-bind after Astro client-side navigations
  document.addEventListener('astro:page-load', bind);
})();
