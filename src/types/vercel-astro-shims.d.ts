// Minimal shims for Vercel components (no Astro type imports, no `any`).

declare module "@vercel/analytics/astro" {
  const VercelAnalytics: unknown;
  export default VercelAnalytics;
}

declare module "@vercel/speed-insights/astro" {
  const SpeedInsights: unknown;
  export default SpeedInsights;
}

declare global {
  interface Window {
    trackEvent?: (name: string, data?: Record<string, unknown>) => void;
  }
}

export {};
