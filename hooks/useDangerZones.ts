import { useState, useCallback, useEffect } from 'react';
import { DangerRenderMode, CommuneRenderData, HeatmapPoint, IndicatorMeta, QPVFeature, QRRFeature } from '../types/dangerZone';
import { getCommuneRenderData, getHeatmapPoints, getDataYear, getAvailableIndicators, getQPVData, getQRRData } from '../services/crimeDataService';

export function useDangerZones() {
  const [isVisible, setIsVisible] = useState(false);
  const [renderMode, setRenderMode] = useState<DangerRenderMode>('choropleth');
  const [selectedIndicator, setSelectedIndicator] = useState('all');
  const [showQPV, setShowQPV] = useState(false);
  const [showQRR, setShowQRR] = useState(false);
  const [availableIndicators, setAvailableIndicators] = useState<IndicatorMeta[]>([]);
  const [dataYear, setDataYear] = useState<number | null>(null);
  const [communeData, setCommuneData] = useState<CommuneRenderData[]>([]);
  const [heatmapPoints, setHeatmapPoints] = useState<HeatmapPoint[]>([]);
  const [qpvData, setQPVData] = useState<QPVFeature[]>([]);
  const [qrrData, setQRRData] = useState<QRRFeature[]>([]);
  const [crimeLoading, setCrimeLoading] = useState(false);
  const [qpvLoading, setQPVLoading] = useState(false);
  const [qrrLoading, setQRRLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setCommuneData([]);
      setHeatmapPoints([]);
      setCrimeLoading(false);
      return;
    }

    let active = true;
    setCrimeLoading(true);
    setError(null);

    if (renderMode === 'choropleth') {
      setHeatmapPoints([]);
    } else {
      setCommuneData([]);
    }

    const layerPromise = renderMode === 'choropleth'
      ? getCommuneRenderData(selectedIndicator)
      : getHeatmapPoints(selectedIndicator);

    Promise.all([getAvailableIndicators(), getDataYear(), layerPromise])
      .then(([indicators, year, layerData]) => {
        if (!active) return;

        setAvailableIndicators(indicators);
        setDataYear(year);
        if (renderMode === 'choropleth') {
          setCommuneData(layerData as CommuneRenderData[]);
        } else {
          setHeatmapPoints(layerData as HeatmapPoint[]);
        }
      })
      .catch(() => {
        if (active) setError('dangerZones.loadError');
      })
      .finally(() => {
        if (active) setCrimeLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isVisible, renderMode, selectedIndicator]);

  useEffect(() => {
    if (!showQPV) {
      setQPVData([]);
      setQPVLoading(false);
      return;
    }

    let active = true;
    setQPVLoading(true);
    setError(null);
    getQPVData()
      .then((features) => {
        if (active) setQPVData(features);
      })
      .catch(() => {
        if (active) setError('dangerZones.loadError');
      })
      .finally(() => {
        if (active) setQPVLoading(false);
      });

    return () => {
      active = false;
    };
  }, [showQPV]);

  useEffect(() => {
    if (!showQRR) {
      setQRRData([]);
      setQRRLoading(false);
      return;
    }

    let active = true;
    setQRRLoading(true);
    setError(null);
    getQRRData()
      .then((features) => {
        if (active) setQRRData(features);
      })
      .catch(() => {
        if (active) setError('dangerZones.loadError');
      })
      .finally(() => {
        if (active) setQRRLoading(false);
      });

    return () => {
      active = false;
    };
  }, [showQRR]);

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
    isLoading: crimeLoading || qpvLoading || qrrLoading,
    error,
    toggleVisibility,
    setRenderMode,
    toggleRenderMode,
    setIndicator: setSelectedIndicator,
    toggleQPV,
    toggleQRR,
    clearError: () => setError(null),
  };
}
