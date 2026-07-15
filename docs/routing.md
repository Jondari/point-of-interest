# Routing

## Overview

The routing feature calculates and displays walking/driving routes from the user's current location to a selected POI using the OSRM (Open Source Routing Machine) API.

It is available both from the live nearby-POI map and from the local directory map.
The local directory supplies destination coordinates from bundled data and never
uses Overpass to create the itinerary.

## Architecture

```
User taps "Get directions" on POICard
  -> handleNavigateToPOI(poi)
    -> useRoute.calculateRoute(from, to)
      -> osrmApi.fetchRoute(from, to, mode)
        -> OSRM API (HTTP GET)
      -> setState(route)
    -> Map renders RoutePolyline
    -> Route panel shows TransportModeSelector + RouteDirections
```

## OSRM API

**Service**: `services/osrmApi.ts`

### `fetchRoute(from, to, mode)`

Builds a GET request to the OSRM public API and returns a `Route` object.

**Separate server instances per mode**:
| TransportMode | Server URL |
|---------------|-----------|
| walking | `https://routing.openstreetmap.de/routed-foot` |
| driving | `https://routing.openstreetmap.de/routed-car` |

**URL format**:
```
GET {server}/route/v1/driving/{lon},{lat};{lon},{lat}
  ?overview=full&geometries=geojson&steps=true
```

**Coordinate order**: OSRM and GeoJSON use `[longitude, latitude]`. The parser swaps axes to match `RoutePoint { latitude, longitude }`.

**Request handling**:
- Timeout: 15 seconds (via AbortController)
- Error on non-"Ok" response code or empty routes array

## Components

### `RoutePolyline` / `RoutePolyline.web`
Renders the route path on the map. Platform-split:
- Native: `react-native-maps` `Polyline` component
- Web: `react-leaflet` `Polyline` component

Color by mode: walking = `#4ECDC4` (teal, dashed), driving = `#FF6B35` (orange, solid).

### `TransportModeSelector`
Horizontal chip bar for switching between walking and driving. Follows the same pattern as `CategoryFilter`. Transit mode is planned for future implementation via Navitia.io.

### `RouteDirections`
Bottom panel showing:
- Total distance and duration summary
- Scrollable step-by-step directions with numbered indicators
- Close button to clear the route

## Hook: `useRoute`

Returns:
- `route` — Current Route object or null
- `isLoading` — Calculation in progress
- `error` — Error translation key or null
- `transportMode` — Current mode (walking/driving)

Actions:
- `calculateRoute(from, to, mode?)` — Fetches route via OSRM
- `setTransportMode(mode)` — Changes mode and recalculates if a route exists
- `clearRoute()` — Resets all route state

The hook stores `lastFromRef` / `lastToRef` to automatically recalculate when the transport mode changes.

## Local directory route

Opening a city map does not initialize `useLocation`. The local guide passes
`{ autoInitialize: false }`, so the map and bundled markers remain accessible
without GPS permission. When the user taps the directions action, the app:

1. Requests foreground location permission.
2. Retrieves the current position.
3. Uses the selected bundled POI coordinates as the destination.
4. Calls `useRoute.calculateRoute` and renders the standard route components.

Unlike the live map, the local guide does not start continuous position tracking.
Changing walking/driving mode still recalculates the route through `useRoute`.

## Real-time Position Tracking

When a route is active, the app starts watching the user's GPS position via `expo-location`'s `watchPositionAsync`:
- **Distance interval**: 50 meters (recalculates only when the user moves at least 50m)
- **Time interval**: 5 seconds minimum between updates
- Watching starts when the user taps "Get directions" and stops when the route is cleared

The route is automatically recalculated from the user's new position to the original destination.

## Limitations

- OSRM public instance has rate limits (not suitable for production traffic)
- Transit routing (Navitia.io) not yet implemented
- No route alternatives (uses first route returned by OSRM)
