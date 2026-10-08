import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles, Quote, Check, ArrowRight, BookOpen, Compass, Brain, Lock, Users } from 'lucide-react';
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
    <div className="pt-24 pb-20 text-[#17202A] bg-[#F8FAFC]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-[#F8FAFC]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.about}
          fallbackSrc={HERO_FALLBACKS.about || aboutHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl bg-white/70 sm:bg-white/45 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xs">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#00A878] font-bold mb-3">
              <span>The Empowerment Body Legacy</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Origin, Purpose & Leadership</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17202A]">
              Building Wealth Through Knowledge, Discipline & Systems.
            </h1>
            <p className="text-base sm:text-lg text-[#17202A]/85 mt-4 leading-relaxed">
              EB Wealth was born under the <strong>Empowerment Body</strong> brand with a clear conviction: financial literacy and wealth creation should be accessible, structured, and free of sales agendas or confusing industry jargon.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: The CEO & Founder Profile */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: High-Res CEO Photo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100">
                  <img
                    src={FOUNDER_IMAGE_URL}
                    alt="Founder and Chief Executive Officer of EB Wealth"
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
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17202A]/90 via-[#17202A]/40 to-transparent p-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#ECFDF5] font-semibold block mb-0.5">
                      Empowerment Body Leadership
                    </span>
                    <h3 className="text-xl font-bold">
                      Founder & Chief Executive Officer
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Private Capital Strategist · AI Systems Architect
                    </p>
                  </div>
                </div>

                {/* Verified Credentials Bar */}
                <div className="p-4 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl mt-3 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#52606D]">Parent Brand:</span>
                    <strong className="text-[#17202A]">Empowerment Body</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#52606D]">Primary Philosophy:</span>
                    <strong className="text-[#00A878]">Knowledge · Discipline · Growth</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#52606D]">Jurisdiction:</span>
                    <strong className="text-[#17202A]">United Kingdom</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Narrative */}
            <div className="lg:col-span-7 space-y-6 text-[#52606D] text-sm sm:text-base leading-relaxed">
              <div className="p-6 rounded-2xl bg-[#ECFDF5]/60 border border-[#00A878]/20">
                <Quote className="w-8 h-8 text-[#00A878] mb-2" />
                <p className="italic font-medium text-[#17202A] leading-relaxed">
                  "EB Wealth does not exist to sell get-rich-quick fantasies or encourage high-risk speculation. We exist to equip individuals with the mental frameworks, financial tools, and technological leverage to build durable sovereign wealth across generations."
                </p>
                <div className="mt-3 text-xs font-bold text-[#00A878]">
                  — Founder & CEO, EB Wealth & Empowerment Body
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#17202A]">
                The Empowerment Body Philosophy
              </h3>

              <p>
                The foundation of Empowerment Body is holistic sovereignty: an individual cannot be truly free if their physical health is broken, but neither can they be free if their finances are fragile, undisciplined, and completely dependent on an employer or an uncertain pension.
              </p>

              <p>
                Over the past decade, we observed two critical problems in the financial world:
              </p>

              <ul className="space-y-3 pl-4">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</div>
                  <span><strong>The Wall Street / City of London Jargon Barrier:</strong> High-fee advisors deliberately complicate basic investing, convincing ordinary people that they cannot manage their own money without handing over 1% to 2% annual fee drag.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</div>
                  <span><strong>Social Media Trading Hype:</strong> Flashy influencers promoting cryptocurrency gambling, day trading, and luxury lifestyles, leading beginner investors straight into catastrophic losses.</span>
                </li>
              </ul>

              <p>
                EB Wealth provides the antidote: <strong>calm, mathematically sound, long-term wealth building</strong>. We teach index funds, company fundamental analysis, UK tax shelters (ISAs and SIPPs), and how modern AI tools can create immense commercial leverage.
              </p>

              {/* 4 Pillars of Success */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#17202A] mb-1">
                    <Brain className="w-4 h-4 text-[#00A878]" />
                    <span>Education First</span>
                  </div>
                  <p className="text-xs text-[#52606D]">
                    We educate before you invest. Understanding risk and company economics removes fear.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#17202A] mb-1">
                    <Lock className="w-4 h-4 text-[#2563EB]" />
                    <span>Tax Efficiency</span>
                  </div>
                  <p className="text-xs text-[#52606D]">
                    Maximizing UK government wrappers legally shields your growth from HMRC tax drag.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#17202A] mb-1">
                    <Users className="w-4 h-4 text-[#F4B942]" />
                    <span>Mentorship & Habits</span>
                  </div>
                  <p className="text-xs text-[#52606D]">
                    Consistency compounds wealth. Having accountability prevents emotional impulse trading.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#17202A] mb-1">
                    <TrendingUp className="w-4 h-4 text-[#14B8A6]" />
                    <span>AI Business Leverage</span>
                  </div>
                  <p className="text-xs text-[#52606D]">
                    Practical prompt engineering and automated workflows create commercial scale for owners.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={onOpenMentorship}
                  className="py-3 px-6 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Apply for Mentorship</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('academy')}
                  className="py-3 px-6 bg-[#F8FAFC] hover:bg-slate-100 text-[#17202A] border border-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A878]">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A] mt-1">
              EDUCATE → UNDERSTAND → ANALYSE → BUILD → TRACK → GROW
            </h2>
            <p className="text-sm text-[#52606D] mt-2">
              Every stage of your financial journey is supported with dedicated frameworks and mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_PHILOSOPHY.map((item) => (
              <div key={item.step} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <div className="text-xs font-mono font-bold text-[#00A878] mb-1">
                  PHASE {item.step}
                </div>
                <h4 className="text-lg font-bold text-[#17202A] mb-2">{item.name}</h4>
                <p className="text-xs text-[#52606D] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prominent Regulatory Disclaimer */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#52606D] leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-[#17202A] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#00A878]" />
              <span>UK Regulatory Statement</span>
            </div>
            <p>{REGULATORY_DISCLAIMER_SHORT}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
