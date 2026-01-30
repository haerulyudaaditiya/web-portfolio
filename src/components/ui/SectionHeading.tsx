'use client';

import GlitchText from "@/components/GlitchText";
import CyberReveal from "@/components/ui/CyberReveal";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
    return (
        <div className={`mb-20 ${className}`}>
             {subtitle && (
                <CyberReveal direction="up" delay={0.2}>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-[2px] bg-cyan-500" />
                        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">{subtitle}</span>
                    </div>
                </CyberReveal>
            )}
            
            <CyberReveal direction="left">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                    <GlitchText text={title} delay={500} />
                </h2>
            </CyberReveal>
        </div>
    );
}
