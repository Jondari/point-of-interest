import { OFFLINE_CITIES, OFFLINE_COUNTRIES, OFFLINE_POIS } from '../../data/offlinePois';
import {
  getOfflineCities,
  getOfflineCity,
  getOfflineCountries,
  getOfflineCountry,
  getOfflinePOIs,
  searchOfflinePOIs,
} from '../offlinePoiService';
import {
  getLocalizedText,
  isOfflineCityId,
  isOfflineCountryId,
  type LocalizedText,
} from '../../types/offlinePoi';

describe('offlinePoiService country navigation', () => {
  it('only exposes countries that currently contain destinations', () => {
    expect(getOfflineCountries().map((country) => country.id)).toEqual([
      'france',
      'china',
      'spain',
      'italy',
      'netherlands',
      'germany',
      'greece',
    ]);
  });

  it('returns destinations for the selected country', () => {
    expect(getOfflineCities('france').map((city) => city.id)).toEqual([
      'paris',
      'lyon',
      'toulouse',
      'marseille',
      'cannes',
      'nice',
    ]);
    expect(getOfflineCities('china').map((city) => city.id)).toEqual([
      'beijing',
      'qingdao',
      'xian',
      'chengdu',
      'shanghai',
      'chongqing',
    ]);
    expect(getOfflineCities('spain').map((city) => city.id)).toEqual([
      'madrid',
      'barcelona',
      'bilbao',
      'canary-islands',
    ]);
    expect(getOfflineCities('italy').map((city) => city.id)).toEqual([
      'rome',
      'florence',
      'venice',
      'naples',
    ]);
    expect(getOfflineCities('netherlands').map((city) => city.id)).toEqual(['amsterdam']);
    expect(getOfflineCities('germany').map((city) => city.id)).toEqual([
      'berlin',
      'frankfurt',
    ]);
    expect(getOfflineCities('greece').map((city) => city.id)).toEqual(['athens']);
    expect(getOfflineCountry('france')?.name.fr).toBe('France');
    expect(getOfflineCity('paris')?.countryId).toBe('france');
  });

  it('provides usable coordinates for every offline POI', () => {
    for (const city of getOfflineCities()) {
      const pois = getOfflinePOIs(city.id);

      expect(pois.length).toBeGreaterThan(0);
      for (const poi of pois) {
        expect(Number.isFinite(poi.latitude)).toBe(true);
        expect(Number.isFinite(poi.longitude)).toBe(true);
        expect(poi.latitude).toBeGreaterThanOrEqual(-90);
        expect(poi.latitude).toBeLessThanOrEqual(90);
        expect(poi.longitude).toBeGreaterThanOrEqual(-180);
        expect(poi.longitude).toBeLessThanOrEqual(180);
      }
    }
  });

  it('provides 15 offline POIs for every Spanish destination', () => {
    for (const city of getOfflineCities('spain')) {
      expect(OFFLINE_POIS.filter((poi) => poi.cityId === city.id)).toHaveLength(15);
    }
  });

  it('provides 15 offline POIs for every Italian destination', () => {
    for (const city of getOfflineCities('italy')) {
      expect(OFFLINE_POIS.filter((poi) => poi.cityId === city.id)).toHaveLength(15);
    }
  });

  it('provides 15 offline POIs for every Dutch destination', () => {
    for (const city of getOfflineCities('netherlands')) {
      expect(OFFLINE_POIS.filter((poi) => poi.cityId === city.id)).toHaveLength(15);
    }
  });

  it.each(['china', 'germany', 'greece'] as const)(
    'provides 15 offline POIs for every %s destination',
    (countryId) => {
      for (const city of getOfflineCities(countryId)) {
        expect(OFFLINE_POIS.filter((poi) => poi.cityId === city.id)).toHaveLength(15);
      }
    }
  );

  it('keeps search scoped to the selected destination', () => {
    const results = searchOfflinePOIs('paris', 'tour eiffel');

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('paris-eiffel-tower');
  });

  it('returns localized directory content in Chinese', () => {
    expect(getOfflineCountry('france')?.name.zh).toBe('法国');
    expect(getOfflineCountry('china')?.name.zh).toBe('中国');
    expect(
      getLocalizedText(
        { fr: 'Cité interdite', en: 'Forbidden City', zh: '故宫博物院' },
        'zh-CN'
      )
    ).toBe('故宫博物院');
  });

  it('finds points of interest using a Chinese query', () => {
    const results = searchOfflinePOIs('beijing', '故宫');

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('beijing-forbidden-city');
  });

  it('provides Chinese content for every directory entry', () => {
    const localizedTexts: LocalizedText[] = [
      ...OFFLINE_COUNTRIES.map((country) => country.name),
      ...OFFLINE_CITIES.flatMap((city) => [city.name, city.country]),
      ...OFFLINE_POIS.flatMap((poi) => [
        poi.name,
        poi.address,
        poi.description,
        ...poi.highlights,
        ...(poi.imageAlt ? [poi.imageAlt] : []),
        ...(poi.practicalInfo ?? []),
        ...(poi.openingHours ? [poi.openingHours] : []),
        ...(poi.price ? [poi.price] : []),
        ...(poi.accessibility ? [poi.accessibility] : []),
      ]),
    ];

    expect(localizedTexts.every((text) => text.zh.trim().length > 0)).toBe(true);
  });

  it('keeps country, city and POI identifiers valid and unique', () => {
    expect(OFFLINE_COUNTRIES.every((country) => isOfflineCountryId(country.id))).toBe(true);
    expect(OFFLINE_CITIES.every((city) => isOfflineCityId(city.id))).toBe(true);
    expect(new Set(OFFLINE_POIS.map((poi) => poi.id)).size).toBe(OFFLINE_POIS.length);
    expect(
      OFFLINE_CITIES.every((city) =>
        OFFLINE_COUNTRIES.some((country) => country.id === city.countryId)
      )
    ).toBe(true);
  });
});
