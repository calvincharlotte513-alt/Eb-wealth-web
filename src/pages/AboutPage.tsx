import React from 'react';
import { ShieldCheck, TrendingUp, Quote, ArrowRight, BookOpen, Lock, Users } from 'lucide-react';
import { PageId } from '../types/navigation';
import { FOUNDER_IMAGE_URL, CORE_PHILOSOPHY, REGULATORY_DISCLAIMER_SHORT, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { HeroBackground } from '../components/HeroBackground';
import aboutHeroBg from '../assets/images/hero_eb_wealth_1791394753165.jpg';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenMentorship: () => void;
  onOpenDisclosures: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenMentorship,
  onOpenDisclosures: _onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-[#141E18] bg-[#FAF9F5]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-28 border-b border-stone-200 overflow-hidden bg-[#FAF9F5]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.about}
          fallbackSrc={HERO_FALLBACKS.about || aboutHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl bg-white/90 backdrop-blur-xs p-8 sm:p-10 rounded-xs border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C5A869] font-bold mb-3">
              <span>EB Wealth Thesis</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Demystifying Long-Term Capital</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D3B2E] leading-tight">
              Building Enduring Wealth Through Institutional Discipline.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-sans">
              EB Wealth is an independent investment education platform established with a singular mission: guiding motivated individuals to master asset allocation, eliminate behavioral fear, and harness decades of compounding without paying high active management fees.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: The Founder Profile & Mission */}
      <section className="py-20 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: High-Res Founder Photo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-xs overflow-hidden bg-white border border-stone-200 shadow-sm p-4">
                <div className="relative rounded-xs overflow-hidden aspect-[3/4] bg-stone-100">
                  <img
                    src={FOUNDER_IMAGE_URL}
                    alt="Founder and Head of Investment Education of EB Wealth"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('ceo_suit_portrait')) {
                        target.src = '/images/ceo_suit_portrait_1791395753240.jpg';
                      }
                    }}
                  />

                  {/* Scrim overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08231B]/95 via-[#08231B]/50 to-transparent p-6 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869] font-semibold block mb-0.5">
                      Investment Education Leadership
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                      Founder & Head of Education
                    </h3>
                    <p className="text-xs text-stone-300 mt-0.5 font-mono">
                      EB Wealth · United Kingdom
                    </p>
                  </div>
                </div>

                {/* Verified Credentials Bar */}
                <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xs mt-3 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Platform Identity:</span>
                    <strong className="text-[#0D3B2E]">EB Wealth Academy</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Core Focus:</span>
                    <strong className="text-[#C5A869]">Global ETFs, ISAs & Compounding</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Jurisdiction:</span>
                    <strong className="text-[#0D3B2E]">United Kingdom</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Narrative */}
            <div className="lg:col-span-7 space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
              <div className="p-6 rounded-xs bg-[#FAF5E8] border border-[#C5A869]/40">
                <Quote className="w-8 h-8 text-[#C5A869] mb-2" />
                <p className="font-serif italic font-medium text-[#0D3B2E] text-base leading-relaxed">
                  "EB Wealth does not exist to sell get-rich-quick fantasies or encourage high-risk speculation. We exist to equip ordinary people with the bedrock principles, mental models, and objective frameworks to build durable wealth across decades."
                </p>
                <div className="mt-3 text-xs font-mono font-bold text-[#C5A869]">
                  — Founder, EB Wealth
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                Why Investment Education Matters Today
              </h3>

              <p className="font-sans">
                For generations, the financial industry has made investing feel complicated, intimidating, and exclusive. Complex industry acronyms, fee-heavy products, and noisy daily headlines leave people feeling that investing is only for wealthy insiders.
              </p>

              <p className="font-sans">
                Meanwhile, keeping surplus money solely in cash guarantees a constant erosion of purchasing power due to inflation. Over 10, 20, or 30 years, inflation quietly destroys the value of hard-earned savings.
              </p>

              <div className="space-y-3 pl-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xs bg-stone-50 border border-stone-200">
                  <span className="w-5 h-5 rounded-xs bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                  <span className="text-xs sm:text-sm font-sans"><strong className="text-[#0D3B2E]">The Fee Drag Barrier:</strong> High-fee active funds charge 1%–2% ongoing management fees that consume up to 40% of an investor's multi-decade compounded return.</span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xs bg-stone-50 border border-stone-200">
                  <span className="w-5 h-5 rounded-xs bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                  <span className="text-xs sm:text-sm font-sans"><strong className="text-[#0D3B2E]">Speculative Hype:</strong> Short-term social media trading culture pushes hyper-volatile gambles that repeatedly cause severe drawdowns for beginners.</span>
                </div>
              </div>

              <p className="font-sans">
                EB Wealth provides the proven antidote: <strong className="text-[#0D3B2E]">calm, evidence-based, low-cost long-term investing</strong>. We teach index funds, broad-market ETFs, UK tax shelters (Stocks & Shares ISAs, Junior ISAs, and SIPPs), and disciplined portfolio construction.
              </p>

              {/* 4 Pillars of Success */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xs bg-[#FAF9F5] border border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0D3B2E] mb-1 font-serif">
                    <BookOpen className="w-4 h-4 text-[#C5A869]" />
                    <span>Education First</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    We educate before you allocate. Understanding risk, volatility, and historical market drawdowns removes fear.
                  </p>
                </div>

                <div className="p-4 rounded-xs bg-[#FAF9F5] border border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0D3B2E] mb-1 font-serif">
                    <Lock className="w-4 h-4 text-[#C5A869]" />
                    <span>UK Tax Efficiency</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Maximizing UK government wrappers legally shields your growth and dividends from HMRC capital gains taxes.
                  </p>
                </div>

                <div className="p-4 rounded-xs bg-[#FAF9F5] border border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0D3B2E] mb-1 font-serif">
                    <Users className="w-4 h-4 text-[#C5A869]" />
                    <span>Accountability & Habits</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Consistency compounds wealth. Having peer masterminds prevents emotional panic selling when markets fluctuate.
                  </p>
                </div>

                <div className="p-4 rounded-xs bg-[#FAF9F5] border border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0D3B2E] mb-1 font-serif">
                    <TrendingUp className="w-4 h-4 text-[#C5A869]" />
                    <span>Multi-Decade Compounding</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Automating small, regular monthly investments into diversified index funds produces generational growth.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={onOpenMentorship}
                  className="py-3 px-6 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] text-xs sm:text-sm font-medium rounded-xs border border-[#C5A869]/50 shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Apply for Mentorship</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A869]" />
                </button>
                <button
                  onClick={() => onNavigate('academy')}
                  className="py-3 px-6 bg-white hover:bg-stone-50 text-[#0D3B2E] border border-stone-300 text-xs sm:text-sm font-medium rounded-xs transition-all cursor-pointer"
                >
                  Explore EB Academy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Framework Detailed Section */}
      <section className="py-20 border-b border-stone-200 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
              Core Methodology
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] mt-2">
              EDUCATE → UNDERSTAND → ANALYSE → BUILD → TRACK → COMPOUND
            </h2>
            <p className="text-xs text-stone-600 mt-2 font-mono">
              Every stage of your investment journey is supported with dedicated educational frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_PHILOSOPHY.map((item) => (
              <div key={item.step} className="p-6 bg-white border border-stone-200 rounded-xs shadow-2xs hover:border-[#C5A869] transition-colors">
                <div className="text-xs font-mono font-bold text-[#C5A869] mb-1">
                  PHASE 0{item.step}
                </div>
                <h4 className="font-serif text-lg font-bold text-[#0D3B2E] mb-2">{item.name}</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Disclosures */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-xs bg-[#FAF5E8] border border-[#C5A869]/40 text-xs text-stone-700 leading-relaxed">
            <div className="flex items-center gap-2 font-serif font-bold text-[#0D3B2E] mb-2">
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
