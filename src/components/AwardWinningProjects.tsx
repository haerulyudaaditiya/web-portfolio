'use client';

import { portfolioData } from '@/data/portfolio';
import { ArrowUpRight, Trophy } from 'lucide-react';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';
import useCyberSound from '@/hooks/useCyberSound';

export default function ProjectShowcase() {
  const { playHover } = useCyberSound();

  return (
    <section id="projects" className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <SectionHeading title="FEATURED PROJECTS" subtitle="Selected Work" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, i) => (
            <SpotlightCard key={project.id} className="group">
                <div 
                    className="flex flex-col h-full bg-black/40 backdrop-blur-sm p-6"
                    onMouseEnter={playHover}
                >
                    {/* Image */}
                    <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-colors">
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
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2 block">{project.type}</span>
                                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{project.title}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
}