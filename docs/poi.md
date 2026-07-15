# POI Feature

## Overview

The POI feature allows users to view nearby points of interest on the map, filter them by category, and see details for a selected POI.

## Categories

| Category | Emoji | Color | OSM Source |
|----------|-------|-------|------------|
| Monument | `🏛️` | `#8B4513` | `historic=monument/memorial` |
| Museum | `🎨` | `#4A90D9` | `tourism=museum` |
| Park | `🌳` | `#2ECC71` | `leisure=park/garden` |
| Restaurant | `🍽️` | `#E74C3C` | `amenity=restaurant/cafe` |

Configuration is centralized in `types/poi.ts` via `POI_CATEGORY_CONFIG`.

## Data Flow

```
Map region changes
  -> usePOI.fetchPOIs(region)
    -> overpassApi.fetchPOIs(bbox, categories)
      -> Overpass API (HTTP)
      -> parse, balance and limit candidates
      -> POIFetchResult { pois, isTruncated }
    -> update usePOI state
  -> Web renders retained POIMarkers
  -> Mobile renders POIMarkers or POIClusterMarkers
```

## Components

### `CategoryFilter`
Horizontal scrollable bar with chip buttons. Each chip toggles a category on/off in the filter state. Active chips are filled with the category color.

### `POIMarker` / `POIMarker.web`
Circular marker displaying the category emoji. Selected state adds a gold border and increased size.

### `POIClusterMarker`
Mobile-only marker representing multiple POIs in the same viewport grid cell.
Pressing a cluster animates the map to a padded region containing its POIs.
Android view tracking remains enabled briefly so the custom marker bitmap is
captured before being frozen.

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
- `isTruncated` — Whether the server or retained-result limit was reached
- `error` — Error key or null
- `filters` — Current `POIFilters`
- `selectedPOI` — Currently selected POI or null

Actions:
- `fetchPOIs(region)` — Fetches POIs for the visible viewport and reuses the
  current loaded or pending area while it still contains that viewport
- `setFilters(partial)` — Updates and persists filters
- `toggleCategory(category)` — Adds/removes a category
- `selectPOI(poi | null)` — Sets selected POI
- `clearError()` — Resets error state

## Platform limits and clustering

| Limit | Mobile | Web |
|-------|-------:|----:|
| Overpass candidates | 1000 | 2000 |
| Retained POIs | 200 | 1000 |
| Simultaneous map items | 100 | 1000 |

On mobile, individual markers are retained while the visible POI count remains
at or below 100. Above that limit, POIs are grouped into a viewport-relative
grid containing at most 100 individual markers or clusters.

When `isTruncated` is true, the map displays a localized message indicating
how many POIs were retained and suggesting that the user zoom in for more
detail.

## Persistence

Filters and favorites are persisted via `stores/poiStore.ts`:
- `poi_filters` — Selected categories and search radius
- `poi_favorites` — List of favorited POI IDs

The current fetched area is cached only in memory for the active filter set.
Changing filters invalidates it. The cache is not persisted between app
sessions and stores one area at a time.

The cache stores the retained POI selection rather than every raw Overpass
candidate. Small movements inside the cached bounding box therefore reuse the
existing selection. A new request is sent after leaving that box.
