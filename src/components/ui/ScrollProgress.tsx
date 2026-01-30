'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-white/5 origin-left">
        <motion.div
            className="h-full bg-cyan-500 origin-left"
            style={{ scaleX }}
        />
        <motion.div 
            className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-cyan-400 to-transparent opacity-50"
            style={{ scaleX, transformOrigin: "left" }}
        />
    </div>
  );
}
