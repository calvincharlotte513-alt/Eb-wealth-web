import React from 'react';
import { MENTORSHIP_TIERS } from '../data/content';
import { MentorshipTier } from '../types';
import { Compass, Check, ArrowRight, ShieldCheck, Lock, Star, Download, Smartphone } from 'lucide-react';
import { PageId } from '../types/navigation';

interface MentorshipPageProps {
  onNavigate: (page: PageId) => void;
  onApply: (tier?: MentorshipTier) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const MentorshipPage: React.FC<MentorshipPageProps> = ({
  onNavigate,
  onApply,
  onOpenAppDownload,
  onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-neutral-100 bg-neutral-950">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-neutral-900 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
            <Smartphone className="w-4 h-4" />
            <span>EB Wealth App · Private Deal Room</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Direct CEO Advisory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display max-w-4xl">
            Tailored Capital Advisory & Private Deal Room Access.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mt-4 leading-relaxed">
            When capital allocation decisions cross six and seven figures, standard courses are insufficient. Work directly with the Founder & CEO to stress-test private deals, shield assets, and engineer tax-efficient compound engines directly inside the <strong>EB Wealth Mobile App</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenAppDownload('Executive Mentorship & Deal Room')}
              className="py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download App to Apply (APK v2.4.0)</span>
            </button>
            <span className="text-xs text-neutral-400">
              Admissions conducted via encrypted in-app portal
            </span>
          </div>
        </div>
      </section>

      {/* The Mentorship Difference: Deal Room Spotlight */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                The Inner Sanctum
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                Inside the Mobile Deal Room
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Most high earners get pitched syndicated real estate deals, private credit debt funds, and business acquisitions without the underwriting experience to evaluate them.
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Inside the EB Wealth mobile application, our private deal room delivers forensic audits on active syndications, pro forma spreadsheets, sponsor fee breakdowns, and direct video briefings with leadership.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Comprehensive Pro Forma Teardown:</strong> Uncover hidden sponsor management fees, optimistic vacancy assumptions, and refinancing risks.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Institutional Non-Disclosure:</strong> Full confidentiality guaranteed under mutual non-disclosure agreements.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <Star className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Encrypted In-App Advisory:</strong> Direct encrypted messaging channel with the Founder & CEO.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl group">
                <img
                  src="/src/assets/images/mentorship_coaching_1791394783951.jpg"
                  alt="EB Wealth Executive Mentorship Boardroom Consultation"
                  className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Admissions By Application Only
                  </span>
                  <span className="text-sm font-semibold text-white mt-0.5">
                    Download the EB Wealth app to submit your confidential portfolio profile.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mentorship Tiers Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {MENTORSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  tier.featured
                    ? 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-amber-500/50 shadow-2xl shadow-amber-950/20 relative'
                    : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      tier.featured ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {tier.badge}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {tier.commitment}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                    {tier.tagline}
                  </p>

                  <div className="space-y-3 mb-8">
                    {tier.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.featured ? 'text-amber-400' : 'text-emerald-400'
                        }`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800">
                  <div className="text-xs text-neutral-400 mb-2">
                    <strong className="text-neutral-200">Ideal Candidate:</strong> {tier.idealFor}
                  </div>
                  <div className="text-[11px] text-neutral-500 mb-4 font-mono">
                    {tier.priceNote}
                  </div>

                  <button
                    onClick={() => onOpenAppDownload(`Mentorship: ${tier.title}`)}
                    className={`w-full py-3.5 px-6 font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      tier.featured
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download App to Apply</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Admissions Criteria Bento */}
          <div className="p-8 bg-neutral-900/60 border border-neutral-800 rounded-3xl">
            <h3 className="text-xl font-bold text-white font-display mb-4">
              Admissions Criteria & Vetting Standards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
              <div className="space-y-2">
                <span className="font-bold text-white uppercase tracking-wider block text-xs">
                  01. Investable Capital
                </span>
                <p className="text-neutral-400">
                  Candidates should possess significant liquid capital reserves (typically £200,000+) or an active operating enterprise generating robust monthly commercial profit.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-bold text-white uppercase tracking-wider block text-xs">
                  02. Execution Integrity
                </span>
                <p className="text-neutral-400">
                  We look for leaders who execute decisively. Recommendations provided during bi-weekly sessions must be implemented with rigor.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-bold text-white uppercase tracking-wider block text-xs">
                  03. Peer Discretion
                </span>
                <p className="text-neutral-400">
                  Advisory masterminds and deal analyses are held under strict non-disclosure. Integrity and discretion are absolute requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Disclaimer */}
      <section className="py-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
            <span>
              <strong>Compliance Notice:</strong> EB Wealth Mentorship provides educational deal framework analysis and executive strategy. It does not provide registered investment advisory services or pooled fund management.
            </span>
            <button
              onClick={onOpenDisclosures}
              className="text-amber-400 hover:text-amber-300 underline font-medium whitespace-nowrap cursor-pointer"
            >
              Statutory Disclosures
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
