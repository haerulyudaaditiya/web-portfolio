'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
const CYBER_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const ALL_CHARS = CHARS + CYBER_CHARS;

export default function GlitchText({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [iterations, setIterations] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initial Animation
    const timer = setTimeout(() => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 800);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isHovered && iterations === 0) {
        setDisplayText(text.split(""));
        return;
    }

    const interval = setInterval(() => {
        if (iterations >= text.length) {
            clearInterval(interval);
            setIterations(0);
            setIsHovered(false);
            setDisplayText(text.split(""));
            return;
        }

        setDisplayText(prev => 
            text.split("").map((letter, index) => {
                if (index < iterations) {
                    return text[index];
                }
                return ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
            })
        );

        setIterations(prev => prev + 1/3); // Slower, more deliberate speed
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text, iterations]);

  return (
    <span 
        className={`inline-block whitespace-nowrap cursor-default ${className}`}
        onMouseEnter={() => { setIsHovered(true); setIterations(0); }}
    >
        {displayText.map((char, i) => (
             <motion.span 
                key={i} 
                className={`inline-block ${i < iterations ? "text-white" : "text-cyan-500/80"} ${char === " " ? "w-[0.3em]" : ""}`}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
    </span>
  );
}
