import { BoundingBox, POI, POICategory } from '../types/poi';

interface RankedPOI {
  poi: POI;
  distance: number;
  index: number;
}

function rankPOIs(pois: POI[], bbox: BoundingBox): RankedPOI[] {
  const latitude = (bbox.south + bbox.north) / 2;
  const longitude = (bbox.west + bbox.east) / 2;
  const longitudeScale = Math.cos(latitude * (Math.PI / 180));

  return pois
    .map((poi, index) => {
      const latitudeDistance = poi.latitude - latitude;
      const longitudeDistance =
        (poi.longitude - longitude) * longitudeScale;

      return {
        poi,
        index,
        distance:
          latitudeDistance * latitudeDistance +
          longitudeDistance * longitudeDistance,
      };
    })
    .sort(
      (left, right) =>
        left.distance - right.distance || left.index - right.index
    );
}

export function selectBalancedPOIs(
  pois: POI[],
  categories: POICategory[],
  bbox: BoundingBox,
  limit: number
): POI[] {
  const selectedCategories = [...new Set(categories)];

  if (limit <= 0 || selectedCategories.length === 0) {
    return [];
  }

  const allowedCategories = new Set(selectedCategories);
  const ranked = rankPOIs(
    pois.filter(poi => allowedCategories.has(poi.category)),
    bbox
  );
  const quota = Math.floor(limit / selectedCategories.length);
  const selected = new Map<string, RankedPOI>();

  for (const category of selectedCategories) {
    ranked
      .filter(candidate => candidate.poi.category === category)
      .slice(0, quota)
      .forEach(candidate => selected.set(candidate.poi.id, candidate));
  }

  // Redistribute unused slots to the nearest remaining POIs.
  for (const candidate of ranked) {
    if (selected.size >= limit) break;
    if (!selected.has(candidate.poi.id)) {
      selected.set(candidate.poi.id, candidate);
    }
  }

  return [...selected.values()]
    .sort(
      (left, right) =>
        left.distance - right.distance || left.index - right.index
    )
    .map(candidate => candidate.poi);
}
