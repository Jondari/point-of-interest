import { act, renderHook } from '@testing-library/react-native';
import { fetchPOIs, OverpassApiError } from '../../services/overpassApi';
import { poiStore } from '../../stores/poiStore';
import { DEFAULT_POI_FILTERS, POI } from '../../types/poi';
import { usePOI } from '../usePOI';

jest.mock('../../services/overpassApi', () => {
  const actual = jest.requireActual('../../services/overpassApi');
  return { ...actual, fetchPOIs: jest.fn() };
});

jest.mock('../../stores/poiStore', () => ({
  poiStore: {
    getFilters: jest.fn(),
    setFilters: jest.fn(),
  },
}));

const mockFetchPOIs = fetchPOIs as jest.MockedFunction<typeof fetchPOIs>;
const mockGetFilters = poiStore.getFilters as jest.MockedFunction<typeof poiStore.getFilters>;

const parisPOI: POI = {
  id: 'paris',
  name: 'Paris POI',
  category: 'monument',
  latitude: 48.8566,
  longitude: 2.3522,
  tags: {},
};

const beijingPOI: POI = {
  id: 'beijing',
  name: 'Beijing POI',
  category: 'monument',
  latitude: 39.9042,
  longitude: 116.4074,
  tags: {},
};

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(resolvePromise => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
}

async function flushMicrotasks() {
  await Promise.resolve();
  await Promise.resolve();
}

describe('usePOI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockFetchPOIs.mockReset();
    mockGetFilters.mockReset();
    mockGetFilters.mockResolvedValue(DEFAULT_POI_FILTERS);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('debounces rapid location changes and fetches only the latest one', async () => {
    mockFetchPOIs.mockResolvedValue([]);
    const { result } = renderHook(() => usePOI());

    await act(flushMicrotasks);

    act(() => {
      result.current.fetchPOIs(48.8566, 2.3522);
      result.current.fetchPOIs(48.8606, 2.3376);
      result.current.fetchPOIs(48.8584, 2.2945);
      jest.advanceTimersByTime(399);
    });

    expect(mockFetchPOIs).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(1);
      await flushMicrotasks();
    });

    expect(mockFetchPOIs).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(false);
  });

  it('aborts an old request and ignores its late response', async () => {
    const firstRequest = deferred<POI[]>();
    const secondRequest = deferred<POI[]>();
    let firstSignal: AbortSignal | undefined;

    mockFetchPOIs
      .mockImplementationOnce((_bbox, _categories, signal) => {
        firstSignal = signal;
        return firstRequest.promise;
      })
      .mockImplementationOnce(() => secondRequest.promise);

    const { result } = renderHook(() => usePOI());
    await act(flushMicrotasks);

    act(() => {
      result.current.fetchPOIs(48.8566, 2.3522);
      jest.advanceTimersByTime(400);
    });

    act(() => {
      result.current.fetchPOIs(39.9042, 116.4074);
    });

    expect(firstSignal?.aborted).toBe(true);

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await act(async () => {
      secondRequest.resolve([beijingPOI]);
      await secondRequest.promise;
      await flushMicrotasks();
    });

    expect(result.current.pois).toEqual([beijingPOI]);

    await act(async () => {
      firstRequest.resolve([parisPOI]);
      await firstRequest.promise;
      await flushMicrotasks();
    });

    expect(result.current.pois).toEqual([beijingPOI]);
    expect(result.current.isLoading).toBe(false);
  });

  it('exposes an error when the active request fails', async () => {
    mockFetchPOIs.mockRejectedValueOnce(new Error('Overpass unavailable'));
    const { result } = renderHook(() => usePOI());
    await act(flushMicrotasks);

    await act(async () => {
      result.current.fetchPOIs(48.8566, 2.3522);
      jest.advanceTimersByTime(400);
      await flushMicrotasks();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('poi.fetchError');
  });

  it.each([
    [406, 'poi.clientRejectedError'],
    [429, 'poi.rateLimitError'],
    [504, 'poi.gatewayTimeoutError'],
  ])(
    'maps Overpass HTTP %i to %s',
    async (status, expectedError) => {
      mockFetchPOIs.mockRejectedValueOnce(new OverpassApiError(status));
      const { result } = renderHook(() => usePOI());
      await act(flushMicrotasks);

      await act(async () => {
        result.current.fetchPOIs(48.8566, 2.3522);
        jest.advanceTimersByTime(400);
        await flushMicrotasks();
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(expectedError);
    }
  );
});
