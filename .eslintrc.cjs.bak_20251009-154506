// Minimal ESLint config with a per-file override for the data stub.
module.exports = {
  root: true,
  ignorePatterns: ['dist/', 'node_modules/', '.astro/'],
  overrides: [
    {
      files: ['src/data/results.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
};
