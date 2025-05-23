import { useMemo } from 'react';
import { DEVICE_ID, GRAPH_COLORS } from '../lib/constant';
import useTimeseries from './api/useTimeseries';
import { formatTime, formatRequestTime, getMaxValue } from '../lib/utils';

const DEFAULT_DATASET = {
  borderWidth: 2,
  backgroundColor: 'transparent',
  fill: true,
};

const createDataset = (label, values, index) => ({
  ...DEFAULT_DATASET,
  label,
  values,
  borderColor: GRAPH_COLORS[index] ?? getStyle('--cui-info'),
  pointHoverBackgroundColor: GRAPH_COLORS[index] ?? getStyle('--cui-info'),
  data: values?.map((t) => t.value) ?? [],
});

const useDeviceStateChart = () => {
  const { timeseriesValues, timeseriesKeys } = useTimeseries({
    deviceId: DEVICE_ID,
  });

  const minuteTimestamps = useMemo(() => {
    if (!timeseriesValues || !timeseriesKeys?.length) return [];
    return timeseriesValues[timeseriesKeys[0]].map((item) => item.ts.getTime());
  }, [timeseriesKeys, timeseriesValues]);

  const maxValue = useMemo(() => getMaxValue(timeseriesValues), [timeseriesValues]);

  const labels = minuteTimestamps.map((timestamp) => formatTime(new Date(timestamp)));

  const datasets = useMemo(() => {
    if (!timeseriesValues || !timeseriesKeys) return [];

    return timeseriesKeys.map((label, index) =>
      createDataset(label, timeseriesValues[label], index),
    );
  }, [timeseriesValues, timeseriesKeys]);

  const requestTime = !minuteTimestamps.length
    ? ''
    : formatRequestTime(
        new Date(minuteTimestamps[0]),
        new Date(minuteTimestamps[minuteTimestamps.length - 1]),
      );

  return { maxValue, labels, datasets, requestTime };
};

export default useDeviceStateChart;
