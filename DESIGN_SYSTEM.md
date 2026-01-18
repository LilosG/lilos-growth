# Lilos Growth Design System

**Version:** 2.0  
**Last Updated:** January 17, 2026

---

## Overview

This design system provides a comprehensive set of design tokens, components, and guidelines for building consistent, professional, and accessible interfaces across the Lilos Growth website.

### Key Principles

1. **Professional Scale** - Typography and spacing optimized for a polished, spacious feel
2. **Accessibility First** - WCAG AA compliant color contrast ratios
3. **Consistency** - Single source of truth for all design values
4. **Performance** - Minimal CSS, optimized for fast load times
5. **Maintainability** - Clear patterns and reusable components

---

## Design Tokens

All design tokens are defined in `src/styles/tokens.css` as CSS custom properties. These tokens are the single source of truth for all design values.

### Color System

#### Brand Colors

```css
--color-primary: #f56b2a;        /* Main brand color - orange */
--color-primary-hover: #e65c1e;  /* Hover state */
--color-primary-dark: #f34e00;   /* Dark variant */
--color-primary-light: #ff7a3d;  /* Light variant */
--color-primary-50: #fff7f0;     /* Very light tint */
--color-primary-100: #ffe8d6;    /* Light tint */

--color-secondary: #1f2d3d;      /* Secondary brand - dark blue */
--color-secondary-hover: #27394b;
--color-secondary-light: #2e4159;
--color-secondary-dark: #18232e;
```

#### Semantic Colors

**Usage Guidelines:**

- **`text-heading`** - Page titles, section headings, important labels
- **`text-body`** - All body text, UI labels, card content (DEFAULT)
- **`text-body-light`** - Secondary information, less important text
- **`text-muted`** - De-emphasized text, helper text (use sparingly)
- **`text-subtle`** - Decorative text only, borders, dividers

**⚠️ Important:** Never use `text-muted` or `text-subtle` for critical information or small text (< 14px). Always ensure WCAG AA contrast compliance.

```css
--color-heading: #1f2d3d;        /* High contrast - headings */
--color-body: #374151;           /* Primary text - WCAG AA compliant */
--color-body-light: #4b5563;     /* Secondary text */
--color-muted: #6b7280;          /* De-emphasized - use sparingly */
--color-subtle: #9ca3af;         /* Decorative only */
```

#### Background Colors

```css
--color-background-base: #ffffff;    /* Main background */
--color-background-subtle: #f8fafc;  /* Subtle background */
--color-background-cream: #fff9f6;   /* Warm background */
--color-background-blue: #f0f4f8;    /* Cool background */
```

#### Status Colors

```css
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

### Typography

#### Font Families

```css
--font-heading: 'Poppins', sans-serif;  /* Headings, display text */
--font-body: 'Inter', sans-serif;       /* Body text, UI elements */
```

#### Font Sizes

**Professional scale - reduced by ~12% from original for better visual balance:**

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| `text-xs` | 0.625rem | 10px | Minimal use only |
| `text-sm` | 0.75rem | 12px | Small UI text, labels |
| `text-base` | 0.875rem | 14px | Body text default |
| `text-lg` | 1rem | 16px | Emphasized body text |
| `text-xl` | 1.125rem | 18px | Large body text |
| `text-2xl` | 1.25rem | 20px | Small headings |
| `text-3xl` | 1.5rem | 24px | Section subheadings |
| `text-4xl` | 1.875rem | 30px | Section headings |
| `text-5xl` | 2.25rem | 36px | Page headings |
| `text-6xl` | 3rem | 48px | Hero headings |

**Mobile Adjustments:**

On screens < 768px:
- `text-base`: 15px (slightly larger for readability)
- `text-lg`: 17px

#### Line Heights

```css
--leading-tight: 1.25;      /* Headings */
--leading-snug: 1.4;        /* Subheadings */
--leading-normal: 1.5;      /* Body text */
--leading-relaxed: 1.625;   /* Long-form content */
```

#### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

#### Letter Spacing

```css
--tracking-tight: -0.02em;   /* Large headings */
--tracking-normal: 0;        /* Body text */
--tracking-wide: 0.025em;    /* Small headings */
--tracking-wider: 0.05em;    /* Uppercase labels */
```

### Spacing

#### Base Scale

```css
--space-xs: 0.5rem;      /* 8px */
--space-sm: 0.75rem;     /* 12px */
--space-md: 1rem;        /* 16px */
--space-lg: 1.5rem;      /* 24px */
--space-xl: 2rem;        /* 32px */
--space-2xl: 3rem;       /* 48px */
--space-3xl: 4rem;       /* 64px */
--space-4xl: 6rem;       /* 96px */
```

#### Component Spacing

```css
--space-card-padding: 2rem;           /* 32px - Main card padding */
--space-card-padding-sm: 1.5rem;      /* 24px - Compact card padding */
--space-card-gap: 1.5rem;             /* 24px - Gap between card elements */
--space-section-padding: 5rem;        /* 80px - Section vertical padding */
--space-section-padding-sm: 3rem;     /* 48px - Compact section padding */
```

**Mobile Adjustments:**

On screens < 768px:
- Section padding: 48px (reduced from 80px)
- Card padding: 24px (reduced from 32px)

### Border Radius

```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.25rem;   /* 20px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;

/* Component-specific */
--radius-card: 1rem;      /* 16px - Reduced for professional feel */
--radius-button: 9999px;  /* Fully rounded */
--radius-input: 0.5rem;   /* 8px */
--radius-badge: 9999px;   /* Fully rounded */
```

### Shadows

```css
/* Standard shadows */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Card shadows - Subtle but professional */
--shadow-card: 0 2px 8px rgba(31, 45, 61, 0.06), 0 1px 2px rgba(31, 45, 61, 0.03);
--shadow-card-hover: 0 8px 16px rgba(31, 45, 61, 0.1), 0 3px 6px rgba(31, 45, 61, 0.05);

