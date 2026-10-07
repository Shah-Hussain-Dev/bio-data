import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Gallery from '@/components/Gallery';
import PersonalInfo from '@/components/PersonalInfo';
import Education from '@/components/Education';
import Professional from '@/components/Professional';
import Family from '@/components/Family';
import Contact from '@/components/Contact';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import WelcomeIntro from '@/components/WelcomeIntro';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    // Small delay before revealing content for smooth transition
    requestAnimationFrame(() => {
      setContentReady(true);
    });
  }, []);

  return (
    <>
      {showIntro && <WelcomeIntro onComplete={handleIntroComplete} />}
      <div
        className={`min-h-screen bg-background transition-all duration-700 ease-out ${
          contentReady
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
        style={{ visibility: showIntro ? 'hidden' : 'visible' }}
      >
        <Header />
        <main className="pb-20 lg:pb-0">
          <HeroSection />
          <PersonalInfo />
          <Gallery />
          <Education />
          <Professional />
          <Family />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
        <BottomNav />
      </div>
    </>
  );
};

export default Index;
