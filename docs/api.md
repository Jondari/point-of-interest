# APIs

## Overview

| API | Purpose | Auth | Status |
|-----|---------|------|--------|
| [Overpass API](https://overpass-api.de/) | POI search (OpenStreetMap) | None | Implemented |
| [OSRM](http://router.project-osrm.org/) | Walking/driving routes | None | Planned |
| [Navitia.io](https://www.navitia.io/) | Public transit routes | API key (free, 3000 req/day) | Planned |
| [data.gouv.fr](https://www.data.gouv.fr/) | Crime data for heatmap | None | Planned |

## Overpass API

Used to fetch points of interest from OpenStreetMap within a bounding box.

**Service**: `services/overpassApi.ts`

### `fetchPOIs(bbox, categories)`

Builds an Overpass QL query filtering OSM nodes/ways by category tags, executes it against the Overpass API, and returns parsed `POI[]` objects.

**Category mapping**:

| Category | OSM Tags |
|----------|----------|
| monument | `historic=monument`, `historic=castle`, `historic=memorial` |
| museum | `tourism=museum` |
| park | `leisure=park`, `leisure=garden` |
| restaurant | `amenity=restaurant`, `amenity=cafe` |

### `getBoundingBoxFromRegion(lat, lon, radiusMeters)`

Converts a center point and radius (default: 5000m) into a `BoundingBox` for Overpass queries.

### Request handling

- Timeout: 15 seconds (via `AbortController`)
- Overpass query timeout: 25 seconds (server-side)
- Response limit: 500 elements max

## Configuration

All API URLs and defaults are defined in `constants/api.ts`:

```typescript
API_CONFIG.OVERPASS_URL  // https://overpass-api.de/api/interpreter
API_CONFIG.OSRM_URL     // https://router.project-osrm.org
API_CONFIG.NAVITIA_URL  // https://api.navitia.io/v1
DEFAULT_SEARCH_RADIUS   // 5000 (meters)
API_TIMEOUT             // 15000 (ms)
```
