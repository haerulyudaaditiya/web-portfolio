'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import { useRef, useState } from 'react';
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

// ... (previous imports and Hologram component remain same, just updating the HeroSection export)

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
      <div className="z-10 text-center px-4 mix-blend-screen select-none">
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
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

            <div 
                className="flex flex-col items-center gap-0 leading-[0.85] cursor-default"
                onMouseEnter={playHover}
            >
                <h1 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900/50">
                    <GlitchText text="HAERUL YUDA" />
                </h1>
                <h1 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900/50">
                    <GlitchText text="ADITIYA" />
                </h1>
            </div>
            
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 max-w-lg mx-auto"
        >
            <p className="text-sm md:text-base font-mono text-cyan-500/60 leading-relaxed uppercase tracking-widest">
                Full Stack Architecture <span className="text-cyan-500">•</span> Digital Systems <span className="text-cyan-500">•</span> UI/UX
            </p>
        </motion.div>

        {/* Floating Code Fragments */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
                { text: "<div>", top: "20%", left: "10%", delay: 0 },
                { text: "const active = true;", top: "30%", right: "15%", delay: 2 },
                { text: "npm run build", bottom: "25%", left: "20%", delay: 4 },
                { text: "git push origin main", top: "15%", right: "30%", delay: 1 },
                { text: "return 0;", bottom: "30%", right: "10%", delay: 3 },
                { text: "sudo apt-get update", top: "60%", left: "5%", delay: 5 },
                { text: "console.log('Hello');", bottom: "10%", right: "20%", delay: 2.5 },
            ].map((item, i) => (
                <motion.div
                    key={i}
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
                    className="absolute text-cyan-500/20 font-mono text-xs md:text-sm whitespace-nowrap"
                    style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                >
                    {item.text}
                </motion.div>
            ))}
        </div>

      </div>
      
    </section>
  );
}