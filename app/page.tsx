'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import MemoryGallery from './components/MemoryGallery';
import GiftSection from './components/GiftSection';
import SecretLetter from './components/SecretLetter';
import FinalMoment from './components/FinalMoment';

const CustomCursor = dynamic(() => import('./components/CustomCursor'), { ssr: false });
const FallingPetals = dynamic(() => import('./components/FallingPetals'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <CustomCursor />
          <FallingPetals />

          <main style={{ background: '#050505' }}>
            <HeroSection />

            {/* Divider */}
            <SectionDivider />

            <MemoryGallery />

            <SectionDivider />

            <GiftSection />

            <SectionDivider />

            <SecretLetter />

            <SectionDivider />

            <FinalMoment />

            {/* Footer */}
            <footer className="py-12 text-center">
              <p
                className="text-white/15 text-sm font-inter"
              >
                Made with ❤️ for Mariya · Happy 23rd Birthday
              </p>
              <p
                className="mt-2 text-white/10 text-xs font-inter"
              >
                June 7, 2026
              </p>
            </footer>
          </main>
        </>
      )}
    </>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4 px-8">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(179,0,27,0.2), transparent)' }} />
      <div
        className="mx-4 text-xs"
        style={{ color: 'rgba(179,0,27,0.4)' }}
      >
        ✦
      </div>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(179,0,27,0.2), transparent)' }} />
    </div>
  );
}
