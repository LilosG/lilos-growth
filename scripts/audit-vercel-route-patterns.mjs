import fs from "node:fs";
import path from "node:path";

/**
 * Route-pattern guard for GHSA-9wv6-86v2-598j. This examines configured
 * Vercel route sources, not the implementation of @vercel/routing-utils.
 * A clean result must not be represented as a fixed npm vulnerability.
 */
export function findMultiParameterSegments(source) {
  if (typeof source !== "string") return [];
  return source
    .split("/")
    .filter((segment) => (segment.match(/:[A-Za-z_][A-Za-z_0-9]*/g) ?? []).length > 1);
}

export function auditVercelRoutePatterns(config) {
  const findings = [];
  for (const collection of ["redirects", "rewrites", "headers"]) {
    for (const [index, route] of (config[collection] ?? []).entries()) {
      const segments = findMultiParameterSegments(route.source);
      if (segments.length) {
        findings.push({ collection, index, source: route.source, segments });
      }
    }
  }
  return findings;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const root = process.cwd();
  const config = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
  const findings = auditVercelRoutePatterns(config);
  if (findings.length) {
    console.error("Review route sources containing multiple parameters in one segment:");
    console.error(JSON.stringify(findings, null, 2));
    process.exitCode = 1;
  } else {
    console.log("No multi-parameter Vercel route-source segments detected.");
    console.log("This does not remediate the upstream path-to-regexp 6.1.0 advisory.");
  }
}