/* Colored shadows */
--shadow-primary: 0 10px 40px -10px rgba(245, 107, 42, 0.15);
--shadow-primary-lg: 0 20px 50px -10px rgba(245, 107, 42, 0.25);
```

### Layout

#### Container Widths

**Optimized for readability and professional feel:**

```css
--container-sm: 36rem;   /* 576px */
--container-md: 44rem;   /* 704px */
--container-lg: 58rem;   /* 928px */
--container-xl: 68rem;   /* 1088px - Reduced from 1152px */
--container-2xl: 75rem;  /* 1200px - Reduced from 1280px */
```

**Rationale:** Reduced max-width creates better content density and a more premium feel. Content doesn't spread too wide on large screens, improving readability.

---

## Component Library

### Core Components

Located in `src/components/core/`

#### Button

**Variants:**
- `primary` - Main CTA (orange background)
- `secondary` - Secondary action (dark background)
- `outline` - Outlined style
- `ghost` - Minimal style

**Sizes:**
- `sm` - Small (32px height)
- `md` - Medium (40px height)
- `lg` - Large (48px height)

**Usage:**
```astro
<Button variant="primary" size="md" href="/contact">
  Get Started
</Button>
```

#### Card

**Variants:**
- `default` - Basic card with border
- `elevated` - Card with shadow
- `interactive` - Hover effects for clickable cards
- `outlined` - Emphasized border

**Sizes:**
- `sm` - Compact padding
- `md` - Standard padding
- `lg` - Generous padding

**Usage:**
```astro
<Card variant="elevated" size="md">
  <!-- Card content -->
</Card>
```

#### Badge

**Variants:**
- `primary` - Orange
- `secondary` - Dark blue
- `success` - Green
- `info` - Blue
- `website` - Blue (for service type)
- `gbp` - Green (for service type)
- `seo` - Purple (for service type)

**Usage:**
```astro
<Badge variant="primary">Featured</Badge>
```

### Composed Components

Located in `src/components/composed/`

#### CaseStudyCard

Displays client case studies with metrics and optional screenshot.

**Key Features:**
- Responsive grid layout
- Service type badges
- Metric display with proper contrast
- Optional screenshot with overlay CTA
- Optional case study link

**Usage:**
```astro
<CaseStudyCard
  client="Blue Door Pest Control"
  location="Jupiter, FL"
  sector="Pest Control"
  serviceTypes={['website', 'gbp', 'local-seo']}
  description="..."
  metrics={[
    { label: "Organic Leads", value: "+118%" },
    { label: "Cost Per Lead", value: "-41%" },
    { label: "GBP Calls", value: "+89%" }
  ]}
  screenshot={{ src: "...", alt: "..." }}
/>
```

#### StatCard

Displays a single metric with label and optional note.

**Usage:**
```astro
<StatCard
  label="Avg. Lead Growth"
  value="+142%"
  note="12-month median across active clients"
/>
```

#### PricingCard

Displays pricing tiers with features and CTA.

**Key Features:**
- Featured/popular highlighting
- Feature list with checkmarks
- Flexible pricing display
- Optional footer note

**Usage:**
```astro
<PricingCard
  title="GBP + Local SEO"
  subtitle="Steady Map Pack & organic gains"
  price="699"
  period="mo"
  features={[
    "Up to 10 core/optimized service IDs (single geo)",
    "GBP profile: setup, photos, updates, 4+ posts/mo",
    "..."
  ]}
  ctaText="Choose Plan"
  ctaHref="/packages"
  featured={true}
/>
```

#### ServiceCard

Displays a service offering with icon, title, description, and features.

**Usage:**
```astro
<ServiceCard
  icon="tabler:map-pin"
  title="Local Citation Building"
  description="..."
  features={[
    "Business info (NAP) cleanup",
    "Submissions to top directories",
    "Ongoing updates and audits"
  ]}
