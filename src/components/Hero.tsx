import React from 'react';
import { ArrowRight, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FOUNDER_IMAGE_URL, HERO_BACKGROUNDS } from '../data/content';
import { HeroBackground } from './HeroBackground';
import gsHeroAtrium from '../assets/images/gs_institutional_hero_1791537955295.jpg';

interface HeroProps {
  onGetStarted: () => void;
  onExploreApp: () => void;
  onExploreAcademy: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreApp, onExploreAcademy }) => {
  return (
    <section className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden border-b border-[#C5A869]/25 bg-[#FAF9F5]">
      {/* High-definition background image vividly visible across entire hero banner */}
      <HeroBackground
        imageSrc={HERO_BACKGROUNDS.home}
        fallbackSrc={gsHeroAtrium}
        overlayOpacity="subtle"
        imageOpacity="opacity-95 md:opacity-100"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-stretch">
          {/* Left Column: Goldman Sachs Editorial Card */}
          <div className="lg:col-span-7 space-y-6 bg-white/90 backdrop-blur-xs p-7 sm:p-10 rounded-sm border border-[#C5A869]/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-5">
              {/* Gold Eyebrow */}
              <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-widest text-[#9E8040]">
                <span className="w-2 h-2 rounded-full bg-[#C5A869]"></span>
                <span>EB WEALTH · GLOBAL INVESTMENT EDUCATION & RESEARCH</span>
              </div>

              {/* Master Editorial Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D3B2E] tracking-tight leading-[1.12]">
                Capital Compounding. <br />
                <span className="italic font-normal text-[#C5A869]">Institutional Rigor.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#2B3632] font-normal leading-relaxed max-w-2xl">
                EB Wealth brings the disciplined long-term frameworks of institutional finance to beginner and aspiring UK investors. Master global index funds, corporate fundamentals, and HMRC tax shelters (Stocks & Shares ISAs, JISAs, and SIPPs) without jargon.
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onGetStarted}
                className="py-3.5 px-7 bg-[#0D3B2E] hover:bg-[#07251C] text-white font-semibold text-xs uppercase tracking-wider rounded-sm shadow-md hover:shadow-lg border border-[#C5A869]/50 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Find Your Starting Point</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A869]" />
              </button>

              <button
                onClick={onExploreApp}
                className="py-3.5 px-6 bg-white hover:bg-[#FAF9F5] text-[#0D3B2E] border border-stone-300 hover:border-[#C5A869] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
              >
                <Smartphone className="w-4 h-4 text-[#C5A869]" />
                <span>Open EB Wealth App</span>
              </button>
            </div>

            {/* Institutional Trust Indicators */}
            <div className="pt-5 border-t border-[#C5A869]/25 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#2B3632]">
              <div className="flex items-start gap-2 bg-[#FAF9F5] p-2.5 rounded-sm border border-[#C5A869]/20">
                <CheckCircle2 className="w-4 h-4 text-[#0D3B2E] shrink-0 mt-0.5" />
                <span className="font-medium">Foundational rigor for beginners</span>
              </div>
              <div className="flex items-start gap-2 bg-[#FAF9F5] p-2.5 rounded-sm border border-[#C5A869]/20">
                <CheckCircle2 className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                <span className="font-medium">UK Tax Shelters (ISAs & SIPPs)</span>
              </div>
              <div className="flex items-start gap-2 bg-[#FAF9F5] p-2.5 rounded-sm border border-[#C5A869]/20">
                <CheckCircle2 className="w-4 h-4 text-[#0D3B2E] shrink-0 mt-0.5" />
                <span className="font-medium">Global ETFs & Asset Allocation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder & Executive Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md h-full flex flex-col">
              <div className="relative rounded-sm overflow-hidden bg-white border border-[#C5A869]/40 shadow-2xl p-3 flex-1 flex flex-col justify-between">
                <div className="relative rounded-sm overflow-hidden aspect-[4/5] bg-slate-100">
                  <img
                    src={FOUNDER_IMAGE_URL}
                    alt="Founder and Head of Investment Education at EB Wealth"
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

                  {/* Editorial Scrim overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07251C] via-[#0D3B2E]/75 to-transparent p-5 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#DFCA96] font-mono font-bold block mb-0.5">
                      Executive Leadership
                    </span>
                    <div className="font-serif text-lg font-bold">
                      Founder, EB Wealth
                    </div>
                    <p className="text-[11px] text-slate-200">
                      Guiding aspiring investors with institutional discipline and long-term clarity
                    </p>
                  </div>
                </div>

                {/* Sub-card Institutional Ticker */}
                <div className="mt-3 p-3 bg-[#FAF9F5] border border-[#C5A869]/25 rounded-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0D3B2E]" />
                    <span className="font-medium text-[#0D3B2E]">Evidence-Based Methodology</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#9E8040] font-semibold">
                    UK FCA Educational Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Institutional KPI Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-white/95 rounded-sm border border-[#C5A869]/40 shadow-sm text-[#0D3B2E]">
          <div className="space-y-1 pr-4 border-r border-stone-200 last:border-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
              Tax-Free Allowance
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] tabular-nums">
              £20,000<span className="text-sm font-sans font-normal text-stone-500">/yr</span>
            </div>
            <p className="text-[11px] text-stone-600">
              Stocks & Shares ISA annual tax shield
            </p>
          </div>

          <div className="space-y-1 px-0 sm:px-4 border-r-0 sm:border-r border-stone-200">
            <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
              Long-Term Dataset
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] tabular-nums">
              100+<span className="text-sm font-sans font-normal text-stone-500"> Years</span>
            </div>
            <p className="text-[11px] text-stone-600">
              Empirical market data backing curriculum
            </p>
          </div>

          <div className="space-y-1 pr-4 border-r border-stone-200 last:border-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
              Curriculum Breadth
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] tabular-nums">
              6 Levels
            </div>
            <p className="text-[11px] text-stone-600">
              From absolute zero to macro portfolio design
            </p>
          </div>

          <div className="space-y-1 pl-0 sm:pl-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
              Investment Philosophy
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A869]">
              Zero Hype
            </div>
            <p className="text-[11px] text-stone-600">
              Pure financial education, zero high-fee product sales
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
