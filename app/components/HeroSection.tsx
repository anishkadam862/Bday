'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function CrystalRose() {
  return (
    <div className="relative" style={{ width: 180, height: 180 }}>
      {/* Outer glow rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid rgba(179,0,27,${0.4 / i})`,
            boxShadow: `0 0 ${15 * i}px rgba(179,0,27,${0.25 / i})`,
          }}
          animate={{ scale: [1, 1.08 + i * 0.03, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* 3D Rotating SVG Rose */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={{ rotateX: [12, -12, 12], y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="130" height="130" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="petalGrad1h" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ff6080" stopOpacity="0.9"/>
                <stop offset="40%" stopColor="#B3001B" stopOpacity="0.95"/>
                <stop offset="100%" stopColor="#3a0008" stopOpacity="1"/>
              </radialGradient>
              <radialGradient id="petalGrad2h" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ff8090" stopOpacity="0.8"/>
                <stop offset="40%" stopColor="#c0001f" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#5a0010" stopOpacity="1"/>
              </radialGradient>
              <radialGradient id="centerGradh" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff4060" stopOpacity="1"/>
                <stop offset="50%" stopColor="#B3001B" stopOpacity="1"/>
                <stop offset="100%" stopColor="#3a0008" stopOpacity="1"/>
              </radialGradient>
              <radialGradient id="glowGradh" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff2040" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#B3001B" stopOpacity="0"/>
              </radialGradient>
              <filter id="petalGlowh">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <circle cx="100" cy="100" r="80" fill="url(#glowGradh)" opacity="0.4"/>

            {[...Array(8)].map((_, i) => (
              <g key={`op-${i}`} transform={`rotate(${i * 45} 100 100)`}>
                <ellipse cx="100" cy="55" rx="14" ry="28" fill="url(#petalGrad1h)" filter="url(#petalGlowh)" opacity="0.85"/>
                <ellipse cx="100" cy="55" rx="6" ry="15" fill="#ff8090" opacity="0.2" transform="translate(-3, 3)"/>
              </g>
            ))}
            {[...Array(6)].map((_, i) => (
              <g key={`mp-${i}`} transform={`rotate(${i * 60 + 30} 100 100)`}>
                <ellipse cx="100" cy="65" rx="11" ry="22" fill="url(#petalGrad2h)" opacity="0.9"/>
              </g>
            ))}
            {[...Array(5)].map((_, i) => (
              <g key={`ip-${i}`} transform={`rotate(${i * 72} 100 100)`}>
                <ellipse cx="100" cy="76" rx="8" ry="16" fill="#B3001B" opacity="0.95"/>
              </g>
            ))}

            <circle cx="100" cy="100" r="20" fill="url(#centerGradh)"/>
            <circle cx="100" cy="100" r="14" fill="#c0001f"/>
            <circle cx="100" cy="100" r="8" fill="#B3001B"/>
            <circle cx="100" cy="100" r="4" fill="#7a0013"/>
            <ellipse cx="88" cy="88" rx="4" ry="2" fill="white" opacity="0.3" transform="rotate(-30 88 88)"/>

            <path d="M 100 120 Q 95 145 90 165" stroke="#2d7a2d" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <path d="M 95 140 Q 75 130 65 120" stroke="#2d7a2d" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <ellipse cx="65" cy="120" rx="12" ry="7" fill="#2d7a2d" opacity="0.7" transform="rotate(-30 65 120)"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sp-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? '#B3001B' : '#ffffff',
            boxShadow: `0 0 6px ${i % 2 === 0 ? '#B3001B' : '#ffffff'}`,
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos((i / 6) * Math.PI * 2) * 80],
            y: [0, Math.sin((i / 6) * Math.PI * 2) * 80],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.33,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotX = useTransform(springY, [-300, 300], [5, -5]);
  const rotY = useTransform(springX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050505 0%, #0d0005 40%, #150008 60%, #050505 100%)' }}
    >
      {/* Animated background beams */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 2,
              height: '60%',
              background: `linear-gradient(to bottom, transparent, rgba(179,0,27,${0.12 - i * 0.015}), transparent)`,
              left: `${10 + i * 16}%`,
              top: '20%',
              transformOrigin: 'top center',
              borderRadius: 1,
            }}
            animate={{
              rotateZ: [-(i * 5 + 15), (i * 3 + 5), -(i * 5 + 15)],
              opacity: [0.2, 0.6, 0.2],
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(179,0,27,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: (i % 3) + 1,
              height: (i % 3) + 1,
              left: `${(i * 4.1) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
              background: `rgba(179,0,27,${0.3 + (i % 4) * 0.1})`,
              boxShadow: `0 0 8px rgba(179,0,27,0.4)`,
            }}
            animate={{
              y: [0, -(20 + i % 30), 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* MAIN LAYOUT: stacked vertically — no overlapping */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 gap-6"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="glass-red px-5 py-2 rounded-full"
          style={{ border: '1px solid rgba(179,0,27,0.3)' }}
        >
          <span className="text-xs font-inter text-white/50 tracking-[0.25em] uppercase">
            June 7, 2026
          </span>
        </motion.div>

        {/* Heading ABOVE rose */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="block text-white/90">Happy</span>
            <span
              className="block font-semibold"
              style={{
                background: 'linear-gradient(135deg, #ff6080 0%, #B3001B 40%, #ff4060 70%, #7a0013 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(179,0,27,0.5))',
              }}
            >
              23rd Birthday
            </span>
            <span className="block text-white/90">
              Mariya{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
              >
                ❤️
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* 3D Crystal Rose — centered below heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7, type: 'spring', bounce: 0.3 }}
        >
          <CrystalRose />
        </motion.div>

        {/* Subheading below rose */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="text-sm md:text-base text-white/40 font-inter font-light tracking-widest uppercase"
          style={{ letterSpacing: '0.25em' }}
        >
          A little corner of the internet made just for you.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-col items-center gap-2 mt-4"
        >
          <span className="text-white/25 text-xs tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, rgba(179,0,27,0.8), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
