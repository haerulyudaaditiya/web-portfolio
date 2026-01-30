'use client';

import { useState } from 'react';
import { portfolioData, Project } from '@/data/portfolio';
import { ArrowUpRight, Trophy, X, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';
import useCyberSound from '@/hooks/useCyberSound';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectShowcase() {
  const { playHover, playClick } = useCyberSound();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <SectionHeading title="FEATURED PROJECTS" subtitle="Selected Work" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project) => (
            <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                onClick={() => { setSelectedProject(project); playClick(); }}
                className="cursor-pointer"
            >
                <SpotlightCard className="group h-full">
                    <div 
                        className="flex flex-col h-full bg-black/40 backdrop-blur-sm p-6"
                        onMouseEnter={playHover}
                    >
                        {/* Image */}
                        <motion.div layoutId={`image-${project.id}`} className="relative h-48 w-full mb-6 rounded-lg overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                            <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-transparent transition-colors z-10" />
                            <Image 
                                src={project.image} 
                                alt={project.title} 
                                fill 
                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            {project.highlight && (
                                <div className="absolute top-2 right-2 z-20 bg-cyan-500 text-black text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                                    <Trophy size={10} />
                                    {project.highlight}
                                </div>
                            )}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2 block">{project.type}</span>
                                    <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{project.title}</motion.h3>
                                </div>
                                <ArrowUpRight className="text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </div>

                            <p className="text-neutral-400 text-sm mb-6 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.slice(0, 3).map(t => (
                                        <span key={t} className="text-[10px] uppercase font-bold text-neutral-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />
                    
                    <motion.div 
                        layoutId={`card-${selectedProject.id}`}
                        className="w-full max-w-4xl bg-slate-950 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] relative z-10 flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white hover:text-cyan-400 rounded-full backdrop-blur-sm transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Modal Image */}
                        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                             <motion.div layoutId={`image-${selectedProject.id}`} className="w-full h-full">
                                <Image 
                                    src={selectedProject.image} 
                                    alt={selectedProject.title} 
                                    fill 
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:bg-gradient-to-r" />
                             </motion.div>
                        </div>

                        {/* Modal Content */}
                        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                            <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2 block">{selectedProject.type}</span>
                            <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{selectedProject.title}</motion.h3>

                            <p className="text-neutral-300 text-base leading-relaxed mb-8">
                                {selectedProject.description}
                            </p>

                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Key Results</h4>
                                <ul className="space-y-2">
                                    {selectedProject.results.map((result, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                                            <span className="text-cyan-500 mt-1">▹</span>
                                            {result}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedProject.tech.map(t => (
                                    <span key={t} className="px-3 py-1 rounded-full text-xs font-bold text-cyan-300 bg-cyan-950/30 border border-cyan-500/20">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95">
                                    <span>View Live Project</span>
                                    <ExternalLink size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
}