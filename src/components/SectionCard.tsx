import { ReactNode, useEffect, useRef, useState } from 'react';
import { useElementParallax } from '@/hooks/useParallax';

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  speed?: number;
}

const SectionCard = ({ children, className = '', delay = 0, speed = 0.06 }: SectionCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: parallaxRef, offsetY } = useElementParallax(speed);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div
        ref={parallaxRef}
        className={`relative bg-background/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 card-hover border border-secondary/20 shadow-xl shadow-black/20 will-change-transform ${className}`}
        style={{
          transform: `translate3d(0, ${offsetY.toFixed(2)}px, 0)`,
          transition: 'transform 0.08s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Gold Corner Frames */}
        <div className="absolute top-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-l-2 border-secondary/70 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-r-2 border-secondary/70 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-l-2 border-secondary/70 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-r-2 border-secondary/70 rounded-br-xl pointer-events-none" />
        
        {/* Ornate Corner Symbols */}
        <span className="absolute top-2 sm:top-3 left-2 sm:left-3 text-secondary/60 text-sm sm:text-lg select-none hidden xs:block">❧</span>
        <span className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-secondary/60 text-sm sm:text-lg rotate-180 select-none hidden xs:block">❧</span>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
