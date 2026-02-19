import { useState, useCallback, useMemo } from 'react';
import { DangerRenderMode, CommuneRenderData, HeatmapPoint, IndicatorMeta, QPVFeature, QRRFeature } from '../types/dangerZone';
import { getCommuneRenderData, getHeatmapPoints, getDataYear, getAvailableIndicators, getQPVData, getQRRData } from '../services/crimeDataService';

export function useDangerZones() {
  const [isVisible, setIsVisible] = useState(false);
  const [renderMode, setRenderMode] = useState<DangerRenderMode>('choropleth');
  const [selectedIndicator, setSelectedIndicator] = useState('all');
  const [showQPV, setShowQPV] = useState(false);
  const [showQRR, setShowQRR] = useState(false);

  const availableIndicators = useMemo<IndicatorMeta[]>(() => getAvailableIndicators(), []);
  const dataYear = useMemo(() => getDataYear(), []);
  const qpvData = useMemo<QPVFeature[]>(() => getQPVData(), []);
  const qrrData = useMemo<QRRFeature[]>(() => getQRRData(), []);

  const communeData = useMemo<CommuneRenderData[]>(
    () => getCommuneRenderData(selectedIndicator),
    [selectedIndicator]
  );
  const heatmapPoints = useMemo<HeatmapPoint[]>(
    () => getHeatmapPoints(selectedIndicator),
    [selectedIndicator]
  );

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const toggleRenderMode = useCallback(() => {
    setRenderMode((prev) => (prev === 'choropleth' ? 'heatmap' : 'choropleth'));
  }, []);

  const toggleQPV = useCallback(() => {
    setShowQPV((prev) => !prev);
  }, []);

  const toggleQRR = useCallback(() => {
    setShowQRR((prev) => !prev);
  }, []);

  return {
    isVisible,
    renderMode,
    selectedIndicator,
    showQPV,
    showQRR,
    communeData,
    heatmapPoints,
    dataYear,
    availableIndicators,
    qpvData,
    qrrData,
    toggleVisibility,
    setRenderMode,
    toggleRenderMode,
    setIndicator: setSelectedIndicator,
    toggleQPV,
    toggleQRR,
  };
}
