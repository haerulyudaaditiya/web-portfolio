'use client';

import { portfolioData } from '@/data/portfolio';
import { motion } from 'framer-motion';

export default function ExperienceTimeline() {
  return (
    <section className="py-40 px-6 relative z-10">
      <div className="container mx-auto max-w-4xl">
         <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-20">
            EXPERIENCE
        </h2>

        <div className="space-y-0 border-l border-white/20 pl-8 md:pl-16">
          {portfolioData.experiences.map((exp, index) => (
            <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pb-20 last:pb-0 group"
            >
                {/* Dot */}
                <div className="absolute -left-[39px] md:-left-[71px] top-2 w-3 h-3 bg-slate-950 border border-white rounded-full group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-300" />

                <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                    <span className="text-cyan-300 font-mono text-sm tracking-wide">{exp.company} — {exp.duration}</span>
                </div>
                
                <p className="text-neutral-300 text-lg max-w-2xl leading-relaxed">
                    {exp.description[0]}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((skill) => (
                    <span 
                        key={skill} 
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
