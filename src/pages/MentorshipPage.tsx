import React from 'react';
import { MENTORSHIP_TIERS, REGULATORY_DISCLAIMER_SHORT, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { MentorshipTier } from '../types';
import { Compass, Check, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';
import { PageId } from '../types/navigation';
import { HeroBackground } from '../components/HeroBackground';
import mentorshipImage from '../assets/images/mentorship_coaching_1791394783951.jpg';

interface MentorshipPageProps {
  onNavigate: (page: PageId) => void;
  onApply: (tier?: MentorshipTier) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const MentorshipPage: React.FC<MentorshipPageProps> = ({
  onNavigate: _onNavigate,
  onApply,
  onOpenAppDownload,
  onOpenDisclosures: _onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-[#141E18] bg-[#FAF9F5]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-28 border-b border-stone-200 overflow-hidden bg-[#FAF9F5]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.mentorship}
          fallbackSrc={HERO_FALLBACKS.mentorship || mentorshipImage}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl bg-white/90 backdrop-blur-xs p-8 sm:p-10 rounded-xs border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C5A869] font-bold mb-3">
              <Compass className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>Executive Mentorship & Strategic Oversight</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D3B2E] leading-tight">
              Consistency Builds Wealth. Mentorship Enforces Discipline.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-sans">
              Investing knowledge without execution, emotional composure, and regular accountability rarely yields compounding success. Our structured cohorts keep you anchored in mathematical principles, tax efficiency, and long-term execution.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onApply()}
                className="py-3 px-6 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] font-medium text-xs rounded-xs border border-[#C5A869]/50 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Apply for Mentorship Intake</span>
                <ArrowRight className="w-4 h-4 text-[#C5A869]" />
              </button>
              <button
                onClick={() => onOpenAppDownload('Mentorship Portal')}
                className="py-3 px-6 bg-white hover:bg-stone-50 text-[#0D3B2E] border border-stone-300 font-medium text-xs rounded-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#C5A869]" />
                <span>Explore Mobile Community</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section with Coaching Environment Photo */}
      <section className="py-20 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
                The Behavioral Advantage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D3B2E]">
                Bridging the Chasm Between Knowledge & Execution
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
                Almost anyone can read an investment book or follow market indices. The true institutional challenge is maintaining composure when benchmarks undergo a 15% drawdown, executing systematic monthly pound-cost averaging, and rejecting speculative market fads.
              </p>

              <div className="space-y-3.5">
                <div className="p-4 bg-[#FAF9F5] rounded-xs border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xs bg-[#0D3B2E] text-[#C5A869] font-mono flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#0D3B2E]">Objective Strategic Review</h4>
                    <p className="text-xs text-stone-600 mt-0.5 font-sans">Rigorous assessment of asset allocation models without commercial cross-selling or commission bias.</p>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF9F5] rounded-xs border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xs bg-[#0D3B2E] text-[#C5A869] font-mono flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#0D3B2E]">Rigorous Accountability</h4>
                    <p className="text-xs text-stone-600 mt-0.5 font-sans">Scheduled milestones ensure you execute your target savings rate and investment roadmap month after month.</p>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF9F5] rounded-xs border border-stone-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xs bg-[#0D3B2E] text-[#C5A869] font-mono flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#0D3B2E]">High-Calibre Investor Cohort</h4>
                    <p className="text-xs text-stone-600 mt-0.5 font-sans">Engage with disciplined fellow professionals, founders, and investors committed to multi-decade compounding.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-xs overflow-hidden border border-stone-200 shadow-sm group bg-stone-100">
                <img
                  src={mentorshipImage}
                  alt="EB Wealth Executive Mentorship & Strategy"
                  className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('/images/')) {
                      target.src = '/images/mentorship_coaching_1791394783951.jpg';
                    }
                  }}
                />
                <div className="p-4 bg-white border-t border-stone-200">
                  <div className="font-serif text-sm font-bold text-[#0D3B2E]">
                    Interactive Cohort Boardroom Masterclasses
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5 font-mono">
                    Selective cohorts with direct pedagogical access to senior leadership.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Mentorship Tiers */}
      <section className="py-20 border-b border-stone-200 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
              Curated Pathways
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D3B2E] mt-1">
              Select Your Accountability Program
            </h2>
            <p className="text-xs text-stone-600 mt-2 font-mono">
              Cohort sizes are intentionally restricted to ensure individualized rigor and engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {MENTORSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-8 rounded-xs border flex flex-col justify-between transition-all ${
                  tier.featured
                    ? 'bg-white border-[#C5A869] ring-2 ring-[#C5A869]/20 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#C5A869] uppercase tracking-wider">
                      {tier.badge}
                    </span>
                    <span className="text-xs font-mono text-stone-500">
                      {tier.commitment}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6 font-sans">
                    {tier.tagline}
                  </p>

                  <div className="pt-4 border-t border-stone-100 mb-6">
                    <div className="text-[11px] font-mono font-bold text-[#0D3B2E] uppercase tracking-wider mb-3">
                      Core Deliverables:
                    </div>
                    <ul className="space-y-3">
                      {tier.deliverables.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#C5A869] shrink-0 mt-0.5" />
                          <span className="leading-snug font-sans">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 mt-auto">
                  <div className="text-xs text-stone-600 mb-4 font-sans">
                    <strong className="text-[#0D3B2E]">Ideal for:</strong> {tier.idealFor}
                  </div>
                  <button
                    onClick={() => onApply(tier)}
                    className={`w-full py-3 px-4 rounded-xs text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      tier.featured
                        ? 'bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] border border-[#C5A869]/50 shadow-xs'
                        : 'bg-[#FAF9F5] hover:bg-stone-100 text-[#0D3B2E] border border-stone-200'
                    }`}
                  >
                    <span>Apply for {tier.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Notice */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-xs bg-[#FAF5E8] border border-[#C5A869]/40 text-xs text-stone-700">
            <div className="flex items-center gap-2 font-serif font-bold text-[#0D3B2E] mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
              <span className="tracking-wide">UK Statutory Regulatory Disclosure</span>
            </div>
            <p className="font-sans text-[11px] leading-normal">{REGULATORY_DISCLAIMER_SHORT}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
