import { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from 'lucide-react';
import { photos } from '@/data/photos';
import PhotoLightbox from './PhotoLightbox';

export interface PhotoCarouselHandle {
  open: (index?: number) => void;
}

const PhotoCarousel = forwardRef<PhotoCarouselHandle>((_, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    open: (idx = currentIndex) => openLightbox(idx),
  }));

  const goToNext = useCallback(() => {
    setFadeState('out');
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      setFadeState('in');
    }, 200);
  }, []);

  const goToPrev = useCallback(() => {
    setFadeState('out');
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      setFadeState('in');
    }, 200);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setFadeState('out');
      setProgress(0);
      setTimeout(() => {
        setCurrentIndex(index);
        setFadeState('in');
      }, 200);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) goToNext();
    else if (diff < -40) goToPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Smooth auto-slide timer with progress bar (5s duration)
  useEffect(() => {
    if (isPaused || isLightboxOpen) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const intervalTime = 5000;
    const stepTime = 50;
    const stepIncrement = (stepTime / intervalTime) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, stepTime);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPaused, isLightboxOpen, goToNext]);

  const activePhoto = photos[currentIndex];
  const nextPhoto = photos[(currentIndex + 1) % photos.length];
  const prevPhoto = photos[(currentIndex - 1 + photos.length) % photos.length];

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Layered Perspective Frame Container */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[380px] sm:max-h-[440px] lg:max-h-[480px]">
        
        {/* Background Depth Card (Layer -2) */}
        <div 
          className="absolute inset-0 translate-y-2.5 scale-[0.93] rounded-[1.8rem] sm:rounded-[2.2rem] bg-card/40 border border-secondary/10 opacity-30 pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `url(${prevPhoto.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(2px)',
          }}
        />

        {/* Midground Depth Card (Layer -1) */}
        <div 
          className="absolute inset-0 translate-y-1.5 scale-[0.97] rounded-[1.8rem] sm:rounded-[2.2rem] bg-card/60 border border-secondary/20 opacity-60 pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `url(${nextPhoto.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4) blur(1px)',
          }}
        />

        {/* Primary Foreground Active Card */}
        <div 
          onClick={() => openLightbox(currentIndex)}
          className="relative w-full h-full rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden group cursor-pointer bg-card border-2 border-secondary/40 hover:border-secondary/80 shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)]"
        >
          {/* Main Active Image */}
          <img
            src={activePhoto.url}
            alt={activePhoto.alt}
            className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 ${
              fadeState === 'in' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />

          {/* Ambient Lighting Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[0.5px] pointer-events-none" />

          {/* Top Auto-Advance Progress Timer Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/40 z-30">
            <div
              className="h-full bg-gradient-to-r from-secondary via-amber-300 to-secondary transition-all duration-75 ease-linear shadow-[0_0_10px_hsl(43,80%,55%)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Top Left Minimal Counter Badge */}
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-[10px] sm:text-xs font-medium font-sans">
            <span>{currentIndex + 1}</span>
            <span className="text-white/40 mx-0.5">/</span>
            <span className="text-white/60">{photos.length}</span>
          </div>

          {/* Top Right Quick Expand Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(currentIndex);
            }}
            className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-secondary text-white hover:text-primary backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-md"
            aria-label="Enlarge image"
            title="Expand photo to fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Left / Right Inset Floating Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-secondary text-white hover:text-primary backdrop-blur-md border border-white/15 hover:border-secondary flex items-center justify-center transition-all duration-300 shadow-md opacity-70 group-hover:opacity-100 hover:scale-110 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-secondary text-white hover:text-primary backdrop-blur-md border border-white/15 hover:border-secondary flex items-center justify-center transition-all duration-300 shadow-md opacity-70 group-hover:opacity-100 hover:scale-110 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Bottom Minimal Indicator Dots (Clean & Simple, No Thumbnails) */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            {photos.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-5 bg-gradient-to-r from-secondary to-amber-300 shadow-[0_0_6px_rgba(212,175,55,0.8)]'
                      : 'w-1.5 bg-white/35 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>

          {/* Center Zoom Indicator on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-secondary/90 text-primary shadow-xl shadow-secondary/40 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm">
              <ZoomIn className="w-5 h-5 font-bold" />
            </div>
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        photoList={photos}
      />
    </div>
  );
});

PhotoCarousel.displayName = 'PhotoCarousel';

export default PhotoCarousel;
