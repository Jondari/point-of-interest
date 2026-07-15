import { Platform } from 'react-native';
import { POI, POICategory, BoundingBox } from '../types/poi';
import { API_CONFIG, OVERPASS_API_TIMEOUT } from '../constants/api';

const MOBILE_USER_AGENT =
  'PointOfInterest (+https://github.com/Jondari/point-of-interest)';

export class OverpassApiError extends Error {
  constructor(public readonly status: number) {
    super(`Overpass API error: ${status}`);
    this.name = 'OverpassApiError';
  }
}

function getOverpassHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (Platform.OS !== 'web') {
    headers['User-Agent'] = MOBILE_USER_AGENT;
  }

  return headers;
}

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements: OverpassElement[];
}

const CATEGORY_QUERIES: Record<POICategory, string[]> = {
  monument: [
    'node["historic"="monument"]',
    'node["historic"="memorial"]',
    'way["historic"="monument"]',
    'way["historic"="memorial"]',
  ],
  museum: [
    'node["tourism"="museum"]',
    'way["tourism"="museum"]',
  ],
  park: [
    'node["leisure"="park"]',
    'way["leisure"="park"]',
    'node["leisure"="garden"]',
    'way["leisure"="garden"]',
  ],
  restaurant: [
    'node["amenity"="restaurant"]',
    'node["amenity"="cafe"]',
  ],
};

function buildOverpassQuery(bbox: BoundingBox, categories: POICategory[]): string {
  const bboxStr = `${bbox.south},${bbox.west},${bbox.north},${bbox.east}`;

  const queries = categories.flatMap(category =>
    CATEGORY_QUERIES[category].map(q => `${q}(${bboxStr});`)
  );

  return `
    [out:json][timeout:25];
    (
      ${queries.join('\n      ')}
    );
    out center;
  `.trim();
}

function detectCategory(tags: Record<string, string>): POICategory {
  if (tags.historic === 'monument' || tags.historic === 'memorial') {
    return 'monument';
  }
  if (tags.tourism === 'museum') {
    return 'museum';
  }
  if (tags.leisure === 'park' || tags.leisure === 'garden') {
    return 'park';
  }
  if (tags.amenity === 'restaurant' || tags.amenity === 'cafe') {
    return 'restaurant';
  }
  return 'monument';
}

const SHOW_UNNAMED_POI = process.env.EXPO_PUBLIC_SHOW_UNNAMED_POI === 'true';

function parseOverpassResponse(data: OverpassResponse): POI[] {
  return data.elements
    .filter(el => {
      const lat = el.lat ?? el.center?.lat;
      const lon = el.lon ?? el.center?.lon;
      if (lat === undefined || lon === undefined) return false;
      if (!SHOW_UNNAMED_POI) {
        const tags = el.tags ?? {};
        if (!tags.name && !tags['name:fr']) return false;
      }
      return true;
    })
    .map(el => {
      const tags = el.tags ?? {};
      const lat = el.lat ?? el.center!.lat;
      const lon = el.lon ?? el.center!.lon;

      return {
        id: `${el.type}-${el.id}`,
        name: tags.name || tags['name:fr'] || 'Sans nom',
        category: detectCategory(tags),
        latitude: lat,
        longitude: lon,
        address: formatAddress(tags),
        openingHours: tags.opening_hours,
        phone: tags.phone,
        website: tags.website,
        wikipedia: tags.wikipedia,
        description: tags.description,
        tags,
      };
    });
}

function formatAddress(tags: Record<string, string>): string | undefined {
  const parts = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:postcode'],
    tags['addr:city'],
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' ') : undefined;
}

export async function fetchPOIs(
  bbox: BoundingBox,
  categories: POICategory[],
  signal?: AbortSignal
): Promise<POI[]> {
  if (categories.length === 0) {
    return [];
  }

  const query = buildOverpassQuery(bbox, categories);

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    OVERPASS_API_TIMEOUT
  );
  const handleExternalAbort = () => controller.abort();

  if (signal?.aborted) {
    controller.abort();
  } else {
    signal?.addEventListener('abort', handleExternalAbort, { once: true });
  }

  try {
    const response = await fetch(API_CONFIG.OVERPASS_URL, {
      method: 'POST',
      headers: getOverpassHeaders(),
      body: `data=${encodeURIComponent(query)}`,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new OverpassApiError(response.status);
    }

    const data: OverpassResponse = await response.json();
    return parseOverpassResponse(data);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(signal?.aborted ? 'Request cancelled' : 'Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', handleExternalAbort);
  }
}

export function getBoundingBoxFromRegion(
  latitude: number,
  longitude: number,
  radiusMeters: number
): BoundingBox {
  const latDelta = radiusMeters / 111320;
  const lonDelta = radiusMeters / (111320 * Math.cos(latitude * (Math.PI / 180)));

  return {
    south: latitude - latDelta,
    north: latitude + latDelta,
    west: longitude - lonDelta,
    east: longitude + lonDelta,
  };
}
