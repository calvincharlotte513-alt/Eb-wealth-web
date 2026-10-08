import React, { useState } from 'react';
import { Search, Info, ShieldCheck, CheckCircle2, ArrowRight, Layers, HelpCircle, Eye, Sliders, Smartphone } from 'lucide-react';

interface LearnByDoingProps {
  onOpenAppDownload: (featureName: string) => void;
}

export const LearnByDoing: React.FC<LearnByDoingProps> = ({ onOpenAppDownload }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedOrderType, setSelectedOrderType] = useState<'market' | 'limit'>('limit');
  const [limitPrice, setLimitPrice] = useState<number>(142.50);
  const [quantity, setQuantity] = useState<number>(10);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  const walkthroughSteps = [
    {
      id: 'navigate-search',
      title: 'Platform Navigation & Search',
      subtitle: 'Finding stocks & ETFs without confusion',
      focusArea: 'search',
      tip: 'Learn how to filter by fund provider (Vanguard, iShares), identify fund accumulating (Acc) vs distributing (Dist) variants, and check UCITS UK tax-reporting status.'
    },
    {
      id: 'investment-screen',
      title: 'Decoding the Investment Screen',
      subtitle: 'Reading quotes, bid/ask spreads & expense ratios',
      focusArea: 'quote',
      tip: 'The price you see is often delayed by 15 minutes unless live pricing is enabled. The ongoing fund fee (TER / OCF) dramatically affects your 20-year wealth.'
    },
    {
      id: 'order-types',
      title: 'Order Types: Market vs Limit',
      subtitle: 'How to buy safely without overpaying',
      focusArea: 'order',
      tip: 'A Market Order buys immediately at whatever price is available. A Limit Order guarantees you will not pay more than your specified maximum limit.'
    },
    {
      id: 'company-info',
      title: 'Interpreting Company Fundamentals',
      subtitle: 'Assessing valuation, earnings & balance sheets',
      focusArea: 'fundamentals',
      tip: 'Never look at stock price alone. A £100 stock can be cheaper than a £5 stock if its Price-to-Earnings (P/E) and Free Cash Flow generation are superior.'
    },
    {
      id: 'portfolio-allocation',
      title: 'Portfolio Allocation & Risk Review',
      subtitle: 'Diversification across geography and sectors',
      focusArea: 'allocation',
      tip: 'Avoid "home bias". Most UK investors over-concentrate in the FTSE 100 while missing the broader global equities universe.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00A878] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00A878]" />
            <span>Interactive Educational Walkthroughs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17202A] tracking-tight">
            Don’t Just Learn Investing. Learn How to Use It.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#52606D] leading-relaxed">
            Theoretical knowledge is useless if you freeze when opening a real investment broker. EB Wealth takes you inside realistic platform interfaces step-by-step so you understand every button, order type, and metric with complete composure.
          </p>
        </div>

        {/* Walkthrough Controls / Step Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {walkthroughSteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                activeStep === idx
                  ? 'bg-[#ECFDF5] border-[#00A878] ring-2 ring-[#00A878]/10'
                  : 'bg-[#F8FAFC] border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <span className={`text-[11px] font-mono font-bold block mb-1 ${
                  activeStep === idx ? 'text-[#00A878]' : 'text-slate-400'
                }`}>
                  STEP 0{idx + 1}
                </span>
                <div className={`text-xs font-bold leading-tight ${
                  activeStep === idx ? 'text-[#17202A]' : 'text-[#52606D]'
                }`}>
                  {step.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* The Interactive Platform Simulator Frame */}
        <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          {/* Simulator Top Nav Bar */}
          <div className="px-5 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <span className="text-xs font-bold text-[#17202A] ml-2">
                EB Wealth Sandbox · Broker Walkthrough Simulator
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECFDF5] text-[#00A878] border border-[#00A878]/20">
                Educational Mode (No Real Money)
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs text-[#52606D]">
              <span>Wrapper: <strong>Stocks & Shares ISA</strong></span>
              <span>Available Cash: <strong>£5,420.00</strong></span>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side: Simulated broker interactive UI */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              {/* Step 1 & 2: Search and Asset Overview */}
              <div className="flex items-center gap-3 p-2 bg-[#F8FAFC] rounded-xl border border-slate-200">
                <Search className="w-4 h-4 text-slate-400 ml-2" />
                <input
                  type="text"
                  readOnly
                  value="Vanguard FTSE All-World UCITS ETF (VWRL)"
                  className="bg-transparent text-xs sm:text-sm font-semibold text-[#17202A] w-full focus:outline-none"
                />
                <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-nowrap">
                  Ticker: VWRL · LSE
                </span>
              </div>

              {/* Price & Quote Area */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#17202A]">
                    £142.15 <span className="text-xs font-normal text-[#52606D]">GBP</span>
                  </div>
                  <div className="text-xs font-semibold text-[#00A878] flex items-center gap-1 mt-0.5">
                    <span>+£0.82 (+0.58%) Today</span>
                    <span className="text-slate-400 font-normal">· Market Open</span>
                  </div>
                </div>
                <div className="text-right text-xs space-y-0.5">
                  <div className="text-[#52606D]">Bid: <strong className="text-[#17202A]">£142.10</strong> / Ask: <strong className="text-[#17202A]">£142.20</strong></div>
                  <div className="text-[#52606D]">Ongoing Charge (OCF): <strong className="text-[#00A878]">0.22% per year</strong></div>
                </div>
              </div>

              {/* Interactive Order Types Simulator */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-[#17202A] uppercase tracking-wider">
                    Simulate Order Execution
                  </label>
                  <span className="text-[11px] text-[#2563EB]">Try clicking each order type:</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setSelectedOrderType('limit')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedOrderType === 'limit'
                        ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]'
                        : 'bg-[#F8FAFC] border-slate-200 text-[#52606D]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Limit Order (Recommended)</span>
                  </button>
                  <button
                    onClick={() => setSelectedOrderType('market')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedOrderType === 'market'
                        ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]'
                        : 'bg-[#F8FAFC] border-slate-200 text-[#52606D]'
                    }`}
                  >
                    <span>Market Order</span>
                  </button>
                </div>

                {selectedOrderType === 'limit' && (
                  <div className="p-3 bg-[#EFF6FF]/60 rounded-xl border border-blue-200 text-xs text-[#2563EB] mb-4">
                    <strong>Why Limit Orders protect you:</strong> You set a ceiling price of £{limitPrice.toFixed(2)}. The broker will NEVER execute above this price, protecting you from sudden intraday spikes.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#52606D] block mb-1">
                      Units / Shares:
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                      className="w-full px-3 py-2 text-xs font-bold text-[#17202A] bg-[#F8FAFC] border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A878]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#52606D] block mb-1">
                      Estimated Total:
                    </label>
                    <div className="px-3 py-2 text-xs font-bold text-[#17202A] bg-slate-100 rounded-lg">
                      £{(quantity * (selectedOrderType === 'limit' ? limitPrice : 142.15)).toFixed(2)} GBP
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-[#52606D]">Tax Wrapper: Stocks & Shares ISA (0% UK CGT)</span>
                  <button
                    onClick={() => alert('Simulator: In a live broker, this sends an order to the London Stock Exchange. In the EB Wealth Academy, you practice this risk-free with complete guidance!')}
                    className="py-2.5 px-4 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Simulate Order Placement
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: Real-time educational coach notes */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="bg-white rounded-2xl border border-[#00A878]/30 p-6 shadow-xs relative">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A878] uppercase tracking-wider mb-2">
                  <Info className="w-4 h-4" />
                  <span>EB Wealth Mentor Notes</span>
                </div>
                <h4 className="text-lg font-bold text-[#17202A]">
                  {walkthroughSteps[activeStep].title}
                </h4>
                <p className="text-xs font-medium text-[#2563EB] mt-0.5">
                  {walkthroughSteps[activeStep].subtitle}
                </p>

                <p className="text-xs text-[#52606D] mt-3 leading-relaxed">
                  {walkthroughSteps[activeStep].tip}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-[#17202A]">What you master in this walkthrough:</div>
                  <div className="flex items-center gap-2 text-xs text-[#52606D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A878]" />
                    <span>How order books and bid/ask spreads work</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#52606D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A878]" />
                    <span>Difference between accumulating (Acc) & distributing (Dist)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#52606D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A878]" />
                    <span>How to set limit prices without getting stopped out</span>
                  </div>
                </div>
              </div>

              {/* Callout action to open app or next lesson */}
              <div className="p-5 bg-[#EFF6FF] rounded-2xl border border-blue-200">
                <div className="text-xs font-bold text-[#17202A] mb-1">
                  Full Video Walkthroughs Available in the App
                </div>
                <p className="text-xs text-[#52606D] mb-4">
                  Step-by-step screen recordings with Interactive Pause, Click & Question features.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % walkthroughSteps.length)}
                    className="py-2 px-3 bg-white hover:bg-slate-50 text-[#17202A] border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Next Step ({activeStep + 1}/5)
                  </button>
                  <button
                    onClick={() => onOpenAppDownload('Interactive Platform Walkthroughs')}
                    className="py-2 px-3 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Access All in App</span>
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
