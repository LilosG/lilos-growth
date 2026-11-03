/**
 * Public Google Places lookup for the review-link generator.
 * Enforce bounded input and upstream timeouts before a billable API call.
 */
import type { APIRoute } from "astro";

export const prerender = false;

const MAX_QUERY_LENGTH = 180;
const UPSTREAM_TIMEOUT_MS = 8000;

interface PlaceResult {
  place_id: string;
  name: string;
  address: string;
}

interface ErrorResponse {
  error: string;
}

function json(body: PlaceResult | ErrorResponse, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get("q")?.trim();

  if (!query) {
    return json({ error: "Missing search query" }, 400);
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return json({ error: "Search query is too long" }, 400);
  }

  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_PLACES_API_KEY not configured");
    return json({ error: "Service temporarily unavailable" }, 503);
  }

  const searchUrl = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  searchUrl.searchParams.set("query", query);
  searchUrl.searchParams.set("key", apiKey);

  try {
    const response = await fetch(searchUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("Places API HTTP status:", response.status);
      return json({ error: "Search failed. Please try again." }, 502);
    }

    const data = await response.json();
    if (data.status === "ZERO_RESULTS" || !data.results?.length) {
      return json({ error: "No matching place found. Try adding city/state or ZIP." }, 404);
    }
    if (data.status !== "OK") {
      console.error("Places API status:", data.status);
      return json({ error: "Search failed. Please try again." }, 502);
    }

    const place = data.results[0];
    return json({
      place_id: String(place.place_id || ""),
      name: String(place.name || ""),
      address: String(place.formatted_address || ""),
    }, 200);
  } catch (error) {
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      return json({ error: "Search timed out. Please try again." }, 504);
    }
    console.error("Places API request failed:", error instanceof Error ? error.name : "unknown");
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};
