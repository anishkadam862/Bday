'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      requestAnimationFrame(animateRing);
    };

    const handleMouseDown = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
    };
    const handleMouseUp = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    const handleMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        if (ringRef.current) {
          ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
          ringRef.current.style.borderColor = 'rgba(179,0,27,1)';
        }
      }
    };

    const handleMouseLeaveInteractive = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        ringRef.current.style.borderColor = 'rgba(179,0,27,0.6)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.querySelectorAll('button, a, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    const raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
