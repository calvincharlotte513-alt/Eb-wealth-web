import React, { useState } from 'react';
import { MARKET_INDICATORS, MarketIndicator } from '../data/content';
import { TrendingUp, Info, X } from 'lucide-react';

export const MarketBar: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<MarketIndicator | null>(null);

  return (
    <div className="bg-[#07251C] text-white/90 border-b border-[#C5A869]/25 text-[11px] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 overflow-x-auto no-scrollbar gap-6">
          {/* Institutional Kicker */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 text-[#C5A869] font-mono tracking-wider uppercase text-[10px] font-semibold border-r border-[#C5A869]/30 pr-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869]"></span>
            <span>Global Market Benchmarks</span>
          </div>

          {/* Indicators Ticker */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0">
            {MARKET_INDICATORS.map((item) => (
              <button
                key={item.symbol}
                onClick={() => setSelectedIndicator(item)}
                className="group flex items-center gap-2 hover:text-[#C5A869] transition-colors cursor-pointer text-left py-0.5 whitespace-nowrap"
                title={`Click for institutional analysis of ${item.name}`}
              >
                <span className="font-semibold text-slate-200 group-hover:text-white">
                  {item.symbol}
                </span>
                <span className="font-mono tabular-nums text-white/95">
                  {item.value}
                </span>
                <span
                  className={`font-mono text-[10px] font-semibold ${
                    item.change.startsWith('+')
                      ? 'text-[#86EFAC]'
                      : item.change.startsWith('-')
                      ? 'text-[#FCA5A5]'
                      : 'text-[#C5A869]'
                  }`}
                >
                  {item.change}
                </span>
                <Info className="w-3 h-3 text-slate-500 group-hover:text-[#C5A869] opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {/* Educational Standard Label */}
          <div className="hidden md:flex items-center gap-2 shrink-0 text-slate-400 text-[10px] border-l border-[#C5A869]/30 pl-4 font-mono">
            <span>UK Tax Year 2026/27</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#C5A869]">£20,000 ISA Limit</span>
          </div>
        </div>
      </div>

      {/* Indicator Detail Drawer/Tooltip */}
      {selectedIndicator && (
        <div className="bg-[#0A3323] border-t border-[#C5A869]/40 py-2.5 px-4 text-xs animate-in fade-in duration-150">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-serif font-bold text-[#FAF9F5] text-sm">
                {selectedIndicator.symbol} — {selectedIndicator.name}
              </span>
              <span className="font-mono tabular-nums text-[#C5A869] font-semibold">
                {selectedIndicator.value} ({selectedIndicator.change})
              </span>
              <span className="text-slate-300 text-[11px] max-w-2xl">
                {selectedIndicator.context}
              </span>
            </div>
            <button
              onClick={() => setSelectedIndicator(null)}
              className="p-1 text-slate-300 hover:text-white rounded-xs hover:bg-white/10 cursor-pointer shrink-0"
              aria-label="Close indicator info"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
