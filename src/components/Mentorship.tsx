import React from 'react';
import { MENTORSHIP_TIERS, FOUNDER_IMAGE_URL } from '../data/content';
import { MentorshipTier } from '../types';
import { Compass, Check, ArrowRight, ShieldCheck, Users, Calendar, Target } from 'lucide-react';

interface MentorshipProps {
  onApply: (tier?: MentorshipTier) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const Mentorship: React.FC<MentorshipProps> = ({
  onApply
}) => {
  return (
    <section id="mentorship" className="py-20 lg:py-28 bg-white border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-2">
            <Compass className="w-4 h-4 text-[#0D3B2E]" />
            <span>Masterclasses & Accountability</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
            Consistency Builds Wealth. Mentorship Keeps You Disciplined.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Investment knowledge alone is ineffective without rigorous execution, habit formation, and peer accountability. EB Wealth cohorts provide direct educator feedback to eliminate emotional impulses.
          </p>
        </div>

        {/* 4 Pillars of Mentorship Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-sm bg-[#FAF9F5] border border-[#C5A869]/20">
            <div className="w-10 h-10 rounded-sm bg-white border border-[#C5A869]/30 flex items-center justify-center text-[#0D3B2E] mb-3 shadow-2xs">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Cohort Masterclasses</h4>
            <p className="text-xs text-[#5A6860] leading-relaxed">
              Bi-weekly interactive strategy sessions covering market updates, allocation logic, and live Q&A.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#FAF9F5] border border-[#C5A869]/20">
            <div className="w-10 h-10 rounded-sm bg-white border border-[#C5A869]/30 flex items-center justify-center text-[#9E8040] mb-3 shadow-2xs">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Portfolio Logic Audits</h4>
            <p className="text-xs text-[#5A6860] leading-relaxed">
              Objective educational reviews of your global diversification, asset allocation, and platform fee drag.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#FAF9F5] border border-[#C5A869]/20">
            <div className="w-10 h-10 rounded-sm bg-white border border-[#C5A869]/30 flex items-center justify-center text-[#0D3B2E] mb-3 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Monthly Briefings</h4>
            <p className="text-xs text-[#5A6860] leading-relaxed">
              Exclusive macroeconomic and UK tax wrapper deep dives delivered in plain English.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#FAF9F5] border border-[#C5A869]/20">
            <div className="w-10 h-10 rounded-sm bg-white border border-[#C5A869]/30 flex items-center justify-center text-[#9E8040] mb-3 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Peer Mastermind</h4>
            <p className="text-xs text-[#5A6860] leading-relaxed">
              Private community forum for ongoing discussions, sharing research frameworks, and mutual accountability.
            </p>
          </div>
        </div>

        {/* 3 Mentorship Tiers in Goldman Sachs Prestige Styling */}
        <div className="mb-12">
          {/* Authentic Leadership & Cohort Director Profile */}
          <div className="mb-12 p-6 sm:p-7 bg-[#FAF9F5] border border-[#C5A869]/35 rounded-sm flex flex-col sm:flex-row items-center gap-6 shadow-xs max-w-4xl mx-auto">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-sm overflow-hidden border border-[#C5A869] shadow-sm bg-black/10">
              <img
                src={FOUNDER_IMAGE_URL}
                alt="Founder and Head of Investment Education of EB Wealth"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('ceo_suit_portrait')) {
                    target.src = '/images/ceo_suit_portrait_1791395753240.jpg';
                  }
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-[#08231B]/90 text-[9px] font-mono font-bold text-[#E2C98A] text-center py-0.5 uppercase tracking-wider">
                Founder Lead
              </div>
            </div>
            <div className="text-center sm:text-left space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#9E8040] font-bold">
                Executive Leadership & Pedagogical Director
              </div>
              <h4 className="font-serif text-lg font-bold text-[#0D3B2E]">
                Direct Mentorship with EB Wealth Founder
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                "We don't teach speculation or crypto hype. We guide you step-by-step through the same low-cost, tax-sheltered compounding mechanisms utilized by top institutional family offices."
              </p>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040]">
              Admissions Programs
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] mt-1">
              Select Your Mentorship Track
            </h3>
            <p className="text-xs sm:text-sm text-[#5A6860] mt-1.5">
              Strictly cohort-capped to ensure direct engagement with senior investment educators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {MENTORSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-sm p-7 flex flex-col justify-between transition-all duration-200 border ${
                  tier.featured
                    ? 'bg-[#0D3B2E] text-white border-[#C5A869] shadow-2xl relative'
                    : 'bg-[#FAF9F5] text-[#111816] border-slate-200 hover:border-[#C5A869]'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C5A869] to-[#DFCA96] text-[#07251C] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-xs font-mono">
                    Most Popular Cohort
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border ${
                      tier.featured
                        ? 'bg-white/10 text-[#C5A869] border-[#C5A869]/40'
                        : 'bg-white text-[#0D3B2E] border-slate-200'
                    }`}>
                      {tier.badge}
                    </span>
                    <span className={`text-xs font-mono ${tier.featured ? 'text-slate-300' : 'text-slate-500'}`}>
                      {tier.commitment}
                    </span>
                  </div>

                  <h4 className={`font-serif text-2xl font-bold mb-2 ${tier.featured ? 'text-white' : 'text-[#0D3B2E]'}`}>
                    {tier.title}
                  </h4>
                  <p className={`text-xs leading-relaxed mb-6 ${tier.featured ? 'text-slate-200' : 'text-[#5A6860]'}`}>
                    {tier.tagline}
                  </p>

                  <div className={`pt-4 border-t mb-6 ${tier.featured ? 'border-white/15' : 'border-slate-200'}`}>
                    <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-3 ${
                      tier.featured ? 'text-[#C5A869]' : 'text-[#0D3B2E]'
                    }`}>
                      Key Inclusions:
                    </div>
                    <ul className="space-y-2.5">
                      {tier.deliverables.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs">
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            tier.featured ? 'text-[#C5A869]' : 'text-[#0D3B2E]'
                          }`} />
                          <span className={`leading-snug ${tier.featured ? 'text-slate-200' : 'text-[#2B3632]'}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`pt-6 border-t mt-auto ${tier.featured ? 'border-white/15' : 'border-slate-200'}`}>
                  <div className={`text-[11px] mb-4 ${tier.featured ? 'text-slate-300' : 'text-[#5A6860]'}`}>
                    <strong className={tier.featured ? 'text-white' : 'text-[#0D3B2E]'}>Ideal for:</strong> {tier.idealFor}
                  </div>
                  <button
                    onClick={() => onApply(tier)}
                    className={`w-full py-3.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                      tier.featured
                        ? 'bg-gradient-to-r from-[#C5A869] to-[#DFCA96] hover:from-[#B89748] hover:to-[#C5A869] text-[#07251C]'
                        : 'bg-[#0D3B2E] hover:bg-[#07251C] text-white border border-[#C5A869]/40'
                    }`}
                  >
                    <span>Apply for {tier.title}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${tier.featured ? 'text-[#07251C]' : 'text-[#C5A869]'}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory note reminder */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] text-slate-400">
            EB Wealth mentorship programs are educational masterclasses. We do not provide regulated individual financial advice or manage assets.
          </p>
        </div>
      </div>
    </section>
  );
};
