import React from 'react';
import { COACHING_PACKAGES } from '../data/content';
import { CoachingPackage } from '../types';
import { Target, Clock, Check, ArrowRight, ShieldCheck, Calendar, FileText, Compass } from 'lucide-react';

interface CoachingProps {
  onBookSession: (pkg: CoachingPackage) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const Coaching: React.FC<CoachingProps> = ({ onBookSession }) => {
  return (
    <section id="coaching" className="py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-2">
            <Target className="w-4 h-4 text-[#0D3B2E]" />
            <span>Private Consultations & Strategic Advisory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
            Personalised Guidance for Your Investment Architecture.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Tailored, confidential guidance for individuals who want direct, objective feedback on their investment knowledge, portfolio diversification, UK tax wrapper sequencing, and long-term compounding strategy.
          </p>
        </div>

        {/* 4 Core Inclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-sm bg-white border border-[#C5A869]/25 shadow-2xs">
            <div className="w-9 h-9 rounded-sm bg-[#EDF4F1] text-[#0D3B2E] flex items-center justify-center font-bold text-xs mb-3 border border-[#0D3B2E]/20">
              <Calendar className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Dedicated 1-on-1 Sessions</h4>
            <p className="text-xs text-[#5A6860] leading-relaxed">
              Uninterrupted, focused time with senior investment leadership to review your specific portfolio architecture.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-white border border-[#C5A869]/25 shadow-2xs">
            <div className="w-9 h-9 rounded-sm bg-[#FAF5E8] text-[#9E8040] flex items-center justify-center font-bold text-xs mb-3 border border-[#C5A869]/30">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Pre-Session Dossier Review</h4>
            <p className="text-xs text-[#5A6860] leading-relaxed">
              Thorough questionnaire analysis prior to the call ensures zero wasted time during our session.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-white border border-[#C5A869]/25 shadow-2xs">
            <div className="w-9 h-9 rounded-sm bg-[#EDF4F1] text-[#0D3B2E] flex items-center justify-center font-bold text-xs mb-3 border border-[#0D3B2E]/20">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Tailored Action Blueprint</h4>
            <p className="text-xs text-[#5A6860] leading-relaxed">
              Walk away with a concrete, prioritized written summary and 30-day implementation roadmap.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-white border border-[#C5A869]/25 shadow-2xs">
            <div className="w-9 h-9 rounded-sm bg-[#FAF5E8] text-[#9E8040] flex items-center justify-center font-bold text-xs mb-3 border border-[#C5A869]/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Fee Drag Elimination</h4>
            <p className="text-xs text-[#5A6860] leading-relaxed">
              Rigorous audit of fund ongoing charges (OCF) and platform custody fees to maximize terminal return.
            </p>
          </div>
        </div>

        {/* Focus Areas Checklist */}
        <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#C5A869]/35 shadow-xs mb-16">
          <div className="max-w-2xl mb-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040]">
              Strategic Focus Areas
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E] mt-1">
              Direct Feedback On Your Specific Capital Setup
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Global ETF & Asset Allocation', desc: 'Clarifying index funds, factor exposure, and risk parameters.' },
              { title: 'UK Tax Wrappers & HMRC Rules', desc: 'Maximizing the £20k Stocks & Shares ISA, Junior ISAs, and SIPP relief.' },
              { title: 'Learning Curriculum Sequencing', desc: 'Creating an objective personal study plan for your level of experience.' },
              { title: 'Fee Leakage Auditing', desc: 'Identifying hidden wealth manager fees and high-expense mutual funds.' },
              { title: 'Cash Flow & Emergency Liquidity', desc: 'Balancing short-term cash reserves against long-term compounding assets.' },
              { title: 'Intergenerational Capital Transfer', desc: 'Structuring Junior ISAs and multi-decade family wealth continuity.' }
            ].map((area, idx) => (
              <div key={idx} className="p-4 rounded-sm bg-[#FAF9F5] border border-stone-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EDF4F1] text-[#0D3B2E] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-[#0D3B2E]/20">
                  ✓
                </div>
                <div>
                  <h5 className="font-serif text-xs font-bold text-[#0D3B2E]">{area.title}</h5>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packages Grid in Goldman Sachs Styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {COACHING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="p-7 rounded-sm bg-white border border-[#C5A869]/35 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-xs text-[#0D3B2E] font-semibold font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>{pkg.duration}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FAF5E8] text-[#9E8040] rounded-sm border border-[#C5A869]/30 uppercase tracking-wider">
                    {pkg.accessTier}
                  </span>
                </div>

                <h4 className="font-serif text-xl font-bold text-[#0D3B2E] mb-2">
                  {pkg.title}
                </h4>
                <p className="text-xs text-[#4A5550] leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="pt-4 border-t border-stone-200 mb-6">
                  <div className="text-[11px] font-mono font-bold text-[#0D3B2E] uppercase tracking-wider mb-3">
                    Curriculum Deliverables:
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#111816]">
                        <Check className="w-3.5 h-3.5 text-[#0D3B2E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-stone-200 mt-auto">
                <div className="text-[11px] text-[#5A6860] mb-4">
                  <strong className="text-[#0D3B2E]">Ideal profile:</strong> {pkg.recommendedFor}
                </div>
                <button
                  onClick={() => onBookSession(pkg)}
                  className="w-full py-3.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider bg-[#0D3B2E] hover:bg-[#07251C] text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-[#C5A869]/40 group"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A869] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] text-stone-500 font-mono">
            Consultations are educational and strategic literacy sessions. EB Wealth does not provide regulated personal investment advice or manage client capital.
          </p>
        </div>
      </div>
    </section>
  );
};
