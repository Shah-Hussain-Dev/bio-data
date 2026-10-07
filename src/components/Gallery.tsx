import { useState } from 'react';
import { ZoomIn, Images, Sparkles } from 'lucide-react';
import { photos, Photo } from '@/data/photos';
import SectionTitle from './SectionTitle';
import PhotoLightbox from './PhotoLightbox';
import { Parallax } from './Parallax';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openPhotoModal = (photoId: number) => {
    const idx = photos.findIndex((p) => p.id === photoId);
    setSelectedIndex(idx !== -1 ? idx : 0);
    setLightboxOpen(true);
  };

  // Create duplicated arrays to guarantee seamless infinite loop
  const row1Photos = [...photos, ...photos, ...photos];
  const row2Photos = [...[...photos].reverse(), ...[...photos].reverse(), ...[...photos].reverse()];

  const renderPhotoCard = (photo: Photo, uniqueKey: string, globalIndex: number) => (
    <div
      key={uniqueKey}
      onClick={() => openPhotoModal(photo.id)}
      className="group relative shrink-0 w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border border-secondary/25 bg-card/80 hover:border-secondary/70 transition-all duration-500 hover:shadow-[0_15px_35px_rgba(212,175,55,0.25)] hover:scale-[1.03] cursor-pointer mx-2 sm:mx-3"
    >
      {/* Photo */}
      <img
        src={photo.url}
        alt={photo.alt}
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Subtle Ambient Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-0 bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Center Zoom Icon on Hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-secondary text-primary shadow-xl shadow-secondary/40 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <ZoomIn className="w-5 h-5 font-bold" />
        </div>
      </div>

      {/* Gold Frame Outline on Hover */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-secondary/0 group-hover:border-secondary/60 transition-colors duration-300 pointer-events-none" />
    </div>
  );

  return (
    <section id="gallery" className="py-20 lg:py-28 relative bg-textured overflow-hidden">
      {/* Background Decorative Lighting with Parallax */}
      <Parallax speed={0.22} className="absolute top-1/4 -left-20 w-96 h-96 pointer-events-none">
        <div className="w-full h-full gold-glow-orb opacity-35" />
      </Parallax>
      
      <Parallax speed={-0.25} className="absolute bottom-1/4 -right-20 w-96 h-96 pointer-events-none">
        <div className="w-full h-full emerald-glow-orb opacity-40" />
      </Parallax>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle
            title="Portrait Showcase"
            subtitle="Interactive visual gallery featuring professional, traditional, and casual portraits"
            arabic="مَعْرِضُ الصُّوَر"
          />
        </div>
      </div>

      {/* Dual Marquee Arena */}
      <div className="relative w-full overflow-hidden marquee-wrapper py-2">
        {/* Left & Right Smooth Edge Fade Vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

        {/* Row 1: Scrolling Left */}
        <div className="flex mb-4 sm:mb-6 overflow-hidden">
          <div className="animate-marquee-left flex py-1">
            {row1Photos.map((photo, i) => renderPhotoCard(photo, `r1-${photo.id}-${i}`, i))}
          </div>
        </div>

        {/* Row 2: Scrolling Right (Opposite Direction) */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex py-1">
            {row2Photos.map((photo, i) => renderPhotoCard(photo, `r2-${photo.id}-${i}`, i))}
          </div>
        </div>
      </div>

      {/* Bottom Interactive Helper Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-10 sm:mt-12">
        <Parallax speed={0.06} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-card/60 border border-secondary/20 backdrop-blur-md text-center sm:text-left shadow-lg shadow-black/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center shrink-0">
                <Images className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="text-foreground font-semibold text-xs sm:text-sm font-sans">
                  Interactive Showcase
                </h4>
                <p className="text-foreground/70 text-[11px] sm:text-xs font-sans">
                  Hover to pause • Click any photo to launch HD Lightbox
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedIndex(0);
                setLightboxOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary via-amber-400 to-secondary text-primary font-bold text-xs sm:text-sm shadow-md hover:shadow-secondary/40 transition-all duration-300 hover:scale-105 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Open Slideshow</span>
            </button>
          </div>
        </Parallax>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={selectedIndex}
        onIndexChange={(idx) => setSelectedIndex(idx)}
        photoList={photos}
      />
    </section>
  );
};

export default Gallery;
