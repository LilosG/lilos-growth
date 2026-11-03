import { describe, expect, it } from "vitest";
import { GET } from "../src/pages/api/places.ts";

const lookup = async (q) => {
  const url = new URL("https://lilosgrowth.com/api/places");
  if (q !== undefined) url.searchParams.set("q", q);
  return GET({ url });
};

describe("public Places lookup input guardrails", () => {
  it("rejects missing and whitespace-only searches without calling Google", async () => {
    const missing = await lookup();
    const blank = await lookup("   ");
    expect(missing.status).toBe(400);
    expect(blank.status).toBe(400);
    expect(missing.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await missing.json()).toEqual({ error: "Missing search query" });
  });

  it("rejects oversized searches before accessing the upstream API", async () => {
    const response = await lookup("x".repeat(181));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Search query is too long" });
  });
});
