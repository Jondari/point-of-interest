# Offline POI directory

The offline directory provides a travel reference for Paris and Beijing without
requiring location permission or a network connection.

## Guarantees

- POI and city data are bundled in `data/offlinePois.ts`.
- Search and category filtering run locally through `services/offlinePoiService.ts`.
- The directory does not call Overpass, OSRM or any other remote API.
- POI images are optional and must be bundled as static assets when provided.
- Addresses can be copied with `expo-clipboard` on Android, iOS and web.

External website and source URLs are displayed as reference information. The
directory never opens or fetches them automatically.

## Data structure

Each `OfflinePOI` contains localized names, addresses and descriptions, optional
practical information, geographic coordinates, a source and an update date.
Chinese entries may also include a local address, local name and transliteration.

An optional image must use a static Metro-compatible import:

```ts
image: require('../assets/offline-pois/paris/eiffel-tower.webp')
```

When an image is added, provide `imageAlt` and `imageCredit` whenever applicable.
The UI displays the category illustration when no image is available.
The sources and licenses for bundled images are recorded in
[`image-attributions.md`](./image-attributions.md).

## Adding a POI

1. Add a unique entry to `OFFLINE_POIS` in `data/offlinePois.ts`.
2. Use an existing `OfflineCityId` and `OfflinePOICategory`.
3. Provide both French and English values for every required localized field.
4. Verify the address, coordinates and practical information.
5. Record the source URL and the update date.
6. Run `npx tsc --noEmit` before committing.

## Adding a city

1. Extend `OfflineCityId` in `types/offlinePoi.ts`.
2. Add the city metadata to `OFFLINE_CITIES`.
3. Add its POIs to `OFFLINE_POIS`.
4. Verify search, filters and mode-airplane behavior on every platform.
