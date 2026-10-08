import React from 'react';
import { MENTORSHIP_TIERS } from '../data/content';
import { MentorshipTier } from '../types';
import { Compass, Check, ArrowRight, ShieldCheck, Lock, Star, Download, Smartphone } from 'lucide-react';
import mentorshipImage from '../assets/images/mentorship_coaching_1791394783951.jpg';

interface MentorshipProps {
  onApply: (tier?: MentorshipTier) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const Mentorship: React.FC<MentorshipProps> = ({
  onApply,
  onOpenAppDownload,
  onOpenDisclosures
}) => {
  return (
    <section id="mentorship" className="py-24 bg-neutral-900 text-neutral-100 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-wider uppercase text-amber-400 font-semibold mb-2">
            <Compass className="w-4 h-4" />
            <span>Tailored Executive Mentorship</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Hosted in the EB Wealth App</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            High-Stakes Capital Strategy, Tailored to You
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
            The private deal room, pro forma audits, and direct confidential advisory channel with the Founder & CEO are managed exclusively through our secure mobile application.
          </p>
        </div>

        {/* Feature Spotlight: Mentorship Suite Photo & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-neutral-950/80 border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 block">
              The Mobile Advisory Experience
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Uncompromising Due Diligence & Encrypted In-App Communications
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Every prospective syndication, private placement, and business acquisition is shared and audited inside our encrypted in-app Deal Room. Download the app to review submissions and connect directly with leadership.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Private In-App Deal Room:</strong> Real-time feeds of syndicated real estate & private credit teardowns.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Encrypted In-App Messaging:</strong> Direct VIP channel with the Founder & CEO protected by end-to-end security.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                <Star className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Live Deal Strategy Rooms:</strong> Push notifications for time-sensitive investment allocation windows.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenAppDownload('EB Wealth Private Deal Room')}
                className="py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download App to Access Deal Room</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group">
              <img
                src={mentorshipImage}
                alt="EB Wealth Executive Mentorship and Private Consultation"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  Executive Retainer
                </span>
                <span className="text-sm font-semibold text-white mt-0.5">
                  Private 1-on-1 Deep Dives with the Founder & CEO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentorship Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {MENTORSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                tier.featured
                  ? 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-amber-500/50 shadow-2xl shadow-amber-950/20 relative'
                  : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
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

                <h3 className="text-2xl font-bold text-white tracking-tight font-display mb-2">
                  {tier.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mb-6">
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

              {/* Bottom Card Footer linking to the app */}
              <div className="pt-6 border-t border-neutral-800">
                <div className="text-xs text-neutral-400 mb-4">
                  <strong className="text-neutral-200">Ideal For:</strong> {tier.idealFor}
                </div>
                <div className="text-[11px] text-neutral-500 mb-4 font-mono">
                  {tier.priceNote}
                </div>

                <button
                  onClick={() => onOpenAppDownload(`Mentorship: ${tier.title}`)}
                  className={`w-full py-3 px-5 font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
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

        {/* Regulatory Disclosure */}
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <span>
            <strong>Compliance Disclaimer:</strong> EB Wealth Mentorship does not provide discretionary asset management or broker-dealer transactions. All decisions remain strictly client-directed.
          </span>
          <button
            onClick={onOpenDisclosures}
            className="text-amber-400 hover:text-amber-300 underline font-medium whitespace-nowrap cursor-pointer text-xs"
          >
            Review Legal Terms
          </button>
        </div>
      </div>
    </section>
  );
};
