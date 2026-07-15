import { act, renderHook } from '@testing-library/react-native';
import * as Location from 'expo-location';
import { useLocation } from '../useLocation';

jest.mock('expo-location', () => ({
  Accuracy: { Balanced: 3 },
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  watchPositionAsync: jest.fn(),
}));

const requestPermissionMock = Location.requestForegroundPermissionsAsync as jest.Mock;
const getCurrentPositionMock = Location.getCurrentPositionAsync as jest.Mock;

describe('useLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    requestPermissionMock.mockResolvedValue({ status: 'granted' });
    getCurrentPositionMock.mockResolvedValue({
      coords: { latitude: 48.8566, longitude: 2.3522 },
    });
  });

  it('does not request location permission when automatic initialization is disabled', () => {
    const { result } = renderHook(() => useLocation({ autoInitialize: false }));

    expect(result.current.isLoading).toBe(false);
    expect(requestPermissionMock).not.toHaveBeenCalled();
    expect(getCurrentPositionMock).not.toHaveBeenCalled();
  });

  it('retrieves the position after an explicit permission request', async () => {
    const { result } = renderHook(() => useLocation({ autoInitialize: false }));

    await act(async () => {
      expect(await result.current.requestPermission()).toBe(true);
    });
    await act(async () => {
      await result.current.getCurrentLocation();
    });

    expect(requestPermissionMock).toHaveBeenCalledTimes(1);
    expect(getCurrentPositionMock).toHaveBeenCalledTimes(1);
    expect(result.current.location).toEqual({
      latitude: 48.8566,
      longitude: 2.3522,
    });
  });
});
