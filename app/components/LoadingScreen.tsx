'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    'Preparing something special for Mariya...',
    'Gathering rose petals...',
    'Lighting the stars...',
    'Almost ready...',
  ];

  useEffect(() => {
    // Each phrase stays for 2 seconds — easy to read
    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 2000);

    // Progress fills in ~8 seconds total
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(textInterval);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return Math.min(100, prev + Math.random() * 0.6 + 0.2);
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Ambient particles — absolutely positioned, won't affect layout */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  width: (i % 3) + 2,
                  height: (i % 3) + 2,
                  background: `rgba(179, 0, 27, ${0.2 + (i % 5) * 0.08})`,
                  left: `${(i * 5.1) % 100}%`,
                  top: `${(i * 7.3 + 3) % 100}%`,
                  boxShadow: '0 0 10px rgba(179,0,27,0.5)',
                }}
                animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>

          {/* Glow ring — absolutely positioned */}
          <motion.div
            style={{
              position: 'absolute',
              borderRadius: '50%',
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(179,0,27,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Centered content column — no absolute positioning */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, zIndex: 10, position: 'relative' }}>
            {/* Rose */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                  <defs>
                    <radialGradient id="rg" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff4060" />
                      <stop offset="50%" stopColor="#B3001B" />
                      <stop offset="100%" stopColor="#5a000d" />
                    </radialGradient>
                    <filter id="gl">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#gl)">
                    <ellipse cx="50" cy="30" rx="12" ry="20" fill="url(#rg)" opacity="0.9" transform="rotate(-30 50 50)" />
                    <ellipse cx="50" cy="30" rx="12" ry="20" fill="url(#rg)" opacity="0.9" transform="rotate(30 50 50)" />
                    <ellipse cx="50" cy="30" rx="12" ry="20" fill="url(#rg)" opacity="0.85" />
                    <ellipse cx="50" cy="30" rx="12" ry="20" fill="url(#rg)" opacity="0.85" transform="rotate(60 50 50)" />
                    <ellipse cx="50" cy="30" rx="12" ry="20" fill="url(#rg)" opacity="0.85" transform="rotate(-60 50 50)" />
                    <ellipse cx="50" cy="30" rx="12" ry="20" fill="url(#rg)" opacity="0.85" transform="rotate(90 50 50)" />
                    <circle cx="50" cy="50" r="14" fill="#ff2040" />
                    <circle cx="50" cy="50" r="9" fill="#B3001B" />
                    <circle cx="50" cy="50" r="5" fill="#7a0013" />
                    <line x1="50" y1="64" x2="50" y2="90" stroke="#1a5c1a" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 50 75 Q 35 68 30 60" stroke="#1a5c1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </g>
                </svg>
              </motion.div>
            </motion.div>

            {/* Rotating text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  padding: '0 1rem',
                  margin: 0,
                }}
              >
                {texts[textIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar */}
            <div style={{ width: 240, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7a0013, #B3001B, #ff4060)',
                  boxShadow: '0 0 10px rgba(179,0,27,0.8)',
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Percentage */}
            <motion.p
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {Math.min(100, Math.floor(progress))}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
