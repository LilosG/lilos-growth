// Safe shim for @vercel/analytics/astro — no imports from 'astro'
declare module '@vercel/analytics/astro' {
  const VercelAnalytics: any;
  export default VercelAnalytics;
}
export {};
