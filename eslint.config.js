import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';

export default [
  // Ignore build artifacts so ESLint only checks your source files
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.vercel/**',
      '.vercel_build_output/**',
      '.astro/**',
      'coverage/**',
      'vendor/**',
      '.github/**',
      'types.generated.d.ts',
    ],
  },

  // Base configs
  js.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  ...tseslint.configs.recommended,

  // Global environments
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.astro'],
      },
    },
  },

  // TS (and virtual JS inside <script> of .astro)
  {
    files: ['**/*.{ts,tsx}', '**/*.astro/*.js'],
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      // Disable base rule; use TS-aware version
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Project-wide niceties
  {
    files: ['**/*.{js,jsx,ts,tsx,astro}'],
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'no-var': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
];
