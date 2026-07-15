import { BoundingBox, POI, POICategory } from '../../types/poi';
import { selectBalancedPOIs } from '../poiSelection';

const bbox: BoundingBox = {
  south: 48.8,
  west: 2.3,
  north: 48.9,
  east: 2.4,
};

function poi(
  id: string,
  category: POICategory,
  offset: number
): POI {
  return {
    id,
    name: id,
    category,
    latitude: 48.85 + offset,
    longitude: 2.35,
    tags: {},
  };
}

describe('selectBalancedPOIs', () => {
  it('reserves an equal initial quota for each selected category', () => {
    const restaurants = Array.from({ length: 6 }, (_, index) =>
      poi(`restaurant-${index}`, 'restaurant', index * 0.001)
    );
    const museums = Array.from({ length: 2 }, (_, index) =>
      poi(`museum-${index}`, 'museum', 0.02 + index * 0.001)
    );

    const selected = selectBalancedPOIs(
      [...restaurants, ...museums],
      ['restaurant', 'museum'],
      bbox,
      4
    );

    expect(selected.filter(item => item.category === 'restaurant')).toHaveLength(2);
    expect(selected.filter(item => item.category === 'museum')).toHaveLength(2);
  });

  it('redistributes unused places to the nearest remaining POIs', () => {
    const selected = selectBalancedPOIs(
      [
        poi('museum', 'museum', 0.02),
        ...Array.from({ length: 5 }, (_, index) =>
          poi(`restaurant-${index}`, 'restaurant', index * 0.001)
        ),
      ],
      ['restaurant', 'museum'],
      bbox,
      4
    );

    expect(selected.filter(item => item.category === 'museum')).toHaveLength(1);
    expect(selected.filter(item => item.category === 'restaurant')).toHaveLength(3);
    expect(selected.map(item => item.id)).toContain('restaurant-0');
  });

  it('does not mutate the original POI order', () => {
    const pois = [
      poi('farther', 'museum', 0.02),
      poi('closer', 'museum', 0.001),
    ];

    selectBalancedPOIs(pois, ['museum'], bbox, 1);

    expect(pois.map(item => item.id)).toEqual(['farther', 'closer']);
  });

  it('returns no result when the limit is not positive', () => {
    expect(
      selectBalancedPOIs(
        [poi('museum', 'museum', 0)],
        ['museum'],
        bbox,
        0
      )
    ).toEqual([]);
  });
});
