import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { User, Images, GraduationCap, Users, Mail, Home } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Gallery', href: '#gallery', icon: Images },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Family', href: '#family', icon: Users },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState('#hero');
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#hero') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (lenis) {
      lenis.scrollTo(href, { offset: -70, duration: 1.2 });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[99998] bg-background/95 backdrop-blur-2xl border-t border-secondary/25 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] transition-all pointer-events-auto"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)',
      }}
    >
      <div className="flex items-center justify-around px-2 pt-1.5 pb-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2.5 rounded-xl transition-all duration-200 min-w-[3.25rem] cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-secondary bg-secondary/15 scale-105 shadow-sm'
                  : 'text-foreground/60 hover:text-secondary/80'
              }`}
            >
              <div
                className={`relative p-1 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-secondary/20 text-amber-300' : ''
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-secondary/30 animate-ping pointer-events-none" />
                )}
              </div>
              <span
                className={`text-[9.5px] sm:text-[10px] font-medium tracking-tight font-sans transition-colors duration-200 ${
                  isActive ? 'text-secondary font-semibold' : ''
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
