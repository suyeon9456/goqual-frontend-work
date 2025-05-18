import axios from '../lib/axios';

export const getTelemetryKeys = async (deviceId) => {
  const response = await axios.get(`/plugins/telemetry/DEVICE/${deviceId}/keys/timeseries`);
  return response.data;
};

export const getTelemetryValues = async ({ deviceId, keys, startTs, endTs }) => {
  const response = await axios.get(`/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`, {
    params: {
      keys: keys.join(','),
      startTs,
      endTs,
    },
  });
  return response.data;
};
