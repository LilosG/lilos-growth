// Tiny, CSP-safe scroll listener to toggle a shrink class on the header
// and keep the spacer height in sync. No theme or color changes here.

(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const header = document.querySelector('header.site-header');
  const spacer = document.getElementById('header-spacer');
  if (!header || !spacer) return;

  const setHeaderHeight = () => {
    const h = Math.ceil(header.getBoundingClientRect().height || 72);
    document.documentElement.style.setProperty('--header-h', `${h}px`);
    // keep the inline fallback height in case CSS var is overridden
    spacer.style.height = `var(--header-h, ${h}px)`;
  };

  // Keep height synced when the header shrinks or on viewport changes
  try {
    const ro = new ResizeObserver(() => setHeaderHeight());
    ro.observe(header);
  } catch (_err) {
    // Older browsers: fall back to resize event
    window.addEventListener('resize', setHeaderHeight, { passive: true });
  }

  // Throttled scroll handler (rAF) – only toggles shrink state
  const threshold = 8;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const shrunk = window.scrollY > threshold;
      header.classList.toggle('is-shrunk', shrunk);
      ticking = false;
    });
  };

  // Init
  setHeaderHeight();
  onScroll();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener(
    'orientationchange',
    () => {
      setTimeout(() => {
        setHeaderHeight();
        onScroll();
      }, 50);
    },
    { passive: true }
  );
})();
