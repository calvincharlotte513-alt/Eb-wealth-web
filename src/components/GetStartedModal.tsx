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
      icon: <BookOpen className="w-5 h-5 text-[#C5A869]" />,
      action: () => {
        onClose();
        onNavigate('academy');
      },
      tag: 'Academy · Core Foundations'
    },
    {
      title: 'I want to understand stocks, ETFs and UK ISAs',
      subtitle: 'Explore index funds, single stocks, asset allocation, and tax-sheltered investment accounts.',
      icon: <TrendingUp className="w-5 h-5 text-[#C5A869]" />,
      action: () => {
        onClose();
        onNavigate('academy');
      },
      tag: 'Academy · Assets & Tax Wrappers'
    },
    {
      title: 'I want structured investment masterclasses & mentorship',
      subtitle: 'Comprehensive cohort modules on portfolio building, risk management, and market mechanics with peer accountability.',
      icon: <GraduationCap className="w-5 h-5 text-[#C5A869]" />,
      action: () => {
        onClose();
        onNavigate('mentorship');
      },
      tag: 'Mentorship · Cohort Masterclasses'
    },
    {
      title: 'I want tools, calculators & investment simulators',
      subtitle: 'Access our UK compound growth simulator, ISA allowance calculator, and investment platform comparison.',
      icon: <Layers className="w-5 h-5 text-[#C5A869]" />,
      action: () => {
        onClose();
        onNavigate('tools');
      },
      tag: 'Tools · Interactive Calculators'
    },
    {
      title: 'I want to speak 1-on-1 with an investment educator',
      subtitle: 'Book a private, objective educational deep dive into your investment roadmap, asset allocation questions, and fee drag.',
      icon: <PhoneCall className="w-5 h-5 text-[#C5A869]" />,
      action: () => {
        onClose();
        onNavigate('coaching');
      },
      tag: 'Coaching · 1-to-1 Consultation'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#08231B]/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-xs shadow-2xl p-6 sm:p-8 text-[#141E18] my-auto animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-stone-400 hover:text-stone-800 transition-colors p-2 rounded-xs hover:bg-stone-100 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-8">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
            EB Wealth Onboarding Protocol
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E] mt-1">
            Initiate Your Wealth Pathway
          </h3>
          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-sans">
            Select the educational orientation that best corresponds to your present capital roadmap:
          </p>
        </div>

        <div className="space-y-3">
          {pathways.map((pathway, idx) => (
            <button
              key={idx}
              onClick={pathway.action}
              className="w-full text-left p-4 rounded-xs border border-stone-200 hover:border-[#C5A869] bg-[#FAF9F5] hover:bg-[#FAF5E8]/60 transition-all cursor-pointer group flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xs bg-[#0D3B2E] border border-[#C5A869]/40 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#C5A869]">
                {pathway.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-sm font-bold text-[#0D3B2E] group-hover:text-[#0D3B2E] transition-colors leading-snug">
                    {pathway.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C5A869] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed font-sans">
                  {pathway.subtitle}
                </p>
                <div className="mt-2 inline-block px-2 py-0.5 rounded-xs text-[10px] font-mono font-semibold bg-white border border-stone-200 text-[#0D3B2E] group-hover:border-[#C5A869] transition-colors">
                  {pathway.tag}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 text-center">
          <p className="text-xs text-stone-600 font-sans">
            Unsure of your starting point? Begin with our{' '}
            <button
              onClick={() => {
                onClose();
                onNavigate('tools');
              }}
              className="text-[#0D3B2E] font-semibold underline hover:text-[#C5A869] cursor-pointer"
            >
              Quantitative Compounding Calculator
            </button>{' '}
            or review{' '}
            <button
              onClick={() => {
                onClose();
                onNavigate('academy');
              }}
              className="text-[#0D3B2E] font-semibold underline hover:text-[#C5A869] cursor-pointer"
            >
              Level 1 Core Foundations
            </button>.
          </p>
        </div>
      </div>
    </div>
  );
};
