import { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { photos as defaultPhotos, Photo } from '@/data/photos';

interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onIndexChange?: (index: number) => void;
  photoList?: Photo[];
}

export const PhotoLightbox = ({
  isOpen,
  onClose,
  currentIndex,
  onIndexChange,
  photoList = defaultPhotos,
}: PhotoLightboxProps) => {
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setInternalIndex(currentIndex);
    setFadeState('in');
  }, [currentIndex, isOpen]);

  const activeIndex = internalIndex;
  const currentPhoto = photoList[activeIndex] || photoList[0];

  const changePhoto = useCallback(
    (newIndex: number) => {
      setFadeState('out');
      setTimeout(() => {
        const target = (newIndex + photoList.length) % photoList.length;
        setInternalIndex(target);
        onIndexChange?.(target);
        setFadeState('in');
      }, 150);
    },
    [photoList.length, onIndexChange]
  );

  const handleNext = useCallback(() => {
    changePhoto(activeIndex + 1);
  }, [activeIndex, changePhoto]);

  const handlePrev = useCallback(() => {
    changePhoto(activeIndex - 1);
  }, [activeIndex, changePhoto]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation & body overflow lock
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentPhoto) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/90 backdrop-blur-2xl animate-fade-in select-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Ambient Color Aura based on current photo */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-25 transition-all duration-700 blur-3xl scale-125"
        style={{
          backgroundImage: `url(${currentPhoto.urlHD})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/90 pointer-events-none" />

      {/* Header Bar */}
      <div
        className="relative z-30 flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-6 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="text-secondary text-xs sm:text-sm font-semibold tracking-wider">
              {activeIndex + 1} <span className="text-secondary/50">/ {photoList.length}</span>
            </span>
          </div>
          {currentPhoto.category && (
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-white/10 text-white/80 text-xs font-medium backdrop-blur-sm">
              {currentPhoto.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Image Viewport */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-16 py-2 overflow-hidden">
        {/* Navigation Arrow: Previous */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2 sm:left-6 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-secondary text-white hover:text-primary backdrop-blur-md border border-white/15 hover:border-secondary flex items-center justify-center transition-all duration-300 shadow-xl group hover:scale-110 active:scale-95"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Photo Container */}
        <div
          className="relative max-w-full max-h-[62vh] sm:max-h-[70vh] md:max-h-[74vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentPhoto.urlHD}
            alt={currentPhoto.alt}
            className={`max-w-full max-h-[62vh] sm:max-h-[70vh] md:max-h-[74vh] object-contain rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-secondary/30 transition-all duration-300 ${fadeState === 'in' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          />
        </div>

        {/* Navigation Arrow: Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 sm:right-6 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-secondary text-white hover:text-primary backdrop-blur-md border border-white/15 hover:border-secondary flex items-center justify-center transition-all duration-300 shadow-xl group hover:scale-110 active:scale-95"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Footer Info & Interactive Thumbnail Strip */}
      <div
        className="relative z-30 pb-4 sm:pb-6 pt-2 px-4 sm:px-8 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >


        {/* Thumbnail Filmstrip */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 max-w-full overflow-x-auto py-1 px-2 scrollbar-hide">
          {photoList.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => changePhoto(idx)}
              className={`relative shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all duration-300 ${idx === activeIndex
                ? 'ring-2 ring-secondary ring-offset-2 ring-offset-black scale-110 shadow-lg shadow-secondary/40'
                : 'opacity-40 hover:opacity-90 scale-95 hover:scale-100 border border-white/10'
                }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <img src={p.url} alt={p.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PhotoLightbox;
