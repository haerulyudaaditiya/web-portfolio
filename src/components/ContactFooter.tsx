import { portfolioData } from '@/data/portfolio';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import CyberGlobe from './CyberGlobe';
import Magnetic from './ui/Magnetic';

export default function ContactFooter() {
  return (
    <footer id="contact" className="text-white py-20 px-6 border-t border-white/5 relative overflow-hidden z-10">
        
        {/* 3D Global Network */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
             <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <CyberGlobe />
             </Canvas>
        </div>
        
        {/* Static Glow Backup */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10">
            
            {/* Top Section: CTA & Branding (Centered) */}
            <div className="flex flex-col items-center text-center mb-20">
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                    Available for New Projects
                </div>

                <h2 className="text-3xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 leading-tight">
                    HAVE A PROJECT?<br/> LET'S WORK TOGETHER.
                </h2>

                <Magnetic>
                    <a 
                        href={portfolioData.profile.social.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:bg-cyan-400 transition-all duration-300 hover:scale-105"
                    >
                        Start Discussion <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </Magnetic>
            </div>

            {/* Bottom Grid: Links & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-20">
                
                {/* Brand */}
                <div className="col-span-1 lg:col-span-2">
                    <h3 className="text-2xl font-bold tracking-tighter mb-4">HAERUL YUDA ADITIYA.</h3>
                    <p className="text-neutral-300 max-w-sm mb-6 leading-relaxed">
                        Building digital experiences that combine technical excellence with visual impact.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { icon: Github, link: portfolioData.profile.social.github },
                            { icon: Linkedin, link: portfolioData.profile.social.linkedin },
                            { icon: Instagram, link: portfolioData.profile.social.instagram },
                            { icon: Mail, link: `mailto:${portfolioData.profile.email}` },
                        ].map((social, i) => (
                            <a 
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* SITEMAP */}
                <div>
                    <h3 className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-6">Sitemap</h3>
                    <ul className="space-y-4">
                        {[
                            { label: 'Home', href: '#home' },
                            { label: 'Work', href: '#projects' },
                            { label: 'Skills', href: '#skills' },
                            { label: 'Certificates', href: '#certificates' },
                        ].map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className="text-neutral-300 hover:text-white transition-colors text-sm">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                     <h3 className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-6">Contact</h3>
                     <ul className="space-y-4">
                        <li>
                            <a href={`mailto:${portfolioData.profile.email}`} className="text-neutral-300 hover:text-cyan-400 transition-colors text-sm">
                                {portfolioData.profile.email}
                            </a>
                        </li>
                        <li>
                             <span className="text-neutral-300 text-sm">Karawang, West Java</span>
                        </li>
                     </ul>
                </div>
            </div>
            
            <div className="mt-20 text-center md:text-left text-neutral-500 text-xs font-mono">
                &copy; {new Date().getFullYear()} Haerul Yuda Aditiya. All rights reserved.
            </div>
        </div>
    </footer>
  );
}
