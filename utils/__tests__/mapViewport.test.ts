import { CommuneRenderData, HeatmapPoint } from '../../types/dangerZone';
import { POI } from '../../types/poi';
import {
  createPOIMapItemsForViewport,
  filterCommunesByViewport,
  filterHeatmapByViewport,
  getRegionForPOICluster,
  isPointWithinViewport,
  POICluster,
  selectPOIsForViewport,
  ViewportRegion,
} from '../mapViewport';

const parisRegion: ViewportRegion = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

function commune(codeCommune: string, centerLat: number, centerLon: number) {
  return { codeCommune, centerLat, centerLon } as CommuneRenderData;
}

function poi(id: string, latitude: number, longitude: number): POI {
  return {
    id,
    name: id,
    category: 'museum',
    latitude,
    longitude,
    tags: {},
  };
}

describe('mapViewport', () => {
  it('includes the visible region and its rendering margin', () => {
    expect(isPointWithinViewport(48.8566, 2.3522, parisRegion)).toBe(true);
    expect(isPointWithinViewport(48.9466, 2.3522, parisRegion)).toBe(true);
    expect(isPointWithinViewport(49.0566, 2.3522, parisRegion)).toBe(false);
  });

  it('filters communes using their center coordinates', () => {
    const paris = commune('paris', 48.8566, 2.3522);
    const beijing = commune('beijing', 39.9042, 116.4074);

    expect(filterCommunesByViewport([paris, beijing], parisRegion)).toEqual([paris]);
  });

  it('filters heatmap points outside the viewport', () => {
    const points: HeatmapPoint[] = [
      { latitude: 48.86, longitude: 2.35, weight: 0.8 },
      { latitude: 48.5, longitude: 2.35, weight: 0.5 },
    ];

    expect(filterHeatmapByViewport(points, parisRegion)).toEqual([points[0]]);
  });

  it('keeps the closest visible POIs up to the requested limit', () => {
    const closest = poi('closest', 48.857, 2.352);
    const second = poi('second', 48.87, 2.36);
    const outside = poi('outside', 49.1, 2.35);

    expect(
      selectPOIsForViewport(
        [second, outside, closest],
        parisRegion,
        1
      )
    ).toEqual([closest]);
  });

  it('does not mutate the original POI order', () => {
    const farther = poi('farther', 48.87, 2.36);
    const closest = poi('closest', 48.857, 2.352);
    const pois = [farther, closest];

    selectPOIsForViewport(pois, parisRegion, 2);

    expect(pois).toEqual([farther, closest]);
  });

  it('returns no POI when the limit is not positive', () => {
    expect(
      selectPOIsForViewport(
        [poi('museum', 48.8566, 2.3522)],
        parisRegion,
        0
      )
    ).toEqual([]);
  });

  it('keeps individual markers while their count is below the limit', () => {
    const items = createPOIMapItemsForViewport(
      [
        poi('first', 48.8566, 2.3522),
        poi('second', 48.8567, 2.3523),
      ],
      parisRegion,
      100
    );

    expect(items).toHaveLength(2);
    expect(items.every(item => item.type === 'poi')).toBe(true);
  });

  it('clusters visible POIs when they exceed the marker limit', () => {
    const items = createPOIMapItemsForViewport(
      Array.from({ length: 101 }, (_, index) =>
        poi(`poi-${index}`, 48.8566, 2.3522)
      ),
      parisRegion,
      100
    );

    expect(items.length).toBeLessThanOrEqual(100);
    expect(items).toHaveLength(1);
    expect(items[0].type).toBe('cluster');
    if (items[0].type === 'cluster') {
      expect(items[0].cluster.count).toBe(101);
    }
  });

  it('calculates a padded map region for a cluster', () => {
    const cluster: POICluster = {
      latitude: 48.86,
      longitude: 2.36,
      count: 2,
      pois: [
        poi('south-west', 48.85, 2.35),
        poi('north-east', 48.87, 2.37),
      ],
    };

    const region = getRegionForPOICluster(cluster);

    expect(region.latitude).toBeCloseTo(48.86, 6);
    expect(region.longitude).toBeCloseTo(2.36, 6);
    expect(region.latitudeDelta).toBeCloseTo(0.03, 6);
    expect(region.longitudeDelta).toBeCloseTo(0.03, 6);
  });
});
