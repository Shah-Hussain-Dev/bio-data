import { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Sparkles, Maximize2 } from 'lucide-react';
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
    open: (idx = currentIndex) => openLightbox(idx)
  }));

  const goToNext = useCallback(() => {
    setFadeState('out');
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      setFadeState('in');
    }, 220);
  }, []);

  const goToPrev = useCallback(() => {
    setFadeState('out');
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      setFadeState('in');
    }, 220);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setFadeState('out');
      setProgress(0);
      setTimeout(() => {
        setCurrentIndex(index);
        setFadeState('in');
      }, 220);
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

  // Smooth auto-slide timer with progress bar
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
      <div className="relative w-full aspect-[3/4] max-h-[460px] sm:max-h-[500px]">
        
        {/* Background Depth Card (Layer -2) */}
        <div 
          className="absolute inset-0 translate-y-3 scale-[0.92] rounded-[2rem] bg-card/40 border border-secondary/10 blur-[1px] opacity-40 pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `url(${prevPhoto.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(2px)',
          }}
        />

        {/* Midground Depth Card (Layer -1) */}
        <div 
          className="absolute inset-0 translate-y-1.5 scale-[0.96] rounded-[2rem] bg-card/60 border border-secondary/20 opacity-70 pointer-events-none transition-all duration-700"
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
          className="relative w-full h-full rounded-[2rem] overflow-hidden group cursor-pointer bg-card border-2 border-secondary/40 hover:border-secondary/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(212,175,55,0.25)]"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[0.5px] pointer-events-none" />

          {/* Top Auto-Advance Progress Timer Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/40 z-30">
            <div
              className="h-full bg-gradient-to-r from-secondary via-amber-300 to-secondary transition-all duration-75 ease-linear shadow-[0_0_10px_hsl(43,80%,55%)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Top Right Quick Expand Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(currentIndex);
            }}
            className="absolute top-3.5 right-3.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-secondary text-white hover:text-primary backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg opacity-80 hover:opacity-100"
            aria-label="Enlarge image"
            title="Expand photo to fullscreen"
          >
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Left / Right Inset Floating Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-secondary text-white hover:text-primary backdrop-blur-md border border-white/15 hover:border-secondary flex items-center justify-center transition-all duration-300 shadow-md opacity-80 hover:opacity-100 hover:scale-110"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-secondary text-white hover:text-primary backdrop-blur-md border border-white/15 hover:border-secondary flex items-center justify-center transition-all duration-300 shadow-md opacity-80 hover:opacity-100 hover:scale-110"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Center Zoom Indicator on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-secondary/90 text-primary shadow-xl shadow-secondary/40 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm">
              <ZoomIn className="w-5 h-5 font-bold" />
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Micro Thumbnail Filmstrip */}
      <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 pt-4 pb-1 px-1 overflow-x-auto scrollbar-hide">
        {photos.map((photo, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={photo.id}
              onClick={() => goToSlide(index)}
              className={`relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden transition-all duration-300 ${
                isActive
                  ? 'ring-2 ring-secondary ring-offset-2 ring-offset-background scale-110 shadow-lg shadow-secondary/40 z-10'
                  : 'opacity-40 hover:opacity-90 border border-white/10 scale-95 hover:scale-100'
              }`}
              aria-label={`Switch to photo ${index + 1}`}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
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
