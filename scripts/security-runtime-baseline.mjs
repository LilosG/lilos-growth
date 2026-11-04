/**
 * Explicitly grandfather only the high-severity runtime findings reviewed on
 * 2026-11-03. This is a temporary exception list, NOT a vulnerability fix.
 * New high-severity packages/advisories and every critical finding fail CI.
 *
 * @astrojs/vercel and @vercel/routing-utils are the parent dependency findings
 * surfaced by npm audit for GHSA-9wv6-86v2-598j in path-to-regexp.
 */
export const acceptedRuntimeHigh = Object.freeze({
  "@astrojs/vercel": [],
  "@vercel/routing-utils": [],
  "path-to-regexp": ["https://github.com/advisories/GHSA-9wv6-86v2-598j"],
});

export function evaluateRuntimeSecurity(rows) {
  const violations = [];
  for (const finding of rows) {
    if (finding.severity === "critical") {
      violations.push(`Critical runtime dependency: ${finding.name}`);
      continue;
    }
    if (finding.severity !== "high") continue;
    const allowedAdvisories = acceptedRuntimeHigh[finding.name];
    if (!allowedAdvisories) {
      violations.push(`New high-severity runtime dependency: ${finding.name}`);
      continue;
    }
    for (const advisory of finding.advisories ?? []) {
      if (!allowedAdvisories.includes(advisory.url)) {
        violations.push(`New high-severity advisory: ${finding.name} ${advisory.url ?? "unknown"}`);
      }
    }
  }
  return violations;
}
