export const createQueryKeyFactory = (base) => ({
  base: [base],
  detail: (deviceId) => [base, deviceId],
});

export const telemetryKeysQueryKey = createQueryKeyFactory('telemetry keys');
export const telemetryValuesQueryKey = createQueryKeyFactory('telemetry values');
