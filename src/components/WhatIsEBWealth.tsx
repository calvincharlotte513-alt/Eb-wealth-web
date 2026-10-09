import React from 'react';
import { BookOpen, TrendingUp, ShieldCheck, PieChart, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
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
        return <BookOpen className="w-5 h-5 text-[#0D3B2E]" />;
      case 'invest':
        return <TrendingUp className="w-5 h-5 text-[#C5A869]" />;
      case 'shelter':
        return <ShieldCheck className="w-5 h-5 text-[#0D3B2E]" />;
      case 'analyse':
        return <PieChart className="w-5 h-5 text-[#C5A869]" />;
      case 'grow':
        return <Compass className="w-5 h-5 text-[#0D3B2E]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#0D3B2E]" />;
    }
  };

  const getPageTarget = (key: string): PageId => {
    switch (key) {
      case 'learn':
      case 'invest':
      case 'shelter':
        return 'academy';
      case 'analyse':
        return 'tools';
      case 'grow':
        return 'mentorship';
      default:
        return 'academy';
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-2">
            Institutional Principles
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
            The Philosophy of EB Wealth
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            At EB Wealth, we believe that long-term investment success is not about speculative forecasting. It is built on timeless mathematics: low-cost diversification, structural tax efficiency, and disciplined emotional restraint.
          </p>
        </div>

        {/* 5 Core Pillars in Goldman Sachs Editorial Grid */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#C5A869]/30 gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040]">
                Curriculum Structure
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] mt-1">
                The 5 Pillars of Capital Stewardship
              </h3>
            </div>
            <button
              onClick={() => onNavigate('academy')}
              className="text-xs font-semibold uppercase tracking-wider text-[#0D3B2E] hover:text-[#C5A869] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Explore full syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {FIVE_PILLARS.map((pillar) => (
              <div
                key={pillar.key}
                onClick={() => onNavigate(getPageTarget(pillar.key))}
                className="group relative bg-white hover:bg-[#FAF5E8]/40 rounded-sm p-6 border border-slate-200 hover:border-[#C5A869] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-[#EDF4F1] border border-[#0D3B2E]/15 flex items-center justify-center mb-5 group-hover:border-[#C5A869]/50 transition-all">
                    {getIcon(pillar.key)}
                  </div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-1">
                    {pillar.subtitle}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#0D3B2E] mb-2 group-hover:text-[#07251C] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#5A6860] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Topics
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#2B3632]">
                    {pillar.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-1 h-1 rounded-full bg-[#C5A869]"></span>
                        <span className="truncate">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6-Step Institutional Framework */}
        <div className="bg-[#0D3B2E] text-white rounded-sm p-8 sm:p-12 border border-[#C5A869]/40 shadow-xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
              Sequential Methodology
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 text-white">
              The 6-Phase Pathway to Investment Competence
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Every phase is engineered to eliminate emotional speculation and install repeatable, institutional compounding disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {CORE_PHILOSOPHY.map((step) => (
              <div
                key={step.step}
                className="bg-[#07251C] p-5 rounded-sm border border-[#C5A869]/25 hover:border-[#C5A869] transition-colors"
              >
                <div className="text-xs font-mono font-bold text-[#C5A869] mb-2 tracking-widest">
                  PHASE {step.step}
                </div>
                <div className="font-serif text-sm font-bold text-white mb-1.5">
                  {step.name}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[#C5A869]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#C5A869] shrink-0" />
              <span>Evidence-based principles grounded in modern portfolio theory and low-cost global indexing.</span>
            </div>
            <button
              onClick={onOpenGetStarted}
              className="px-6 py-3 bg-gradient-to-r from-[#C5A869] to-[#DFCA96] hover:from-[#B89748] hover:to-[#C5A869] text-[#07251C] font-semibold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-sm"
            >
              <span>Assess Your Starting Level</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
