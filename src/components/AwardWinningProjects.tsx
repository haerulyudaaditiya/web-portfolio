import { portfolioData } from '@/data/portfolio';
import TiltCard from './TiltCard';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import useCyberSound from '@/hooks/useCyberSound';

export default function AwardWinningProjects() {
  const { playHover } = useCyberSound();

  return (
    <section id="projects" className="py-40 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6 text-white">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                DEPLOYED <span className="text-neutral-500">UNITS</span>
            </h2>
            <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Op. Status: Active</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {portfolioData.projects.map((project, index) => (
                <div key={project.id} onMouseEnter={playHover}>
                    <TiltCard className="group h-[600px] w-full bg-neutral-900/10 border border-white/5 relative overflow-hidden rounded-xl">
                        {/* Image Area */}
                        <div className="relative h-2/3 w-full overflow-hidden border-b border-white/5">
                            <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Image 
                                src={project.image} 
                                alt={project.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 translate-z-10">
                                <span className="text-xs font-mono text-white">{project.type}</span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 flex flex-col justify-between h-1/3 relative bg-[#020617]">
                            <div className="transform translate-z-20">
                                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                <p className="text-neutral-300 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                            </div>
                            
                            <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-2">
                                <div className="flex gap-2">
                                    {project.tech.slice(0, 3).map(t => (
                                        <span key={t} className="text-[10px] uppercase tracking-widest text-neutral-300 border border-neutral-700 px-2 py-1 rounded hover:border-cyan-500/50 hover:text-cyan-500 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <ArrowUpRight className="text-neutral-500 group-hover:text-cyan-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </div>
                        </div>
                    </TiltCard>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}