import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { User, Images, GraduationCap, Briefcase, Users, Mail, Sparkles } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about', icon: User },
  { label: 'Gallery', href: '#gallery', icon: Images },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Career', href: '#career', icon: Briefcase },
  { label: 'Family', href: '#family', icon: Users },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = navItems.map(item => item.href.slice(1));
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href, { offset: -80, duration: 1.2 });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden lg:block ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-2'
          : 'bg-gradient-to-b from-background/80 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? '' : 'bg-background/40 backdrop-blur-md rounded-2xl px-6 py-3 border border-secondary/10'
        }`}>
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary via-amber-400 to-secondary flex items-center justify-center shadow-lg shadow-secondary/30 group-hover:shadow-secondary/50 transition-all duration-300 group-hover:scale-105">
                <span className="font-serif text-lg font-bold text-primary">SH</span>
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-secondary animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold text-gold-gradient leading-tight">
                Shah Hussain
              </span>
              <span className="text-[10px] text-secondary/60 tracking-widest uppercase">
                Marriage Biodata
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive 
                      ? 'text-secondary bg-secondary/10' 
                      : 'text-foreground/70 hover:text-secondary hover:bg-secondary/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-all duration-300 ${
                    isActive ? 'text-secondary' : 'text-foreground/50 group-hover:text-secondary'
                  }`} />
                  <span>{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
                  )}
                  
                  {/* Hover glow */}
                  <span className="absolute inset-0 rounded-xl bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="relative overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary via-amber-400 to-secondary text-primary font-semibold text-sm shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 hover:scale-105 group"
          >
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-secondary to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
