'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useCyberSound from '@/hooks/useCyberSound';

const bootSequence = [
  "INITIALIZING SECURE CONNECTION...",
  "LOADING KERNEL MODULES [OK]",
  "DECRYPTING PORTFOLIO DATA...",
  "OPTIMIZING NEURAL NETWORK...",
  "ACCESS GRANTED."
];

export default function LoadingScreen() {
  const [currentLine, setCurrentLine] = useState(0);
  const [complete, setComplete] = useState(false);
  const { playBoot } = useCyberSound();

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 400 + Math.random() * 400);
      return () => clearTimeout(timeout);
    } else {
       playBoot();
       setTimeout(() => setComplete(true), 800);
    }
  }, [currentLine]);

  if (complete) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-cyan-500 text-sm md:text-base">
        <div className="w-full max-w-md p-8">
            {bootSequence.slice(0, currentLine + 1).map((line, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-2 flex justify-between"
                >
                    <span>{`> ${line}`}</span>
                    {i === currentLine && <span className="animate-pulse">_</span>}
                </motion.div>
            ))}
            
            {/* Loading Bar */}
            <div className="mt-8 h-1 w-full bg-cyan-900 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                />
            </div>
            
             <p className="mt-2 text-xs text-neutral-500 text-right">SYSTEM V.2.0.45</p>
        </div>
    </div>
  );
}