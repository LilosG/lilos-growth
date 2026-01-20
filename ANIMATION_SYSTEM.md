# Lilos Growth Animation System

## Overview

A comprehensive, professional animation system built with CSS animations, Intersection Observer API, and Tailwind CSS. Designed to create a "WOW" feeling while maintaining clean, modern aesthetics and optimal performance.

## Architecture

### Core Files

1. **`/src/styles/animations.css`** - CSS keyframes and animation classes
2. **`/src/utils/animations.ts`** - JavaScript utilities for scroll-based animations
3. **`/src/layouts/Layout.astro`** - Global initialization

### Technology Stack

- **CSS Animations**: Hardware-accelerated transforms and opacity
- **Intersection Observer API**: Efficient scroll-based triggers
- **Tailwind CSS**: Utility classes for transitions
- **TypeScript**: Type-safe animation utilities

## Animation Types

### 1. Scroll-Based Animations

Elements animate into view as users scroll down the page.

**Available Animations:**

- `fade-in-up` - Fade in while sliding up from bottom
- `fade-in-down` - Fade in while sliding down from top
- `fade-in-left` - Fade in while sliding from left
- `fade-in-right` - Fade in while sliding from right
- `scale-in` - Fade in with scale effect
- `slide-in-up` - Slide up without fade
- `slide-in-down` - Slide down without fade

**Usage:**

```html
<div data-animate="fade-in-up">Content that fades in and slides up</div>

<!-- With delay -->
<div data-animate="fade-in-up" data-delay="0.2">Content with 200ms delay</div>
```

### 2. Staggered Grid Animations

Cards or items in a grid animate sequentially with a delay between each.

**Usage:**

```html
<div data-stagger-container data-stagger-delay="0.1">
  <div data-stagger-item data-animate="fade-in-up">Card 1</div>
  <div data-stagger-item data-animate="fade-in-up">Card 2</div>
  <div data-stagger-item data-animate="fade-in-up">Card 3</div>
</div>
```

**Parameters:**

- `data-stagger-delay` - Delay between items in seconds (default: 0.1)

### 3. Hero Section Animations

**Animated Gradient Background:**

```html
<section class="hero-gradient-animated bg-secondary">
  <!-- Hero content -->
</section>
```

Creates a subtle 15-second color shift animation on hero backgrounds.

### 4. Micro-Interactions

#### Button Animations

**Ripple Effect:**

```html
<button data-ripple>Click me</button>
```

**Animated Primary Button:**

```html
<button class="btn-primary-animated">Hover me</button>
```

#### Card Animations

**Card Lift:**

```html
<div class="card-lift card">
  <!-- Card content -->
</div>
```

**Card Glow:**

```html
<div class="card-glow card">
  <!-- Card content -->
</div>
```

**Service Card Hover:**

```html
<div class="service-card-hover">
  <!-- Service card content -->
</div>
```

**Pricing Card Highlight:**

```html
<div class="pricing-card-highlight">
  <!-- Pricing card content -->
</div>
```

### 5. Loading States

**Skeleton Loader:**

```html
<div class="skeleton-loader"></div>
```

**Pulse Animation:**

```html
<div class="animate-pulse-slow">
  <!-- Content -->
</div>
```

### 6. Floating/Breathing Effects

**Floating Animation:**

```html
<div class="float-animation">
  <!-- Floating element -->
</div>
```

## Performance Optimizations

### Hardware Acceleration

All animations use GPU-accelerated properties:

- `transform` (translate, scale, rotate)
- `opacity`

Avoid animating:

- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### Intersection Observer

- **Threshold**: 0.1 (10% visible)
- **Root Margin**: -50px from bottom
- **Unobserve**: Elements are unobserved after animation completes

### Accessibility

