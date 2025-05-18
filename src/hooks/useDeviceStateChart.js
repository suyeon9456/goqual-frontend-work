import { useMemo } from 'react';
import { DEVICE_ID, GRAPH_COLORS } from '../lib/constant';
import useTimeseries from './api/useTimeseries';

const DEFAULT_DATASET = {
  borderWidth: 2,
  backgroundColor: 'transparent',
  fill: true,
};

const useDeviceStateChart = () => {
  const { telemetryValues, telemetryKeys } = useTimeseries({
    deviceId: DEVICE_ID,
  });

  const minuteTimestamps = useMemo(() => {
    if (telemetryValues == null || telemetryKeys == null) return [];
    const firstItemValues = telemetryValues[telemetryKeys[0]];

    return firstItemValues.map((item) => item.ts.getTime());
  }, [telemetryKeys, telemetryValues]);

  const maxValue = useMemo(() => {
    if (telemetryValues == null) return 100;
    const maxValues = Object.values(telemetryValues).map((value) =>
      Math.max(...value.map((t) => t.value)),
    );
    return Math.max(...maxValues);
  }, [telemetryValues]);

  const labels = useMemo(() => {
    if (minuteTimestamps == null) return [];
    return minuteTimestamps.map((label) => {
      const date = new Date(label);
      return date.getHours() + ':' + date.getMinutes();
    });
  }, [minuteTimestamps]);

  const datasets = useMemo(() => {
    if (telemetryValues == null) return [];
    return telemetryKeys?.map((label, index) => {
      return {
        ...DEFAULT_DATASET,
        label,
        values: telemetryValues?.[label] ?? [],
        borderColor: GRAPH_COLORS[index] ?? getStyle('--cui-info'),
        pointHoverBackgroundColor: GRAPH_COLORS[index] ?? getStyle('--cui-info'),
        data: telemetryValues?.[label]?.map((t) => t.value) ?? [],
      };
    });
  }, [telemetryValues, telemetryKeys]);

  const requestTime = useMemo(() => {
    if (minuteTimestamps.length === 0) return '';
    const startDate = new Date(minuteTimestamps[0]);
    const endDate = new Date(minuteTimestamps[minuteTimestamps.length - 1]);
    return `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()} ~ ${endDate.getHours()}:${endDate.getMinutes()}`;
  }, [minuteTimestamps]);

  return { maxValue, labels, datasets, requestTime };
};

export default useDeviceStateChart;
