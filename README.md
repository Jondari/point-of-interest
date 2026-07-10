# Point of Interest

A cross-platform mobile and web application to explore points of interest (monuments, museums, parks, restaurants) around Paris and Ile-de-France, powered by OpenStreetMap data.

## Features

- **Interactive map** with OpenStreetMap (react-native-maps + react-leaflet)
- **Offline travel directory** for Paris and Beijing with locally bundled information and images
- **POI search** via Overpass API (monuments, museums, parks, restaurants)
- **Category filters** with color-coded interactive chips
- **POI detail card** with address, opening hours, phone and website
- **Route planning** with walking/driving directions via OSRM
- **Real-time GPS tracking** with automatic route recalculation and arrival detection
- **Danger layers** using crime indicators, heatmaps, QPV and QRR datasets
- **User geolocation** with GPS permission handling
- **Cross-platform**: iOS, Android and Web
- **Bilingual**: French / English with automatic language detection

### Upcoming

- Public transit via Navitia.io

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React Native 0.81 + Expo ~54 |
| Navigation | expo-router (file-based routing) |
| Native map | react-native-maps (OSM UrlTile) |
| Web map | react-leaflet + Leaflet |
| Persistence | AsyncStorage |
| i18n | i18next + react-i18next + expo-localization |
| Location | expo-location |
| Language | TypeScript (strict mode) |
| Tests | Jest + React Native Testing Library |

## Prerequisites

- Node.js v20.19+
- npm
- Expo CLI (`npx expo`)

## Installation

```bash
git clone <repository-url>
cd point-of-interest
npm install

# Optional runtime configuration
cp .env.sample .env
```

## Getting Started

```bash
# Web
npm run web

# iOS
npm run ios

# Android
npm run android

# Expo dev server
npm start

# Tests and static type checking
npm test
npm run typecheck
```

## Documentation

Technical documentation is available in the [docs/](docs/) folder.

Location data transfers to third-party map and routing services are documented in [docs/privacy.md](docs/privacy.md).

## Versioning

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) with [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning and changelog generation.

```bash
npm run release
```

## License

MIT
