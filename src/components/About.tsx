import React from 'react';
import { ShieldCheck, Award, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { FOUNDER_IMAGE_URL } from '../data/content';

interface AboutProps {
  onOpenMentorship: () => void;
  onOpenGetStarted?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenMentorship, onOpenGetStarted }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869] mb-3">
            <span>Our Institutional Thesis</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Disciplined Capital Compounding</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
            The Philosophy Behind EB Wealth
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-sans">
            EB Wealth was founded on an unyielding principle: <strong className="text-[#0D3B2E] font-semibold">wealth preservation and growth are the products of structured education, not speculation.</strong> Long-term prosperity does not require complex derivatives, nor should it depend on speculative gambles or fee-heavy active managers.
          </p>
        </div>

        {/* Story Grid: The Philosophy & The Founder Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Authentic Founder Photo with Editorial Framing */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-sm overflow-hidden bg-white border border-stone-200 shadow-sm p-4">
              <div className="relative rounded-xs overflow-hidden aspect-[3/4] bg-stone-100">
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08231B]/95 via-[#08231B]/50 to-transparent p-5 text-white">
                  <div className="text-[10px] font-mono font-semibold tracking-widest uppercase text-[#C5A869]">
                    Founder & Head of Investment Education
                  </div>
                  <div className="font-serif text-lg font-bold text-white tracking-wide">
                    EB Wealth
                  </div>
                </div>
              </div>

              {/* Quick Trust Badges below photo */}
              <div className="grid grid-cols-3 gap-2 mt-3 p-3 bg-[#FAF9F5] border border-stone-200 rounded-xs text-center font-mono">
                <div>
                  <div className="text-xs font-bold text-[#0D3B2E]">6 Levels</div>
                  <div className="text-[10px] text-stone-500">Curriculum</div>
                </div>
                <div className="border-x border-stone-200">
                  <div className="text-xs font-bold text-[#C5A869]">100% Educational</div>
                  <div className="text-[10px] text-stone-500">Zero Hype</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0D3B2E]">UK ISAs</div>
                  <div className="text-[10px] text-stone-500">Tax Wrappers</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xs bg-[#FAF5E8] border border-[#C5A869]/40 text-xs text-[#0D3B2E] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C5A869] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="font-semibold">Regulatory Framework:</strong> EB Wealth delivers conceptual investment education and financial literacy masterclasses. We do not offer individualized regulated advice, personal recommendations, or discretionary management.
              </p>
            </div>
          </div>

          {/* Right Column: Mission Narrative, Why We Exist & Core Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
              <p>
                For decades, retail finance has been clouded by either sensationalized day-trading culture or opaque fee structures designed to capture assets rather than foster financial independence.
              </p>
              <p>
                Simultaneously, leaving liquidity uninvested in low-yielding deposit accounts subjects hard-earned purchasing power to continual erosion against inflation.
              </p>
              <div className="p-5 rounded-xs bg-white border-l-4 border-[#C5A869] border-t border-r border-b border-stone-200 shadow-2xs">
                <p className="font-serif text-[#0D3B2E] italic text-base leading-relaxed">
                  "Our mandate is simple: guide the motivated individual from market uncertainty into rigorous command of asset classes, ETF mechanics, UK tax shields, and disciplined long-term portfolio allocation."
                </p>
              </div>
              <p>
                Through six structured curriculum tiers, real-time market indices, interactive compound modeling, and curated cohorts, our members master the fundamentals that underpin sovereign institutional wealth.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-xs bg-white border border-stone-200 hover:border-[#C5A869] transition-colors">
                <div className="w-8 h-8 rounded-xs bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center mb-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Clarity Over Jargon</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We deconstruct balance sheets, P/E multiples, and expense ratios into intuitive, actionable analytical frameworks.
                </p>
              </div>

              <div className="p-5 rounded-xs bg-white border border-stone-200 hover:border-[#C5A869] transition-colors">
                <div className="w-8 h-8 rounded-xs bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center mb-3">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Evidence-Based Allocation</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We champion broad global indexing, asset class diversification, and multi-decade time horizons rather than speculative timing.
                </p>
              </div>

              <div className="p-5 rounded-xs bg-white border border-stone-200 hover:border-[#C5A869] transition-colors">
                <div className="w-8 h-8 rounded-xs bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">UK Tax Wrappers</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Master the strategic integration of Stocks & Shares ISAs, Junior ISAs, and SIPPs to shield returns from capital gains and dividend taxes.
                </p>
              </div>

              <div className="p-5 rounded-xs bg-white border border-stone-200 hover:border-[#C5A869] transition-colors">
                <div className="w-8 h-8 rounded-xs bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">Behavioral Discipline</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Knowledge without temperament fails during volatility. We cultivate the psychological resilience required to compound through full market cycles.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenMentorship}
                className="py-3 px-6 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] font-medium text-xs sm:text-sm rounded-xs border border-[#C5A869]/50 transition-all cursor-pointer shadow-xs flex items-center gap-2"
              >
                <span>Apply for Mentorship Cohort</span>
                <ArrowRight className="w-4 h-4 text-[#C5A869]" />
              </button>

              {onOpenGetStarted && (
                <button
                  onClick={onOpenGetStarted}
                  className="py-3 px-6 bg-white hover:bg-stone-50 text-[#0D3B2E] font-medium text-xs sm:text-sm rounded-xs border border-stone-300 transition-all cursor-pointer"
                >
                  Determine Your Starting Level
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
