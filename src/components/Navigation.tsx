'use client';

import { useTerminalStore } from '@/store/useTerminalStore';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import useCyberSound from '@/hooks/useCyberSound';

export default function Navigation() {
  const { toggleOpen } = useTerminalStore();
  const { playHover, playClick } = useCyberSound();

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl shadow-cyan-900/20"
        >
            <a 
                href="#" 
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-6 py-2 rounded-full hover:bg-white/10 text-xs font-bold text-white uppercase tracking-widest transition-colors"
            >
                Home
            </a>
            <a 
                href="#projects" 
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-6 py-2 rounded-full hover:bg-white/10 text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
            >
                Work
            </a>
            <a 
                href="#skills" 
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-6 py-2 rounded-full hover:bg-white/10 text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
            >
                Skills
            </a>
            <button 
                onClick={() => { toggleOpen(); playClick(); }}
                onMouseEnter={playHover}
                className="ml-2 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
            >
                <Terminal size={12} />
            </button>
        </motion.nav>
    </div>
  );
}