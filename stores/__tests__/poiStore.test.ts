import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_POI_FILTERS, POIFilters } from '../../types/poi';
import { poiStore } from '../poiStore';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;

describe('poiStore', () => {
  beforeEach(() => {
    mockGetItem.mockReset();
  });

  it('returns persisted filters when their shape is valid', async () => {
    const filters: POIFilters = {
      categories: ['museum', 'park'],
      searchRadius: 2500,
    };
    mockGetItem.mockResolvedValueOnce(JSON.stringify(filters));

    await expect(poiStore.getFilters()).resolves.toEqual(filters);
  });

  it('uses default filters when persisted JSON is invalid', async () => {
    mockGetItem.mockResolvedValueOnce('{invalid-json');

    await expect(poiStore.getFilters()).resolves.toEqual(DEFAULT_POI_FILTERS);
  });

  it('uses default filters when persisted values have an invalid shape', async () => {
    mockGetItem.mockResolvedValueOnce(JSON.stringify({
      categories: ['museum', 'unsupported-category'],
      searchRadius: -1,
    }));

    await expect(poiStore.getFilters()).resolves.toEqual(DEFAULT_POI_FILTERS);
  });

  it('rejects a malformed persisted favorites list', async () => {
    mockGetItem.mockResolvedValueOnce(JSON.stringify(['valid-id', 42]));

    await expect(poiStore.getFavorites()).resolves.toEqual([]);
  });
});
