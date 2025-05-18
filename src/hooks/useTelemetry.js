import { getTelemetryKeys, getTelemetryValues } from '../apis/telemetry';
import { useQuery } from '@tanstack/react-query';
import { telemetryKeysQueryKey, telemetryValuesQueryKey } from '../lib/queryKeyFactory';
import { useMemo } from 'react';

const TEMPERATURE_KEYS = ['wh40batt', 'baromrelin', 'soilad1', 'rainratein'];

const useTelemetry = ({ deviceId }) => {
  const currentTime = Date.now();
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

  // 1분 단위 타임스탬프 배열 생성
  const minuteTimestamps = useMemo(() => {
    const timestamps = [];
    for (let time = tenMinutesAgo; time <= currentTime; time += 60 * 1000) {
      timestamps.push(time);
    }
    return timestamps;
  }, [currentTime, tenMinutesAgo]);

  const { data: telemetryKeys } = useQuery({
    queryKey: telemetryKeysQueryKey.detail(deviceId),
    queryFn: () => getTelemetryKeys(deviceId),
    select: (data) => data?.filter((key) => TEMPERATURE_KEYS.includes(key)),
  });

  const { data: telemetryValues } = useQuery({
    queryKey: telemetryValuesQueryKey.detail(deviceId),
    queryFn: () =>
      getTelemetryValues({
        deviceId,
        keys: telemetryKeys,
        startTs: tenMinutesAgo,
        endTs: currentTime,
      }),
    enabled: telemetryKeys != null && telemetryKeys.length > 0,
    refetchInterval: 1 * 60 * 1000,
    select: (data) => {
      const { wh40batt, baromrelin, soilad1, rainratein } = data;
      return {
        wh40batt: wh40batt.map(({ value, ts }) => ({ value: Number(value), ts: new Date(ts) })),
        baromrelin: baromrelin.map(({ value, ts }) => ({ value: Number(value), ts: new Date(ts) })),
        soilad1: soilad1.map(({ value, ts }) => ({ value: Number(value), ts: new Date(ts) })),
        rainratein: rainratein.map(({ value, ts }) => ({ value: Number(value), ts: new Date(ts) })),
      };
    },
  });

  return { telemetryKeys, telemetryValues, minuteTimestamps };
};

export default useTelemetry;
