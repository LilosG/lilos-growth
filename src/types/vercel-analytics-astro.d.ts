declare module '@vercel/analytics/astro' {
  import type { AstroComponentFactory } from 'astro';
  const Analytics: AstroComponentFactory;
  export default Analytics;
  export { Analytics };
}
