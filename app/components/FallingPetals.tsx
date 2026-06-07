'use client';
import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  driftPhase: number;
  type: 'petal' | 'circle';
  color: string;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(179,0,27,',
      'rgba(200,20,50,',
      'rgba(140,0,15,',
      'rgba(220,50,70,',
      'rgba(255,80,100,',
    ];

    const createPetal = (startY?: number): Petal => ({
      x: Math.random() * window.innerWidth,
      y: startY !== undefined ? startY : -20,
      size: Math.random() * 12 + 4,
      speed: Math.random() * 1.5 + 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.6 + 0.2,
      drift: 0,
      driftSpeed: Math.random() * 0.02 + 0.005,
      driftPhase: Math.random() * Math.PI * 2,
      type: Math.random() > 0.3 ? 'petal' : 'circle',
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    // Initial petals
    for (let i = 0; i < 30; i++) {
      petalsRef.current.push(createPetal(Math.random() * window.innerHeight));
    }

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'petal') {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        gradient.addColorStop(0, p.color + '1)');
        gradient.addColorStop(0.5, p.color + '0.8)');
        gradient.addColorStop(1, p.color + '0)');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.ellipse(0, -p.size * 0.5, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(p.size * 0.3, -p.size * 0.3, p.size * 0.35, p.size * 0.8, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.5)';
        ctx.fill();
      } else {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        gradient.addColorStop(0, p.color + '0.9)');
        gradient.addColorStop(1, p.color + '0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let frameCount = 0;
    const MAX_PETALS = 60;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCount++;
      if (frameCount % 30 === 0 && petalsRef.current.length < MAX_PETALS) {
        petalsRef.current.push(createPetal());
      }

      petalsRef.current = petalsRef.current.filter(p => {
        p.y += p.speed;
        p.driftPhase += p.driftSpeed;
        p.x += Math.sin(p.driftPhase) * 0.8;
        p.rotation += p.rotSpeed;

        drawPetal(ctx, p);

        return p.y < canvas.height + 50;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
