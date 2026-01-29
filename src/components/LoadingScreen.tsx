'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCyberSound from '@/hooks/useCyberSound';

const bootSequence = [
  "INITIALIZING...",
  "LOADING KERNEL MODULES...",
  "> CHECKING CPU... OK",
  "> CHECKING MEMORY... OK",
  "> LOADING 3D ASSETS... OK",
  "> ESTABLISHING NEURAL LINK...",
  "ACCESS GRANTED.",
  "WELCOME, GUEST USER.",
  "STARTING INTERFACE..."
];

export default function LoadingScreen() {
  const [textIndex, setTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { playBoot } = useCyberSound();

  useEffect(() => {
    if (textIndex >= bootSequence.length) {
      playBoot();
      setTimeout(() => setIsComplete(true), 1000);
      return;
    }

    const timeout = setTimeout(() => {
      setTextIndex(prev => prev + 1);
    }, 300); // Speed of text scrolling

    return () => clearTimeout(timeout);
  }, [textIndex]);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 text-cyan-500 font-mono text-xs md:text-sm p-8 md:p-12 overflow-hidden flex flex-col justify-end pointer-events-none">
      <div className="max-w-xl">
        {bootSequence.slice(0, textIndex + 1).map((line, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2"
          >
            <span className="opacity-50 mr-2">{index < 10 ? `0${index}` : index}</span>
            {line}
          </motion.div>
        ))}
        <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="w-2 h-4 bg-cyan-500 inline-block align-middle ml-2"
        />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 z-[-1] opacity-10" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}