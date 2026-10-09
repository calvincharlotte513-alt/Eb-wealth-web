import React from 'react';
import { TESTIMONIALS } from '../data/content';
import { Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-2">
            Longitudinal Investor Outcomes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0D3B2E]">
            Empirical Results Across Decades of Compounding
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Case studies from beginners, corporate directors, and healthcare professionals within the EB Wealth investment education community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-sm bg-[#FAF9F5] border border-[#C5A869]/30 hover:border-[#C5A869] hover:bg-white transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0D3B2E] mb-3 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869] shrink-0" />
                  <span className="text-[11px]">{t.verifiedResult}</span>
                </div>

                <Quote className="w-5 h-5 text-[#C5A869]/60 mb-2" />
                <p className="text-xs sm:text-sm text-[#2B3632] leading-relaxed italic mb-6 font-serif">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 mt-auto">
                <div className="font-serif font-bold text-[#0D3B2E] text-sm">{t.name}</div>
                <div className="text-[11px] text-stone-600">{t.title} · {t.organization}</div>
                <div className="text-[10px] font-mono text-[#9E8040] font-semibold mt-1 uppercase tracking-wider">Track: {t.program}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
