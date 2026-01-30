'use client';

import { portfolioData } from '@/data/portfolio';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-40 px-6 relative z-10">
      <div className="container mx-auto max-w-4xl">
         <SectionHeading title="MISSION HISTORY" subtitle="Professional Experience" className="mb-20" />

        <div className="space-y-8 border-l border-white/20 pl-8 md:pl-16">
          {portfolioData.experiences.map((exp, index) => (
            <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
            >
                {/* Dot */}
                <div className="absolute -left-[39px] md:-left-[71px] top-8 w-3 h-3 bg-slate-950 border border-white rounded-full group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-300 z-10" />

                <SpotlightCard>
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                            <span className="text-cyan-300 font-mono text-sm tracking-wide">{exp.company} — {exp.duration}</span>
                        </div>
                        
                        <p className="text-neutral-300 text-lg max-w-2xl leading-relaxed mb-6">
                            {exp.description[0]}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {exp.tech.map((skill) => (
                                <span 
                                    key={skill} 
                                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-neutral-400 border border-white/10 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
