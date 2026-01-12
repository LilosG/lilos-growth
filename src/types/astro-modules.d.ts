declare module "*.astro" {
  // Astro components are functions returning JSX-like output.
  const Component: (props: Record<string, unknown>) => unknown;
  export default Component;
}
