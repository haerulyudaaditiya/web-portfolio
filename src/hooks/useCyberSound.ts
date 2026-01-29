'use client';

import { useCallback } from 'react';

export default function useCyberSound() {
  
  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        // Ignore audio errors (e.g. user gestures not active)
    }
  }, []);

  const playHover = useCallback(() => {
    playTone(800, 'sine', 0.1, 0.05);
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(300, 'square', 0.15, 0.05);
    setTimeout(() => playTone(600, 'sine', 0.1, 0.02), 50);
  }, [playTone]);

  const playBoot = useCallback(() => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }, []);

  return { playHover, playClick, playBoot };
}
