import plugin from "tailwindcss/plugin";
import typographyPlugin from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "var(--container-padding)",
        lg: "var(--container-padding-lg)",
      },
    },
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
        },
        
        // Secondary brand colors  
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondary-hover)",
          light: "var(--color-secondary-light)",
          dark: "var(--color-secondary-dark)",
        },
        
        // Semantic colors
        heading: "var(--color-heading)",
        body: "var(--color-body)",
        "body-light": "var(--color-body-light)",
        muted: "var(--color-muted)",
        subtle: "var(--color-subtle)",
        
        // Surface colors
        surface: {
          base: "var(--color-surface-base)",
          raised: "var(--color-surface-raised)",
          overlay: "var(--color-surface-overlay)",
        },
        
        // Background colors
        background: {
          base: "var(--color-background-base)",
          subtle: "var(--color-background-subtle)",
          cream: "var(--color-background-cream)",
          blue: "var(--color-background-blue)",
        },
        
        // Border colors
        border: {
          base: "var(--color-border-base)",
          subtle: "var(--color-border-subtle)",
          strong: "var(--color-border-strong)",
        },
        
        // Status colors
        success: {
          DEFAULT: "var(--color-success)",
          light: "var(--color-success-light)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          light: "var(--color-warning-light)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          light: "var(--color-error-light)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          light: "var(--color-info-light)",
        },
        
        // Service type colors
        service: {
          website: "var(--color-service-website)",
          "website-light": "var(--color-service-website-light)",
          gbp: "var(--color-service-gbp)",
          "gbp-light": "var(--color-service-gbp-light)",
          seo: "var(--color-service-seo)",
          "seo-light": "var(--color-service-seo-light)",
        },
      },
      
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
      },
      
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "var(--leading-normal)" }],
        sm: ["var(--text-sm)", { lineHeight: "var(--leading-normal)" }],
        base: ["var(--text-base)", { lineHeight: "var(--leading-relaxed)" }],
        lg: ["var(--text-lg)", { lineHeight: "var(--leading-normal)" }],
        xl: ["var(--text-xl)", { lineHeight: "var(--leading-snug)" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-snug)" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-snug)" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "var(--leading-tight)" }],
        "5xl": ["var(--text-5xl)", { lineHeight: "var(--leading-tight)" }],
        "6xl": ["var(--text-6xl)", { lineHeight: "var(--leading-tight)" }],
      },
      
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
      },
      
      borderRadius: { 
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
        card: "var(--radius-card)",
        button: "var(--radius-button)",
        input: "var(--radius-input)",
        badge: "var(--radius-badge)",
      },
      
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        primary: "var(--shadow-primary)",
        "primary-lg": "var(--shadow-primary-lg)",
      },
      
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },
      
      zIndex: {
        base: "var(--z-base)",
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        fixed: "var(--z-fixed)",
        "modal-backdrop": "var(--z-modal-backdrop)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
      },

      maxWidth: {
        xs: "var(--container-xs)",
        sm: "var(--container-sm)",
        md: "var(--container-md)",
        lg: "var(--container-lg)",
        xl: "var(--container-xl)",
        "2xl": "var(--container-2xl)",
        prose: "var(--width-prose)",
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--color-body)",
            "--tw-prose-headings": "var(--color-heading)",
            "--tw-prose-links": "var(--color-heading)",
            "--tw-prose-bold": "var(--color-heading)",
            "--tw-prose-bullets": "var(--color-body)",
            maxWidth: "100%",
            a: {
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "4px",
              "&:hover": { color: "var(--color-primary)" },
            },
            h1: { 
              letterSpacing: "-0.02em", 
              lineHeight: "var(--leading-tight)", 
              marginBottom: "0.5em" 
            },
            h2: {
              letterSpacing: "-0.01em",
              lineHeight: "var(--leading-snug)",
              marginTop: "1.2em",
              marginBottom: "0.6em",
            },
            h3: {
              letterSpacing: "-0.005em",
              lineHeight: "var(--leading-snug)",
              marginTop: "1em",
              marginBottom: "0.5em",
            },
            p: { lineHeight: "var(--leading-relaxed)" },
            ul: { marginTop: "0.75em", marginBottom: "0.75em" },
            "ul > li": { marginTop: "0.35em", marginBottom: "0.35em" },
            "code, kbd": {
              backgroundColor: "var(--color-background-subtle)",
              padding: "0.15em 0.35em",
              borderRadius: "var(--radius-sm)",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": "rgba(255,255,255,0.8)",
            "--tw-prose-headings": "#fff",
            "--tw-prose-links": "var(--color-primary)",
            "--tw-prose-bold": "#fff",
            "--tw-prose-bullets": "rgba(255,255,255,0.8)",
            a: { "&:hover": { color: "var(--color-primary-hover)" } },
            "code, kbd": { backgroundColor: "rgba(255,255,255,0.08)" },
          },
        },
      }),
    },
  },

  plugins: [
    typographyPlugin,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    plugin(({ addVariant, addBase, addUtilities, addComponents, theme }) => {
      addVariant("intersect", "&:not([no-intersect])");

      addBase({
        "html, body": { height: "100%" },
        html: { scrollBehavior: "smooth" },
        body: {
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          margin: "0",
          paddingBottom: "0",
          overflowX: "hidden",
          backgroundColor: "var(--color-background-base)",
          fontFamily: "var(--font-body)",
          color: "var(--color-body)",
        },
        main: { flex: "1 1 auto" },
        "#page > section:last-child": { marginBottom: "0", paddingBottom: "0" },
        footer: { marginTop: "auto" },
      });

      addUtilities({
        ".sticky-cta": {
          position: "fixed",
          right: "1rem",
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          zIndex: "var(--z-fixed)",
        },
      });

      // Component system - single source of truth
      addComponents({
        // ============================================
        // CARD COMPONENTS
        // ============================================
        
        ".card": {
          backgroundColor: "var(--color-surface-base)",
          borderRadius: "var(--radius-card)",
          padding: "var(--space-card-padding)",
          border: "1px solid var(--color-border-subtle)",
          transition: "all var(--transition-base)",
        },
        
        ".card-elevated": {
          backgroundColor: "var(--color-surface-raised)",
          borderRadius: "var(--radius-card)",
          padding: "var(--space-card-padding)",
          boxShadow: "var(--shadow-md)",
          border: "1px solid var(--color-border-subtle)",
          transition: "all var(--transition-base)",
          "&:hover": {
            boxShadow: "var(--shadow-lg)",
            transform: "translateY(-2px)",
          },
        },
        
        ".card-interactive": {
          backgroundColor: "var(--color-surface-base)",
          borderRadius: "var(--radius-card)",
          padding: "var(--space-card-padding)",
          border: "2px solid transparent",
          boxShadow: "var(--shadow-sm)",
          transition: "all var(--transition-base)",
          cursor: "pointer",
          "&:hover": {
            borderColor: "var(--color-primary)",
            boxShadow: "var(--shadow-primary)",
            transform: "translateY(-4px)",
          },
        },
        
        ".card-outlined": {
          backgroundColor: "transparent",
          borderRadius: "var(--radius-card)",
          padding: "var(--space-card-padding)",
          border: "2px solid var(--color-border-base)",
          transition: "all var(--transition-base)",
        },
        
        ".card-sm": {
          padding: "var(--space-card-padding-sm)",
        },
        
        // ============================================
        // BUTTON COMPONENTS
        // ============================================
        
        ".btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          borderRadius: "var(--radius-button)",
          fontFamily: "var(--font-heading)",
          fontWeight: "var(--font-semibold)",
          transition: "all var(--transition-fast)",
          outline: "none",
          cursor: "pointer",
          textDecoration: "none",
          whiteSpace: "nowrap",
          "&:disabled": {
            opacity: "0.5",
            cursor: "not-allowed",
          },
        },
        
        ".btn-sm": { 
          padding: "0.5rem 1rem",
          fontSize: "var(--text-sm)",
          lineHeight: "1.5",
        },
        
        ".btn-md": { 
          padding: "0.75rem 1.5rem",
          fontSize: "var(--text-base)",
          lineHeight: "1.5",
        },
        
        ".btn-lg": { 
          padding: "1rem 2rem",
          fontSize: "var(--text-lg)",
          lineHeight: "1.5",
        },
        
        ".btn-primary": {
          backgroundColor: "var(--color-primary)",
          color: "white",
          boxShadow: "var(--shadow-sm)",
          "&:hover": {
            backgroundColor: "var(--color-primary-hover)",
            boxShadow: "var(--shadow-md)",
          },
          "&:active": {
            backgroundColor: "var(--color-primary-dark)",
          },
          "&:focus-visible": {
            outline: "2px solid var(--color-primary)",
            outlineOffset: "2px",
          },
        },
        
        ".btn-secondary": {
          backgroundColor: "var(--color-secondary)",
          color: "white",
          boxShadow: "var(--shadow-sm)",
          "&:hover": {
            backgroundColor: "var(--color-secondary-hover)",
            boxShadow: "var(--shadow-md)",
          },
          "&:focus-visible": {
            outline: "2px solid var(--color-secondary)",
            outlineOffset: "2px",
          },
        },
        
        ".btn-outline": {
          backgroundColor: "transparent",
          color: "var(--color-primary)",
          border: "2px solid var(--color-primary)",
          "&:hover": {
            backgroundColor: "var(--color-primary)",
            color: "white",
          },
          "&:focus-visible": {
            outline: "2px solid var(--color-primary)",
            outlineOffset: "2px",
          },
        },
        
        ".btn-ghost": {
          backgroundColor: "transparent",
          color: "var(--color-body)",
          "&:hover": {
            backgroundColor: "var(--color-background-subtle)",
            color: "var(--color-heading)",
          },
        },
        
        // ============================================
        // BADGE COMPONENTS
        // ============================================
        
        ".badge": {
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.25rem 0.75rem",
          borderRadius: "var(--radius-badge)",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-semibold)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
        },
        
        ".badge-primary": {
          backgroundColor: "var(--color-primary-100)",
          color: "var(--color-primary-dark)",
        },
        
        ".badge-success": {
          backgroundColor: "var(--color-success-light)",
          color: "var(--color-success)",
        },
        
        ".badge-info": {
          backgroundColor: "var(--color-info-light)",
          color: "var(--color-info)",
        },
        
        ".badge-website": {
          backgroundColor: "var(--color-service-website-light)",
          color: "var(--color-service-website)",
        },
        
        ".badge-gbp": {
          backgroundColor: "var(--color-service-gbp-light)",
          color: "var(--color-service-gbp)",
        },
        
        ".badge-seo": {
          backgroundColor: "var(--color-service-seo-light)",
          color: "var(--color-service-seo)",
        },
        
        // ============================================
        // INPUT COMPONENTS
        // ============================================
        
        ".input": {
          width: "100%",
          padding: "0.75rem 1rem",
          borderRadius: "var(--radius-input)",
          border: "1px solid var(--color-border-base)",
          fontSize: "var(--text-base)",
          fontFamily: "var(--font-body)",
          color: "var(--color-heading)",
          backgroundColor: "var(--color-surface-base)",
          transition: "all var(--transition-fast)",
          outline: "none",
          "&:hover": {
            borderColor: "var(--color-border-strong)",
          },
          "&:focus": {
            borderColor: "var(--color-primary)",
            boxShadow: "0 0 0 3px var(--color-primary-50)",
          },
          "&::placeholder": {
            color: "var(--color-muted)",
          },
          "&:disabled": {
            backgroundColor: "var(--color-background-subtle)",
            cursor: "not-allowed",
            opacity: "0.6",
          },
        },
        
        ".input-error": {
          borderColor: "var(--color-error)",
          "&:focus": {
            borderColor: "var(--color-error)",
            boxShadow: "0 0 0 3px var(--color-error-light)",
          },
        },
        
        // ============================================
        // UTILITY COMPONENTS
        // ============================================
        
        ".focus-ring": {
          outline: "none",
          "&:focus-visible": {
            outline: "2px solid var(--color-primary)",
            outlineOffset: "2px",
          },
        },
        
        ".link-underline": {
          textDecorationThickness: "1px",
          textUnderlineOffset: "4px",
          transition: "color var(--transition-fast)",
          "&:hover": {
            textDecoration: "underline",
            color: "var(--color-primary)",
          },
        },
        
        ".section-padding": {
          paddingTop: "var(--space-section-padding)",
          paddingBottom: "var(--space-section-padding)",
        },
        
        ".section-padding-sm": {
          paddingTop: "var(--space-section-padding-sm)",
          paddingBottom: "var(--space-section-padding-sm)",
        },
      });
    }),
  ],
};
