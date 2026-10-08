import React from 'react';
import { COACHING_PACKAGES } from '../data/content';
import { CoachingPackage } from '../types';
import { Target, Clock, Check, ArrowRight, ShieldCheck, Calendar, FileText, Sparkles } from 'lucide-react';

interface CoachingProps {
  onBookSession: (pkg: CoachingPackage) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const Coaching: React.FC<CoachingProps> = ({ onBookSession, onOpenAppDownload, onOpenDisclosures }) => {
  return (
    <section id="coaching" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            <Target className="w-4 h-4" />
            <span>1-to-1 Private Coaching</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17202A] tracking-tight">
            Personalised Guidance for Your Financial and Business Roadmap.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#52606D] leading-relaxed">
            Tailored, objective guidance for individuals who want direct, confidential feedback on their investment knowledge, financial roadmap, business strategy, and AI integration.
          </p>
        </div>

        {/* 4 Core Inclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-xs mb-3">
              <Calendar className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#17202A] mb-1">Dedicated 1-on-1 Sessions</h4>
            <p className="text-xs text-[#52606D] leading-relaxed">
              Uninterrupted, focused time with seasoned leadership to address your specific questions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#00A878] flex items-center justify-center font-bold text-xs mb-3">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#17202A] mb-1">Pre-Session Review</h4>
            <p className="text-xs text-[#52606D] leading-relaxed">
              In-depth questionnaire analysis prior to the call ensures zero wasted time during our session.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold text-xs mb-3">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#17202A] mb-1">Tailored Action Plan</h4>
            <p className="text-xs text-[#52606D] leading-relaxed">
              Walk away with a concrete, prioritized written summary and 30-day implementation checklist.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] text-[#14B8A6] flex items-center justify-center font-bold text-xs mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#17202A] mb-1">Follow-Up Support</h4>
            <p className="text-xs text-[#52606D] leading-relaxed">
              Post-call check-in to answer clarifications and ensure momentum on your action items.
            </p>
          </div>
        </div>

        {/* Focus Areas Checklist */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs mb-16">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A878]">
              What We Cover Together
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#17202A] mt-1">
              Direct Feedback On Your Specific Situation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Investment Knowledge & Logic', desc: 'Clarifying ETFs, stocks, asset classes, and risk metrics.' },
              { title: 'Personal Financial Roadmap', desc: 'Structuring cash reserves, debt optimization, and savings rates.' },
              { title: 'Learning Curriculum Structure', desc: 'Creating a personalized study plan for your experience level.' },
              { title: 'UK Tax Shelters & Wrappers', desc: 'Understanding the practical rules for Stocks & Shares ISA and SIPP.' },
              { title: 'Business Strategy & Margins', desc: 'Translating business profits into sustainable personal wealth.' },
              { title: 'AI Integration for Business', desc: 'Deploying practical AI workflows to increase company leverage.' }
            ].map((area, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ECFDF5] text-[#00A878] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#17202A]">{area.title}</h5>
                  <p className="text-[11px] text-[#52606D] mt-0.5 leading-snug">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {COACHING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-xs text-[#2563EB] font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {pkg.accessTier}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#17202A] mb-2">
                  {pkg.title}
                </h4>
                <p className="text-xs text-[#52606D] leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="pt-4 border-t border-slate-100 mb-6">
                  <div className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
                    What is Included:
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#17202A]">
                        <Check className="w-3.5 h-3.5 text-[#00A878] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 mt-auto">
                <div className="text-[11px] text-[#52606D] mb-4">
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

        {/* Disclaimer Note */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] text-slate-400">
            Coaching sessions are educational and strategic consulting only. We do not provide regulated investment advice, personal portfolio management, or tax advice.
          </p>
        </div>
      </div>
    </section>
  );
};
