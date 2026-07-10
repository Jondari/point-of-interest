# POI Feature

## Overview

The POI feature allows users to view nearby points of interest on the map, filter them by category, and see details for a selected POI.

## Categories

| Category | Emoji | Color | OSM Source |
|----------|-------|-------|------------|
| Monument | `🏛️` | `#8B4513` | `historic=monument/castle/memorial` |
| Museum | `🎨` | `#4A90D9` | `tourism=museum` |
| Park | `🌳` | `#2ECC71` | `leisure=park/garden` |
| Restaurant | `🍽️` | `#E74C3C` | `amenity=restaurant/cafe` |

Configuration is centralized in `types/poi.ts` via `POI_CATEGORY_CONFIG`.

## Data Flow

```
Map region changes
  -> usePOI.fetchPOIs(lat, lon)
    -> overpassApi.fetchPOIs(bbox, categories)
      -> Overpass API (HTTP)
    -> setState(pois)
  -> Map renders POIMarkers
```

## Components

### `CategoryFilter`
Horizontal scrollable bar with chip buttons. Each chip toggles a category on/off in the filter state. Active chips are filled with the category color.

### `POIMarker` / `POIMarker.web`
Circular marker displaying the category emoji. Selected state adds a gold border and increased size.

### `POICard`
Bottom card shown when a POI is selected. Displays:
- Category badge (emoji + color)
- POI name
- Address, opening hours, phone (tappable), website (tappable)
- "Get directions" button with walking and driving routes powered by OSRM

## Hook: `usePOI`

Returns:
- `pois` — Current POI list
- `isLoading` — Fetch in progress
- `error` — Error key or null
- `filters` — Current `POIFilters`
- `selectedPOI` — Currently selected POI or null

Actions:
- `fetchPOIs(lat, lon)` — Fetches POIs with deduplication
- `setFilters(partial)` — Updates and persists filters
- `toggleCategory(category)` — Adds/removes a category
- `selectPOI(poi | null)` — Sets selected POI
- `clearError()` — Resets error state

## Persistence

Filters and favorites are persisted via `stores/poiStore.ts`:
- `poi_filters` — Selected categories and search radius
- `poi_favorites` — List of favorited POI IDs
