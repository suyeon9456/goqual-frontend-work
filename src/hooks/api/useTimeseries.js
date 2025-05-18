import { getTimeseriesKeys, getTimeseriesValues } from '../../apis/telemetry';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { timeseriesQueryKey, timeseriesValuesQueryKey } from '../../lib/queryKeyFactory';
import { TEMPERATURE_KEYS } from '../../lib/constant';
import { getFormattedTimeseriesValues } from '../../lib/utils';

const useTimeseries = ({ deviceId }) => {
  const currentTime = Date.now();
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

  const { data: telemetryKeys } = useSuspenseQuery(getTimeseriesKeyQueryOption(deviceId));

  const { data: telemetryValues } = useSuspenseQuery(
    getTimeseriesValuesQueryOption({ deviceId, telemetryKeys, tenMinutesAgo, currentTime }),
  );

  return { telemetryKeys, telemetryValues };
};

const getTimeseriesKeyQueryOption = (deviceId) =>
  queryOptions({
    queryKey: timeseriesQueryKey.detail(deviceId),
    queryFn: () => getTimeseriesKeys(deviceId),
    select: (data) => data?.filter((key) => TEMPERATURE_KEYS.includes(key)),
    enabled: !!deviceId,
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
