import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { languageStore } from '../stores/languageStore';

import fr from './fr';
import en from './en';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

export const supportedLanguages = [
  { code: 'fr', label: 'settings.french' },
  { code: 'en', label: 'settings.english' },
];

const getDeviceLanguage = (): string => {
  const locales = getLocales();
  const languageCode = locales[0]?.languageCode ?? 'fr';
  return languageCode in resources ? languageCode : 'fr';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export async function changeLanguage(lang: string): Promise<void> {
  await i18n.changeLanguage(lang);
  await languageStore.setLanguage(lang);
}

export async function initLanguage(): Promise<void> {
  const saved = await languageStore.getLanguage();
  if (saved) {
    await i18n.changeLanguage(saved);
  }
}

export default i18n;
