import React from 'react';
import { COACHING_PACKAGES, REGULATORY_DISCLAIMER_SHORT, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { CoachingPackage } from '../types';
import { Target, Clock, Check, ArrowRight, ShieldCheck, Calendar, FileText, Smartphone, Compass } from 'lucide-react';
import { PageId } from '../types/navigation';
import { HeroBackground } from '../components/HeroBackground';
import coachingHeroBg from '../assets/images/mentorship_coaching_1791394783951.jpg';

interface CoachingPageProps {
  onNavigate: (page: PageId) => void;
  onBookSession: (pkg: CoachingPackage) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const CoachingPage: React.FC<CoachingPageProps> = ({
  onNavigate: _onNavigate,
  onBookSession,
  onOpenAppDownload,
  onOpenDisclosures: _onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-[#141E18] bg-[#FAF9F5]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-28 border-b border-stone-200 overflow-hidden bg-[#FAF9F5]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.coaching}
          fallbackSrc={HERO_FALLBACKS.coaching || coachingHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl bg-white/90 backdrop-blur-xs p-8 sm:p-10 rounded-xs border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C5A869] font-bold mb-3">
              <Target className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>1-to-1 Private Strategy & Consultation</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D3B2E] leading-tight">
              Bespoke Guidance for Your Personal Capital Roadmap.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-sans">
              Tailored, objective guidance for individuals who require direct feedback on their investment knowledge, portfolio framework, business strategy, and technological integration.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onBookSession(COACHING_PACKAGES[0])}
                className="py-3 px-6 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] font-medium text-xs rounded-xs border border-[#C5A869]/50 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation Session</span>
                <ArrowRight className="w-4 h-4 text-[#C5A869]" />
              </button>
              <button
                onClick={() => onOpenAppDownload('Coaching Booking')}
                className="py-3 px-6 bg-white hover:bg-stone-50 text-[#0D3B2E] border border-stone-300 font-medium text-xs rounded-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#C5A869]" />
                <span>Schedule in Mobile App</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of 1-to-1 Coaching */}
      <section className="py-20 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
              Engagement Deliverables
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D3B2E] mt-1">
              Rigorous, Structured Methodology
            </h2>
            <p className="text-xs text-stone-600 mt-2 font-mono">
              Every consultation is anchored in thorough preparation and concrete implementation steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAF9F5] border border-stone-200 rounded-xs shadow-2xs">
              <div className="w-10 h-10 rounded-xs bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center font-bold text-xs mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0D3B2E] mb-1.5">Dedicated 1-on-1 Sessions</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Focused video consultations with senior leadership to answer your specific asset allocation questions.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] border border-stone-200 rounded-xs shadow-2xs">
              <div className="w-10 h-10 rounded-xs bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center font-bold text-xs mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0D3B2E] mb-1.5">Pre-Session Dossier Review</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Thorough pre-call questionnaire evaluation ensuring maximum depth and precision during our consultation.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] border border-stone-200 rounded-xs shadow-2xs">
              <div className="w-10 h-10 rounded-xs bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center font-bold text-xs mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0D3B2E] mb-1.5">Tailored Execution Plan</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                A prioritized written roadmap detailing concrete 30-day and 90-day implementation milestones delivered post-session.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] border border-stone-200 rounded-xs shadow-2xs">
              <div className="w-10 h-10 rounded-xs bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center font-bold text-xs mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#0D3B2E] mb-1.5">Strategic Follow-Up</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Dedicated asynchronous follow-up to clarify technical nuances and maintain execution discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-20 border-b border-stone-200 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
              Consultation Formats
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D3B2E] mt-1">
              Select Your Consultation Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {COACHING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="p-8 rounded-xs bg-white border border-stone-200 shadow-2xs hover:border-[#C5A869] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="flex items-center gap-1.5 text-xs text-[#C5A869] font-mono font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FAF9F5] border border-stone-200 text-[#0D3B2E] rounded-xs">
                      {pkg.accessTier}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6 font-sans">
                    {pkg.description}
                  </p>

                  <div className="pt-4 border-t border-stone-100 mb-6">
                    <div className="text-[11px] font-mono font-bold text-[#0D3B2E] uppercase tracking-wider mb-3">
                      Session Deliverables:
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#C5A869] shrink-0 mt-0.5" />
                          <span className="leading-snug font-sans">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 mt-auto">
                  <div className="text-xs text-stone-600 mb-4 font-sans">
                    <strong className="text-[#0D3B2E]">Recommended for:</strong> {pkg.recommendedFor}
                  </div>
                  <button
                    onClick={() => onBookSession(pkg)}
                    className="w-full py-3 px-4 rounded-xs text-xs font-medium bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] border border-[#C5A869]/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Book Consultation Session</span>
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
