'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import CyberCore from './CyberCore';

export default function ValueProposition() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="philosophy" ref={containerRef} className="py-40 text-white px-6 md:px-12 border-t border-white/10 relative overflow-hidden z-10">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/10 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full opacity-20" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            
            {/* Left Content (Text) */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex items-center gap-2 mb-8">
                    <span className="w-12 h-[1px] bg-cyan-500" />
                    <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Philosophy</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight relative z-20">
                    I DON'T JUST WRITE CODE. <br />
                    I ENGINEER <span className="italic text-cyan-400 font-bold">SOLUTIONS</span>.
                </h2>
                
                <div className="mt-12 flex flex-col gap-12">
                    {[
                        { title: "Precision", desc: "Pixel-perfect implementation of complex designs." },
                        { title: "Performance", desc: "Optimized for speed, SEO, and scalability." },
                        { title: "Impact", desc: "Focus on business metrics and user conversion." }
                    ].map((v, i) => (
                        <motion.div 
                            key={v.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            className="border-t border-white/20 pt-6"
                        >
                            <h3 className="text-2xl font-bold mb-2 text-white">{v.title}</h3>
                            <p className="text-neutral-300 text-lg max-w-md">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            
            {/* Right Content (3D Core) */}
            <motion.div 
                style={{ y }}
                className="h-[500px] w-full hidden md:block"
            >
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <CyberCore />
                </Canvas>
            </motion.div>
        </div>
      </div>
    </section>
  );
}