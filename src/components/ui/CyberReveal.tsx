'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberRevealProps {
    children: ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    delay?: number;
    className?: string;
}

export default function CyberReveal({ children, direction = 'left', delay = 0, className = "" }: CyberRevealProps) {
    const variants: Variants = {
        hidden: { 
            opacity: 0,
            clipPath: direction === 'left' ? 'inset(0 100% 0 0)' : 
                      direction === 'right' ? 'inset(0 0 0 100%)' :
                      direction === 'up' ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
            x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
        },
        visible: { 
            opacity: 1,
            clipPath: 'inset(0 0 0 0)',
            x: 0,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "circOut",
                delay: delay,
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants}
            className={`relative ${className}`}
        >
            {children}
            {/* Scanning Line Effect */}
            <motion.div 
                initial={{ left: direction === 'left' ? '0%' : '100%', opacity: 1 }}
                whileInView={{ left: direction === 'left' ? '100%' : '0%', opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: delay }}
                className="absolute top-0 bottom-0 w-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] z-20"
            />
        </motion.div>
    );
}
