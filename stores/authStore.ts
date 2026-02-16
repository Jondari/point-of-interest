import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'poi_auth_status';

export interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
}

export const authStore = {
  async getAuthState(): Promise<AuthState> {
    try {
      const value = await AsyncStorage.getItem(AUTH_KEY);
      if (value) {
        return JSON.parse(value);
      }
      return { isAuthenticated: false, isGuest: false };
    } catch {
      return { isAuthenticated: false, isGuest: false };
    }
  },

  async loginAsGuest(): Promise<void> {
    const state: AuthState = { isAuthenticated: true, isGuest: true };
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(state));
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(AUTH_KEY);
  },
};
