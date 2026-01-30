'use client';

import { portfolioData } from '@/data/portfolio';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';
import useCyberSound from '@/hooks/useCyberSound';

export default function SkillsShowcase() {
  const { playHover } = useCyberSound();
  
  // Group skills by category
  const categories = Array.from(new Set(portfolioData.skills.map(s => s.category)));

  return (
    <section id="skills" className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <SectionHeading title="SYSTEM CAPABILITIES" subtitle="Technical Arsenal" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <SpotlightCard key={category} className="bg-black/20">
                <div 
                    className="p-8 h-full"
                    onMouseEnter={playHover}
                >
                    <h3 className="text-xl font-bold text-cyan-400 mb-6 font-mono border-b border-white/10 pb-4">
                        {category}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                        {portfolioData.skills.filter(s => s.category === category).map(skill => (
                            <div key={skill.name} className="relative group/skill">
                                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-neutral-300 group-hover/skill:text-white group-hover/skill:border-cyan-500/50 group-hover/skill:bg-cyan-500/10 transition-all cursor-default">
                                    {skill.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}