/**
 * Tiny, CSP-safe scroll listener to toggle a shrink class on the header.
 * No unused vars; plays nice with eslint(no-unused-vars) and TS configs.
 */
(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const header = document.querySelector('header.site-header') || document.querySelector('header.site-header-legacy');
  if (!header) return;

  const threshold = 8; // pixels before we consider the header "shrunk"

  const apply = () => {
    const shouldShrink = (window.scrollY || 0) > threshold;
    const hasClass = header.classList.contains('is-shrunk');
    if (shouldShrink !== hasClass) {
      header.classList.toggle('is-shrunk', shouldShrink);
    }
  };

  // Initial state + throttled scroll via rAF
  apply();
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          apply();
          ticking = false;
        });
      }
    },
    { passive: true }
  );
})();
