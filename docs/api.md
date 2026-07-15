# APIs

## Overview

| API | Purpose | Auth | Status |
|-----|---------|------|--------|
| [Overpass API](https://overpass-api.de/) | POI search (OpenStreetMap) | None | Implemented |
| [OSRM](https://routing.openstreetmap.de/) | Walking/driving routes | None | Implemented |
| [Navitia.io](https://www.navitia.io/) | Public transit routes | API key (free, 3000 req/day) | Planned |
| [data.gouv.fr](https://www.data.gouv.fr/) | Crime data for heatmap | None | Planned |

## Overpass API

Used to fetch points of interest from OpenStreetMap within a bounding box.

**Service**: `services/overpassApi.ts`

### `fetchPOIs(bbox, categories)`

Builds an Overpass QL query filtering OSM nodes/ways by category tags,
executes it against the Overpass API, and returns a `POIFetchResult`:

```typescript
interface POIFetchResult {
  pois: POI[];
  isTruncated: boolean;
}
```

`isTruncated` is `true` when the Overpass output limit is reached or when
the number of parsed candidates exceeds the application retention limit.

**Category mapping**:

| Category | OSM Tags |
|----------|----------|
| monument | `historic=monument`, `historic=memorial` |
| museum | `tourism=museum` |
| park | `leisure=park`, `leisure=garden` |
| restaurant | `amenity=restaurant`, `amenity=cafe` |

### Result limits and selection

The Overpass query uses `out center qt <limit>` as a response-size safety
limit. `qt` uses an approximately geographical quadtile order; it does not
rank results by relevance or by distance from the viewport center.

| Limit | Mobile | Web |
|-------|-------:|----:|
| Overpass candidates | 1000 | 2000 |
| Retained POIs | 200 | 1000 |
| Simultaneous map items | 100 | 1000 |

After parsing:

1. invalid and unnamed elements are removed;
2. candidates are grouped by selected category;
3. each category receives an initial equal quota;
4. unused places are redistributed to the nearest remaining candidates;
5. retained POIs are ordered by distance from the bounding-box center.

Category balancing applies only to candidates returned by Overpass. A category
that was excluded by the Overpass output limit cannot be recovered by the
client-side selection.

### `getBoundingBoxFromRegion(region, maxRadiusMeters)`

Converts the visible map region into a `BoundingBox`. A 25% margin is added
on each side to reduce refetches during small movements. The persisted search
radius, 5000m by default, remains the maximum distance from the center.

### Unnamed POI filtering

By default, POIs without a name are excluded from results (many monuments lack names in OSM). This is controlled by the `EXPO_PUBLIC_SHOW_UNNAMED_POI` environment variable (see `.env.sample`). Expo embeds public variables in the client bundle, so this value must not contain a secret.

### Request handling

- Mobile requests send an identifiable application `User-Agent`
- Web requests retain the browser-provided `User-Agent`
- Client timeout: 30 seconds (via `AbortController`)
- Overpass query timeout: 25 seconds (server-side)
- HTTP 406, 429 and 504 errors are exposed with dedicated messages
- Request bounds follow the visible map viewport with a 5000m maximum radius
- The last successful bounding box is cached in memory for the active filters;
  no request is sent while the visible viewport remains inside that area
- A pending request is also reused when it already covers the visible viewport
- A truncated response remains cached until the viewport leaves the cached
  bounding box or the active filters change

## Configuration

API URLs and timeout defaults are defined in `constants/api.ts`:

```typescript
API_CONFIG.OVERPASS_URL   // https://overpass-api.de/api/interpreter
API_CONFIG.OSRM_FOOT_URL // https://routing.openstreetmap.de/routed-foot
API_CONFIG.OSRM_CAR_URL  // https://routing.openstreetmap.de/routed-car
API_CONFIG.NAVITIA_URL   // https://api.navitia.io/v1
DEFAULT_SEARCH_RADIUS    // 5000 (meters)
API_TIMEOUT              // 15000 (ms)
OVERPASS_API_TIMEOUT     // 30000 (ms)
```

Platform-specific result limits are defined in `constants/poiLimits.ts`.

## Environment Variables

See `.env.sample` for available configuration:

| Variable | Default | Description |
|----------|---------|-------------|
| `EXPO_PUBLIC_SHOW_UNNAMED_POI` | `false` | Show POIs that have no name in OpenStreetMap |
