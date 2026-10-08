import React from 'react';
import { MENTORSHIP_TIERS, REGULATORY_DISCLAIMER_SHORT } from '../data/content';
import { MentorshipTier } from '../types';
import { Compass, Check, ArrowRight, ShieldCheck, Users, Calendar, Target, Smartphone } from 'lucide-react';
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
  onNavigate,
  onApply,
  onOpenAppDownload,
  onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-[#17202A] bg-[#F8FAFC]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-[#F8FAFC]">
        <HeroBackground
          imageSrc={mentorshipImage}
          fallbackSrc="/images/mentorship_coaching_1791394783951.jpg"
          accent="emerald"
          overlayOpacity="medium"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#00A878] font-bold mb-3">
            <Compass className="w-4 h-4" />
            <span>Structured Mentorship & Accountability</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17202A] max-w-4xl">
            Consistency Builds Wealth. Mentorship Keeps You Accountable.
          </h1>
          <p className="text-base sm:text-lg text-[#52606D] max-w-3xl mt-4 leading-relaxed">
            Investing knowledge without execution, emotional discipline, and regular accountability rarely produces long-term results. Our cohorts and 1-on-1 programs keep you focused on mathematical fundamentals and sustainable execution.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onApply()}
              className="py-3 px-6 bg-[#00A878] hover:bg-[#009267] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for Mentorship Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenAppDownload('Mentorship Portal')}
              className="py-3 px-6 bg-white hover:bg-slate-50 text-[#17202A] border border-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-[#2563EB]" />
              <span>Explore Mobile Community</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Section with Coaching Environment Photo */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00A878]">
                Why Mentorship Matters
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A]">
                The Gap Between Theory and Execution
              </h2>
              <p className="text-sm sm:text-base text-[#52606D] leading-relaxed">
                Almost anyone can read an investment book or watch a tutorial. The challenge is holding your nerve when markets drop 15%, maintaining your monthly savings discipline, and avoiding the urge to gamble on speculative fads.
              </p>

              <div className="space-y-3.5">
                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#00A878] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17202A]">Objective Feedback</h4>
                    <p className="text-xs text-[#52606D] mt-0.5">Experienced mentors review your allocation logic without selling you products or taking commissions.</p>
                  </div>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17202A]">Regular Accountability</h4>
                    <p className="text-xs text-[#52606D] mt-0.5">Scheduled check-ins ensure you stick to your savings rate and investment roadmap month after month.</p>
                  </div>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17202A]">High-Calibre Peer Circle</h4>
                    <p className="text-xs text-[#52606D] mt-0.5">Surround yourself with other disciplined investors, professionals, and entrepreneurs focused on long-term growth.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group bg-slate-50">
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
                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="text-xs font-bold text-[#17202A]">
                    Interactive Cohort Mentorship
                  </div>
                  <div className="text-[11px] text-[#52606D] mt-0.5">
                    Small, selective cohorts with direct access to senior leadership.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Mentorship Tiers */}
      <section className="py-20 border-b border-slate-200 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A878]">
              Mentorship Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A] mt-1">
              Select Your Accountability Program
            </h2>
            <p className="text-sm text-[#52606D] mt-2">
              Programs are capped to preserve high engagement and individual attention.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {MENTORSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  tier.featured
                    ? 'bg-white border-[#00A878] ring-2 ring-[#00A878]/10 shadow-lg'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#00A878] uppercase">
                      {tier.badge}
                    </span>
                    <span className="text-xs text-[#52606D] font-medium">
                      {tier.commitment}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#17202A] mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-[#52606D] leading-relaxed mb-6">
                    {tier.tagline}
                  </p>

                  <div className="pt-4 border-t border-slate-100 mb-6">
                    <div className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
                      What You Receive:
                    </div>
                    <ul className="space-y-3">
                      {tier.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#17202A]">
                          <Check className="w-3.5 h-3.5 text-[#00A878] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <div className="text-xs text-[#52606D] mb-4">
                    <strong>Ideal for:</strong> {tier.idealFor}
                  </div>
                  <button
                    onClick={() => onApply(tier)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      tier.featured
                        ? 'bg-[#00A878] hover:bg-[#009267] text-white shadow-xs'
                        : 'bg-[#F8FAFC] hover:bg-slate-100 text-[#17202A] border border-slate-200'
                    }`}
                  >
                    <span>Apply for {tier.title}</span>
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
