# Offline POI directory

The offline directory provides a travel reference organized by country and city,
without requiring location permission or a network connection. France currently
contains Paris, Lyon, Toulouse, Marseille, Cannes and Nice; China contains Beijing,
Qingdao, Xi’an, Chengdu, Shanghai and Chongqing;
Spain contains Madrid, Barcelona, Bilbao and the Canary Islands; Italy contains
Rome, Florence, Venice and Naples; the Netherlands contains Amsterdam; Germany
contains Berlin and Frankfurt; Greece contains Athens.

## Guarantees

- Country and city metadata are bundled in `data/offlinePois.ts`.
- Destination POIs may be split into modules under `data/offlinePois/`.
- Search and category filtering run locally through `services/offlinePoiService.ts`.
- The directory does not call Overpass, OSRM or any other remote API.
- POI images are optional and must be bundled as static assets when provided.
- Addresses can be copied with `expo-clipboard` on Android, iOS and web.

External website and source URLs are displayed as reference information. The
directory never opens or fetches them automatically.

## Data structure

Each `OfflinePOI` contains localized names, addresses and descriptions, optional
practical information, geographic coordinates, a source and an update date.
Chinese and Greek entries may also include a local address, local name and
transliteration.

An optional image must use a static Metro-compatible import:

```ts
image: require('../assets/offline-pois/paris/eiffel-tower.webp')
```

When an image is added, provide `imageAlt` and `imageCredit` whenever applicable.
The UI displays the category illustration when no image is available.
The sources and licenses for bundled images are recorded in
[`image-attributions.md`](./image-attributions.md).

## Adding a POI

1. Add a unique entry to the destination module exported by `OFFLINE_POIS`.
2. Use an existing `OfflineCityId` and `OfflinePOICategory`.
3. Provide both French and English values for every required localized field.
4. Verify the address, coordinates and practical information.
5. Record the source URL and the update date.
6. Run `npx tsc --noEmit` before committing.

## Adding a city

1. Extend `OfflineCityId` in `types/offlinePoi.ts`.
2. Add the city metadata to `OFFLINE_CITIES`.
3. Add its POI module and include it in `OFFLINE_POIS`.
4. Verify search, filters and mode-airplane behavior on every platform.

## Adding a country

1. Extend `OfflineCountryId` in `types/offlinePoi.ts`.
2. Add the localized country metadata to `OFFLINE_COUNTRIES`.
3. Associate each destination with the new `countryId`.
4. Verify the country-to-city navigation in French and English.
