'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { useTerminalStore } from '@/store/useTerminalStore';
import Navigation from '@/components/Navigation';
import { ArrowUp } from 'lucide-react';
const HeroSection = dynamic(() => import('@/components/HeroSection'), { 
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div></div>
});
const ValueProposition = dynamic(() => import('@/components/ValueProposition'), { ssr: false });
const SkillsShowcase = dynamic(() => import('@/components/SkillsShowcase'), { ssr: false });
const AwardWinningProjects = dynamic(() => import('@/components/AwardWinningProjects'), { ssr: false });
const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'), { ssr: false });
const CertificateShowcase = dynamic(() => import('@/components/CertificateShowcase'), { ssr: false });
const ContactFooter = dynamic(() => import('@/components/ContactFooter'), { ssr: false });
const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false });
const CyberBackground = dynamic(() => import('@/components/CyberBackground'), { ssr: false });

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toggleOpen } = useTerminalStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen text-white overflow-x-hidden relative selection:bg-cyan-500 selection:text-black">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/10">
        <div 
            className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" 
            style={{ width: `${scrollProgress}%` }}
        />
      </div>

       {/* Back to Top Button */}
       <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 z-50 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={20} />
      </button>

      {/* Background Atmosphere */}
      <CyberBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Value Proposition */}
      <ValueProposition />

      {/* Award-Winning Projects */}
      <AwardWinningProjects />

      {/* Skills Showcase */}
      <SkillsShowcase />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Certificates */}
      <CertificateShowcase />

      {/* Contact Footer */}
      <ContactFooter />

      {/* Terminal */}
      <Terminal />
    </main>
  );
}