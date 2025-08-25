// Tiny, CSP-safe scroll listener to toggle a shrink class on the header.
// No frameworks, throttled via rAF to avoid jank.
(() => {
  const header = document.querySelector('header.site-header');
  if (!header) return;

  let lastY = 0;
  let ticking = false;

  const update = () => {
    header.classList.toggle('is-shrunk', lastY > 24);
    ticking = false;
  };

  const onScroll = () => {
    lastY = window.scrollY || window.pageYOffset || 0;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  // Initialize state on load
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
