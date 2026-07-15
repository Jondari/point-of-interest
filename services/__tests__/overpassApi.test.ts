import { MapRegion } from '../../types/poi';
import {
  getBoundingBoxFromRegion,
  isBoundingBoxContained,
} from '../overpassApi';

const parisRegion: MapRegion = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.02,
  longitudeDelta: 0.04,
};

describe('getBoundingBoxFromRegion', () => {
  it('adds a 25 percent margin on each side of the viewport', () => {
    const bbox = getBoundingBoxFromRegion(parisRegion, 5000);

    expect(bbox.south).toBeCloseTo(48.8416, 6);
    expect(bbox.north).toBeCloseTo(48.8716, 6);
    expect(bbox.west).toBeCloseTo(2.3222, 6);
    expect(bbox.east).toBeCloseTo(2.3822, 6);
  });

  it('caps a large viewport to the configured search radius', () => {
    const bbox = getBoundingBoxFromRegion(
      {
        ...parisRegion,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      5000
    );

    const expectedLatitudeRadius = 5000 / 111320;
    const expectedLongitudeRadius =
      5000 /
      (111320 * Math.cos(parisRegion.latitude * (Math.PI / 180)));

    expect(bbox.north - parisRegion.latitude).toBeCloseTo(
      expectedLatitudeRadius,
      6
    );
    expect(parisRegion.latitude - bbox.south).toBeCloseTo(
      expectedLatitudeRadius,
      6
    );
    expect(bbox.east - parisRegion.longitude).toBeCloseTo(
      expectedLongitudeRadius,
      6
    );
    expect(parisRegion.longitude - bbox.west).toBeCloseTo(
      expectedLongitudeRadius,
      6
    );
  });

  it('does not allow a negative viewport margin', () => {
    const bbox = getBoundingBoxFromRegion(parisRegion, 5000, -1);

    expect(bbox.south).toBeCloseTo(48.8466, 6);
    expect(bbox.north).toBeCloseTo(48.8666, 6);
    expect(bbox.west).toBeCloseTo(2.3322, 6);
    expect(bbox.east).toBeCloseTo(2.3722, 6);
  });
});

describe('isBoundingBoxContained', () => {
  const outer = {
    south: 48.84,
    west: 2.33,
    north: 48.88,
    east: 2.39,
  };

  it('returns true when the viewport is inside the fetched area', () => {
    expect(
      isBoundingBoxContained(
        {
          south: 48.85,
          west: 2.34,
          north: 48.87,
          east: 2.38,
        },
        outer
      )
    ).toBe(true);
  });

  it('returns false when the viewport extends outside the fetched area', () => {
    expect(
      isBoundingBoxContained(
        {
          south: 48.85,
          west: 2.34,
          north: 48.87,
          east: 2.4,
        },
        outer
      )
    ).toBe(false);
  });
});
