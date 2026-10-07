import React from 'react';
import { ArrowRight, Compass, Sparkles, BookOpen, Layers, Download, Smartphone } from 'lucide-react';

interface GetStartedProps {
  onDownloadApp: () => void;
  onExploreSimulator: () => void;
  onExploreAcademy: () => void;
}

export const GetStarted: React.FC<GetStartedProps> = ({
  onDownloadApp,
  onExploreSimulator,
  onExploreAcademy
}) => {
  return (
    <section id="get-started" className="py-24 bg-gradient-to-b from-neutral-900 to-neutral-950 text-neutral-100 border-t border-neutral-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
          <Smartphone className="w-4 h-4" />
          <span>Mobile Application Ecosystem</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance max-w-3xl mx-auto">
          Everything Lives Inside the App — Download EB Wealth Today.
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mt-4 leading-relaxed">
          This website serves as our public showcase. All full curricula, private syndication deal rooms, 1-on-1 coaching bookings, and proprietary AI systems are hosted directly inside our official mobile app.
        </p>

        {/* 3 Core Quick Links to the Suite */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto my-10 text-left">
          <button
            onClick={onExploreAcademy}
            className="p-5 bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 rounded-2xl transition-all group cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">EB Wealth Academy</h4>
            <p className="text-xs text-neutral-400">Preview 4 flagship curricula and self-paced allocation engines.</p>
          </button>

          <button
            onClick={onDownloadApp}
            className="p-5 bg-neutral-900/80 hover:bg-neutral-800/90 border border-emerald-500/40 rounded-2xl transition-all group cursor-pointer shadow-lg shadow-emerald-950/20"
          >
            <Smartphone className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Download Mobile APK</h4>
            <p className="text-xs text-neutral-400">Direct Android installer package (v2.4.0 · 42.8 MB).</p>
          </button>

          <button
            onClick={onExploreSimulator}
            className="p-5 bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 rounded-2xl transition-all group cursor-pointer"
          >
            <Layers className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Interactive Tools</h4>
            <p className="text-xs text-neutral-400">Simulate compounding returns and calculate AI business ROI.</p>
          </button>
        </div>

        {/* Primary Download Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onDownloadApp}
            className="py-4 px-8 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-extrabold text-sm sm:text-base rounded-2xl transition-all shadow-xl shadow-emerald-950/40 flex items-center gap-2.5 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Download EB Wealth App (APK v2.4.0)</span>
          </button>
        </div>

        <p className="text-xs text-neutral-500 mt-6">
          Verified Android Package · Virus & Malware Free · Automatic Background Updates
        </p>
      </div>
    </section>
  );
};
