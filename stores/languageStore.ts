import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'poi_language';

export const languageStore = {
  async getLanguage(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(LANGUAGE_KEY);
    } catch {
      return null;
    }
  },

  async setLanguage(lang: string): Promise<void> {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  },

  async clearLanguage(): Promise<void> {
    await AsyncStorage.removeItem(LANGUAGE_KEY);
  },
};
