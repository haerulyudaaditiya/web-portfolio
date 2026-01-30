'use client';

import { Home, User, Briefcase, Cpu, Zap, Mail, Terminal, FileText } from 'lucide-react';
import { useTerminalStore } from '@/store/useTerminalStore';
import { motion } from 'framer-motion';
import useCyberSound from '@/hooks/useCyberSound';
import Magnetic from "@/components/ui/Magnetic";

export default function Navigation() {
  const { toggleOpen } = useTerminalStore();
  const { playHover, playClick } = useCyberSound();

  const navItems = [
    { name: 'Home', link: '#', icon: Home },
    { name: 'About', link: '#philosophy', icon: User },
    { name: 'Work', link: '#projects', icon: Briefcase },
    { name: 'Skills', link: '#skills', icon: Zap },
    { name: 'Experience', link: '#experience', icon: FileText },
    { name: 'Contact', link: '#contact', icon: Mail },
  ];

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex justify-center w-full pointer-events-none">
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl shadow-cyan-900/20 ring-1 ring-white/5"
        >
            {navItems.map((item) => (
                <Magnetic key={item.name}>
                    <a 
                        href={item.link}
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="group relative p-3 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center"
                        aria-label={item.name}
                    >
                        <item.icon size={20} strokeWidth={1.5} className="relative z-10 transition-transform group-hover:scale-110" />
                        
                        {/* Tooltip */}
                        <span className="absolute top-14 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {item.name}
                        </span>
                        
                        {/* Active Glow */}
                        <span className="absolute inset-0 bg-cyan-500/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </a>
                </Magnetic>
            ))}

            <div className="w-[1px] h-8 bg-white/10 mx-1" />

            <Magnetic>
                <button 
                    onClick={() => { toggleOpen(); playClick(); }}
                    onMouseEnter={playHover}
                    className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all group relative"
                    aria-label="Terminal"
                >
                    <Terminal size={20} strokeWidth={1.5} />
                    <span className="absolute top-14 left-1/2 -translate-x-1/2 bg-cyan-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-100 text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Terminal
                    </span>
                </button>
            </Magnetic>
        </motion.nav>
    </div>
  );
}