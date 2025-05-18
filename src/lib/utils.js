export const getEarliestDataForEachMinute = (data) => {
  const minuteMap = new Map();
  data.forEach(({ value, ts }) => {
    const minutes = ts.getMinutes();
    if (!minuteMap.has(minutes) || ts < minuteMap.get(minutes).ts) {
      minuteMap.set(minutes, { value, ts });
    }
  });
  return Array.from(minuteMap.values());
};

export const getFormattedTimeseriesValues = (data) => {
  return Object.entries(data).reduce((acc, [key, values]) => {
    if (!values) return acc;

    acc[key] = getEarliestDataForEachMinute(
      values.map(({ value, ts }) => ({
        value: Number(value),
        ts: new Date(ts),
      })),
    );
    return acc;
  }, {});
};
