export default [
  {
    ignores: [
      '.backups/**', // stop linting local backups
      // add other noise dirs here if needed:
      // 'dist/**', '.vercel/**', 'coverage/**'
    ],
  },
];
