'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==============================
// EDIT YOUR LETTER CONTENT HERE
// ==============================
const letterContent = `My dearest Mariya, 
I don't know where to begin, so I'll start with the truth.

You are one of the most remarkable people I've ever had the privilege of knowing. Not because of anything dramatic, but because of the quiet, everyday ways you show up. The way you genuinely listen when others speak. The way you find beauty in the smallest things. The way your presence makes a room feel warmer.

At 23, you stand at the edge of something beautiful. A year that belongs entirely to you.

I hope this year brings you the kind of happiness that doesn't need to announce itself. The kind that settles into your bones on a quiet Tuesday afternoon. The kind that makes you look back and think, YES!, that was a good year.

I hope you chase the things that make your heart race. I hope you rest when you need to. I hope you allow yourself to be loved.. fully, without holding back.

And on the days when it gets hard (because some days always are), I hope you remember: you've made it through every difficult day so far. You have a 100% success rate.

Happy Birthday, Mariya.
May 23 be everything you dreamed of, and more.

With all the love in the world. ❤️ 

~Anish`;

export default function SecretLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 800);
  };

  return (
    <section id="letter" className="py-32 px-4 relative flex flex-col items-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(179,0,27,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 font-inter mb-4">Just For You</p>
          <h2
            className="text-4xl md:text-6xl font-light text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A <em style={{ color: '#B3001B' }}>Secret Letter</em>
          </h2>
          <p className="text-white/40 font-inter text-sm">
            {isOpen ? 'Read slowly. Every word was meant for you.' : 'Click the envelope to open it.'}
          </p>
        </motion.div>

        {/* Envelope */}
        <div className="flex flex-col items-center gap-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="envelope-wrapper cursor-pointer"
            onClick={handleOpen}
            style={{ width: 320 }}
          >
            {/* Envelope body */}
            <div
              className="relative"
              style={{
                background: 'linear-gradient(180deg, #1a0008 0%, #2a000e 100%)',
                border: '1px solid rgba(179,0,27,0.25)',
                borderRadius: '0 0 16px 16px',
                padding: '40px 30px 30px 30px',
                boxShadow: isOpen
                  ? '0 20px 60px rgba(179,0,27,0.3), 0 0 0 1px rgba(179,0,27,0.15)'
                  : '0 10px 40px rgba(0,0,0,0.5)',
                transition: 'box-shadow 0.5s ease',
                minHeight: 160,
              }}
            >
              {/* Envelope flap */}
              <div
                className={`envelope-flap ${isOpen ? 'opened' : ''}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 0,
                  borderLeft: '160px solid transparent',
                  borderRight: '160px solid transparent',
                  borderTop: '80px solid #2d0010',
                  transformOrigin: 'top',
                }}
              />

              {/* Envelope decoration lines */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: '100%' }}
              >
                <svg width="100%" height="100%" viewBox="0 0 320 160" preserveAspectRatio="none">
                  <line x1="0" y1="160" x2="160" y2="80" stroke="rgba(179,0,27,0.1)" strokeWidth="1" />
                  <line x1="320" y1="160" x2="160" y2="80" stroke="rgba(179,0,27,0.1)" strokeWidth="1" />
                </svg>
              </div>

              {/* Wax seal */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 left-1/2"
                    style={{ transform: 'translate(-50%, -30%)' }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl animate-pulse-glow"
                      style={{
                        background: 'radial-gradient(circle, #c0001f 0%, #7a0013 100%)',
                        border: '2px solid rgba(255,100,100,0.3)',
                      }}
                    >
                      ❤️
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Click hint */}
              {!isOpen && (
                <motion.p
                  className="text-center text-white/25 text-xs font-inter mt-8"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to open
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Letter sliding out */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
                className="overflow-hidden w-full"
                style={{ maxWidth: 500 }}
              >
                <motion.div
                  initial={{ scaleY: 0.8, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    background: 'linear-gradient(180deg, #1c0c00 0%, #fdf8f3 5%)',
                    borderRadius: '0 0 12px 12px',
                    padding: '40px 36px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(179,0,27,0.15)',
                    borderTop: 'none',
                    transformOrigin: 'top',
                  }}
                >
                  {/* Paper texture simulation */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,245,230,0.97) 0%, rgba(250,240,220,0.95) 100%)',
                      borderRadius: 8,
                      padding: '30px 28px',
                    }}
                  >
                    {/* Subtle ruled lines inside paper — contained */}
                    {[...Array(18)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-0 right-0 pointer-events-none"
                        style={{
                          top: `${60 + i * 38}px`,
                          height: '1px',
                          background: 'rgba(179,0,27,0.06)',
                        }}
                      />
                    ))}
                    {/* Letter heading */}
                    <div className="mb-6 pb-4 relative" style={{ borderBottom: '1px solid rgba(179,0,27,0.15)' }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#B3001B', fontSize: '22px' }}>
                        Dear Mariya,
                      </p>
                    </div>

                    <p
                      className="relative leading-8 whitespace-pre-line"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: '#2a1a0e',
                        fontSize: '15px',
                        lineHeight: '1.9',
                      }}
                    >
                      {letterContent.replace('My dearest Mariya,\n\n', '')}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
