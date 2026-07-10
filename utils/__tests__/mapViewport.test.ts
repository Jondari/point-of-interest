import { CommuneRenderData, HeatmapPoint } from '../../types/dangerZone';
import {
  filterCommunesByViewport,
  filterHeatmapByViewport,
  isPointWithinViewport,
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
});
