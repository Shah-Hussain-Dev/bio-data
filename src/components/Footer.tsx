import { Heart } from 'lucide-react';
import { Parallax } from './Parallax';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-10 sm:py-14 border-t border-secondary/20 mb-16 lg:mb-0 relative overflow-hidden">
      {/* Background Floating Orbs */}
      <Parallax speed={-0.15} className="absolute -bottom-20 left-1/3 w-64 h-64 pointer-events-none">
        <div className="w-full h-full gold-glow-orb opacity-25" />
      </Parallax>

      <div className="container mx-auto px-4 relative z-10">
        {/* Prayer/Blessing */}
        <Parallax speed={0.06} className="text-center mb-6 sm:mb-8">
          <p className="font-arabic text-xl sm:text-2xl text-gold-luxury mb-2 px-2 drop-shadow-sm">
            رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ
          </p>
          <p className="text-foreground/75 italic text-xs sm:text-sm max-w-xl mx-auto px-4 font-sans">
            "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous."
          </p>
          <p className="text-secondary/80 text-[11px] sm:text-xs mt-1.5 font-sans font-medium">
            — Surah Al-Furqan (25:74)
          </p>
        </Parallax>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <span className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <span className="text-secondary/70 text-sm">✦</span>
          <span className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-foreground/60 text-xs sm:text-sm flex items-center justify-center gap-2 font-sans">
            Made with <Heart size={13} className="text-secondary fill-current animate-pulse" /> for finding a blessed union
          </p>
          <p className="text-foreground/40 text-[10px] sm:text-xs mt-2 font-sans">
            © {currentYear} Shah Hussain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
