import plugin from "tailwindcss/plugin";
import typographyPlugin from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", md: "1.5rem" },
    },
    extend: {
      colors: {
        // Primary brand colors
        primary: "#f56b2a",
        "primary-hover": "#e65c1e",
        "primary-dark": "#f34e00",
        
        // Secondary brand colors  
        secondary: "#1f2d3d",
        "secondary-hover": "#27394b",
        "secondary-light": "#2e4159",
        
        // Semantic colors
        heading: "#1f2d3d",
        body: "#4a4a4a",
        
        // Background colors
        cream: "#fff9f6",
        bluelight: "#f0f4f8",
        graylight: "#f8fafc",
        pattern: "#eaeaea",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        base: ["16px", { lineHeight: "1.7" }],
        sm: ["15px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.6" }],
        xl: ["20px", { lineHeight: "1.3" }],
        "2xl": ["24px", { lineHeight: "1.2" }],
        "3xl": ["28px", { lineHeight: "1.2" }],
        "4xl": ["32px", { lineHeight: "1.1" }],
        "5xl": ["36px", { lineHeight: "1.1" }],
        "6xl": ["44px", { lineHeight: "1.05" }],
      },
      maxWidth: {
        "2xl": "40rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
      },
      spacing: {
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
      },
      borderRadius: { 
        xl: "1rem", 
        "2xl": "1.5rem", 
        "3xl": "2rem", 
        full: "9999px" 
      },
      animation: { 
        fade: "fadeInUp 1s both" 
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      boxShadow: {
        xl: "0 10px 40px -10px rgba(31,45,61,.12), 0 2px 8px rgba(31,45,61,.06)",
        "outline-primary": "0 0 0 3px rgba(245, 107, 42, 0.25)",
      },
      borderWidth: { 3: "3px", 6: "6px" },
      zIndex: { 60: "60" },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.body"),
            "--tw-prose-headings": theme("colors.heading"),
            "--tw-prose-links": theme("colors.heading"),
            "--tw-prose-bold": theme("colors.heading"),
            "--tw-prose-bullets": theme("colors.body"),
            maxWidth: "100%",
            a: {
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "4px",
              "&:hover": { color: theme("colors.primary") },
            },
            h1: { letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "0.5em" },
            h2: {
              letterSpacing: "-0.01em",
              lineHeight: "1.2",
              marginTop: "1.2em",
              marginBottom: "0.6em",
            },
            h3: {
              letterSpacing: "-0.005em",
              lineHeight: "1.25",
              marginTop: "1em",
              marginBottom: "0.5em",
            },
            p: { lineHeight: "1.75" },
            ul: { marginTop: "0.75em", marginBottom: "0.75em" },
            "ul > li": { marginTop: "0.35em", marginBottom: "0.35em" },
            "code, kbd": {
              backgroundColor: theme("colors.graylight"),
              padding: "0.15em 0.35em",
              borderRadius: "0.375rem",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": "rgba(255,255,255,0.8)",
            "--tw-prose-headings": "#fff",
            "--tw-prose-links": theme("colors.primary"),
            "--tw-prose-bold": "#fff",
            "--tw-prose-bullets": "rgba(255,255,255,0.8)",
            a: { "&:hover": { color: theme("colors.primary-hover") } },
            "code, kbd": { backgroundColor: "rgba(255,255,255,0.08)" },
          },
        },
      }),
    },
  },

  plugins: [
    typographyPlugin,
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
          backgroundColor: theme("colors.white"),
        },
        main: { flex: "1 1 auto" },
        "#page > section:last-child": { marginBottom: "0", paddingBottom: "0" },
        footer: { marginTop: "auto" },
      });

      addUtilities(
        {
          ".sticky-cta": {
            position: "fixed",
            right: "1rem",
            bottom: "max(1rem, env(safe-area-inset-bottom))",
            zIndex: theme("zIndex.60"),
          },
          ".content-scale-95": { transform: "scale(0.95)", transformOrigin: "top center" },
          ".content-scale-90": { transform: "scale(0.90)", transformOrigin: "top center" },
        },
        ["responsive"]
      );

      // Button system - single source of truth
      addComponents({
        // Focus ring utility
        ".focus-ring": {
          outline: "none",
          "&:focus-visible": {
            boxShadow: `0 0 0 2px white, 0 0 0 4px ${theme("colors.primary")}`,
          },
        },
        
        // Link underline utility
        ".link-underline": {
          textDecorationThickness: "1px",
          textUnderlineOffset: "4px",
          "&:hover, &:focus, &:focus-visible": {
            textDecoration: "underline",
          },
        },

        // Base button
        ".btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme("borderRadius.full"),
          fontWeight: "600",
          transition: "all 150ms ease",
          boxShadow: theme("boxShadow.sm"),
          outline: "none",
          padding: `${theme("spacing.3")} ${theme("spacing.6")}`,
          fontSize: theme("fontSize.base")[0],
          lineHeight: "1.5",
          "&:focus-visible": {
            boxShadow: `0 0 0 2px white, 0 0 0 4px ${theme("colors.primary")}`,
          },
        },
        
        // Size variants
        ".btn-sm": { 
          padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
          fontSize: "14px",
          lineHeight: "22px",
        },
        ".btn-md": { 
          padding: `0.625rem ${theme("spacing.5")}`,
          fontSize: "15px",
          lineHeight: "22px",
        },
        ".btn-lg": { 
          padding: `${theme("spacing.3")} ${theme("spacing.6")}`,
          fontSize: theme("fontSize.base")[0],
          lineHeight: "24px",
        },
        
        // Primary button
        ".btn-primary": {
          backgroundColor: theme("colors.primary"),
          color: "white",
          border: `1px solid ${theme("colors.primary")}`,
          "&:hover": {
            backgroundColor: theme("colors.primary-hover"),
            borderColor: theme("colors.primary-hover"),
          },
        },
        
        // Secondary button
        ".btn-secondary": {
          backgroundColor: "white",
          color: theme("colors.secondary"),
          border: "1px solid",
          borderColor: theme("colors.gray.300"),
          "&:hover": {
            backgroundColor: theme("colors.gray.50"),
            borderColor: theme("colors.gray.400"),
          },
        },
        
        // Outline primary button
        ".btn-outline-primary": {
          backgroundColor: "white",
          color: theme("colors.primary"),
          border: `1px solid ${theme("colors.primary")}`,
          "&:hover": {
            backgroundColor: theme("colors.primary"),
            color: "white",
          },
        },
        
        // Tertiary/ghost button
        ".btn-tertiary": {
          backgroundColor: "transparent",
          color: theme("colors.body"),
          border: "none",
          boxShadow: "none",
          "&:hover": {
            color: theme("colors.heading"),
          },
        },
      });
    }),
  ],
};
