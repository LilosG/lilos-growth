/* Calendly hybrid loader: binds to elements and opens the popup widget safely. */
/* eslint-env browser */
(() => {
  'use strict';

  const CAL_URL_ATTRS = ['data-cal-url', 'data-calendly-url'];
  const SELECTOR = '[data-calendly="open"], [data-cal-open="true"], #calendlyBtn, .calendly-open';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function getCalendlyUrlFrom(el) {
    for (const attr of CAL_URL_ATTRS) {
      const val = el.getAttribute(attr);
      if (val) return val;
    }
    const href = el.getAttribute('href');
    return href || '';
  }

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  function openCalendly(url) {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({ url });
      return;
    }
    if (url) window.location.href = url;
  }

  ready(() => {
    const targets = Array.from(document.querySelectorAll(SELECTOR));
    if (targets.length === 0) return;

    targets.forEach((el) => {
      el.addEventListener(
        'click',
        (e) => {
          const url = getCalendlyUrlFrom(el);
          if (!url) return;
          e.preventDefault();
          loadScriptOnce('https://assets.calendly.com/assets/external/widget.js')
            .then(() => openCalendly(url))
            .catch(() => {
              // Fallback: navigate directly if the widget fails to load
              window.location.href = url;
            });
        },
        { passive: false }
      );
    });
  });
})();
