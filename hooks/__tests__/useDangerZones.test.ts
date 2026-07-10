import { act, renderHook } from '@testing-library/react-native';
import {
  getAvailableIndicators,
  getCommuneRenderData,
  getDataYear,
  getHeatmapPoints,
  getQPVData,
  getQRRData,
} from '../../services/crimeDataService';
import { CommuneRenderData } from '../../types/dangerZone';
import { useDangerZones } from '../useDangerZones';

jest.mock('../../services/crimeDataService', () => ({
  getAvailableIndicators: jest.fn(),
  getCommuneRenderData: jest.fn(),
  getDataYear: jest.fn(),
  getHeatmapPoints: jest.fn(),
  getQPVData: jest.fn(),
  getQRRData: jest.fn(),
}));

const mockGetAvailableIndicators = getAvailableIndicators as jest.MockedFunction<typeof getAvailableIndicators>;
const mockGetCommuneRenderData = getCommuneRenderData as jest.MockedFunction<typeof getCommuneRenderData>;
const mockGetDataYear = getDataYear as jest.MockedFunction<typeof getDataYear>;
const mockGetHeatmapPoints = getHeatmapPoints as jest.MockedFunction<typeof getHeatmapPoints>;
const mockGetQPVData = getQPVData as jest.MockedFunction<typeof getQPVData>;
const mockGetQRRData = getQRRData as jest.MockedFunction<typeof getQRRData>;

const commune = {
  codeCommune: '75101',
  centerLat: 48.8629,
  centerLon: 2.3357,
} as CommuneRenderData;

async function flushMicrotasks() {
  await Promise.resolve();
  await Promise.resolve();
}

describe('useDangerZones', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAvailableIndicators.mockResolvedValue([
      { id: 'all', labelKey: 'dangerZones.indicators.all' },
    ]);
    mockGetDataYear.mockResolvedValue(2024);
    mockGetCommuneRenderData.mockResolvedValue([commune]);
    mockGetHeatmapPoints.mockResolvedValue([]);
    mockGetQPVData.mockResolvedValue([]);
    mockGetQRRData.mockResolvedValue([]);
  });

  it('does not request crime data until the layer is enabled', async () => {
    const { result } = renderHook(() => useDangerZones());
    await act(flushMicrotasks);

    expect(mockGetCommuneRenderData).not.toHaveBeenCalled();
    expect(mockGetAvailableIndicators).not.toHaveBeenCalled();

    act(() => {
      result.current.toggleVisibility();
    });

    expect(result.current.isLoading).toBe(true);

    await act(flushMicrotasks);

    expect(mockGetCommuneRenderData).toHaveBeenCalledWith('all');
    expect(result.current.communeData).toEqual([commune]);
    expect(result.current.dataYear).toBe(2024);
    expect(result.current.isLoading).toBe(false);
  });

  it('loads QPV data only while its overlay is enabled', async () => {
    const { result } = renderHook(() => useDangerZones());
    await act(flushMicrotasks);

    expect(mockGetQPVData).not.toHaveBeenCalled();

    act(() => {
      result.current.toggleQPV();
    });
    await act(flushMicrotasks);

    expect(mockGetQPVData).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.toggleQPV();
    });

    expect(result.current.qpvData).toEqual([]);
  });
});
