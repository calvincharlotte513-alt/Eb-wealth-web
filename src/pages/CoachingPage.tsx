import React from 'react';
import { COACHING_PACKAGES } from '../data/content';
import { CoachingPackage } from '../types';
import { Target, Clock, Check, ArrowRight, ShieldCheck, Download, Smartphone } from 'lucide-react';
import { PageId } from '../types/navigation';

interface CoachingPageProps {
  onNavigate: (page: PageId) => void;
  onBookSession: (pkg: CoachingPackage) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const CoachingPage: React.FC<CoachingPageProps> = ({
  onNavigate,
  onBookSession,
  onOpenAppDownload,
  onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-neutral-100 bg-neutral-950">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-neutral-900 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
            <Smartphone className="w-4 h-4" />
            <span>EB Wealth App · Private 1-on-1 Rooms</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Targeted Strategic Clarity</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display max-w-4xl">
            Investment Clarity & Business Accountability.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mt-4 leading-relaxed">
            Eliminate mental drag, unearth fee leakages, and construct an actionable capital reallocation plan. Book and host encrypted 1-on-1 consultations directly inside the <strong>EB Wealth Mobile App</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenAppDownload('One-to-One Executive Coaching')}
              className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download App to Schedule Session (APK v2.4.0)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4-Stage Coaching Methodology */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2 block">
              The Advisory Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              How We Engineer Strategic Breakthroughs
            </h2>
            <p className="text-sm text-neutral-300 mt-3">
              Every coaching session follows a structured, forensic workflow designed to maximize your return on time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                step: '01',
                title: 'In-App Intake',
                desc: 'Submit your asset allocation breakdown, liquidity reserves, and primary questions in the app.'
              },
              {
                step: '02',
                title: 'Forensic Audit',
                desc: 'Our advisory team analyzes fee drag, tax vulnerabilities, and idle capital drag.'
              },
              {
                step: '03',
                title: 'App Video Call',
                desc: 'Intensive encrypted video consultation addressing your exact portfolio, deal, or business growth questions.'
              },
              {
                step: '04',
                title: 'Vault Delivery',
                desc: 'Receive your customized step-by-step PDF execution roadmap directly in your app vault.'
              }
            ].map((s) => (
              <div key={s.step} className="p-6 bg-neutral-900/70 border border-neutral-800 rounded-2xl relative">
                <span className="text-xs font-mono font-bold text-blue-400 block mb-2">{s.step}. STAGE</span>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Coaching Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {COACHING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{pkg.duration}</span>
                    </span>
                    <span className="text-sm font-semibold text-blue-400">
                      {pkg.accessTier || 'Private Consultation'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight font-display mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

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
                    onClick={() => onOpenAppDownload(`Coaching: ${pkg.title}`)}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download App to Book Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="py-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Regulatory Notice:</strong> Private coaching sessions provide educational analysis, balance sheet structuring, and business accountability.
              </span>
            </div>
            <button
              onClick={onOpenDisclosures}
              className="text-blue-400 hover:text-blue-300 underline font-medium whitespace-nowrap cursor-pointer"
            >
              Statutory Disclosures
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
