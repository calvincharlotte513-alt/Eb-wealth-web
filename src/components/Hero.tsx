import React from 'react';
import { ArrowRight, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FOUNDER_IMAGE_URL, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { HeroBackground } from './HeroBackground';
import heroBgImage from '../assets/images/hero_eb_wealth_1791394753165.jpg';

interface HeroProps {
  onGetStarted: () => void;
  onExploreApp: () => void;
  onExploreAcademy: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreApp, onExploreAcademy }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/70 bg-[#F8FAFC]">
      {/* High-definition background image vividly visible across entire hero banner */}
      <HeroBackground
        imageSrc={HERO_BACKGROUNDS.home}
        fallbackSrc={HERO_FALLBACKS.home || heroBgImage}
        overlayOpacity="subtle"
        imageOpacity="opacity-95 md:opacity-100"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & CTAs with subtle frosted card backing for text clarity over the visible background image */}
          <div className="lg:col-span-7 space-y-6 bg-white/70 sm:bg-white/40 backdrop-blur-xs p-6 sm:p-7 rounded-3xl border border-white/80 shadow-sm">
            {/* Quiet editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00A878] bg-white/90 px-3 py-1 rounded-full border border-emerald-100 shadow-2xs w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00A878]"></span>
              <span>Empowerment Body Ecosystem · UK Financial & Business Education</span>
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17202A] tracking-tight leading-[1.12]">
              Learn. Invest. <br className="hidden sm:inline" />
              <span className="text-[#00A878]">Build Wealth.</span>
            </h1>

            {/* Exact supporting copy specified in brief */}
            <p className="text-lg sm:text-xl text-[#17202A]/90 font-normal leading-relaxed max-w-2xl">
              EB Wealth helps you build the knowledge, confidence and systems to make smarter long-term decisions across investing, wealth building, personal development and business.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onGetStarted}
                className="py-3.5 px-7 bg-[#00A878] hover:bg-[#009267] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreApp}
                className="py-3.5 px-6 bg-white hover:bg-[#EFF6FF] text-[#17202A] border border-slate-200 hover:border-[#2563EB]/40 font-semibold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
              >
                <Smartphone className="w-4 h-4 text-[#2563EB]" />
                <span>Explore EB Wealth App</span>
              </button>
            </div>

            {/* Trust and who it serves indicators */}
            <div className="pt-5 border-t border-slate-300/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#17202A]">
              <div className="flex items-start gap-2 bg-white/60 p-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#00A878] shrink-0 mt-0.5" />
                <span className="font-medium">For beginners & intermediate investors</span>
              </div>
              <div className="flex items-start gap-2 bg-white/60 p-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="font-medium">UK tax-sheltered investing (ISAs & SIPPs)</span>
              </div>
              <div className="flex items-start gap-2 bg-white/60 p-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" />
                <span className="font-medium">Practical AI leverage for entrepreneurs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder & CEO Authentic Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer clean frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100">
                  <img
                    src={FOUNDER_IMAGE_URL}
                    alt="Founder and CEO of EB Wealth & Empowerment Body"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully if network glitch occurs
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('ceo_suit_portrait')) {
                        target.src = '/images/ceo_suit_portrait_1791395753240.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17202A]/90 via-[#17202A]/40 to-transparent p-5 text-white">
                    <div className="text-xs font-semibold tracking-wider uppercase text-[#ECFDF5]">
                      Empowerment Body Leadership
                    </div>
                    <div className="text-base font-bold">
                      Founder & Chief Executive Officer
                    </div>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                      Guiding individuals from financial uncertainty to structured, long-term sovereign wealth.
                    </p>
                  </div>
                </div>

                {/* Founder badge info bar */}
                <div className="mt-3 px-3 py-2 bg-[#F8FAFC] rounded-xl border border-slate-200/70 flex items-center justify-between text-xs text-[#52606D]">
                  <div className="flex items-center gap-1.5 font-medium text-[#17202A]">
                    <ShieldCheck className="w-4 h-4 text-[#00A878]" />
                    <span>Real Mentorship</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <span>Human Guidance</span>
                  <span className="text-slate-300">·</span>
                  <span>Long-Term Discipline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
