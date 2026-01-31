'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Award, ExternalLink, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Image from 'next/image';

export default function CertificateShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filters = ['all', 'dicoding', 'codepolitan', 'professional'];

  const filteredCertificates = portfolioData.certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'dicoding' && cert.issuer.includes('Dicoding')) ||
                         (filter === 'codepolitan' && cert.issuer.includes('Codepolitan')) ||
                         (filter === 'professional' && !cert.issuer.includes('Dicoding') && !cert.issuer.includes('Codepolitan'));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="certificates" className="py-40 px-6 relative z-10">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
                    VERIFIED <span className="text-cyan-500">CREDENTIALS</span>
                </h2>
                <p className="text-neutral-300 max-w-xl">
                    Industry-recognized certifications validating technical proficiency.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all border ${
                      filter === f
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                        : 'bg-transparent border-neutral-700 text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    {f}
                  </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => (
            <SpotlightCard key={cert.id} className="group flex flex-col h-full bg-neutral-900/20">
                
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden border-b border-white/5 bg-neutral-900">
                     <Image 
                        src={cert.image} 
                        alt={cert.title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
                        <span className="text-[10px] font-mono text-cyan-400">{cert.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Award className="w-4 h-4 text-cyan-500" />
                            <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">{cert.issuer}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {cert.title}
                        </h3>
                         <p className="text-xs text-neutral-400 font-mono mb-6">
                            ID: {cert.credentialId || 'VERIFIED'}
                        </p>
                    </div>

                    <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors"
                    >
                        View Credential <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}