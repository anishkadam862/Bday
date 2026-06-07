'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HEART_POINTS = generateHeartPoints(120);

function generateHeartPoints(n: number) {
  const points: Array<{ x: number; y: number; baseX: number; baseY: number }> = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push({ x: x * 11, y: y * 11, baseX: x * 11, baseY: y * 11 });
  }
  return points;
}

export default function FinalMoment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef(HEART_POINTS.map(p => ({ ...p })));
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [clicked, setClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - 250,
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 500;

    const animate = () => {
      timeRef.current += 0.02;
      ctx.clearRect(0, 0, 500, 500);

      const cx = 250;
      const cy = 250;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dist = Math.sqrt(mx * mx + my * my);
      const influence = Math.max(0, 1 - dist / 200) * 30;

      // Draw particles
      particlesRef.current.forEach((p, i) => {
        const angle = Math.atan2(p.baseY - my, p.baseX - mx);
        const pushDist = Math.max(0, 80 - Math.sqrt(Math.pow(p.baseX - mx, 2) + Math.pow(p.baseY - my, 2)));
        const pushX = Math.cos(angle) * pushDist * 0.3;
        const pushY = Math.sin(angle) * pushDist * 0.3;

        p.x += ((p.baseX + pushX) - p.x) * 0.1;
        p.y += ((p.baseY + pushY) - p.y) * 0.1;

        const pulse = Math.sin(timeRef.current * 2 + i * 0.1) * 0.5 + 1;
        const size = (2.5 + pulse) * (clicked ? 1.3 : 1);
        const alpha = 0.5 + Math.sin(timeRef.current + i * 0.15) * 0.3;

        const gradient = ctx.createRadialGradient(cx + p.x, cy + p.y, 0, cx + p.x, cy + p.y, size * 3);
        gradient.addColorStop(0, `rgba(255, 60, 80, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(179, 0, 27, ${alpha * 0.7})`);
        gradient.addColorStop(1, 'rgba(179, 0, 27, 0)');

        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Center glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      glow.addColorStop(0, `rgba(179,0,27,${0.15 + Math.sin(timeRef.current) * 0.05})`);
      glow.addColorStop(1, 'rgba(179,0,27,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Outer ring glow
      if (clicked) {
        const outerGlow = ctx.createRadialGradient(cx, cy, 150, cx, cy, 220);
        outerGlow.addColorStop(0, `rgba(179,0,27,${0.2 + Math.sin(timeRef.current * 3) * 0.1})`);
        outerGlow.addColorStop(1, 'rgba(179,0,27,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, 200, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [clicked]);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setShowMessage(true), 500);
  };

  return (
    <section
      ref={sectionRef}
      id="final"
      className="py-20 px-4 relative flex flex-col items-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0d0005 50%, #050505 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(179,0,27,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 font-inter mb-4">A Final Wish</p>
          <h2
            className="text-4xl md:text-5xl font-light text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {clicked ? 'With All The Love' : 'Click The Heart'}
          </h2>
          {!clicked && (
            <p className="mt-3 text-white/30 font-inter text-sm">It&apos;s waiting for you.</p>
          )}
        </motion.div>

        {/* Particle Heart Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
          className="flex justify-center cursor-pointer"
          onClick={handleClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className="w-72 h-72 md:w-80 md:h-80"
          />
        </motion.div>

        {/* Final message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="mt-6"
            >
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                May 23 be the year of{' '}
                <span style={{ color: '#ff6080' }}>beautiful memories</span>,{' '}
                <span style={{ color: '#B3001B' }}>unexpected happiness</span>,{' '}
                and everything you&apos;ve been wishing for.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
                className="mt-6 text-4xl"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block"
                >
                  ❤️
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-white/25 font-inter text-xs tracking-widest uppercase"
              >
                Happy Birthday, Mariya
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
