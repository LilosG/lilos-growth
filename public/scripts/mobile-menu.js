/**
 * Mobile drawer controller (CSP-safe, no inline JS)
 * - Toggles #mobileMenu via #mobileMenuBtn and #mobileMenuClose
 * - Locks body scroll when open
 * - Closes on overlay click and Escape
 * - Traps focus inside the drawer while open
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

    const focusablesSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    let lastFocused = null;

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      const items = panel.querySelectorAll(focusablesSelector);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const open = () => {
      lastFocused = document.activeElement;
      panel.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden');
      // Focus first focusable in panel
      const first = panel.querySelector(focusablesSelector);
      if (first) first.focus();
      document.addEventListener('keydown', trap);
    };

    const closeMenu = () => {
      panel.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', trap);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
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
