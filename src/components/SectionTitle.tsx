import { Parallax } from './Parallax';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  arabic?: string;
}

const SectionTitle = ({ title, subtitle, arabic }: SectionTitleProps) => {
  return (
    <Parallax speed={0.08} className="text-center mb-8 md:mb-12 px-2">
      {/* Top Decorative Line with subtle Parallax */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
        <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-secondary/70 to-secondary" />
        <span className="text-gold-gradient text-lg sm:text-2xl animate-pulse">✦</span>
        <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-secondary/70 to-secondary" />
      </div>

      {arabic && (
        <p className="font-arabic text-xl sm:text-2xl md:text-3xl text-gold-luxury font-bold mb-1 opacity-90 drop-shadow-sm">
          {arabic}
        </p>
      )}

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-gold-gradient tracking-wide">
        {title}
      </h2>

      {subtitle && (
        <p className="text-foreground/75 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Bottom Decorative Line */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
        <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-secondary/70 to-secondary" />
        <span className="text-gold-gradient text-lg sm:text-2xl animate-pulse">✦</span>
        <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-secondary/70 to-secondary" />
      </div>
    </Parallax>
  );
};

export default SectionTitle;
