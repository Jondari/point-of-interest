import { useState, useEffect, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface LocationState {
  location: LocationData | null;
  errorMessage: string | null;
  isLoading: boolean;
  permissionStatus: Location.PermissionStatus | null;
}

export interface UseLocationOptions {
  autoInitialize?: boolean;
}

export function useLocation({ autoInitialize = true }: UseLocationOptions = {}) {
  const [state, setState] = useState<LocationState>({
    location: null,
    errorMessage: null,
    isLoading: autoInitialize,
    permissionStatus: null,
  });
  const watchSubscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const webIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const requestPermission = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, errorMessage: null }));

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setState(prev => ({ ...prev, permissionStatus: status }));

      if (status !== 'granted') {
        setState(prev => ({
          ...prev,
          isLoading: false,
          errorMessage: 'permissions.locationDenied',
        }));
        return false;
      }

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        errorMessage: 'permissions.locationError',
      }));
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, errorMessage: null }));

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setState(prev => ({
        ...prev,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        isLoading: false,
      }));

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        errorMessage: 'permissions.locationUnavailable',
      }));
      return null;
    }
  }, []);

  const startWatching = useCallback(async () => {
    if (Platform.OS === 'web') {
      if (webIntervalRef.current) return;
      webIntervalRef.current = setInterval(async () => {
        try {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          setState(prev => ({
            ...prev,
            location: {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            },
          }));
        } catch {
          // Silently fail
        }
      }, 5000);
      return;
    }

    if (watchSubscriptionRef.current) return;

    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 50,
          timeInterval: 5000,
        },
        (loc) => {
          setState(prev => ({
            ...prev,
            location: {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            },
          }));
        }
      );
      watchSubscriptionRef.current = subscription;
    } catch {
      // Silently fail — getCurrentLocation still works as fallback
    }
  }, []);

  const stopWatching = useCallback(() => {
    if (webIntervalRef.current) {
      clearInterval(webIntervalRef.current);
      webIntervalRef.current = null;
    }
    if (watchSubscriptionRef.current) {
      watchSubscriptionRef.current.remove();
      watchSubscriptionRef.current = null;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, errorMessage: null }));
  }, []);

  const initLocation = useCallback(async () => {
    const hasPermission = await requestPermission();
    if (hasPermission) {
      await getCurrentLocation();
    }
  }, [requestPermission, getCurrentLocation]);

  useEffect(() => {
    if (autoInitialize) {
      void initLocation();
    }

    return () => {
      stopWatching();
    };
  }, [autoInitialize, initLocation, stopWatching]);

  return {
    ...state,
    requestPermission,
    getCurrentLocation,
    refreshLocation: getCurrentLocation,
    startWatching,
    stopWatching,
    clearError,
  };
}
