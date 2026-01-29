'use client';

import { portfolioData } from '@/data/portfolio';
import SpotlightCard from './SpotlightCard';
import { 
    Code2, 
    Database, 
    Server, 
    Layout, 
    Smartphone, 
    Terminal, 
    Cpu, 
    Users, 
    Globe,
    Layers
} from 'lucide-react';
import useCyberSound from '@/hooks/useCyberSound';

const getSkillIcon = (category: string, name: string) => {
    // Specific Overrides
    if (name.includes('React') || name.includes('Vue')) return <Layout size={40} />;
    if (name.includes('Laravel') || name.includes('CodeIgniter')) return <Globe size={40} />;
    if (name.includes('SQL')) return <Database size={40} />;
    if (name.includes('Git') || name.includes('Linux')) return <Terminal size={40} />;
    
    // Category Fallbacks
    switch (category) {
        case 'Frontend': return <Layout size={40} />;
        case 'Backend': return <Server size={40} />;
        case 'Mobile': return <Smartphone size={40} />;
        case 'Database': return <Database size={40} />;
        case 'DevOps': return <Cpu size={40} />;
        case 'Soft Skills': return <Users size={40} />;
        default: return <Code2 size={40} />;
    }
};

export default function SkillsShowcase() {
  const { playHover } = useCyberSound();
  
  return (
    <section id="skills" className="py-40 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
                SYSTEM <span className="text-cyan-500">CAPABILITIES</span>
            </h2>
             <p className="text-neutral-300 max-w-md border-l-2 border-cyan-900 pl-4">
                Full-stack technical arsenal optimized for performance and scalability.
            </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {portfolioData.skills.map((skill, index) => {
                const Icon = getSkillIcon(skill.category, skill.name);
                
                return (
                    <SpotlightCard 
                        key={skill.name} 
                        className="group aspect-square flex flex-col justify-between p-6 bg-neutral-900/20 relative overflow-hidden"
                    >
                        
                        {/* Watermark Icon */}
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 rotate-12 text-white">
                            {getSkillIcon(skill.category, skill.name)}
                        </div>

                        {/* Main Icon */}
                        <div className="w-10 h-10 rounded-lg bg-cyan-900/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300">
                             {/* We clone the icon to resize it provided it is a valid element, otherwise we render a fallback 
                                 However, since getSkillIcon returns a JSX Element, we can't easily clone with new props in a simple way without React.cloneElement or just calling the icon component directly if we returned the component.
                                 To simplify, let's just re-render the icon logic or adjust the function to return the component. 
                                 
                                 Actually, let's keep it simple: the helper returns the Element with size=40. 
                                 For the small icon box, we want size=20. 
                                 Let's refactor the helper to return the Component, not the Element.
                             */}
                             {/* Refactored inline for simplicity: */}
                             <div className="scale-50">{Icon}</div>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors">{skill.name}</h4>
                            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{skill.category}</p>
                        </div>
                    </SpotlightCard>
                );
            })}
        </div>
      </div>
    </section>
  );
}