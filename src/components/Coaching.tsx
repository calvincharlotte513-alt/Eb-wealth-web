import React from 'react';
import { COACHING_PACKAGES } from '../data/content';
import { CoachingPackage } from '../types';
import { Target, Clock, Check, ArrowRight, ShieldCheck, Download, Smartphone } from 'lucide-react';

interface CoachingProps {
  onBookSession: (pkg: CoachingPackage) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const Coaching: React.FC<CoachingProps> = ({ onBookSession, onOpenAppDownload, onOpenDisclosures }) => {
  return (
    <section id="coaching" className="py-24 bg-neutral-950 text-neutral-100 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-blue-400 font-semibold mb-2">
            <Target className="w-4 h-4" />
            <span>Personalized One-to-One Coaching</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Scheduled Directly In-App</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            Investment Clarity & Business Accountability
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
            Eliminate mental clutter and second-guessing. Dedicated private advisory sessions built to diagnose fee drag, optimize cash reserves, and hold you accountable. Book and conduct sessions directly through the <strong>EB Wealth Mobile App</strong>.
          </p>
        </div>

        {/* 4-Step Clarity Process Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { step: '01', title: 'App Diagnostic', desc: 'Complete our confidential balance sheet questionnaire in the app.' },
            { step: '02', title: 'Forensic Review', desc: 'We identify fee leaks, idle cash, and tax exposure across your assets.' },
            { step: '03', title: 'Encrypted HD Video', desc: 'Direct, focused strategic session conducted within the app room.' },
            { step: '04', title: 'In-App Roadmap', desc: 'Receive your customized step-by-step PDF roadmap in your app vault.' }
          ].map((item) => (
            <div key={item.step} className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
              <span className="text-xs font-mono font-bold text-blue-400 block mb-2">{item.step}.</span>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Coaching Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {COACHING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="p-7 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{pkg.duration}</span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-blue-400">
                    {pkg.accessTier || 'Private Consultation'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight font-display mb-2">
                  {pkg.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <div className="text-xs text-neutral-400 mb-4">
                  <strong className="text-neutral-200">Recommended For:</strong> {pkg.recommendedFor}
                </div>

                <button
                  onClick={() => onOpenAppDownload(`1-on-1 Coaching: ${pkg.title}`)}
                  className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download App to Book Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Disclaimers */}
        <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Regulatory Notice:</strong> Coaching sessions deliver educational analysis and business accountability. Individual outcomes vary based on discipline and execution.
            </span>
          </div>
          <button
            onClick={onOpenDisclosures}
            className="text-blue-400 hover:text-blue-300 underline font-medium whitespace-nowrap cursor-pointer text-xs"
          >
            Review Disclaimers
          </button>
        </div>
      </div>
    </section>
  );
};
