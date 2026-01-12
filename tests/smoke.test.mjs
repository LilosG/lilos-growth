import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const read = (p) => fs.readFileSync(path.resolve(p), "utf8");

describe("repo smoke checks", () => {
  it("has Astro config and package.json", () => {
    expect(fs.existsSync("astro.config.ts")).toBe(true);
    expect(fs.existsSync("package.json")).toBe(true);
  });

  it("is configured for static output", () => {
    const astroConfig = read("astro.config.ts");
    expect(astroConfig).toMatch(/output:\s*"static"/);
  });
});
