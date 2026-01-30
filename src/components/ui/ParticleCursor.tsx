'use client';

import { useEffect } from 'react';

export default function ParticleCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.border = '2px solid #06b6d4'; // Cyan-500
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'transform 0.1s ease-out';
    cursor.style.mixBlendMode = 'difference';
    document.body.appendChild(cursor);

    const particles: HTMLDivElement[] = [];

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      // Create trail particle
      const particle = document.createElement('div');
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = '#06b6d4';
      particle.style.borderRadius = '50%';
      particle.style.position = 'fixed';
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9998';
      document.body.appendChild(particle);
      particles.push(particle);

      // Animate particle
      const animation = particle.animate([
        { transform: 'scale(1)', opacity: 0.8 },
        { transform: 'scale(0)', opacity: 0 }
      ], {
        duration: 500,
        easing: 'ease-out'
      });

      animation.onfinish = () => {
        particle.remove();
        particles.indexOf(particle) > -1 && particles.splice(particles.indexOf(particle), 1);
      };
    };

    const onMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursor.style.background = 'rgba(6, 182, 212, 0.2)';
    };

    const onMouseUp = () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'transparent';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cursor.remove();
      particles.forEach(p => p.remove());
    };
  }, []);

  return null;
}
