import { useState, useEffect, useCallback } from 'react';
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

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    location: null,
    errorMessage: null,
    isLoading: true,
    permissionStatus: null,
  });

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

  const initLocation = useCallback(async () => {
    const hasPermission = await requestPermission();
    if (hasPermission) {
      await getCurrentLocation();
    }
  }, [requestPermission, getCurrentLocation]);

  useEffect(() => {
    initLocation();
  }, [initLocation]);

  return {
    ...state,
    requestPermission,
    getCurrentLocation,
    refreshLocation: getCurrentLocation,
  };
}
