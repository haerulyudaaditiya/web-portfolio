'use client';

import { useEffect, useRef, useState } from 'react';
import { useTerminalStore } from '@/store/useTerminalStore';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS: Record<string, string | (() => string)> = {
  help: 'Available commands: help, clear, about, skills, projects, contact, experience, hire, secret, game, rickroll',
  clear: 'Clears the terminal history.',
  about: () => `Role: ${portfolioData.profile.role}\nGPA: ${portfolioData.profile.gpa}\nBio: ${portfolioData.profile.bio}`,
  skills: () => portfolioData.skills.map(s => `- ${s.name} (${s.category})`).join('\n'),
  projects: () => portfolioData.projects.map(p => `- ${p.title}: ${p.description} [${p.highlight || ''}]`).join('\n\n'),
  contact: () => `Email: ${portfolioData.profile.email}\nWhatsApp: ${portfolioData.profile.social.whatsapp}\nLinkedIn: ${portfolioData.profile.social.linkedin}`,
  experience: () => portfolioData.experiences.map(e => `[${e.duration}] ${e.role} at ${e.company}`).join('\n'),
  // Easter Eggs
  hire: () => `\n🎉 CONGRATULATIONS! You've unlocked the secret hiring portal!\n\n→ Send me an email: ${portfolioData.profile.email}\n→ Or WhatsApp: ${portfolioData.profile.social.whatsapp}\n\nI'm available for freelance projects and full-time opportunities!\n`,
  secret: () => `\n🤫 You found a secret!\n\nFun Facts about Haerul:\n- ☕ Runs on coffee and code\n- 🎮 Gamer by night\n- 📚 Lifelong learner\n- 🏆 National Award Winner\n`,
  game: () => `\n🎮 MINI GAME: Guess the Number (1-10)\n\nType "guess [number]" to play!\n(Hint: The answer is always 7... or is it? 😉)\n`,
  rickroll: () => `\n🎵 Never gonna give you up...\n🎵 Never gonna let you down...\n🎵 Never gonna run around and desert you!\n\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ\n\nYou've been rickrolled! 😂\n`,
  guess: () => `\n🎉 YOU WIN! (Not really, I just let everyone win)\n\nThanks for playing! Now go hire me. 😄\n`,
  sudo: () => `\n🔒 Permission denied.\n\nNice try, but you're not root here.\nTry 'hire' instead - that's a command I'll definitely accept! 💼\n`,
};

export default function Terminal() {
  const { isOpen, setIsOpen, history, addHistory, clearHistory, currentInput, setCurrentInput } = useTerminalStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      clearHistory();
    } else if (trimmedCmd in COMMANDS) {
      const output = typeof COMMANDS[trimmedCmd as keyof typeof COMMANDS] === 'function' 
        ? (COMMANDS[trimmedCmd as keyof typeof COMMANDS] as Function)() 
        : COMMANDS[trimmedCmd as keyof typeof COMMANDS];
      
      addHistory(`$ ${cmd}`);
      addHistory(output);
    } else if (trimmedCmd !== '') {
      addHistory(`$ ${cmd}`);
      addHistory(`Command not found: ${trimmedCmd}. Type 'help' for available commands.`);
    } else {
        addHistory(`$ `);
    }
    setCurrentInput('');
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
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-5 right-5 z-50 p-3 bg-black text-green-500 rounded-full shadow-lg border border-green-500 hover:bg-green-900 transition-all active:scale-95"
            title="Toggle Hacker Terminal"
        >
            <TerminalIcon size={24} />
        </button>

        <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            >
            <div className="w-full max-w-3xl h-[80vh] bg-black border border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.2)] rounded-lg flex flex-col font-mono text-green-500 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-green-800 bg-gray-900">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-sm opacity-70">user@portfolio:~</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:text-white">
                    <X size={20} />
                </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-sm md:text-base space-y-2" onClick={() => inputRef.current?.focus()}>
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words leading-snug">
                    {line}
                    </div>
                ))}
                
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-300">$</span>
                    <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-green-500 placeholder-green-800"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    />
                </div>
                <div ref={bottomRef} />
                </div>
            </div>
            </motion.div>
        )}
        </AnimatePresence>
    </>
  );
}
