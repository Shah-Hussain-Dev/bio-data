import { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import {
  Images,
  Sparkles,
  Download,
  Briefcase,
  GraduationCap,
  MapPin,
  Heart,
  ArrowUpRight,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import PhotoCarousel, { PhotoCarouselHandle } from './PhotoCarousel';
import { Button } from './ui/button';
import { Parallax } from './Parallax';

const HeroSection = () => {
  const lenis = useLenis();
  const bismillahText = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
  const [revealProgress, setRevealProgress] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const carouselRef = useRef<PhotoCarouselHandle>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background floating golden stardust particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
      increasing: Math.random() > 0.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.increasing) {
          p.opacity += p.pulse;
          if (p.opacity >= 0.8) p.increasing = false;
        } else {
          p.opacity -= p.pulse;
          if (p.opacity <= 0.15) p.increasing = true;
        }

        // Wrap around edges
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 200, 117, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calligraphy progressive typewriter reveal
  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const revealDuration = 2800;
    const pauseDuration = 3600;
    const hideDuration = 1800;
    const restartPause = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (isRevealing) {
        const progress = Math.min(elapsed / revealDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setRevealProgress(eased * 100);

        if (progress >= 1) {
          setShowTranslation(true);
          setTimeout(() => {
            setIsRevealing(false);
            startTime = 0;
            animationFrame = requestAnimationFrame(animate);
          }, pauseDuration);
          return;
        }
      } else {
        const progress = Math.min(elapsed / hideDuration, 1);
        const eased = Math.pow(progress, 2);
        setRevealProgress(100 - eased * 100);

        if (progress >= 1) {
          setShowTranslation(false);
          setTimeout(() => {
            setIsRevealing(true);
            startTime = 0;
            animationFrame = requestAnimationFrame(animate);
          }, restartPause);
          return;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isRevealing]);

  const scrollToAbout = () => {
    if (lenis) {
      lenis.scrollTo('#about', { offset: -60, duration: 1.2 });
    } else {
      const element = document.querySelector('#about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] bg-textured overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-28 pb-10 sm:pb-14 lg:pb-20">
      {/* 1. Ambient Lighting & Canvas Particle Atmosphere with Parallax */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1] opacity-75"
      />
      <div className="absolute inset-0 bg-noise pointer-events-none z-[2]" />
      <div className="absolute inset-0 islamic-pattern opacity-20 pointer-events-none z-[2]" />

      {/* Radiant Glowing Parallax Orbs */}
      <Parallax speed={0.25} className="absolute -top-32 -left-32 w-[550px] h-[550px] pointer-events-none z-[1]">
        <div className="w-full h-full emerald-glow-orb" />
      </Parallax>
      
      <Parallax speed={-0.3} className="absolute top-1/3 -right-36 w-[600px] h-[600px] pointer-events-none z-[1]">
        <div className="w-full h-full gold-glow-orb" />
      </Parallax>
      
      <Parallax speed={0.18} className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] pointer-events-none z-[1]">
        <div className="w-full h-full emerald-glow-orb" />
      </Parallax>

      {/* Rotating 8-Point Islamic Star Watermark with Parallax Rotation */}
      <Parallax speed={-0.12} rotate={true} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-[0.04] z-[2]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary fill-current animate-spin-slow">
          <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
          <path d="M50 7 L58 35 L86 35 L63 52 L72 80 L50 63 L28 80 L37 52 L14 35 L42 35 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </Parallax>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-1 sm:my-3 lg:my-auto">

        {/* 2. Top Majestic Calligraphy Header with Parallax Drift */}
        <Parallax speed={0.12} className="text-center pt-1 sm:pt-2 pb-3 sm:pb-6 lg:pb-10 animate-fade-in">
          {/* Eyebrow Filigree Line */}
          <div className="inline-flex items-center gap-3 sm:gap-4 mb-1.5 sm:mb-3">
            <div className="w-10 sm:w-20 h-px bg-gradient-to-r from-transparent via-secondary/70 to-secondary" />
            <span className="text-secondary/80 text-[11px] sm:text-xs md:text-sm tracking-[0.25em] uppercase font-sans font-medium">
              ✦ بِسْمِ اللَّهِ ✦
            </span>
            <div className="w-10 sm:w-20 h-px bg-gradient-to-l from-transparent via-secondary/70 to-secondary" />
          </div>

          {/* Animated Bismillah Arabic Script */}
          <div className="relative min-h-[2.5rem] sm:min-h-[3.5rem] md:min-h-[4.5rem] flex items-center justify-center overflow-hidden" dir="rtl">
            <p
              className="font-arabic text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-luxury font-bold tracking-wider leading-relaxed whitespace-nowrap drop-shadow-[0_4px_20px_rgba(212,175,55,0.35)]"
              style={{
                clipPath: `inset(0 0 0 ${100 - revealProgress}%)`,
                transition: 'clip-path 0.08s ease-out',
              }}
            >
              {bismillahText}
            </p>
            {/* Glowing Golden Cursor */}
            <span
              className="absolute h-8 sm:h-12 md:h-14 w-0.5 sm:w-1 bg-gradient-to-b from-amber-300 via-secondary to-amber-500 rounded-full shadow-[0_0_15px_3px_hsl(43,90%,55%)] animate-pulse"
              style={{
                left: `${50 - revealProgress / 2}%`,
                opacity: revealProgress > 0 && revealProgress < 100 ? 1 : 0,
                transition: 'opacity 0.25s ease',
              }}
            />
          </div>

          {/* Translation & Quranic Ayat */}
          <div className={`transition-all duration-700 mt-1 sm:mt-2 flex flex-col items-center justify-center gap-0.5 sm:gap-1 ${showTranslation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
            <p className="text-foreground/80 text-[11px] sm:text-xs md:text-sm tracking-[0.16em] uppercase font-medium font-sans">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
            <p className="text-secondary/80 text-[10px] sm:text-[11px] md:text-xs tracking-wider italic font-sans">
              “And We created you in pairs” — Surah An-Naba (78:8)
            </p>
          </div>
        </Parallax>

        {/* 3. Main Hero Content Layout: Balanced 12-Column Spatial Architecture */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left Column (col-span-7): Bio Info, Ethos Quote, Highlights & CTA Island */}
          <div className="lg:col-span-7 text-center lg:text-left animate-fade-in order-2 lg:order-1">

            {/* Status Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm shadow-secondary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-secondary text-xs sm:text-sm tracking-[0.15em] uppercase font-semibold font-sans">
                Official Marital Biodata
              </span>
              <span className="text-secondary/40 text-xs">•</span>
              <span className="text-foreground/85 text-xs sm:text-sm font-medium font-sans">Lucknow, UP</span>
            </div>

            {/* Main Name & Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gold-luxury mb-3 sm:mb-4 leading-[1.1]">
              Shah Hussain
            </h1>

            {/* Role & Key Accolade Tag Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 mb-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card/90 border border-secondary/30 text-secondary text-xs sm:text-sm font-medium shadow-inner font-sans">
                <Briefcase className="w-3.5 h-3.5 text-secondary" />
                Software Engineer
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card/90 border border-secondary/30 text-foreground/90 text-xs sm:text-sm font-medium shadow-inner font-sans">
                <GraduationCap className="w-3.5 h-3.5 text-secondary" />
                MCA & AIR-1 IBM Diploma
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-medium font-sans">
                <MapPin className="w-3.5 h-3.5 text-secondary" />
                Lucknow Native
              </span>
            </div>

            {/* Narrative Ethos Quote Box */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-card/95 via-card/70 to-transparent border border-secondary/25 backdrop-blur-md mb-6 sm:mb-7 shadow-lg shadow-black/20 text-left">
              <div className="flex items-start gap-3">
                <span className="text-secondary text-2xl sm:text-3xl font-sans font-bold leading-none select-none">“</span>
                <p className="text-foreground/90 text-xs sm:text-sm md:text-base leading-relaxed italic font-sans font-normal">
                  Seeking a pious, educated, and kind-hearted life partner to build a home rooted in
                  Islamic values, mutual respect, peaceful companionship, and shared dreams for the Dunya and Akhirah.
                </p>
              </div>
            </div>

            {/* 4-Item Quick-Highlight Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-7 sm:mb-8">
              {/* Stat 1: Profession */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-card/70 border border-secondary/20 backdrop-blur-sm hover:border-secondary/40 transition-all duration-300 group hover:-translate-y-0.5">
                <div className="flex items-center gap-2 text-secondary/80 text-[11px] uppercase tracking-wider mb-1 font-medium font-sans">
                  <Briefcase className="w-3.5 h-3.5 text-secondary group-hover:scale-110 transition-transform" />
                  Profession
                </div>
                <div className="text-foreground font-semibold text-xs sm:text-sm truncate font-sans">
                  Software Eng.
                </div>
              </div>

              {/* Stat 2: Physical & Age */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-card/70 border border-secondary/20 backdrop-blur-sm hover:border-secondary/40 transition-all duration-300 group hover:-translate-y-0.5">
                <div className="flex items-center gap-2 text-secondary/80 text-[11px] uppercase tracking-wider mb-1 font-medium font-sans">
                  <Calendar className="w-3.5 h-3.5 text-secondary group-hover:scale-110 transition-transform" />
                  Age & Height
                </div>
                <div className="text-foreground font-semibold text-xs sm:text-sm font-sans">
                  28 Yrs • 5'4"
                </div>
              </div>

              {/* Stat 3: Education */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-card/70 border border-secondary/20 backdrop-blur-sm hover:border-secondary/40 transition-all duration-300 group hover:-translate-y-0.5">
                <div className="flex items-center gap-2 text-secondary/80 text-[11px] uppercase tracking-wider mb-1 font-medium font-sans">
                  <GraduationCap className="w-3.5 h-3.5 text-secondary group-hover:scale-110 transition-transform" />
                  Academics
                </div>
                <div className="text-foreground font-semibold text-xs sm:text-sm truncate font-sans">
                  Masters (MCA)
                </div>
              </div>

              {/* Stat 4: Faith & Values */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-card/70 border border-secondary/20 backdrop-blur-sm hover:border-secondary/40 transition-all duration-300 group hover:-translate-y-0.5">
                <div className="flex items-center gap-2 text-secondary/80 text-[11px] uppercase tracking-wider mb-1 font-medium font-sans">
                  <Heart className="w-3.5 h-3.5 text-secondary group-hover:scale-110 transition-transform" />
                  Values
                </div>
                <div className="text-foreground font-semibold text-xs sm:text-sm truncate font-sans">
                  Deen & Family
                </div>
              </div>
            </div>

            {/* 4. Action Island: CTA Button Architecture */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Primary Action Button */}
              <button
                onClick={scrollToAbout}
                className="island-btn group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-4 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-secondary to-amber-500 text-primary font-semibold text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(212,175,55,0.6)] transition-all duration-500 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="relative z-10 font-bold font-sans">Explore Full Profile</span>
                <span className="relative z-10 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover:rotate-45" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-300 via-secondary to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Tertiary Action: Download Biodata PDF */}
              <a
                href="/bio-data.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-secondary/10 hover:bg-secondary/20 border border-secondary/25 text-foreground/90 text-xs sm:text-sm font-medium transition-all duration-300 hover:text-secondary font-sans"
                title="Download Official Biodata PDF"
              >
                <Download className="w-4 h-4 text-secondary" />
                <span>Biodata PDF</span>
              </a>
            </div>

          </div>

          {/* Right Column (col-span-5): 3D Layered Portrait Stage & Showcase with Parallax */}
          <Parallax speed={-0.08} className="lg:col-span-5 flex justify-center animate-fade-in order-1 lg:order-2 mb-2 lg:mb-0">
            <div className="relative w-full max-w-[320px] sm:max-w-[370px] md:max-w-[410px]">

              {/* Outer Ambient Aura Mesh with Counter Parallax */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-secondary/30 via-emerald-600/20 to-amber-400/30 rounded-[3.5rem] blur-3xl opacity-60 pointer-events-none" />

              {/* Floating Top-Left Micro-Chip: Verified Profile */}
              <Parallax speed={0.18} className="absolute -top-3.5 -left-2 sm:-top-4 sm:-left-3 z-30 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/95 border border-emerald-400/50 text-emerald-300 text-xs font-semibold shadow-xl backdrop-blur-md animate-float">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Biodata</span>
                </div>
              </Parallax>

              {/* Floating Top-Right Micro-Chip: Profession */}
              <Parallax speed={-0.15} className="absolute -top-3.5 -right-2 sm:-top-4 sm:-right-3 z-30 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/95 border border-secondary/50 text-secondary text-xs font-semibold shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '1.5s' }}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Software Eng.</span>
                </div>
              </Parallax>

              {/* Doppelrand Luxury Outer Hardware Frame */}
              <div className="double-bezel-shell relative p-2.5 sm:p-3 rounded-[2.8rem] shadow-[0_25px_60px_rgba(0,0,0,0.6)]">

                {/* Traditional Intricate Brass Corner Accents */}
                <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-secondary/70 rounded-tl-xl pointer-events-none z-20" />
                <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-secondary/70 rounded-tr-xl pointer-events-none z-20" />
                <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-secondary/70 rounded-bl-xl pointer-events-none z-20" />
                <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-secondary/70 rounded-br-xl pointer-events-none z-20" />

                {/* Inner Vessel: Interactive Layered Photo Carousel */}
                <div className="relative overflow-hidden rounded-[calc(2.8rem-0.75rem)] bg-card/90">
                  <PhotoCarousel ref={carouselRef} />
                </div>
              </div>

              {/* Floating Bottom Center Action Pill: View Full Gallery / Modal */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 w-auto whitespace-nowrap">
                <Button
                  onClick={() => carouselRef.current?.open(0)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary via-amber-400 to-amber-500 text-primary font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105"
                >
                  <Images className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>View Full Gallery</span>
                </Button>
                <button
                  onClick={() => {
                    if (lenis) {
                      lenis.scrollTo('#gallery', { offset: -60, duration: 1.2 });
                    } else {
                      document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-card/90 hover:bg-secondary/20 border border-secondary/40 text-secondary text-xs font-semibold backdrop-blur-md transition-all shadow-md hover:scale-105 cursor-pointer"
                  title="Browse Photo Showcase Marquee"
                >
                  <span>Showcase</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
                </button>
              </div>

            </div>
          </Parallax>

        </div>

      </div>

      {/* 5. Sleek Luxury Scroll Down Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 sm:pt-10">
        <button
          onClick={scrollToAbout}
          className="group flex flex-col items-center gap-1.5 text-secondary/60 hover:text-secondary transition-all duration-300 focus:outline-none"
          aria-label="Scroll to profile details"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-secondary/70 group-hover:text-secondary transition-colors font-sans">
            Scroll To Explore
          </span>
          <div className="w-5 h-8 rounded-full border border-secondary/30 flex items-start justify-center p-1 group-hover:border-secondary transition-colors">
            <span className="w-1 h-2 bg-secondary rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
