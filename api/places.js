// GET /api/places?q=<business name + city>
// Returns { place_id, name, address } via Google Places.
// If GOOGLE_MAPS_API_KEY isn't set, returns 501 and the UI falls back to manual entry.

export default async function handler(req, res) {
  try {
    const q = (req.query?.q || "").toString().trim();
    if (!q) return res.status(400).json({ error: "Missing q" });

    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!key) return res.status(501).json({ error: "GOOGLE_MAPS_API_KEY not set" });

    const url =
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json" +
      `?input=${encodeURIComponent(q)}` +
      "&inputtype=textquery&fields=place_id,name,formatted_address" +
      `&key=${encodeURIComponent(key)}`;

    const r = await fetch(url);
    const data = await r.json();

    if (data.status !== "OK" || !Array.isArray(data.candidates) || data.candidates.length === 0) {
      return res.status(404).json({ error: data.status || "NOT_FOUND", raw: data });
    }

    const c = data.candidates[0];
    return res
      .status(200)
      .json({ place_id: c.place_id, name: c.name, address: c.formatted_address });
  } catch {
    return res.status(502).json({ error: "UPSTREAM_ERROR" });
  }
}
