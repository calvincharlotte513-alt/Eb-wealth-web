import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles, Quote, ArrowRight, Heart, Brain, Lock } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00A878] mb-2">
            <span>The Empowerment Body Legacy</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Founded for Long-Term Sovereignty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17202A] tracking-tight">
            The Story Behind EB Wealth
          </h2>
          <p className="text-base sm:text-lg text-[#52606D] mt-4 leading-relaxed">
            EB Wealth was born out of <strong>Empowerment Body</strong>—a foundational philosophy that true sovereignty requires the alignment of personal discipline, intelligent capital stewardship, and modern technological leverage.
          </p>
        </div>

        {/* Story Grid: The Philosophy & The Founder Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Authentic CEO Photo with Clean Framing */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100">
                <img
                  src={FOUNDER_IMAGE_URL}
                  alt="Founder and CEO of EB Wealth & Empowerment Body"
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17202A]/90 via-[#17202A]/40 to-transparent p-5 text-white">
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#ECFDF5]">
                    Founder & Chief Executive Officer
                  </div>
                  <div className="text-base font-bold">
                    EB Wealth · Empowerment Body
                  </div>
                </div>
              </div>

              {/* Quick Trust Badges below photo */}
              <div className="grid grid-cols-3 gap-2 mt-3 p-3 bg-[#F8FAFC] border border-slate-200/70 rounded-xl text-center">
                <div>
                  <span className="block text-xs font-bold text-[#17202A]">Discipline</span>
                  <span className="text-[10px] text-[#52606D] uppercase">First Principle</span>
                </div>
                <div className="border-x border-slate-200">
                  <span className="block text-xs font-bold text-[#00A878]">Human</span>
                  <span className="text-[10px] text-[#52606D] uppercase">Mentorship</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#2563EB]">Leverage</span>
                  <span className="text-[10px] text-[#52606D] uppercase">AI & Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Vision & Bio */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#52606D] leading-relaxed">
            <div className="p-6 rounded-2xl bg-[#ECFDF5]/50 border border-[#00A878]/20 text-[#17202A]">
              <p className="font-medium text-sm leading-relaxed italic">
                "We do not promise overnight windfalls or get-rich-quick shortcuts. True wealth creation is the compounding result of deep financial education, emotional composure, healthy habits, and scalable technology systems."
              </p>
              <div className="mt-3 text-xs font-bold text-[#00A878]">
                — Founder & CEO, EB Wealth & Empowerment Body
              </div>
            </div>

            <p>
              In an era overwhelmed by social media noise, sensationalized trading hype, and complex financial gatekeepers, ordinary investors are too often excluded, while busy professionals leave hard-earned money trapped in cash losing purchasing power every single year to inflation.
            </p>

            <p>
              <strong>Empowerment Body</strong> was founded on the belief that true independence is multifaceted: you need physical vitality and mental discipline, but you also need sovereign control over your balance sheet and your time.
            </p>

            <p>
              EB Wealth strips away the high-fee advisory jargon. We teach you how to evaluate index funds, construct resilient multi-asset portfolios, use legal UK tax wrappers like the Stocks & Shares ISA and SIPP, and harness AI tools to build scalable leverage in your business.
            </p>

            {/* 4 Pillars of Empowerment Body */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#17202A] mb-1">
                  <Brain className="w-4 h-4 text-[#00A878]" />
                  <span>Lifelong Financial Literacy</span>
                </div>
                <p className="text-xs text-[#52606D]">
                  Understanding companies, balance sheets, and compounding removes fear and irrational decision-making.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#17202A] mb-1">
                  <Lock className="w-4 h-4 text-[#2563EB]" />
                  <span>Tax-Sheltered Compounding</span>
                </div>
                <p className="text-xs text-[#52606D]">
                  Utilising HMRC ISA and pension allowances keeps your wealth safe from unnecessary tax drag.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#17202A] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#F4B942]" />
                  <span>Accountability & Habits</span>
                </div>
                <p className="text-xs text-[#52606D]">
                  Structured cohorts and check-ins ensure you maintain your savings rate and investment discipline.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#17202A] mb-1">
                  <TrendingUp className="w-4 h-4 text-[#14B8A6]" />
                  <span>Practical AI Leverage</span>
                </div>
                <p className="text-xs text-[#52606D]">
                  Automating repetitive business workflows gives you back hours to focus on high-yield strategy.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenMentorship}
                className="py-3 px-6 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>Apply for Mentorship with the Founder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
