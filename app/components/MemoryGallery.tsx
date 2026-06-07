'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =====================================================
// EDIT YOUR MEMORIES HERE — change photos/descriptions
// =====================================================
const memories = [
  {
    id: 1,
    title: 'You & Your Aura',
    date: 'The yellow which suits you',
    image: '/memories/memory1.jpg',
    // description: 'Some moments write themselves into your heart without asking permission. This was one of them.',
    rotate: -3,
  },
  {
    id: 2,
    title: 'Soft & Magical',
    date: 'The Cute Shadow',
    image: '/memories/memory2.jpg',
    // description: 'The way the light finds you — always.',
    rotate: 2,
  },
  {
    id: 3,
    title: 'Pure Vibes',
    date: 'The Facecard Which Never Declines',
    image: '/memories/memory3.jpg',
    // description: 'Every single frame with you tells a story worth keeping forever.',
    rotate: -1,
  },
  {
    id: 4,
    title: 'The First Picture I Saw',
    date: 'The Spongebob Face Ofc (How can I forget that?)',
    image: '/memories/memory4.jpg',
    // description: 'Your smile has a way of making even the ordinary feel extraordinary.',
    rotate: 3,
  },
  {
    id: 5,
    title: 'That Lil Astronaut',
    date: 'Ofc The Cutest Astronaut',
    image: '/memories/memory5.jpg',
    // description: 'You light up every room, every moment, every ordinary day.',
    rotate: -2,
  },
];

function MemoryCard({ memory, index }: { memory: typeof memories[0]; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [selected, setSelected] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 60, rotate: memory.rotate }}
        whileInView={{ opacity: 1, y: 0, rotate: memory.rotate }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setSelected(true)}
        className="polaroid cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotate(${memory.rotate}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Photo */}
        <div
          className="w-full aspect-[4/3] mb-2 overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #1a0008 0%, #3a0012 50%, #1a0008 100%)' }}
        >
          {imgError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🌹</div>
                <div className="text-white/30 text-xs font-inter">{memory.title}</div>
              </div>
            </div>
          ) : (
            <img
              src={memory.image}
              alt={memory.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Caption */}
        <div className="text-center mt-1">
          <p
            className="text-white/80 text-sm"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
          >
            {memory.title}
          </p>
          <p className="text-white/30 text-xs mt-1 font-inter">{memory.date}</p>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            style={{ background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(20px)' }}
            onClick={() => setSelected(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="glass rounded-2xl overflow-hidden max-w-lg w-full"
              style={{ border: '1px solid rgba(179,0,27,0.2)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div
                className="w-full aspect-video relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a0008, #3a0015, #1a0008)' }}
              >
                {imgError ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl animate-float">🌹</div>
                  </div>
                ) : (
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.6), transparent 50%)' }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-2xl font-light text-white mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {memory.title}
                </h3>
                <p className="text-crimson text-sm mb-4 font-inter" style={{ color: '#B3001B' }}>
                  {memory.date}
                </p>
                <p className="text-white/60 font-inter text-sm leading-relaxed">
                  {/* {memory.description} */}
                </p>

                <button
                  onClick={() => setSelected(false)}
                  className="mt-6 w-full py-3 rounded-lg text-sm font-inter text-white/60 transition-all hover:text-white"
                  style={{ background: 'rgba(179,0,27,0.1)', border: '1px solid rgba(179,0,27,0.2)' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MemoryGallery() {
  return (
    <section id="memories" className="pt-[108px] pb-32 px-4 relative">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(179,0,27,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-28 relative z-10"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 font-inter mb-4">Gallery</p>
          <h2
            className="text-4xl md:text-6xl font-light text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Moments That Deserve
            <br />
            <em style={{ color: '#B3001B' }}>To Stay</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {memories.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
