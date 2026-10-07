import React, { useState } from 'react';
import { ArrowRight, RefreshCw, BarChart3, HelpCircle, CheckCircle2 } from 'lucide-react';

interface InteractiveToolsProps {
  onExploreProgram: (programId: string) => void;
}

export const InteractiveTools: React.FC<InteractiveToolsProps> = ({ onExploreProgram }) => {
  // Tab selector: 'simulator' | 'diagnostic'
  const [activeTab, setActiveTab] = useState<'simulator' | 'diagnostic'>('simulator');

  // Simulator state
  const [initialCapital, setInitialCapital] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(2500);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [years, setYears] = useState(15);

  // Diagnostic quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Calculation for compound interest
  // FV = P*(1+r/12)^(12*t) + PMT * [((1+r/12)^(12*t) - 1) / (r/12)]
  const calculateCompound = () => {
    const r = annualReturn / 100 / 12;
    const n = years * 12;
    const principalFV = initialCapital * Math.pow(1 + r, n);
    const contributionsFV = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
    const totalFV = Math.round(principalFV + contributionsFV);
    const totalContributed = Math.round(initialCapital + monthlyContribution * n);
    const compoundInterest = Math.max(0, totalFV - totalContributed);

    return {
      totalFV,
      totalContributed,
      compoundInterest
    };
  };

  const results = calculateCompound();

  const quizQuestions = [
    {
      question: 'What is your current total liquid or investable capital?',
      options: [
        { label: 'Under $100,000 (Focusing on savings rate & foundational indexation)', value: 'academy' },
        { label: '$100,000 to $500,000 (Ready to diversify into private debt & alternatives)', value: 'academy_pro' },
        { label: '$500,000 to $2,000,000+ (Seeking bespoke tax shelter & deal room access)', value: 'mentorship' },
        { label: 'Operating an active enterprise with $50k+ monthly revenue', value: 'ai_growth' }
      ]
    },
    {
      question: 'Where is your primary personal wealth bottleneck?',
      options: [
        { label: 'Lack of structured investment curriculum and clear asset allocation blueprint', value: 'academy' },
        { label: 'Too much cash idling in low-yield bank accounts losing purchasing power', value: 'coaching' },
        { label: 'High tax drag and exposure without an institutional holding entity', value: 'mentorship' },
        { label: 'Spending 20+ manual hours weekly on operations instead of capital allocation', value: 'ai_growth' }
      ]
    },
    {
      question: 'What is your immediate 12-month priority?',
      options: [
        { label: 'Achieve investment autonomy and stop relying on high-fee financial advisors', value: 'academy' },
        { label: 'Underwrite private real estate syndications or passive income deals', value: 'mentorship' },
        { label: 'Get an immediate 90-minute forensic audit of my existing portfolio', value: 'coaching' },
        { label: 'Automate customer acquisition and operations through custom AI systems', value: 'ai_growth' }
      ]
    }
  ];

  const handleSelectOption = (idx: number, outcome: string) => {
    const updated = [...quizAnswers, idx];
    setQuizAnswers(updated);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Finished
      setQuizResult(outcome);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  return (
    <section id="interactive-tools" className="py-20 bg-neutral-950 text-neutral-100 border-t border-b border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            Institutional Clarity Tools
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-display">
            Interactive Capital Suite
          </h2>
          <p className="text-sm md:text-base text-neutral-400 mt-3">
            Model your long-term compounding runway or diagnose your current portfolio vulnerabilities with proprietary EB Wealth models.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-xl mt-6">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'simulator'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compounding Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'diagnostic'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Capital Diagnostic Audit</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Simulator */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 md:p-8">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-2">
                  <span>Initial Investable Capital</span>
                  <span className="text-emerald-400 tabular-nums">${initialCapital.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span>$5,000</span>
                  <span>$250,000</span>
                  <span>$500,000+</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-2">
                  <span>Monthly Contribution / Capital Inflow</span>
                  <span className="text-emerald-400 tabular-nums">${monthlyContribution.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="20000"
                  step="200"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span>$200/mo</span>
                  <span>$10,000/mo</span>
                  <span>$20,000/mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-2">
                  <span>Target Annualized Blended Yield (Alpha)</span>
                  <span className="text-amber-400 tabular-nums">{annualReturn}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="16"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span>6% (Conservative)</span>
                  <span>10% (Balanced MPT)</span>
                  <span>16% (Private Alpha)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-2">
                  <span>Compounding Horizon</span>
                  <span className="text-blue-400 tabular-nums">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span>3 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Live Visual Output */}
            <div className="lg:col-span-6 bg-neutral-950 border border-neutral-800 rounded-xl p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                Projected Portfolio Valuation
              </span>
              <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums tracking-tight font-display">
                ${results.totalFV.toLocaleString()}
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                At an annualized yield of {annualReturn}% over {years} years.
              </p>

              {/* Visual Proportion Bar */}
              <div className="mt-6">
                <div className="h-4 w-full bg-neutral-900 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${Math.min(100, (results.totalContributed / results.totalFV) * 100)}%` }}
                    className="bg-neutral-600 transition-all duration-300"
                    title="Principal Contributed"
                  />
                  <div
                    style={{ width: `${Math.max(0, (results.compoundInterest / results.totalFV) * 100)}%` }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                    title="Compound Interest Generated"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400 mt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
                    Capital Contributed: <strong className="text-neutral-200 tabular-nums">${results.totalContributed.toLocaleString()}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    Compound Gain: <strong className="text-emerald-400 tabular-nums">${results.compoundInterest.toLocaleString()}</strong>
                  </span>
                </div>
              </div>

              {/* Dynamic Allocation Preview */}
              <div className="mt-6 pt-5 border-t border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  EB Wealth Suggested Allocation Target
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <span className="text-neutral-400 block text-[11px]">Broad Global Equities</span>
                    <span className="font-bold text-white">40%</span>
                  </div>
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <span className="text-neutral-400 block text-[11px]">Private Credit & Real Estate</span>
                    <span className="font-bold text-emerald-400">35%</span>
                  </div>
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <span className="text-neutral-400 block text-[11px]">Cash & Short-Term Treasuries</span>
                    <span className="font-bold text-white">15%</span>
                  </div>
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <span className="text-neutral-400 block text-[11px]">Asymmetric Alpha / AI Assets</span>
                    <span className="font-bold text-amber-400">10%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => onExploreProgram('academy')}
                  className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build This Portfolio in EB Academy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Diagnostic Audit */}
        {activeTab === 'diagnostic' && (
          <div className="max-w-2xl mx-auto bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 md:p-8">
            {!quizResult ? (
              <div>
                <div className="flex justify-between items-center text-xs text-neutral-400 mb-4">
                  <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                  <div className="flex gap-1">
                    {quizQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-6 rounded-full ${
                          i <= quizStep ? 'bg-amber-400' : 'bg-neutral-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-5">
                  {quizQuestions[quizStep].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[quizStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i, opt.value)}
                      className="w-full text-left p-3.5 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-emerald-500 hover:bg-neutral-900 text-xs md:text-sm font-medium text-neutral-200 transition-all flex items-center justify-between group"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  Personalized Roadmap Recommended
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                  {quizResult === 'mentorship' && 'Private Executive Mentorship'}
                  {quizResult === 'academy' && 'EB Wealth Academy: Foundations'}
                  {quizResult === 'academy_pro' && 'EB Wealth Academy: Alternative Assets Alpha'}
                  {quizResult === 'coaching' && '90-Minute Strategic Wealth Blueprint'}
                  {quizResult === 'ai_growth' && 'AI Enterprise Business Growth Advisory'}
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 max-w-lg mx-auto mb-6 leading-relaxed">
                  {quizResult === 'mentorship' &&
                    'Your capital profile qualifies for intimate, closed-door strategy directly with the CEO to optimize syndications, entity structures, and private equity deals.'}
                  {quizResult === 'academy' &&
                    'Your highest ROI move is mastering Modern Portfolio Theory and automated allocation mechanisms inside our self-paced Academy curriculum.'}
                  {quizResult === 'academy_pro' &&
                    'You are primed to move past traditional equities into syndicated real estate, private debt alpha, and tax mitigation blueprints.'}
                  {quizResult === 'coaching' &&
                    'You need immediate, focused clarity on your existing asset distribution without ongoing commitments. Book a dedicated 90-minute forensic review.'}
                  {quizResult === 'ai_growth' &&
                    'Your business is generating healthy cashflow but losing operational leverage. Deploying custom AI prompts and autonomous workflows is your fastest revenue unlock.'}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Diagnostic</span>
                  </button>
                  <button
                    onClick={() => {
                      if (quizResult === 'mentorship') onExploreProgram('mentorship');
                      else if (quizResult === 'coaching') onExploreProgram('coaching');
                      else if (quizResult === 'ai_growth') onExploreProgram('ai-growth');
                      else onExploreProgram('academy');
                    }}
                    className="py-2.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Recommended Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
