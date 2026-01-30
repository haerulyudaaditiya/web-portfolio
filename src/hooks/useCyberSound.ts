'use client';

import { useCallback, useEffect, useRef } from 'react';

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
        // Ignore audio errors
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

  // Ambient Sound State
  const ambientRef = useRef<{ ctx: AudioContext, gain: GainNode, osc1: OscillatorNode, osc2: OscillatorNode } | null>(null);

  const playAmbient = useCallback((play: boolean) => {
    try {
        if (play) {
            if (ambientRef.current) return; // Already playing

            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            
            const ctx = new AudioContext();
            const gain = ctx.createGain();
            
            // Oscillator 1: Deep Drone (Sine)
            const osc1 = ctx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(50, ctx.currentTime);
            
            // Oscillator 2: Texture (Sawtooth, low pass) - Simulating "Computer Hum"
            const osc2 = ctx.createOscillator();
            osc2.type = 'sawtooth';
            osc2.frequency.setValueAtTime(48, ctx.currentTime); 
            
            // Filter for Osc2
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, ctx.currentTime);

            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2); // Soft fade in

            osc1.connect(gain);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc1.start();
            osc2.start();

            ambientRef.current = { ctx, gain, osc1, osc2 };
        } else {
            if (!ambientRef.current) return;
            
            // Fade out
            const { gain, osc1, osc2, ctx } = ambientRef.current;
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
            
            setTimeout(() => {
                try {
                    osc1.stop();
                    osc2.stop();
                    ctx.close();
                } catch(e) {}
                ambientRef.current = null;
            }, 1000);
        }
    } catch (e) {
        console.error("Audio error:", e);
    }
  }, []);

  useEffect(() => {
     return () => {
         // Cleanup on unmount
         if (ambientRef.current) {
             try {
                ambientRef.current.osc1.stop();
                ambientRef.current.osc2.stop();
                ambientRef.current.ctx.close();
             } catch(e) {}
         }
     }
  }, []);

  return { playHover, playClick, playBoot, playAmbient };
}
