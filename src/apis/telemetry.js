import axios from '../lib/axios';

export const getTimeseriesKeys = async (deviceId) => {
  const response = await axios.get(`/plugins/telemetry/DEVICE/${deviceId}/keys/timeseries`);
  return response.data;
};

export const getTimeseriesValues = async ({ deviceId, keys, startTs, endTs }) => {
  const response = await axios.get(`/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`, {
    params: {
      keys: keys.join(','),
      startTs,
      endTs,
    },
  });
  return response.data;
};

export const setDeviceBrightness = async ({ deviceId, brightnessValue }) => {
  const response = await axios.post(`/plugins/telemetry/DEVICE/${deviceId}/SERVER_SCOPE`, {
    brightness: brightnessValue,
  });
  return response.data;
};
