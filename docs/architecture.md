# Architecture

## Project Structure

```
app/
  _layout.tsx              # Root layout (SafeAreaProvider, i18n, Stack)
  index.tsx                # Login screen (guest login, language toggle)
  (app)/
    _layout.tsx            # Auth guard for protected routes
    map.tsx                # Main screen with map and POI

components/
  Map.tsx                  # Native map (react-native-maps + OSM)
  Map.web.tsx              # Web map (react-leaflet)
  POIMarker.tsx            # Native POI marker
  POIMarker.web.tsx        # Web POI marker (Leaflet divIcon)
  CategoryFilter.tsx       # Category filter bar (chips)
  POICard.tsx              # Selected POI detail card

hooks/
  useAuth.ts               # Authentication state
  useLocation.ts           # GPS permission and position
  usePOI.ts                # POI fetching, filtering and selection

stores/
  authStore.ts             # Auth persistence (AsyncStorage)
  languageStore.ts         # Language persistence (AsyncStorage)
  poiStore.ts              # Filters and favorites persistence (AsyncStorage)

services/
  overpassApi.ts           # Overpass API client (OpenStreetMap)

types/
  poi.ts                   # POI, categories, filters
  route.ts                 # Route types (upcoming)
  dangerZone.ts            # Heatmap types (upcoming)

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

- **Native (iOS/Android)**: `Map.tsx` and `POIMarker.tsx` use `react-native-maps` with an OpenStreetMap `UrlTile` overlay.
- **Web**: `Map.web.tsx` and `POIMarker.web.tsx` use `react-leaflet` with Leaflet's tile layer.

Metro/Expo automatically resolves `.web.tsx` files for the web platform.

## State Management

The app does not use Redux or Zustand. State is managed through:

1. **Stores** — Plain objects with async methods wrapping `AsyncStorage`. They handle persistence only (no reactive state).
2. **Hooks** — Custom hooks (`useAuth`, `useLocation`, `usePOI`) hold reactive state via `useState` and consume stores for persistence.

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
- **Supported languages**: French (default), English
- **Detection**: Device locale via `expo-localization`, with fallback to French
- **Persistence**: User language choice saved via `languageStore` and restored on app start
