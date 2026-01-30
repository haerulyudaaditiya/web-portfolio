'use client';

import { useEffect, useRef } from 'react';

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Resize handler
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', onResize);
    onResize();

    // Particles
    const particles: { x: number; y: number; size: number; life: number; velocity: { x: number; y: number } }[] = [];
    const mouse = { x: -100, y: -100 };
    const cursor = { x: -100, y: -100 }; // Smooth cursor position

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      cursor.x += (mouse.x - cursor.x) * 0.15;
      cursor.y += (mouse.y - cursor.y) * 0.15;

      // Add new particle
      if (Math.abs(mouse.x - cursor.x) > 0.1 || Math.abs(mouse.y - cursor.y) > 0.1) {
          particles.push({
            x: cursor.x,
            y: cursor.y,
            size: Math.random() * 2 + 1,
            life: 1,
            velocity: {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            }
          });
      }

      // Draw Main Cursor
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update
        p.life -= 0.02;
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.size *= 0.95; // Shrink

        // Draw
        ctx.fillStyle = `rgba(6, 182, 212, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{ width: '100vw', height: '100vh' }}
    />
  );
}