/>
```

---

## Best Practices

### Typography

1. **Use semantic color classes:**
   - `text-heading` for headings and important labels
   - `text-body` for all body text and UI labels (default)
   - `text-body-light` for secondary information
   - `text-muted` sparingly for de-emphasized text
   - `text-subtle` only for decorative elements

2. **Maintain hierarchy:**
   - Use consistent heading levels (h1 → h2 → h3)
   - Don't skip heading levels
   - Use font size to reinforce hierarchy

3. **Ensure readability:**
   - Minimum 14px (text-base) for body text
   - Minimum 12px (text-sm) for UI labels
   - Use `leading-relaxed` for long-form content
   - Ensure sufficient contrast (WCAG AA minimum)

### Spacing

1. **Use design tokens:**
   - Always use spacing tokens (e.g., `gap-4`, `p-6`)
   - Never use arbitrary values unless absolutely necessary
   - Use component-specific tokens for cards and sections

2. **Maintain consistency:**
   - Use the same spacing patterns across similar components
   - Follow the 8px grid system (all tokens are multiples of 8px)

3. **Create breathing room:**
   - Don't be afraid of whitespace
   - Use generous padding in cards and sections
   - Ensure adequate gap between elements

### Components

1. **Use the component library:**
   - Always use core components (Button, Card, Badge)
   - Build new features with composed components
   - Don't create one-off solutions

2. **Follow the hierarchy:**
   - Core components → Composed components → Page layouts
   - Composed components should use core components
   - Pages should use composed components

3. **Keep components focused:**
   - Each component should have a single responsibility
   - Use props for customization
   - Provide sensible defaults

### Accessibility

1. **Color contrast:**
   - Ensure WCAG AA compliance (4.5:1 for normal text)
   - Test with contrast checkers
   - Use `text-body` or darker for small text

2. **Semantic HTML:**
   - Use proper heading hierarchy
   - Use `<button>` for actions, `<a>` for navigation
   - Include proper ARIA labels when needed

3. **Keyboard navigation:**
   - Ensure all interactive elements are keyboard accessible
   - Provide visible focus states
   - Test with keyboard only

### Performance

1. **Optimize images:**
   - Use WebP format
   - Provide appropriate sizes
   - Use lazy loading

2. **Minimize CSS:**
   - Use Tailwind's purge feature
   - Avoid custom CSS when possible
   - Use design tokens for consistency

3. **Reduce JavaScript:**
   - Leverage Astro's static generation
   - Use progressive enhancement
   - Only add interactivity when necessary

---

## Migration Guide

### From Old Widgets to New Components

**Old Pattern:**
```astro
<Features items={...} />
```

**New Pattern:**
```astro
<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {services.map(service => (
    <ServiceCard {...service} />
  ))}
</div>
```

### Updating Text Colors

**Old (problematic):**
```astro
<p class="text-gray-500">Label</p>
<p class="text-gray-400">Subtle text</p>
```

**New (correct):**
```astro
<p class="text-body">Label</p>
<p class="text-body-light">Secondary info</p>
```

### Updating Typography Scale

**Old (too large):**
```astro
<h1 class="text-6xl">Hero Heading</h1>
<p class="text-lg">Body text</p>
```

**New (professional):**
```astro
<h1 class="text-5xl md:text-6xl">Hero Heading</h1>
<p class="text-base">Body text</p>
```

---

## Testing Checklist

### Visual Testing

- [ ] Check all pages at different breakpoints (mobile, tablet, desktop)
- [ ] Verify typography hierarchy is consistent
- [ ] Ensure adequate whitespace and breathing room
- [ ] Check that colors match design tokens
- [ ] Verify shadows and borders are consistent

### Accessibility Testing

- [ ] Run Lighthouse accessibility audit
- [ ] Check color contrast with WebAIM checker
- [ ] Test keyboard navigation
- [ ] Verify screen reader compatibility
- [ ] Check focus states are visible

### Cross-browser Testing

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## Resources

### Tools

- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Lighthouse:** Built into Chrome DevTools
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Astro Docs:** https://docs.astro.build

### Internal Files

- Design tokens: `src/styles/tokens.css`
- Tailwind config: `tailwind.config.js`
- Core components: `src/components/core/`
- Composed components: `src/components/composed/`

---

## Changelog

### Version 2.0 (January 17, 2026)

- Reduced typography scale by ~12% for professional feel
- Added `text-body-light` color token
- Reduced container max-width to 1200px
- Updated card border radius to 16px
- Refined shadow system for subtlety
- Added comprehensive usage guidelines
- Updated all composed components to use new scale

### Version 1.0 (Previous)

- Initial design token system
- Core component library
- Basic composed components
- Tailwind configuration

