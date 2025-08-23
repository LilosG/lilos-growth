declare module '@vercel/analytics/astro' {
  const VercelAnalytics: any;
  export default VercelAnalytics;
}
declare module '@vercel/speed-insights/astro' {
  const SpeedInsights: any;
  export default SpeedInsights;
}
declare global {
  interface Window {
    trackEvent?: (name: string, data?: Record<string, unknown>) => void;
  }
}
export {};
