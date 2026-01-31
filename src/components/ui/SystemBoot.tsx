'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCyberSound from '@/hooks/useCyberSound';

const BOOT_LOGS = [
  "BIOS DATE 01/01/2077 04:20:00 VER 1.0.2",
  "CPU: QUANTUM CORE i9-12900K @ 9.0GHz [DETECTED]",
  "MEM: 64TB OPTICAL NEURAL MEMORY [OK]",
  "GPU: RTX 9090 ti [DETECTED]",
  "LOADING KERNEL MODULES... [OK]",
  "MOUNTING VIRTUAL FILE SYSTEM...",
  "........................................",
  "INIT: ENTERING RUNLEVEL 5",
  "STARTING SYSTEM SERVICES...",
  "[OK] NETWORK MANAGER",
  "[OK] AUDIO SUBSYSTEM",
  "[OK] NEURAL INTERFACE",
  "ESTABLISHING SECURE CONNECTION...",
  "ENCRYPTING TRAFFIC... [DONE]",
  "USER AUTHENTICATED: VISITOR",
  "ACCESS GRANTED.",
  "WELCOME TO THE GRID."
];

export default function SystemBoot() {
  const [stage, setStage] = useState<'off' | 'turning_on' | 'booting' | 'on' | 'turning_off'>('off');
  const [lines, setLines] = useState<string[]>([]);
  const { playClick, playAmbient } = useCyberSound();

  useEffect(() => {
    // START SEQUENCE
    const startTimeout = setTimeout(() => {
      setStage('turning_on');
      playAmbient(true); // Drone sound
    }, 500);

    const bootTimeout = setTimeout(() => {
      setStage('booting');
    }, 1200);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(bootTimeout);
    };
  }, [playAmbient]);

  useEffect(() => {
    if (stage === 'booting') {
      let delay = 0;
      const timeouts: NodeJS.Timeout[] = [];

      BOOT_LOGS.forEach((line, index) => {
        // Slower, more readable typing
        const lineDelay = Math.random() * 400 + 100;
        delay += lineDelay;

        const t = setTimeout(() => {
          setLines(p => [...p, line]);
          playClick();
          window.scrollTo(0, document.body.scrollHeight);
        }, delay);
        timeouts.push(t);
      });

      // Exit sequence matches log end
      const exitTimeout = setTimeout(() => {
        setStage('turning_off');
      }, delay + 1000); // Read time for last line
      timeouts.push(exitTimeout);

      return () => timeouts.forEach(clearTimeout);
    }
  }, [stage, playClick]);

  // Remove component after exit animation + small buffer
  if (stage === 'turning_off') {
     setTimeout(() => {
         // Logic to unmount if needed, but AnimatePresence handles visual removal.
         // This is handled by parent/layout effectively just hidding it visually.
     }, 1000); 
  }

  return (
    <AnimatePresence>
      {stage !== 'turning_off' && (
      <motion.div
        className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.5 } }} // Fade out black background late
      >
        <motion.div
           initial={{ scaleX: 0.001, scaleY: 0.002, filter: "brightness(50)" }}
           animate={
             stage === 'turning_on' || stage === 'booting' ? {
               scaleX: [0.001, 1, 1],
               scaleY: [0.002, 0.002, 1],
               filter: ["brightness(50)", "brightness(20)", "brightness(1)"],
             } : {}
           }
           exit={{
             scaleY: [1, 0.002, 0.002],
             scaleX: [1, 1, 0],
             filter: "brightness(50)", // Bright flash on close
             transition: { duration: 0.4, times: [0, 0.4, 1] }
           }}
           transition={{ 
             duration: 0.8, 
             times: [0, 0.4, 1],
             ease: "circOut"
           }}
           className="w-full h-full bg-[#050505] relative flex flex-col p-10 md:p-20 font-mono text-green-500 shadow-[inset_0_0_100px_rgba(0,0,0,1)]"
        >
            {/* CRT Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,transparent_90%)] pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-30 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 animate-pulse opacity-5 pointer-events-none bg-white mix-blend-overlay" />

            {/* Content Container */}
            <div className="max-w-4xl w-full mx-auto mt-auto flex flex-col gap-1 relative z-10 pb-10">
                {lines.map((line, i) => (
                    <motion.div 
                        key={i}
                        className={`${i === lines.length - 1 ? 'text-green-400 font-bold drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'text-green-700'} text-sm md:text-xl tracking-wider`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {line}
                    </motion.div>
                ))}
                {stage === 'booting' && (
                    <div className="h-5 w-3 bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                )}
            </div>

        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
