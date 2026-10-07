import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * WelcomeIntro — A cinematic, Awwwards-worthy page-load overlay.
 *
 * Sequence:
 *   Phase 0: Dark void with expanding Islamic geometric star
 *   Phase 1: Bismillah calligraphy draws in with golden shimmer
 *   Phase 2: Name reveal with staggered letter animation
 *   Phase 3: Tagline + "Enter" pulse
 *   Phase 4: Curtain wipe dissolve → main site
 */

interface WelcomeIntroProps {
  onComplete: () => void;
}

const WelcomeIntro = ({ onComplete }: WelcomeIntroProps) => {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number; x: number; y: number; size: number; delay: number; duration: number;
  }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);

  // Generate floating particles
  useEffect(() => {
    const pts = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
    }));
    setParticles(pts);
  }, []);

  // Geometric star canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let startTime = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const drawStar = (cx: number, cy: number, r: number, points: number, rotation: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points + rotation;
        const radius = i % 2 === 0 ? r : r * 0.4;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawOctagram = (cx: number, cy: number, r: number, rotation: number, opacity: number) => {
      // 8-point Islamic star (two rotated squares)
      for (let sq = 0; sq < 2; sq++) {
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + rotation + (sq * Math.PI) / 4;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Expanding concentric geometric rings
      for (let ring = 0; ring < 5; ring++) {
        const baseRadius = 30 + ring * 60;
        const progress = Math.min(1, elapsed / (1 + ring * 0.4));
        const radius = baseRadius * progress;
        const opacity = 0.12 - ring * 0.02;
        const rotation = elapsed * (0.15 - ring * 0.02) * (ring % 2 === 0 ? 1 : -1);

        if (ring % 2 === 0) {
          drawOctagram(cx, cy, radius, rotation, opacity * progress);
        } else {
          drawStar(cx, cy, radius, 8, rotation, opacity * progress);
        }
      }

      // Inner diamond pattern
      const diamondProgress = Math.min(1, elapsed / 1.5);
      const diamondSize = 15 * diamondProgress;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(elapsed * 0.3);
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -diamondSize);
        ctx.lineTo(diamondSize * 0.5, 0);
        ctx.lineTo(0, diamondSize);
        ctx.lineTo(-diamondSize * 0.5, 0);
        ctx.closePath();
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * diamondProgress})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      raf = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Phase progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setPhase(1), 600));   // Bismillah
    timers.push(setTimeout(() => setPhase(2), 2800));   // Name
    timers.push(setTimeout(() => setPhase(3), 4200));   // Tagline + CTA
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = useCallback(() => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 900);
  }, [onComplete]);

  // Skip on any key or click after phase 3
  useEffect(() => {
    if (phase < 3) return;

    const autoEnterTimer = setTimeout(handleEnter, 3000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(autoEnterTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase, handleEnter]);

  const nameChars = 'Shah Hussain'.split('');

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all ${
        isExiting ? 'duration-[900ms]' : 'duration-500'
      }`}
      style={{
        background: isExiting
          ? 'transparent'
          : 'radial-gradient(ellipse at 50% 40%, hsl(163, 50%, 14%) 0%, hsl(163, 50%, 8%) 60%, hsl(163, 55%, 5%) 100%)',
      }}
      onClick={phase >= 3 ? handleEnter : undefined}
      role="dialog"
      aria-label="Welcome intro"
    >
      {/* Curtain wipe overlay — splits vertically on exit */}
      <div
        className={`absolute inset-0 z-[2] flex transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, hsl(163, 50%, 14%) 0%, hsl(163, 50%, 8%) 60%, hsl(163, 55%, 5%) 100%)',
        }}
      />
      <div
        className={`absolute inset-0 z-[1] flex transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, hsl(163, 50%, 14%) 0%, hsl(163, 50%, 8%) 60%, hsl(163, 55%, 5%) 100%)',
        }}
      />

      {/* Canvas: Geometric Islamic Star Pattern */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none z-[3] transition-opacity duration-700 ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Floating golden stardust particles */}
      <div className={`absolute inset-0 pointer-events-none z-[4] transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0))`,
              animation: `introParticleFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Ambient glow orbs */}
      <div className={`absolute inset-0 pointer-events-none z-[3] transition-opacity duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(163, 60%, 20%, 0.3), transparent 70%)',
            filter: 'blur(60px)',
            animation: 'introOrbPulse 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(43, 80%, 50%, 0.15), transparent 70%)',
            filter: 'blur(50px)',
            animation: 'introOrbPulse 5s ease-in-out 1s infinite',
          }}
        />
      </div>

      {/* Main content container */}
      <div className={`relative z-[5] flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500 ${
        isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>

        {/* Phase 0 → 1: Central Islamic ornament / emblem */}
        <div className={`mb-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
            {/* Outer spinning ring */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full animate-[introStarSpin_12s_linear_infinite]"
              style={{ filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))' }}
            >
              <path
                d="M50 5 L61 39 L95 39 L68 59 L79 93 L50 73 L21 93 L32 59 L5 39 L39 39 Z"
                fill="none"
                stroke="url(#introGoldGrad)"
                strokeWidth="1.5"
                className={`transition-all duration-1500 ${phase >= 0 ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: 400,
                  strokeDashoffset: phase >= 0 ? 0 : 400,
                  transition: 'stroke-dashoffset 2s ease-out, opacity 0.5s',
                }}
              />
              <defs>
                <linearGradient id="introGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF6D6" />
                  <stop offset="35%" stopColor="#E6C875" />
                  <stop offset="65%" stopColor="#BF953F" />
                  <stop offset="100%" stopColor="#FCF6BA" />
                </linearGradient>
              </defs>
            </svg>
            {/* Inner crescent */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 delay-500 ${
              phase >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}>
              <span className="text-2xl sm:text-3xl" style={{ filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))' }}>
                ☪
              </span>
            </div>
          </div>
        </div>

        {/* Phase 1: Bismillah Calligraphy — draws in with golden glow */}
        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          {/* Filigree line top */}
          <div className={`flex items-center justify-center gap-3 mb-3 transition-all duration-700 delay-300 ${
            phase >= 1 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-secondary/60 to-secondary/80" />
            <span className="text-secondary/60 text-[10px] tracking-[0.3em] uppercase font-sans font-medium">
              ✦ Bismillah ✦
            </span>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-secondary/60 to-secondary/80" />
          </div>

          {/* Arabic Bismillah */}
          <p
            className={`font-arabic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider leading-relaxed transition-all duration-1200 delay-200 ${
              phase >= 1
                ? 'opacity-100 translate-y-0 blur-0'
                : 'opacity-0 translate-y-4 blur-sm'
            }`}
            style={{
              background: 'linear-gradient(135deg, #FFF6D6 0%, #E6C875 30%, #BF953F 55%, #FCF6BA 80%, #AA771C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: phase >= 1 ? 'drop-shadow(0 4px 25px rgba(212, 175, 55, 0.35))' : 'none',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
            dir="rtl"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {/* Translation */}
          <p className={`text-foreground/70 text-xs sm:text-sm tracking-[0.15em] mt-3 uppercase font-sans font-light transition-all duration-700 delay-700 ${
            phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Spacer */}
        <div className={`my-6 sm:my-8 transition-all duration-700 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        </div>

        {/* Phase 2: Name — staggered letter reveal */}
        <div className={`transition-all duration-700 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <p className={`text-secondary/50 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-sans mb-2 transition-all duration-500 delay-200 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            Official Marriage Biodata
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transitionDuration: '800ms',
                  transitionDelay: phase >= 2 ? `${300 + i * 60}ms` : '0ms',
                  opacity: phase >= 2 ? 1 : 0,
                  transform: phase >= 2 ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(-60deg)',
                  background: 'linear-gradient(135deg, #FFF6D6 0%, #E6C875 30%, #BF953F 55%, #FCF6BA 80%, #AA771C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: phase >= 2 ? 'drop-shadow(0 2px 15px rgba(212, 175, 55, 0.3))' : 'none',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Phase 3: Tagline + Enter */}
        <div className={`mt-8 sm:mt-10 flex flex-col items-center gap-5 transition-all duration-700 ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {/* Quranic Ayat */}
          <p className="text-secondary/60 text-[11px] sm:text-xs tracking-wider italic font-sans max-w-md">
            "And We created you in pairs" — Surah An-Naba (78:8)
          </p>

          {/* Enter Button */}
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Enter site"
          >
            {/* Background shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400/90 via-secondary to-amber-500/90 rounded-full" />
            <span className="absolute inset-0 bg-gradient-to-r from-amber-300 via-secondary to-amber-400 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
            {/* Sweep shimmer */}
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                animation: 'introShimmerSweep 2.5s ease-in-out infinite',
              }}
            />
            <span className="relative z-10 text-primary font-bold text-sm sm:text-base font-sans tracking-wide">
              View Profile
            </span>
            <span className="relative z-10 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
              <svg className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>

          {/* Subtle skip hint */}
          <p className={`text-foreground/30 text-[10px] tracking-[0.2em] uppercase font-sans transition-all duration-500 delay-500 ${
            phase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}>
            Press Enter or click anywhere
          </p>
        </div>
      </div>

      {/* Scroll-down indicator at bottom */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center transition-all duration-700 ${
        phase >= 3 && !isExiting ? 'opacity-60' : 'opacity-0'
      }`}>
        <div className="w-5 h-8 rounded-full border border-secondary/30 flex items-start justify-center p-1">
          <span className="w-1 h-2 bg-secondary/60 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Inline keyframes for intro-only animations */}
      <style>{`
        @keyframes introParticleFloat {
          0%   { transform: translateY(0) scale(1); opacity: 0.3; }
          50%  { opacity: 0.7; }
          100% { transform: translateY(-30px) scale(1.5); opacity: 0.1; }
        }
        @keyframes introOrbPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.15); opacity: 1; }
        }
        @keyframes introStarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes introShimmerSweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeIntro;
