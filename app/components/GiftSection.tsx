'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const birthdayMessage = `Happy 23rd Birthday, Mariya.

This moment right here, right now is yours.

You've carried every version of yourself with such grace. Every stumble, every rise, every quiet night wondering if you were enough, you WERE. You always WERE.

23 is going to be different. Not because the world changes, but because you will. You'll walk into rooms knowing your worth. You'll laugh a little louder. You'll love a little deeper.

And wherever this year takes you, just know that someone out there is rooting for you. Every single day. ❤️`;

function Firefly({ id }: { id: number }) {
  return (
    <motion.div
      className="fixed rounded-full pointer-events-none z-[200]"
      style={{
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        background: '#ffcc44',
        boxShadow: '0 0 8px #ffcc44, 0 0 20px rgba(255,200,50,0.5)',
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
      }}
      animate={{
        x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
        y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
        opacity: [0, 1, 0.5, 1, 0],
      }}
      transition={{
        duration: Math.random() * 4 + 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function Confetti() {
  const pieces = Array.from({ length: 80 });
  const colors = ['#B3001B', '#ff4060', '#ffffff', '#ffcc44', '#ff8090', '#7a0013'];

  return (
    <div className="fixed inset-0 pointer-events-none z-[201]">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            background: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0],
            rotate: Math.random() * 720 - 360,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 0.5,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    setDone(false);
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor" />}
    </span>
  );
}

export default function GiftSection() {
  const [opened, setOpened] = useState(false);
  const [showFireflies, setShowFireflies] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const triggerSurprise = useCallback(() => {
    if (opened) return;
    setOpened(true);
    setShowFireflies(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowMessage(true);
      setShowConfetti(false);
    }, 1500);
    setTimeout(() => setShowConfetti(true), 3000);
    setTimeout(() => setShowConfetti(false), 5500);
  }, [opened]);

  return (
    <section id="gift" className="py-40 px-4 relative flex flex-col items-center">
      {showFireflies && (
        <>
          {Array.from({ length: 25 }).map((_, i) => (
            <Firefly key={i} id={i} />
          ))}
        </>
      )}
      {showConfetti && <Confetti />}

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: opened
            ? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(179,0,27,0.1) 0%, transparent 70%)'
            : 'none',
          transition: 'background 2s ease',
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10 w-full">

        {/* Header block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
          style={{ gap: 20, marginBottom: 64 }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
            }}
          >
            For You
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 300,
              color: 'white',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Your{' '}
            <em style={{ color: '#B3001B', fontStyle: 'italic' }}>Surprise</em>{' '}
            Awaits
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              maxWidth: 360,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Something special has been prepared, just for this moment.
          </p>
        </motion.div>

        {/* Gift button */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              {/* Outer glow ring */}
              <motion.div
                style={{ position: 'relative', display: 'inline-flex' }}
                animate={{ scale: [1, 1.01, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Pulsing halo */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: -8,
                    borderRadius: 24,
                    border: '1px solid rgba(179,0,27,0.4)',
                    pointerEvents: 'none',
                  }}
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.04, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: -16,
                    borderRadius: 28,
                    border: '1px solid rgba(179,0,27,0.15)',
                    pointerEvents: 'none',
                  }}
                  animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />

                <motion.button
                  id="open-gift-btn"
                  whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(179,0,27,0.8), 0 0 120px rgba(179,0,27,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={triggerSurprise}
                  style={{
                    position: 'relative',
                    padding: '22px 60px',
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #6a0011 0%, #B3001B 45%, #e0001f 100%)',
                    boxShadow: '0 0 40px rgba(179,0,27,0.55), 0 0 80px rgba(179,0,27,0.2), inset 0 1px 0 rgba(255,120,120,0.2)',
                    border: '1px solid rgba(255,130,130,0.25)',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  {/* Shimmer sweep */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>Open Your Birthday Surprise 🎁</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* After opening — small confirmation text */}
        {opened && !showMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 48, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}
          >
            ✨ Opening your surprise...
          </motion.p>
        )}
      </div>

      {/* Floating message modal — fixed bottom corner */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.25 }}
            style={{
              position: 'fixed',
              bottom: 28,
              right: 28,
              zIndex: 500,
              width: 'min(420px, calc(100vw - 32px))',
              maxHeight: '72vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(10, 2, 4, 0.88)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(179,0,27,0.25)',
              borderRadius: 20,
              boxShadow: '0 8px 60px rgba(0,0,0,0.7), 0 0 40px rgba(179,0,27,0.12)',
              overflow: 'hidden',
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px 14px',
                borderBottom: '1px solid rgba(179,0,27,0.15)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ fontSize: '1.1rem' }}
                >
                  ❤️
                </motion.span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    color: '#B3001B',
                    fontSize: '1.15rem',
                    lineHeight: 1,
                  }}
                >
                  A Message From The Heart
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowMessage(false)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(179,0,27,0.15)',
                  border: '1px solid rgba(179,0,27,0.3)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
                  lineHeight: 1,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(179,0,27,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(179,0,27,0.15)')}
                aria-label="Close message"
              >
                ✕
              </button>
            </div>

            {/* Scrollable text body */}
            <div
              style={{
                padding: '18px 20px 20px',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {/* Inner glow */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 120,
                  background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(179,0,27,0.08), transparent)',
                  pointerEvents: 'none',
                }}
              />
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.75)',
                  whiteSpace: 'pre-line',
                  position: 'relative',
                  margin: 0,
                }}
              >
                <TypewriterText text={birthdayMessage} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

