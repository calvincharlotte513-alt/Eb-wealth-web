import React, { useState } from 'react';
import { ArrowRight, RefreshCw, BarChart3, HelpCircle, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { PageId } from '../types/navigation';

interface InteractiveToolsProps {
  onExploreProgram: (page: PageId) => void;
}

export const InteractiveTools: React.FC<InteractiveToolsProps> = ({ onExploreProgram }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'diagnostic'>('simulator');

  // UK Investment Simulator State
  const [initialCapital, setInitialCapital] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(400);
  const [annualReturn, setAnnualReturn] = useState<number>(8);
  const [years, setYears] = useState<number>(15);

  // Diagnostic Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Calculation for compound growth
  const calculateCompound = () => {
    const r = annualReturn / 100 / 12;
    const n = years * 12;
    const principalFV = initialCapital * Math.pow(1 + r, n);
    const contributionsFV = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
    const totalFV = Math.round(principalFV + contributionsFV);
    const totalContributed = Math.round(initialCapital + monthlyContribution * n);
    const compoundInterest = Math.max(0, totalFV - totalContributed);

    // Estimated UK Tax Drag in GIA vs ISA (assuming ~20% CGT drag on gains over allowance)
    const estimatedTaxInGIA = Math.round(compoundInterest * 0.20);

    return {
      totalFV,
      totalContributed,
      compoundInterest,
      estimatedTaxInGIA
    };
  };

  const results = calculateCompound();

  const quizQuestions = [
    {
      question: 'What is your current investing experience level?',
      options: [
        { label: 'Complete beginner (I have never invested in stocks, funds or ISAs)', recommendation: 'academy', title: 'EB Wealth Academy (Level 1 Foundations)' },
        { label: 'Intermediate (I invest occasionally, but lack a clear long-term strategy)', recommendation: 'academy', title: 'EB Wealth Academy (Level 3-4 UK Investing & Portfolio Building)' },
        { label: 'Active investor / High earner (I want consistent mentorship and accountability)', recommendation: 'mentorship', title: 'EB Wealth Mentorship & Masterclasses' },
        { label: 'Private capital investor (I want a private 1-on-1 portfolio review)', recommendation: 'coaching', title: '1-to-1 Private Strategy Consultation' }
      ]
    },
    {
      question: 'What is your primary investment focus over the next 12 months?',
      options: [
        { label: 'Learning how to invest independently without paying high advisor fees', recommendation: 'academy', title: 'EB Wealth Academy' },
        { label: 'Maximising my UK Stocks & Shares ISA and SIPP allowances tax-efficiently', recommendation: 'coaching', title: '1-to-1 Investment Strategy Coaching' },
        { label: 'Getting regular peer feedback, portfolio logic audits, and weekly discipline', recommendation: 'mentorship', title: 'Growth Mentorship Cohort' },
        { label: 'Calculating compound interest trajectories and comparing platform fees', recommendation: 'tools', title: 'Interactive Investment Calculators' }
      ]
    },
    {
      question: 'How do you prefer to learn and implement?',
      options: [
        { label: 'Self-paced step-by-step videos and interactive walkthrough simulators', recommendation: 'academy', title: 'EB Wealth Academy' },
        { label: 'Live cohort strategy sessions with peers and accountability check-ins', recommendation: 'mentorship', title: 'EB Wealth Mentorship' },
        { label: 'Private, confidential 1-on-1 video session directly on my asset allocation', recommendation: 'coaching', title: '1-to-1 Private Consultation' },
        { label: 'Hands-on interactive simulators, calculators, and comparison frameworks', recommendation: 'tools', title: 'Investment Tools & Simulators' }
      ]
    }
  ];

  const handleSelectQuizOption = (optionIndex: number) => {
    const updated = [...quizAnswers, optionIndex];
    setQuizAnswers(updated);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const lastAnswer = quizQuestions[quizQuestions.length - 1].options[optionIndex];
      setQuizResult(lastAnswer.recommendation);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  return (
    <section id="tools" className="py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-2">
            <BarChart3 className="w-4 h-4 text-[#0D3B2E]" />
            <span>Quantitative Investment Models</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
            Interactive Compounding Terminal & Profiler
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Test the empirical mathematics of long-term capital compounding, visualize the tax savings of UK ISA shelters, and identify the exact curriculum level for your journey.
          </p>
        </div>

        {/* Tab Controls: Segmented Button Control */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-[#C5A869]/35 rounded-sm w-fit mb-10 shadow-2xs">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-[#0D3B2E] text-[#C5A869] shadow-xs'
                : 'text-stone-600 hover:text-[#0D3B2E]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>UK Compound Growth & ISA Model</span>
          </button>
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'diagnostic'
                ? 'bg-[#0D3B2E] text-[#C5A869] shadow-xs'
                : 'text-stone-600 hover:text-[#0D3B2E]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Investor Pathway Profiler</span>
          </button>
        </div>

        {/* Tab 1: UK Compound Growth & ISA Tax Advantage Calculator */}
        {activeTab === 'simulator' && (
          <div className="bg-white border border-[#C5A869]/35 rounded-sm p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E]">
                  Calibrate Portfolio Assumptions
                </h3>
                <p className="text-xs text-stone-500 mt-1 font-mono">
                  Simulate longitudinal contributions, expected nominal equity returns, and holding horizon.
                </p>
              </div>

              {/* Slider 1: Initial Deposit */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                  <span>Initial Capital:</span>
                  <span className="text-[#0D3B2E] font-bold tabular-nums">£{initialCapital.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  className="w-full accent-[#0D3B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-0.5">
                  <span>£500</span>
                  <span>£25,000</span>
                  <span>£50,000</span>
                </div>
              </div>

              {/* Slider 2: Monthly Contribution */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                  <span>Monthly Contribution:</span>
                  <span className="text-[#0D3B2E] font-bold tabular-nums">£{monthlyContribution.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2500"
                  step="25"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-[#0D3B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-0.5">
                  <span>£50/mo</span>
                  <span>£1,000/mo</span>
                  <span>£2,500/mo</span>
                </div>
              </div>

              {/* Slider 3: Expected Annual Return */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                  <span>Expected Annualised Return:</span>
                  <span className="text-[#9E8040] font-bold tabular-nums">{annualReturn}% / year</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full accent-[#9E8040] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-0.5">
                  <span>4% (Conservative Gilts)</span>
                  <span>8% (Historical Global Equity)</span>
                  <span>12% (Aggressive Tilt)</span>
                </div>
              </div>

              {/* Slider 4: Time Horizon */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                  <span>Compounding Horizon:</span>
                  <span className="text-[#0D3B2E] font-bold tabular-nums">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="35"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-[#0D3B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-0.5">
                  <span>3 Years</span>
                  <span>15 Years</span>
                  <span>35 Years</span>
                </div>
              </div>
            </div>

            {/* Right Results Box */}
            <div className="lg:col-span-6 bg-[#FAF9F5] border border-[#C5A869]/30 rounded-sm p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040] block mb-1">
                  Terminal Portfolio Value
                </span>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight tabular-nums">
                  £{results.totalFV.toLocaleString()}
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Based on disciplined monthly contributions of £{monthlyContribution} compounded at {annualReturn}% over {years} years.
                </p>
              </div>

              {/* Visual Breakdown Bar */}
              <div>
                <div className="h-4 w-full bg-stone-200 rounded-xs overflow-hidden flex">
                  <div
                    style={{ width: `${Math.min(100, (results.totalContributed / results.totalFV) * 100)}%` }}
                    className="bg-[#165342] transition-all duration-300"
                    title="Your Contributions"
                  />
                  <div
                    style={{ width: `${Math.max(0, (results.compoundInterest / results.totalFV) * 100)}%` }}
                    className="bg-[#C5A869] transition-all duration-300"
                    title="Compound Growth"
                  />
                </div>
                <div className="flex justify-between text-xs text-[#2B3632] mt-2 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#165342] inline-block" />
                    Contributed: <strong>£{results.totalContributed.toLocaleString()}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#C5A869] inline-block" />
                    Gain: <strong className="text-[#9E8040]">£{results.compoundInterest.toLocaleString()}</strong>
                  </span>
                </div>
              </div>

              {/* UK ISA Tax Shield Advantage Callout */}
              <div className="p-4 rounded-sm bg-white border border-[#C5A869]/40 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0D3B2E] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
                  <span>The UK Stocks & Shares ISA Tax Shield</span>
                </div>
                <p className="text-xs text-[#2B3632] leading-relaxed">
                  Inside a UK Stocks & Shares ISA, your <strong>£{results.compoundInterest.toLocaleString()}</strong> in cumulative capital appreciation is <strong>100% tax-exempt for life</strong>. In an unsheltered General Investment Account (GIA), you would surrender up to <strong>~£{results.estimatedTaxInGIA.toLocaleString()}</strong> in UK Capital Gains and Dividend Tax.
                </p>
              </div>

              <button
                onClick={() => onExploreProgram('academy')}
                className="w-full py-3.5 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-white font-semibold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A869]/40 group"
              >
                <span>Master Tax Architecture in Academy</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A869] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Diagnostic / Pathway Quiz */}
        {activeTab === 'diagnostic' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#C5A869]/35 rounded-sm p-6 sm:p-10 shadow-sm">
            {!quizResult ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040]">
                    Question {quizStep + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs font-mono text-stone-400">Step {quizStep + 1}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E] mb-6">
                  {quizQuestions[quizStep].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      className="w-full p-4 text-left rounded-sm border border-stone-200 hover:border-[#C5A869] hover:bg-[#FAF5E8]/40 transition-all text-xs sm:text-sm font-medium text-[#111816] flex items-center justify-between group cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#0D3B2E] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-6">
                <div className="w-14 h-14 rounded-sm bg-[#FAF5E8] border border-[#C5A869]/40 text-[#0D3B2E] flex items-center justify-center mx-auto shadow-2xs">
                  <Sparkles className="w-7 h-7 text-[#9E8040]" />
                </div>

                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040] block mb-1">
                    Your Calibrated Recommendation
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E]">
                    {quizResult === 'academy' && 'EB Wealth Academy (Foundations & UK Tax Shelters)'}
                    {quizResult === 'mentorship' && 'Growth Mentorship Cohort & Masterclasses'}
                    {quizResult === 'coaching' && '1-to-1 Private Strategy Consultation'}
                    {quizResult === 'tools' && 'Quantitative Investment Models & Platform Directory'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mt-2 leading-relaxed">
                    Based on your profile, starting with this curriculum pillar provides the highest return on your study time and personal capital.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => onExploreProgram(quizResult as PageId)}
                    className="py-3.5 px-6 bg-[#0D3B2E] hover:bg-[#07251C] text-white font-semibold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer border border-[#C5A869]/40"
                  >
                    <span>Enter Recommended Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="py-3 px-5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#0D3B2E] flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Assessment</span>
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
