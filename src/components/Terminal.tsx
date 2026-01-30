'use client';

import { useEffect, useRef, useState } from 'react';
import { useTerminalStore } from '@/store/useTerminalStore';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import useCyberSound from '@/hooks/useCyberSound';

const COMMANDS: Record<string, string | (() => string)> = {
  help: 'Available commands: help, clear, about, skills, projects, contact, experience, hire, secret, game, rickroll',
  clear: 'Clears the terminal history.',
  about: () => `Role: ${portfolioData.profile.role}\nGPA: ${portfolioData.profile.gpa}\nBio: ${portfolioData.profile.bio}`,
  skills: () => portfolioData.skills.map(s => `- ${s.name} (${s.category})`).join('\n'),
  projects: () => portfolioData.projects.map(p => `- ${p.title}: ${p.description} [${p.highlight || ''}]`).join('\n\n'),
  contact: () => `Email: ${portfolioData.profile.email}\nWhatsApp: ${portfolioData.profile.social.whatsapp}\nLinkedIn: ${portfolioData.profile.social.linkedin}`,
  experience: () => portfolioData.experiences.map(e => `[${e.duration}] ${e.role} at ${e.company}`).join('\n'),
  hire: () => `\n🎉 CONGRATULATIONS! You've unlocked the secret hiring portal!\n\n→ Send me an email: ${portfolioData.profile.email}\n→ Or WhatsApp: ${portfolioData.profile.social.whatsapp}\n\nI'm available for freelance projects and full-time opportunities!\n`,
  secret: () => `\n🤫 You found a secret!\n\nFun Facts about Haerul:\n- ☕ Runs on coffee and code\n- ⛰️ Mountain Climber & Runner\n- 📚 Lifelong learner\n`,
  game: () => `\n🎮 STARTING GAME SEQUENCE...\n`,
  rickroll: () => `\n🎵 Never gonna give you up...\n🎵 Never gonna let you down...\n🎵 Never gonna run around and desert you!\n\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ\n\nYou've been rickrolled! 😂\n`,
  guess: () => `\n🎉 YOU WIN! (Not really, I just let everyone win)\n\nThanks for playing! Now go hire me. 😄\n`,
  sudo: () => `\n🔒 Permission denied.\n\nNice try, but you're not root here.\nTry 'hire' instead - that's a command I'll definitely accept! 💼\n`,
};

