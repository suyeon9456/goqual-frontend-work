export const createQueryKeyFactory = (base) => ({
  base: [base],
  detail: (deviceId) => [base, deviceId],
});

export const timeseriesQueryKey = createQueryKeyFactory('timeseries keys');
export const timeseriesValuesQueryKey = createQueryKeyFactory('timeseries values');
