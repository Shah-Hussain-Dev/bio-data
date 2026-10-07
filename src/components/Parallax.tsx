import React, { ReactNode } from 'react';
import { useElementParallax } from '@/hooks/useParallax';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // e.g. -0.2 (moves downward), 0.15 (moves upward with scroll)
  className?: string;
  style?: React.CSSProperties;
  scale?: boolean;
  rotate?: boolean;
}

export const Parallax = ({
  children,
  speed = 0.15,
  className = '',
  style = {},
  scale = false,
  rotate = false,
}: ParallaxProps) => {
  const { ref, offsetY } = useElementParallax(speed);

  const scaleValue = scale ? Math.max(0.92, Math.min(1.08, 1 + offsetY * 0.0003)) : 1;
  const rotateValue = rotate ? offsetY * 0.03 : 0;

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: `translate3d(0, ${offsetY.toFixed(2)}px, 0) scale(${scaleValue.toFixed(4)}) rotate(${rotateValue.toFixed(2)}deg)`,
        transition: 'transform 0.08s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Parallax;
