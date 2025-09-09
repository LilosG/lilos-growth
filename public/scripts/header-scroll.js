// Header shrink + spacer sync (CLS-safe, ES module-friendly, no globals).
// - Adds .is-shrunk after a small scroll threshold
// - Keeps --header-h (and #header-spacer) in sync with actual header height
// - Uses ResizeObserver when available; falls back to resize
// - rAF-throttled scroll handler; idempotent init guard

(() => {
  const DOC = document;
  if (!DOC || typeof window === 'undefined') return;

  // Prevent double-initialization if the script is loaded twice
  const ROOT = DOC.documentElement;
  if (ROOT.dataset.headerScrollInit === '1') return;
  ROOT.dataset.headerScrollInit = '1';

  const HEADER = DOC.querySelector('header.site-header');
  const SPACER = DOC.getElementById('header-spacer');
  if (!HEADER) return;

  const SHRUNK_CLASS = 'is-shrunk';
  const CSS_VAR = '--header-h';
  const THRESHOLD_PX = 8;

  // Compute + apply header height → CSS var + spacer (with a hard fallback)
  const setHeights = () => {
    const h = Math.max(1, Math.round(HEADER.getBoundingClientRect().height));
    const px = `${h}px`;
    ROOT.style.setProperty(CSS_VAR, px);
    if (SPACER) {
      // Use var() with a px fallback to survive style recalcs
      SPACER.style.height = `var(${CSS_VAR}, ${px})`;
    }
  };

  // Toggle shrink class after small scroll
  const applyShrink = () => {
    const y = window.scrollY || ROOT.scrollTop || 0;
    if (y > THRESHOLD_PX) HEADER.classList.add(SHRUNK_CLASS);
    else HEADER.classList.remove(SHRUNK_CLASS);
  };

  // rAF-throttled scroll handler
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      applyShrink();
      ticking = false;
    });
  };

  // Initial pass
  setHeights();
  applyShrink();

  // Track header size changes
  if (SPACER) {
    if ('ResizeObserver' in window) {
      const RO = new window.ResizeObserver(() => setHeights());
      RO.observe(HEADER);
    } else {
      window.addEventListener('resize', () => requestAnimationFrame(setHeights), { passive: true });
    }
  }

  // Respond to scroll/orientation/font loading
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener(
    'orientationchange',
    () =>
      requestAnimationFrame(() => {
        setHeights();
        applyShrink();
      }),
    { passive: true }
  );

  if (DOC.fonts && DOC.fonts.ready && typeof DOC.fonts.ready.then === 'function') {
    DOC.fonts.ready.then(() => {
      setHeights();
      applyShrink();
    });
  }
})();
