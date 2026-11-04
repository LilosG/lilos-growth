import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { auditVercelRoutePatterns, findMultiParameterSegments } from "../scripts/audit-vercel-route-patterns.mjs";

describe("Vercel route pattern guard", () => {
  it("rejects multiple path parameters in a single segment", () => {
    expect(findMultiParameterSegments("/archive/:year-:month")).toEqual([":year-:month"]);
    expect(findMultiParameterSegments("/:a-:b")).toEqual([":a-:b"]);
  });

  it("allows single parameters in separate segments and static route patterns", () => {
    expect(findMultiParameterSegments("/:path*")).toEqual([]);
    expect(findMultiParameterSegments("/archive/:year/:month/:slug*")).toEqual([]);
    expect(findMultiParameterSegments("/blog/")).toEqual([]);
  });

  it("checks redirects, rewrites and headers", () => {
    const input = {
      redirects: [{ source: "/archive/:year-:month", destination: "/archive" }],
      rewrites: [{ source: "/:x-:y", destination: "/page" }],
      headers: [{ source: "/assets/:path*" }],
    };
    expect(auditVercelRoutePatterns(input).map((finding) => finding.collection)).toEqual([
      "redirects",
      "rewrites",
    ]);
  });

  it("keeps the current production route configuration free of this pattern", () => {
    const input = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
    expect(auditVercelRoutePatterns(input)).toEqual([]);
  });
});
