import React, { useState } from 'react';
import { RESEARCH_BRIEFINGS, ResearchBriefing } from '../data/content';
import { ArrowRight, BookOpen, Clock, X, ChevronRight, Share2, Check } from 'lucide-react';
import briefingImage from '../assets/images/gs_research_briefing_1791537967314.jpg';

interface ResearchBriefingsProps {
  onOpenAppDownload?: () => void;
}

export const ResearchBriefings: React.FC<ResearchBriefingsProps> = ({ onOpenAppDownload }) => {
  const [activeBriefing, setActiveBriefing] = useState<ResearchBriefing | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (briefing: ResearchBriefing) => {
    navigator.clipboard.writeText(`${window.location.origin}/#briefing-${briefing.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#9E8040]">
              <span className="w-2 h-2 rounded-full bg-[#C5A869]"></span>
              <span>EB WEALTH BRIEFINGS & GLOBAL RESEARCH</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
              Institutional Perspectives. <br />
              <span className="font-normal italic text-[#C5A869]">Disciplined Compounding.</span>
            </h2>
            <p className="text-base text-[#2B3632] leading-relaxed max-w-2xl">
              We translate multi-decade market datasets, tax architecture rules, and academic finance literature into accessible, rigorous briefings for aspiring investors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Autumn 2026 Release
            </span>
          </div>
        </div>

        {/* Featured Research Card + Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Lead Editorial Feature (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-[#C5A869]/35 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#07251C]">
              <img
                src={briefingImage}
                alt="EB Wealth Institutional Macro Research Desk"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('gs_research_briefing')) {
                    target.src = '/images/gs_research_briefing_1791537967314.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07251C]/90 via-[#07251C]/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#DFCA96]">
                    Featured Lead Briefing
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                    {RESEARCH_BRIEFINGS[0].title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="font-semibold text-[#0D3B2E]">{RESEARCH_BRIEFINGS[0].tag}</span>
                  <span aria-hidden="true">·</span>
                  <span>{RESEARCH_BRIEFINGS[0].date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{RESEARCH_BRIEFINGS[0].readTime}</span>
                </div>
                <p className="text-sm text-[#2B3632] leading-relaxed">
                  {RESEARCH_BRIEFINGS[0].summary}
                </p>
                <div className="bg-[#FAF9F5] p-3.5 rounded-sm border border-[#C5A869]/30 text-xs text-[#0D3B2E]">
                  <span className="font-bold text-[#9E8040] uppercase tracking-wide block mb-1">
                    Key Institutional Takeaway:
                  </span>
                  {RESEARCH_BRIEFINGS[0].takeaway}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveBriefing(RESEARCH_BRIEFINGS[0])}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0D3B2E] hover:text-[#9E8040] uppercase tracking-wider transition-colors cursor-pointer group"
                >
                  <span>Read Full Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs text-stone-400 font-mono">01 of 03</span>
              </div>
            </div>
          </div>

          {/* Secondary Briefing Column (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {RESEARCH_BRIEFINGS.slice(1).map((briefing, idx) => (
              <div
                key={briefing.id}
                className="bg-white p-7 rounded-sm border border-[#C5A869]/30 shadow-xs hover:shadow-md transition-shadow flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="font-semibold text-[#0D3B2E]">{briefing.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{briefing.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{briefing.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0D3B2E] leading-snug">
                    {briefing.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2B3632] leading-relaxed">
                    {briefing.summary}
                  </p>

                  <div className="bg-[#FAF9F5] p-3 rounded-sm border border-[#C5A869]/25 text-xs text-[#0D3B2E]">
                    <span className="font-bold text-[#9E8040] uppercase tracking-wider block text-[10px] mb-1">
                      Key Principle:
                    </span>
                    {briefing.takeaway}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between mt-4">
                  <button
                    onClick={() => setActiveBriefing(briefing)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0D3B2E] hover:text-[#9E8040] uppercase tracking-wider transition-colors cursor-pointer group"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-xs text-stone-400 font-mono">0{idx + 2} of 03</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Editorial Reader Modal */}
      {activeBriefing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07251C]/80 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
          <div className="relative w-full max-w-3xl bg-[#FAF9F5] border border-[#C5A869]/50 rounded-sm shadow-2xl p-6 sm:p-10 text-[#111816] animate-in zoom-in-95 duration-150">
            {/* Top Bar of Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A869]/30 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#9E8040]">
                <span>EB WEALTH RESEARCH DISPATCH</span>
                <span aria-hidden="true">·</span>
                <span>{activeBriefing.tag}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activeBriefing)}
                  className="p-1.5 text-stone-600 hover:text-[#0D3B2E] rounded-xs hover:bg-stone-200/50 transition-colors cursor-pointer"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setActiveBriefing(null)}
                  className="p-1.5 text-stone-600 hover:text-[#0D3B2E] rounded-xs hover:bg-stone-200/50 transition-colors cursor-pointer"
                  aria-label="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editorial Title */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D3B2E] tracking-tight mb-3">
              {activeBriefing.title}
            </h2>
            <p className="text-base font-serif italic text-stone-600 mb-6">
              {activeBriefing.subtitle}
            </p>

            <div className="flex items-center gap-3 text-xs text-stone-500 mb-8 pb-4 border-b border-stone-200">
              <span>Published by EB Wealth Investment Research</span>
              <span aria-hidden="true">·</span>
              <span>{activeBriefing.date}</span>
              <span aria-hidden="true">·</span>
              <span>{activeBriefing.readTime}</span>
            </div>

            {/* Key Takeaway Box */}
            <div className="p-5 bg-white border border-[#C5A869]/40 rounded-sm mb-8 shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9E8040] font-bold block mb-1">
                Executive Synthesis
              </span>
              <p className="text-sm font-medium text-[#0D3B2E] leading-relaxed">
                {activeBriefing.takeaway}
              </p>
            </div>

            {/* Body Prose */}
            <div className="space-y-5 text-sm sm:text-base text-[#2B3632] leading-relaxed mb-10 max-w-none">
              {activeBriefing.fullContent.map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer Action */}
            <div className="pt-6 border-t border-[#C5A869]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                Educational research note. Not FCA-regulated investment advice.
              </div>
              <div className="flex items-center gap-3">
                {onOpenAppDownload && (
                  <button
                    onClick={() => {
                      setActiveBriefing(null);
                      onOpenAppDownload();
                    }}
                    className="py-2.5 px-5 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer border border-[#C5A869]/40"
                  >
                    Explore in EB Wealth App
                  </button>
                )}
                <button
                  onClick={() => setActiveBriefing(null)}
                  className="py-2.5 px-4 bg-white border border-stone-300 hover:border-stone-400 text-stone-800 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
