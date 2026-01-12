import js from "@eslint/js";
import globals from "globals";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".backups/**", "dist/**", "node_modules/**", ".vercel/**", ".astro/**", "public/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  {
    files: ["**/*.{ts,tsx,astro}"],
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,astro}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: [
      "**/*.cjs",
      ".prettierrc.cjs",
      "api/**/*.{js,ts}",
      "astro.config.*",
      "tailwind.config.*",
      "eslint.config.*",
      "scripts/**/*.{js,ts,cjs,mjs}",
    ],
    languageOptions: {
      globals: globals.node,
      sourceType: "script",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
    },
  },
];
