export interface POILimits {
  overpassCandidates: number;
  retainedResults: number;
  renderedMarkers: number;
}

const MOBILE_POI_LIMITS: POILimits = {
  overpassCandidates: 1000,
  retainedResults: 200,
  renderedMarkers: 100,
};

const WEB_POI_LIMITS: POILimits = {
  overpassCandidates: 2000,
  retainedResults: 1000,
  renderedMarkers: 1000,
};

export function getPOILimits(platform: string): POILimits {
  return platform === 'web' ? WEB_POI_LIMITS : MOBILE_POI_LIMITS;
}
