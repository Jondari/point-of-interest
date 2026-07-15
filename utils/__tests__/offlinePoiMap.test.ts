import { getOfflinePOIs } from '../../services/offlinePoiService';
import {
  getOfflinePOIMapRegion,
  groupOfflinePOIsByCoordinates,
} from '../offlinePoiMap';

describe('offlinePoiMap', () => {
  const [firstPOI, secondPOI] = getOfflinePOIs('paris');

  it('groups POIs that share the exact same coordinates', () => {
    const duplicateCoordinates = {
      ...secondPOI,
      id: 'same-location',
      latitude: firstPOI.latitude,
      longitude: firstPOI.longitude,
    };

    const groups = groupOfflinePOIsByCoordinates([
      firstPOI,
      duplicateCoordinates,
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].pois.map((poi) => poi.id)).toEqual([
      firstPOI.id,
      duplicateCoordinates.id,
    ]);
    expect(groups[0].latitude).toBe(firstPOI.latitude);
    expect(groups[0].longitude).toBe(firstPOI.longitude);
  });

  it('does not merge POIs with nearby but different coordinates', () => {
    const nearbyPOI = {
      ...secondPOI,
      latitude: firstPOI.latitude + 0.000001,
      longitude: firstPOI.longitude,
    };

    expect(groupOfflinePOIsByCoordinates([firstPOI, nearbyPOI])).toHaveLength(2);
  });

  it('returns a padded region containing every POI', () => {
    const pois = getOfflinePOIs('paris');
    const region = getOfflinePOIMapRegion(pois);

    expect(region).not.toBeNull();
    expect(region!.latitudeDelta).toBeGreaterThan(0);
    expect(region!.longitudeDelta).toBeGreaterThan(0);

    for (const poi of pois) {
      expect(Math.abs(poi.latitude - region!.latitude)).toBeLessThanOrEqual(
        region!.latitudeDelta / 2
      );
      expect(Math.abs(poi.longitude - region!.longitude)).toBeLessThanOrEqual(
        region!.longitudeDelta / 2
      );
    }
  });

  it('returns null for an empty destination', () => {
    expect(getOfflinePOIMapRegion([])).toBeNull();
  });
});
