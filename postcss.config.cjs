// Tailwind CSS v3 is intentionally retained until the design-system migration.
// Vite applies PostCSS to the single global stylesheet imported by Layout.astro.
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
