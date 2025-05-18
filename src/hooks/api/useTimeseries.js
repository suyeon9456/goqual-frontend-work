import { useMemo } from 'react';
import { getTimeseriesKeys, getTimeseriesValues } from '../../apis/telemetry';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { timeseriesQueryKey, timeseriesValuesQueryKey } from '../../lib/queryKeyFactory';
import { TEMPERATURE_KEYS } from '../../lib/constant';
import { getFormattedTimeseriesValues } from '../../lib/utils';

const useTimeseries = ({ deviceId }) => {
  const currentTime = Date.now();
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

  const minuteTimestamps = useMemo(() => {
    const timestamps = [];
    for (let time = tenMinutesAgo; time <= currentTime; time += 60 * 1000) {
      timestamps.push(time);
    }
    return timestamps;
  }, [currentTime, tenMinutesAgo]);

  const { data: telemetryKeys } = useQuery(getTimeseriesKeyQueryOption(deviceId));

  const { data: telemetryValues } = useQuery(
    getTimeseriesValuesQueryOption({ deviceId, telemetryKeys, tenMinutesAgo, currentTime }),
  );

  return { telemetryKeys, telemetryValues, minuteTimestamps };
};

const getTimeseriesKeyQueryOption = (deviceId) =>
  queryOptions({
    queryKey: timeseriesQueryKey.detail(deviceId),
    queryFn: () => getTimeseriesKeys(deviceId),
    select: (data) => data?.filter((key) => TEMPERATURE_KEYS.includes(key)),
  });

const getTimeseriesValuesQueryOption = ({ deviceId, telemetryKeys, tenMinutesAgo, currentTime }) =>
  queryOptions({
    queryKey: timeseriesValuesQueryKey.detail(deviceId),
    queryFn: () =>
      getTimeseriesValues({
        deviceId,
        keys: telemetryKeys,
        startTs: tenMinutesAgo,
        endTs: currentTime,
      }),
    enabled: telemetryKeys != null && telemetryKeys.length > 0,
    refetchInterval: 1 * 60 * 1000,
    select: getFormattedTimeseriesValues,
  });

export default useTimeseries;
