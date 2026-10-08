import React from 'react';
import { TESTIMONIALS } from '../data/content';
import { Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#00A878] font-bold mb-2">
            Authentic Member Outcomes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17202A]">
            Real Results Across Investing & Business
          </h2>
          <p className="text-sm sm:text-base text-[#52606D] mt-2">
            Feedback and experiences from professionals, business owners, and learners within the EB Wealth ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-slate-300 hover:bg-white transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00A878] mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.verifiedResult}</span>
                </div>

                <Quote className="w-6 h-6 text-slate-300 mb-2" />
                <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 mt-auto">
                <div className="font-bold text-[#17202A] text-xs">{t.name}</div>
                <div className="text-[11px] text-[#52606D]">{t.title} · {t.organization}</div>
                <div className="text-[10px] font-medium text-[#00A878] mt-1">Pathway: {t.program}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
