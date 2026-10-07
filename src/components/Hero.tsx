import React from 'react';
import { ArrowRight, Download, Smartphone } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onDownloadApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onDownloadApp }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Graphic & Media Carrier */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_eb_wealth_1791394753165.jpg"
          alt="EB Wealth Executive Headquarters and Private Family Office"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for contrast: ensures >= 4.5:1 contrast across all media frames */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
        {/* Subtle accent glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            {/* Mission Kicker with App Notice (Clean unboxed typography) */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm tracking-wide text-neutral-300">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider">Empowerment Body</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-300 font-medium">All Curricula & Deal Rooms Hosted In-App</span>
            </div>

            {/* Tagline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display text-balance leading-[1.1]">
              Master Capital.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                Scale With Intelligence.
              </span>{' '}
              Build Lasting Wealth.
            </h1>

            {/* Concise Mission */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              EB Wealth bridges institutional investment education, tailored high-touch mentorship, and proprietary AI business automation. Access all masterclasses, private deal reviews, and tactical tools directly on the <strong>EB Wealth Mobile App</strong>.
            </p>

            {/* Primary & Secondary CTAs (Linking directly to app download) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onDownloadApp}
                className="py-3 px-6 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 cursor-pointer group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download EB Wealth App (APK)</span>
              </button>

              <button
                onClick={onExplore}
                className="py-3 px-6 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm rounded-xl border border-neutral-700/80 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Platform Showcase</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Editorial Institutional Proof Adjacency */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl text-neutral-300">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums font-display">
                  $48M+
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Client Capital Advised
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-emerald-400 tabular-nums font-display">
                  24+
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Global Investor Hubs
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-amber-400 tabular-nums font-display">
                  v2.4.0
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Mobile App Release
                </div>
              </div>
            </div>
          </div>

          {/* Side Focus Card (Visual rest & mobile app portal preview) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="p-6 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="text-neutral-400">Mobile Ecosystem Hub</span>
                <span className="text-emerald-400 font-mono text-[11px]">APK AVAILABLE</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/60">
                  <span className="text-xs font-semibold text-white block">01. In-App Video Masterclasses</span>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Stream all 4 Academy courses offline with downloadable spreadsheets & templates.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/60">
                  <span className="text-xs font-semibold text-white block">02. Private Deal Room Feeds</span>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Receive real-time syndication deal breakdowns, pro forma audits, and risk notices.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/60">
                  <span className="text-xs font-semibold text-white block">03. AI Command Studio</span>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Deploy prompt engineering pipelines and autonomous workflows directly on mobile.
                  </p>
                </div>
              </div>

              <button
                onClick={onDownloadApp}
                className="w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Get EB Wealth on Android (APK)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
