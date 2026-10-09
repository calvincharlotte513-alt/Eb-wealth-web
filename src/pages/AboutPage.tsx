import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles, Quote, ArrowRight, BookOpen, Compass, Lock, Users } from 'lucide-react';
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
  onOpenDisclosures
}) => {
  return (
    <div className="pt-20 pb-20 text-[#0F172A] bg-[#F8FAFC]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-[#F8FAFC]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.about}
          fallbackSrc={HERO_FALLBACKS.about || aboutHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl bg-white/75 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xs">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2563EB] font-bold mb-3">
              <span>EB Wealth Mission & Principles</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Demystifying Investing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A]">
              Building Long-Term Wealth Through Clarity, Knowledge & Discipline.
            </h1>
            <p className="text-base sm:text-lg text-[#334155] mt-4 leading-relaxed">
              EB Wealth is an approachable investment education platform created with a singular focus: helping beginners and aspiring investors understand how investing works, eliminate fear of losing money, and develop resilient compounding habits.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: The Founder Profile & Mission */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: High-Res Founder Photo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100">
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
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent p-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-blue-200 font-semibold block mb-0.5">
                      Investment Education Leadership
                    </span>
                    <h3 className="text-xl font-bold">
                      Founder & Head of Education
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5">
                      EB Wealth · UK-Based Investment Literacy Platform
                    </p>
                  </div>
                </div>

                {/* Verified Credentials Bar */}
                <div className="p-4 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl mt-3 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Platform Identity:</span>
                    <strong className="text-[#0F172A]">EB Wealth (Investment Education)</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Core Focus:</span>
                    <strong className="text-[#2563EB]">Stocks, ETFs, ISAs & Diversification</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Jurisdiction:</span>
                    <strong className="text-[#0F172A]">United Kingdom</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Narrative */}
            <div className="lg:col-span-7 space-y-6 text-[#475569] text-sm sm:text-base leading-relaxed">
              <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/70">
                <Quote className="w-8 h-8 text-[#2563EB] mb-2" />
                <p className="italic font-medium text-[#0F172A] leading-relaxed">
                  "EB Wealth does not exist to sell get-rich-quick fantasies or encourage high-risk speculation. We exist to equip ordinary people with the bedrock principles, mental models, and objective frameworks to build durable wealth across decades."
                </p>
                <div className="mt-3 text-xs font-bold text-[#2563EB]">
                  — Founder, EB Wealth
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#0F172A]">
                Why Investment Education Matters Today
              </h3>

              <p>
                For generations, the financial industry has made investing feel complicated, intimidating, and exclusive. Complex industry acronyms, fee-heavy products, and noisy daily headlines leave people feeling that investing is only for wealthy insiders.
              </p>

              <p>
                Meanwhile, keeping surplus money solely in cash guarantees a constant erosion of purchasing power due to inflation. Over 10, 20, or 30 years, inflation quietly destroys the value of hard-earned savings.
              </p>

              <div className="space-y-3 pl-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                  <span className="text-xs sm:text-sm"><strong>The Jargon Barrier:</strong> High-fee firms make simple indexing sound impossibly complex to justify charging 1%–2% ongoing management fees that consume up to 40% of an investor's lifetime returns.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                  <span className="text-xs sm:text-sm"><strong>Speculative Hype:</strong> Social media culture pushes high-risk crypto trading and get-rich-quick gambles that repeatedly cause severe losses for beginners.</span>
                </div>
              </div>

              <p>
                EB Wealth provides the proven antidote: <strong>calm, evidence-based, low-cost long-term investing</strong>. We teach index funds, broad-market ETFs, UK tax shelters (Stocks & Shares ISAs, Junior ISAs, and SIPPs), and disciplined portfolio construction.
              </p>

              {/* 4 Pillars of Success */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
                    <BookOpen className="w-4 h-4 text-[#2563EB]" />
                    <span>Education First</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    We educate before you invest. Understanding risk, volatility, and historical market drawdowns removes fear.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
                    <Lock className="w-4 h-4 text-[#2563EB]" />
                    <span>UK Tax Efficiency</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Maximizing UK government wrappers legally shields your growth and dividends from HMRC capital gains taxes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span>Accountability & Habits</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Consistency compounds wealth. Having peer masterminds prevents emotional panic selling when markets fluctuate.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Multi-Decade Compounding</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Automating small, regular monthly investments into diversified index funds produces generational growth.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={onOpenMentorship}
                  className="py-3 px-6 bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Apply for Mentorship</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('academy')}
                  className="py-3 px-6 bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] border border-slate-200 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Explore EB Academy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Framework Detailed Section */}
      <section className="py-20 border-b border-slate-200 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2563EB]">
              Core Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-1">
              EDUCATE → UNDERSTAND → ANALYSE → BUILD → TRACK → COMPOUND
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Every stage of your investment journey is supported with dedicated educational frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_PHILOSOPHY.map((item) => (
              <div key={item.step} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <div className="text-xs font-mono font-bold text-[#2563EB] mb-1">
                  PHASE {item.step}
                </div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-2">{item.name}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Disclosures */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#64748B] leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>UK Regulatory Statement</span>
            </div>
            <p>{REGULATORY_DISCLAIMER_SHORT}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
