import { useMemo } from 'react';
import useTimeseries from './useTimeseries';
import { DEVICE_ID, GRAPH_COLORS } from '../lib/constant';

const DEFAULT_DATASET = {
  borderWidth: 2,
  backgroundColor: 'transparent',
  fill: true,
};

const useDeviceStateChart = () => {
  const { telemetryValues, telemetryKeys, minuteTimestamps } = useTimeseries({
    deviceId: DEVICE_ID,
  });

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

  return { maxValue, labels, datasets };
};

export default useDeviceStateChart;
