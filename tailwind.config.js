import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#f56b2a',          // Vibrant orange
        primaryHover: '#e65c1e',     // Darker orange for hover state
        secondary: '#1f2d3d',        // Deep charcoal/navy
        heading: '#1f2d3d',          // Heading text color
        body: '#4a4a4a',             // Body text color
        cream: '#fff9f6',            // Warm neutral
        bluelight: '#f0f4f8',        // Adjusted for better accessibility
        graylight: '#f8fafc',        // Ultra-light gray
        pattern: '#eaeaea',          // Subtle pattern (optional)
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.7' }],
        sm: ['15px', { lineHeight: '1.6' }],
        lg: ['18px', { lineHeight: '1.6' }],
        xl: ['20px', { lineHeight: '1.3' }],
        '2xl': ['24px', { lineHeight: '1.2' }],
        '3xl': ['28px', { lineHeight: '1.2' }],
        '4xl': ['32px', { lineHeight: '1.1' }],
        '5xl': ['36px', { lineHeight: '1.1' }],
        '6xl': ['44px', { lineHeight: '1.05' }],
      },
      maxWidth: {
        '2xl': '40rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
      },
      spacing: {
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      animation: {
        fade: 'fadeInUp 1s both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        xl: '0 10px 40px -10px rgba(31, 45, 61, 0.12), 0 2px 8px 0 rgba(31, 45, 61, 0.06)',
        'outline-primary': '0 0 0 3px #f56b2a40',
      },
      borderWidth: {
        3: '3px',
        6: '6px',
      },
      zIndex: {
        60: '60', // for sticky CTA above content/footer
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant, addBase, addUtilities, theme }) => {
      // Your existing custom variant
      addVariant('intersect', '&:not([no-intersect])');

      // ---- Global page chrome / sticky-footer base ----
      addBase({
        'html, body': { height: '100%' },
        'html': { scrollBehavior: 'smooth' },
        'body': {
          minHeight: '100svh',                 // supports mobile viewport units
          display: 'flex',
          flexDirection: 'column',
          margin: '0',
          paddingBottom: '0',                  // neutralize accidental bottom padding
          overflowX: 'hidden',
          backgroundColor: theme('colors.white'),
        },
        // Let main consume the available height so the footer sits flush
        'main': { flex: '1 1 auto' },
        // If a page uses #page wrapper, make sure the last section can't add blank space
        '#page > section:last-child': { marginBottom: '0', paddingBottom: '0' },
        // As a safety, ensure footer auto-sticks at the end of flex column
        'footer': { marginTop: 'auto' },
      });

      // ---- Utilities ----
      addUtilities(
        {
          // Fixed CTA button that *does not* affect page layout
          '.sticky-cta': {
            position: 'fixed',
            right: '1rem',
            bottom: 'max(1rem, env(safe-area-inset-bottom))',
            zIndex: theme('zIndex.60'),
          },

          // Optional content scale helpers if you want that ~85–95% “zoomed out” feel per section
          '.content-scale-95': { transform: 'scale(0.95)', transformOrigin: 'top center' },
          '.content-scale-90': { transform: 'scale(0.90)', transformOrigin: 'top center' },
        },
        ['responsive']
      );
    }),
  ],
  darkMode: 'class',
};
