# Location data and third-party services

The interactive map uses the device location to show nearby points of interest and calculate routes. The offline directory does not require a network connection or location access.

## Data transfers

When the interactive map is used, the application may contact these services:

| Service | Data sent | Purpose |
|---|---|---|
| OpenStreetMap tile servers | Requested map tile coordinates and network metadata such as the IP address | Display the map |
| Overpass API | A bounding box calculated around the current location or visible map region | Find nearby points of interest |
| OSRM | Route origin, destination and transport mode | Calculate walking or driving directions |

Exact coordinates can therefore be disclosed to external services when POIs or routes are requested. Those services process data under their own privacy policies and retention rules.

## Local storage

The application stores POI filters, favorites, language preferences and guest authentication state on the device with AsyncStorage. Offline directory content and images are bundled with the application.

## Recommendations before publication

- Link this information from the store privacy disclosures and the public privacy policy.
- Review the privacy policies and usage requirements of OpenStreetMap, Overpass and the selected OSRM instances.
- Avoid adding secrets to variables prefixed with `EXPO_PUBLIC_`, because Expo includes them in the client bundle.
