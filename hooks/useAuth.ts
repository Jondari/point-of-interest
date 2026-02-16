import { useState, useEffect, useCallback } from 'react';
import { authStore, AuthState } from '../stores/authStore';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isGuest: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const state = await authStore.getAuthState();
      setAuthState(state);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = useCallback(async () => {
    await authStore.loginAsGuest();
    setAuthState({ isAuthenticated: true, isGuest: true });
  }, []);

  const logout = useCallback(async () => {
    await authStore.logout();
    setAuthState({ isAuthenticated: false, isGuest: false });
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    isGuest: authState.isGuest,
    isLoading,
    loginAsGuest,
    logout,
  };
}
