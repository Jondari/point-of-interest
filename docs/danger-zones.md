# Danger Zones

## Overview

Displays commune-level crime statistics for the Ile-de-France region overlaid on the map. Users can toggle the layer on/off and switch between two render modes.

## Data Source

- **Crime data**: SSMSI (Service statistique ministériel de la sécurité intérieure) via [data.gouv.fr](https://data.gouv.fr)
- **Geography**: commune boundaries from `geo.api.gouv.fr`
- **Population**: INSEE commune population data
- **Scope**: 8 departments (75, 77, 78, 91, 92, 93, 94, 95) — approximately 1,266 communes
- **Metric**: Crime rate per 1,000 inhabitants (`totalCrimes / population * 1000`)

## Data Pipeline

Crime data is embedded in the app as a static JSON file to avoid runtime API dependencies.

### Generation

```bash
npm run prepare:crime-data
```

This runs `scripts/prepare-crime-data.ts` which:

1. Downloads commune GeoJSON boundaries from `geo.api.gouv.fr`
2. Downloads SSMSI crime CSV from `data.gouv.fr` (streaming parser for large files)
3. Downloads INSEE population data
4. Simplifies geometries with `@turf/simplify` (tolerance 0.001)
5. Computes centroids with `@turf/centroid`
6. Merges data and writes `data/idf-crime-data.json` (~0.92 MB)

### Output Format

```json
{
  "generatedAt": "2024-...",
  "year": 2024,
  "communes": [
    {
      "codeCommune": "75056",
      "nomCommune": "Paris",
      "department": "75",
      "population": 2145906,
      "totalCrimes": 187234,
      "crimeRate": 87.2,
      "centerLat": 48.8566,
      "centerLon": 2.3522,
      "geometry": { "type": "Polygon", "coordinates": [...] }
    }
  ]
}
```

## Render Modes

### Choropleth

Colors each commune polygon based on its crime rate using a green-yellow-red gradient (RdYlGn color scale). Lower rates appear green, higher rates appear red.

- **Native**: `react-native-maps` `Polygon` components
- **Web**: `react-leaflet` `GeoJSON` with style function and hover tooltips

### Heatmap

Renders an interpolated heat layer using commune centroids weighted by crime rate.

- **Native**: `react-native-maps` `Circle` components with opacity proportional to weight
- **Web**: `leaflet.heat` plugin with gradient overlay

## Components

| Component | Platform | Description |
|---|---|---|
| `DangerChoropleth.tsx` | Native | Polygon rendering per commune |
| `DangerChoropleth.web.tsx` | Web | GeoJSON layer with tooltips |
| `DangerHeatmap.tsx` | Native | Circle-based heatmap approximation |
| `DangerHeatmap.web.tsx` | Web | leaflet.heat layer |
| `DangerZoneToggle.tsx` | Shared | Toggle visibility + render mode buttons |

## Hook

`useDangerZones()` manages visibility state and render mode:

```typescript
const {
  isVisible,          // boolean — layer visible on map
  renderMode,         // 'choropleth' | 'heatmap'
  communeData,        // CommuneRenderData[] — precomputed colors
  heatmapPoints,      // HeatmapPoint[] — centroids with weights
  dataYear,           // number — year of the dataset
  toggleVisibility,   // () => void
  toggleRenderMode,   // () => void
  setRenderMode,      // (mode) => void
} = useDangerZones();
```

Data is computed once via `useMemo` since the embedded dataset never changes at runtime.

## Configuration

`DEFAULT_DANGER_ZONE_CONFIG` in `types/dangerZone.ts`:

| Property | Value | Description |
|---|---|---|
| `maxIntensity` | 1 | Heatmap max intensity |
| `radiusMeters` | 4000 | Native circle radius |
| `opacity` | 0.6 | Choropleth fill opacity |
