import React from 'react';
import { TESTIMONIALS } from '../data/content';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-950 text-neutral-100 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            Verified Member Outcomes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-display">
            Real Impact Across Capital & Enterprise
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Attributable results from founders, accredited investors, and operators within the EB Wealth ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                {/* Result Pill-free headline */}
                <div className="text-xs font-semibold text-emerald-400 font-mono mb-3">
                  {t.verifiedResult}
                </div>

                <Quote className="w-6 h-6 text-neutral-700 mb-2" />
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-xs text-neutral-400">{t.title} · {t.organization}</div>
                <div className="text-[11px] text-neutral-500 mt-1">Track: {t.program}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
