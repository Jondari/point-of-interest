import { useState, useCallback, useMemo } from 'react';
import { DangerRenderMode, CommuneRenderData, HeatmapPoint } from '../types/dangerZone';
import { getCommuneRenderData, getHeatmapPoints, getDataYear } from '../services/crimeDataService';

export function useDangerZones() {
  const [isVisible, setIsVisible] = useState(false);
  const [renderMode, setRenderMode] = useState<DangerRenderMode>('choropleth');

  const communeData = useMemo<CommuneRenderData[]>(() => getCommuneRenderData(), []);
  const heatmapPoints = useMemo<HeatmapPoint[]>(() => getHeatmapPoints(), []);
  const dataYear = useMemo(() => getDataYear(), []);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const toggleRenderMode = useCallback(() => {
    setRenderMode((prev) => (prev === 'choropleth' ? 'heatmap' : 'choropleth'));
  }, []);

  return {
    isVisible,
    renderMode,
    communeData,
    heatmapPoints,
    dataYear,
    toggleVisibility,
    setRenderMode,
    toggleRenderMode,
  };
}
