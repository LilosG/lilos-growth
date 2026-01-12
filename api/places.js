// GET /api/places?q=<business name + city>
// Returns { place_id, name, address } via Google Places.
// If GOOGLE_MAPS_API_KEY isn't set, returns 501 and the UI falls back to manual entry.

import { z } from "zod";

const querySchema = z.string().trim().min(2, "Query too short").max(200, "Query too long");
const keySchema = z.string().min(10);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const rateBuckets = new Map();

const getClientIp = (req) => {
  const forwarded = req.headers?.["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
};

const checkRateLimit = (ip) => {
  const now = Date.now();
  const bucket = rateBuckets.get(ip) || { start: now, count: 0 };
  if (now - bucket.start > RATE_LIMIT_WINDOW_MS) {
    bucket.start = now;
    bucket.count = 0;
  }
  bucket.count += 1;
  rateBuckets.set(ip, bucket);
  const limited = bucket.count > RATE_LIMIT_MAX;
  const retryAfter = Math.ceil((bucket.start + RATE_LIMIT_WINDOW_MS - now) / 1000);
  return { limited, retryAfter };
};

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
    }

    const ip = getClientIp(req);
    const { limited, retryAfter } = checkRateLimit(ip);
    if (limited) {
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({ error: "RATE_LIMITED" });
    }

    const rawQuery = (req.query?.q || "").toString();
    const qResult = querySchema.safeParse(rawQuery);
    if (!qResult.success) {
      return res.status(400).json({ error: "INVALID_QUERY" });
    }

    const key = process.env.GOOGLE_MAPS_API_KEY || "";
    const keyResult = keySchema.safeParse(key);
    if (!keyResult.success) {
      return res.status(501).json({ error: "GOOGLE_MAPS_API_KEY not set" });
    }
    const q = qResult.data;

    const url =
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json" +
      `?input=${encodeURIComponent(q)}` +
      "&inputtype=textquery&fields=place_id,name,formatted_address" +
      `&key=${encodeURIComponent(key)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const r = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await r.json();

    if (data.status !== "OK" || !Array.isArray(data.candidates) || data.candidates.length === 0) {
      return res.status(404).json({ error: data.status || "NOT_FOUND", raw: data });
    }

    const c = data.candidates[0];
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res
      .status(200)
      .json({ place_id: c.place_id, name: c.name, address: c.formatted_address });
  } catch (err) {
    if (err && err.name === "AbortError") {
      return res.status(504).json({ error: "UPSTREAM_TIMEOUT" });
    }
    return res.status(502).json({ error: "UPSTREAM_ERROR" });
  }
}
