import React from 'react';
import { X, BookOpen, Compass, Target, Cpu, Smartphone, ArrowRight } from 'lucide-react';
import { PageId } from '../types/navigation';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  onOpenAppDownload: (featureName?: string) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenAppDownload
}) => {
  if (!isOpen) return null;

  const pathways = [
    {
      title: 'I am a beginner wanting to learn investing foundations',
      subtitle: 'Understand stocks, ETFs, compounding, and UK ISAs without confusing jargon.',
      icon: <BookOpen className="w-5 h-5 text-[#00A878]" />,
      action: () => {
        onClose();
        onNavigate('academy');
      },
      tag: 'Academy · Level 1–3'
    },
    {
      title: 'I want structured mentorship and regular accountability',
      subtitle: 'Join bi-weekly strategy cohorts, portfolio logic reviews, and a disciplined peer mastermind.',
      icon: <Compass className="w-5 h-5 text-[#D97706]" />,
      action: () => {
        onClose();
        onNavigate('mentorship');
      },
      tag: 'Mentorship Cohorts'
    },
    {
      title: 'I want a private 1-on-1 strategic deep dive',
      subtitle: 'Dedicated session on your personal financial roadmap, asset allocation, or business cash flow.',
      icon: <Target className="w-5 h-5 text-[#2563EB]" />,
      action: () => {
        onClose();
        onNavigate('coaching');
      },
      tag: '1-to-1 Consultation'
    },
    {
      title: 'I want to integrate AI into my business operations',
      subtitle: 'Custom prompt engineering, workflow automation, and operational efficiency audits.',
      icon: <Cpu className="w-5 h-5 text-[#2563EB]" />,
      action: () => {
        onClose();
        onNavigate('ai-growth');
      },
      tag: 'AI Business Systems'
    },
    {
      title: 'I want to open or download the EB Wealth Mobile App',
      subtitle: 'Access interactive curricula, calculators, and daily market briefs on your phone.',
      icon: <Smartphone className="w-5 h-5 text-[#00A878]" />,
      action: () => {
        onClose();
        onOpenAppDownload('EB Wealth Mobile Suite');
      },
      tag: 'iOS & Android APK'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#17202A] my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#17202A] transition-colors p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00A878]">
            Welcome to EB Wealth
          </span>
          <h3 className="text-2xl font-bold text-[#17202A] mt-1">
            Where would you like to start?
          </h3>
          <p className="text-xs text-[#52606D] mt-1">
            Choose the pathway that best matches your immediate goals:
          </p>
        </div>

        <div className="space-y-3">
          {pathways.map((path, idx) => (
            <div
              key={idx}
              onClick={path.action}
              className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-[#00A878] hover:bg-[#ECFDF5]/40 transition-all flex items-start justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  {path.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-[#17202A] group-hover:text-[#00A878] transition-colors">
                      {path.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#52606D] leading-snug">
                    {path.subtitle}
                  </p>
                  <span className="inline-block text-[10px] font-semibold text-[#00A878] mt-1">
                    {path.tag}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00A878] group-hover:translate-x-1 transition-all shrink-0 mt-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
