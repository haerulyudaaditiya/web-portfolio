'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function Hologram(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    // Generate points on a sphere surface (Hologram style)
    const count = 4000;
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2 + (Math.random() * 0.1); // Radius with slight jitter

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
  });

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} {...props}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f3ff" // Cyan Hologram color
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

import GlitchText from './GlitchText';
import useCyberSound from '@/hooks/useCyberSound';
import CyberReveal from './ui/CyberReveal';

// ... (previous imports and Hologram component remain same, just updating the HeroSection export)

// Parallax Helper Components
function MouseParallaxContainer({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        setMousePos({ x, y });
    };

    return (
        <div ref={ref} onMouseMove={handleMouseMove} className={className}>
            <MouseParallaxContext.Provider value={mousePos}>
                {children}
            </MouseParallaxContext.Provider>
        </div>
    );
}

const MouseParallaxContext = React.createContext({ x: 0, y: 0 });

function ParallaxItem({ children, depth = 0.1, className, style }: { children: React.ReactNode, depth?: number, className?: string, style?: React.CSSProperties }) {
    const { x, y } = React.useContext(MouseParallaxContext);
    
    return (
        <motion.div 
            className={className}
            style={style}
            animate={{ x: x * depth * 50, y: y * depth * 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}

export default function HeroSection() {
  const { playHover } = useCyberSound();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
          <Hologram />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="z-10 text-center px-4 select-none relative">
        
        <CyberReveal 
            direction="left"
            className="flex flex-col items-center"
        >
            <div className="mb-6 px-4 py-1 border border-cyan-500/30 bg-cyan-500/10 rounded-full backdrop-blur-md">
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    System Online
                </span>
            </div>

        </CyberReveal>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center gap-0 leading-none cursor-default py-4 max-w-full"
                onMouseEnter={playHover}
            >
                <h1 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-b md:from-white md:via-cyan-100 md:to-cyan-900/50">
                    <GlitchText text="HAERUL YUDA" delay={500} />
                </h1>
                <h1 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-b md:from-white md:via-cyan-100 md:to-cyan-900/50 mt-1 md:mt-0">
                    <GlitchText text="ADITIYA" delay={1500} />
                </h1>
            </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 max-w-lg mx-auto"
        >
            <p className="text-sm md:text-base font-mono text-cyan-500/60 leading-relaxed uppercase tracking-widest">
                Full Stack Architecture <span className="text-cyan-500">•</span> Digital Systems
            </p>
        </motion.div>

        {/* Floating Code Fragments with Parallax */}
        <MouseParallaxContainer className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
                { text: "<div>", top: "20%", left: "10%", delay: 0, depth: 0.1 },
                { text: "const active = true;", top: "30%", right: "15%", delay: 2, depth: 0.2 },
                { text: "npm run build", bottom: "25%", left: "20%", delay: 4, depth: 0.15 },
                { text: "git push origin main", top: "15%", right: "30%", delay: 1, depth: 0.3 },
                { text: "return 0;", bottom: "30%", right: "10%", delay: 3, depth: 0.1 },
                { text: "sudo apt-get update", top: "60%", left: "5%", delay: 5, depth: 0.25 },
                { text: "console.log('Hello');", bottom: "10%", right: "20%", delay: 2.5, depth: 0.15 },
            ].map((item, i) => (
                <ParallaxItem key={i} depth={item.depth} className="absolute" style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ 
                            opacity: [0, 0.4, 0], 
                            y: -50,
                            rotate: [0, Math.random() * 10 - 5, 0]
                        }}
                        transition={{ 
                            duration: 8 + Math.random() * 5, 
                            repeat: Infinity, 
                            delay: item.delay,
                            ease: "linear"
                        }}
                        className="text-cyan-500/20 font-mono text-xs md:text-sm whitespace-nowrap"
                    >
                        {item.text}
                    </motion.div>
                </ParallaxItem>
            ))}
        </MouseParallaxContainer>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-[0.2em] animate-pulse">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/0 relative overflow-hidden">
                <motion.div 
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400 blur-[1px]"
                />
            </div>
        </motion.div>

      </div>
      
    </section>
  );
}