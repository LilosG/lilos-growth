/**
 * Lilos Growth - Minimal Animation System
 *
 * JavaScript animations DISABLED for cleaner, more professional feel.
 * Only CSS-based hover effects remain.
 */

/**
 * Initialize animations (DISABLED)
 * This function is kept for compatibility but does nothing
 */
export function initScrollAnimations(): void {
  // Scroll animations disabled for cleaner feel
  return;
}

/**
 * Initialize stagger animations (DISABLED)
 */
export function initStaggerAnimations(): void {
  // Stagger animations disabled
  return;
}

/**
 * Initialize parallax effects (DISABLED)
 */
export function initParallax(): void {
  // Parallax disabled
  return;
}

/**
 * Initialize button ripple effects (DISABLED)
 * Even ripple is too gimmicky - removed
 */
export function initRippleEffect(): void {
  // Ripple disabled
  return;
}

/**
 * Initialize all animations
 * All animations disabled for professional, clean feel
 */
export function initAllAnimations(): void {
  // All animations disabled
  return;
}

/**
 * Utility: Add smooth scroll behavior
 */
export function enableSmoothScroll(): void {
  if (typeof document === "undefined") return;

  document.documentElement.classList.add("smooth-scroll");

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (this: HTMLAnchorElement, e: Event) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Utility: Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Auto-initialize smooth scroll only
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enableSmoothScroll);
  } else {
    enableSmoothScroll();
  }
}
