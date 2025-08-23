// Safe shim for @vercel/speed-insights/astro — no imports from 'astro'
declare module '@vercel/speed-insights/astro' {
  const SpeedInsights: any;
  export default SpeedInsights;
}
export {};
