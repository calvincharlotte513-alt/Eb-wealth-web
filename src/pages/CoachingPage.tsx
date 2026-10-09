import React from 'react';
import { COACHING_PACKAGES, REGULATORY_DISCLAIMER_SHORT, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { CoachingPackage } from '../types';
import { Target, Clock, Check, ArrowRight, ShieldCheck, Calendar, FileText, Sparkles, Smartphone } from 'lucide-react';
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
  onNavigate,
  onBookSession,
  onOpenAppDownload,
  onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-[#17202A] bg-[#F8FAFC]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-[#F8FAFC]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.coaching}
          fallbackSrc={HERO_FALLBACKS.coaching || coachingHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl bg-white/70 sm:bg-white/45 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xs">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2563EB] font-bold mb-3">
              <Target className="w-4 h-4" />
              <span>1-to-1 Private Coaching</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17202A]">
              Personalised Guidance for Your Financial and Business Roadmap.
            </h1>
            <p className="text-base sm:text-lg text-[#17202A]/85 mt-4 leading-relaxed">
              Tailored, objective guidance for individuals who want direct feedback on their investment knowledge, financial roadmap, business strategy, and AI integration.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onBookSession(COACHING_PACKAGES[0])}
                className="py-3 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Coaching Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenAppDownload('Coaching Booking')}
                className="py-3 px-6 bg-white hover:bg-slate-50 text-[#17202A] border border-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#2563EB]" />
                <span>Schedule in Mobile App</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of 1-to-1 Coaching */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              What You Receive
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A] mt-1">
              Complete Personalized Clarity
            </h2>
            <p className="text-sm text-[#52606D] mt-2">
              Every coaching session is built around rigorous preparation and concrete implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#2563EB] flex items-center justify-center font-bold text-xs mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#17202A] mb-1.5">Dedicated 1-on-1 Sessions</h4>
              <p className="text-xs text-[#52606D] leading-relaxed">
                Direct, focused video consultations with senior leadership to answer your specific questions.
              </p>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#00A878] flex items-center justify-center font-bold text-xs mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#17202A] mb-1.5">Pre-Session Review</h4>
              <p className="text-xs text-[#52606D] leading-relaxed">
                Detailed pre-call questionnaire analysis ensuring zero time is wasted during our time together.
              </p>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#D97706] flex items-center justify-center font-bold text-xs mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#17202A] mb-1.5">Tailored Action Plan</h4>
              <p className="text-xs text-[#52606D] leading-relaxed">
                A prioritized written roadmap with concrete 30-day and 90-day execution steps delivered after the call.
              </p>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#14B8A6] flex items-center justify-center font-bold text-xs mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#17202A] mb-1.5">Follow-Up Support</h4>
              <p className="text-xs text-[#52606D] leading-relaxed">
                Ongoing asynchronous check-in to answer clarifications and ensure momentum on your milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-20 border-b border-slate-200 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Coaching Formats
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A] mt-1">
              Select Your Coaching Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {COACHING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="flex items-center gap-1.5 text-xs text-[#2563EB] font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {pkg.accessTier}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#17202A] mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#52606D] leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 mb-6">
                    <div className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
                      Session Inclusions:
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#0F172A]">
                          <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <div className="text-xs text-[#52606D] mb-4">
                    <strong>Recommended for:</strong> {pkg.recommendedFor}
                  </div>
                  <button
                    onClick={() => onBookSession(pkg)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Book a Coaching Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#52606D]">
            <div className="flex items-center gap-2 font-bold text-[#17202A] mb-1.5">
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
