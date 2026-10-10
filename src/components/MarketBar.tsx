import React, { useState } from 'react';
import { useMarketData } from '../context/MarketDataContext';
import { MarketIndicatorItem } from '../services/marketDataService';
import { Info, X, RefreshCw, Pause, Play, ShieldAlert } from 'lucide-react';

export const MarketBar: React.FC = () => {
  const { indicators, lastUpdatedFormatted, source, data, isStale, isLoading, refresh } = useMarketData();
  const [selectedIndicator, setSelectedIndicator] = useState<MarketIndicatorItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const statusLabel =
    data.status === 'live'
      ? 'LIVE'
      : data.status === 'delayed'
      ? 'DELAYED (15M)'
      : 'CLOSE';

  return (
    <div
      className="bg-[#07251C] text-white/95 border-b border-[#C5A869]/25 text-[11px] font-sans relative z-30 select-none"
      role="region"
      aria-label="Real-time Financial Market Ticker"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 gap-4">
          {/* Institutional Kicker & Status */}
          <div className="flex items-center gap-2 shrink-0 border-r border-[#C5A869]/30 pr-3.5">
            <span
              className={`w-2 h-2 rounded-full ${
                data.status === 'live'
                  ? 'bg-emerald-400'
                  : data.status === 'delayed'
                  ? 'bg-amber-400'
                  : 'bg-[#C5A869]'
              }`}
            />
            <span className="text-[#C5A869] font-mono tracking-wider uppercase text-[10px] font-bold">
              Market Benchmarks
            </span>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.2 rounded-xs border font-semibold ${
                data.status === 'live'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700/50'
                  : data.status === 'delayed'
                  ? 'bg-amber-950 text-amber-300 border-amber-700/50'
                  : 'bg-[#0D3B2E] text-[#DFCA96] border-[#C5A869]/40'
              }`}
              title={source}
            >
              {statusLabel}
            </span>
          </div>

          {/* Scrolling / Interactive Ticker Strip */}
          <div
            className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 sm:gap-8 scroll-smooth"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            tabIndex={0}
            role="marquee"
            aria-live="polite"
          >
            {indicators.map((item) => (
              <button
                key={item.symbol}
                onClick={() => setSelectedIndicator(item)}
                className="group flex items-center gap-2 hover:text-[#C5A869] transition-colors cursor-pointer text-left py-0.5 whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-[#C5A869]"
                title={`Click for institutional analysis of ${item.name}`}
              >
                <span className="font-semibold text-slate-200 group-hover:text-white">
                  {item.symbol}
                </span>
                <span className="font-mono tabular-nums text-white/95 font-medium">
                  {item.value}
                </span>
                <span
                  className={`font-mono text-[10px] font-bold ${
                    item.positive
                      ? 'text-[#86EFAC]'
                      : 'text-[#FCA5A5]'
                  }`}
                >
                  {item.percentChange}
                </span>
                <Info className="w-3 h-3 text-slate-500 group-hover:text-[#C5A869] opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {/* Right Controls: Timestamp & Refresh */}
          <div className="flex items-center gap-2.5 shrink-0 border-l border-[#C5A869]/30 pl-3.5 text-[10px] font-mono text-slate-400">
            <span className="hidden md:inline tabular-nums text-slate-400">
              {lastUpdatedFormatted}
            </span>
            <button
              onClick={() => refresh()}
              disabled={isLoading}
              className="p-1 text-slate-400 hover:text-[#C5A869] transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh verified market quotes"
              aria-label="Refresh quotes"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-[#C5A869]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Indicator Detail Drawer/Tooltip with Full Educational & Source Context */}
      {selectedIndicator && (
        <div className="bg-[#0A3323] border-t border-[#C5A869]/40 py-3 px-4 text-xs animate-in fade-in duration-150 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
              <span className="font-serif font-bold text-[#FAF9F5] text-sm">
                {selectedIndicator.symbol} — {selectedIndicator.name}
              </span>
              <span className="font-mono tabular-nums text-[#C5A869] font-bold">
                {selectedIndicator.value} ({selectedIndicator.change} / {selectedIndicator.percentChange})
              </span>
              <span className="text-slate-300 text-[11px] max-w-xl">
                {selectedIndicator.context}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#C5A869]/20">
              <div className="text-[10px] font-mono text-slate-400">
                Source: <span className="text-slate-300">{source}</span> · Updated: {lastUpdatedFormatted}
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
        </div>
      )}
    </div>
  );
};
