import React from 'react';
import { ArrowRight, BookOpen, Smartphone, Compass, PhoneCall, Layers, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types/navigation';

interface GetStartedProps {
  onNavigate: (page: PageId) => void;
  onOpenAppDownload: (featureName?: string) => void;
  onOpenGetStartedModal: () => void;
}

export const GetStarted: React.FC<GetStartedProps> = ({
  onNavigate,
  onOpenAppDownload,
  onOpenGetStartedModal
}) => {
  return (
    <section id="get-started" className="py-20 lg:py-28 bg-[#0D3B2E] text-white border-b border-[#C5A869]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#DFCA96] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#C5A869]"></span>
          <span>Capital Stewardship & Compounding</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
          Begin Your Institutional Investment Education
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-sans">
          Whether you are investing your very first £100 into a global index fund or structuring an established multi-decade family ISA portfolio, EB Wealth equips you with objective clarity and mathematical discipline.
        </p>

        {/* 4 Core Pathways Cards in Goldman Sachs Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto my-12 text-left">
          <div
            onClick={() => onNavigate('academy')}
            className="p-5 bg-[#07251C] hover:bg-[#0A3323] border border-[#C5A869]/35 hover:border-[#DFCA96] rounded-sm transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-sm bg-[#165342] text-[#C5A869] border border-[#C5A869]/40 flex items-center justify-center font-bold text-xs mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white mb-1">Academy</h4>
              <p className="text-xs text-slate-300">6 structured levels from bedrock foundations to macro portfolio construction.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#C5A869] uppercase tracking-wider font-mono">
              <span>Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('mentorship')}
            className="p-5 bg-[#07251C] hover:bg-[#0A3323] border border-[#C5A869]/35 hover:border-[#DFCA96] rounded-sm transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-sm bg-[#165342] text-[#C5A869] border border-[#C5A869]/40 flex items-center justify-center font-bold text-xs mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white mb-1">Mentorship</h4>
              <p className="text-xs text-slate-300">Cohort masterclasses and structured accountability circles for active allocators.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#C5A869] uppercase tracking-wider font-mono">
              <span>Cohorts</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('coaching')}
            className="p-5 bg-[#07251C] hover:bg-[#0A3323] border border-[#C5A869]/35 hover:border-[#DFCA96] rounded-sm transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-sm bg-[#165342] text-[#C5A869] border border-[#C5A869]/40 flex items-center justify-center font-bold text-xs mb-3">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white mb-1">Private 1-on-1</h4>
              <p className="text-xs text-slate-300">Confidential strategic advisory for personal portfolio architecture and ISA tax rules.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#C5A869] uppercase tracking-wider font-mono">
              <span>Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('tools')}
            className="p-5 bg-[#07251C] hover:bg-[#0A3323] border border-[#C5A869]/35 hover:border-[#DFCA96] rounded-sm transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-sm bg-[#165342] text-[#C5A869] border border-[#C5A869]/40 flex items-center justify-center font-bold text-xs mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white mb-1">Analytics</h4>
              <p className="text-xs text-slate-300">Empirical UK compounding models, tax drag simulators, and fee comparisons.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#C5A869] uppercase tracking-wider font-mono">
              <span>Terminal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Master Action Strip */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenGetStartedModal}
            className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-[#C5A869] to-[#DFCA96] hover:from-[#B89748] hover:to-[#C5A869] text-[#07251C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 border border-[#DFCA96]/40"
          >
            <span>Assess Your Starting Level</span>
            <ArrowRight className="w-4 h-4 text-[#07251C]" />
          </button>

          <button
            onClick={() => onOpenAppDownload('EB Wealth Mobile Suite')}
            className="w-full sm:w-auto py-3.5 px-7 bg-[#07251C] hover:bg-[#0A3323] text-white border border-[#C5A869]/50 font-semibold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-[#C5A869]" />
            <span>Open Mobile Portal</span>
          </button>
        </div>
      </div>
    </section>
  );
};
