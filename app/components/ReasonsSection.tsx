'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { front: '✨', back: 'Your smile that makes the whole room light up' },
  { front: '💫', back: 'Your kindness that costs you nothing but means everything' },
  { front: '🔥', back: 'Your energy that is absolutely contagious' },
  { front: '🌀', back: 'Your beautiful, wonderful chaos' },
  { front: '💪', back: 'Your determination to never give up on yourself' },
  { front: '🌹', back: 'Your ability to make ordinary moments feel extraordinary' },
  { front: '🧠', back: 'The way your mind works — it is genuinely brilliant' },
  { front: '🤍', back: 'The way you love — deeply and completely' },
  { front: '🎭', back: 'Your dramatic storytelling that has everyone hooked' },
  { front: '🌙', back: 'How you hold yourself together even on the hardest days' },
  { front: '🦋', back: 'The way you have grown into someone breathtaking' },
  { front: '🎵', back: 'Your taste — in music, in life, in everything' },
];

function FlipCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="flip-card w-full h-full cursor-pointer"
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flip-card-front glass rounded-2xl flex flex-col items-center justify-center gap-2 group"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <motion.span
            className="text-4xl"
            animate={{ scale: flipped ? 0 : [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {reason.front}
          </motion.span>
          <p className="text-white/20 text-xs font-inter">tap to reveal</p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back rounded-2xl flex items-center justify-center p-4 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(179,0,27,0.2), rgba(122,0,19,0.3))',
            border: '1px solid rgba(179,0,27,0.25)',
            boxShadow: '0 0 20px rgba(179,0,27,0.15)',
          }}
        >
          <p
            className="text-white/85 text-sm font-light leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px' }}
          >
            {reason.back}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReasonsSection() {
  return (
    <section id="reasons" className="py-32 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(179,0,27,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 font-inter mb-4">
            Because You Deserve To Know
          </p>
          <h2
            className="text-4xl md:text-6xl font-light text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Why You&apos;re{' '}
            <em style={{ color: '#B3001B' }}>Extraordinary</em>
          </h2>
          <p className="mt-4 text-white/40 font-inter text-sm">Tap each card to reveal a reason.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[140px]">
          {reasons.map((r, i) => (
            <FlipCard key={i} reason={r} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p
            className="text-xl md:text-2xl text-white/50 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &ldquo;And these are just a few. The list goes on forever.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
