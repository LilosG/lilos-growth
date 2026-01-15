/**
 * Places API endpoint for Review Link Generator
 * POST /api/places?q=business+name+city
 * Returns: { place_id, name, address } or { error }
 */

import type { APIRoute } from 'astro';

export const prerender = false;

interface PlaceResult {
  place_id: string;
  name: string;
  address: string;
}

interface ErrorResponse {
  error: string;
}

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')?.trim();

  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing search query' } satisfies ErrorResponse), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    console.error('GOOGLE_PLACES_API_KEY not configured');
    return new Response(
      JSON.stringify({ error: 'Service temporarily unavailable' } satisfies ErrorResponse),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Use Places API Text Search
    const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
    searchUrl.searchParams.set('query', query);
    searchUrl.searchParams.set('key', apiKey);

    const response = await fetch(searchUrl.toString());

    if (!response.ok) {
      console.error('Places API error:', response.status);
      return new Response(
        JSON.stringify({ error: 'Search failed. Please try again.' } satisfies ErrorResponse),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();

    if (data.status === 'ZERO_RESULTS' || !data.results?.length) {
      return new Response(
        JSON.stringify({
          error: 'No matching place found. Try adding city/state or ZIP.',
        } satisfies ErrorResponse),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (data.status !== 'OK') {
      console.error('Places API status:', data.status, data.error_message);
      return new Response(
        JSON.stringify({ error: 'Search failed. Please try again.' } satisfies ErrorResponse),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return the top result
    const place = data.results[0];
    const result: PlaceResult = {
      place_id: place.place_id,
      name: place.name || '',
      address: place.formatted_address || '',
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Places API fetch error:', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' } satisfies ErrorResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
