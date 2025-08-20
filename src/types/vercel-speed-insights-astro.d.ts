declare module '@vercel/speed-insights/astro' {
  import type { AstroComponentFactory } from 'astro';
  const SpeedInsights: AstroComponentFactory;
  export default SpeedInsights;
  export { SpeedInsights };
}
