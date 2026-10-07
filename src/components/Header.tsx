import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from 'lenis/react';
import {
  User,
  Images,
  GraduationCap,
  Briefcase,
  Users,
  Mail,
  Sparkles,
  Menu,
  X,
  Download,
  MessageCircle,
  Home,
  ArrowUpRight,
} from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Gallery', href: '#gallery', icon: Images },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Career', href: '#career', icon: Briefcase },
  { label: 'Family', href: '#family', icon: Users },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Track active section
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
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
    <>
      {/* ========================================================================= */}
      {/* 1. TOP HEADER (Fixed Navigation Bar)                                      */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-[99990] transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-2.5 border-b border-secondary/15'
            : 'bg-gradient-to-b from-background/90 via-background/60 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? ''
                : 'bg-card/40 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-2 sm:py-2.5 border border-secondary/15 shadow-sm'
            }`}
          >
            {/* Logo / Profile Branding */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="group flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
            >
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-secondary via-amber-400 to-amber-500 flex items-center justify-center shadow-md shadow-secondary/30 group-hover:shadow-secondary/50 transition-all duration-300 group-hover:scale-105">
                  <span className="font-sans text-sm sm:text-base font-black text-primary tracking-tight">
                    SH
                  </span>
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-secondary animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-base sm:text-lg font-bold text-gold-luxury leading-tight tracking-tight">
                  Shah Hussain
                </span>
                <span className="text-[9px] sm:text-[10px] text-secondary/70 tracking-widest uppercase font-medium font-sans">
                  Marriage Biodata
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (hidden on mobile/tablet) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(1).map((item) => {
                const isActive = activeSection === item.href;
                const Icon = item.icon;

                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group cursor-pointer font-sans ${
                      isActive
                        ? 'text-secondary bg-secondary/10 shadow-inner'
                        : 'text-foreground/75 hover:text-secondary hover:bg-secondary/5'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? 'text-secondary' : 'text-foreground/50 group-hover:text-secondary'
                      }`}
                    />
                    <span>{item.label}</span>

                    {/* Active indicator underline */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Action CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/bio-data.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-semibold transition-all duration-300 hover:scale-105 font-sans"
                title="Download Biodata PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>
              <button
                onClick={() => scrollToSection('#contact')}
                className="relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-secondary to-amber-500 text-primary font-bold text-xs sm:text-sm shadow-md shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 hover:scale-105 group cursor-pointer font-sans"
              >
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-300 via-secondary to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Mobile & Tablet Right Controls: Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 rounded-xl bg-card/90 border border-secondary/35 flex items-center justify-center text-secondary hover:text-amber-300 hover:bg-secondary/15 transition-all duration-200 active:scale-95 shadow-md focus:outline-none cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. PORTALED FULL-SCREEN MOBILE & TABLET DRAWER (z-[9999999])              */}
      {/* ========================================================================= */}
      {mobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999999] lg:hidden flex flex-col justify-end">
            {/* Dark Frosted Glass Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl transition-opacity animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Menu Panel (Full Screen / Height) */}
            <div className="relative w-full h-full max-w-sm ml-auto bg-card/98 border-l border-secondary/30 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between p-5 sm:p-6 overflow-y-auto animate-scale-in z-10">
              {/* Header inside Drawer */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary via-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-secondary/30">
                      <span className="font-sans text-sm font-black text-primary">SH</span>
                    </div>
                    <div>
                      <div className="font-sans text-base font-bold text-gold-luxury leading-tight">
                        Shah Hussain
                      </div>
                      <p className="text-[11px] text-secondary/75 font-sans font-medium">
                        Software Engineer • Lucknow
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 rounded-full bg-secondary/15 hover:bg-secondary/25 border border-secondary/30 flex items-center justify-center text-secondary transition-all active:scale-95 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="mt-5 flex flex-col gap-1.5">
                  <span className="text-[10px] tracking-widest text-secondary/60 uppercase font-semibold px-3 mb-1 font-sans">
                    Menu Navigation
                  </span>
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group text-left cursor-pointer font-sans ${
                          isActive
                            ? 'bg-secondary/20 text-secondary font-semibold border border-secondary/40 shadow-inner'
                            : 'text-foreground/85 hover:bg-secondary/10 hover:text-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-secondary/30 text-amber-300'
                                : 'bg-secondary/10 text-secondary group-hover:bg-secondary/20'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-sans text-sm font-medium">{item.label}</span>
                        </div>
                        <ArrowUpRight
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isActive
                              ? 'text-secondary translate-x-0.5 -translate-y-0.5'
                              : 'text-foreground/30 group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions inside Drawer */}
              <div className="mt-6 pt-4 border-t border-secondary/20 flex flex-col gap-2.5">
                <a
                  href="/bio-data.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-secondary/15 hover:bg-secondary/25 border border-secondary/30 text-foreground font-semibold text-xs tracking-wide transition-all shadow-sm font-sans"
                >
                  <Download className="w-4 h-4 text-secondary" />
                  <span>Download Official Biodata PDF</span>
                </a>

                <a
                  href="https://wa.me/917071967998?text=Assalamu%20Alaikum!%20I%20viewed%20your%20marriage%20biodata%20and%20would%20like%20to%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-950/50 hover:scale-[1.02] transition-transform font-sans"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Header;
