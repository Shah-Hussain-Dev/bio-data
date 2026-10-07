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
    requestAnimationFrame(() => {
      setContentReady(true);
    });
  }, []);

  return (
    <>
      {showIntro && <WelcomeIntro onComplete={handleIntroComplete} />}
      {!showIntro && <Header />}
      <div
        className={`min-h-screen bg-background transition-opacity duration-700 ease-out ${
          contentReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: showIntro ? 'hidden' : 'visible' }}
      >
        <main className="pb-24 lg:pb-0">
          <HeroSection />
          <PersonalInfo />
          <Gallery />
          <Education />
          <Professional />
          <Family />
          <Contact />
        </main>
        <Footer />
      </div>
      {!showIntro && <WhatsAppButton />}
      {!showIntro && <BottomNav />}
    </>
  );
};

export default Index;
