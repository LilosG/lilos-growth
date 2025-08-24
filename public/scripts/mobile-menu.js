/**
 * Mobile drawer controller (CSP-safe, no inline JS)
 * - Toggles #mobileMenu via #mobileMenuBtn and #mobileMenuClose
 * - Locks body scroll when open
 * - Closes on overlay click and Escape
 * - Idempotent: safe to bind multiple times
 */

(() => {
  if (window.__lgMobileMenuBound) return;
  window.__lgMobileMenuBound = true;

  const bind = () => {
    const btn = document.getElementById('mobileMenuBtn');
    const panel = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const closeBtn = document.getElementById('mobileMenuClose');

    if (!btn || !panel) return;

    const open = () => {
      panel.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden');
    };

    const closeMenu = () => {
      panel.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    };

    btn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close after client-side route navigation
    document.addEventListener('astro:page-load', () => closeMenu(), { once: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true });
  } else {
    bind();
  }
})();