**Respects `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Users who prefer reduced motion will see instant transitions instead of animations.

## Best Practices

### 1. Animation Timing

- **Fast interactions**: 150-200ms (buttons, links)
- **Standard animations**: 300ms (cards, modals)
- **Hero animations**: 600-800ms (page load, hero sections)
- **Ambient animations**: 3-15s (gradients, floating effects)

### 2. Easing Functions

- **ease-out**: Default for most animations (natural deceleration)
- **ease-in-out**: For reversible animations
- **cubic-bezier(0.34, 1.56, 0.64, 1)**: For playful bounce effects

### 3. Stagger Delays

- **Small grids (3-4 items)**: 0.1s delay
- **Medium grids (6-9 items)**: 0.1-0.15s delay
- **Large grids (12+ items)**: 0.05-0.1s delay

### 4. Animation Distance

- **Subtle**: 10-20px translate
- **Standard**: 20-30px translate (current default)
- **Dramatic**: 40-60px translate

## Implementation Examples

### Homepage Service Grid

```astro
<div class="grid gap-8 md:grid-cols-3" data-stagger-container data-stagger-delay="0.1">
  {
    services.map((service) => (
      <div data-stagger-item data-animate="fade-in-up">
        <ServiceCard {...service} />
      </div>
    ))
  }
</div>
```

### Results Page Stats

```astro
<div class="grid grid-cols-4 gap-6" data-stagger-container data-stagger-delay="0.15">
  {
    stats.map((stat) => (
      <div data-stagger-item data-animate="scale-in">
        <StatCard {...stat} />
      </div>
    ))
  }
</div>
```

### Hero Section

```astro
<section class="hero-gradient-animated bg-secondary">
  <div data-animate="fade-in-up">
    <h1>Main Heading</h1>
    <p>Subheading</p>
  </div>

  <div data-animate="fade-in-up" data-delay="0.2">
    <LeadCaptureForm />
  </div>
</section>
```

## Browser Support

- **Modern browsers**: Full support (Chrome 51+, Firefox 55+, Safari 12.1+, Edge 79+)
- **Legacy browsers**: Graceful degradation (elements appear without animation)
- **Mobile**: Optimized for 60fps on modern devices

## Debugging

### Check if animations are initialized:

```javascript
// In browser console
console.log("Animations loaded:", typeof initAllAnimations !== "undefined");
```

### Verify Intersection Observer:

```javascript
// In browser console
console.log("IntersectionObserver supported:", "IntersectionObserver" in window);
```

### Test reduced motion:

```javascript
// In browser console
console.log(
  "Prefers reduced motion:",
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
);
```

## Future Enhancements

Potential additions for future iterations:

1. **Page Transitions**: Smooth transitions between pages using View Transitions API
2. **Scroll Progress Indicator**: Animated progress bar at top of page
3. **Parallax Scrolling**: Subtle parallax effects on hero images
4. **Number Counters**: Animated counting up for statistics
5. **Draw SVG Animations**: Animate SVG paths on scroll
6. **Magnetic Buttons**: Buttons that follow cursor on hover
7. **Cursor Trail Effects**: Custom cursor with trail effect

## Maintenance

### Adding New Animations

1. Add keyframe to `/src/styles/animations.css`
2. Create utility class with animation
3. Document usage in this file
4. Test across browsers and devices

### Modifying Timing

Update timing values in:

- `/src/styles/animations.css` - Animation durations
- `/src/utils/animations.ts` - Stagger delays and Intersection Observer thresholds

### Performance Monitoring

Use Chrome DevTools Performance tab to:

1. Record page load and scroll
2. Check for layout thrashing
3. Verify 60fps during animations
4. Identify paint/composite bottlenecks

## Credits

Animation system designed and implemented for Lilos Growth by Manus AI, following industry best practices from:

- Material Design Motion Guidelines
- Apple Human Interface Guidelines
- Web Animation API specifications
- CSS Animation Performance best practices

---

**Last Updated**: January 17, 2026  
**Version**: 1.0.0  
**Maintainer**: Lilos Growth Development Team
