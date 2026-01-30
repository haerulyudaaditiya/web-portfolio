'use client';

import { motion } from 'framer-motion';

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0a]">
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-spin-slow-reverse"
                style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, #312e81, #000000, #312e81, #db2777, #312e81)'
                }}
            />
             <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        {/* 3D Grid Overlay */}
        <div 
            className="absolute inset-0 z-[1] opacity-30 mix-blend-overlay"
            style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
            }}
        />

        {/* Moving Spotlights */}
        <motion.div 
            animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen will-change-transform" 
        />
        
        <motion.div 
            animate={{ 
                x: [0, -100, 0],
                y: [0, 50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[120px] mix-blend-screen will-change-transform" 
        />
    </div>
  );
}
