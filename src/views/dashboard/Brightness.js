import { useState, useMemo, useCallback } from 'react';
import CIcon from '@coreui/icons-react';
import { cilLightbulb } from '@coreui/icons';
import { CFormRange } from '@coreui/react';
import useBrightness from '../../hooks/useBrightness';
import { DEVICE_ID, BRIGHTNESS_MIN, BRIGHTNESS_MAX } from '../../lib/constant';

const BrightnessDashboard = () => {
  const [brightness, setBrightness] = useState(BRIGHTNESS_MIN);
  const { brightnessMutate } = useBrightness({ deviceId: DEVICE_ID });

  const onChangeBrightness = useCallback((e) => {
    setBrightness(e.target.value);
    brightnessMutate(e.target.value);
  }, []);

  const brightnessPercentage = useMemo(() => {
    return ((brightness - BRIGHTNESS_MIN) / (BRIGHTNESS_MAX - BRIGHTNESS_MIN)) * 100;
  }, [brightness]);

  const getColorByBrightness = useMemo(() => {
    const hue = 60;
    const saturation = 100;
    const lightness = brightnessPercentage;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, [brightnessPercentage]);

  return (
    <div>
      <CIcon
        icon={cilLightbulb}
        customClassName="nav-icon"
        style={{
          color: getColorByBrightness,
          transition: 'color 0.3s ease',
        }}
      />
      <CFormRange
        min={BRIGHTNESS_MIN}
        max={BRIGHTNESS_MAX}
        label="밝기"
        value={brightness}
        onChange={onChangeBrightness}
      />
      <p>{brightness}%</p>
    </div>
  );
};

export default BrightnessDashboard;
