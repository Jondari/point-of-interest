import { act, renderHook } from '@testing-library/react-native';
import { fetchRoute } from '../../services/osrmApi';
import { Route, RoutePoint } from '../../types/route';
import { useRoute } from '../useRoute';

jest.mock('../../services/osrmApi', () => ({
  fetchRoute: jest.fn(),
}));

const mockFetchRoute = fetchRoute as jest.MockedFunction<typeof fetchRoute>;

const from: RoutePoint = { latitude: 48.8566, longitude: 2.3522 };
const firstDestination: RoutePoint = { latitude: 48.8606, longitude: 2.3376 };
const secondDestination: RoutePoint = { latitude: 48.8584, longitude: 2.2945 };

function makeRoute(destination: RoutePoint): Route {
  return {
    points: [from, destination],
    steps: [],
    totalDistance: 1000,
    totalDuration: 600,
    mode: 'walking',
  };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, resolve, reject };
}

describe('useRoute', () => {
  beforeEach(() => {
    mockFetchRoute.mockReset();
  });

  it('keeps the latest route when responses arrive out of order', async () => {
    const firstRequest = deferred<Route>();
    const secondRequest = deferred<Route>();
    let firstSignal: AbortSignal | undefined;

    mockFetchRoute
      .mockImplementationOnce((_from, _to, _mode, signal) => {
        firstSignal = signal;
        return firstRequest.promise;
      })
      .mockImplementationOnce(() => secondRequest.promise);

    const { result } = renderHook(() => useRoute());
    let firstCalculation!: Promise<Route | null>;
    let secondCalculation!: Promise<Route | null>;

    act(() => {
      firstCalculation = result.current.calculateRoute(from, firstDestination);
    });
    act(() => {
      secondCalculation = result.current.calculateRoute(from, secondDestination);
    });

    expect(firstSignal?.aborted).toBe(true);

    const latestRoute = makeRoute(secondDestination);
    await act(async () => {
      secondRequest.resolve(latestRoute);
      await secondCalculation;
    });

    expect(result.current.route).toEqual(latestRoute);

    await act(async () => {
      firstRequest.resolve(makeRoute(firstDestination));
      await firstCalculation;
    });

    expect(result.current.route).toEqual(latestRoute);
    expect(result.current.isLoading).toBe(false);
  });

  it('does not restore a route after clearRoute cancels its request', async () => {
    const request = deferred<Route>();
    let signal: AbortSignal | undefined;
    mockFetchRoute.mockImplementation((_from, _to, _mode, requestSignal) => {
      signal = requestSignal;
      return request.promise;
    });

    const { result } = renderHook(() => useRoute());
    let calculation!: Promise<Route | null>;

    act(() => {
      calculation = result.current.calculateRoute(from, firstDestination);
    });
    act(() => {
      result.current.clearRoute();
    });

    expect(signal?.aborted).toBe(true);

    await act(async () => {
      request.resolve(makeRoute(firstDestination));
      await calculation;
    });

    expect(result.current.route).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('exposes an error when the active request fails', async () => {
    mockFetchRoute.mockRejectedValueOnce(new Error('OSRM unavailable'));
    const { result } = renderHook(() => useRoute());

    await act(async () => {
      await result.current.calculateRoute(from, firstDestination);
    });

    expect(result.current.route).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('routes.fetchError');
  });
});
