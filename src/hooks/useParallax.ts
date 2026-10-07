import { useEffect, useState, useRef, useCallback } from 'react';
import { useLenis } from 'lenis/react';

/**
 * useScrollY - Lightweight hook for tracking window scroll, synced with Lenis
 */
export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  useLenis((lenis) => {
    setScrollY(lenis.scroll);
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setScrollY(window.scrollY);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

/**
 * useElementParallax - Calculates relative parallax offset synchronized with Lenis smooth scroll
 * @param speed - Parallax speed multiplier (-1 to 1). Positive floats upward, negative floats downward.
 */
export const useElementParallax = (speed: number = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  const calculateOffset = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if element is near viewport
    if (rect.top < windowHeight + 150 && rect.bottom > -150) {
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      setOffsetY(distanceFromCenter * speed);
    }
  }, [speed]);

  // Sync directly with Lenis animation loop
  useLenis(() => {
    calculateOffset();
  });

  useEffect(() => {
    calculateOffset();
    window.addEventListener('resize', calculateOffset, { passive: true });
    return () => window.removeEventListener('resize', calculateOffset);
  }, [calculateOffset]);

  return { ref, offsetY };
};
