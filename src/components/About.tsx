import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles, Quote, ArrowRight, BookOpen, CheckCircle2, Lock } from 'lucide-react';
import { FOUNDER_IMAGE_URL } from '../data/content';

interface AboutProps {
  onOpenMentorship: () => void;
  onOpenGetStarted?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenMentorship, onOpenGetStarted }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] mb-2">
            <span>Our Mission & Core Beliefs</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Demystifying Long-Term Wealth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            The Story Behind EB Wealth
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mt-4 leading-relaxed">
            EB Wealth was founded on a simple conviction: <strong>ordinary people deserve straightforward, jargon-free investment education.</strong> Building long-term wealth should not require an economics degree, nor should it depend on speculative gambles or high-fee active managers.
          </p>
        </div>

        {/* Story Grid: The Philosophy & The Founder Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Authentic Founder Photo with Clean Framing */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100">
                <img
                  src={FOUNDER_IMAGE_URL}
                  alt="Founder and CEO of EB Wealth"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('ceo_suit_portrait')) {
                      target.src = '/images/ceo_suit_portrait_1791395753240.jpg';
                    }
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent p-5 text-white">
                  <div className="text-xs font-semibold tracking-wider uppercase text-blue-200">
                    Founder & Head of Investment Education
                  </div>
                  <div className="text-base font-bold">
                    EB Wealth
                  </div>
                </div>
              </div>

              {/* Quick Trust Badges below photo */}
              <div className="grid grid-cols-3 gap-2 mt-3 p-3 bg-[#F8FAFC] border border-slate-200/70 rounded-xl text-center">
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">6 Levels</div>
                  <div className="text-[10px] text-slate-500">Structured Path</div>
                </div>
                <div className="border-x border-slate-200">
                  <div className="text-xs font-bold text-[#2563EB]">100% Educational</div>
                  <div className="text-[10px] text-slate-500">Zero Jargon</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-600">UK ISAs</div>
                  <div className="text-[10px] text-slate-500">Tax Shelters</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-blue-200 text-xs text-[#1E3A8A] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Statutory Notice:</strong> EB Wealth provides financial education and conceptual masterclasses. We do not offer regulated investment advice or manage third-party capital.
              </p>
            </div>
          </div>

          {/* Right Column: Mission Narrative, Why We Exist & Core Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-[#475569] leading-relaxed">
              <p>
                For decades, the financial industry has deliberately made investing seem intimidating, overwhelming, and exclusive. Complex acronyms, conflicting financial news, and speculative crypto hype leave ordinary beginners paralyzed by fear of losing money.
              </p>
              <p>
                At the same time, saving cash alone in standard bank accounts guarantees a steady loss of purchasing power year after year to inflation.
              </p>
              <p className="font-medium text-[#0F172A] bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80">
                "Our single mission at EB Wealth is to take someone from 'I know nothing about investing and I am afraid of losing money' to 'I understand the mechanics of stocks, ETFs, and UK ISAs, and I know exactly what step to take next.'"
              </p>
              <p>
                Through structured curriculum levels, interactive simulators, live cohort masterclasses, and private 1-on-1 consultations, we equip our members with the bedrock principles of sensible, low-cost, multi-decade capital compounding.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center mb-2.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">Clarity Over Jargon</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  We translate balance sheets, P/E ratios, and fund fees into plain English that any beginner can grasp immediately.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">Evidence-Based Investing</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  We focus on low-cost global indexing, true diversification, and patient compounding rather than speculative get-rich-quick schemes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">UK Tax Efficiency</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  We demystify HMRC tax wrappers — Stocks & Shares ISAs, Junior ISAs, and SIPPs — so you protect your returns from unnecessary taxes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2.5">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">Personal Accountability</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Knowledge without consistency is useless. Our masterclasses provide the discipline and peer community to stick to your long-term plan.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenMentorship}
                className="py-3 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center gap-2"
              >
                <span>Apply for Mentorship Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenGetStarted && (
                <button
                  onClick={onOpenGetStarted}
                  className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  Determine Your Starting Level
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
