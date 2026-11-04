import { describe, expect, it } from "vitest";
import { evaluateRuntimeSecurity } from "../scripts/security-runtime-baseline.mjs";

const historical = [
  { name: "@astrojs/vercel", severity: "high", advisories: [] },
  { name: "@vercel/routing-utils", severity: "high", advisories: [] },
  {
    name: "path-to-regexp",
    severity: "high",
    advisories: [{ url: "https://github.com/advisories/GHSA-9wv6-86v2-598j" }],
  },
  { name: "some-moderate-package", severity: "moderate", advisories: [] },
];

describe("runtime audit baseline", () => {
  it("tracks reviewed historical findings without declaring them remediated", () => {
    expect(evaluateRuntimeSecurity(historical)).toEqual([]);
  });

  it("rejects any critical dependency", () => {
    expect(evaluateRuntimeSecurity([{ name: "untrusted", severity: "critical" }])).toHaveLength(1);
  });

  it("rejects a new high-severity dependency", () => {
    expect(evaluateRuntimeSecurity([...historical, { name: "new-package", severity: "high" }])).toEqual([
      "New high-severity runtime dependency: new-package",
    ]);
  });

  it("rejects new high-severity advisories against a grandfathered package", () => {
    expect(
      evaluateRuntimeSecurity([
        {
          name: "path-to-regexp",
          severity: "high",
          advisories: [{ url: "https://github.com/advisories/GHSA-NEW-ADVISORY" }],
        },
      ])
    ).toHaveLength(1);
  });

  it("permits a fully remediated runtime tree", () => {
    expect(evaluateRuntimeSecurity([])).toEqual([]);
  });
});
