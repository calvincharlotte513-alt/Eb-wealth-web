import React from 'react';
import { X, BookOpen, TrendingUp, Layers, GraduationCap, PhoneCall, ArrowRight } from 'lucide-react';
import { PageId } from '../types/navigation';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  onOpenAppDownload?: (featureName?: string) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  const pathways = [
    {
      title: 'I am a complete beginner wanting to learn the fundamentals',
      subtitle: 'Understand what investing actually is, how markets work, and how compounding builds long-term wealth.',
      icon: <BookOpen className="w-5 h-5 text-[#2563EB]" />,
      action: () => {
        onClose();
        onNavigate('academy');
      },
      tag: 'Academy · Core Foundations'
    },
    {
      title: 'I want to understand stocks, ETFs and UK ISAs',
      subtitle: 'Explore index funds, single stocks, asset allocation, and tax-sheltered investment accounts.',
      icon: <TrendingUp className="w-5 h-5 text-[#2563EB]" />,
      action: () => {
        onClose();
        onNavigate('academy');
      },
      tag: 'Academy · Assets & Tax Wrappers'
    },
    {
      title: 'I want structured investment masterclasses & mentorship',
      subtitle: 'Comprehensive cohort modules on portfolio building, risk management, and market mechanics with peer accountability.',
      icon: <GraduationCap className="w-5 h-5 text-amber-600" />,
      action: () => {
        onClose();
        onNavigate('mentorship');
      },
      tag: 'Mentorship · Cohort Masterclasses'
    },
    {
      title: 'I want tools, calculators & investment simulators',
      subtitle: 'Access our UK compound growth simulator, ISA allowance calculator, and investment platform comparison.',
      icon: <Layers className="w-5 h-5 text-sky-600" />,
      action: () => {
        onClose();
        onNavigate('tools');
      },
      tag: 'Tools · Interactive Calculators'
    },
    {
      title: 'I want to speak 1-on-1 with an investment educator',
      subtitle: 'Book a private, objective educational deep dive into your investment roadmap, asset allocation questions, and fee drag.',
      icon: <PhoneCall className="w-5 h-5 text-emerald-600" />,
      action: () => {
        onClose();
        onNavigate('coaching');
      },
      tag: 'Coaching · 1-to-1 Consultation'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#0F172A] my-auto animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
            EB Wealth Investment Education
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">
            Start Your Investing Journey
          </h3>
          <p className="text-xs sm:text-sm text-[#52606D] mt-1.5 leading-relaxed">
            Choose the pathway that best matches where you are today:
          </p>
        </div>

        <div className="space-y-3">
          {pathways.map((pathway, idx) => (
            <button
              key={idx}
              onClick={pathway.action}
              className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-[#2563EB]/40 bg-[#F8FAFC] hover:bg-blue-50/40 transition-all cursor-pointer group flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#2563EB]/30">
                {pathway.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {pathway.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                  {pathway.subtitle}
                </p>
                <div className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-colors">
                  {pathway.tag}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-[#64748B]">
            Not sure? Start with our free{' '}
            <button
              onClick={() => {
                onClose();
                onNavigate('tools');
              }}
              className="text-[#2563EB] font-semibold hover:underline cursor-pointer"
            >
              Compound Growth Calculator
            </button>{' '}
            or explore{' '}
            <button
              onClick={() => {
                onClose();
                onNavigate('academy');
              }}
              className="text-[#2563EB] font-semibold hover:underline cursor-pointer"
            >
              Level 1 Foundations
            </button>.
          </p>
        </div>
      </div>
    </div>
  );
};
