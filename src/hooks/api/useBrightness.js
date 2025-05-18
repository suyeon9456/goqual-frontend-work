import { useMutation } from '@tanstack/react-query';
import { setDeviceBrightness } from '../../apis/telemetry';

const useBrightness = ({ deviceId }) => {
  const { mutateAsync } = useMutation({
    mutationFn: (brightnessValue) => setDeviceBrightness({ deviceId, brightnessValue }),
  });

  return { brightnessMutate: mutateAsync };
};

export default useBrightness;
