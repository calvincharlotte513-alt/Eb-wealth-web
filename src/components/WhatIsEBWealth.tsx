import React from 'react';
import { BookOpen, TrendingUp, PieChart, Compass, Cpu, ArrowRight } from 'lucide-react';
import { CORE_PHILOSOPHY, FIVE_PILLARS } from '../data/content';
import { PageId } from '../types/navigation';

interface WhatIsEBWealthProps {
  onNavigate: (page: PageId) => void;
  onOpenGetStarted: () => void;
}

export const WhatIsEBWealth: React.FC<WhatIsEBWealthProps> = ({ onNavigate, onOpenGetStarted }) => {
  const getIcon = (key: string) => {
    switch (key) {
      case 'learn':
        return <BookOpen className="w-5 h-5 text-[#00A878]" />;
      case 'invest':
        return <TrendingUp className="w-5 h-5 text-[#2563EB]" />;
      case 'analyse':
        return <PieChart className="w-5 h-5 text-[#14B8A6]" />;
      case 'grow':
        return <Compass className="w-5 h-5 text-[#F4B942]" />;
      case 'build':
        return <Cpu className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#00A878]" />;
    }
  };

  const getPageTarget = (key: string): PageId => {
    switch (key) {
      case 'learn':
        return 'academy';
      case 'invest':
        return 'academy';
      case 'analyse':
        return 'tools';
      case 'grow':
        return 'mentorship';
      case 'build':
        return 'ai-growth';
      default:
        return 'academy';
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00A878] mb-2">
            The EB Wealth Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A] tracking-tight">
            What is EB Wealth?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#52606D] leading-relaxed">
            EB Wealth helps people develop the knowledge, confidence, systems and tools needed to make better long-term financial and business decisions. We bridge the gap between financial literacy, real investing, human mentorship, and practical AI leverage.
          </p>
        </div>

        {/* 5 Core Pillars: Editorial Layout (Avoiding generic floating cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {FIVE_PILLARS.map((pillar, index) => (
            <div
              key={pillar.key}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#00A878]/40 hover:bg-white transition-all duration-200 flex flex-col justify-between group shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                    {getIcon(pillar.key)}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#17202A] mb-1 group-hover:text-[#00A878] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs font-medium text-[#00A878] mb-3">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-[#52606D] leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 mt-2">
                <button
                  onClick={() => onNavigate(getPageTarget(pillar.key))}
                  className="text-xs font-semibold text-[#17202A] group-hover:text-[#00A878] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Explore {pillar.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Core Philosophy Banner: EDUCATE → UNDERSTAND → ANALYSE → BUILD → TRACK → GROW */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#ECFDF5]/60 border border-[#00A878]/20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A878]">
              Our Guiding Process
            </span>
            <h3 className="text-2xl font-bold text-[#17202A] mt-1">
              The 6-Step Wealth Framework
            </h3>
            <p className="text-xs sm:text-sm text-[#52606D] mt-2">
              Wealth creation is not luck or guesswork. It follows a disciplined sequence from foundational knowledge to compounding leverage.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CORE_PHILOSOPHY.map((item, idx) => (
              <div
                key={item.step}
                className="bg-white rounded-xl p-4 border border-slate-200/70 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono font-bold text-[#00A878] mb-1">
                    STEP {item.step}
                  </div>
                  <div className="text-sm font-bold text-[#17202A] tracking-tight">
                    {item.name}
                  </div>
                  <p className="text-[11px] text-[#52606D] mt-1.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#00A878]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#52606D]">
              <span className="font-semibold text-[#17202A]">Who we serve:</span> Complete beginners · Intermediate investors · Entrepreneurs · Ambitious professionals
            </div>
            <button
              onClick={onOpenGetStarted}
              className="py-2.5 px-5 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
