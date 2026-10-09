import React, { useState } from 'react';
import { Smartphone, CheckCircle2, Info, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface LearnByDoingProps {
  onOpenAppDownload: (featureName: string) => void;
}

export const LearnByDoing: React.FC<LearnByDoingProps> = ({ onOpenAppDownload }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(142.50);
  const [selectedOrderType, setSelectedOrderType] = useState<'limit' | 'market'>('limit');
  const [simulatedFeedback, setSimulatedFeedback] = useState<string | null>(null);

  const walkthroughSteps = [
    {
      id: 'step-1',
      title: 'Tax Wrapper Selection',
      subtitle: 'Opening a Stocks & Shares ISA vs GIA',
      tip: 'Always ensure your account is designated as an ISA before funding, shielding 100% of dividends and capital gains from UK HMRC tax drag.'
    },
    {
      id: 'step-2',
      title: 'Global ETF Search',
      subtitle: 'Evaluating Tickers & Fund Factsheets',
      tip: 'Look for low ongoing charges (OCF under 0.25%), accumulating (Acc) share classes, and replication methodology.'
    },
    {
      id: 'step-3',
      title: 'Order Book & Bid/Ask',
      subtitle: 'Understanding the Spread',
      tip: 'The spread is the difference between what buyers will pay (Bid) and what sellers demand (Ask). Liquid global index ETFs maintain fractions of a penny spread.'
    },
    {
      id: 'step-4',
      title: 'Limit vs Market Execution',
      subtitle: 'Protecting Capital from Spikes',
      tip: 'Limit orders guarantee you never pay more than your ceiling price, preventing sudden price slippage during opening volatility.'
    },
    {
      id: 'step-5',
      title: 'Automated Compounding',
      subtitle: 'Monthly Direct Debit Standing Orders',
      tip: 'Automating £250 to £1,000 monthly investments eliminates market timing anxiety and exploits pound-cost averaging across economic cycles.'
    }
  ];

  const handleSimulate = () => {
    setSimulatedFeedback(`Simulation Verified: Limit order for ${quantity} units at £${limitPrice.toFixed(2)} executed inside tax-exempt ISA wrapper.`);
    setTimeout(() => setSimulatedFeedback(null), 4000);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A869]" />
            <span>Interactive Educational Sandbox</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
            Learn By Doing. Master Execution Without Risk.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Theoretical knowledge is useless if an investor freezes when opening an institutional platform. EB Wealth demystifies order types, bid/ask spreads, and ISA tax wrappers with practical, risk-free simulations.
          </p>
        </div>

        {/* Walkthrough Controls / Step Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {walkthroughSteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-sm text-left border transition-all cursor-pointer flex flex-col justify-between ${
                activeStep === idx
                  ? 'bg-white border-[#C5A869] shadow-sm ring-1 ring-[#C5A869]/30'
                  : 'bg-[#FAF5E8]/40 border-stone-200 hover:bg-white text-stone-600'
              }`}
            >
              <div>
                <span className={`text-[11px] font-mono font-bold block mb-1 ${
                  activeStep === idx ? 'text-[#9E8040]' : 'text-stone-400'
                }`}>
                  PHASE 0{idx + 1}
                </span>
                <div className={`text-xs font-serif font-bold leading-tight ${
                  activeStep === idx ? 'text-[#0D3B2E]' : 'text-[#4A5550]'
                }`}>
                  {step.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* The Interactive Platform Simulator Frame */}
        <div className="bg-white rounded-sm border border-[#C5A869]/35 shadow-xl overflow-hidden">
          {/* Simulator Top Nav Bar */}
          <div className="bg-[#07251C] px-6 py-4 flex items-center justify-between border-b border-[#C5A869]/30 text-white">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#C5A869]" />
              <span className="font-mono text-xs tracking-wider uppercase text-slate-300">
                EB Wealth Sandbox Terminal · London Stock Exchange Execution
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#DFCA96] bg-[#165342] px-2.5 py-0.5 rounded-sm border border-[#C5A869]/40">
                Stocks & Shares ISA Wrapper · £0 Tax Drag
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Simulated Broker Order Panel */}
            <div className="lg:col-span-7 bg-[#FAF9F5] rounded-sm border border-[#C5A869]/30 p-6 space-y-6">
              {/* Asset Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-lg text-[#0D3B2E]">Vanguard FTSE All-World UCITS ETF</span>
                    <span className="font-mono text-xs px-2 py-0.5 bg-white border border-stone-300 rounded-sm text-stone-700">VWRL / VWRP</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">Global Diversification Across 3,600+ Large & Mid Cap Equities</div>
                </div>
                <div className="text-right text-xs space-y-0.5 font-mono">
                  <div className="text-stone-500">Bid: <strong className="text-[#0D3B2E]">£142.10</strong> / Ask: <strong className="text-[#0D3B2E]">£142.20</strong></div>
                  <div className="text-stone-500">Ongoing Charge: <strong className="text-[#9E8040]">0.22% / yr</strong></div>
                </div>
              </div>

              {/* Interactive Order Types Simulator */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono font-bold text-[#0D3B2E] uppercase tracking-wider">
                    Simulate Execution Order
                  </label>
                  <span className="text-[11px] text-[#9E8040] font-medium">Select Order Type:</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setSelectedOrderType('limit')}
                    className={`py-2.5 px-3 rounded-sm text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      selectedOrderType === 'limit'
                        ? 'bg-white border-[#C5A869] text-[#0D3B2E] shadow-2xs font-bold'
                        : 'bg-[#FAF5E8]/30 border-stone-200 text-stone-600 hover:bg-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Limit Order (Disciplined)</span>
                  </button>
                  <button
                    onClick={() => setSelectedOrderType('market')}
                    className={`py-2.5 px-3 rounded-sm text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      selectedOrderType === 'market'
                        ? 'bg-white border-[#C5A869] text-[#0D3B2E] shadow-2xs font-bold'
                        : 'bg-[#FAF5E8]/30 border-stone-200 text-stone-600 hover:bg-white'
                    }`}
                  >
                    <span>Market Order</span>
                  </button>
                </div>

                {selectedOrderType === 'limit' && (
                  <div className="p-3 bg-white rounded-sm border border-[#C5A869]/30 text-xs text-[#0D3B2E] mb-4">
                    <strong className="text-[#9E8040]">Institutional Rule:</strong> A Limit Order guarantees you set a ceiling of £{limitPrice.toFixed(2)}. The broker cannot execute above this price, shielding you from intraday volatility spikes.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">
                      Units / Shares:
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                      className="w-full px-3 py-2 text-xs font-bold text-[#0D3B2E] bg-white border border-stone-300 rounded-sm focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">
                      Estimated Consideration:
                    </label>
                    <div className="px-3 py-2 text-xs font-mono font-bold text-[#0D3B2E] bg-stone-100 rounded-sm border border-stone-200">
                      £{(quantity * (selectedOrderType === 'limit' ? limitPrice : 142.15)).toFixed(2)} GBP
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-stone-500 font-mono">Wrapper: UK Stocks & Shares ISA (0% CGT)</span>
                  <button
                    onClick={handleSimulate}
                    className="py-2.5 px-5 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer border border-[#C5A869]/40 shadow-xs"
                  >
                    Execute Simulated Trade
                  </button>
                </div>

                {simulatedFeedback && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-sm text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{simulatedFeedback}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Real-time educational coach notes */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="bg-[#FAF9F5] rounded-sm border border-[#C5A869]/35 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9E8040] uppercase tracking-wider mb-2">
                  <Info className="w-4 h-4" />
                  <span>EB Wealth Senior Educator Note</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-[#0D3B2E]">
                  {walkthroughSteps[activeStep].title}
                </h4>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  {walkthroughSteps[activeStep].subtitle}
                </p>

                <p className="text-xs text-[#2B3632] mt-3 leading-relaxed">
                  {walkthroughSteps[activeStep].tip}
                </p>

                <div className="mt-5 pt-4 border-t border-stone-200 space-y-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D3B2E]">
                    Core Competencies in this Step:
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D3B2E]" />
                    <span>Order book mechanics and bid/ask spread analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D3B2E]" />
                    <span>Accumulating (Acc) vs Distributing (Dist) dividend handling</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D3B2E]" />
                    <span>Preventing market order price slippage</span>
                  </div>
                </div>
              </div>

              {/* Callout action to open app or next lesson */}
              <div className="p-5 bg-white rounded-sm border border-[#C5A869]/30 shadow-2xs">
                <div className="font-serif text-sm font-bold text-[#0D3B2E] mb-1">
                  Complete Interactive Laboratory in App
                </div>
                <p className="text-xs text-stone-600 mb-4">
                  Guided screen recordings with pause-and-execute simulators for Vanguard, Trading 212, and Hargreaves Lansdown.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % walkthroughSteps.length)}
                    className="py-2 px-3 bg-[#FAF9F5] hover:bg-stone-100 text-[#0D3B2E] border border-stone-300 text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                  >
                    Next Step ({activeStep + 1}/5)
                  </button>
                  <button
                    onClick={() => onOpenAppDownload('Interactive Platform Walkthroughs')}
                    className="py-2 px-3.5 bg-[#0D3B2E] hover:bg-[#07251C] text-[#C5A869] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 border border-[#C5A869]/40"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Launch in App</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
