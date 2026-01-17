/**
 * Lilos Growth Animation Utilities
 * Professional scroll-based animations using Intersection Observer
 */

/**
 * Initialize scroll-based animations for elements with data-animate attribute
 * Usage: <div data-animate="fade-in-up" data-delay="0.2">Content</div>
 */
export function initScrollAnimations() {
  // Check if browser supports Intersection Observer
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show all elements
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const animation = element.dataset.animate || 'fade-in-up';
        const delay = element.dataset.delay || '0';

        // Add delay if specified
        if (delay !== '0') {
          element.style.animationDelay = `${delay}s`;
        }

        // Add animation class
        element.classList.add(animation);
        element.classList.add('is-visible');

        // Unobserve after animation
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe all elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Initialize staggered animations for grid items
 * Usage: <div data-stagger-container><div data-stagger-item>...</div></div>
 */
export function initStaggerAnimations() {
  const containers = document.querySelectorAll('[data-stagger-container]');

  containers.forEach((container) => {
    const items = container.querySelectorAll('[data-stagger-item]');
    const baseDelay = parseFloat(container.getAttribute('data-stagger-delay') || '0.1');

    items.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.animationDelay = `${baseDelay * index}s`;
    });
  });
}

/**
 * Add parallax effect to hero sections
 * Usage: <section data-parallax data-speed="0.5">...</section>
 */
export function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  const handleScroll = () => {
    parallaxElements.forEach((element) => {
      const el = element as HTMLElement;
      const speed = parseFloat(el.dataset.speed || '0.5');
      const rect = el.getBoundingClientRect();
      const scrolled = window.pageYOffset;

      // Only apply parallax if element is in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  };

  // Use requestAnimationFrame for smooth performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Add ripple effect to buttons
 * Usage: <button data-ripple>Click me</button>
 */
export function initRippleEffect() {
  document.querySelectorAll('[data-ripple]').forEach((button) => {
    button.addEventListener('click', function (e: Event) {
      const btn = this as HTMLElement;
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const mouseEvent = e as MouseEvent;

      const size = Math.max(rect.width, rect.height);
      const x = mouseEvent.clientX - rect.left - size / 2;
      const y = mouseEvent.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple-effect');

      btn.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/**
 * Initialize all animations on page load
 */
export function initAllAnimations() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      initStaggerAnimations();
      initParallax();
      initRippleEffect();
    });
  } else {
    initScrollAnimations();
    initStaggerAnimations();
    initParallax();
    initRippleEffect();
  }
}

/**
 * Utility: Add smooth scroll behavior
 */
export function enableSmoothScroll() {
  document.documentElement.classList.add('smooth-scroll');

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = (this as HTMLAnchorElement).getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/**
 * Utility: Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// CSS for ripple effect (inject into head)
const rippleStyles = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// Inject ripple styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = rippleStyles;
  document.head.appendChild(style);
}
