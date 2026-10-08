import React from 'react';
import { MENTORSHIP_TIERS } from '../data/content';
import { MentorshipTier } from '../types';
import { Compass, Check, ArrowRight, ShieldCheck, Users, Calendar, Target, Smartphone } from 'lucide-react';
import mentorshipImage from '../assets/images/mentorship_coaching_1791394783951.jpg';

interface MentorshipProps {
  onApply: (tier?: MentorshipTier) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const Mentorship: React.FC<MentorshipProps> = ({
  onApply,
  onOpenAppDownload,
  onOpenDisclosures
}) => {
  return (
    <section id="mentorship" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00A878] mb-2">
            <Compass className="w-4 h-4" />
            <span>Mentorship & Accountability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17202A] tracking-tight">
            Consistency Builds Wealth. Mentorship Keeps You Accountable.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#52606D] leading-relaxed">
            Investing knowledge is never enough without discipline, execution, and long-term consistency. EB Wealth provides structured mentorship to keep you focused on your goals and eliminate costly emotional mistakes.
          </p>
        </div>

        {/* 4 Core Pillars of Mentorship Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#00A878] mb-3 shadow-2xs">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#17202A] mb-1">Regular Group Coaching</h4>
            <p className="text-xs text-[#52606D] leading-relaxed">
              Bi-weekly interactive strategy sessions covering market updates, allocation logic, and live Q&A.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] mb-3 shadow-2xs">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#17202A] mb-1">Portfolio Logic Reviews</h4>
            <p className="text-xs text-[#52606D] leading-relaxed">
              Objective educational audits of your diversification, asset allocation, and fee drag.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#F4B942] mb-3 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#17202A] mb-1">Accountability Check-Ins</h4>
            <p className="text-xs text-[#52606D] leading-relaxed">
              Regular milestone reviews to ensure you stick to your savings targets and long-term roadmap.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#14B8A6] mb-3 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#17202A] mb-1">Direct Founder Access</h4>
            <p className="text-xs text-[#52606D] leading-relaxed">
              Higher tiers gain confidential direct access to the Founder & CEO for high-level business strategy.
            </p>
          </div>
        </div>

        {/* Visual Feature Spotlight with Real Coaching Environment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-[#ECFDF5]/50 border border-[#00A878]/20 rounded-3xl p-6 md:p-10">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A878] block">
              The Mentorship Advantage
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#17202A]">
              Never Navigate Complex Decisions in Isolation
            </h3>
            <p className="text-sm text-[#52606D] leading-relaxed">
              Most individual investors make their worst decisions during market extremes—buying at peak euphoria or panic selling during normal corrections. Having seasoned mentors and an accountability circle keeps you grounded in data and mathematical discipline.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#17202A]">
                <Check className="w-4 h-4 text-[#00A878] shrink-0 mt-0.5" />
                <span><strong>No Sales Agendas:</strong> We do not sell financial products or earn commissions on your trades.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#17202A]">
                <Check className="w-4 h-4 text-[#00A878] shrink-0 mt-0.5" />
                <span><strong>Holistic Integration:</strong> Connect personal investing with business cash flow and AI systems.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#17202A]">
                <Check className="w-4 h-4 text-[#00A878] shrink-0 mt-0.5" />
                <span><strong>Private Mastermind:</strong> Network with verified professionals, founders, and serious investors.</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => onApply()}
                className="py-3 px-6 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2"
              >
                <span>Apply for Mentorship</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group bg-white">
              <img
                src={mentorshipImage}
                alt="EB Wealth Executive Mentorship & Strategy Sessions"
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
                  Structured Mentorship Framework
                </div>
                <div className="text-[11px] text-[#52606D] mt-0.5">
                  Direct guidance, cohort accountability, and private strategy sessions.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Mentorship Tiers Grid */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-[#17202A]">
              Choose Your Mentorship Pathway
            </h3>
            <p className="text-xs sm:text-sm text-[#52606D] mt-1.5">
              Selective intakes designed to ensure close attention, high engagement, and genuine accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {MENTORSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-7 rounded-3xl border flex flex-col justify-between transition-all ${
                  tier.featured
                    ? 'bg-white border-[#00A878] shadow-lg ring-2 ring-[#00A878]/10'
                    : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300 hover:bg-white shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#00A878] uppercase">
                      {tier.badge}
                    </span>
                    <span className="text-[11px] text-[#52606D] font-medium">
                      {tier.commitment}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-[#17202A] mb-2">
                    {tier.title}
                  </h4>
                  <p className="text-xs text-[#52606D] leading-relaxed mb-6">
                    {tier.tagline}
                  </p>

                  <div className="pt-4 border-t border-slate-200/80 mb-6">
                    <div className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
                      Key Inclusions:
                    </div>
                    <ul className="space-y-2.5">
                      {tier.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#17202A]">
                          <Check className="w-3.5 h-3.5 text-[#00A878] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/80 mt-auto">
                  <div className="text-[11px] text-[#52606D] mb-4">
                    <strong>Ideal for:</strong> {tier.idealFor}
                  </div>
                  <button
                    onClick={() => onApply(tier)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      tier.featured
                        ? 'bg-[#00A878] hover:bg-[#009267] text-white shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-[#17202A] border border-slate-200'
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

        {/* Regulatory note reminder */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] text-slate-400">
            Mentorship programs are strictly educational and strategic consulting. We do not provide regulated personal investment advice or asset management.
          </p>
        </div>
      </div>
    </section>
  );
};
