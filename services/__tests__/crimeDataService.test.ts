import { getCommuneRenderData } from '../crimeDataService';

describe('crimeDataService', () => {
  it('caches processed commune data by indicator', async () => {
    const firstRequest = getCommuneRenderData('all');
    const secondRequest = getCommuneRenderData('all');

    expect(secondRequest).toBe(firstRequest);

    const firstResult = await firstRequest;
    const secondResult = await getCommuneRenderData('all');

    expect(firstResult.length).toBeGreaterThan(0);
    expect(secondResult).toBe(firstResult);
  });
});
