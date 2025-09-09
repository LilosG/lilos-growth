(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const header = document.querySelector('header.site-header');
  const spacer = document.getElementById('header-spacer');
  if (!header) return;

  const threshold = 8;

  // Shrink class on scroll
  const setShrunk = () => {
    header.classList.toggle('is-shrunk', (window.scrollY || 0) > threshold);
  };
  setShrunk();
  window.addEventListener('scroll', setShrunk, { passive: true });

  // Keep spacer matched to header height (prefer ResizeObserver; fallback to resize)
  const applyHeight = (h) => {
    if (!spacer) return;
    const px = `${Math.ceil(h)}px`;
    document.documentElement.style.setProperty('--header-h', px);
    spacer.style.height = px;
  };

  if (spacer && 'ResizeObserver' in window) {
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) applyHeight(entry.contentRect.height);
    });
    ro.observe(header);
    applyHeight(header.getBoundingClientRect().height);
  } else if (spacer) {
    const sync = () => applyHeight(header.getBoundingClientRect().height);
    sync();
    window.addEventListener('resize', sync, { passive: true });
  }
})();
