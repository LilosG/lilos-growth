import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
  // Avoid picking up any parent PostCSS config outside the repo.
  css: {
    postcss: false,
  },
});
