/* Calendly hybrid loader — desktop popup for real Calendly links; otherwise do nothing. */
/* eslint-env browser */
(() => {
  "use strict";

  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__lgCalendlyHybridInit) return;
  window.__lgCalendlyHybridInit = true;

  const SELECTOR = [
    "[data-cal-hybrid]",
    '[data-calendly="open"]',
    '[data-cal-open="true"]',
    "#calendlyBtn",
    ".calendly-open",
  ].join(", ");

  const CAL_ATTRS = ["data-cal-url", "data-calendly-url", "href"];
  const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

  const ready = (fn) => {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  };

  const getUrl = (el) => {
    for (const a of CAL_ATTRS) {
      const v = el.getAttribute(a);
      if (v) return v;
    }
    return "";
  };

  const getBreakpoint = (el) => {
    const raw = el.getAttribute("data-cal-breakpoint");
    const n = raw ? parseInt(raw, 10) : NaN;
    return Number.isFinite(n) ? n : null;
  };

  const isCalendlyUrl = (u) => {
    try {
      return /calendly\.com/i.test(String(u || ""));
    } catch {
      return false;
    }
  };

  const ensureScript = () =>
    new Promise((resolve, reject) => {
      try {
        const existing = document.querySelector(`script[src="${WIDGET_SRC}"]`);
        if (existing) {
          if (typeof window.Calendly !== "undefined") return resolve();
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", (e) => reject(e), { once: true });
          return;
        }
        const s = document.createElement("script");
        s.src = WIDGET_SRC;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.head.appendChild(s);
      } catch (e) {
        reject(e);
      }
    });

  const tryPopup = (url) => {
    try {
      if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
        window.Calendly.initPopupWidget({ url });
        return true;
      }
    } catch {}
    return false;
  };

  const bind = () => {
    const targets = Array.from(document.querySelectorAll(SELECTOR));
    if (!targets.length) return;

    targets.forEach((el) => {
      if (el.__lgCalBound) return;
      el.__lgCalBound = true;

      el.addEventListener(
        "click",
        (e) => {
          const url = getUrl(el);
          if (!url) return;

          const isCal = isCalendlyUrl(url);
          const bp = getBreakpoint(el) ?? 768;
          const w = window.innerWidth || document.documentElement.clientWidth || 0;

          // Non-Calendly links (/#contact, /contact, etc.): let browser handle it.
          if (!isCal) return;

          // Mobile: allow normal navigation to Calendly URL.
          if (w < bp) return;

          // Desktop + Calendly: try popup, with hard fallback (new tab).
          e.preventDefault();

          if (tryPopup(url)) return;

          let navigated = false;
          const navigate = () => {
            if (!navigated) {
              navigated = true;
              window.open(url, "_blank", "noopener,noreferrer");
            }
          };

          const timeoutMs = Number(el.getAttribute("data-cal-timeout") || 2000);
          const timer = setTimeout(navigate, timeoutMs);

          ensureScript()
            .then(() => {
              if (tryPopup(url)) clearTimeout(timer);
              else navigate();
            })
            .catch(navigate);
        },
        { passive: false }
      );
    });
  };

  ready(bind);
  document.addEventListener("astro:page-load", bind);
})();
