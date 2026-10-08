import React from 'react';
import { ArrowRight, BookOpen, Smartphone, Compass, Cpu, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types/navigation';

interface GetStartedProps {
  onNavigate: (page: PageId) => void;
  onOpenAppDownload: (featureName?: string) => void;
  onOpenGetStartedModal: () => void;
}

export const GetStarted: React.FC<GetStartedProps> = ({
  onNavigate,
  onOpenAppDownload,
  onOpenGetStartedModal
}) => {
  return (
    <section id="get-started" className="py-20 lg:py-28 bg-[#ECFDF5]/70 border-b border-[#00A878]/20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00A878] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#00A878]"></span>
          <span>Start Your Journey</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#17202A] max-w-3xl mx-auto">
          Ready to Learn, Invest and Build Long-Term Wealth?
        </h2>

        <p className="text-base sm:text-lg text-[#52606D] max-w-2xl mx-auto mt-4 leading-relaxed">
          Whether you are just getting started with your first index fund or scaling an existing enterprise, EB Wealth gives you the clarity, systems, and accountability to succeed.
        </p>

        {/* 4 Core Pathways Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto my-12 text-left">
          <div
            onClick={() => onNavigate('academy')}
            className="p-5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#00A878] rounded-2xl transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#00A878] flex items-center justify-center font-bold text-xs mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#17202A] mb-1">Academy</h4>
              <p className="text-xs text-[#52606D]">Learn investing foundations, ETFs, and UK ISA tax rules.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#00A878]">
              <span>Explore Courses</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('mentorship')}
            className="p-5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#00A878] rounded-2xl transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold text-xs mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#17202A] mb-1">Mentorship</h4>
              <p className="text-xs text-[#52606D]">Structured cohorts and accountability for consistent execution.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#D97706]">
              <span>View Cohorts</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('ai-growth')}
            className="p-5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#2563EB] rounded-2xl transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-xs mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#17202A] mb-1">AI Business Growth</h4>
              <p className="text-xs text-[#52606D]">Automate workflows, prompt engineering, and lead qualification.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2563EB]">
              <span>Scale with AI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onOpenAppDownload('EB Wealth Mobile Suite')}
            className="p-5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#00A878] rounded-2xl transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] text-[#00A878] flex items-center justify-center font-bold text-xs mb-3">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#17202A] mb-1">Mobile App</h4>
              <p className="text-xs text-[#52606D]">Access course modules, calculators, and briefings anywhere.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#00A878]">
              <span>Download APK</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Direct Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenGetStartedModal}
            className="py-3.5 px-8 bg-[#00A878] hover:bg-[#009267] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenAppDownload('EB Wealth Mobile Suite')}
            className="py-3.5 px-6 bg-white hover:bg-slate-50 text-[#17202A] border border-slate-200 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-[#2563EB]" />
            <span>Open EB Wealth App</span>
          </button>
        </div>
      </div>
    </section>
  );
};
