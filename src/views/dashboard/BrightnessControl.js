import { useState, useMemo, useCallback } from 'react';
import CIcon from '@coreui/icons-react';
import { cilSun } from '@coreui/icons';
import { CFormRange } from '@coreui/react';
import useBrightness from '../../hooks/api/useBrightness';
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
    const lightness = Math.min(brightnessPercentage, 90);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, [brightnessPercentage]);

  return (
    <div className="d-flex flex-column align-items-center">
      <CIcon
        icon={cilSun}
        customClassName="brightness-icon"
        style={{
          color: getColorByBrightness,
          transition: 'color 0.3s ease',
        }}
      />
      <div className="d-flex flex-column align-items-start w-100">
        <CFormRange
          min={BRIGHTNESS_MIN}
          max={BRIGHTNESS_MAX}
          label="밝기"
          value={brightness}
          onChange={onChangeBrightness}
        />
        <p className="text-left">{brightness}%</p>
      </div>
    </div>
  );
};

export default BrightnessDashboard;