export default function Terminal() {
  const { isOpen, setIsOpen, history, addHistory, clearHistory, currentInput, setCurrentInput } = useTerminalStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover, playAmbient } = useCyberSound();
  const [isMaximized, setIsMaximized] = useState(false);
  const [isAmbient, setIsAmbient] = useState(false);

  useEffect(() => {
    playAmbient(isAmbient);
  }, [isAmbient, playAmbient]);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isOpen, isMaximized]);

  // Game State
  const [gameMode, setGameMode] = useState<'idle' | 'guess'>('idle');
  const [targetNumber, setTargetNumber] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.toLowerCase().trim();
    setCurrentInput('');
    addHistory(`$ ${cmd}`);
    playClick();

    // GAME MODE LOGIC
    if (gameMode === 'guess') {
        const guess = parseInt(trimmedCmd);
        
        if (trimmedCmd === 'exit' || trimmedCmd === 'quit') {
            setGameMode('idle');
            addHistory('Game exited.');
            return;
        }

        if (isNaN(guess)) {
            addHistory('Please enter a valid number or type "exit".');
            return;
        }

        setAttempts(prev => prev + 1);

        if (guess === targetNumber) {
            addHistory(`🎉 CORRECT! The number was ${targetNumber}.`);
            addHistory(`You got it in ${attempts + 1} attempts!`);
            addHistory(`Rank: ${attempts < 3 ? 'CYBER WIZARD 🧙‍♂️' : attempts < 6 ? 'ELITE HACKER 👨‍💻' : 'SCRIPT KIDDIE 👶'}`);
            setGameMode('idle');
        } else if (guess < targetNumber) {
            addHistory('Too low! Try higher. ↑');
        } else {
            addHistory('Too high! Try lower. ↓');
        }
        return;
    }

    // NORMAL MODE COMMANDS
    if (trimmedCmd === 'game') {
        setGameMode('guess');
        const num = Math.floor(Math.random() * 100) + 1;
        setTargetNumber(num);
        setAttempts(0);
        addHistory('🎮 INIT GAME_SEQUENCE: GUESS_THE_NUMBER');
        addHistory('I have selected a number between 1 and 100.');
        addHistory('Type your guess or "exit" to quit.');
        return;
    }

    if (trimmedCmd === 'clear') {
      clearHistory();
    } else if (trimmedCmd in COMMANDS) {
      const output = typeof COMMANDS[trimmedCmd as keyof typeof COMMANDS] === 'function' 
        ? (COMMANDS[trimmedCmd as keyof typeof COMMANDS] as Function)() 
        : COMMANDS[trimmedCmd as keyof typeof COMMANDS];
      
      addHistory(output);
    } else if (trimmedCmd !== '') {
      addHistory(`Command not found: ${trimmedCmd}. Type 'help' for available commands.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    }
  };

  // Keyboard shortcut (Ctrl + `)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <>
        {/* Floating Trigger Button */}
        <AnimatePresence>
            {!isOpen && (
                <motion.button 
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    onClick={() => { setIsOpen(true); playClick(); }}
                    onMouseEnter={playHover}
                    className="fixed bottom-5 right-5 z-50 p-4 bg-black/80 backdrop-blur text-green-500 rounded-full shadow-[0_0_20px_rgba(0,255,0,0.3)] border border-green-500 hover:bg-green-900/30 transition-all hover:scale-110 active:scale-95 group"
                    title="Open Terminal (Ctrl + `)"
                >
                    <TerminalIcon size={24} className="group-hover:animate-pulse" />
                </motion.button>
            )}
        </AnimatePresence>

        <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center">
                <motion.div 
                    drag={!isMaximized}
                    dragMomentum={false}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        width: isMaximized ? '100vw' : '800px',
                        height: isMaximized ? '100vh' : '600px',
                        borderRadius: isMaximized ? 0 : '0.5rem'
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="pointer-events-auto bg-black/95 border border-green-500/50 shadow-[0_0_50px_rgba(0,255,0,0.15)] flex flex-col font-mono text-green-500 overflow-hidden relative"
                >
                    {/* Header */}
                    <div 
                        className="flex items-center justify-between px-4 py-3 border-b border-green-800/50 bg-neutral-900/90 cursor-grab active:cursor-grabbing backdrop-blur select-none"
                    >
                        <div className="flex items-center gap-2">
                             <TerminalIcon size={14} className="text-green-500" />
                             <span className="text-xs font-bold tracking-widest opacity-80">R00T@SYSTEM:~</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setIsMaximized(!isMaximized)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                                {isMaximized ? <Minus size={14} /> : <Square size={12} />}
                            </button>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div 
                        className="flex-1 p-6 overflow-y-auto font-mono text-sm md:text-base space-y-2 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent" 
                        onClick={() => inputRef.current?.focus()}
                    >
                        {/* Welcome Message */}
                        <div className="mb-6 text-green-400/80 text-xs leading-relaxed">
                            <p>CONNECTED TO SECURE SHELL (SSH)</p>
                            <p>LAST LOGIN: {new Date().toUTCString()}</p>
                            <p>TYPE 'help' FOR AVAILABLE COMMANDS.</p>
                        </div>

                        {history.map((line, i) => (
                            <div key={i} className="whitespace-pre-wrap break-words leading-relaxed text-green-300">
                                {line}
                            </div>
                        ))}
                        
                        <div className="flex items-center gap-3 mt-4 group">
                            <span className="text-green-500 font-bold">$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-800 font-bold caret-green-500"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </div>
                        <div ref={bottomRef} />
                    </div>

                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[url('/scanline.png')] opacity-5 mix-blend-overlay" />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-green-900/5" />
                </motion.div>
            </div>
        )}
        </AnimatePresence>
    </>
  );
}
