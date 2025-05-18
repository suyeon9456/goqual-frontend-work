import React, { useEffect, useRef, useMemo } from 'react';

import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import useTelemetry from '../../hooks/useTelemetry';
import { DEVICE_ID } from '../../lib/constant';

const GRAPH_COLORS = [
  `rgba(${getStyle('--cui-info-rgb')})`,
  `rgba(${getStyle('--cui-success-rgb')})`,
  `rgba(${getStyle('--cui-danger-rgb')})`,
  `rgba(${getStyle('--cui-warning-rgb')})`,
];

const MainChart = () => {
  const {
    telemetryKeys,
    telemetryValues: values,
    minuteTimestamps: labels,
  } = useTelemetry({
    deviceId: DEVICE_ID,
  });
  const chartRef = useRef(null);

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  const max = useMemo(() => {
    if (values == null) return 100;
    const maxValues = Object.values(values).map((value) => Math.max(...value.map((t) => t.value)));
    return Math.max(...maxValues);
  }, [values]);

  const labelsTest = useMemo(() => {
    if (labels == null) return [];
    return labels?.map((label) => {
      const date = new Date(label);
      return date.getHours() + ':' + date.getMinutes();
    });
    return [];
  }, [labels]);

  const datasets = useMemo(() => {
    if (values == null) return [];
    return telemetryKeys?.map((label, index) => {
      return {
        label,
        values: values?.[label] ?? [],
        borderWidth: 2,
        borderColor: GRAPH_COLORS[index] ?? getStyle('--cui-info'),
        backgroundColor: 'transparent',
        pointHoverBackgroundColor: GRAPH_COLORS[index] ?? getStyle('--cui-info'),
        data: values?.[label]?.map((t) => t.value) ?? [],
        fill: true,
      };
    });
  }, [values, telemetryKeys]);

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: labelsTest ?? [],
          datasets: datasets ?? [],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 4,
                stepSize: Math.ceil(max / 4),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  );
};

export default MainChart;
