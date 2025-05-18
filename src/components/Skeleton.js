import { CPlaceholder } from '@coreui/react';

const Skeleton = ({ level = 2, style }) => {
  return (
    <div style={style}>
      {Array.from({ length: level }).map((_, index) => (
        <CPlaceholder as="p" animation="glow" key={index}>
          <CPlaceholder xs={12} />
        </CPlaceholder>
      ))}
    </div>
  );
};

export default Skeleton;
