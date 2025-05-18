import { getTimeseriesKeys, getTimeseriesValues } from '../../apis/telemetry';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { timeseriesQueryKey, timeseriesValuesQueryKey } from '../../lib/queryKeyFactory';
import { TEMPERATURE_KEYS } from '../../lib/constant';
import { getFormattedTimeseriesValues } from '../../lib/utils';

const useTimeseries = ({ deviceId }) => {
  const currentTime = Date.now();
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

  const { data: timeseriesKeys } = useSuspenseQuery(getTimeseriesKeyQueryOption(deviceId));

  const { data: timeseriesValues } = useSuspenseQuery(
    getTimeseriesValuesQueryOption({ deviceId, timeseriesKeys, tenMinutesAgo, currentTime }),
  );

  return { timeseriesKeys, timeseriesValues };
};

const getTimeseriesKeyQueryOption = (deviceId) =>
  queryOptions({
    queryKey: timeseriesQueryKey.detail(deviceId),
    queryFn: () => getTimeseriesKeys(deviceId),
    select: (data) => data?.filter((key) => TEMPERATURE_KEYS.includes(key)),
    enabled: !!deviceId,
  });

const getTimeseriesValuesQueryOption = ({ deviceId, timeseriesKeys, tenMinutesAgo, currentTime }) =>
  queryOptions({
    queryKey: timeseriesValuesQueryKey.detail(deviceId),
    queryFn: () =>
      getTimeseriesValues({
        deviceId,
        keys: timeseriesKeys,
        startTs: tenMinutesAgo,
        endTs: currentTime,
      }),
    enabled: timeseriesKeys != null && timeseriesKeys.length > 0,
    refetchInterval: 1 * 60 * 1000,
    select: getFormattedTimeseriesValues,
  });

export default useTimeseries;
