import { getStyle } from '@coreui/utils';

export const BRIGHTNESS_MIN = 0;
export const BRIGHTNESS_MAX = 100;

export const DEVICE_ID = 'e6d8ace0-1b87-11f0-b556-e7ea660b8ad9';

export const TEMPERATURE_KEYS = ['wh40batt', 'baromrelin', 'soilad1', 'rainratein'];

export const GRAPH_COLORS = [
  `rgba(${getStyle('--cui-info-rgb')})`,
  `rgba(${getStyle('--cui-success-rgb')})`,
  `rgba(${getStyle('--cui-danger-rgb')})`,
  `rgba(${getStyle('--cui-warning-rgb')})`,
];
