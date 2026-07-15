# Architecture

## Project Structure

```
app/
  _layout.tsx              # Root layout (SafeAreaProvider, i18n, Stack)
  index.tsx                # Login screen (guest login, language toggle)
  (app)/
    _layout.tsx            # Auth guard for protected routes
    map.tsx                # Main screen with map and POI
    directory/
      index.tsx            # Offline country selection
      [poiId].tsx          # Offline POI details
      country/[countryId].tsx # City list, search and filters
      map/[cityId].tsx     # Local bundled-POI map and optional route

components/
  Map.tsx                  # Native map (react-native-maps + OSM)
  Map.web.tsx              # Web map (react-leaflet)
  POIMarker.tsx            # Native POI marker
  POIMarker.web.tsx        # Web POI marker (Leaflet divIcon)
  OfflinePOIMarker.tsx     # Native bundled-POI marker/group
  OfflinePOIMarker.web.tsx # Web bundled-POI marker/group
  OfflinePOIMapCard.tsx    # Local map selection and actions
  CategoryFilter.tsx       # Category filter bar (chips)
  POICard.tsx              # Selected POI detail card
  RoutePolyline.tsx        # Native route path
  RoutePolyline.web.tsx    # Web route path
  TransportModeSelector.tsx # Walking/driving mode picker
  RouteDirections.tsx      # Step-by-step directions panel
  DangerChoropleth.tsx     # Native choropleth polygons
  DangerChoropleth.web.tsx # Web choropleth (GeoJSON + tooltips)
  DangerHeatmap.tsx        # Native heatmap (circles)
  DangerHeatmap.web.tsx    # Web heatmap (leaflet.heat)
  QPVOverlay.tsx           # Native QPV polygons
  QPVOverlay.web.tsx       # Web QPV (GeoJSON + tooltips)
  QRROverlay.tsx           # Native QRR polygons
  QRROverlay.web.tsx       # Web QRR (GeoJSON + tooltips)
  DangerZoneToggle.tsx     # Layer controls (SSMSI, QPV, QRR, indicators)

hooks/
  useAuth.ts               # Authentication state
  useLocation.ts           # GPS permission, position and tracking
  usePOI.ts                # POI fetching, filtering and selection
  useRoute.ts              # Route calculation and state
  useDangerZones.ts        # Danger zone visibility, render mode and data

stores/
  authStore.ts             # Auth persistence (AsyncStorage)
  languageStore.ts         # Language persistence (AsyncStorage)
  poiStore.ts              # Filters and favorites persistence (AsyncStorage)

services/
  overpassApi.ts           # Overpass API client (OpenStreetMap)
  osrmApi.ts               # OSRM routing client (walking/driving)
  crimeDataService.ts      # Crime data loading and color computation
  offlinePoiService.ts     # Bundled directory lookup and search

types/
  poi.ts                   # POI, categories, filters
  offlinePoi.ts            # Bundled country, city and POI models
  route.ts                 # Route, steps, transport modes
  dangerZone.ts            # Commune, heatmap and config types

data/
  offlinePois.ts           # Bundled directory index and legacy entries
  offlinePois/             # Destination POI modules
  idf-crime-data.json      # Embedded IDF crime dataset (~1.1 MB, 1285 communes)
  qpv-idf.json             # QPV polygons for IDF (298 zones)
  qrr-idf.json             # QRR polygons for IDF (16 zones)

scripts/
  prepare-crime-data.ts    # Data pipeline (SSMSI + geo + INSEE)

constants/
  api.ts                   # API URLs, Paris coordinates, defaults
  theme.ts                 # Design tokens (colors, spacing, typography)

locales/
  index.ts                 # i18next config, language detection
  fr.ts                    # French translations
  en.ts                    # English translations
```

## Platform Split

The app uses React Native's platform extension resolution to serve different map implementations:

- **Native (iOS/Android)**: `Map.tsx`, native markers, route and safety overlays use `react-native-maps` with the configured native map provider.
- **Web**: `Map.web.tsx`, `POIMarker.web.tsx`, `RoutePolyline.web.tsx`, `DangerChoropleth.web.tsx`, `DangerHeatmap.web.tsx`, `QPVOverlay.web.tsx` and `QRROverlay.web.tsx` use `react-leaflet` with Leaflet's tile layer.

Metro/Expo automatically resolves `.web.tsx` files for the web platform.

## State Management

The app does not use Redux or Zustand. State is managed through:

1. **Stores** — Plain objects with async methods wrapping `AsyncStorage`. They handle persistence only (no reactive state).
2. **Hooks** — Custom hooks (`useAuth`, `useLocation`, `usePOI`, `useRoute`, `useDangerZones`) hold reactive state via `useState` and consume stores for persistence. `useRoute` and `useDangerZones` have no store — their state is transient. `useDangerZones` loads embedded data once via `useMemo`.

```
AsyncStorage <-- stores (read/write) <-- hooks (reactive state) <-- components (UI)
```

## Authentication

Currently supports guest login only. The auth flow is:

1. `app/index.tsx` — Login screen with "Continue as guest" button
2. `authStore.loginAsGuest()` — Persists `{ isAuthenticated: true, isGuest: true }` to AsyncStorage
3. `app/(app)/_layout.tsx` — Auth guard redirects unauthenticated users back to `/`

## Internationalization

- **Library**: i18next + react-i18next
- **Supported languages**: French (default), English, Chinese
- **Detection**: Device locale via `expo-localization`, with fallback to French
- **Persistence**: User language choice saved via `languageStore` and restored on app start
