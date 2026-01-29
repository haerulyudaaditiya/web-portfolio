'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

export default function GlitchText({ text, className = "" }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
        setDisplayText(text);
        return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
        setDisplayText(prev => 
            text.split("").map((letter, index) => {
                if (index < iterations) {
                    return text[index];
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join("")
        );

        if (iterations >= text.length) {
            clearInterval(interval);
        }

        iterations += 1 / 2; // Speed control
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  // Initial load effect
  useEffect(() => {
      setIsHovered(true);
      const timeout = setTimeout(() => setIsHovered(false), 1000); // Reset after 1s
      return () => clearTimeout(timeout);
  }, []);

  return (
    <span 
        className={`inline-block truncate ${className}`}
        onMouseEnter={() => setIsHovered(true)}
    >
        {displayText}
    </span>
  );
}
